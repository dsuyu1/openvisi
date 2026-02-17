import { SignupForm } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { AuthPageLayout } from "./AuthPageLayout";

export function Signup() {
  return (
    <AuthPageLayout>
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">Join VISI Lab</h2>
        <p className="mt-1 text-sm text-gray-600">
          Use your institutional email for automatic access, or sign up with any
          email for manual review.
        </p>
      </div>
      <SignupForm />
      <br />
      <span className="text-sm font-medium text-gray-900">
        I already have an account (
        <WaspRouterLink to={routes.LoginRoute.to} className="underline">
          go to login
        </WaspRouterLink>
        ).
      </span>
      <br />
    </AuthPageLayout>
  );
}
