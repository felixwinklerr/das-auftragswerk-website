"use client";

import { motion } from "framer-motion";

interface Layer {
  number: number;
  name: string;
  details: string;
  quote: string;
}

const layers: Layer[] = [
  {
    number: 1,
    name: "Sichtbarkeit",
    details:
      "Google Business, Landing Page, SEO, Google Ads",
    quote: "Kunden finden Sie, wenn sie aktiv suchen.",
  },
  {
    number: 2,
    name: "Anfragen auffangen",
    details: "Formular + Click-to-Call + WhatsApp Business Link",
    quote: "Wer klickt, landet direkt bei Ihnen: auf jedem Ger\u00E4t.",
  },
  {
    number: 3,
    name: "Automatisches Follow-up",
    details:
      "Sofort-Antwort in 60 Sek. + 5 Nachrichten über 7 Tage",
    quote:
      "Keine verlorenen Anfragen mehr, auch wenn Sie gerade auf der Baustelle sind.",
  },
  {
    number: 4,
    name: "Beweis & Vertrauen",
    details: "Automatisierter Google Review Request nach Abschluss",
    quote: "Ihr Rating w\u00E4chst, Ihre Sichtbarkeit w\u00E4chst mit.",
  },
  {
    number: 5,
    name: "Überblick behalten",
    details: "Dashboard: Woher kommen Anfragen, wie viele, was wird draus",
    quote: "Sie sehen was funktioniert, und steuern selbst.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export default function Mechanism() {
  return (
    <section id="das-system" className="bg-white py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Headlines */}
        <motion.h2
          className="text-center text-3xl font-bold text-primary md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Das Inbound-Sprint-Modell
        </motion.h2>
        <motion.p
          className="mb-12 mt-3 text-center text-lg text-text-muted"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          5&nbsp;Schichten. 14&nbsp;Tage. Dann l&auml;uft es.
        </motion.p>

        {/* Layer stack */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical connecting line */}
          <div
            className="absolute bottom-0 left-6 top-0 w-0.5 bg-primary/20 md:left-8"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-6">
            {layers.map((layer, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={layer.number}
                  className={`relative flex items-start gap-5 rounded-2xl border border-gray-100 p-6 shadow-sm md:gap-7 md:p-8 ${
                    isEven ? "bg-bg-blue" : "bg-bg-orange"
                  }`}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Number badge */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-md md:h-14 md:w-14 md:text-xl">
                    {layer.number}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-lg font-bold text-text-dark md:text-xl">
                      Schicht&nbsp;{layer.number}: {layer.name}
                    </h3>
                    <p className="mb-3 leading-relaxed text-text-mid">
                      {layer.details}
                    </p>
                    <p className="font-medium italic text-accent">
                      &bdquo;{layer.quote}&ldquo;
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
