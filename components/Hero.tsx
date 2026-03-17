"use client";

import { motion } from "framer-motion";

/* ── Animated system-flow graphic ────────────────────────────── */

interface FlowStep {
  icon: string;
  label: string;
  sublabel: string;
}

const steps: FlowStep[] = [
  { icon: "🔍", label: "Google-Suche", sublabel: "Kunde sucht aktiv" },
  { icon: "📄", label: "Landing Page", sublabel: "Klick & Interesse" },
  { icon: "📩", label: "Anfrage erfasst", sublabel: "Formular / Anruf" },
  { icon: "⚡", label: "Sofort-Antwort", sublabel: "In 60 Sekunden" },
  { icon: "📅", label: "Termin gebucht", sublabel: "Automatisch" },
];

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.18, duration: 0.5, ease: "easeOut" as const },
  }),
};

function SystemGraphic() {
  return (
    <div className="relative mx-auto w-full max-w-md md:max-w-none">
      {/* Background glow */}
      <div className="absolute inset-0 -m-4 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Main card */}
      <motion.div
        className="relative rounded-2xl border border-primary/15 bg-white p-6 shadow-xl md:p-8"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Header bar */}
        <div className="mb-5 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-300" />
          <div className="h-3 w-3 rounded-full bg-yellow-300" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-3 text-xs font-medium text-text-muted">
            Ihr Anfragen-System
          </span>
        </div>

        {/* Flow steps */}
        <div className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-3"
              custom={i}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Step badge */}
              <motion.div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg shadow-sm ${
                  i === steps.length - 1
                    ? "bg-green-50 ring-2 ring-green-400/40"
                    : "bg-bg-blue"
                }`}
                animate={
                  i === steps.length - 1
                    ? { scale: [1, 1.08, 1] }
                    : undefined
                }
                transition={
                  i === steps.length - 1
                    ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
              >
                {step.icon}
              </motion.div>

              {/* Connector bar */}
              <div className="relative h-1.5 w-6 overflow-hidden rounded-full bg-primary/10 md:w-8">
                <motion.div
                  className="absolute inset-y-0 left-0 w-full rounded-full bg-accent/60"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              </div>

              {/* Label */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight text-text-dark">
                  {step.label}
                </p>
                <p className="text-xs text-text-muted">{step.sublabel}</p>
              </div>

              {/* Status indicator */}
              <motion.div
                className={`h-2 w-2 shrink-0 rounded-full ${
                  i === steps.length - 1 ? "bg-green-500" : "bg-primary/30"
                }`}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom stats strip */}
        <motion.div
          className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-bg-gray p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="text-center">
            <p className="text-base font-bold text-primary md:text-lg">24/7</p>
            <p className="text-[10px] text-text-muted">Automatisch</p>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-accent md:text-lg">60s</p>
            <p className="text-[10px] text-text-muted">Antwortzeit</p>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-green-600 md:text-lg">
              ✓
            </p>
            <p className="text-[10px] text-text-muted">Ihr Eigentum</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating notification card */}
      <motion.div
        className="absolute -right-2 -bottom-3 rounded-xl border border-green-200 bg-white px-4 py-2.5 shadow-lg md:-right-4 md:-bottom-4"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-sm">●</span>
          <span className="text-xs font-medium text-text-dark">
            Neue Anfrage eingegangen
          </span>
        </div>
      </motion.div>

      {/* Floating "auto-reply sent" card */}
      <motion.div
        className="absolute -left-2 top-12 rounded-xl border border-blue-200 bg-white px-4 py-2.5 shadow-lg md:-left-4 md:top-16"
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-sm">⚡</span>
          <span className="text-xs font-medium text-text-dark">
            Antwort gesendet
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
            Vorhersehbare Anfragen statt Empfehlungs-Zufall.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-text-mid sm:text-xl">
            Wir bauen Ihr automatisches Anfragen-System in 14&nbsp;Tagen:
            fertig übergeben, läuft selbstständig, gehört Ihnen.
          </p>

          <p className="mt-4 text-sm text-text-muted">
            Für Handwerker, Coaches und lokale Dienstleister im DACH-Raum.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#kontakt"
              className="inline-block rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:brightness-105"
            >
              Kostenloses Erstgespräch buchen
            </a>

            <a
              href="#das-system"
              className="inline-flex items-center gap-1 border-b-2 border-primary/30 pb-0.5 text-base font-medium text-primary transition-colors duration-200 hover:border-primary"
            >
              Wie es funktioniert&nbsp;&darr;
            </a>
          </div>

          <p className="mt-4 text-sm text-text-muted">
            Doppelte Garantie. Kein technisches Know-how nötig.
          </p>
        </motion.div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <SystemGraphic />
        </motion.div>
      </div>
    </section>
  );
}
