import { type AuthUser } from "wasp/auth";
import { useAuth } from "wasp/client/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";
import { Button } from "../client/components/ui/button";
import {
  Shield,
  Bug,
  Radar,
  ExternalLink,
  Lock,
  ServerCrash,
  type LucideIcon,
} from "lucide-react";

interface LabTool {
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
  status: "active" | "coming-soon";
}

const labTools: LabTool[] = [
  {
    name: "Wazuh",
    description:
      "Security Information and Event Management (SIEM) and Extended Detection and Response (XDR). Monitor endpoints, detect threats, and respond to incidents.",
    url: "https://wazuh.vaqueroisi.org",
    icon: Shield,
    status: "active",
  },
  {
    name: "TheHive",
    description:
      "Security incident response platform. Collaborate on investigations, manage cases, and coordinate incident response workflows.",
    url: "https://hive.vaqueroisi.org",
    icon: Bug,
    status: "coming-soon",
  },
  {
    name: "ProjectDiscovery",
    description:
      "Attack surface management and vulnerability scanning. Discover exposed assets, run nuclei scans, and identify security weaknesses.",
    url: "https://pd.vaqueroisi.org",
    icon: Radar,
    status: "coming-soon",
  },
];

function ToolCard({ tool }: { tool: LabTool }) {
  const Icon = tool.icon;
  const isActive = tool.status === "active";

  return (
    <Card variant={isActive ? "accent" : "default"} className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="text-primary h-5 w-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{tool.name}</CardTitle>
            {!isActive && (
              <span className="text-muted-foreground mt-1 inline-block rounded-full border px-2 py-0.5 text-xs">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription>{tool.description}</CardDescription>
      </CardContent>
      <CardFooter>
        {isActive ? (
          <Button asChild className="w-full">
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              Open {tool.name}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            <Lock className="mr-2 h-4 w-4" />
            Not Yet Available
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function getUserDisplayName(user: AuthUser): string {
  return user.username || user.email || "Lab Member";
}

export default function LabPage() {
  const { data: user } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          VISI Lab
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Welcome back{user ? `, ${getUserDisplayName(user)}` : ""}. Access your
          security tools and resources below.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold">Security Tools</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          All tools use your VISI Lab SSO credentials. Sign in once to access
          everything.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {labTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ServerCrash className="h-5 w-5" />
              Need Access?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm leading-relaxed">
              <strong>Institutional email users:</strong> If you registered with
              your institutional email (.edu), your account is automatically
              provisioned with access to all active tools.
            </CardDescription>
            <CardDescription className="mt-3 text-sm leading-relaxed">
              <strong>Other users:</strong> If you registered with a
              non-institutional email, your access request is being reviewed. An
              admin will manually confirm your account. You will receive an email
              once your access is granted.
            </CardDescription>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
