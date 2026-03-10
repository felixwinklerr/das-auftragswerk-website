# Website Build Brief — Das Auftragswerk

**Domain:** dasauftragswerk.de (primary), dasauftragswerk.com
**Hosting:** Vercel (account: felixwinklerr — already authenticated)
**Stack:** Next.js 15 (App Router), Tailwind CSS, TypeScript
**Language:** 100% German throughout
**Goal:** Credibility-first site (prospect checks after cold call) + secondary inbound conversion
**Deploy target:** Fully production-ready, deploy to Vercel at end

---

## Design Tokens (LOCKED — match one-pager exactly)

```
Primary:   #0B3D6F  (dark navy blue)
Accent:    #FF8C42  (warm orange)
BG White:  #FFFFFF
BG Gray:   #F7F9FC
BG Orange: #FFF8F4
BG Blue:   #EAF3FF
Text Dark: #1c1c2e
Text Mid:  #333333
Text Muted:#555555
Font:      Inter (400, 500, 600, 700, 800) — Google Fonts
```

Logo files in project root: `logo-horizontal.png`, `logo-mark.png`

---

## Site Structure

```
/                   → Main landing page (long scroll)
/impressum          → Legal (required by German law)
/datenschutz        → DSGVO privacy policy
```

---

## Page: / (Homepage — Long Scroll Conversion Page)

### Section 1: Navigation (sticky)
- Logo left (logo-horizontal.png)
- Nav links center: "Das System" | "So funktioniert es" | "Ergebnisse" | "Preis"
- CTA button right: "Kostenloses Erstgespräch" → links to #kontakt section
- Mobile: hamburger menu, full CTA visible

### Section 2: Hero
**Headline (h1, large, bold):**
"Vorhersehbare Anfragen statt Empfehlungs-Zufall."

**Subheadline:**
"Wir installieren Ihr automatisches Anfragen-System in 14 Tagen — fertig übergeben, läuft selbstständig, gehört Ihnen."

**Supporting proof line (smaller, muted):**
"Für Handwerker, Zahnärzte, Coaches und lokale Dienstleister im DACH-Raum."

**Primary CTA:** "Kostenloses Erstgespräch buchen" (orange button, large) → #kontakt
**Secondary:** "Wie es funktioniert ↓" → smooth scroll

**Hero visual:** Clean mockup or abstract visual showing "system running" — if no asset, use a CSS/Tailwind abstract composed graphic with the brand colors. Do NOT use placeholder images.

### Section 3: Problem Strip (id="problem")
**Headline:** "Gute Arbeit allein reicht heute nicht mehr."

**3-column problem cards:**
1. **Unsichtbar bei Google** — "Ihre Kunden googeln. Wer nicht im oberen Bereich auftaucht, existiert nicht."
2. **Zu spät geantwortet** — "Wer nach einer Anfrage 2 Stunden wartet, verliert den Kunden. Kein System = kein Nachfassen."
3. **Kein System, nur Zufall** — "80-90% der Dienstleister laufen auf Empfehlungen. Wenn die ausbleiben, stockt alles."

**Implication row (full width, accent bg):**
"Jeder Monat ohne System kostet Sie Aufträge — konkret, berechenbar."
Calculator preview: 3 verlorene Anfragen × €800 = €2.400/Monat. €28.800/Jahr.

### Section 4: Solution / Mechanism (id="das-system")
**Headline:** "Das Inbound-Sprint-Modell"
**Subheadline:** "5 Schichten. 14 Tage. Dann läuft es."

**5-layer stack visual (vertical timeline or accordion cards):**

1. **Schicht 1: Sichtbarkeit**
   Google Business Profil + Conversion Landing Page + On-Page SEO + Schema Markup + Google Ads Setup
   → "Kunden finden Sie, wenn sie aktiv suchen."

