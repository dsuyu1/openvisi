import { useEffect } from "react";

export default function useColorMode() {
  useEffect(() => {
    window.document.body.classList.remove("dark");
    try {
      window.localStorage.removeItem("color-theme");
    } catch {}
  }, []);

  return ["light", () => {}] as const;
}
