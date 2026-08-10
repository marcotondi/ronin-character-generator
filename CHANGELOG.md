# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.2-beta] - 2026-08-10

### Changed
- Removed 30 unused shadcn/ui components and their dependencies (~5.9k lines; production deps 39 → 9)
- Flattened the character-generator i18n facade: data maps imported directly, class data moved to `data/classes.ts`
- Removed dead `Character` fields (`texts`, `otherEquipment`, `honor`) and merged `randomUnseenText` into `unseenText`
- Replaced `react-icons` GitHub icon with inline SVG; cleaned dead `next.config.ts` and `tailwind.config.ts` config
- Fixed pre-existing Next 15 async-`params` typing in layout/page so `npm run typecheck` passes

## [1.2.1-beta] - 2025-06-03

### Fixed
- `hasSpecialEquipment` check comparing translated strings against raw keys (armor logic was always rolling 1-4)
- Quantity replacement for firecrackers/healersKits/snakeVenomShuriken applied on untranslated key (quantity was silently lost)
- Nickname mutation bug causing `MISSING_MESSAGE` error on character re-generation
- Duplicate React keys in equipment list (`Empty-handed` from both starting equipment and carry)
- Dead imports in `constants.ts` and `i18n-armor.ts`
- Unused `Translator` parameter in `getClassFeatures()`

## [1.2.0-beta] - 2025-06-03

### Added
- Render `badHabits` and `awfulAfflictions` in character sheet
- Render `randomUnseenText` when obtained from random equipment roll
- `CharacterClass` enum for type-safe class handling
- `CLASS_I18N_KEYS` mapping for UI translation
- Data files separated from logic: `data/nicknames.ts`, `data/equipment.ts`, `data/texts.ts`, `data/flaws.ts`
- Subcomponents: `CharacterHeader`, `StatsDisplay`, `AttributesDisplay`, `HonourTenetsDisplay`, `EquipmentDisplay`, `TextsDisplay`

### Fixed
- Honour/dishonour state now actually affects character generation (was disconnected)
- Infinite loop guard in `rollForEquipment()` (max 10 attempts)
- Hydration mismatch on `<html>` element (browser extensions)
- Root page now redirects to `/it/` instead of relying on `navigator` in SSR

### Changed
- `generateCharacter()` now accepts optional `honourState` parameter
- `rollDice()` accepts `honourState` as explicit parameter (removed global mutable state)
- Class comparisons use `CharacterClass` enum instead of i18n string literals
- `CharacterGenerator.tsx` split into focused subcomponents
- Removed unused `LanguageSwitcher` component
- Removed debug `console.log` statements
- Replaced hardcoded color with Tailwind `text-primary` class
- Use stable React keys instead of array index
- Removed duplicate `:root` CSS variables (dark-only app)

## [1.0.0-beta] - 2025-01-01

### Added
- Initial release
- 10 character classes with unique modifiers, features, and honour tenets
- Multi-language support (Italian, English) via `next-intl`
- Static export for hosting on any static file server
- Character sheet with stats, attributes, equipment, weapons, armor, and mystic texts
- Random generation of flaws: Broken Bodies, Grim Chronicles, Bad Habits, Awful Afflictions
