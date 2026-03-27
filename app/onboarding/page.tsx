import Image from 'next/image';
import OnboardingForm from '@/components/onboarding/OnboardingForm';

export const metadata = {
  title: 'Onboarding | Das Auftragswerk',
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
          Willkommen beim Kick-off
        </h1>
        <p className="mt-4 text-[var(--color-text-muted)] text-center max-w-xl text-lg">
          Bitte nehmen Sie sich einige Minuten Zeit, um uns die wichtigsten Informationen zu Ihrem Betrieb zu geben, damit wir optimal starten können.
        </p>
      </div>

      <OnboardingForm />
    </main>
  );
}
