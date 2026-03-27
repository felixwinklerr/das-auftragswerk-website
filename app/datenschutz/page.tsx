import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung - Das Auftragswerk",
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
              G.T. Marketing Management &amp; Consulting UG (haftungsbeschränkt)
              <br />
              Friedlandstr. 19
              <br />
              96106 Ebern, Bayern
              <br />
              Deutschland
              <br />
              E-Mail:{" "}
              <a
                href="mailto:info@dasauftragswerk.de"
                className="text-primary hover:underline"
              >
                info@dasauftragswerk.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              2. Hosting (Vercel)
            </h2>
            <p>
              Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut,
              CA 91789, USA gehostet. Beim Aufruf der Website werden technische
              Zugriffsdaten (u.a. IP-Adresse, Browsertyp, aufgerufene Seiten)
              verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse am sicheren Betrieb der Website). Vercel
              hat Standardvertragsklauseln (SCCs) gemäß Art. 46 Abs. 2 lit. c
              DSGVO abgeschlossen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              3. Terminbuchung (GoHighLevel / LeadConnector)
            </h2>
            <p>
              Für die Terminbuchung nutzen wir den Dienst GoHighLevel
              (LeadConnector) von HighLevel, Inc., 400 N. Saint Paul St., Suite
              920, Dallas, TX 75201, USA. Das Buchungsformular wird als
              eingebettetes Element (iframe) von{" "}
              <code>api.leadconnectorhq.com</code> geladen.
            </p>
            <p className="mt-3">
              Dabei werden folgende Daten direkt an GoHighLevel übermittelt und
              dort verarbeitet:
            </p>
            <ul className="list-disc pl-6">
              <li>Name</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Wunschtermin und Verfügbarkeit</li>
              <li>Technische Daten (IP-Adresse, Browser)</li>
            </ul>
            <p className="mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines
              Vertrags auf Ihren Wunsch hin). Die Daten werden auf Servern in
              den USA gespeichert. GoHighLevel ist zertifiziert unter dem
              EU-US Data Privacy Framework und hat Standardvertragsklauseln
              (SCCs) sowie einen Data Processing Agreement (DPA) abgeschlossen,
              die ein angemessenes Schutzniveau gemäß Art. 46 Abs. 2 lit. c
              DSGVO gewährleisten.
            </p>
            <p className="mt-3">
              Die Datenschutzerklärung von GoHighLevel ist abrufbar unter:{" "}
              <a
                href="https://www.gohighlevel.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                gohighlevel.com/privacy-policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              4. Meta Pixel und Conversions API (Meta / Facebook)
            </h2>
            <p>
              Diese Website verwendet den Meta Pixel sowie die Meta Conversions
              API (CAPI) von Meta Platforms Ireland Limited, 4 Grand Canal
              Square, Grand Canal Harbour, Dublin 2, Irland.
            </p>
            <p className="mt-3">
              Dabei werden folgende Daten verarbeitet:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Cookies (<code>_fbp</code>, <code>_fbc</code>), die im Browser
                gesetzt werden
              </li>
              <li>IP-Adresse und User-Agent (serverseitig via CAPI)</li>
              <li>Aufgerufene Seiten (PageView-Events)</li>
              <li>
                Buchungsabschlüsse (Lead-Event bei erfolgreich abgeschlossenem
                Termin)
              </li>
            </ul>
            <p className="mt-3">
              Zweck: Conversion-Tracking und Optimierung von Werbeanzeigen.
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der Wirkungsmessung unserer Marketingmaßnahmen).
            </p>
            <p className="mt-3">
              Die Daten können in die USA übertragen werden. Meta Platforms
              Ireland ist unter dem EU-US Data Privacy Framework zertifiziert.
            </p>
            <p className="mt-3">
              Sie können der Datenverarbeitung widersprechen unter:{" "}
              <a
                href="https://www.facebook.com/settings?tab=ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                facebook.com/settings?tab=ads
              </a>
              .
            </p>
            <p className="mt-3">
              Datenschutzerklärung von Meta:{" "}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                facebook.com/privacy/policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              5. Zweck und Rechtsgrundlagen der Datenverarbeitung
            </h2>
            <p>
              Ihre im Rahmen der Terminbuchung erhobenen Daten werden
              ausschließlich zur Bearbeitung Ihrer Anfrage und zur
              Kontaktaufnahme bezüglich eines Erstgesprächs verwendet.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
              Maßnahmen).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              6. Speicherdauer
            </h2>
            <p>
              Ihre Anfragedaten werden gespeichert, bis Ihre Anfrage vollständig
              bearbeitet ist, maximal jedoch 6 Monate nach Abschluss des
              Vorgangs. Danach werden sie gelöscht, sofern keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              7. Schriftarten
            </h2>
            <p>
              Diese Website verwendet die Schriftart &quot;Inter&quot;, die
              lokal auf dem Server gehostet wird (Self-Hosting via next/font).
              Es werden keine Schriftdaten an Google Fonts oder andere
              Drittanbieter übertragen.
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
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a
                href="mailto:info@dasauftragswerk.de"
                className="text-primary hover:underline"
              >
                info@dasauftragswerk.de
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
              Zuständig für Bayern ist das Bayerische Landesamt für
              Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
