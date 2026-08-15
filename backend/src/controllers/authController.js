import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import AuthToken from "../models/AuthToken.js";

import {
  createAccessToken,
  createRefreshToken,
} from "../utils/jwt.js";

import {
  hashToken,
} from "../utils/hashToken.js";

import {
  createRandomToken,
  hashRandomToken,
} from "../utils/randomToken.js";

import {
  setAuthCookies,
  clearAuthCookies,
} from "../utils/cookies.js";

import {
  signupSchema,
  loginSchema,
} from "../validators/authValidator.js";

import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
  sendLoginAlertEmail,
} from "../utils/email.js";

import {
  encrypt,
  decrypt,
} from "../utils/encryption.js";

import {
  writeSecurityEvent,
} from "../utils/securityLogger.js";

import {
  generateSecret,
  generateURI,
  verify as verifyTotp,
} from "otplib";

import QRCode from "qrcode";

const BCRYPT_ROUNDS = 12;
const EMAIL_VERIFICATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
const PASSWORD_RESET_EXPIRY = 15 * 60 * 1000; // 15 minutes
const MAX_LOGIN_ATTEMPTS = 10;

function calculateLoginDelay(
  failedAttempts
) {
  if (failedAttempts < 5) {
    return 0;
  }

  const exponent = Math.min(
    failedAttempts - 5,
    4
  );

  return Math.min(
    30_000 * 2 ** exponent,
    15 * 60 * 1000
  );
}

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]
      ?.split(",")[0]
      ?.trim() ||
    req.ip || null
  );
}

function getRequestMetadata(req) {
  return {
    ip: getClientIp(req),
    userAgent: req.get("user-agent") || null,
    requestId: req.requestId || crypto.randomUUID(),
  };
}

function authenticationRequired(res) {
  return res.status(401).json({
    success: false,
    message: "Authentication required",
  });
}

