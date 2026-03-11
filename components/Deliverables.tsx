"use client";

import { motion } from "framer-motion";

const rows = [
  "Google Business Profil (Volloptimierung)",
  "Conversion Landing Page (branchenspezifisch)",
  "On-page SEO + Schema Markup",
  "Lead-Capture System",
  "GHL CRM + Pipeline",
  "Sofort-Antwort Automatisierung (60 Sek.)",
  "5-Step Follow-up Sequenz",
  "Bewertungs-Automatisierung",
  "Google Ads Setup",
  "Lead-Tracking Dashboard",
  "Video-Einweisung (Loom)",
  "14 Tage Post-Launch Support",
];

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function Deliverables() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          className="mb-14 text-center text-3xl font-bold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Alles. Fertig übergeben.
        </motion.h2>

        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="bg-bg-gray px-8 py-4 text-sm font-semibold uppercase tracking-wide text-text-muted">
              <span>Deliverable</span>
            </div>

            {/* Rows */}
            {rows.map((item, i) => (
              <motion.div
                key={item}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={`flex items-center gap-3 px-8 py-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-bg-gray/50"
                }`}
              >
                <svg
                  className="h-5 w-5 flex-shrink-0 text-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-text-mid">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {rows.map((item, i) => (
            <motion.div
              key={item}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex items-center gap-3 rounded-xl bg-bg-gray/60 px-5 py-4"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-accent"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-text-mid text-sm">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Trust box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 rounded-2xl bg-bg-blue border border-primary/20 px-8 py-6 text-center"
        >
          <span className="text-xl font-semibold text-primary md:text-2xl">
            Alles inklusive. Keine versteckten Kosten.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
