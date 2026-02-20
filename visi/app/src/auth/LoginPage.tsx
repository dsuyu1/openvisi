import { LoginForm } from "wasp/client/auth";

export default function Login() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-xl dark:bg-white">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-gray-900">VISI Lab</h2>
          <p className="mt-1 text-sm text-gray-600">
            Sign in or register via SSO to access lab tools.
          </p>
        </div>
        <LoginForm />
        <p className="mt-4 text-center text-xs text-gray-500">
          Clicking above will redirect you to our SSO portal where you can sign
          in or create a new account.
        </p>
      </div>
    </div>
  );
}
