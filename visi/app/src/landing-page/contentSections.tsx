import kivo from "../client/static/examples/kivo.webp";
import messync from "../client/static/examples/messync.webp";
import microinfluencerClub from "../client/static/examples/microinfluencers.webp";
import promptpanda from "../client/static/examples/promptpanda.webp";
import reviewradar from "../client/static/examples/reviewradar.webp";
import { BlogUrl, DocsUrl } from "../shared/common";
import type { GridFeature } from "./components/FeaturesGrid";

export const features: GridFeature[] = [
  {
    name: "Getting Started with Wazuh",
    description:
      "A beginner's guide to deploying and configuring Wazuh for security monitoring.",
    emoji: "🛡️",
    href: BlogUrl,
    size: "large",
  },
  {
    name: "CTF Write-up: Web Exploitation",
    description:
      "Step-by-step walkthrough of web exploitation challenges from our latest competition.",
    emoji: "🏴",
    href: BlogUrl,
    size: "medium",
  },
  {
    name: "Building a Home Lab",
    description:
      "How to set up a cybersecurity home lab for hands-on practice.",
    emoji: "🔧",
    href: BlogUrl,
    size: "medium",
  },
  {
    name: "Network Traffic Analysis",
    description:
      "Techniques for analyzing network packets and identifying threats.",
    emoji: "📡",
    href: BlogUrl,
    size: "small",
  },
  {
    name: "Security Certifications Guide",
    description:
      "A roadmap for students pursuing cybersecurity certifications.",
    emoji: "📜",
    href: BlogUrl,
    size: "small",
  },
  {
    name: "Incident Response 101",
    description:
      "Essential procedures for handling security incidents in an enterprise environment.",
    emoji: "🚨",
    href: BlogUrl,
    size: "medium",
  },
];

export const footerNavigation = {
  app: [
    { name: "Documentation", href: DocsUrl },
    { name: "Security Blog", href: BlogUrl },
  ],
  company: [
    { name: "About VISI Lab", href: "https://vaqueroisi.org" },
    { name: "UTRGV", href: "https://utrgv.edu" },
    { name: "Privacy", href: "#" },
  ],
};

export const examples = [
  {
    name: "Wazuh SIEM Lab",
    description:
      "Security Information and Event Management platform for real-time threat detection.",
    imageSrc: kivo,
    href: "#",
  },
  {
    name: "Penetration Testing Toolkit",
    description:
      "Custom tools and scripts developed for CTF competitions and security assessments.",
    imageSrc: messync,
    href: "#",
  },
  {
    name: "SOC Dashboard",
    description:
      "Security Operations Center monitoring dashboard for network traffic analysis.",
    imageSrc: microinfluencerClub,
    href: "#",
  },
  {
    name: "Vulnerability Scanner",
    description:
      "Automated vulnerability assessment tool for web application security testing.",
    imageSrc: promptpanda,
    href: "#",
  },
  {
    name: "Incident Response Playbook",
    description:
      "Documented procedures and automated workflows for security incident handling.",
    imageSrc: reviewradar,
    href: "#",
  },
];
