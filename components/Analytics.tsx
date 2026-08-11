"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Script from "next/script";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consented, setConsented] = useState(false);

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  useEffect(() => {
    // Check initial cookie consent status
    setConsented(localStorage.getItem("cookie-consent") === "true");

    const handleStorageChange = () => {
      setConsented(localStorage.getItem("cookie-consent") === "true");
    };

    // Listen for cookie consent changes
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cookie-consent-changed", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cookie-consent-changed", handleStorageChange);
    };
  }, []);

  // Built-in Telemetry: Log visitor sessions in database via /api/track
  useEffect(() => {
    const trackVisit = async () => {
      // Ignore admin panel and API route views to keep visitor statistics clean
      if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
        return;
      }

      let geoData: any = {};
      try {
        // Fetch public IP and visiting organization (company) details
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          geoData = await res.json();
        }
      } catch (err) {
        console.warn("Client-side geo-IP lookup failed. Falling back to server headers.", err);
      }

      try {
        const fullPath = `${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;

        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ip: geoData.ip || null,
            city: geoData.city || null,
            region: geoData.region || null,
            country: geoData.country_name || null,
            org: geoData.org || null,
            userAgent: navigator.userAgent || null,
            path: fullPath,
            referer: document.referrer || null,
          }),
        });
      } catch (trackErr) {
        console.error("Failed to log visitor session:", trackErr);
      }
    };

    trackVisit();
  }, [pathname, searchParams]);

  return (
    <>
      <VercelAnalytics />

      {/* Conditionally inject Google Analytics 4 if consented and configured */}
      {consented && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* Conditionally inject Microsoft Clarity if consented and configured */}
      {consented && clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
