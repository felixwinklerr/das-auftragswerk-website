"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
  }),
};

const scenes = [
  {
    before: "Montag, 07:30 Uhr. Telefon klingelt. Anfrage verpasst.",
    after: "Das System hat um 07:31 geantwortet. Termin gebucht. Ohne Sie.",
  },
  {
    before: "Freitagnachmittag. Sie sind auf der Baustelle. Kein Empfang.",
    after: "Drei Interessenten haben eine automatische Antwort bekommen. Zwei haben zurückgeschrieben.",
  },
  {
    before: "Jeden Monat das gleiche Bangen: Kommen nächsten Monat wieder Aufträge?",
    after: "Ihr Kalender ist zwei Wochen im Voraus gefüllt. Anfragen laufen automatisch.",
  },
];

export default function DreamState() {
  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-accent font-semibold text-sm uppercase tracking-widest text-center mb-3"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          So sieht Ihr Alltag danach aus
        </motion.p>
        <motion.h2
          className="text-primary font-bold text-3xl md:text-4xl text-center mb-14 leading-snug"
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Volle Auftragsbücher.<br className="hidden md:block" /> Kein tägliches Akquirieren mehr.
        </motion.h2>

        <div className="space-y-5">
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              custom={0.15 + i * 0.12}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Before */}
              <div className="bg-red-50 px-6 py-5 flex items-start gap-3">
                <span className="text-red-400 font-bold text-lg shrink-0 mt-0.5">✕</span>
                <p className="text-text-mid text-sm leading-relaxed">{scene.before}</p>
              </div>
              {/* After */}
              <div className="bg-green-50 px-6 py-5 flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg shrink-0 mt-0.5">✓</span>
                <p className="text-text-dark font-medium text-sm leading-relaxed">{scene.after}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-text-muted mt-10 text-sm"
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Das ist kein Versprechen. Das ist das Ergebnis eines funktionierenden Systems.
        </motion.p>
      </div>
    </section>
  );
}
