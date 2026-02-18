import { LoginForm } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { AuthPageLayout } from "./AuthPageLayout";

export default function Login() {
  return (
    <AuthPageLayout>
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">VISI Lab</h2>
        <p className="mt-1 text-sm text-gray-600">
          Sign in with your SSO credentials to access lab tools.
        </p>
      </div>
      <LoginForm />
      <br />
      <span className="text-sm font-medium text-gray-900">
        Don't have an account yet?{" "}
        <WaspRouterLink to={routes.SignupRoute.to} className="underline">
          request access
        </WaspRouterLink>
        .
      </span>
    </AuthPageLayout>
  );
}
