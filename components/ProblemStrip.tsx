"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "\uD83D\uDD0D",
    title: "Unsichtbar bei Google",
    body: "Ihre Kunden googeln. Wer nicht im oberen Bereich auftaucht, existiert nicht.",
  },
  {
    icon: "\u23F1\uFE0F",
    title: "Zu sp\u00E4t geantwortet",
    body: "Wer nach einer Anfrage 2\u00A0Stunden wartet, verliert den Kunden. Kein System\u00A0=\u00A0kein Nachfassen.",
  },
  {
    icon: "\uD83C\uDFB2",
    title: "Kein System, nur Zufall",
    body: "80\u201390\u202F% der Dienstleister laufen auf Empfehlungen. Wenn die ausbleiben, stockt alles.",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const implicationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function ProblemStrip() {
  return (
    <section id="problem" className="bg-bg-gray py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Headline */}
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Gute Arbeit allein reicht heute nicht mehr.
        </motion.h2>

        {/* Problem cards */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-5 text-5xl" aria-hidden="true">
                {problem.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-text-dark">
                {problem.title}
              </h3>
              <p className="leading-relaxed text-text-muted">{problem.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Implication row */}
        <motion.div
          className="rounded-2xl bg-accent px-8 py-6 text-center text-white"
          variants={implicationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="mb-2 text-lg">
            Jeder Monat ohne System kostet Sie Auftr&auml;ge: konkret,
            berechenbar.
          </p>
          <p className="text-xl font-bold md:text-2xl">
            3&nbsp;verlorene Anfragen &times;&nbsp;&euro;800 =
            &euro;2.400/Monat. &euro;28.800/Jahr.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
