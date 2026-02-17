import { routes } from "wasp/client/router";
import { BlogUrl, DocsUrl } from "../../../shared/common";
import type { NavigationItem } from "./NavBar";

const staticNavigationItems: NavigationItem[] = [
  { name: "Documentation", to: DocsUrl },
  { name: "Blog", to: BlogUrl },
];

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Features", to: "/#features" },
  { name: "Pricing", to: routes.PricingPageRoute.to },
  ...staticNavigationItems,
] as const;

export const labNavigationItems: NavigationItem[] = [
  { name: "Lab", to: routes.LabRoute.to },
  { name: "Account", to: routes.AccountRoute.to },
] as const;

export const demoNavigationitems: NavigationItem[] = [
  { name: "Lab", to: routes.LabRoute.to },
  { name: "AI Scheduler", to: routes.DemoAppRoute.to },
  { name: "File Upload", to: routes.FileUploadRoute.to },
  ...staticNavigationItems,
] as const;
