"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (localStorage.getItem("cookie-consent") === "true") {
      // Mock tracking call
      console.log(`[Analytics] Page View: ${pathname}${searchParams.toString()}`);
    }
  }, [pathname, searchParams]);

  return null;
}
