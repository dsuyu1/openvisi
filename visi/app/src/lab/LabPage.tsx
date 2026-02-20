import { useAuth } from "wasp/client/auth";
import { getUserLabAccess, useQuery } from "wasp/client/operations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";

type LabTool = {
  name: string;
  description: string;
  url: string;
  status: "available" | "coming_soon";
};

const LAB_TOOLS: LabTool[] = [
  {
    name: "Wazuh",
    description:
      "Security Information and Event Management (SIEM) - Monitor threats, detect vulnerabilities, and respond to incidents.",
    url: "https://wazuh.vaqueroisi.org",
    status: "available",
  },
  {
    name: "TheHive",
    description:
      "Security Incident Response Platform - Collaborate on investigations and manage security cases.",
    url: "https://hive.vaqueroisi.org",
    status: "coming_soon",
  },
  {
    name: "ProjectDiscovery",
    description:
      "Vulnerability scanning and attack surface management toolkit.",
    url: "https://discovery.vaqueroisi.org",
    status: "coming_soon",
  },
];

function PendingAccessBanner() {
  return (
    <div className="mb-8 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
      <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
        Access Pending Approval
      </h3>
      <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
        Your account is pending manual approval. A non-institutional email was
        detected. An administrator will review your request and provision your
        credentials. You will receive access once approved.
      </p>
    </div>
  );
}

function ToolCard({ tool, isApproved }: { tool: LabTool; isApproved: boolean }) {
  const isAccessible = isApproved && tool.status === "available";

  return (
    <Card
      className={
        !isAccessible ? "opacity-60" : "cursor-pointer hover:border-blue-400"
      }
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{tool.name}</CardTitle>
          {tool.status === "coming_soon" ? (
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              Coming Soon
            </span>
          ) : !isApproved ? (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
              Pending Access
            </span>
          ) : (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
              Available
            </span>
          )}
        </div>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isAccessible ? (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Open {tool.name}
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ) : tool.status === "coming_soon" ? (
          <span className="text-sm text-gray-500">
            This tool will be available soon.
          </span>
        ) : (
          <span className="text-sm text-yellow-600 dark:text-yellow-400">
            Access will be granted after approval.
          </span>
        )}
      </CardContent>
    </Card>
  );
}

export default function LabPage() {
  const { data: user } = useAuth();
  const {
    data: labAccess,
    isLoading,
    error,
  } = useQuery(getUserLabAccess);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading lab access...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">
          Error loading lab access. Please try again.
        </p>
      </div>
    );
  }

  const isApproved = labAccess?.isApproved ?? false;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">VISI Lab</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Welcome{user?.email ? `, ${user.email}` : ""}. Access your security
          tools and resources below.
        </p>
      </div>

      {!isApproved && <PendingAccessBanner />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LAB_TOOLS.map((tool) => (
          <ToolCard key={tool.name} tool={tool} isApproved={isApproved} />
        ))}
      </div>
    </div>
  );
}
