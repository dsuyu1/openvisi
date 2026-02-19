import { LoginForm } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";

export default function Login() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-xl dark:bg-white">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-gray-900">VISI Lab</h2>
          <p className="mt-1 text-sm text-gray-600">
            Sign in with your Keycloak credentials to access lab tools.
          </p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Don't have credentials yet?{" "}
            <WaspRouterLink
              to={routes.RegisterRoute.to}
              className="font-medium text-gray-900 underline"
            >
              Request access
            </WaspRouterLink>
          </span>
        </div>
      </div>
    </div>
  );
}
