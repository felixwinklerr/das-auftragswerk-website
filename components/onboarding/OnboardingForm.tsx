'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Types ─── */
interface FormData {
  email: string;
  firmenname: string;
  branche: string;
  standort: string;
  einzugsgebiet: string;
  mitarbeiter: string;
  bestehensdauer: string;
  idealerNeukunde: string;
  auftragswert: string;
  kundenquellen: string[];
  anfragenProWoche: string;
  problem: string;
  usp: string;
  anfragenProzess: string;
  antwortGeschwindigkeit: string;
  ansprechperson: string;
  crm: string;
  website: string;
  googleBusiness: string;
  googleBusinessLink: string;
  bewertungen: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  adsErfahrung: string;
  
  // Step 6: Zugänge
  plattformen: string[];
  cms: string;
  besonderheiten: string;
  logoFile: File | null;

  budget: string;
  kommunikation: string;
  ziel: string;
  neukundenZiel: string;
  frustrationen: string;
  sonstiges: string;
  dsgvoConsent: boolean;
}

const initialData: FormData = {
  email: '',
  firmenname: '',
  branche: '',
  standort: '',
  einzugsgebiet: '',
  mitarbeiter: '',
  bestehensdauer: '',
  idealerNeukunde: '',
  auftragswert: '',
  kundenquellen: [],
  anfragenProWoche: '',
  problem: '',
  usp: '',
  anfragenProzess: '',
  antwortGeschwindigkeit: '',
  ansprechperson: '',
  crm: '',
  website: '',
  googleBusiness: '',
  googleBusinessLink: '',
  bewertungen: '',
  instagram: '',
  facebook: '',
  linkedin: '',
  adsErfahrung: '',
  plattformen: [],
  cms: '',
  besonderheiten: '',
  logoFile: null,
  budget: '',
  kommunikation: '',
  ziel: '',
  neukundenZiel: '',
  frustrationen: '',
  sonstiges: '',
  dsgvoConsent: false,
};

const stepTitles = [
  'Ihr Betrieb',
  'Ihre Kunden',
  'Problem & USP',
  'Anfragen-Prozess',
  'Online-Präsenz',
  'Vorhandene Zugänge',
  'Budget & Kommunikation',
  'Ziele',
  'Zugänge Schritt für Schritt (optional)',
  'Kick-off buchen',
];

/* ─── Reusable field components (defined outside to prevent remount) ─── */

function RequiredDot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block mt-1 shrink-0" />;
}

function RequiredDotInline() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block mt-1 shrink-0" />;
}

