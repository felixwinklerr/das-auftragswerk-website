"use client";

import { motion } from "framer-motion";

interface Step {
  day: string;
  description: string;
}

const steps: Step[] = [
  { day: "Tag 0", description: "Onboarding + Kick-off Fragebogen" },
  { day: "Tag 1–2", description: "Kick-off Call + Keyword-Recherche" },
  {
    day: "Tag 3–10",
    description: "Build-Phase (LP, GBP, CRM, Automationen, Ads)",
  },
  { day: "Tag 11–12", description: "QA + Abstimmung" },
  { day: "Tag 13", description: "Soft Launch" },
  {
    day: "Tag 14",
    description: "Übergabe + Video-Einweisung",
  },
];

const dotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" as const },
  }),
};

const labelVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 + 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function Timeline() {
  return (
    <section id="so-funktioniert-es" className="bg-bg-blue py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-primary font-bold text-3xl md:text-4xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          14&nbsp;Tage. Kein&nbsp;Chaos. Nur&nbsp;2&nbsp;Stunden Ihrer&nbsp;Zeit.
        </motion.h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-primary/20" />

            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, i) => (
                <div key={step.day} className="relative flex flex-col items-center text-center">
                  <motion.div
                    className="relative z-10 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-md"
                    custom={i}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {i + 1}
                  </motion.div>
                  <motion.div
                    className="mt-4"
                    custom={i}
                    variants={labelVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <p className="text-primary font-bold text-sm mb-1">{step.day}</p>
                    <p className="text-text-mid text-sm leading-snug">{step.description}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet: vertical timeline */}
        <div className="lg:hidden">
          <div className="relative max-w-md mx-auto">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary/20" aria-hidden="true" />

            <div className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <div key={step.day} className="relative flex items-start gap-5">
                  <motion.div
                    className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-md"
                    custom={i}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {i + 1}
                  </motion.div>
                  <motion.div
                    className="pt-1"
                    custom={i}
                    variants={labelVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <p className="text-primary font-bold text-base">{step.day}</p>
                    <p className="text-text-mid text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client effort note */}
        <motion.div
          className="mt-14 max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 md:p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-text-dark font-semibold mb-2">Was Sie beitragen:</p>
          <p className="text-text-mid leading-relaxed">
            Onboarding-Fragebogen (30&nbsp;Min) + Kick-off Call (30&nbsp;Min) +
            1&nbsp;Feedback-Runde (20&nbsp;Min) + Übergabe (30&nbsp;Min).
          </p>
          <p className="text-primary font-bold mt-3 text-lg">
            Insgesamt: ca.&nbsp;2&nbsp;Stunden.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
