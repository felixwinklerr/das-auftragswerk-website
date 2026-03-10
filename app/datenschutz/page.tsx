import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Das Auftragswerk",
  description: "Datenschutzerklärung gemäß DSGVO.",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <Link href="/" className="text-primary font-semibold hover:underline">
            ← Zurück zur Startseite
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold text-text-dark">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-gray max-w-none space-y-8 text-text-mid">
          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              1. Verantwortlicher
            </h2>
            <p>
              Felix Winkler
              <br />
              [Adresse folgt]
              <br />
              [PLZ Ort]
              <br />
              Deutschland
              <br />
              E-Mail:{" "}
              <a
                href="mailto:kontakt@dasauftragswerk.de"
                className="text-primary hover:underline"
              >
                kontakt@dasauftragswerk.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              2. Datenerhebung über das Kontaktformular
            </h2>
            <p>
              Wenn Sie unser Kontaktformular nutzen, erheben wir folgende Daten:
            </p>
            <ul className="list-disc pl-6">
              <li>Name</li>
              <li>Telefonnummer</li>
              <li>Branche</li>
              <li>Nachricht (optional)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              3. Zweck der Datenverarbeitung
            </h2>
            <p>
              Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage und
              zur Kontaktaufnahme bezüglich eines möglichen Erstgesprächs
              verwendet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              4. Rechtsgrundlage
            </h2>
            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO (vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Beantwortung von Anfragen).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              5. Speicherdauer
            </h2>
            <p>
              Ihre Daten werden gespeichert, bis Ihre Anfrage vollständig
              bearbeitet ist, maximal jedoch 6 Monate. Danach werden sie
              gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten
              bestehen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              6. Hosting
            </h2>
            <p>
              Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut,
              CA 91789, USA gehostet. Vercel kann beim Aufruf der Website
              technische Daten wie Ihre IP-Adresse erheben. Vercel hat
              Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2 lit. c DSGVO
              abgeschlossen, die ein angemessenes Datenschutzniveau
              gewährleisten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              7. Schriftarten
            </h2>
            <p>
              Diese Website verwendet die Schriftart &quot;Inter&quot;, die lokal
              auf dem Server gehostet wird (Self-Hosting via next/font). Es
              werden keine Daten an Google oder andere Drittanbieter übertragen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              8. Ihre Rechte
            </h2>
            <p>Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten
                (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)
              </li>
              <li>
                <strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)
              </li>
              <li>
                <strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)
              </li>
              <li>
                <strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21
                DSGVO)
              </li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a
                href="mailto:kontakt@dasauftragswerk.de"
                className="text-primary hover:underline"
              >
                kontakt@dasauftragswerk.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              9. Beschwerderecht
            </h2>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              10. Cookies
            </h2>
            <p>
              Diese Website verwendet keine Cookies und keine
              Tracking-Technologien.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