2. **Schicht 2: Lead-Capture**
   Formular + Click-to-Call + WhatsApp Business Link
   → "Wer klickt, wird aufgefangen — auf jedem Gerät."

3. **Schicht 3: Automatisches Follow-up**
   Sofort-Antwort in 60 Sek. + 5-Step Sequenz über 7 Tage
   → "Keine verlorenen Anfragen mehr, auch wenn Sie gerade auf der Baustelle sind."

4. **Schicht 4: Beweis & Vertrauen**
   Automatisierter Google Review Request nach Abschluss
   → "Ihr Rating wächst, Ihre Sichtbarkeit wächst mit."

5. **Schicht 5: Tracking**
   Lead-Dashboard: Quellen, Volumen, Conversion
   → "Sie sehen was funktioniert — und steuern selbst."

### Section 5: Proof / Case Study (id="ergebnisse")
**Headline:** "Was das System in der Praxis bewirkt."

**Case study card — Eden Beauty Lounge:**
> "80-90% weniger manuelle Arbeit. 50% mehr Terminbuchungen. 77% Lead-zu-Termin-Quote.
> Das gleiche Follow-up-System — auf Ihr Business übertragen."

**Secondary proof — Career OS (Coach):**
> "15 Minuten Zeitersparnis pro Session. Automatisiertes Content-System."

**Honest note:** "Testphase läuft seit März 2026. Erste Branchen-Fallstudien folgen. Diese Mechanik ist erprobt — in ähnlichen Setups."

**Proof bar:** "Belegt durch 14-tägige Umsetzung + 60-Tage Erfolgsgarantie"

### Section 6: Deliverables (full stack, table)
**Headline:** "Was Sie in 14 Tagen bekommen."

**Table (2 columns: Deliverable | Stack-Wert):**
| Deliverable | Wert |
|---|---|
| Google Business Profil (Volloptimierung) | €500 |
| Conversion Landing Page (branchenspezifisch) | €1.500 |
| On-page SEO + Schema Markup | €550 |
| Lead-Capture System | €400 |
| GHL CRM + Pipeline | €800 |
| Sofort-Antwort Automatisierung (60 Sek.) | €600 |
| 5-Step Follow-up Sequenz | €800 |
| Bewertungs-Automatisierung | €400 |
| Google Ads Setup | €1.200 |
| Lead-Tracking Dashboard | €600 |
| Video-Einweisung (Loom) | €400 |
| 14 Tage Post-Launch Support | €200 |
| **Gesamtwert** | **€7.950** |

**Highlight row:** Ihr Investment: €3.500 einmalig

### Section 7: Timeline
**Headline:** "14 Tage. Kein Chaos. Nur 2 Stunden Ihrer Zeit."

**Visual timeline (horizontal or vertical steps):**
- Tag 0: Onboarding + 50% Anzahlung
- Tag 1-2: Kick-off Call + Keyword-Recherche
- Tag 3-10: Build-Phase (LP, GBP, CRM, Automationen, Ads)
- Tag 11-12: QA + Abstimmung
- Tag 13: Soft Launch
- Tag 14: Übergabe + Video-Einweisung + 50% Restzahlung

**Client effort note:** "Was Sie beitragen: Onboarding-Fragebogen (30 Min) + Kick-off Call (30 Min) + 1 Feedback-Runde (20 Min) + Übergabe (30 Min). Insgesamt: ca. 2 Stunden."

### Section 8: Pricing + Guarantee
**Headline:** "€3.500. Einmalig. System gehört Ihnen."

**3-column comparison:**
| Agentur | Das Auftragswerk | DIY |
|---|---|---|
| €1.000–1.500/Monat | €3.500 einmalig | 3-6 Monate, halbfertig |
| Kein Eigentum | System gehört Ihnen | Ihre Zeit verloren |
| Black Box | Volles Tracking | Kein Ergebnis garantiert |
| Abhängigkeit | Exit-Garantie 7 Tage | — |