export async function signup(req, res, next) {
  try {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid signup information",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const {
      name,
      email,
      phone,
      password,
    } = parsed.data;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(
      password,
      BCRYPT_ROUNDS
    );

    const user = await User.create({
      name,
      email,
      phone,
      passwordHash,
      role: "customer",
      emailVerified: false,
      isActive: true,
    });

    const rawToken = createRandomToken(32);

    await AuthToken.create({
      userId: user._id,
      tokenHash: hashRandomToken(rawToken),
      type: "email_verification",
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_EXPIRY),
    });

    await sendVerificationEmail(
      user.email,
      user.name,
      rawToken
    );

    await writeSecurityEvent({
      eventType: "signup",
      severity: "info",
      userId: user._id,
      req,
      metadata: { emailVerified: false, },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please verify your email before signing in.",
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const {
      email,
      password,
    } = parsed.data;

    const user = await User.findOne({
      email,
    }).select("+passwordHash");

    if (!user || !user.isActive) {
      await writeSecurityEvent({
        eventType: "login_failed",
        severity: "low",
        req,
        metadata: {
          reason: "invalid_credentials",
        },
      });

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (
      user.lockedUntil &&
      user.lockedUntil >
      new Date()
    ) {
      await writeSecurityEvent({
        eventType: "login_blocked",
        severity: "medium",
        userId: user._id,
        req,
        metadata: {
          reason: "account_temporarily_locked",
        },
      });

      return res.status(429).json({
        success: false,
        message: "Too many unsuccessful attempts. Please try again later.",
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordMatches) {
      user.failedLoginAttempts += 1;

      const delay = calculateLoginDelay(user.failedLoginAttempts);

      if (delay > 0) {
        user.lockedUntil = new Date(Date.now() + delay);
      }

      await user.save({ validateBeforeSave: false, });

      await writeSecurityEvent({
        eventType: "login_failed",
        severity: user.failedLoginAttempts >= 5
          ? "medium"
          : "low",
        userId: user._id,
        req,
        metadata: {
          failedAttempts: user.failedLoginAttempts,
          delayApplied: delay,
        },
      });


      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.emailVerified) {
      await writeSecurityEvent({
        eventType: "login_blocked",
        severity: "low",
        userId: user._id,
        req,
        metadata: {
          reason: "email_not_verified",
        },
      });

      return res.status(403).json({
        success: false,
        message: "Please verify your email address before signing in.",
      });
    }

    user.failedLoginAttempts = 0;
    user.lockedUntil = null;

    if (user.mfaEnabled) {
      const mfaChallengeToken = createRandomToken(32);

      await AuthToken.create({
        userId: user._id,
        tokenHash: hashRandomToken(mfaChallengeToken),
        type: "mfa_login",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      await writeSecurityEvent({
        eventType: "mfa_challenge",
        severity: "info",
        userId: user._id,
        req,
      });

      return res.json({
        success: true,
        requiresMfa: true,
        mfaToken: mfaChallengeToken,
        message: "Additional authentication required",
      });
    }

    user.lastLoginAt = new Date();

    await user.save({ validateBeforeSave: false, });

    const accessToken = createAccessToken(user);

    const refreshToken = createRefreshToken(user);

    await RefreshToken.create({
      tokenHash: hashToken(refreshToken),
      userId: user._id,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    setAuthCookies(
      res,
      accessToken,
      refreshToken
    );

    await writeSecurityEvent({
      eventType: "login_success",
      severity: "info",
      userId: user._id,
      req,
    });

    try {
      await sendLoginAlertEmail(
        user.email,
        user.name,
        getRequestMetadata(req)
      );
    } catch (emailError) {
      console.error(
        "Login notification email failed:",
        emailError.message
      );
    }

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        mfaEnabled: user.mfaEnabled,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req, res, next) {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
      return authenticationRequired(res);
    }

    let decoded;

    try {
      decoded = jwt.verify(
        oldRefreshToken,
        process.env.JWT_REFRESH_SECRET,
        {
          issuer: "paras-printers-api",
          audience: "paras-printers-client",
        }
      );
    } catch {
      clearAuthCookies(res);
      return authenticationRequired(res);
    }

    if (decoded.type !== "refresh") {
      clearAuthCookies(res);
      return authenticationRequired(res);
    }

    const oldTokenHash = hashToken(oldRefreshToken);

    const storedToken = await RefreshToken.findOne({
      tokenHash: oldTokenHash,
    });

    if (!storedToken) {
      clearAuthCookies(res);
      return authenticationRequired(res);
    }

    if (storedToken.revokedAt) {
      await RefreshToken.updateMany(
        {
          userId: storedToken.userId,
          revokedAt: null,
        },
        {
          $set: {
            revokedAt: new Date(),
          },
        }
      );

      await writeSecurityEvent({
        eventType: "refresh_token_reuse",
        severity: "critical",
        userId: storedToken.userId,
        req,
      });

      clearAuthCookies(res);

      return res.status(401).json({
        success: false,
        message: "Security session invalidated. Please sign in again.",
      });
    }

    if (storedToken.expiresAt <= new Date()) {
      clearAuthCookies(res);
      return authenticationRequired(res);
    }

    const user = await User.findById(
      decoded.sub
    );

    if (!user || !user.isActive) {
      clearAuthCookies(res);
      return authenticationRequired(res);
    }

    // Create new tokens
    const newAccessToken = createAccessToken(user);

    const newRefreshToken = createRefreshToken(user);

    const newRefreshTokenHash = hashToken(newRefreshToken);

    // Revoke old refresh token
    storedToken.revokedAt = new Date();

    storedToken.replacedByTokenHash = newRefreshTokenHash;

    await storedToken.save();

    // Store new refresh token
    await RefreshToken.create({
      tokenHash: newRefreshTokenHash,
      userId: user._id,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    setAuthCookies(
      res,
      newAccessToken,
      newRefreshToken
    );

    await writeSecurityEvent({
      eventType: "token_refresh",
      severity: "info",
      userId: user._id,
      req,
    });

    return res.json({
      success: true,
      message: "Session refreshed",
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await RefreshToken.updateOne(
        {
          tokenHash: hashToken(refreshToken),
          revokedAt: null,
        },
        {
          $set: {
            revokedAt: new Date(),
          },
        }
      );
    }

    if (req.user?.id) {
      await writeSecurityEvent({
        eventType: "logout",
        severity: "info",
        userId: req.user.id,
        req,
      });
    }

    clearAuthCookies(res);

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.isActive) {
      return authenticationRequired(res);
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        mfaEnabled: user.mfaEnabled,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(req, res, next) {
  try {
    const { token } = req.query;

    if (
      typeof token !== "string" || token.length < 32
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification link",
      });
    }

    const tokenHash = hashRandomToken(token);

    const verification = await AuthToken.findOne({
      tokenHash,
      type: "email_verification",
      usedAt: null,
      expiresAt: {
        $gt: new Date(),
      },
    });

    if (!verification) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or expired",
      });
    }

    const user = await User.findById(
      verification.userId
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification link",
      });
    }

    user.emailVerified = true;

    verification.usedAt = new Date();

    await Promise.all([
      user.save(),
      verification.save(),
    ]);

    await writeSecurityEvent({
      eventType: "email_verified",
      severity: "info",
      userId: user._id,
      req,
    });

    return res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(
  req,
  res,
  next
) {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const genericResponse = {
      success: true,
      message: "If the email is registered, a password reset link has been sent.",
    };

    if (!email) {
      return res.json(genericResponse);
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.json(genericResponse);
    }

    await AuthToken.deleteMany({
      userId: user._id,
      type: "password_reset",
    });

    const rawToken = createRandomToken(32);

    await AuthToken.create({
      userId: user._id,
      tokenHash: hashRandomToken(rawToken),
      type: "password_reset",
      expiresAt: new Date(Date.now() + PASSWORD_RESET_EXPIRY),
    });

    await sendPasswordResetEmail(
      user.email,
      user.name,
      rawToken
    );

    await writeSecurityEvent({
      eventType: "password_reset_requested",
      severity: "info",
      userId: user._id,
      req,
    });

    return res.json(genericResponse);
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(
  req,
  res,
  next
) {
  try {
    const {
      token,
      password,
      confirmPassword,
    } = req.body;

    if (
      !token ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid password reset request",
      });
    }

    if (
      password.length < 8 ||
      password.length > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 72 characters",
      });
    }

    const tokenHash = hashRandomToken(token);

    const resetRecord =
      await AuthToken.findOne({
        tokenHash,
        type: "password_reset",
        usedAt: null,
        expiresAt: {
          $gt: new Date(),
        },
      });

    if (!resetRecord) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or expired",
      });
    }

    const user = await User.findById(
      resetRecord.userId
    ).select("+passwordHash");

    if (!user || !user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset request",
      });
    }

    user.passwordHash = await bcrypt.hash(password, BRCYPT_ROUNDS);

    user.passwordChangedAt = new Date();

    user.failedLoginAttempts = 0;
    user.lockedUntil = null;

    resetRecord.usedAt = new Date();

    await Promise.all([
      user.save(),
      resetRecord.save(),
    ]);

    await RefreshToken.updateMany(
      {
        userId: user._id,
        revokedAt: null,
      },
      {
        $set: {
          revokedAt: new Date(),
        },
      }
    );

    clearAuthCookies(res);

    await writeSecurityEvent({
      eventType: "password_reset_success",
      severity: "high",
      userId: user._id,
      req,
    });

    try {
      await sendPasswordChangedEmail(
        user.email,
        user.name
      );
    } catch (emailError) {
      console.error(
        "Password change email failed:",
        emailError.message
      );
    }

    return res.json({
      success: true,
      message: "Password reset successfully. Please sign in again.",
    });
  } catch (error) {
    next(error);
  }
}

