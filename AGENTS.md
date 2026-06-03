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
  - `index.ts` — `generateCharacter(t, honourState?)` is the single entry point; takes a translator function and optional honour state
  - `types.ts` — defines `CharacterClass` enum for type-safe class handling; `CLASS_I18N_KEYS` maps enum to translation keys
  - `i18n.ts` — facade that imports game data from `data/` subdirectory (nicknames, equipment, texts, flaws)
  - `utils.ts` — pure functions; `rollDice()` accepts `honourState` as explicit parameter (no global state)
- **UI components**: 
  - `src/components/ui/` — **shadcn/ui** components (managed via `components.json`); do not hand-edit unless necessary
  - `src/components/character/` — focused subcomponents: `CharacterHeader`, `StatsDisplay`, `AttributesDisplay`, `HonourTenetsDisplay`, `EquipmentDisplay`, `TextsDisplay`
- **Path alias**: `@/*` → `./src/*`

## Conventions

- Use `CharacterClass` enum for all class comparisons (e.g., `CharacterClass.EruditeSamurai`), not i18n strings
- Translation keys are accessed via `CLASS_I18N_KEYS[characterClass]` for UI display only
- `trailingSlash: true` is required for static export compatibility
- `images.unoptimized: true` is required (Next.js Image optimization unavailable in static export)
- `.editorconfig` specifies **CRLF** line endings
