"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (localStorage.getItem("cookie-consent") === "true") {
      // Mock tracking call for custom logging
      console.log(`[Analytics] Page View: ${pathname}${searchParams.toString()}`);
    }
  }, [pathname, searchParams]);

  return <VercelAnalytics />;
}