export async function resendVerificationEmail(
  req,
  res,
  next
) {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();

    const response = {
      success: true,
      message: "If the account exists and requires verification, a verification email has been sent.",
    };

    if (!email) { return res.json(response); }

    const user = await User.findOne({ email, });

    if (
      !user || user.emailVerified
    ) {
      return res.json(response);
    }

    await AuthToken.deleteMany({
      userId: user._id,
      type: "email_verification",
    });

    const rawToken = createRandomToken(32);

    await AuthToken.create({
      userId: user._id,
      tokenHash: hashRandomToken(rawToken),
      type: "email_verification",
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_EXPIRY),
    });

    await sendVerificationEmail(
      user.email,
      user.name,
      rawToken
    );

    return res.json(response);
  } catch (error) {
    next(error);
  }
}

export async function changePassword(
  req,
  res,
  next
) {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (
      newPassword.length < 8 ||
      newPassword.length > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 72 characters",
      });
    }

    const user = await User.findById(req.user.id).select(
      "+passwordHash"
    );

    if (!user) {
      return authenticationRequired(res);
    }

    const matches = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

    if (!matches) {
      await writeSecurityEvent({
        eventType: "password_change_failed",
        severity: "medium",
        userId: user._id,
        req,
      });

      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      user.passwordHash
    );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from your current password",
      });
    }

    user.passwordHash = await bcrypt.hash(
      newPassword,
      BCRYPT_ROUNDS
    );

    user.passwordChangedAt = new Date();

    await user.save();

    await RefreshToken.updateMany(
      {
        userId: user._id,
        revokedAt: null,
      },
      {
        $set: {
          revokedAt: new Date(),
        },
      }
    );

    clearAuthCookies(res);

    await writeSecurityEvent({
      eventType: "password_changed",
      severity: "high",
      userId: user._id,
      req,
    });

    try {
      await sendPasswordChangedEmail(
        user.email,
        user.name
      );
    } catch (emailError) {
      console.error(
        "Password notification failed:",
        emailError.message
      );
    }

    return res.json({
      success: true,
      message: "Password changed successfully. Please sign in again.",
    });
  } catch (error) {
    next(error);
  }
}

