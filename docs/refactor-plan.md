# Refactor Plan — Ronin Character Generator

## Fase 1 — Fix Funzionali (priorità alta)

### 1.1 Collegare `lastDeath` a `generateCharacter()`
- **Problema:** I bottoni Honour/Dishonour nel UI aggiornano `lastDeath` ma non influenzano la generazione. `honourState` in `utils.ts` è una variabile globale mutabile mai collegata al componente.
- **Fix:** Passare `lastDeath` come parametro a `generateCharacter(t, honourState?)`. Rimuovere `honourState` globale e `toggleHonourState()` da `utils.ts`.
- **File:** `src/components/CharacterGenerator.tsx`, `src/lib/character-generator/index.ts`, `src/lib/character-generator/utils.ts`

### 1.2 Renderizzare `badHabits` e `awfulAfflictions`
- **Problema:** `generateCharacter()` genera `badHabits` e `awfulAfflictions` (linee 89-90 di `index.ts`) ma il componente UI non li mostra mai.
- **Fix:** Aggiungere sezioni UI per entrambi nel `CharacterGenerator.tsx`, oppure rimuoverli dalla generazione se non servono.
- **File:** `src/components/CharacterGenerator.tsx`

## Fase 2 — Pulizia e Robustezza (priorità media)

### 2.1 Rimuovere `console.log` di debug
- ~10 `console.log` in `src/lib/character-generator/index.ts` (linee 45, 92-94, 145, 156, 160, 168-169)
- 1 `console.error` in `utils.ts:49` (valutare se mantenerlo o usare un logger)

### 2.2 Fix loop potenzialmente infinito
- `rollForEquipment()` in `utils.ts:56-63` usa `do...while` senza limite. Aggiungere un max di tentativi (es. 10).

### 2.3 Fix colore hardcoded
- `CharacterGenerator.tsx:194` — `style={{ color: "#ECCF18" }}` → usare `text-primary` o classe Tailwind.

### 2.4 Fix React keys
- `CharacterGenerator.tsx:192,227` — `index` come key → usare identificatori stabili (nome arma, nome item).

### 2.5 CSS `:root` duplicato
- `globals.css:10-44` — `:root` è identico a `.dark` ma `<html>` ha sempre `className="dark"`. Rimuovere `:root` o differenziarlo.

### 2.6 Componente morto `LanguageSwitcher`
- `src/components/LanguageSwitcher.tsx` non è importato da nessuna parte. Decidere: integrarlo nel layout o eliminarlo.

### 2.7 Unificare `randomUnseenText` vs `unseenText`
- `types.ts:91-92` — due campi separati con semantica poco chiara. Valutare se unificarli o documentare la differenza.

## Fase 3 — Refactor Architetturale (priorità bassa)

### 3.1 Introdurre enum `CharacterClass`
- Sostituire il branching su stringhe i18n (`'characterGenerator.classes.eruditeSamurai'`) con un enum TypeScript. Le stringhe i18n restano solo per la traduzione nel UI.

### 3.2 Separare dati da logica
- Estrarre i dati di gioco (classi, armi, equipaggiamento, armature) da `i18n.ts` in file data dedicati (`data/classes.ts`, `data/weapons.ts`, ecc.). `i18n.ts` resta solo per le mappe di traduzione.

### 3.3 Spezzare `generateCharacter()`
- Estrarre funzioni: `rollAbilities()`, `rollEquipment()`, `rollClassSpecifics()`, `rollFlaws()` (brokenBodies, grimChronicles, badHabits, awfulAfflictions).

### 3.4 Spezzare `CharacterGenerator.tsx`
- Creare sottocomponenti: `CharacterHeader`, `StatsDisplay`, `EquipmentDisplay`, `TextsDisplay`, `FlawsDisplay`.

## Ordine di Esecuzione

1. Creare branch `refactor/code-review-fixes`
2. Fase 1.1 → commit → `npm run typecheck`
3. Fase 1.2 → commit → `npm run typecheck`
4. Fase 2.1-2.5 → commit → `npm run typecheck`
5. Fase 2.6-2.7 → commit → `npm run typecheck`
6. Fase 3 (opzionale, da discutere)
