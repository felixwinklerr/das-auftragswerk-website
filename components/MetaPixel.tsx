"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent } from "@/components/CookieBanner";

const PIXEL_ID = "2120755065444667";

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    };
    _fbq: unknown;
  }
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

function fireCapiEvent(eventName: string, eventId: string) {
  fetch("/api/meta-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      source_url: window.location.href,
      user_data: {
        client_user_agent: navigator.userAgent,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      },
    }),
  }).catch(() => {/* silent — non-critical */});
}

function initPixelAndEvents() {
  // Fire PageView
  const pvId = crypto.randomUUID();
  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView", {}, { eventID: pvId });
  }
  fireCapiEvent("PageView", pvId);

  // Listen for GHL booking completion postMessage
  const handleMessage = (event: MessageEvent) => {
    const d = event.data;
    if (!d) return;

    const isBooking =
      d.event === "booking-confirmed" ||
      d.type === "booking-confirmed" ||
      d.event_type === "APPOINTMENT_BOOKED" ||
      d.iframeEvent === "appointment-booked" ||
      (typeof d === "string" && d.includes("appointment-booked"));

    if (isBooking) {
      const leadId = crypto.randomUUID();
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {}, { eventID: leadId });
      }
      fireCapiEvent("Lead", leadId);
    }
  };

  window.addEventListener("message", handleMessage);
  // Note: cleanup not possible here since we need persistent listener — acceptable for SPA
}

export function MetaPixel() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Check existing consent on mount
    if (getConsent() === "accepted") {
      setConsented(true);
      return;
    }

    // Wait for user to accept consent banner
    const handler = () => setConsented(true);
    window.addEventListener("da_consent_accepted", handler);
    return () => window.removeEventListener("da_consent_accepted", handler);
  }, []);

  useEffect(() => {
    if (consented) {
      initPixelAndEvents();
    }
  }, [consented]);

  if (!consented) return null;

  return (
    <>
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
