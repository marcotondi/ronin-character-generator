# AGENTS.md

## Commands

- `npm run dev` — starts on **port 9002** (not 3000)
- `npm run typecheck` — `tsc --noEmit`; run this to verify types
- `npm run build` — static export to `out/`; TS and ESLint errors are **ignored** during build (`ignoreBuildErrors`, `ignoreDuringBuilds`)
- `npm run lint` — ESLint is **not yet configured** (prompts interactively on first run)
- No test framework is set up

## Architecture

- **Next.js 15** App Router with `output: 'export'` (fully static, no server-side runtime)
- **i18n**: `next-intl` with two locales: `it` (default), `en`
  - Locale JSON files: `src/lib/locales/{it,en}.json`
  - Adding a locale requires updating **both** `src/app/[locale]/layout.tsx` (`generateStaticParams`) and `src/i18n.ts` (`loadMessages`)
- **Character generator** core logic: `src/lib/character-generator/`
  - `index.ts` — `generateCharacter(t)` is the single entry point; takes a translator function
  - `i18n.ts` — all game data (classes, weapons, features, etc.) stored as **i18n translation keys used as identifiers** for logic branching, not just display strings
  - `utils.ts` — contains **module-level mutable state** (`honourState`) that affects `rollDice()` results for 3d6 rolls
- **UI components**: `src/components/ui/` are **shadcn/ui** components (managed via `components.json`); do not hand-edit them unless necessary
- **Path alias**: `@/*` → `./src/*`

## Conventions

- Translation keys double as enum-like identifiers throughout the generator logic (e.g., `'characterGenerator.classes.forgottenRonin'`). Changing a key string breaks game logic, not just display.
- `trailingSlash: true` is required for static export compatibility
- `images.unoptimized: true` is required (Next.js Image optimization unavailable in static export)
- `.editorconfig` specifies **CRLF** line endings
