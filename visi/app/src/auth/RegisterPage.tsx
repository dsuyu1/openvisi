import { useState } from "react";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { submitAccessRequest } from "wasp/client/operations";
import { Button } from "../client/components/ui/button";
import { Input } from "../client/components/ui/input";
import { Label } from "../client/components/ui/label";
import { Textarea } from "../client/components/ui/textarea";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    isInstitutional?: boolean;
    error?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const res = await submitAccessRequest({ email, fullName, reason });
      setResult({ success: true, isInstitutional: res.isInstitutional });
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (result?.success) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-xl dark:bg-white">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Request Submitted
          </h2>
          {result.isInstitutional ? (
            <div>
              <p className="text-gray-700">
                Your institutional email has been recognized. An administrator
                will create your Keycloak credentials shortly.
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Once your account is ready, you can{" "}
                <WaspRouterLink
                  to={routes.LoginRoute.to}
                  className="font-medium underline"
                >
                  log in with SSO
                </WaspRouterLink>
                .
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-700">
                Your request has been sent to an administrator for review. Since
                a non-institutional email was provided, manual approval is
                required.
              </p>
              <p className="mt-4 text-sm text-gray-600">
                You will receive your Keycloak credentials once approved. Then
                you can{" "}
                <WaspRouterLink
                  to={routes.LoginRoute.to}
                  className="font-medium underline"
                >
                  log in with SSO
                </WaspRouterLink>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-xl dark:bg-white">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-gray-900">VISI Lab</h2>
          <p className="mt-1 text-sm text-gray-600">
            Request access to lab tools and resources.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName" className="text-gray-900">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-900">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@utrgv.edu"
              className="mt-1"
            />
            <p className="mt-1 text-xs text-gray-500">
              Institutional emails (.edu) are processed faster.
            </p>
          </div>

          <div>
            <Label htmlFor="reason" className="text-gray-900">
              Reason for access{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., CSCI 4390 student, SOC analyst intern..."
              className="mt-1"
              rows={3}
            />
          </div>

          {result?.error && (
            <p className="text-sm text-red-600">{result.error}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Request Access"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">
            Already have credentials?{" "}
            <WaspRouterLink
              to={routes.LoginRoute.to}
              className="font-medium text-gray-900 underline"
            >
              Log in with SSO
            </WaspRouterLink>
          </span>
        </div>
      </div>
    </div>
  );
}
