import type {
  GetPasswordResetEmailContentFn,
  GetVerificationEmailContentFn,
} from "wasp/server/auth";

export const getVerificationEmailContent: GetVerificationEmailContentFn = ({
  verificationLink,
}) => ({
  subject: "Verify your VISI Lab email",
  text: `Click the link below to verify your email:\n${verificationLink}`,
  html: `
    <p>Welcome to VISI Lab!</p>
    <p>Click the link below to verify your email address:</p>
    <p><a href="${verificationLink}">Verify email</a></p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `,
});

export const getPasswordResetEmailContent: GetPasswordResetEmailContentFn = ({
  passwordResetLink,
}) => ({
  subject: "VISI Lab - Password Reset",
  text: `Click the link below to reset your password:\n${passwordResetLink}`,
  html: `
    <p>You requested a password reset for your VISI Lab account.</p>
    <p>Click the link below to set a new password:</p>
    <p><a href="${passwordResetLink}">Reset password</a></p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `,
});
