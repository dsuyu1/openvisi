import type { OnAfterSignupHook } from "wasp/server/auth";
import { emailSender } from "wasp/server/email";

const ADMIN_NOTIFICATION_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || "damian.villarreal01@utrgv.edu";

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

export const onAfterSignup: OnAfterSignupHook = async ({
  providerId,
  user,
}) => {
  const email = user.email;
  if (!email) return;

  // If user signed up with a non-institutional email, notify admin for manual approval
  if (!isInstitutionalEmail(email)) {
    try {
      await emailSender.send({
        to: ADMIN_NOTIFICATION_EMAIL,
        subject: `[VISI Lab] New access request from ${email}`,
        text: [
          `A new user has registered on VISI Lab with a non-institutional email.`,
          ``,
          `Email: ${email}`,
          `Username: ${user.username || "N/A"}`,
          `Provider: ${providerId.providerName}`,
          `Registered: ${new Date().toISOString()}`,
          ``,
          `This user requires manual approval before they can access lab tools.`,
          `You can approve them in the admin dashboard or update their status in the database.`,
        ].join("\n"),
        html: `
          <h2>New VISI Lab Access Request</h2>
          <p>A new user has registered with a <strong>non-institutional email</strong> and requires manual approval.</p>
          <table style="border-collapse:collapse;">
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${email}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Username:</td><td>${user.username || "N/A"}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Provider:</td><td>${providerId.providerName}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Registered:</td><td>${new Date().toISOString()}</td></tr>
          </table>
          <p>Approve this user in the <a href="https://lab.vaqueroisi.org/admin/users">admin dashboard</a>.</p>
        `,
      });
    } catch (error) {
      console.error(
        `Failed to send admin notification for new user ${email}:`,
        error
      );
    }
  }
};