**Pricing card:**
- Price: €3.500 (einmalig, netto)
- Payment: 50% bei Start (€1.750) — 50% bei Übergabe (€1.750)
- Kein Abo. Kein Retainer.

**Guarantee block (highlighted, bordered):**
```
60-Tage Erfolgsgarantie
Das System generiert 3+ qualifizierte Anfragen pro Monat,
oder Sie erhalten €1.000 zurück — das System bleibt
Ihrem Eigentum in jedem Fall.
```

**ROI-Rechner (simple 2-line calc, static):**
"Handwerker-Szenario: 2 neue Aufträge/Monat × €800 = €1.600/Monat. Amortisierung: Monat 3."
"Zahnarzt-Szenario: 1 Privatpatient/Monat × €2.500 LTV. Amortisierung: Woche 1."

### Section 9: FAQ (accordion)
**Headline:** "Häufige Fragen."

Q&A (from offer-final.md objection handling):
1. "Brauche ich selbst technisches Know-how?"
   → Nein. Sie brauchen nur 2 Stunden für Onboarding und Feedback. Wir bauen alles.

2. "Was ist mit den laufenden Google Ads Kosten?"
   → Das Ads-Budget zahlen Sie direkt an Google — keine Aufschläge. Empfohlen: €300-600/Monat. Die Kampagne richten wir einmalig ein.

3. "Ich hatte schlechte Erfahrungen mit Agenturen."
   → Das hören wir oft. Deshalb: 50% erst bei Übergabe, System gehört Ihnen, Exit-Garantie. Und: 60-Tage Erfolgsgarantie mit €1.000 Rückzahlung. Das Risiko liegt bei uns.

4. "Was passiert nach 14 Tagen?"
   → Das System läuft selbstständig. 14 Tage Post-Launch Support inklusive. Danach optional: Support-Paket (€199/Mo, jederzeit kündbar) oder Ads-Management (€500-800/Mo).

5. "Für welche Branchen funktioniert das?"
   → Primär: Handwerk + lokale Services (Elektriker, Maler, Reinigung, Sanitär). Sekundär: Praxen (Zahnärzte, Physio, Therapeuten). Tertiär: Coaches + Berater. Voraussetzung: Ihre Kunden googeln aktiv nach Ihnen.

6. "Gehört mir das System wirklich?"
   → Vollständig. Landing Page unter Ihrer Domain, Google Ads in Ihrem Account, GBP Ihr Account. CRM läuft auf unserem Sub-Account — Exit-Garantie: vollständiger Daten-Export innerhalb 7 Tage auf Anfrage.

### Section 10: CTA / Kontakt (id="kontakt")
**Headline:** "Schauen wir ob es passt."
**Subheadline:** "20 Minuten. Kein Pitch. Nur eine ehrliche Einschätzung ob das System für Ihren Betrieb Sinn macht."

**Contact form (sends to API route):**
- Name (text, required)
- Telefonnummer (tel, required)
- Branche (select: Handwerk/Bau | Praxis/Medizin | Coaching/Beratung | Sonstiges)
- Wo stehen Sie heute? (textarea, optional, placeholder: "z.B. wie kommen aktuell Kunden zu Ihnen?")
- Submit: "Erstgespräch anfragen" (orange, large)

**Below form:** 
"Oder direkt buchen: [Calendly placeholder — link to #]"
"Wir melden uns innerhalb von 24h."

**Trust bar below:** Kein Abo | System gehört Ihnen | 60-Tage Garantie | DACH-Markt

### Section 11: Footer
- Logo
- Short tagline: "Automatische Anfragen-Systeme für deutsche Dienstleister."
- Links: Impressum | Datenschutz
- Contact: kontakt@dasauftragswerk.de (placeholder)
- © 2026 Das Auftragswerk

---

## Page: /impressum

