"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branche, setBranche] = useState("Handwerk/Bau");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, branche, message }),
      });

      if (!res.ok) throw new Error("Anfrage fehlgeschlagen.");
      setStatus("success");
    } catch {
      setErrorMsg("Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.");
      setStatus("error");
    }
  }

  return (
    <section id="kontakt" className="bg-bg-orange py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-primary md:text-4xl">
          Schauen wir ob es passt.
        </h2>
        <p className="mt-4 mb-12 text-center text-text-muted">
          20 Minuten. Kein Pitch. Nur eine ehrliche Einschätzung ob das System
          für Ihren Betrieb Sinn macht.
        </p>

        {status === "success" ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-green-700">
              Vielen Dank! Wir melden uns innerhalb von 24h.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            {/* Name */}
            <div className="mb-5">
              <label
                htmlFor="cf-name"
                className="mb-1 block text-sm font-medium text-text-dark"
              >
                Name
              </label>
              <input
                id="cf-name"
                type="text"
                required
                placeholder="Ihr Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Telefonnummer */}
            <div className="mb-5">
              <label
                htmlFor="cf-phone"
                className="mb-1 block text-sm font-medium text-text-dark"
              >
                Telefonnummer
              </label>
              <input
                id="cf-phone"
                type="tel"
                required
                placeholder="+49..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-text-dark outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Branche */}
            <div className="mb-5">
              <label
                htmlFor="cf-branche"
                className="mb-1 block text-sm font-medium text-text-dark"
              >
                Branche
              </label>
              <select
                id="cf-branche"
                value={branche}
                onChange={(e) => setBranche(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-text-dark outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Handwerk/Bau</option>
                <option>Praxis/Medizin</option>
                <option>Coaching/Beratung</option>
                <option>Sonstiges</option>
              </select>
            </div>

            {/* Nachricht */}
            <div className="mb-6">
              <label
                htmlFor="cf-message"
                className="mb-1 block text-sm font-medium text-text-dark"
              >
                Wo stehen Sie heute?
              </label>
              <textarea
                id="cf-message"
                rows={4}
                placeholder="z.B. wie kommen aktuell Kunden zu Ihnen?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-text-dark outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="mb-4 text-sm font-medium text-red-600">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full cursor-pointer rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Wird gesendet...
                </span>
              ) : (
                "Erstgespräch anfragen"
              )}
            </button>
          </form>
        )}

        {/* Below form */}
        {status !== "success" && (
          <div className="mt-6 text-center text-sm text-text-muted">
            <p>
              Oder direkt buchen:{" "}
              <a
                href="#"
                className="font-medium text-primary underline transition-colors hover:text-accent"
              >
                Calendly
              </a>
            </p>
            <p className="mt-1">Wir melden uns innerhalb von 24h.</p>
          </div>
        )}

        {/* Trust bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
          {[
            "Kein Abo",
            "System gehört Ihnen",
            "60-Tage Garantie",
            "DACH-Markt",
          ].map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
