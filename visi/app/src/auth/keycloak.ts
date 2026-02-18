import { defineUserSignupFields } from "wasp/auth/providers/types";
import { z } from "zod";

const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

// Comma-separated list of institutional email domains (e.g., "utrgv.edu,tamuk.edu")
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

const keycloakDataSchema = z.object({
  profile: z.object({
    sub: z.string(),
    email: z.string().email().optional(),
    email_verified: z.boolean().optional(),
    preferred_username: z.string().optional(),
    name: z.string().optional(),
  }),
});

export const getKeycloakUserFields = defineUserSignupFields({
  email: (data) => {
    const keycloakData = keycloakDataSchema.parse(data);
    return keycloakData.profile.email ?? keycloakData.profile.sub;
  },
  username: (data) => {
    const keycloakData = keycloakDataSchema.parse(data);
    return (
      keycloakData.profile.preferred_username ??
      keycloakData.profile.email ??
      keycloakData.profile.sub
    );
  },
  isAdmin: (data) => {
    const keycloakData = keycloakDataSchema.parse(data);
    if (!keycloakData.profile.email) return false;
    return adminEmails.includes(keycloakData.profile.email);
  },
  isInstitutionalEmail: (data) => {
    const keycloakData = keycloakDataSchema.parse(data);
    if (!keycloakData.profile.email) return false;
    return isInstitutionalEmail(keycloakData.profile.email);
  },
  approvalStatus: (data) => {
    const keycloakData = keycloakDataSchema.parse(data);
    if (!keycloakData.profile.email) return "pending";
    // Auto-approve institutional emails
    if (isInstitutionalEmail(keycloakData.profile.email)) {
      return "auto_approved";
    }
    // Non-institutional emails require manual approval
    return "pending";
  },
});

export function getKeycloakAuthConfig() {
  return {
    scopes: ["openid", "profile", "email"],
  };
}
