import type { Metadata } from "next";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingEmbed from "./BookingEmbed";

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
  return (
    <>
      <Nav />
      <main className="bg-white pt-24">
        <div className="mx-auto max-w-3xl px-6 pb-6">
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

          <BookingEmbed />
          <Script
            src="https://links.dasauftragswerk.de/js/form_embed.js"
            strategy="afterInteractive"
          />

        <p className="mt-6 text-sm text-text-muted text-center">
          Fragen?{" "}
          <a
            href="mailto:info@dasauftragswerk.de"
            className="text-primary hover:underline"
          >
            info@dasauftragswerk.de
          </a>
        </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

