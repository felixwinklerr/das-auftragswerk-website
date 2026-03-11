"use client";

import { motion } from "framer-motion";

function SystemGraphic() {
  return (
    <div className="relative mx-auto h-80 w-full max-w-md md:h-[420px] md:max-w-none">
      {/* Large background shape */}
      <motion.div
        className="absolute top-8 left-4 h-52 w-52 rounded-3xl bg-primary/10 md:top-10 md:left-8 md:h-64 md:w-64"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main card shape */}
      <motion.div
        className="absolute top-16 left-16 h-44 w-60 rounded-2xl border border-primary/20 bg-white shadow-lg md:top-20 md:left-24 md:h-56 md:w-72"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        {/* Simulated content lines */}
        <div className="space-y-3 p-5 md:p-6">
          <div className="h-3 w-3/4 rounded-full bg-primary/15" />
          <div className="h-3 w-1/2 rounded-full bg-primary/10" />
          <div className="mt-5 h-8 w-28 rounded-lg bg-accent/20" />
          <div className="mt-3 h-3 w-2/3 rounded-full bg-bg-blue" />
          <div className="h-3 w-1/3 rounded-full bg-bg-blue" />
        </div>
      </motion.div>

      {/* Accent floating card */}
      <motion.div
        className="absolute right-4 bottom-16 h-28 w-36 rounded-2xl bg-accent/10 backdrop-blur-sm md:right-4 md:bottom-20 md:h-36 md:w-44"
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="space-y-2 p-4">
          <div className="h-2.5 w-2/3 rounded-full bg-accent/30" />
          <div className="h-2.5 w-1/2 rounded-full bg-accent/20" />
          <div className="mt-3 h-6 w-16 rounded-md bg-accent/25" />
        </div>
      </motion.div>

      {/* Small blue floating element */}
      <motion.div
        className="absolute top-4 right-12 h-16 w-20 rounded-xl bg-bg-blue shadow-sm md:right-20 md:h-20 md:w-24"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-primary/20 md:h-8 md:w-8" />
        </div>
      </motion.div>

      {/* Animated pulse dots — data flow */}
      <motion.div
        className="absolute top-28 left-10 h-3 w-3 rounded-full bg-accent md:top-36 md:left-14"
        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-44 right-20 h-2.5 w-2.5 rounded-full bg-primary md:top-56 md:right-28"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      <motion.div
        className="absolute right-8 bottom-36 h-2 w-2 rounded-full bg-accent md:right-12 md:bottom-44"
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      <motion.div
        className="absolute bottom-24 left-24 h-2 w-2 rounded-full bg-primary/60 md:bottom-28 md:left-32"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Connection line (decorative) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M100 160 C150 140, 200 200, 280 180"
          stroke="#0B3D6F"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeOpacity="0.2"
          fill="none"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M160 260 C200 240, 260 280, 320 250"
          stroke="#FF8C42"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeOpacity="0.2"
          fill="none"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
      </svg>
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
            Für Handwerker, Zahnärzte, Coaches und lokale Dienstleister im
            DACH-Raum.
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
            60-Tage Erfolgsgarantie. Kein technisches Know-how nötig.
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
