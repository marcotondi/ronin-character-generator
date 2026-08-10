#!/usr/bin/env node
// Regression smoke test for the character generator.
//
// Why not a plain require: Node's TS support doesn't handle enums or
// extensionless imports, so the generator is compiled with tsc (already a
// devDependency) into a temp dir, then the test runs against the output.
//
// Contracts exercised (3000 random generations):
//  - gen-time translated fields (nickName.english, equipment[]) carry the '!' marker
//  - render-time translated fields (feature, armor, flaws, honourTenets,
//    unseen/shintai text, foodConsumption) stay RAW keys
//  - class invariants: RecklessSumo always has foodConsumption,
//    Yamabushi/Onmyoji always roll unseenText/shintaiText
//  - the nicknames module constant is never mutated (regression for the 1.2.1 bug)
'use strict';

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const genDir = path.join(root, 'src', 'lib', 'character-generator');
const sources = [
  'index.ts', 'utils.ts', 'types.ts', 'constants.ts', 'i18n-armor.ts',
  'data/classes.ts', 'data/nicknames.ts', 'data/equipment.ts', 'data/texts.ts', 'data/flaws.ts',
].map((f) => path.join(genDir, f));

const out = fs.mkdtempSync(path.join(os.tmpdir(), 'rcg-smoke-'));
try {
  execSync(
    `npx tsc ${sources.map((s) => `"${s}"`).join(' ')} --outDir "${out}" --module commonjs --target es2020 --esModuleInterop --skipLibCheck`,
    { cwd: root, stdio: 'inherit' },
  );

  const { generateCharacter } = require(path.join(out, 'index.js'));
  const { nicknames } = require(path.join(out, 'data', 'nicknames.js'));

  const t = (key) => key + '!';
  const states = ['none', 'honourable', 'dishonourable'];
  const seen = { recklessSumo: 0, yamabushi: 0, onmyoji: 0, equipUnseen: 0 };
  const errors = [];
  let nickMutated = false;

  for (let i = 0; i < 3000; i++) {
    const c = generateCharacter(t, states[i % 3]);
    const assert = (cond, msg) => { if (!cond) errors.push(msg); };

    // gen-time translated
    assert(c.nickName.english.endsWith('!'), `nickName not translated: ${c.nickName.english}`);
    assert(c.equipment.length > 0, 'empty equipment');
    const bad = c.equipment.find((e) => !e.endsWith('!'));
    assert(!bad, 'equipment entry not translated: ' + JSON.stringify(bad));

    // render-time translated -> raw key, non-empty
    const raw = (v, name) => { assert(v !== undefined && v !== '', `${name} empty`); if (v !== undefined) assert(!v.endsWith('!'), `${name} should be raw: ${v}`); };
    raw(c.feature.title, 'feature.title'); raw(c.feature.description, 'feature.description');
    raw(c.armor.style, 'armor.style'); raw(c.armor.description, 'armor.description');
    for (const f of ['brokenBodies', 'grimChronicles', 'badHabits', 'awfulAfflictions']) raw(c[f], f);
    raw(c.honourTenets.title, 'honourTenets.title');
    assert(c.honourTenets.tenetsList.length === 6, 'tenets wrong');
    assert(c.hitPoints >= 1, 'hitPoints < 1');
    assert(['page.honour', 'page.dishonour'].includes(c.honorStatus), `bad honorStatus`);
    assert(c.classWeapons.length >= 1, 'no class weapons');

    // class-specific: presence is unconditional, values are raw keys
    if (c.class === 'recklessSumo') { seen.recklessSumo++; raw(c.classFeatures?.foodConsumption, 'foodConsumption'); }
    if (c.class === 'yamabushi') { seen.yamabushi++; raw(c.unseenText?.title, 'yamabushi unseenText'); }
    if (c.class === 'onmyoji') {
      seen.onmyoji++;
      raw(c.unseenText?.title, 'onmyoji unseenText');
      raw(c.shintaiText?.title, 'onmyoji shintaiText');
    }
    if (c.class !== 'yamabushi' && c.class !== 'onmyoji' && c.unseenText) { seen.equipUnseen++; raw(c.unseenText.title, 'equip-roll unseenText'); }
  }

  for (const n of nicknames) if (n.english.endsWith('!')) nickMutated = true;

  console.log('class counters:', JSON.stringify(seen));
  console.log('nickname module mutated:', nickMutated);
  if (errors.length) { console.log('ERRORS:', errors.slice(0, 10), `(${errors.length} total)`); process.exit(1); }
  if (nickMutated) { console.log('ERROR: nickname module constant mutated'); process.exit(1); }
  console.log('SMOKE OK: 3000 generations, all invariants held');
} finally {
  fs.rmSync(out, { recursive: true, force: true });
}
