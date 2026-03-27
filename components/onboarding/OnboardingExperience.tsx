'use client';

import { Suspense, useState } from 'react';
import OnboardingForm from '@/components/onboarding/OnboardingForm';
import OnboardingWelcome from '@/components/onboarding/OnboardingWelcome';

export default function OnboardingExperience() {
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return (
      <OnboardingWelcome
        onStart={() => setShowForm(true)}
        onExit={() => {
          window.location.href = '/';
        }}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center text-[var(--color-text-muted)] mb-20">
          Onboarding wird geladen...
        </div>
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}

