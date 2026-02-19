import { ResetPasswordForm } from "wasp/client/auth";
import { AuthPageLayout } from "../AuthPageLayout";

export function PasswordResetPage() {
  return (
    <AuthPageLayout>
      <ResetPasswordForm />
    </AuthPageLayout>
  );
}
