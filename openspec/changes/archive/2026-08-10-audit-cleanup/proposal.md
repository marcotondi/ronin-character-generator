## Why

A codebase audit found ~3,100 lines of dead code and ~30 removable dependencies. The biggest single source: one `shadcn` init generated 30 UI components the app never imports — and every Radix/recharts/embla/day-picker/form dependency rides on them. The audit was re-verified against the code before this proposal; the findings hold (with two corrections noted below). This is pure cleanup: behavior is untouched, so the change is safe and mechanical — smaller installs, smaller bundles, less noise for every future change.

## What Changes

- **Delete the shadcn/ui graveyard**: 30 unused components in `src/components/ui/` + `src/hooks/use-toast.ts`. The app imports exactly 3 files from `ui/`: `Button`, `Separator`, `Footer` — all kept.
- **Delete dead dependencies** (verified zero imports in reachable code):
  - 19 `@radix-ui/*` packages (audit said 23; actual count is 21 total, keep `react-slot` + `react-separator` used by Button/Separator)
  - `recharts` (dead `chart.tsx`), `embla-carousel-react` (dead `carousel.tsx`), `react-day-picker` + `date-fns` (dead `calendar.tsx`; `date-fns` has zero imports anywhere), `react-hook-form` + `zod` + `@hookform/resolvers` (dead `form.tsx`), `lucide-react` (only dead components), `react-icons` (one GitHub logo in Footer), `dotenv` (zero references), `patch-package` (no postinstall, no patches dir)
  - `tailwindcss-animate` (added by this re-audit — its only use is the plugin in `tailwind.config.ts`; no `animate-*` classes exist in kept code)
- **Replace `react-icons` `SiGithub`** with a small inline SVG in `Footer.tsx`.
- **Clean `next.config.ts`**: drop dead `remotePatterns: [placehold.co]` (zero `next/image` usage) and the no-op `experimental.typedRoutes: false` (default is off).
- **Remove dead `Character` fields** (verified never rendered — with one correction found during implementation): `texts` (always `[]`, never pushed), `otherEquipment` (set, never rendered), `honor` (exact duplicate of `abilities.honour`; the audit claimed it was never rendered, but `StatsDisplay.tsx` DOES display it — the field is removed and the render site now reads `character.abilities.honour`, same value).
- **Merge `randomUnseenText` + `unseenText`** into one `unseenText` field (both display paths already read `unseenText || randomUnseenText`). Keep `shintaiText`.
- **Flatten the `character-generator/i18n.ts` facade**: the 9 `get*Map` getters are bare `() => constant` re-exports — import the maps directly. Class features data becomes a const in `data/classes.ts`. ⚠️ Correction to the audit: `getNickNames()` clones nicknames, and `index.ts` mutates `nickName.english` — the direct-import refactor MUST preserve that clone or it re-introduces the nickname mutation bug fixed in 1.2.1.
- **Delete committed clutter**: `.modified` (0 bytes), `*.Zone.Identifier` (Windows ADS artifacts, tracked in git).
- **Move `Footer.tsx`** from `ui/` to `src/components/` (it's an app component, not UI); zero code change, one import update in `layout.tsx`.
- **Excluded**: the `loadMessages` switch shrink in `src/i18n.ts` — the audit itself rated it low value; not worth touching locale-loading logic.

## Capabilities

### New Capabilities
None — pure refactor, no behavior change. Declared via `skip_specs: true` in `.openspec.yaml`.

### Modified Capabilities
None.

## Impact

- **Files**: ~30 files deleted in `src/components/ui/`, `src/hooks/use-toast.ts`; `i18n.ts` → `data/classes.ts`; edits to `types.ts`, `index.ts`, `StatsDisplay.tsx`, `TextsDisplay.tsx`, `CharacterGenerator.tsx` (import paths), `layout.tsx`, `page.tsx`, `next.config.ts`, `tailwind.config.ts`, `package.json`, `Footer.tsx` move. (Two pre-existing Next 15 typing errors on async `params` in `layout.tsx`/`page.tsx` were fixed so the typecheck gate could pass — out of the original audit scope.)
- **Dependencies**: −30 (19 radix + recharts, embla-carousel-react, react-day-picker, date-fns, react-hook-form, zod, @hookform/resolvers, lucide-react, react-icons, dotenv, patch-package, tailwindcss-animate). Kept: clsx, tailwind-merge, class-variance-authority, @radix-ui/react-slot, @radix-ui/react-separator.
- **Behavior**: identical character generation. Regression gate: `npm run typecheck`, `npm run build`, and a manual smoke test (honour toggle, RecklessSumo food consumption, Yamabushi/Onmyoji texts, equipment quantity replacement).
