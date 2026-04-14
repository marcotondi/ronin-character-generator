<p align="center">
  <img src="public/img/compwith_ronin.png" alt="Ronin Character Generator Logo" width="200" />
</p>

# Ronin Character Generator

> Un generatore di personaggi tematico e multilingue per l'ambientazione GDR Ronin.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Ronin Character Generator** è uno strumento rapido e immersivo progettato per dare vita al tuo prossimo guerriero. Ispirato al mondo brutale e poetico del folklore giapponese e del cinema samurai, genera in un solo clic personaggi completi di background unici, equipaggiamento e abilità mistiche.

## ✨ Features

- **10 Classi Uniche**: Dal disciplinato *Samurai Erudito* e l'imprevedibile *Monaco Ubriaco*, fino al misterioso *Onmyoji* e al massiccio *Sumo Temerario*.
- **Caratterizzazione Profonda**: Genera molto più di semplici statistiche. Include **Corpi Infranti** (difetti fisici), **Cronache Oscure** (passati tormentati) e **Cattive Abitudini**.
- **Testi Mistici**: Integrazione per **Testi dell'Invisibile** (tecniche marziali) e **Testi Shintai** (pergamene divine) a seconda della classe.
- **Statistiche Dinamiche**: Calcola automaticamente PF, Virtù, Onore e Ryo iniziali basandosi sui modificatori di classe e i tiri di dado.
- **Supporto Multilingue**: Completamente localizzato in inglese e italiano tramite `next-intl`.
- **UI Tematica**: Un'interfaccia elegante ad alto contrasto che segue l'estetica tradizionale giapponese con un tocco moderno "Dark Mode".
- **Pronto per l'Esportazione**: Scarica la scheda del personaggio generata direttamente per la tua sessione di gioco.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Static Export)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) con componenti [Radix UI](https://www.radix-ui.com/)
- **Internazionalizzazione**: [next-intl](https://next-intl-docs.vercel.app/)
- **Icone**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Form & Validazione**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 o superiore)
- npm o yarn

### Installation

1. Clona il repository:
   ```bash
   git clone https://github.com/vostro-username/ronin-character-generator.git
   cd ronin-character-generator
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

### Development

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri [http://localhost:9002](http://localhost:9002) nel tuo browser per vedere il risultato.

### Build and Export

Per creare una build di produzione statica:

```bash
npm run build
```

Il sito statico sarà generato nella cartella `out/`, pronto per essere ospitato su GitHub Pages, Vercel o qualsiasi servizio di hosting statico.

> [!NOTE]
> Questo progetto è configurato per l'esportazione statica (`output: 'export'`). Assicurati che il tuo provider di hosting sia configurato per servire la cartella `out/`.

## 🎨 UI Style Guide

- **Primario**: `#FFC857` (Giallo Saturo) — Rappresenta l'onore e il sole nascente.
- **Sfondo**: `#2B2B2B` (Grigio Scuro) — Forte contrasto per la leggibilità.
- **Accento**: `#E07A5F` (Arancione) — Usato per gli elementi interattivi.
- **Tipografia**: 'Literata' (Serif) — Per una sensazione tradizionale e letteraria.

## 📖 Usage

1. Seleziona la tua lingua preferita (inglese o italiano).
2. Clicca su **"CLICK PER NUOVO GUERRIERO"**.
3. Controlla le statistiche, le caratteristiche di classe e l'equipaggiamento del tuo guerriero.
4. Clicca su **"Download Character Sheet"** per salvare il tuo PG.

> [!TIP]
> Ogni classe ha dei "Precetti d'Onore" unici che dovresti seguire per mantenere la tua reputazione nel mondo!

---

<p align="center">Creato con 🏮 e ⚔️ per la comunità TTRPG.</p>
