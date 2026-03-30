import type { Metadata } from "next";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingEmbed from "./BookingEmbed";

export const metadata: Metadata = {
  title: "Erstgespräch buchen — Das Auftragswerk",
  description:
    "Buchen Sie Ihr unverbindliches Erstgespräch. 15-20 Minuten, kein Pitch — nur eine ehrliche Einschätzung, ob das System für Ihren Betrieb passt.",
  robots: {
    index: false,
    follow: false,
  },
};

const steps = [
  {
    number: "1",
    title: "Ihren Betrieb verstehen",
    body: "Wir schauen uns Ihre aktuelle Situation an – Branche, Standort, wie Anfragen heute reinkommen.",
  },
  {
    number: "2",
    title: "System live zeigen",
    body: "Sie sehen in 5 Minuten, wie das System konkret für Ihren Betrieb aussehen würde.",
  },
  {
    number: "3",
    title: "Klare Empfehlung",
    body: "Passt es oder nicht – wir sagen es Ihnen direkt. Kein Druck, keine Verkaufsmasche.",
  },
];

const trustItems = [
  { label: "Unverbindlich" },
  { label: "Kein Abo" },
  { label: "System gehört Ihnen" },
];

export default function TerminPage() {
  return (
    <>
      <Nav showHeaderCta={false} showNavLinks={false} />

      <main className="bg-white">
        {/* ── Hero ── */}
        <section className="pt-28 pb-10 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-bg-blue px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
              Persönlicher Gesprächstermin
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight text-primary md:text-5xl">
              Erstgespräch buchen
            </h1>

            <p className="mt-5 text-base text-text-muted md:text-lg max-w-xl mx-auto leading-relaxed">
              Kein Verkaufsgespräch. Nur eine ehrliche Einschätzung ob das
              System für Ihren Betrieb Sinn macht — und was konkret möglich
              wäre.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {trustItems.map(({ label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-bg-blue px-4 py-1.5 text-sm font-medium text-primary/80"
                >
                  <svg
                    className="h-3.5 w-3.5 text-accent shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.235a1 1 0 0 1 .062 1.413l-7.5 8a1 1 0 0 1-1.46.013l-3.5-3.666a1 1 0 0 1 1.448-1.382L8.69 12.49l6.597-7.029a1 1 0 0 1 1.416-.226Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Was erwartet Sie? ── */}
        <section className="px-6 pb-10">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-text-muted mb-6">
              Was passiert in 15-20 Minuten?
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-gray-100 bg-bg-gray p-5"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <p className="font-semibold text-text-dark text-sm mb-1">
                    {step.title}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Calendar ── */}
        <section className="px-6 pb-6">
          <div className="mx-auto max-w-3xl">
            <BookingEmbed />
            <Script
              src="https://links.dasauftragswerk.de/js/form_embed.js"
              strategy="afterInteractive"
            />
          </div>
        </section>

        {/* ── Reassurance + Contact ── */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 flex flex-wrap justify-center gap-6 text-sm text-text-muted">
              {["Kein Pitch", "Kein Abo", "Keine Verpflichtung"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-green-500 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t}
                </span>
              ))}
            </div>

            <p className="text-sm text-text-muted">
              Fragen vor dem Termin?{" "}
              <a
                href="mailto:info@dasauftragswerk.de"
                className="font-medium text-primary hover:underline underline-offset-2"
              >
                info@dasauftragswerk.de
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer showStickyCta={false} />
    </>
  );
}
