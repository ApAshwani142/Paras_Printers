import crypto from "crypto";

export function createRandomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

export function hashRandomToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export function createOtp(length = 8) {
  const max = 10 ** length;

  return crypto
    .randomInt(0, max)
    .toString()
    .padStart(length, "0");
}