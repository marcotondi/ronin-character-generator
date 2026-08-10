## Context

Pure refactor — see proposal.md for the full scope. Current state: the app imports exactly 3 files from `src/components/ui/` (`Button`, `Separator`, `Footer`), the character generator logic lives in `src/lib/character-generator/` (logic in `index.ts`/`utils.ts`, data in `data/`, a facade in `i18n.ts`), and `next.config.ts` carries dead image/route config. The build ignores TS errors (`ignoreBuildErrors`), so `npm run typecheck` is the real gate. Line endings are CRLF per `.editorconfig`.

## Goals / Non-Goals

**Goals:**
- Remove every verified-dead file, field, dependency, and config entry with zero behavior change.
- Keep the character generator's module boundaries intact: logic in `index.ts`/`utils.ts`, data in `data/`.

**Non-Goals:**
- No behavior changes, no new features (the dead "Download" button stays disabled).
- No rearchitecting of `utils.ts`, `rollDice`, or the honour flow.
- No re-adding shadcn components "just in case" — `npx shadcn add` can regenerate any of them later.
- The `loadMessages` switch shrink in `src/i18n.ts` is excluded (low value).

## Decisions

1. **Delete, don't archive, the shadcn graveyard.** The 30 unused components + `use-toast.ts` go. `components.json` stays (harmless; the CLI regenerates any component on demand). Rationale: git history is the archive. Alternative considered: moving to a `ui/unused/` folder — rejected, that's just a slower delete.
2. **Class data lands in `data/classes.ts`; `i18n.ts` disappears.** The 9 `get*Map` getters were bare re-exports of `data/*` maps — `index.ts` imports `carryMap`, `equipmentMap`, `startingWeaponsMap`, `unseenTextsMap`, `shintaiTextsMap`, `brokenBodiesMap`, `grimChroniclesMap`, `badHabitsMap`, `awfulAfflictionsMap`, `nicknames` directly. `getClassFeatures()` becomes the const `classFeatures`, `getClasses()` becomes the const `CLASSES` — both move with the file rename `i18n.ts` → `data/classes.ts` (`git mv` keeps history). The class data is game data, not i18n; the `i18n.ts` name is the same attractor that produced the translation-string bugs in the changelog.
3. **Preserve the nickname clone.** `index.ts` mutates the selected nickname (`nickName.english = t(...)`); `getNickNames()` returned a defensive copy. Direct import must keep that: `const nickName = { ...getRandomItem(nicknames) }`. Skipping this re-introduces the 1.2.1 mutation bug (`MISSING_MESSAGE` on regenerate). This was the one place the audit's "just import directly" advice needed a caveat.
4. **Merge `randomUnseenText`/`unseenText` → one `unseenText` field.** Both assignment sites (random-equipment roll; Yamabushi/Onmyoji class rolls) write to `unseenText`. In the rare case a Yamabushi rolls both, last-write-wins instead of class-wins — same visible output (a random unseen text renders). `shintaiText` is untouched.
5. **Dead fields removed with their assignment sites:** `texts` (init `[]`, never pushed), `otherEquipment` (clone of `startingEquipment`, never rendered), `honor` — **correction: the audit was wrong that `honor` is never rendered**; `StatsDisplay.tsx` displays it. Since `honor` was an exact copy of `abilities.honour`, the field is deleted and the display reads `character.abilities.honour` (identical value, redundancy gone). `honorStatus`, `classFeatures.foodConsumption`, `shintaiText` stay — they're rendered.
6. **`tailwindcss-animate` goes with the components.** Its only hook is `plugins: [require('tailwindcss-animate')]` in `tailwind.config.ts`; no `animate-*` classes survive in kept code and `globals.css` defines no keyframes. Remove both plugin line and dependency.
7. **`react-icons` replaced by an inline GitHub SVG in `Footer.tsx`** (the `SiGithub` path, ~20 lines). One dependency dropped for one logo.
8. **`next.config.ts`**: remove `remotePatterns` block (zero `next/image` imports) and `experimental.typedRoutes: false` (default off). Keep `output: 'export'`, `trailingSlash`, `unoptimized`, and the `ignoreBuildErrors`/`ignoreDuringBuilds` flags as-is.
9. **Clutter deletion**: `.modified`, `src/app/favicon.ico:Zone.Identifier`, `public/img/compwith_ronin.png:Zone.Identifier` (all git-tracked). `out/` Zone.Identifier files are untracked build output — remove opportunistically, not required.

## Risks / Trade-offs

- [Accidentally deleting a component something imports] → the reference sweep was run: only `Button`, `Separator`, `Footer` are imported outside `ui/`; `use-toast` only by dead `toaster.tsx`. Re-run `grep -rn "components/ui/" src | grep -v "components/ui/"` after the delete as a sanity check.
- [Nickname mutation regression from direct imports] → clone at the call site (Decision 3); smoke-test regenerate 3+ times.
- [`unseenText` merge changes display order in the double-roll corner] → accepted, same visible outcome (Decision 4).
- [Typecheck gate was red before the change on pre-existing Next 15 async-`params` typing in `layout.tsx`/`page.tsx`] → fixed the two `params` types to `Promise<{locale: string}>` (matches Next 15 contract and the existing `await params`); flagged as an out-of-scope addition in proposal.md.
- [Re-adding a shadcn component later re-pulls some deps] → expected; `npx shadcn add` restores exactly what it needs.

## Migration Plan

No migration — static export, no data, no runtime config. Rollback = `git revert` of the change commit (all deletions are additive-reversible; nothing is renamed destructively since `git mv` preserves history).

## Open Questions

None — every decision here was resolved against the code before writing the proposal.
