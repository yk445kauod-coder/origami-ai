# Azura Cafe & Restaurant

A modern, mobile-first web app for a café/restaurant with a premium UI, TikTok-style video Reels, a Meta-style recommendation engine, an AI Barista chat, and an enterprise CRM admin dashboard.

## How to run

```bash
cd artifacts/azura
pnpm install
pnpm run dev
```

The workflow `artifacts/azura: web` runs `pnpm --filter @workspace/azura run dev` and serves the app on `0.0.0.0` (Replit-compatible).

## Tech stack

- **Frontend**: React 18 + Vite 7 + Tailwind CSS v4
- **Database**: Firebase Realtime Database (config hardcoded in `artifacts/azura/src/lib/firebase.ts`)
- **AI**: Groq (Llama 3.3 70B) with Pollinations.ai fallback — API key stored in Firebase under `/settings/geminiKey`
- **Routing**: Wouter
- **UI components**: Radix UI + shadcn/ui

## Project structure

- `artifacts/azura/src/` — main app source
- `artifacts/azura/src/lib/firebase.ts` — Firebase initialization
- `artifacts/azura/src/lib/crypto.ts` — AI chat helper (Groq + Pollinations)
- `artifacts/azura/src/hooks/useAIChat.ts` — AI Barista hook
- `FIREBASE_CONFIGS.md` — Firebase RTDB structure and security rules
- `DESIGN.md` — visual design philosophy
- `PROMPT.md` — AI agent instructions

## User preferences
