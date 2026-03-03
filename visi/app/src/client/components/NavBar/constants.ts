import { routes } from "wasp/client/router";
import { BlogUrl, DocsUrl } from "../../../shared/common";
import type { NavigationItem } from "./NavBar";

export const labNavigationItems: NavigationItem[] = [
  { name: "Lab", to: routes.LabRoute.to },
  { name: "Documentation", to: DocsUrl },
  { name: "Blog", to: BlogUrl },
] as const;
