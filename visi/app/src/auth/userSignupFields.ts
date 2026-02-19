import { defineUserSignupFields } from "wasp/auth/providers/types";
import { z } from "zod";

const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

const institutionalDomains =
  process.env.INSTITUTIONAL_EMAIL_DOMAINS?.split(",").map((d) =>
    d.trim().toLowerCase()
  ) || [];

function isInstitutionalEmail(email: string): boolean {
  if (institutionalDomains.length === 0) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return institutionalDomains.some(
    (inst) => domain === inst || domain?.endsWith(`.${inst}`)
  );
}

const emailDataSchema = z.object({
  email: z.string(),
});

export const getEmailUserFields = defineUserSignupFields({
  email: (data) => {
    const emailData = emailDataSchema.parse(data);
    return emailData.email;
  },
  username: (data) => {
    const emailData = emailDataSchema.parse(data);
    return emailData.email;
  },
  isAdmin: (data) => {
    const emailData = emailDataSchema.parse(data);
    return adminEmails.includes(emailData.email);
  },
  isInstitutionalEmail: (data) => {
    const emailData = emailDataSchema.parse(data);
    return isInstitutionalEmail(emailData.email);
  },
  approvalStatus: (data) => {
    const emailData = emailDataSchema.parse(data);
    if (isInstitutionalEmail(emailData.email)) {
      return "auto_approved";
    }
    return "pending";
  },
});
