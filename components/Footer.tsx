import Image from "next/image";

type FooterProps = {
  // Sticky mobile CTA bar (orange bottom bar).
  showStickyCta?: boolean;
  // Render a smaller, less distracting footer.
  variant?: "full" | "mini";
};

export default function Footer({
  showStickyCta = true,
  variant = "full",
}: FooterProps) {
  return (
    <>
      {variant === "mini" ? (
        <footer className="py-6 px-6">
          <div className="mx-auto max-w-3xl text-center text-xs text-text-muted">
            <span>© 2026 Das Auftragswerk</span>
            <span className="mx-2 opacity-60">·</span>
            <a href="/impressum" className="hover:underline">
              Impressum
            </a>
            <span className="mx-2 opacity-60">·</span>
            <a href="/datenschutz" className="hover:underline">
              Datenschutz
            </a>
          </div>
        </footer>
      ) : (
        <footer className="bg-primary py-12 px-6 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-start">
            {/* Left: logo + tagline */}
            <div>
              <Image
                src="/logo-horizontal.png"
                alt="Das Auftragswerk"
                width={160}
                height={48}
                className="brightness-0 invert"
              />
              <p className="mt-4 max-w-sm text-sm text-white/70">
                Automatische Anfragen-Systeme für deutsche Dienstleister.
              </p>
            </div>

            {/* Right: links + contact */}
            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-6 text-sm font-medium text-white/80">
                <a
                  href="/impressum"
                  className="transition-colors hover:text-white"
                >
                  Impressum
                </a>
                <a
                  href="/datenschutz"
                  className="transition-colors hover:text-white"
                >
                  Datenschutz
                </a>
              </div>
              <a
                href="mailto:kontakt@dasauftragswerk.de"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                kontakt@dasauftragswerk.de
              </a>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-6 text-center text-xs text-white/50">
            &copy; 2026 Das Auftragswerk
          </div>
        </footer>
      )}

      {/* Sticky mobile CTA bar */}
      {showStickyCta && variant === "full" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-accent py-3 px-4 md:hidden">
          <a
            href="#kontakt"
            className="block w-full text-center font-semibold text-white"
          >
            Jetzt anfragen
          </a>
        </div>
      )}
    </>
  );
}
