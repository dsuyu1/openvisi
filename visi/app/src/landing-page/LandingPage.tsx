import { useAuth } from "wasp/client/auth";
import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { Navigate } from "react-router";
import { Button } from "../client/components/ui/button";
import { Shield, LogIn } from "lucide-react";

export default function LandingPage() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Authenticated users go straight to the lab
  if (user) {
    return <Navigate to="/lab" replace />;
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <Shield className="text-primary h-8 w-8" />
        </div>
        <h1 className="text-foreground mb-3 text-3xl font-bold">VISI Lab</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Sign in to access your security tools, lab environment, and resources.
        </p>
        <Button size="lg" asChild>
          <WaspRouterLink to={routes.LoginRoute.to}>
            Sign In <LogIn className="ml-2 h-4 w-4" />
          </WaspRouterLink>
        </Button>
      </div>
    </div>
  );
}
