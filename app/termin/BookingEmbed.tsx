"use client";

import { useState } from "react";

const calendarSrc =
  "https://links.dasauftragswerk.de/widget/booking/FTvBMxR1K7H3NEe3WrqM";
const calendarId = "FTvBMxR1K7H3NEe3WrqM_1774414805284";

export default function BookingEmbed() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-text-muted">Kalender wird geladen…</p>
        </div>
      )}

      <iframe
        title="Erstgespräch buchen"
        loading="eager"
        src={calendarSrc}
        id={calendarId}
        scrolling="no"
        style={{ width: "100%", border: "none", overflow: "hidden" }}
        className="relative z-0 w-full border-none"
        height="700"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
}
