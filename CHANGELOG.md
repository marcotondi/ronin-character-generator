# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
