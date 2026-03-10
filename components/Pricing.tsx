"use client";

import { motion } from "framer-motion";

interface ComparisonRow {
  agentur: string;
  auftragswerk: string;
  diy: string;
}

const rows: ComparisonRow[] = [
  {
    agentur: "€1.000–1.500/Monat",
    auftragswerk: "Einmalig. Nicht monatlich.",
    diy: "3–6 Monate, halbfertig",
  },
  {
    agentur: "Kein Eigentum",
    auftragswerk: "System gehört Ihnen",
    diy: "Ihre Zeit verloren",
  },
  {
    agentur: "Black Box",
    auftragswerk: "Volles Tracking",
    diy: "Kein Ergebnis garantiert",
  },
  {
    agentur: "Abhängigkeit",
    auftragswerk: "Exit-Garantie 7 Tage",
    diy: "—",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Pricing() {
  return (
    <section id="preis" className="bg-bg-gray py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-primary font-bold text-3xl md:text-4xl text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Einmalig. Kein Retainer. Kein Abo.
        </motion.h2>

        {/* Comparison table — desktop */}
        <motion.div
          className="hidden md:grid grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Agentur column */}
          <motion.div
            className="rounded-2xl border border-gray-200 bg-bg-gray p-6"
            custom={0}
            variants={fadeUp}
          >
            <h3 className="text-text-muted font-semibold text-lg text-center mb-6">
              Agentur
            </h3>
            <div className="flex flex-col gap-4">
              {rows.map((row, i) => (
                <p key={i} className="text-text-mid text-sm text-center py-2 border-b border-gray-100 last:border-0">
                  {row.agentur}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Das Auftragswerk column — highlighted */}
          <motion.div
            className="rounded-2xl border-2 border-accent bg-white p-6 shadow-lg -mt-2 -mb-2 flex flex-col"
            custom={0.1}
            variants={fadeUp}
          >
            <h3 className="bg-primary text-white font-bold text-lg text-center rounded-lg py-2 mb-6">
              Das Auftragswerk
            </h3>
            <div className="flex flex-col gap-4 flex-1">
              {rows.map((row, i) => (
                <p key={i} className="text-text-dark font-medium text-sm text-center py-2 border-b border-gray-100 last:border-0">
                  {row.auftragswerk}
                </p>
              ))}
            </div>
          </motion.div>

          {/* DIY column */}
          <motion.div
            className="rounded-2xl border border-gray-200 bg-bg-gray p-6"
            custom={0.2}
            variants={fadeUp}
          >
            <h3 className="text-text-muted font-semibold text-lg text-center mb-6">
              DIY
            </h3>
            <div className="flex flex-col gap-4">
              {rows.map((row, i) => (
                <p key={i} className="text-text-mid text-sm text-center py-2 border-b border-gray-100 last:border-0">
                  {row.diy}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Comparison table — mobile stacked */}
        <div className="md:hidden flex flex-col gap-6 mb-14">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="grid grid-cols-3 text-xs font-semibold">
                <span className="bg-bg-gray text-text-muted py-2 px-3 text-center">Agentur</span>
                <span className="bg-primary text-white py-2 px-3 text-center">Auftragswerk</span>
                <span className="bg-bg-gray text-text-muted py-2 px-3 text-center">DIY</span>
              </div>
              <div className="grid grid-cols-3 text-xs">
                <span className="py-3 px-3 text-center text-text-mid">{row.agentur}</span>
                <span className="py-3 px-3 text-center text-text-dark font-medium border-x border-accent/20">
                  {row.auftragswerk}
                </span>
                <span className="py-3 px-3 text-center text-text-mid">{row.diy}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee block */}
        <motion.div
          className="max-w-2xl mx-auto border-2 border-primary bg-bg-blue rounded-2xl p-8 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h3 className="text-primary font-bold text-2xl mb-3 text-center">
            60-Tage Erfolgsgarantie
          </h3>
          <p className="text-text-mid leading-relaxed text-center">
            Das System generiert 3+ qualifizierte Anfragen pro Monat, oder Sie
            erhalten eine Rückzahlung. Das System bleibt Ihrem Eigentum in jedem
            Fall.
          </p>
        </motion.div>

        {/* ROI calculator */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="text-primary font-bold text-xl text-center mb-6">
            Was das konkret bedeutet:
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-bg-gray rounded-xl p-6"
              custom={0}
              variants={fadeUp}
            >
              <p className="text-text-dark font-semibold mb-2">
                Handwerker-Szenario
              </p>
              <p className="text-text-mid text-sm leading-relaxed">
                2 neue Aufträge/Monat x €800 = <span className="font-semibold text-primary">€1.600/Monat</span>.
              </p>
              <p className="text-accent font-semibold mt-2 text-sm">
                Amortisierung: Monat 3.
              </p>
            </motion.div>
            <motion.div
              className="bg-bg-gray rounded-xl p-6"
              custom={0.15}
              variants={fadeUp}
            >
              <p className="text-text-dark font-semibold mb-2">
                Zahnarzt-Szenario
              </p>
              <p className="text-text-mid text-sm leading-relaxed">
                1 Privatpatient/Monat x €2.500 LTV.
              </p>
              <p className="text-accent font-semibold mt-2 text-sm">
                Amortisierung: Woche&nbsp;1.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
