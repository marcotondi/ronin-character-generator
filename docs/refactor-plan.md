# Refactor Plan — Ronin Character Generator

> **Stato:** Completato su branch `refactor/code-review-fixes`

## Fase 1 — Fix Funzionali (priorità alta)

### 1.1 Collegare `lastDeath` a `generateCharacter()` ✅
- **Problema:** I bottoni Honour/Dishonour nel UI aggiornavano `lastDeath` ma non influenzavano la generazione. `honourState` in `utils.ts` era una variabile globale mutabile mai collegata al componente.
- **Fix applicato:** `honourState` passato come parametro esplicito a `generateCharacter(t, honourState?)` e a `rollDice()`. Rimosso stato globale e `toggleHonourState()`.
- **Commit:** `afdb7af`

### 1.2 Renderizzare `badHabits` e `awfulAfflictions` ✅
- **Problema:** `generateCharacter()` generava `badHabits` e `awfulAfflictions` ma il componente UI non li mostrava mai.
- **Fix applicato:** Aggiunte 4 righe di rendering nella sezione attributi del componente (ora `AttributesDisplay`).
- **Commit:** `387f17b`

## Fase 2 — Pulizia e Robustezza (priorità media)

### 2.1 Rimuovere `console.log` di debug ✅
- Rimossi tutti i `console.log` da `index.ts` (~10 occorrenze).
- **Nota:** `console.error` in `utils.ts` mantenuto come fallback per armor roll invalidi.
- **Commit:** `afdb7af`

### 2.2 Fix loop potenzialmente infinito ✅
- Aggiunto `maxAttempts = 10` al `do...while` in `rollForEquipment()`.
- **Commit:** `310163e`

### 2.3 Fix colore hardcoded ✅
- `style={{ color: "#ECCF18" }}` sostituito con `className="text-primary"`.
- **Commit:** `310163e`

### 2.4 Fix React keys ✅
- `index` come key sostituito con `weapon.name` per le armi e `item` per l'equipaggiamento.
- **Commit:** `310163e`

### 2.5 CSS `:root` duplicato ✅
- Blocco `:root` rimosso da `globals.css` (l'app è sempre in dark mode).
- **Commit:** `310163e`

### 2.6 Componente morto `LanguageSwitcher` ✅
- Eliminato `src/components/LanguageSwitcher.tsx` (non importato da nessuna parte).
- **Commit:** `d91f710`

### 2.7 Unificare `randomUnseenText` vs `unseenText` ✅
- Non unificati i campi (hanno semantica diversa: `unseenText` è assegnato per classe, `randomUnseenText` da roll equipaggiamento). Reso `randomUnseenText` visibile nel UI con fallback `unseenText ?? randomUnseenText`.
- **Commit:** `d91f710`

## Fase 3 — Refactor Architetturale (priorità bassa)

### 3.1 Introdurre enum `CharacterClass` ✅
- Creato `CharacterClass` enum in `types.ts` con mapping `CLASS_I18N_KEYS` per la traduzione UI.
- Tutti i confronti su stringhe i18n sostituiti con enum (`CharacterClass.EruditeSamurai` invece di `'characterGenerator.classes.eruditeSamurai'`).
- `getClassFeatures()` ora usa `Record<CharacterClass, ClassFeature>` invece di `{ [key: string]: ClassFeature }`.
- **Commit:** `3780750`

### 3.2 Separare dati da logica ✅
- Creati 4 file data in `src/lib/character-generator/data/`:
  - `nicknames.ts` — 20 soprannomi
  - `equipment.ts` — carry map, equipment map, starting weapons map
  - `texts.ts` — unseen texts map, shintai texts map
  - `flaws.ts` — broken bodies, grim chronicles, bad habits, awful afflictions
- `i18n.ts` ora agisce come facade, importando dai file data.
- **Commit:** `f42b284`

### 3.3 Spezzare `generateCharacter()` ✅
- Estratte 3 funzioni focalizzate:
  - `rollAbilities(classMods, honourState)` — generazione attributi
  - `rollArmor(selectedClass, hasSpecialEquipment, honourState)` — determinazione armatura
  - `rollFlaws(honourState)` — broken bodies, grim chronicles, bad habits, awful afflictions
- `generateCharacter()` ridotto da ~170 a ~130 righe, più leggibile.
- **Commit:** `8742fc5`

### 3.4 Spezzare `CharacterGenerator.tsx` ✅
- Creati 6 sottocomponenti in `src/components/character/`:
  - `CharacterHeader` — nome, soprannome, classe
  - `StatsDisplay` — PF, virtù, onore, ryo
  - `AttributesDisplay` — attributi, abilità, difetti
  - `HonourTenetsDisplay` — precetti d'onore
  - `EquipmentDisplay` — armi, armatura, equipaggiamento, caratteristica
  - `TextsDisplay` — testi dell'invisibile e shintai
- `CharacterGenerator.tsx` ora è una composizione pulita di componenti focalizzati.
- **Commit:** `4f32789`

## Riepilogo Commit

| Commit | Tipo | Descrizione |
|--------|------|-------------|
| `fcb0df2` | chore | AGENTS.md, refactor plan, sync modifiche preesistenti |
| `afdb7af` | fix | Honour/dishonour state collegato alla generazione |
| `387f17b` | feat | badHabits e awfulAfflictions renderizzati |
| `310163e` | refactor | Loop guard, colori, keys, CSS cleanup |
| `d91f710` | refactor | Rimosso LanguageSwitcher, renderizzato randomUnseenText |
| `3780750` | refactor | Enum `CharacterClass` per type-safety |
| `f42b284` | refactor | Dati estratti in file dedicati |
| `8742fc5` | refactor | `generateCharacter()` spezzato in funzioni |
| `4f32789` | refactor | `CharacterGenerator.tsx` spezzato in sottocomponenti |

## Note Aperte

- **Logging:** i `console.log` sono stati rimossi. Da valutare un logger condizionale (solo in dev) o un debug toggle UI se serve tracciare le scelte di generazione.
- **Download scheda:** il pulsante resta commentato con TODO (feature non implementata).
- **`i18n.ts` class features:** `getClassFeatures()` contiene ancora ~490 righe di dati per-classe inline. Candidato per futura estrazione in `data/classes.ts`.