function InputField({
  id,
  label,
  required,
  error,
  hint,
  ...props
}: {
  id?: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const computedId = id ?? props.name ?? `input-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <label htmlFor={computedId} className="text-[var(--color-text-dark)] font-medium text-sm inline-flex items-start gap-1.5">
        <span>{label}</span>
        {required && <RequiredDot />}
      </label>
      {hint && <p className="text-xs text-[var(--color-text-muted)] -mt-1">{hint}</p>}
      <input
        id={computedId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${computedId}-error` : undefined}
        className={`w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all ${
          error ? 'border-red-400 bg-red-50/40' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && (
        <p id={`${computedId}-error`} className="text-xs text-red-600 -mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  required,
  error,
  hint,
  ...props
}: {
  id?: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const computedId = id ?? props.name ?? `textarea-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <label htmlFor={computedId} className="text-[var(--color-text-dark)] font-medium text-sm inline-flex items-start gap-1.5">
        <span>{label}</span>
        {required && <RequiredDot />}
      </label>
      {hint && <p className="text-xs text-[var(--color-text-muted)] -mt-1">{hint}</p>}
      <textarea
        id={computedId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${computedId}-error` : undefined}
        className={`w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all min-h-[120px] resize-y ${
          error ? 'border-red-400 bg-red-50/40' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && (
        <p id={`${computedId}-error`} className="text-xs text-red-600 -mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  id,
  label,
  required,
  options,
  error,
  hint,
  ...props
}: {
  id?: string;
  label: string;
  required?: boolean;
  options: string[];
  error?: string;
  hint?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const computedId = id ?? props.name ?? `select-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <label htmlFor={computedId} className="text-[var(--color-text-dark)] font-medium text-sm inline-flex items-start gap-1.5">
        <span>{label}</span>
        {required && <RequiredDot />}
      </label>
      {hint && <p className="text-xs text-[var(--color-text-muted)] -mt-1">{hint}</p>}
      <select
        id={computedId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${computedId}-error` : undefined}
        className={`w-full border rounded-lg px-4 py-3 text-base bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all cursor-pointer ${
          error ? 'border-red-400 bg-red-50/40' : 'border-gray-300'
        }`}
        {...props}
      >
        <option value="" disabled>
          Bitte wählen...
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${computedId}-error`} className="text-xs text-red-600 -mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Animation variants ─── */
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 100 : -100, opacity: 0 }),
};

/* ─── Main Form Component ─── */
export default function OnboardingForm() {
  const DRAFT_KEY = 'onboarding-form-draft-v1';
  const DRAFT_VERSION = 3;
  const searchParams = useSearchParams();
  const contactRef = searchParams.get('ref') || '';
  const hasContactRef = Boolean(contactRef);
  const totalSteps = 10;

  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorsByField, setErrorsByField] = useState<Record<string, string>>({});
  const [errorsList, setErrorsList] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState('');
  const [restoredDraft, setRestoredDraft] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const errorBoxRef = useRef<HTMLDivElement | null>(null);
  const stepHeadingRef = useRef<HTMLDivElement | null>(null);

  const stepDescriptions = useMemo(
    () => [
      'Grunddaten Ihres Betriebs',
      'Zielkunden und Anfrageaufkommen',
      'Herausforderungen und Positionierung',
      'Ablauf bei neuen Anfragen',
      'Digitale Sichtbarkeit und Kanäle',
      'Welche Zugänge bereits vorhanden sind',
      'Budgetrahmen und Kontaktweg',
      'Ziele und rechtliche Zustimmung',
      'Optionale Schritt-für-Schritt Anleitung',
      'Kick-off Termin buchen',
    ],
    []
  );

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as
        | Partial<FormData>
        | { version?: number; step?: number; data?: Partial<FormData> };

      // Backward-compatible restore for legacy drafts.
      if ('data' in parsed && parsed.data) {
        setData((prev) => ({ ...prev, ...parsed.data, logoFile: null }));
        if (typeof parsed.step === 'number') {
          setStep(Math.min(Math.max(parsed.step, 1), totalSteps));
        }
      } else {
        setData((prev) => ({ ...prev, ...(parsed as Partial<FormData>), logoFile: null }));
      }
      setRestoredDraft(true);
    } catch (error) {
      console.error('Draft restore failed', error);
    } finally {
      setDraftReady(true);
    }
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    try {
      const { logoFile, ...persistableData } = data;
      const payload = {
        version: DRAFT_VERSION,
        updatedAt: new Date().toISOString(),
        step: Math.min(step, totalSteps),
        data: persistableData,
      };
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error('Draft save failed', error);
    }
  }, [data, step, draftReady]);

  useEffect(() => {
    if (!errorsList.length) return;
    errorBoxRef.current?.focus();
  }, [errorsList]);

  useEffect(() => {
    // Focus the first input of the currently active step for best keyboard UX.
    const t = window.setTimeout(() => {
      const el = document.querySelector('[data-onboarding-first-focus="true"]') as HTMLElement | null;
      el?.focus();
    }, 80);
    return () => window.clearTimeout(t);
  }, [step, hasContactRef]);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (step >= 9) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [step]);

  const handleCheckbox = (value: string) => {
    setData((prev) => {
      const current = prev.kundenquellen;
      if (current.includes(value)) {
        return { ...prev, kundenquellen: current.filter((i) => i !== value) };
      }
      return { ...prev, kundenquellen: [...current, value] };
    });
  };

  const validateStep = (s: number): boolean => {
    const nextErrorsByField: Record<string, string> = {};
    const nextErrorsList: string[] = [];

    const add = (key: string, message: string) => {
      if (nextErrorsByField[key]) return;
      nextErrorsByField[key] = message;
      nextErrorsList.push(message);
    };

    if (s === 1) {
      if (!hasContactRef && !data.email) add('email', 'E-Mail-Adresse ist erforderlich.');
      if (!data.firmenname) add('firmenname', 'Firmenname ist erforderlich.');
      if (!data.branche) add('branche', 'Branche ist erforderlich.');
      if (!data.standort) add('standort', 'Standort ist erforderlich.');
      if (data.branche !== 'Coach/Berater' && !data.einzugsgebiet) add('einzugsgebiet', 'Einzugsgebiet ist erforderlich.');
    }
    if (s === 2) {
      if (!data.auftragswert) add('auftragswert', 'Auftragswert ist erforderlich.');
      if (!data.anfragenProWoche) add('anfragenProWoche', 'Anzahl Anfragen pro Woche ist erforderlich.');
    }
    if (s === 4) {
      if (!data.anfragenProzess) add('anfragenProzess', 'Anfragen-Prozess ist erforderlich.');
      if (!data.antwortGeschwindigkeit) add('antwortGeschwindigkeit', 'Antwortgeschwindigkeit ist erforderlich.');
    }
    if (s === 7) {
      if (!data.budget) add('budget', 'Werbebudget ist erforderlich.');
      if (!data.kommunikation) add('kommunikation', 'Kommunikationskanal ist erforderlich.');
    }
    if (s === 8) {
      if (!data.ziel) add('ziel', 'Bitte beschreiben Sie Ihr wichtigstes Ziel.');
      if (!data.neukundenZiel) add('neukundenZiel', 'Neukunden-Ziel ist erforderlich.');
      if (!data.dsgvoConsent) add('dsgvoConsent', 'Bitte stimmen Sie der Datenschutzerklärung zu.');
    }

    setErrorsByField(nextErrorsByField);
    setErrorsList(nextErrorsList);
    return nextErrorsList.length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setSubmitError('');
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, 8));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setErrorsByField({});
    setErrorsList([]);
    setSubmitError('');
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitForm = async () => {
    if (!validateStep(8)) return;
    setLoading(true);
    setSubmitError('');
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'logoFile') {
          if (value) formData.append('logoFile', value as File);
        } else if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, String(value));
        }
      });
      
      formData.append('contactId', contactRef || '');
      formData.append('tags', 'fragebogen-erhalten');

      const res = await fetch('/api/onboarding', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        setDirection(1);
        setStep(9);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errorData = await res.json().catch(() => ({}));
        setSubmitError(errorData.error || 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      }
    } catch (e) {
      console.error(e);
      setSubmitError('Die Verbindung ist fehlgeschlagen. Bitte versuchen Sie es in einem Moment erneut.');
    } finally {
      setLoading(false);
    }
  };

  /* ─── Render ─── */
  return (
    <div
      className={`w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-20 ${
        step >= 9 ? 'max-w-4xl' : 'max-w-2xl'
      }`}
    >
      {/* Progress Bar */}
      <div className="bg-[var(--color-bg-gray)] p-6 border-b border-gray-100">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
            Schritt {step} von {totalSteps}
          </span>
          <span className="text-sm font-medium text-[var(--color-text-muted)]">{stepTitles[step - 1]}</span>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mb-3">{stepDescriptions[step - 1]}</p>
        <div
          className="h-2 bg-gray-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-label="Onboarding Fortschritt"
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuenow={step}
        >
          <motion.div
            className="h-full bg-[var(--color-primary)]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">{Math.round((step / totalSteps) * 100)}% abgeschlossen</p>
      </div>

      {/* Validation Errors */}
      {errorsList.length > 0 && (
        <div
          ref={errorBoxRef}
          role="alert"
          tabIndex={-1}
          className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg outline-none"
        >
          <p className="text-sm font-semibold text-red-700 mb-2">Bitte prüfen Sie die markierten Felder:</p>
          {errorsList.map((err) => (
            <p key={err} className="text-sm text-red-600">
              - {err}
            </p>
          ))}
        </div>
      )}

      {submitError && (
        <div className="mx-8 mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg" role="alert">
          <p className="text-sm text-amber-800">{submitError}</p>
        </div>
      )}

      {restoredDraft && step < 9 && (
        <div className="mx-8 mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Ihr zuletzt gespeicherter Entwurf wurde wiederhergestellt. Upload-Dateien werden aus Sicherheitsgründen nicht lokal gespeichert.
          </p>
        </div>
      )}

      <div className="p-8 md:p-12 relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, type: 'tween', ease: 'easeInOut' }}
            className="w-full"
          >
            <div
              ref={stepHeadingRef}
              tabIndex={-1}
              className="outline-none mb-2"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="text-xs text-[var(--color-text-muted)]">{stepTitles[step - 1]}</p>
            </div>
            {/* ── STEP 1: Ihr Betrieb ── */}
            {step === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Ihr Betrieb</h3>

                {!hasContactRef && (
                  <>
                    <p className="text-sm text-[var(--color-text-muted)] mb-4 bg-[var(--color-bg-blue)] p-3 rounded-lg">
                      Wir benötigen Ihre E-Mail-Adresse, um Ihre Antworten Ihrem Kundenprofil zuordnen zu können.
                    </p>
                    <InputField
                      id="email"
                      label="E-Mail-Adresse"
                      required
                      type="email"
                      placeholder="ihre@email.de"
                      value={data.email}
                      error={errorsByField.email}
                      data-onboarding-first-focus={true}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </>
                )}

                <InputField
                  id="firmenname"
                  label="Firmenname"
                  required
                  placeholder="Wie auf Google und Ihrer Website"
                  value={data.firmenname}
                  error={errorsByField.firmenname}
                  data-onboarding-first-focus={true}
                  onChange={(e) => updateField('firmenname', e.target.value)}
                />
                <SelectField
                  id="branche"
                  label="Branche / Hauptleistung"
                  required
                  options={['Maler', 'Gärtner', 'Gebäudereinigung', 'Schreiner', 'Dachdecker', 'Coach/Berater', 'Sonstiges']}
                  value={data.branche}
                  error={errorsByField.branche}
                  onChange={(e) => updateField('branche', e.target.value)}
                />
                <InputField
                  id="standort"
                  label="Standort/Stadt"
                  required
                  placeholder="z.B. Hamburg"
                  value={data.standort}
                  error={errorsByField.standort}
                  onChange={(e) => updateField('standort', e.target.value)}
                />
                {data.branche !== 'Coach/Berater' && (
                  <InputField
                    id="einzugsgebiet"
                    label="Aktionsradius (km)"
                    required
                    type="number"
                    placeholder="Wie weit fahren Sie zu Kunden?"
                    value={data.einzugsgebiet}
                    error={errorsByField.einzugsgebiet}
                    onChange={(e) => updateField('einzugsgebiet', e.target.value)}
                  />
                )}
                <SelectField
                  label="Anzahl Mitarbeiter"
                  options={['Solo', '2-5', '6-10', '11-20', '20+']}
                  value={data.mitarbeiter}
                  onChange={(e) => updateField('mitarbeiter', e.target.value)}
                />
                <SelectField
                  label="Wie lange gibt es den Betrieb?"
                  options={['<1 Jahr', '1-3 Jahre', '3-5 Jahre', '5-10 Jahre', '10+ Jahre']}
                  value={data.bestehensdauer}
                  onChange={(e) => updateField('bestehensdauer', e.target.value)}
                />
              </div>
            )}

            {/* ── STEP 2: Ihre Kunden ── */}
            {step === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Ihre Kunden</h3>
                <TextAreaField
                  label="Wer ist Ihr idealer Neukunde?"
                  placeholder="Privatperson, Unternehmen, bestimmte Branche, Region"
                  value={data.idealerNeukunde}
                  onChange={(e) => updateField('idealerNeukunde', e.target.value)}
                />
                <InputField
                  id="auftragswert"
                  label={
                    data.branche === 'Coach/Berater'
                      ? 'Was kostet Ihr Hauptangebot / Coaching-Paket? €'
                      : 'Durchschnittlicher Auftragswert €'
                  }
                  required
                  placeholder="z.B. 1500€"
                  type="number"
                  value={data.auftragswert}
                  error={errorsByField.auftragswert}
                  data-onboarding-first-focus={true}
                  onChange={(e) => updateField('auftragswert', e.target.value)}
                />

                <div className="flex flex-col gap-2 w-full mb-6">
                  <label className="text-[var(--color-text-dark)] font-medium text-sm">
                    Wie kommen Kunden aktuell zu Ihnen?
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {['Empfehlungen', 'Google', 'Social Media', 'Portale', 'Direktwerbung', 'Sonstiges'].map((src) => (
                      <label
                        key={src}
                        className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-[var(--color-bg-gray)] transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[var(--color-accent)] rounded focus:ring-[var(--color-accent)]"
                          checked={data.kundenquellen.includes(src)}
                          onChange={() => handleCheckbox(src)}
                        />
                        <span className="text-sm text-[var(--color-text-dark)]">{src}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <SelectField
                  id="anfragenProWoche"
                  label="Wie viele neue Anfragen erhalten Sie pro Woche?"
                  options={['0-2', '3-5', '6-10', '10-20', '20+']}
                  required
                  value={data.anfragenProWoche}
                  error={errorsByField.anfragenProWoche}
                  onChange={(e) => updateField('anfragenProWoche', e.target.value)}
                />
              </div>
            )}

            {/* ── STEP 3: Problem & USP ── */}
            {step === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Problem & USP</h3>
                <TextAreaField
                  data-onboarding-first-focus={true}
                  label="Welches Hauptproblem haben Ihre Kunden vor der Kontaktaufnahme?"
                  placeholder="z.B. zu wenige passende Anfragen, niedrige Conversion, keine klare Anfrage-Qualität"
                  value={data.problem}
                  onChange={(e) => updateField('problem', e.target.value)}
                />
                <TextAreaField
                  label="Was unterscheidet Sie vom Wettbewerb?"
                  placeholder="Warum sollte ein Kunde Sie wählen? z.B. schneller Ablauf, klare Ergebnisse, Top-Service"
                  value={data.usp}
                  onChange={(e) => updateField('usp', e.target.value)}
                />
              </div>
            )}

            {/* ── STEP 4: Anfragen-Prozess ── */}
            {step === 4 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Anfragen-Prozess</h3>
                <TextAreaField
                  id="anfragenProzess"
                  data-onboarding-first-focus={true}
                  label="Wie läuft bei Ihnen eine neue Anfrage ab?"
                  required
                  placeholder="z.B. Anruf → Rezeption notiert → Termin vereinbart"
                  value={data.anfragenProzess}
                  error={errorsByField.anfragenProzess}
                  onChange={(e) => updateField('anfragenProzess', e.target.value)}
                />
                <SelectField
                  id="antwortGeschwindigkeit"
                  label="Wie schnell reagieren Sie auf neue Anfragen?"
                  options={['Sofort/Minuten', 'Innerhalb 1 Stunde', 'Innerhalb 4 Stunden', 'Nächster Werktag', 'Unterschiedlich']}
                  required
                  value={data.antwortGeschwindigkeit}
                  error={errorsByField.antwortGeschwindigkeit}
                  onChange={(e) => updateField('antwortGeschwindigkeit', e.target.value)}
                />
                <InputField
                  label="Wer ist Ansprechpartner für neue Anfragen?"
                  placeholder="Name und Rolle - damit wir Benachrichtigungen korrekt einrichten"
                  value={data.ansprechperson}
                  onChange={(e) => updateField('ansprechperson', e.target.value)}
                />
                <SelectField
                  label="CRM / Kundenverwaltung"
                  options={['Keine', 'Excel/Tabellen', 'Lexoffice', 'Plancraft', 'Craftview', 'HubSpot', 'Sonstige']}
                  value={data.crm}
                  onChange={(e) => updateField('crm', e.target.value)}
                />
              </div>
            )}

            {/* ── STEP 5: Online-Präsenz ── */}
            {step === 5 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Online-Präsenz</h3>
                <InputField
                  data-onboarding-first-focus={true}
                  label="Website URL"
                  placeholder="https://www.ihrefirma.de"
                  value={data.website}
                  onChange={(e) => updateField('website', e.target.value)}
                />
                <SelectField
                  label="Google Business Profil vorhanden?"
                  options={['Ja', 'Nein', 'Unsicher']}
                  value={data.googleBusiness}
                  onChange={(e) => updateField('googleBusiness', e.target.value)}
                />
                {data.googleBusiness === 'Ja' && (
                  <InputField
                    label="Google Business Profil Link (falls bekannt)"
                    placeholder="https://g.page/..."
                    value={data.googleBusinessLink}
                    onChange={(e) => updateField('googleBusinessLink', e.target.value)}
                  />
                )}
                <InputField
                  label="Anzahl Google-Bewertungen ungefähr"
                  type="number"
                  placeholder="z.B. 12"
                  value={data.bewertungen}
                  onChange={(e) => updateField('bewertungen', e.target.value)}
                />
                <InputField
                  label="Instagram URL (optional)"
                  placeholder="https://instagram.com/ihrprofil"
                  value={data.instagram}
                  onChange={(e) => updateField('instagram', e.target.value)}
                />
                <InputField
                  label="Facebook URL (optional)"
                  placeholder="https://facebook.com/ihrseite"
                  value={data.facebook}
                  onChange={(e) => updateField('facebook', e.target.value)}
                />
                <InputField
                  label="LinkedIn URL (optional)"
                  placeholder="https://linkedin.com/in/ihrprofil"
                  value={data.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                />
                <TextAreaField
                  label="Welche Erfahrungen haben Sie mit Google Ads / Online-Werbung?"
                  placeholder="Was wurde gemacht, Ergebnis, Zugang zum Konto vorhanden?"
                  value={data.adsErfahrung}
                  onChange={(e) => updateField('adsErfahrung', e.target.value)}
                />
              </div>
            )}

            {/* ── STEP 6: Zugänge ── */}
            {step === 6 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Vorhandene Zugänge</h3>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8">
                  <p className="text-sm text-blue-800 font-medium mb-1">Was passiert als Nächstes?</p>
                  <p className="text-sm text-blue-700">
                    Die Auswahl ist optional. Wählen Sie nur Plattformen aus, die Sie bereits nutzen.
                    Im nächsten Schritt zeigen wir Ihnen die passende Anleitung - oder Sie überspringen und wir richten
                    alles gemeinsam im Kick-off Call ein.
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full mb-6">
                  <label className="text-[var(--color-text-dark)] font-medium text-sm">
                    Welche Zugänge haben Sie aktuell?
                  </label>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">
                    Bitte nur anklicken, wenn bereits vorhanden. Wenn Sie unsicher sind, lassen Sie alles frei.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {['Google Business Profil', 'Google Ads'].map((plat) => (
                      <label
                        key={plat}
                        className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-[var(--color-bg-gray)] transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[var(--color-accent)] rounded focus:ring-[var(--color-accent)]"
                          data-onboarding-first-focus={plat === 'Google Business Profil'}
                          checked={data.plattformen.includes(plat)}
                          onChange={() => {
                            const current = data.plattformen;
                            if (current.includes(plat)) {
                              updateField('plattformen', current.filter((i) => i !== plat));
                            } else {
                              updateField('plattformen', [...current, plat]);
                            }
                          }}
                        />
                        <span className="text-sm text-[var(--color-text-dark)]">{plat}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">
                    Wichtig: Wir werden immer als Manager eingeladen, nie als Login-Benutzer. Ihr Passwort bleibt bei Ihnen.
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full mb-6">
                  <label className="text-[var(--color-text-dark)] font-medium text-sm">Domain-Anbieter</label>
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">
                    Wir bauen Ihre Landing Page und verbinden sie mit Ihrer Domain. Ihre bestehende Website bleibt unverändert.
                  </p>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all cursor-pointer"
                    value={data.cms}
                    onChange={(e) => updateField('cms', e.target.value)}
                  >
                    <option value="" disabled>Bitte wählen...</option>
                    {['IONOS', 'Strato', 'GoDaddy', 'Namecheap', 'All-Inkl', 'Hetzner', 'Sonstiges', 'Noch keine Domain'].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <TextAreaField
                  label="Gibt es Besonderheiten beim Zugang? (optional)"
                  placeholder="z.B. Zwei-Faktor-Authentifizierung, spezielle Hosting-Anbieter"
                  value={data.besonderheiten}
                  onChange={(e) => updateField('besonderheiten', e.target.value)}
                />

                <div className="flex flex-col gap-2 w-full mb-6">
                  <label className="text-[var(--color-text-dark)] font-medium text-sm">
                    Logo & Branding (PNG/JPG/SVG/PDF, max 10MB)
                  </label>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg,.pdf"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-bg-blue)] file:text-[var(--color-primary)] hover:file:bg-blue-100 transition-all cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 10 * 1024 * 1024) {
                          setSubmitError('Die ausgewählte Datei ist zu groß (max. 10MB).');
                          e.target.value = '';
                        } else {
                          setSubmitError('');
                          updateField('logoFile', file);
                        }
                      } else {
                        updateField('logoFile', null);
                      }
                    }}
                  />
                  {data.logoFile && <p className="text-xs text-green-600 mt-1">Ausgewählt: {data.logoFile.name}</p>}
                </div>
              </div>
            )}

            {/* ── STEP 7: Budget & Kommunikation ── */}
            {step === 7 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Budget & Kommunikation</h3>
                <SelectField
                  id="budget"
                  data-onboarding-first-focus={true}
                  label="Geplantes Werbebudget pro Monat"
                  options={['300-500€', '500-1.000€', '1.000-2.000€', '2.000€+', 'Noch unklar']}
                  required
                  value={data.budget}
                  error={errorsByField.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                />
                <p className="text-sm text-[var(--color-text-muted)] -mt-3 mb-6">
                  Empfehlung: mindestens 300€/Monat als Basis für stabile Ergebnisse.
                </p>

                <div className="flex flex-col gap-2 w-full mb-6">
                  <label className="text-[var(--color-text-dark)] font-medium text-sm inline-flex items-start gap-1.5">
                    <span>Bevorzugter Kommunikationskanal</span>
                    <RequiredDotInline />
                  </label>
                  <div className="flex flex-col gap-3 mt-2">
                    {['WhatsApp', 'Email', 'Telefon'].map((kanal) => (
                      <label
                        key={kanal}
                        className="flex items-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-[var(--color-bg-gray)] transition-colors"
                      >
                        <input
                          type="radio"
                          name="kommunikation"
                          className="w-4 h-4 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                          checked={data.kommunikation === kanal}
                          onChange={() => updateField('kommunikation', kanal)}
                        />
                        <span className="text-base text-[var(--color-text-dark)]">{kanal}</span>
                      </label>
                    ))}
                  </div>
                  {errorsByField.kommunikation && (
                    <p className="text-xs text-red-600 mt-1">{errorsByField.kommunikation}</p>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP 8: Ziele ── */}
            {step === 8 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Ziele</h3>
                <TextAreaField
                  id="ziel"
                  data-onboarding-first-focus={true}
                  label="Was ist Ihr wichtigstes Ziel?"
                  required
                  placeholder="z.B. 30 qualifizierte Anfragen pro Monat"
                  value={data.ziel}
                  error={errorsByField.ziel}
                  onChange={(e) => updateField('ziel', e.target.value)}
                />
                <InputField
                  id="neukundenZiel"
                  label="Wie viele Neukunden pro Monat sind Ihr Ziel?"
                  required
                  placeholder="z.B. 15"
                  type="number"
                  value={data.neukundenZiel}
                  error={errorsByField.neukundenZiel}
                  onChange={(e) => updateField('neukundenZiel', e.target.value)}
                />
                <TextAreaField
                  label="Frustrationen mit früheren Marketing-Projekten? (optional)"
                  placeholder="z.B. zu hohe Kosten, unklare Ergebnisse, schlechte Abstimmung"
                  value={data.frustrationen}
                  onChange={(e) => updateField('frustrationen', e.target.value)}
                />
                <TextAreaField
                  label="Sonstiges (optional)"
                  placeholder="z.B. besondere Rahmenbedingungen, bestehende Tools, Deadlines"
                  value={data.sonstiges}
                  onChange={(e) => updateField('sonstiges', e.target.value)}
                />

                {/* DSGVO Consent */}
                <div className="mt-4 p-4 bg-[var(--color-bg-gray)] rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="dsgvoConsent"
                      type="checkbox"
                      aria-invalid={Boolean(errorsByField.dsgvoConsent)}
                      aria-describedby={errorsByField.dsgvoConsent ? 'dsgvoConsent-error' : undefined}
                      className="w-4 h-4 mt-1 text-[var(--color-accent)] rounded focus:ring-[var(--color-accent)]"
                      checked={data.dsgvoConsent}
                      onChange={(e) => updateField('dsgvoConsent', e.target.checked)}
                    />
                    <span className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      <span className="inline-flex items-start gap-1.5">
                        <RequiredDotInline />
                        <span>
                          Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                          <a
                            href="/datenschutz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-primary)] underline hover:text-[var(--color-accent)] transition-colors"
                          >
                            Datenschutzerklärung
                          </a>{' '}
                          zu.
                        </span>
                      </span>
                    </span>
                  </label>
                  {errorsByField.dsgvoConsent && (
                    <p id="dsgvoConsent-error" className="text-xs text-red-600 mt-2">
                      {errorsByField.dsgvoConsent}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP 9: Zugänge Schritt für Schritt ── */}
            {step === 9 && (
              <div className="flex flex-col py-2 sm:py-4">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-2">Zugänge vorbereiten (optional)</h3>
                  <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                    Hier sehen Sie die nächsten Schritte visuell und klar erklärt. Wenn es Ihnen zu aufwendig ist,
                    überspringen Sie einfach - wir erledigen alles gemeinsam im Kick-off Call.
                  </p>
                </div>

                <div className="w-full bg-[var(--color-bg-gray)] rounded-xl p-4 sm:p-6 mb-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-dark)]">Ihre Angaben im Überblick</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">Diese Daten nutzen wir für das Setup.</p>
                    </div>
                    <button
                      type="button"
                      data-onboarding-first-focus={true}
                      onClick={() => {
                        setDirection(1);
                        setStep(10);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-[var(--color-primary)] hover:bg-[#082a4d] text-white rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      Weiter zur Terminbuchung
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                    <div className="bg-white rounded-lg border border-gray-100 p-4">
                      <p className="text-xs text-[var(--color-text-muted)]">Betrieb</p>
                      <p className="font-medium text-[var(--color-text-dark)]">{data.firmenname || '-'}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 p-4">
                      <p className="text-xs text-[var(--color-text-muted)]">Standort</p>
                      <p className="font-medium text-[var(--color-text-dark)]">{data.standort || '-'}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 p-4">
                      <p className="text-xs text-[var(--color-text-muted)]">Branche</p>
                      <p className="font-medium text-[var(--color-text-dark)]">{data.branche || '-'}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 p-4">
                      <p className="text-xs text-[var(--color-text-muted)]">Ziel</p>
                      <p className="font-medium text-[var(--color-text-dark)]">{data.ziel || '-'}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setDirection(1);
                      setStep(10);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-4 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)] underline underline-offset-2"
                  >
                    Anleitung überspringen - im Kick-off Call gemeinsam einrichten
                  </button>
                </div>

                {data.plattformen.length === 0 && (!data.cms || data.cms === 'Noch keine Domain') && (
                  <div className="w-full bg-white rounded-xl p-4 sm:p-6 border border-gray-100 mb-6">
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Es wurden noch keine Zugänge ausgewählt. Kein Problem - wir richten alles gemeinsam im Kick-off Call ein.
                    </p>
                  </div>
                )}

                {(data.plattformen.length > 0 || (data.cms && data.cms !== 'Noch keine Domain')) && (
                  <div className="w-full bg-[var(--color-bg-gray)] rounded-xl p-4 sm:p-6 mb-2">
                    <p className="text-sm font-semibold text-[var(--color-text-dark)] mb-5">
                      Schritt-für-Schritt Anleitung mit visueller Orientierung
                    </p>

                    <div className="space-y-6">
                      {data.plattformen.includes('Google Business Profil') && (
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="rounded-lg border border-gray-200 bg-white p-3">
                              <p className="text-xs font-semibold text-[var(--color-text-dark)] mb-2">Bild 1: Manager-Bereich öffnen</p>
                              <div className="h-36 rounded-md bg-[var(--color-bg-gray)] flex items-center justify-center">
                                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                  <rect x="6" y="8" width="108" height="64" rx="8" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                                  <rect x="18" y="20" width="84" height="8" rx="4" fill="currentColor" opacity="0.15" />
                                  <rect x="18" y="34" width="56" height="6" rx="3" fill="currentColor" opacity="0.12" />
                                  <rect x="18" y="46" width="70" height="6" rx="3" fill="currentColor" opacity="0.12" />
                                </svg>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold text-[var(--color-text-dark)] mb-2">Google Business Profil</h4>
                              <p className="text-sm text-[var(--color-text-muted)] mb-3">Ziel: Uns als Manager hinzufügen (ohne Passwortfreigabe).</p>
                              <ol className="text-sm text-[var(--color-text-muted)] space-y-2 list-decimal list-inside">
                                <li><span className="font-medium">business.google.com</span> öffnen und anmelden.</li>
                                <li>Rechts oben in <span className="font-medium">Einstellungen</span> den Bereich <span className="font-medium">Manager</span> öffnen.</li>
                                <li><span className="font-medium">Nutzer hinzufügen</span> wählen und <span className="font-medium text-[var(--color-primary)]">zugang@dasauftragswerk.de</span> eintragen.</li>
                                <li>Rolle <span className="font-medium">Manager</span> auswählen und speichern.</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      )}

                      {data.plattformen.includes('Google Ads') && (
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="rounded-lg border border-gray-200 bg-white p-3">
                              <p className="text-xs font-semibold text-[var(--color-text-dark)] mb-2">Bild 2: Manager-Konto verknüpfen</p>
                              <div className="h-36 rounded-md bg-[var(--color-bg-gray)] flex items-center justify-center">
                                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                  <rect x="10" y="10" width="100" height="60" rx="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                                  <circle cx="34" cy="40" r="8" fill="currentColor" opacity="0.15" />
                                  <rect x="48" y="26" width="44" height="8" rx="4" fill="currentColor" opacity="0.15" />
                                  <rect x="48" y="40" width="36" height="6" rx="3" fill="currentColor" opacity="0.12" />
                                </svg>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold text-[var(--color-text-dark)] mb-2">Google Ads</h4>
                              <p className="text-sm text-[var(--color-text-muted)] mb-3">Wir verbinden Ihr Konto mit unserem MCC. Ihr Login bleibt bei Ihnen.</p>
                              <ol className="text-sm text-[var(--color-text-muted)] space-y-2 list-decimal list-inside">
                                <li><span className="font-medium">ads.google.com</span> öffnen und anmelden.</li>
                                <li>Werkzeug-Symbol &rarr; <span className="font-medium">Einrichtung</span>.</li>
                                <li><span className="font-medium">Zugriff und Sicherheit</span> &rarr; Reiter <span className="font-medium">Manager</span>.</li>
                                <li><span className="font-medium">Manager-Konto verknüpfen</span> auswählen und MCC-ID eintragen.</li>
                              </ol>
                              <p className="text-xs text-[var(--color-text-muted)] mt-3">Kein Konto vorhanden? Wir legen es im Kick-off Call mit Ihnen an.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {(data.cms && data.cms !== 'Noch keine Domain') && (
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="rounded-lg border border-gray-200 bg-white p-3">
                              <p className="text-xs font-semibold text-[var(--color-text-dark)] mb-2">Bild 3: DNS-Einträge setzen</p>
                              <div className="h-36 rounded-md bg-[var(--color-bg-gray)] flex items-center justify-center">
                                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                  <rect x="8" y="12" width="104" height="56" rx="8" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                                  <rect x="18" y="24" width="84" height="10" rx="5" fill="currentColor" opacity="0.15" />
                                  <rect x="18" y="40" width="52" height="8" rx="4" fill="currentColor" opacity="0.12" />
                                  <rect x="74" y="40" width="28" height="8" rx="4" fill="currentColor" opacity="0.12" />
                                </svg>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-base font-semibold text-[var(--color-text-dark)] mb-2">Domain verbinden ({data.cms})</h4>
                              <p className="text-sm text-[var(--color-text-muted)] mb-3">Ihre bestehende Website bleibt unangetastet. Wir verbinden nur die Landing-Subdomain.</p>
                              <ol className="text-sm text-[var(--color-text-muted)] space-y-2 list-decimal list-inside">
                                <li>Im Kundenkonto von <span className="font-medium">{data.cms}</span> anmelden und DNS öffnen.</li>
                                <li>Unsere Einträge übernehmen: <span className="font-medium">A-Record</span> + <span className="font-medium">CNAME</span>.</li>
                                <li>Speichern (normalerweise nach wenigen Minuten aktiv).</li>
                                <li>HTTPS konfigurieren wir für Sie automatisch.</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-[var(--color-text-muted)] mt-6 pt-5 border-t border-gray-200">
                      Bitte teilen Sie keine Passwörter. Wir arbeiten ausschließlich mit sicheren Manager-Zugängen.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 10: Kick-off buchen ── */}
            {step === 10 && (
              <div className="flex flex-col py-4">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Kick-off Termin buchen</h3>
                  <p className="text-[var(--color-text-muted)]">Wählen Sie jetzt einen passenden Termin.</p>
                </div>

                <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                  <iframe
                    tabIndex={0}
                    data-onboarding-first-focus={true}
                    src="https://links.dasauftragswerk.de/widget/booking/eUDF4XVM1HiX1SG5Jx7y"
                    style={{ width: '100%', height: '85vh', minHeight: '760px', border: 'none' }}
                    scrolling="yes"
                    title="Kick-off Termin buchen"
                  />
                </div>

                <button
                  onClick={() => window.location.href = '/'}
                  className="text-center text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)] transition-colors mt-2"
                >
                  Später buchen
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation (Hidden on Step 9) */}
      {step < 9 && (
        <div className="bg-gray-50 p-6 md:px-12 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              step === 1
                ? 'opacity-0 pointer-events-none'
                : 'text-[var(--color-text-muted)] hover:bg-gray-200 hover:text-[var(--color-text-dark)]'
            }`}
          >
            Zurück
          </button>

          {step < 8 ? (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-[var(--color-primary)] hover:bg-[#082a4d] text-white rounded-lg font-semibold shadow-md transition-all flex items-center gap-2"
            >
              Weiter
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={submitForm}
              disabled={loading}
              className="px-8 py-3 bg-[var(--color-accent)] hover:bg-[#e6752d] text-white rounded-lg font-semibold shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Wird gesendet...' : 'Abschließen'}
              {!loading && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
