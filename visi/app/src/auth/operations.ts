import { type SubmitAccessRequest } from "wasp/server/operations";
import { emailSender } from "wasp/server/email";
import { z } from "zod";

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

const accessRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  fullName: z.string().min(1, "Full name is required"),
  reason: z.string().optional(),
});

type AccessRequestInput = z.infer<typeof accessRequestSchema>;

export const submitAccessRequest: SubmitAccessRequest<
  AccessRequestInput,
  { isInstitutional: boolean }
> = async (args, context) => {
  const { email, fullName, reason } = accessRequestSchema.parse(args);
  const institutional = isInstitutionalEmail(email);

  // Check for existing request with this email
  const existing = await context.entities.AccessRequest.findFirst({
    where: { email },
  });
  if (existing) {
    throw new Error(
      "An access request with this email already exists. If you already have credentials, use the Log In button."
    );
  }

  // Create the access request record
  await context.entities.AccessRequest.create({
    data: {
      email,
      fullName,
      reason: reason || null,
      isInstitutionalEmail: institutional,
      status: institutional ? "approved" : "pending",
    },
  });

  // Send notification email to admin
  try {
    const statusLine = institutional
      ? "This is an institutional email -- auto-approved."
      : "This is a NON-institutional email -- requires manual approval and Keycloak account creation.";

    await emailSender.send({
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `[VISI Lab] Access request from ${fullName} (${email})`,
      text: [
        `New VISI Lab access request:`,
        ``,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Reason: ${reason || "N/A"}`,
        `Institutional: ${institutional ? "Yes" : "No"}`,
        ``,
        statusLine,
      ].join("\n"),
      html: `
        <h2>New VISI Lab Access Request</h2>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${fullName}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Reason:</td><td>${reason || "N/A"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Institutional:</td><td>${institutional ? "Yes" : "No"}</td></tr>
        </table>
        <p><strong>${statusLine}</strong></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send admin notification email:", error);
  }

  return { isInstitutional: institutional };
};
