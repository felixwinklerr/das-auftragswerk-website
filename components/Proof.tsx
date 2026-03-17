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
          className="mb-4 text-center text-3xl font-bold text-primary md:text-4xl"
        >
          Was das System in der Praxis bewirkt.
        </motion.h2>

        {/* Mechanism bridge — before proof cards */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          custom={0.5}
          className="mb-10 text-center text-text-muted max-w-2xl mx-auto"
        >
          Die Mechanik ist branchenunabh&auml;ngig: schnell auffangen, sofort antworten, automatisch nachfassen.
          Ob Handwerksbetrieb, Coach oder Berater: das Ergebnis ist dasselbe.
        </motion.p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Eden Beauty Lounge — repositioned as mechanism proof */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            custom={1}
            className="rounded-2xl bg-white p-8 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-bg-orange flex items-center justify-center text-lg" aria-hidden="true">✂️</div>
              <div>
                <h3 className="text-lg font-bold text-text-dark">Lokaler Dienstleister</h3>
                <p className="text-text-muted text-sm">Eden Beauty Lounge</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-bg-blue rounded-xl p-3 text-center">
                <p className="text-primary font-bold text-xl">80&ndash;90&thinsp;%</p>
                <p className="text-text-muted text-xs leading-snug mt-1">weniger manuelle Arbeit</p>
              </div>
              <div className="bg-bg-blue rounded-xl p-3 text-center">
                <p className="text-primary font-bold text-xl">+50&thinsp;%</p>
                <p className="text-text-muted text-xs leading-snug mt-1">mehr Terminbuchungen</p>
              </div>
              <div className="bg-bg-blue rounded-xl p-3 text-center">
                <p className="text-primary font-bold text-xl">77&thinsp;%</p>
                <p className="text-text-muted text-xs leading-snug mt-1">Lead-zu-Termin-Quote</p>
              </div>
            </div>
            <p className="text-text-muted text-sm">
              Dasselbe Follow-up-System funktioniert f&uuml;r jeden Betrieb,
              bei dem Anfragen bisher verloren gehen oder zu sp&auml;t beantwortet werden.
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-bg-orange flex items-center justify-center text-lg" aria-hidden="true">🎯</div>
              <div>
                <h3 className="text-lg font-bold text-text-dark">Coach / Berater</h3>
                <p className="text-text-muted text-sm">In&eacute;s Constantin</p>
              </div>
            </div>
            <blockquote className="border-l-4 border-accent pl-4 text-text-mid italic leading-relaxed">
              &ldquo;Klienten fragen jetzt von sich aus an, statt umgekehrt.
              Das System &uuml;bernimmt, was ich fr&uuml;her stundenlang
              manuell gemacht habe.&rdquo;
            </blockquote>
          </motion.div>
        </div>

        {/* Proof Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          custom={4}
          className="mt-8 rounded-xl bg-primary py-4 px-6 text-center font-semibold text-white"
        >
          Belegt durch 14-t&auml;gige Umsetzung + doppelte Garantie
        </motion.div>

        {/* Mid-page CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          custom={5}
          className="mt-10 text-center"
        >
          <a
            href="#kontakt"
            className="inline-block rounded-full bg-accent px-10 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:brightness-105"
          >
            Kostenloses Erstgespräch buchen
          </a>
        </motion.div>
      </div>
    </section>
  );
}
