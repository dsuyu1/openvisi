import { VerifyEmailForm } from "wasp/client/auth";
import { AuthPageLayout } from "../AuthPageLayout";

export function EmailVerificationPage() {
  return (
    <AuthPageLayout>
      <VerifyEmailForm />
    </AuthPageLayout>
  );
}
