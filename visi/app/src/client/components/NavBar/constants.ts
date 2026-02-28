import { routes } from "wasp/client/router";
import { BlogUrl, DocsUrl } from "../../../shared/common";
import type { NavigationItem } from "./NavBar";

const staticNavigationItems: NavigationItem[] = [
  { name: "Documentation", to: DocsUrl },
  { name: "Security Blog", to: BlogUrl },
];

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Our Work", to: "/#our-work" },
  ...staticNavigationItems,
] as const;

export const labNavigationItems: NavigationItem[] = [
  { name: "Lab", to: routes.LabRoute.to },
  ...staticNavigationItems,
] as const;
