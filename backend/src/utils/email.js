import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  family: 4, // Force IPv4 to prevent connection timeouts/ENETUNREACH on Render

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}

export async function sendVerificationEmail(
  email,
  name,
  token
) {
  const url = `${process.env.EMAIL_VERIFICATION_URL}` + `?token=${encodeURIComponent(token)}`;

  return sendEmail({
    to: email,
    subject: "Verify your Paras Printers account",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Welcome to Paras Printers, ${escapeHtml(name)}</h2>

        <p>
          Please verify your email address to activate
          your account.
        </p>

        <p>
          <a href="${url}">
            Verify Email Address
          </a>
        </p>

        <p>This link expires soon.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(
  email,
  name,
  token
) {
  const url =
    `${process.env.PASSWORD_RESET_URL}` +
    `?token=${encodeURIComponent(token)}`;

  return sendEmail({
    to: email,
    subject: "Reset your Paras Printers password",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password reset requested</h2>

        <p>
          Hi ${escapeHtml(name)}, a password reset was
          requested for your account.
        </p>

        <p>
          <a href="${url}">
            Reset Password
          </a>
        </p>

        <p>
          If you did not request this, you can safely ignore
          this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordChangedEmail(
  email,
  name
) {
  return sendEmail({
    to: email,
    subject: "Your Paras Printers password was changed",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password changed</h2>

        <p>
          Hi ${escapeHtml(name)}, your password was changed
          successfully.
        </p>

        <p>
          If you did not make this change, contact support
          immediately.
        </p>
      </div>
    `,
  });
}

export async function sendLoginAlertEmail(
  email,
  name,
  metadata
) {
  return sendEmail({
    to: email,
    subject: "New login to your Paras Printers account",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>New login detected</h2>

        <p>Hi ${escapeHtml(name)},</p>

        <p>
          A login was detected on your account.
        </p>

        <p>
          IP: ${escapeHtml(metadata.ip || "Unknown")}
        </p>

        <p>
          Time: ${escapeHtml(
            new Date().toISOString()
          )}
        </p>
      </div>
    `,
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}