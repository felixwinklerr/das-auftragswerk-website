"use client";

import Script from "next/script";

export default function ContactForm() {
  return (
    <section id="kontakt" className="bg-bg-orange py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-primary md:text-4xl">
          Schauen wir ob es passt.
        </h2>
        <p className="mt-4 mb-12 text-center text-text-muted">
          20 Minuten. Kein Pitch. Nur eine ehrliche Einschätzung ob das System
          für Ihren Betrieb Sinn macht.
        </p>

        {/* GHL Booking Calendar */}
        <div className="rounded-2xl bg-white p-2 shadow-sm">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/kgwtAWrmyfyVBqZ0C44p"
            style={{ width: "100%", border: "none", overflow: "hidden" }}
            scrolling="no"
            id="kgwtAWrmyfyVBqZ0C44p_1773219288912"
            height="700"
          />
        </div>

        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="afterInteractive"
        />

        {/* Trust bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
          {[
            "Kein Abo",
            "System gehört Ihnen",
            "60-Tage Garantie",
            "DACH-Markt",
          ].map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