export async function beginMfaSetup(
  req,
  res,
  next
) {
  try {
    const user = await User.findById(req.user.id).select(
      "+mfaSecretEncrypted"
    );

    if (!user) {
      return authenticationRequired(res);
    }

    if (user.mfaEnabled) {
      return res.status(400).json({
        success: false,
        message: "MFA is already enabled",
      });
    }

    const secret = generateSecret();

    const uri = generateURI({
      issuer: "Paras Printers",
      label: user.email,
      secret,
    });

    const qrCode = await QRCode.toDataURL(uri);

    user.mfaSecretEncrypted = encrypt(secret);


    await user.save({
      validateBeforeSave: false,
    });

    await writeSecurityEvent({
      eventType: "mfa_setup_started",
      severity: "info",
      userId: user._id,
      req,
    });

    return res.json({
      success: true,
      qrCode,
      message: "Scan the QR code using your authenticator app.",
    });
  } catch (error) {
    next(error);
  }
}

export async function confirmMfaSetup(
  req,
  res,
  next
) {
  try {
    const { code, } = req.body;

    const user = await User.findById(req.user.id).select(
      "+mfaSecretEncrypted"
    );

    if (
      !user ||
      !user.mfaSecretEncrypted
    ) {
      return res.status(400).json({
        success: false,
        message: "MFA setup has not been started",
      });
    }

    const secret = decrypt(
      user.mfaSecretEncrypted
    );

    const result =
      await verifyTotp({
        secret,
        token: String(code),
      });

    if (!result.valid) {
      await writeSecurityEvent({
        eventType: "mfa_setup_failed",
        severity: "medium",
        userId: user._id,
        req,
      });

      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    user.mfaEnabled = true;

    await user.save({
      validateBeforeSave: false,
    });

    await writeSecurityEvent({
      eventType: "mfa_enabled",
      severity: "high",
      userId: user._id,
      req,
    });

    return res.json({
      success: true,
      message: "Two-factor authentication enabled successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyMfaLogin(
  req,
  res,
  next
) {
  try {
    const {
      mfaToken,
      code,
    } = req.body;

    if (
      !mfaToken ||
      !code
    ) {
      return res.status(400).json({
        success: false,
        message: "MFA verification is required",
      });
    }

    const challenge =
      await AuthToken.findOne({
        tokenHash: hashRandomToken(mfaToken),
        type: "mfa_login",
        usedAt: null,
        expiresAt: {
          $gt: new Date(),
        },
      });

    if (!challenge) {
      return res.status(401).json({
        success: false,
        message: "MFA session is invalid or expired",
      });
    }

    const user = await User.findById(challenge.userId).select(
      "+mfaSecretEncrypted"
    );

    if (
      !user ||
      !user.mfaEnabled
    ) {
      return res.status(401).json({
        success: false,
        message: "MFA authentication failed",
      });
    }

    const secret = decrypt(
      user.mfaSecretEncrypted
    );

    const result =
      await verifyTotp({
        secret,
        token: String(code),
      });

    if (!result.valid) {
      await writeSecurityEvent({
        eventType: "mfa_login_failed",
        severity: "medium",
        userId: user._id,
        req,
      });

      return res.status(401).json({
        success: false,
        message: "Invalid authentication code",
      });
    }

    challenge.usedAt = new Date();

    await challenge.save();

    user.lastLoginAt = new Date();
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;

    await user.save({
      validateBeforeSave: false,
    });

    const accessToken = createAccessToken(user);

    const refreshToken = createRefreshToken(user);

    await RefreshToken.create({
      tokenHash: hashToken(refreshToken),
      userId: user._id,
      expiresAt:
        new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
    });

    setAuthCookies(
      res,
      accessToken,
      refreshToken
    );

    await writeSecurityEvent({
      eventType: "mfa_login_success",
      severity: "info",
      userId: user._id,
      req,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        mfaEnabled: user.mfaEnabled,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function disableMfa(
  req,
  res,
  next
) {
  try {
    const {
      password,
      code,
    } = req.body;

    const user = await User.findById(req.user.id).select(
      "+passwordHash +mfaSecretEncrypted"
    );

    if (
      !user ||
      !user.mfaEnabled
    ) {
      return res.status(400).json({
        success: false,
        message: "MFA is not enabled",
      });
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const secret = decrypt(
      user.mfaSecretEncrypted
    );

    const result = await verifyTotp({
      secret,
      token: String(code),
    });

    if (!result.valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication code",
      });
    }

    user.mfaEnabled = false;
    user.mfaSecretEncrypted = null;
    user.mfaRecoveryCodes = [];

    await user.save({
      validateBeforeSave: false,
    });

    await writeSecurityEvent({
      eventType: "mfa_disabled",
      severity: "high",
      userId: user._id,
      req,
    });

    return res.json({
      success: true,
      message: "Two-factor authentication disabled",
    });
  } catch (error) {
    next(error);
  }
}

export async function generateRecoveryCodes(
  req,
  res,
  next
) {
  try {
    const user = await User.findById(req.user.id).select(
      "+passwordHash +mfaSecretEncrypted +mfaRecoveryCodes"
    );

    if (
      !user ||
      !user.mfaEnabled
    ) {
      return res.status(400).json({
        success: false,
        message: "MFA must be enabled first",
      });
    }

    const { password, } = req.body;

    const passwordValid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const recoveryCodes = [];

    for (let i = 0; i < 10; i++) {
      const rawCode = crypto
        .randomBytes(5)
        .toString("hex")
        .toUpperCase();

      const formattedCode = `${rawCode.slice(0, 5)}-${rawCode.slice(5)}`;

      const hash =
        await bcrypt.hash(
          formattedCode,
          BCRYPT_ROUNDS
        );

      recoveryCodes.push({
        raw: formattedCode,
        hash,
        usedAt: null,
      });
    }

    user.mfaRecoveryCodes =
      recoveryCodes.map(
        (code) => ({
          hash: code.hash,
          usedAt: null,
        })
      );

    await user.save({
      validateBeforeSave: false,
    });

    await writeSecurityEvent({
      eventType: "mfa_recovery_codes_generated",
      severity: "high",
      userId: user._id,
      req,
    })

    return res.json({
      success: true,
      recoveryCodes:
        recoveryCodes.map(
          (code) => code.raw
        ),
      message: "Save these recovery codes securely. They will not be shown again.",
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyRecoveryCode(
  req,
  res,
  next
) {
  try {
    const {
      mfaToken,
      recoveryCode,
    } = req.body;

    if (
      !mfaToken ||
      !recoveryCode
    ) {
      return res.status(400).json({
        success: false,
        message: "Recovery code is required",
      });
    }

    const challenge =
      await AuthToken.findOne({
        tokenHash: hashRandomToken(mfaToken),
        type: "mfa_login",
        usedAt: null,
        expiresAt: {
          $gt: new Date(),
        },
      });

    if (!challenge) {
      return res.status(401).json({
        success: false,
        message: "MFA session is invalid or expired",
      });
    }

    const user = await User.findById(challenge.userId).select(
      "+mfaRecoveryCodes"
    );

    if (
      !user ||
      !user.mfaEnabled
    ) {
      return res.status(401).json({
        success: false,
        message: "MFA authentication failed",
      });
    }

    let matchedCode = null;

    for (const storedCode of user.mfaRecoveryCodes) {
      if (storedCode.usedAt) {
        continue;
      }

      const matches =
        await bcrypt.compare(
          recoveryCode,
          storedCode.hash
        );

      if (matches) {
        matchedCode = storedCode;
        break;
      }
    }

    if (!matchedCode) {
      await writeSecurityEvent({
        eventType: "mfa_recovery_code_failed",
        severity: "high",
        userId: user._id,
        req,
      });

      return res.status(401).json({
        success: false,
        message: "Invalid recovery code",
      });
    }

    matchedCode.usedAt = new Date();
    challenge.usedAt = new Date();
    user.lastLoginAt = new Date();
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;

    await Promise.all([
      user.save({
        validateBeforeSave: false,
      }),
      challenge.save(),
    ]);

    const accessToken = createAccessToken(user);

    const refreshToken = createRefreshToken(user);

    await RefreshToken.create({
      tokenHash: hashToken(refreshToken),
      userId: user._id,
      expiresAt:
        new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
    });

    setAuthCookies(
      res,
      accessToken,
      refreshToken
    );

    await writeSecurityEvent({
      eventType: "mfa_recovery_login_success",
      severity: "high",
      userId: user._id,
      req,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        mfaEnabled: user.mfaEnabled,
      },
    });
  } catch (error) {
    next(error);
  }
}