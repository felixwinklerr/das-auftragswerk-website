'use client';

import React, { useState } from 'react';
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
  'Zugänge',
  'Budget & Kommunikation',
  'Ziele',
  'Kick-off buchen',
];

/* ─── Reusable field components (defined outside to prevent remount) ─── */

function RequiredDot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block ml-1 mt-0.5 flex-shrink-0" />;
}

function InputField({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <label className="text-[var(--color-text-dark)] font-medium text-sm flex items-center">
        {label}
        {required && <RequiredDot />}
      </label>
      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all"
        {...props}
      />
    </div>
  );
}

function TextAreaField({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <label className="text-[var(--color-text-dark)] font-medium text-sm flex items-center">
        {label}
        {required && <RequiredDot />}
      </label>
      <textarea
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all min-h-[120px] resize-y"
        {...props}
      />
    </div>
  );
}

function SelectField({
  label,
  required,
  options,
  ...props
}: {
  label: string;
  required?: boolean;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-2 w-full mb-6">
      <label className="text-[var(--color-text-dark)] font-medium text-sm flex items-center">
        {label}
        {required && <RequiredDot />}
      </label>
      <select
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all cursor-pointer"
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
  const searchParams = useSearchParams();
  const contactRef = searchParams.get('ref') || '';
  const hasContactRef = Boolean(contactRef);

  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

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
    const errs: string[] = [];
    if (s === 1) {
      if (!hasContactRef && !data.email) errs.push('E-Mail-Adresse ist erforderlich.');
      if (!data.firmenname) errs.push('Firmenname ist erforderlich.');
      if (!data.branche) errs.push('Branche ist erforderlich.');
      if (!data.standort) errs.push('Standort ist erforderlich.');
      if (data.branche !== 'Coach/Berater' && !data.einzugsgebiet) errs.push('Einzugsgebiet ist erforderlich.');
    }
    if (s === 2) {
      if (!data.auftragswert) errs.push('Auftragswert ist erforderlich.');
      if (!data.anfragenProWoche) errs.push('Anzahl Anfragen pro Woche ist erforderlich.');
    }
    if (s === 4) {
      if (!data.anfragenProzess) errs.push('Anfragen-Prozess ist erforderlich.');
      if (!data.antwortGeschwindigkeit) errs.push('Antwortgeschwindigkeit ist erforderlich.');
    }
    if (s === 7) {
      if (!data.budget) errs.push('Werbebudget ist erforderlich.');
      if (!data.kommunikation) errs.push('Kommunikationskanal ist erforderlich.');
    }
    if (s === 8) {
      if (!data.ziel) errs.push('Bitte beschreiben Sie Ihr wichtigstes Ziel.');
      if (!data.neukundenZiel) errs.push('Neukunden-Ziel ist erforderlich.');
      if (!data.dsgvoConsent) errs.push('Bitte stimmen Sie der Datenschutzerklärung zu.');
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, 8));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setErrors([]);
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitForm = async () => {
    if (!validateStep(8)) return;
    setLoading(true);
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
        alert(`Ein Fehler ist aufgetreten: ${errorData.error || 'Bitte versuchen Sie es später erneut.'}`);
      }
    } catch (e) {
      console.error(e);
      alert('Ein Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  /* ─── Render ─── */
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-20">
      {/* Progress Bar */}
      <div className="bg-[var(--color-bg-gray)] p-6 border-b border-gray-100">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
            Schritt {step} von 9
          </span>
          <span className="text-sm font-medium text-[var(--color-text-muted)]">{stepTitles[step - 1]}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-primary)]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 9) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          {errors.map((err) => (
            <p key={err} className="text-sm text-red-600">
              {err}
            </p>
          ))}
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
                      label="E-Mail-Adresse"
                      required
                      type="email"
                      placeholder="ihre@email.de"
                      value={data.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </>
                )}

                <InputField
                  label="Firmenname"
                  required
                  placeholder="Wie auf Google und Ihrer Website"
                  value={data.firmenname}
                  onChange={(e) => updateField('firmenname', e.target.value)}
                />
                <SelectField
                  label="Branche / Hauptleistung"
                  required
                  options={['Maler', 'Gärtner', 'Gebäudereinigung', 'Schreiner', 'Dachdecker', 'Coach/Berater', 'Sonstiges']}
                  value={data.branche}
                  onChange={(e) => updateField('branche', e.target.value)}
                />
                <InputField
                  label="Standort/Stadt"
                  required
                  value={data.standort}
                  onChange={(e) => updateField('standort', e.target.value)}
                />
                {data.branche !== 'Coach/Berater' && (
                  <InputField
                    label="Aktionsradius (km)"
                    required
                    type="number"
                    placeholder="Wie weit fahren Sie zu Kunden?"
                    value={data.einzugsgebiet}
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
                  label={
                    data.branche === 'Coach/Berater'
                      ? 'Was kostet Ihr Hauptangebot / Coaching-Paket? €'
                      : 'Durchschnittlicher Auftragswert €'
                  }
                  type="number"
                  value={data.auftragswert}
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
                  label="Neue Anfragen pro Woche ungefähr"
                  options={['0-2', '3-5', '6-10', '10-20', '20+']}
                  value={data.anfragenProWoche}
                  onChange={(e) => updateField('anfragenProWoche', e.target.value)}
                />
              </div>
            )}

            {/* ── STEP 3: Problem & USP ── */}
            {step === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Problem & USP</h3>
                <TextAreaField
                  label="Häufigstes Problem Ihrer Kunden bevor sie zu Ihnen kommen?"
                  value={data.problem}
                  onChange={(e) => updateField('problem', e.target.value)}
                />
                <TextAreaField
                  label="Was unterscheidet Sie von Wettbewerbern?"
                  placeholder="Warum sollte ein Kunde Sie wählen?"
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
                  label="Wie läuft eine neue Anfrage bei Ihnen ab?"
                  placeholder="z.B. Anruf → Rezeption notiert → Termin vereinbart"
                  value={data.anfragenProzess}
                  onChange={(e) => updateField('anfragenProzess', e.target.value)}
                />
                <SelectField
                  label="Wie schnell antworten Sie auf neue Anfragen?"
                  options={['Sofort/Minuten', 'Innerhalb 1 Stunde', 'Innerhalb 4 Stunden', 'Nächster Werktag', 'Unterschiedlich']}
                  value={data.antwortGeschwindigkeit}
                  onChange={(e) => updateField('antwortGeschwindigkeit', e.target.value)}
                />
                <InputField
                  label="Ansprechperson für neue Anfragen"
                  placeholder="Name und Rolle — damit wir Benachrichtigungen korrekt einrichten"
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
                  label="Erfahrung mit Google Ads / Online-Werbung?"
                  placeholder="Was wurde gemacht, Ergebnis, Zugang zum Konto vorhanden?"
                  value={data.adsErfahrung}
                  onChange={(e) => updateField('adsErfahrung', e.target.value)}
                />
              </div>
            )}

            {/* ── STEP 6: Zugänge ── */}
            {step === 6 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Zugänge vorbereiten</h3>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8">
                  <p className="text-sm text-blue-800 font-medium mb-1">Was passiert als Nächstes?</p>
                  <p className="text-sm text-blue-700">
                    Nach dem Absenden erhalten Sie eine detaillierte Schritt-für-Schritt Anleitung, wie Sie uns als Manager zu Ihren Plattformen hinzufügen. Wir richten das gemeinsam beim Kick-off Call ein.
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full mb-6">
                  <label className="text-[var(--color-text-dark)] font-medium text-sm">
                    Zugänge die wir benötigen
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {['Google Business Profil', 'Google Ads'].map((plat) => (
                      <label
                        key={plat}
                        className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-[var(--color-bg-gray)] transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[var(--color-accent)] rounded focus:ring-[var(--color-accent)]"
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
                    Wir werden immer als Manager eingeladen, nie als Login. Ihr Passwort bleibt bei Ihnen.
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full mb-6">
                  <label className="text-[var(--color-text-dark)] font-medium text-sm">Domain-Anbieter</label>
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">
                    Wir bauen Ihre Landing Page und verbinden sie mit Ihrer Domain. Ihre bestehende Website wird nicht angefasst.
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
                          alert('Die Datei ist zu groß (max. 10MB).');
                          e.target.value = '';
                        } else {
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
                  label="Geplantes monatliches Werbebudget"
                  options={['300-500€', '500-1.000€', '1.000-2.000€', '2.000€+', 'Noch unklar']}
                  value={data.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                />
                <p className="text-sm text-[var(--color-text-muted)] -mt-3 mb-6">
                  Mindestens 300€/Monat empfohlen — Voraussetzung für unsere Ergebnis-Garantie.
                </p>

                <div className="flex flex-col gap-2 w-full mb-6">
                  <label className="text-[var(--color-text-dark)] font-medium text-sm">
                    Bevorzugter Kommunikationskanal
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
                </div>
              </div>
            )}

            {/* ── STEP 8: Ziele ── */}
            {step === 8 && (
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-8">Ziele</h3>
                <TextAreaField
                  label="Wichtigstes Ergebnis das Sie sich erhoffen?"
                  value={data.ziel}
                  onChange={(e) => updateField('ziel', e.target.value)}
                />
                <InputField
                  label="Ideale Neukunden pro Monat?"
                  type="number"
                  value={data.neukundenZiel}
                  onChange={(e) => updateField('neukundenZiel', e.target.value)}
                />
                <TextAreaField
                  label="Frustrationen mit früheren Marketing-Projekten? (optional)"
                  value={data.frustrationen}
                  onChange={(e) => updateField('frustrationen', e.target.value)}
                />
                <TextAreaField
                  label="Sonstiges (optional)"
                  value={data.sonstiges}
                  onChange={(e) => updateField('sonstiges', e.target.value)}
                />

                {/* DSGVO Consent */}
                <div className="mt-4 p-4 bg-[var(--color-bg-gray)] rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-1 text-[var(--color-accent)] rounded focus:ring-[var(--color-accent)]"
                      checked={data.dsgvoConsent}
                      onChange={(e) => updateField('dsgvoConsent', e.target.checked)}
                    />
                    <span className="text-sm text-[var(--color-text-muted)]">
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
                  </label>
                </div>
              </div>
            )}

            {/* ── STEP 9: Kick-off buchen ── */}
            {step === 9 && (
              <div className="flex flex-col py-4">
                {/* Success header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Fragebogen erhalten.</h3>
                  <p className="text-[var(--color-text-muted)]">Buchen Sie jetzt Ihren Kick-off Termin.</p>
                </div>

                {/* Booking */}
                <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                  <iframe src="https://links.dasauftragswerk.de/widget/booking/eUDF4XVM1HiX1SG5Jx7y" style={{ width: '100%', height: '600px', border: 'none', overflow: 'hidden' }} scrolling="no" />
                </div>

                {/* Access guides — only shown if platforms selected */}
                {data.plattformen.length > 0 && (
                  <div className="w-full bg-[var(--color-bg-gray)] rounded-xl p-6 mb-6">
                    <p className="text-sm font-semibold text-[var(--color-text-dark)] mb-4">
                      So bereiten Sie die Zugänge vor (optional, wir machen das auch gemeinsam im Call):
                    </p>
                    <div className="space-y-5">
                      {data.plattformen.includes('Google Business Profil') && (
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text-dark)] mb-1">Google Business Profil</p>
                          <ol className="text-sm text-[var(--color-text-muted)] space-y-1 list-decimal list-inside">
                            <li>Öffnen Sie <span className="font-medium">business.google.com</span> und melden Sie sich an</li>
                            <li>Klicken Sie oben rechts auf das Zahnrad-Symbol (Einstellungen)</li>
                            <li>Wählen Sie <span className="font-medium">"Manager"</span> und dann <span className="font-medium">"Nutzer hinzufügen"</span></li>
                            <li>Tragen Sie ein: <span className="font-medium text-[var(--color-primary)]">zugang@dasauftragswerk.de</span></li>
                            <li>Wählen Sie die Rolle <span className="font-medium">"Manager"</span> und bestätigen</li>
                          </ol>
                        </div>
                      )}
                      {data.plattformen.includes('Google Ads') && (
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text-dark)] mb-1">Google Ads</p>
                          <p className="text-xs text-[var(--color-text-muted)] mb-2">Kein Login nötig — wir verknüpfen Ihr Konto mit unserem Manager-Konto (MCC). Sie behalten volle Kontrolle und Budgethoheit.</p>
                          <ol className="text-sm text-[var(--color-text-muted)] space-y-1 list-decimal list-inside">
                            <li>Öffnen Sie <span className="font-medium">ads.google.com</span> und melden Sie sich an</li>
                            <li>Klicken Sie oben rechts auf das Werkzeug-Symbol</li>
                            <li>Gehen Sie zu <span className="font-medium">"Einrichtung" → "Zugriff und Sicherheit"</span></li>
                            <li>Wählen Sie den Reiter <span className="font-medium">"Manager"</span></li>
                            <li>Klicken Sie auf <span className="font-medium">"Manager-Konto verknüpfen"</span></li>
                            <li>Tragen Sie unsere Manager-ID ein: <span className="font-medium text-[var(--color-primary)]">Diese erhalten Sie per Email nach dem Kick-off</span></li>
                          </ol>
                          <p className="text-xs text-[var(--color-text-muted)] mt-2">Kein Google Ads Konto? Kein Problem — wir erstellen es direkt für Sie beim Kick-off.</p>
                        </div>
                      )}
                      {(data.cms && data.cms !== 'Noch keine Domain') && (
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text-dark)] mb-1">Domain verbinden ({data.cms})</p>
                          <p className="text-xs text-[var(--color-text-muted)] mb-2">Wir bauen Ihre Landing Page und verbinden sie mit einer Subdomain (z.B. anfragen.ihredomain.de). Ihre bestehende Website wird nicht verändert.</p>
                          <ol className="text-sm text-[var(--color-text-muted)] space-y-1 list-decimal list-inside">
                            <li>Melden Sie sich bei <span className="font-medium">{data.cms}</span> an und öffnen Sie die DNS-Einstellungen Ihrer Domain</li>
                            <li>Sie erhalten von uns nach dem Kick-off zwei DNS-Einträge (A-Record + CNAME)</li>
                            <li>Diese Einträge einfach eintragen — dauert ca. 5 Minuten</li>
                            <li>HTTPS wird automatisch eingerichtet</li>
                          </ol>
                          <p className="text-xs text-[var(--color-text-muted)] mt-2">Wir begleiten Sie dabei, falls etwas unklar ist.</p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-4 pt-4 border-t border-gray-200">
                      Kein Passwort teilen. Wir werden immer als Manager eingeladen, nie als Login-Benutzer.
                    </p>
                  </div>
                )}

                <button onClick={() => window.location.href = '/'} className="text-center text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)] transition-colors mt-2">
                  Termin später buchen
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
