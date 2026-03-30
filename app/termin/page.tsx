import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Erstgespräch buchen — Das Auftragswerk",
  description:
    "Buchen Sie Ihr unverbindliches Erstgespräch. 15-20 Minuten, kein Pitch.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TerminPage() {
  const calendarSrc =
    "https://links.dasauftragswerk.de/widget/booking/FTvBMxR1K7H3NEe3WrqM";
  const calendarId = "FTvBMxR1K7H3NEe3WrqM_1774414805284";
  // Important: keep this fallback fully static to avoid hydration mismatches.
  const calendarFallbackSrcDoc = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { height: 100%; }
      body {
        margin: 0;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        background: #ffffff;
        color: #555555;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
      .animate-pulse { animation: pulse 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite; }
    </style>
  </head>
  <body>
    <div class="animate-pulse">Kalender lädt...</div>
  </body>
</html>`;

  return (
    <div className="min-h-screen bg-white">
      <header className="py-8">
        <div className="mx-auto max-w-3xl px-6">
          <Image
            src="/logo-horizontal.png"
            alt="Das Auftragswerk"
            width={160}
            height={40}
            className="mx-auto h-10 w-40"
            priority
          />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">
            Erstgespräch buchen
          </h1>
          <p className="mt-4 text-text-muted max-w-lg mx-auto">
            15-20 Minuten. Kein Pitch. Nur eine ehrliche Einschätzung ob das
            System für Ihren Betrieb Sinn macht.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center rounded-full bg-bg-blue px-4 py-1.5 text-sm text-primary/80">
              ✓ Unverbindlich
            </span>
            <span className="inline-flex items-center rounded-full bg-bg-blue px-4 py-1.5 text-sm text-primary/80">
              ✓ Kein Abo
            </span>
            <span className="inline-flex items-center rounded-full bg-bg-blue px-4 py-1.5 text-sm text-primary/80">
              ✓ System gehört Ihnen
            </span>
          </div>
        </div>

        <div className="mt-8">
          <iframe
            title="Erstgespräch buchen"
            loading="eager"
            src={calendarSrc}
            id={calendarId}
            scrolling="no"
            height="700"
            className="w-full min-h-[600px] md:min-h-[700px] border-none rounded-xl shadow-sm"
            style={{ width: "100%", border: "none", overflow: "hidden" }}
            srcDoc={calendarFallbackSrcDoc}
          />
          <Script
            src="https://links.dasauftragswerk.de/js/form_embed.js"
            strategy="afterInteractive"
          />
        </div>

        <p className="mt-6 text-sm text-text-muted text-center">
          Fragen?{" "}
          <a
            href="mailto:info@dasauftragswerk.de"
            className="text-primary hover:underline"
          >
            info@dasauftragswerk.de
          </a>
        </p>

        <footer className="py-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
            <span>© 2026 Das Auftragswerk</span>
            <Link href="/impressum" className="hover:underline">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:underline">
              Datenschutz
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

