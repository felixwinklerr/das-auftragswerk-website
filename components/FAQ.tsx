"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Brauche ich selbst technisches Know-how?",
    answer:
      "Nein. Sie brauchen nur 2 Stunden für Onboarding und Feedback. Wir bauen alles.",
  },
  {
    question: "Was ist mit den laufenden Google Ads Kosten?",
    answer:
      "Das Ads-Budget zahlen Sie direkt an Google — keine Aufschläge. Empfohlen: €300–600/Monat. Die Kampagne richten wir einmalig ein.",
  },
  {
    question: "Ich hatte schlechte Erfahrungen mit Agenturen.",
    answer:
      "Das hören wir oft. Deshalb: System gehört Ihnen, vollständige Exit-Garantie, 60-Tage Erfolgsgarantie. Das Risiko liegt bei uns.",
  },
  {
    question: "Was passiert nach 14 Tagen?",
    answer:
      "Das System läuft selbstständig. 14 Tage Post-Launch Support inklusive. Danach optional: Support-Paket oder Ads-Management, jederzeit kündbar.",
  },
  {
    question: "Für welche Branchen funktioniert das?",
    answer:
      "Primär: Handwerk + lokale Services (Elektriker, Maler, Reinigung, Sanitär). Sekundär: Praxen (Zahnärzte, Physio, Therapeuten). Tertiär: Coaches + Berater. Voraussetzung: Ihre Kunden googeln aktiv nach Ihnen.",
  },
  {
    question: "Gehört mir das System wirklich?",
    answer:
      "Vollständig. Landing Page unter Ihrer Domain, Google Ads in Ihrem Account, GBP Ihr Account. CRM läuft auf unserem Sub-Account — Exit-Garantie: vollständiger Daten-Export innerhalb 7 Tage auf Anfrage.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
      className="flex-shrink-0 text-primary"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="faq" className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-primary font-bold text-3xl md:text-4xl text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Häufige Fragen.
        </motion.h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-text-dark font-semibold text-base md:text-lg">
                    {faq.question}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-text-mid leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
