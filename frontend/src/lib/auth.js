import { apiRequest } from "./api";

export async function signup(data) {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logout() {
  return apiRequest("/auth/logout", {
    method: "POST",
  });
}

export async function getMe() {
  return apiRequest("/auth/me");
}

export async function forgotPassword(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({email}),
  });
}

export async function resetPassword(
  token,
  password,
  confirmPassword
) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      token,
      password,
      confirmPassword,
    }),
  });
}

export async function verifyEmail(token) {
  return apiRequest(
    `/auth/verify-email?token=${encodeURIComponent(token)}`
  );
}

export async function resendVerification(email) {
  return apiRequest(
    "/auth/resend-verification",
    {
      method: "POST",
      body: JSON.stringify({email}),
    }
  );
}

export async function verifyMfa(
  mfaToken,
  code
) {
  return apiRequest(
    "/auth/verify-mfa",
    {
      method: "POST",
      body: JSON.stringify({ mfaToken, code}),
    }
  );
}

export async function verifyMfaRecovery(
  mfaToken,
  recoveryCode
) {
  return apiRequest(
    "/auth/verify-mfa-recovery",
    {
      method: "POST",
      body: JSON.stringify({mfaToken, recoveryCode}),
    }
  );
}

export async function changePassword(
  currentPassword,
  newPassword,
  confirmPassword
) {
  return apiRequest(
    "/auth/change-password",
    {
      method: "POST",
      body: JSON.stringify({currentPassword, newPassword, confirmPassword,}),
    }
  );
}