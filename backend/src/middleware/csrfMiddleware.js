import { doubleCsrf } from "csrf-csrf";

const isProduction = process.env.NODE_ENV === "production";

const {
  doubleCsrfProtection,
  generateCsrfToken,
} = doubleCsrf({
  getSecret: () => {
    if (!process.env.CSRF_SECRET) {
      throw new Error(
        "CSRF_SECRET is missing from environment variables."
      );
    }

    return process.env.CSRF_SECRET;
  },

  getSessionIdentifier: (req) => {
    return req.ip;
  },

  cookieName: isProduction
    ? "__Host-csrf"
    : "csrf-token",

  cookieOptions: {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  },

  size: 64,

  ignoredMethods: [
    "GET",
    "HEAD",
    "OPTIONS",
  ],

  getTokenFromRequest: (req) => {
    return req.headers["x-csrf-token"];
  },
});

export const getCsrfToken = (req, res) => {
  try {
    const token = generateCsrfToken(req, res);

    return res.status(200).json({
      success: true,
      csrfToken: token,
    });
  } catch (error) {
    console.error(
      "CSRF token generation failed:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to generate security token",
    });
  }
};

export const csrfProtection = doubleCsrfProtection;

export const isStateChangingRequest = (req) => {
  return [
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ].includes(req.method);
};