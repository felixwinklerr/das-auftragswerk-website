import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — Das Auftragswerk",
  description: "Impressum und Angaben gemäß § 5 TMG.",
};

export default function Impressum() {
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
        <h1 className="mb-8 text-3xl font-bold text-text-dark">Impressum</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-text-mid">
          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              G.T. Marketing Management &amp; Consulting UG (haftungsbeschränkt)
              <br />
              Friedlandstr. 19
              <br />
              96106 Ebern, Bayern
              <br />
              Deutschland
            </p>
            <p className="mt-3">
              Handelsregister: HRB 11553
              <br />
              Geschäftsführer: Jonah Tholeikis
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">Kontakt</h2>
            <p>
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
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
              <br />
              DE 368241327
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Jonah Tholeikis
              <br />
              Friedlandstr. 19
              <br />
              96106 Ebern, Bayern
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-dark">
              Haftungsausschluss
            </h2>
            <h3 className="text-lg font-medium text-text-dark">
              Haftung für Inhalte
            </h3>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind
              wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
              den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
              wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h3 className="text-lg font-medium text-text-dark">
              Haftung für Links
            </h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
