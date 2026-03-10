"use client";

import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function Proof() {
  return (
    <section id="ergebnisse" className="bg-bg-blue py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          custom={0}
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
        >
          Was das System in der Praxis bewirkt.
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Eden Beauty Lounge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            custom={1}
            className="rounded-2xl bg-white p-8 shadow-md"
          >
            <h3 className="mb-4 text-xl font-bold text-text-dark">
              Eden Beauty Lounge
            </h3>
            <blockquote className="mb-4 border-l-4 border-accent pl-4 text-lg text-text-mid italic leading-relaxed">
              &ldquo;80&ndash;90&thinsp;% weniger manuelle Arbeit.
              50&thinsp;% mehr Terminbuchungen.
              77&thinsp;% Lead-zu-Termin-Quote.&rdquo;
            </blockquote>
            <p className="text-text-muted">
              Das gleiche Follow-up-System, auf Ihr Business
              &uuml;bertragen.
            </p>
          </motion.div>

          {/* Career OS (Coach) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            custom={2}
            className="rounded-2xl bg-white p-8 shadow-md"
          >
            <h3 className="mb-4 text-xl font-bold text-text-dark">
              Career OS (Coach, Schweiz)
            </h3>
            <blockquote className="mb-4 border-l-4 border-accent pl-4 text-text-mid italic leading-relaxed">
              &ldquo;Vom Chaos zur Struktur. Automatisiertes System, Klienten
              kommen jetzt direkt auf mich zu.&rdquo;
            </blockquote>
          </motion.div>
        </div>

        {/* Honest Note */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          custom={3}
          className="mx-auto mt-10 max-w-2xl text-center text-sm italic text-text-muted"
        >
          Testphase l&auml;uft seit M&auml;rz 2026. Erste
          Branchen-Fallstudien folgen. Diese Mechanik ist erprobt, in
          &auml;hnlichen Setups.
        </motion.p>

        {/* Proof Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          custom={4}
          className="mt-8 rounded-xl bg-primary py-4 px-6 text-center font-semibold text-white"
        >
          Belegt durch 14-t&auml;gige Umsetzung + 60-Tage Erfolgsgarantie
        </motion.div>
      </div>
    </section>
  );
}
