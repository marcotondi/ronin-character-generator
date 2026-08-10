## 1. UI cleanup

- [x] 1.1 Move `src/components/ui/Footer.tsx` → `src/components/Footer.tsx` (`git mv`, no code change) and update the import in `src/app/[locale]/layout.tsx`
- [x] 1.2 Delete the 29 remaining unused shadcn components in `src/components/ui/` (keep `button.tsx`, `separator.tsx`): accordion, alert, alert-dialog, avatar, badge, calendar, card, carousel, chart, checkbox, collapsible, dialog, dropdown-menu, form, input, label, menubar, popover, progress, radio-group, scroll-area, select, sheet, skeleton, slider, switch, table, tabs, textarea, toast, toaster, tooltip
- [x] 1.3 Delete `src/hooks/use-toast.ts`
- [x] 1.4 Sanity check: `grep -rn "components/ui/" src | grep -v "src/components/ui/"` returns only `button`, `separator`, `Footer` references

## 2. Character model cleanup

- [x] 2.1 Remove dead fields from `Character` in `types.ts`: `texts`, `otherEquipment`, `honor` (keep `honorStatus`)
- [x] 2.2 Remove `randomUnseenText` from `Character`; keep a single optional `unseenText` field
- [x] 2.3 In `index.ts`: remove the `texts` init, the `otherEquipment` clone, the `honor:` assignment, and the `character.randomUnseenText =` assignment site (equipment-roll path now writes `character.unseenText`)
- [x] 2.4 In `TextsDisplay.tsx` (and the guard in `CharacterGenerator.tsx` line ~119): drop `randomUnseenText` from the `unseenText || randomUnseenText` expressions, keep `shintaiText`

## 3. Flatten the character-generator facade

- [x] 3.1 `git mv src/lib/character-generator/i18n.ts src/lib/character-generator/data/classes.ts`; rename `getClassFeatures()` → exported const `classFeatures`, `getClasses()` → exported const `CLASSES`; delete the 9 `get*Map` getters and `getNickNames`
- [x] 3.2 In `index.ts`: import `carryMap`, `equipmentMap`, `startingWeaponsMap`, `unseenTextsMap`, `shintaiTextsMap`, `brokenBodiesMap`, `grimChroniclesMap`, `badHabitsMap`, `awfulAfflictionsMap`, `nicknames` directly from `./data/*` and `classFeatures`/`CLASSES` from `./data/classes`
- [x] 3.3 Preserve the nickname clone at the selection site: `const nickName = { ...getRandomItem(nicknames) }` (mutation of `nickName.english` must not reach the shared module constant)
- [x] 3.4 Update the `./i18n` import in `index.ts` (only consumer of the facade)

## 4. Dependency cleanup

- [x] 4.1 Remove from `package.json`: the 19 `@radix-ui/*` packages (keep `react-slot`, `react-separator`), `recharts`, `embla-carousel-react`, `react-day-picker`, `date-fns`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`, `react-icons`, `dotenv`, `patch-package`, `tailwindcss-animate`
- [x] 4.2 Remove `plugins: [require('tailwindcss-animate')]` from `tailwind.config.ts` (also removed the dead accordion keyframes/animation that only fed the deleted accordion component)
- [x] 4.3 Replace `SiGithub` from `react-icons/si` in `Footer.tsx` with an inline GitHub SVG; drop the import
- [x] 4.4 Run `npm install` and confirm `package-lock.json` reflects the removals

## 5. Config and clutter

- [x] 5.1 In `next.config.ts`: remove the `remotePatterns: [placehold.co]` block and `experimental: { typedRoutes: false }` (keep `output: 'export'`, `trailingSlash`, `unoptimized`, build-ignore flags)
- [x] 5.2 Delete tracked clutter: `.modified`, `src/app/favicon.ico:Zone.Identifier`, `public/img/compwith_ronin.png:Zone.Identifier` (and untracked `out/`/`public/img` ADS copies if present)

## 6. Verification

- [x] 6.1 `npm run typecheck` passes (the real gate — build ignores TS errors)
- [x] 6.2 `npm run build` succeeds
- [x] 6.3 Smoke test in `npm run dev`: generate characters repeatedly; toggle honour/dishonour; verify RecklessSumo food consumption, Yamabushi/Onmyoji unseen/shintai texts, equipment quantity replacement, and that regenerating never shows `MISSING_MESSAGE` (executed as a direct 3000-generation run of the compiled generator + dev-server HTTP checks: /it, /en, root → /it)
- [x] 6.4 Final sweep: `grep -rn "lucide-react\|react-icons\|randomUnseenText\|otherEquipment\|\.honor\b" src` returns nothing relevant
