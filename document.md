Frontend Documentation

1. Design Language & Palette

Primary: #77B5FE (Desaturated cyan)

Background: #E5F3FF (Light cyan)

Accent: #64B5F6 (Soft interactive blue)

Success: #4CAF50

Warning: #FF9800

Emergency: #F44336

Text: #1A1A1A

Secondary Text: #666666

Font: PT Sans or Noto Sans (for Indic scripts), with system fallback

Style: Card-based UI, large touch targets (≥48dp), generous whitespace

Icons: Lucide
or MaterialCommunityIcons
(health/medical focused)

Animations: Subtle fades, swipe/slide transitions, pulsing for emergency FAB, animated loaders

2. Navigation Structure
   Main Bottom Tabs (6):

Home: Dashboard, quick actions

Consult: Symptom checker, camera diagnosis, AI flows, voice talk AI

My Health: Health records/history

CHW Tools: Patient management, analytics, quick consult (for community workers)

Education: Health tips, multimedia content

Profile: User settings, language, version info

Other Navigation:

FAB: Persistent emergency alert button (visible across app)

Modals: For quick actions (symptom entry, emergency confirm)

Popovers/Cards: Onboarding tips, errors, feedback

3. Screen Specifications
1. Splash

Logo, tagline, progress animation

2. Onboarding

Welcome & language selection (native scripts)

Role selection: Patient / CHW / Specialist

Brief intro slides (skip/continue option)

3. Authentication

Phone/email login with OTP simulation

Loading/error/resend OTP UI

4. Home Dashboard

Greeting + health summary

Quick action cards (Symptom check, Camera diagnosis, Emergency alert)

Health tips carousel

Recent activity/consults

5. Consultation

Symptom Checker

Voice input (microphone button with animation)

Text input

Severity slider, duration picker

AI result cards (diagnosis, risk, recommendations)

Camera Diagnosis

Capture or upload photo

AI suggestions with annotations

Track healing (before/after comparison)

Voice Talk AI (New Feature)

User speaks (microphone button)

AI processes and responds with text + audio playback

Conversation view: alternating user & AI messages

6. My Health Records

Timeline view of consults

Expandable details

Photo history viewer

Export/share PDF summary

7. CHW Tools

Search/add patients

Bulk consult entry

Patient community map (if enabled)

Analytics cards (patients seen, emergencies, unresolved)

8. Education

Health categories: infectious, chronic, maternal, mental health, first aid

Multilingual articles, audio, quizzes

Bookmark & share

9. Profile

Profile info & avatar

Role & contact details

Language toggle (instant)

Emergency contacts

Theme (light/dark), app info, help/support

10. Emergency Modal

Pulsing red FAB button

Confirmation prompt

Location fetch + nearby hospitals/contacts

Send alert simulation

Quick "First Aid" guidance

11. Error/Loading States

Animated loader with context

Network error retry UI

Empty states with illustrations

4. Core Features

AI Symptom Analysis: Voice/text input, severity/duration picker, AI-generated results

Medical Image Analysis: Camera/photo upload, annotations, healing tracking

Emergency Alerts: One-tap alert with location fetch & notifications

Health Records: Encrypted local storage, timeline, export

CHW Workflows: Patient search, bulk entry, analytics

Voice Talk AI (New): Natural conversation with AI (voice in → AI text + audio out)

Education Hub: Articles, audio, quizzes, multilingual

Notifications/Reminders: System push or in-app alerts

5. Accessibility & Responsiveness

WCAG 2.1 compliant contrast ratios

Touchable elements: ≥48x48px

Scalable fonts (user adjustable)

Screen reader labels for all major flows

One-handed navigation

Audio prompts for low-literacy users

6. Integrations & Storage

API Layer: Abstracted with error handling

Local Storage: AsyncStorage/SQLite for health records & education content

Media Uploads: Camera/gallery with compression for low bandwidth

Notifications: Local + push integration

Authentication: JWT with role-based access

7. User Roles & Permissions

Patient: Own data, consultations, education

CHW: Manage assigned patients, bulk consults, analytics

Specialist: Review referred consults, add notes

All Roles: Emergency + education features

8. Testing & Quality

Device tests: Entry-level Android (2GB RAM) to latest iOS

Edge cases: double consult, emergency triggers, quick role switch

Usability testing with low-literacy users

Localization testing (multi-language + Indic scripts)

9. Components Library

Cards: Quick Action, Diagnosis Result, Consult History, Education Article

Buttons: Primary, Secondary, Emergency, Voice Input, Camera Input

Pickers: Language, Time, Severity Slider

Loaders: Branded animated loader with contextual messages

Toasts & Tooltips: Action confirmations (e.g., "Saved", "No connection")

Voice UI Components (New): Microphone button, speech waveform animation, audio player

Notes for Developers

Follow design tokens for spacing, color, icons, typography

Keep components modular & documented

Prepare for backend API integration (AI flows, media, auth)

Version codebase early & maintain changelog

Content (health tips, emergency numbers) should be easy to update
