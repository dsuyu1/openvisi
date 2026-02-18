import { SignupForm } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { AuthPageLayout } from "./AuthPageLayout";

export function Signup() {
  return (
    <AuthPageLayout>
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">VISI Lab</h2>
        <p className="mt-1 text-sm text-gray-600">
          Sign up with your institutional SSO to get access to lab tools.
        </p>
      </div>
      <SignupForm />
      <br />
      <span className="text-sm font-medium text-gray-900">
        Already have an account?{" "}
        <WaspRouterLink to={routes.LoginRoute.to} className="underline">
          sign in
        </WaspRouterLink>
        .
      </span>
      <br />
      <p className="mt-4 text-xs text-gray-500">
        Non-institutional emails require manual approval by an administrator.
      </p>
    </AuthPageLayout>
  );
}
