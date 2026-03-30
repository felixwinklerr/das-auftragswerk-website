"use client";

import { useState } from "react";

const calendarSrc =
  "https://links.dasauftragswerk.de/widget/booking/FTvBMxR1K7H3NEe3WrqM";
const calendarId = "FTvBMxR1K7H3NEe3WrqM_1774414805284";

export default function BookingEmbed() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="mt-8">
      <div className="relative overflow-hidden rounded-xl shadow-sm bg-white">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
            <span className="animate-pulse text-sm text-text-muted">
              Kalender lädt...
            </span>
          </div>
        )}

        <iframe
          title="Erstgespräch buchen"
          loading="eager"
          src={calendarSrc}
          id={calendarId}
          scrolling="no"
          style={{ width: "100%", border: "none", overflow: "hidden" }}
          className="relative z-0 w-full min-h-[600px] md:min-h-[700px] border-none"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    </div>
  );
}

