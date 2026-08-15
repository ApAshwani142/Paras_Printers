import crypto from "crypto";

import SecurityEvent from "../models/SecurityEvent.js";

export async function writeSecurityEvent({
  eventType,
  severity = "info",
  userId = null,
  req,
  metadata = {},
}) {
  try {
    await SecurityEvent.create({
      eventType,
      severity,
      userId,

      ip:
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.ip,

      userAgent:
        req.get("user-agent") || null,

      requestId:
        req.requestId ||
        crypto.randomUUID(),

      metadata,
    });
  } catch (error) {
    /*
     * Security logging failure must never
     * crash authentication.
     */
    console.error(
      "Security logging failed:",
      error.message
    );
  }
}