Standard German Impressum. Placeholder content:
```
Angaben gemäß § 5 TMG

Felix Winkler
[Adresse folgt]
[PLZ Ort]
Deutschland

Kontakt: kontakt@dasauftragswerk.de

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
Felix Winkler
[Adresse wie oben]
```

---

## Page: /datenschutz

Standard DSGVO Datenschutzerklärung (German):
- Verantwortlicher
- Datenerhebung über Kontaktformular (Name, Telefon, Branche, Nachricht)
- Zweck: Kontaktaufnahme / Erstgespräch
- Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
- Speicherdauer: bis Anfrage bearbeitet, max. 6 Monate
- Vercel Hosting (US, SCCs)
- Google Fonts (external load) — or self-host to avoid DSGVO issue
- Rechte der betroffenen Person (Auskunft, Löschung etc.)
- Kontakt Datenschutz: kontakt@dasauftragswerk.de

**IMPORTANT: Self-host the Inter font via next/font/google (next/font handles DSGVO compliance automatically — no external Google Fonts request)**

---

## Technical Requirements

### Next.js Setup
- Next.js 15, App Router
- TypeScript
- Tailwind CSS v4
- next/font/google for Inter (self-hosted, DSGVO compliant)
- next/image for logo (optimize PNGs from project root)
- Framer Motion for subtle animations (scroll fade-in, section transitions)

### Contact Form API
- `/app/api/contact/route.ts`
- Receives: name, phone, branche, message
- Sends email via Resend API (use env var `RESEND_API_KEY`, send to `kontakt@dasauftragswerk.de`)
- Fallback: if no RESEND_API_KEY, log to console and return success (so dev works without API key)
- Response: JSON `{ success: true }` or `{ error: "..." }`
- Form state: loading, success, error

### SEO
- Metadata in layout.tsx: title, description, og:image
- Title: "Das Auftragswerk — Automatische Anfragen-Systeme für deutsche Dienstleister"
- Description: "In 14 Tagen ein funktionierendes Anfragen-System: Landing Page, Google Business, Follow-up Automatisierung. €3.500 einmalig. System gehört Ihnen."
- robots.txt: allow all
- sitemap.xml: all 3 pages

### Smooth scroll
- All anchor links (nav, CTAs) use smooth scroll to section IDs
- Offset for sticky nav height

### Mobile
- Mobile-first, all sections fully responsive
- CTA always visible on mobile (sticky bottom bar on mobile with "Jetzt anfragen" button)

### Performance
- No external CSS frameworks (Tailwind only)
- No external JS except Framer Motion
- Self-hosted font (next/font)
- Images via next/image with proper sizes

### Vercel Deploy
- Create `vercel.json` at root
- Ensure build passes: `next build` must succeed
- Environment variables needed: `RESEND_API_KEY` (optional, with fallback)

---

## File Structure

```
das-auftragswerk-website/
├── app/
│   ├── layout.tsx          # Root layout, metadata, font
│   ├── page.tsx            # Homepage (all sections as components)
│   ├── impressum/
│   │   └── page.tsx
│   ├── datenschutz/
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── ProblemStrip.tsx
│   ├── Mechanism.tsx
│   ├── Proof.tsx
│   ├── Deliverables.tsx
│   ├── Timeline.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── public/
│   ├── logo-horizontal.png  (copy from project root)
│   └── logo-mark.png        (copy from project root)
├── tailwind.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── vercel.json
```

---

## Quality Bar

- Zero console errors
- `next build` passes without warnings
- All German copy matches the offer bible exactly (no invented claims)
- Mobile viewport: no horizontal scroll, no clipped text
- Accessible: proper heading hierarchy (h1 > h2 > h3), alt text on images
- Forms: proper labels, error states, success feedback
- No placeholder Lorem Ipsum anywhere — all real German copy

---

## Completion Signal

When fully done and `next build` passes, run:
```
openclaw system event --text "Done: dasauftragswerk.de website built + Vercel deployed. URL: [paste URL]" --mode now
```
