import rateLimit from "express-rate-limit";

const commonOptions = {
  standardHeaders: "draft-8",
  legacyHeaders: false,
};

export const loginLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

export const signupLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    message: "Too many signup attempts. Please try again later.",
  },
});

export const passwordResetLimiter =
  rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
      success: false,
      message: "Too many password reset requests. Please try again later.",
    },
  });

export const refreshLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: {
    success: false,
    message: "Too many token refresh requests. Please try again later.",
  },
});

export const resendVerificationLimiter =
  rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 3,
    message: {
      success: false,
      message:
        "Too many verification email requests. Please try again later.",
    },
  });

export const mfaLimiter = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message:
      "Too many MFA verification attempts. Please try again later.",
  },
}); 

export const mfaRecoveryLimiter =
  rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: {
      success: false,
      message:
        "Too many recovery code attempts. Please try again later.",
    },
  });