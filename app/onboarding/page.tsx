import Image from 'next/image';
import OnboardingExperience from '@/components/onboarding/OnboardingExperience';

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
          Planen Sie ca. 20 Minuten ein. Mit Ihren Antworten richten wir Ihr Anfragen-System passgenau ein.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {['Zwischenspeicherung aktiv', 'DSGVO-konform', 'In 10 klaren Schritten'].map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-[var(--color-text-muted)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <OnboardingExperience />
    </main>
  );
}
