# Azura Cafe & Restaurant

A mobile-first React + Vite + Firebase web app for Azura Cafe in Alexandria, Egypt. Features a full digital menu, AI barista (Groq/Llama 3.3 70B), TikTok-style video reels, Meta-style recommendation engine, and an enterprise CRM admin dashboard.

## How to run

```bash
# Dev server (port auto-assigned by Replit)
cd artifacts/azura
pnpm install
pnpm run dev
```

The active workflow is **artifacts/azura: web** — it runs `pnpm run dev` automatically.

## Tech stack

- **Frontend**: React 18 + Vite 7 + Tailwind CSS v4
- **Database**: Firebase Realtime Database (config hardcoded in `src/lib/firebase.ts`)
- **Auth**: Firebase Auth (anonymous + Google + email/password)
- **AI**: Groq (Llama 3.3 70B) — API key stored in Firebase under `/settings/geminiKey`, not a local env var
- **Routing**: Wouter
- **Deployment target**: Cloudflare Pages (root: `artifacts/azura`, build output: `dist`)

## Project structure

```
artifacts/azura/
  src/
    pages/          # MenuLightweight.tsx (user menu), Admin.tsx (CRM dashboard)
    components/     # Shared UI components
    contexts/       # Auth, Language
    lib/            # firebase.ts, activityTracker.ts, crypto.ts, dbWrapper.ts
  tests/e2e/        # Playwright E2E tests (require system libs to run)
```

## Notes

- Firebase config is public/hardcoded — no `.env` needed for the DB/auth
- Groq AI key is managed inside Firebase (`/settings/geminiKey`), not as a Replit secret
- E2E tests need `libglib-2.0.so.0` system lib to run Chromium — works on Cloudflare/CI but not this NixOS environment without extra setup
- Admin PIN: `azura2026`

## User preferences

- Keep existing project structure and stack — do not restructure or migrate
