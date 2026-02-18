import { type GetUserLabAccess } from "wasp/server/operations";

type LabAccessResult = {
  isApproved: boolean;
  approvalStatus: string;
  isInstitutionalEmail: boolean;
  email: string | null;
};

export const getUserLabAccess: GetUserLabAccess<void, LabAccessResult> = async (
  _args,
  context
) => {
  if (!context.user) {
    throw new Error("Not authenticated");
  }

  const user = context.user;
  const isApproved =
    user.approvalStatus === "auto_approved" ||
    user.approvalStatus === "approved";

  return {
    isApproved,
    approvalStatus: user.approvalStatus,
    isInstitutionalEmail: user.isInstitutionalEmail,
    email: user.email,
  };
};
