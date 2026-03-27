'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function OnboardingWelcome({
  onStart,
  onExit,
}: {
  onStart: () => void;
  onExit: () => void;
}) {
  const startBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    startBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onExit]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-[var(--color-bg-gray)]"
    >
      <div className="relative w-full h-full bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-28 w-[24rem] h-[24rem] bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-36 -left-24 w-[28rem] h-[28rem] bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto w-full h-full overflow-y-auto">
          <div className="min-h-full flex flex-col justify-center px-6 py-8 md:px-12 md:py-12 lg:px-16">
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-xl">
                <Image
                  src="/logo-horizontal.png"
                  alt="Das Auftragswerk Logo"
                  width={220}
                  height={56}
                  className="object-contain mb-6"
                  priority
                />
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">Onboarding</p>
              <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-[var(--color-primary)] leading-tight">
                Willkommen beim Onboarding
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)] text-base md:text-lg">
                In ca. 20 Minuten geben Sie uns alle wichtigen Infos. Danach wissen Sie genau, wie es weitergeht.
              </p>
              </div>

              <button
                type="button"
                ref={startBtnRef}
                onClick={onStart}
                aria-label="Willkommensbildschirm schließen und zum Formular wechseln"
                className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 bg-white/70 hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-[var(--color-bg-gray)] p-5">
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">In 10 klaren Schritten</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">Sie sehen jederzeit, wo Sie im Prozess stehen.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[var(--color-bg-gray)] p-5">
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">Zwischenspeicherung</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">Ihr Fortschritt wird automatisch lokal gespeichert.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[var(--color-bg-gray)] p-5">
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">DSGVO-konform</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">Datenschutz und Einwilligung sind klar integriert.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-[var(--color-bg-gray)] p-5">
                <p className="text-sm font-semibold text-[var(--color-text-dark)]">Keine Passwörter teilen</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">Wir werden als Manager eingeladen, nie als Login-Nutzer.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onStart}
                className="px-8 py-3 bg-[var(--color-primary)] hover:bg-[#082a4d] text-white rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2"
              >
                Fragebogen starten
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={onExit}
                className="px-8 py-3 border border-gray-200 bg-white rounded-xl font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)] transition-colors"
              >
                Später
              </button>
            </div>

            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
              Tipp: Sie können jederzeit zum Formular zurückkehren und fortsetzen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

