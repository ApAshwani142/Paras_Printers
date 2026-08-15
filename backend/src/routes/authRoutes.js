import express from "express";

import {
  signup,
  login,
  refresh,
  logout,
  getMe,

  verifyEmail,
  resendVerificationEmail,

  forgotPassword,
  resetPassword,
  changePassword,

  beginMfaSetup,
  confirmMfaSetup,
  verifyMfaLogin,
  disableMfa,
  generateRecoveryCodes,
  verifyRecoveryCode,
} from "../controllers/authController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  loginLimiter,
  signupLimiter,
  passwordResetLimiter,
  refreshLimiter,
  resendVerificationLimiter,
  mfaLimiter,
  mfaRecoveryLimiter,
} from "../middleware/rateLimiter.js";

const router = express.Router();

router.post(
  "/signup",
  signupLimiter,
  signup
);

router.post(
  "/login",
  loginLimiter,
  login
);

router.post(
  "/refresh",
  refreshLimiter,
  refresh
);

router.post(
  "/verify-mfa",
  mfaLimiter,
  verifyMfaLogin
);

router.post(
  "/verify-mfa-recovery",
  mfaRecoveryLimiter,
  verifyRecoveryCode
);

router.get(
  "/verify-email",
  verifyEmail
);

router.post(
  "/resend-verification",
  resendVerificationLimiter,
  resendVerificationEmail
);

router.post(
  "/forgot-password",
  passwordResetLimiter,
  forgotPassword
);

router.post(
  "/reset-password",
  passwordResetLimiter,
  resetPassword
);

router.post(
  "/logout",
  logout
);

router.get(
  "/me",
  protect,
  getMe
);

router.post(
  "/change-password",
  protect,
  changePassword
);

router.post(
  "/mfa/setup",
  protect,
  beginMfaSetup
);

router.post(
  "/mfa/confirm",
  protect,
  confirmMfaSetup
);

router.post(
  "/mfa/disable",
  protect,
  disableMfa
);

router.post(
  "/mfa/recovery-codes",
  protect,
  generateRecoveryCodes
);

export default router;