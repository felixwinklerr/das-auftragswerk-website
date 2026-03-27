import Image from 'next/image';
import { Suspense } from 'react';
import OnboardingForm from '@/components/onboarding/OnboardingForm';

export const metadata = {
  title: 'Onboarding-Fragebogen | Das Auftragswerk',
  description:
    'Füllen Sie den Onboarding-Fragebogen aus, damit wir Ihr Anfragen-System optimal einrichten können.',
  openGraph: {
    title: 'Onboarding-Fragebogen | Das Auftragswerk',
    description:
      'Füllen Sie den Onboarding-Fragebogen aus, damit wir Ihr Anfragen-System optimal einrichten können.',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-gray)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col items-center mb-8">
        <Image
          src="/logo-horizontal.png"
          alt="Das Auftragswerk Logo"
          width={240}
          height={60}
          className="object-contain"
          priority
        />
        <h1 className="mt-8 text-3xl font-extrabold text-[var(--color-primary)] text-center">
          Willkommen beim Onboarding
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)] text-center max-w-xl text-lg">
          Bitte nehmen Sie sich ca. 20 Minuten Zeit. Ihre Antworten helfen uns, Ihr Anfragen-System optimal
          einzurichten.
        </p>
      </div>

      <Suspense fallback={<div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center text-[var(--color-text-muted)]">Laden...</div>}>
        <OnboardingForm />
      </Suspense>
    </main>
  );
}
