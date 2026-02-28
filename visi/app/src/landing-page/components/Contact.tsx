import { Mail, MessageSquare } from "lucide-react";
import { Button } from "../../client/components/ui/button";

interface ContactItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  label: string;
}

export default function Contact() {
  const contactItems: ContactItem[] = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "Reach out to learn more or get involved with VISI Lab",
      href: "mailto:damian.villarreal01@utrgv.edu",
      label: "Send an email",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Discord",
      description: "Join our community to connect with members and get updates",
      href: "https://discord.gg/YayXD8CRaP",
      label: "Join our Discord",
    },
  ];

  return (
    <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-950/50" />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to Join?
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Connect with VISI Lab and start your cybersecurity journey. All UTRGV
          students are welcome.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl grid grid-cols-1 gap-8 md:grid-cols-2">
        {contactItems.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center rounded-lg border border-border bg-card p-8 hover:shadow-lg transition-shadow"
          >
            <div className="text-primary mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {item.description}
            </p>
            <Button
              variant="default"
              size="sm"
              className="mt-6"
              asChild
            >
              <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}>
                {item.label}
              </a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
