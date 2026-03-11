"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "da_cookie_consent";

export type ConsentValue = "accepted" | "declined" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(CONSENT_KEY);
  if (val === "accepted" || val === "declined") return val;
  return null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no prior decision
    if (getConsent() === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("da_consent_accepted"));
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-5 shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-text-mid">
          Wir verwenden Marketing-Cookies (Meta Pixel), um den Erfolg unserer
          Werbeanzeigen zu messen.{" "}
          <Link
            href="/datenschutz"
            className="underline hover:text-primary"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={decline}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-text-mid transition-colors hover:border-gray-400 hover:text-text-dark"
          >
            Nur Notwendige
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-105"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
