import {
  NickName,
  Weapon,
  UnseenText,
  ShintaiText,
  ClassFeature,
  Feature,
  HonourTenet,
  CharacterClass
} from './types';
import { rollDice } from './utils';
import { nicknames } from './data/nicknames';
import { carryMap, equipmentMap, startingWeaponsMap } from './data/equipment';
import { unseenTextsMap, shintaiTextsMap } from './data/texts';
import { brokenBodiesMap, grimChroniclesMap, badHabitsMap, awfulAfflictionsMap } from './data/flaws';

export const getClasses = (): CharacterClass[] => [
  CharacterClass.ForgottenRonin,
  CharacterClass.EruditeSamurai,
  CharacterClass.DrunkenMonk,
  CharacterClass.CorruptedShinobi,
  CharacterClass.Onmyoji,
  CharacterClass.Bakuto,
  CharacterClass.Yamabushi,
  CharacterClass.WildDancer,
  CharacterClass.RecklessSumo,
  CharacterClass.SwordSaint,
];

export const getNickNames = (): NickName[] => nicknames.map(n => ({ ...n }));

export const getCarryMap = (): Map<number, string> => carryMap;

export const getEquipmentMap = (): Map<number, string> => equipmentMap;

export const getStartingWeaponsMap = (): Map<number, Weapon> => startingWeaponsMap;

export const getUnseenTextsMap = (): Map<number, UnseenText> => unseenTextsMap;

export const getShintaiTextsMap = (): Map<number, ShintaiText> => shintaiTextsMap;

export const getBrokenBodiesMap = (): Map<number, string> => brokenBodiesMap;

export const getGrimChroniclesMap = (): Map<number, string> => grimChroniclesMap;

export const getBadHabitsMap = (): Map<number, string> => badHabitsMap;

export const getAwfulAfflictionsMap = (): Map<number, string> => awfulAfflictionsMap;

export const getClassFeatures = (): Record<CharacterClass, ClassFeature> => ({
  [CharacterClass.ForgottenRonin]: {
    modifiers: { swiftness: 2, spirit: -2, vigor: 2, resilience: 2, honour: -1 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 10)),
    rollRyo: () => rollDice(1, 6) * 10,
    rollVirtues: () => rollDice(1, 2),
    virtuesDice: "d2",
    weapons: [{ name: 'characterGenerator.classFeatures.forgottenRonin.weapons.wornKatana.name', damage: "d8" }],
    startingEquipment: ['characterGenerator.classFeatures.forgottenRonin.startingEquipment.travelingClothes', 'characterGenerator.classFeatures.forgottenRonin.startingEquipment.strawHat'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.forgottenRonin.features.roninsResolve.title', description: 'characterGenerator.classFeatures.forgottenRonin.features.roninsResolve.description' }],
      [2, { title: 'characterGenerator.classFeatures.forgottenRonin.features.swordMaster.title', description: 'characterGenerator.classFeatures.forgottenRonin.features.swordMaster.description' }],
      [3, { title: 'characterGenerator.classFeatures.forgottenRonin.features.masterless.title', description: 'characterGenerator.classFeatures.forgottenRonin.features.masterless.description' }],
      [4, { title: 'characterGenerator.classFeatures.forgottenRonin.features.bushisBlade.title', description: 'characterGenerator.classFeatures.forgottenRonin.features.bushisBlade.description' }],
      [5, { title: 'characterGenerator.classFeatures.forgottenRonin.features.protector.title', description: 'characterGenerator.classFeatures.forgottenRonin.features.protector.description' }],
      [6, { title: 'characterGenerator.classFeatures.forgottenRonin.features.hauntedBlade.title', description: 'characterGenerator.classFeatures.forgottenRonin.features.hauntedBlade.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.forgottenRonin.honourTenets.title', tenetsList: [
        'characterGenerator.classFeatures.forgottenRonin.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.forgottenRonin.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.forgottenRonin.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.forgottenRonin.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.forgottenRonin.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.forgottenRonin.honourTenets.tenetsList.5',
      ]
    }
  },
  [CharacterClass.EruditeSamurai]: {
    modifiers: { swiftness: -1, spirit: -1, vigor: 2, resilience: 1, honour: 2 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 8)),
    rollRyo: () => rollDice(3, 6) * 10,
    rollVirtues: () => rollDice(1, 2),
    virtuesDice: "d2",
    weapons: [{ name: 'characterGenerator.classFeatures.eruditeSamurai.weapons.fineKatana.name', damage: "d10" }, { name: 'characterGenerator.classFeatures.eruditeSamurai.weapons.wakizashi.name', damage: "d6" }],
    startingEquipment: ['characterGenerator.classFeatures.eruditeSamurai.startingEquipment.collectionOfBooks'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.eruditeSamurai.features.scholarlyTraining.title', description: 'characterGenerator.classFeatures.eruditeSamurai.features.scholarlyTraining.description' }],
      [2, { title: 'characterGenerator.classFeatures.eruditeSamurai.features.philosophyOfWar.title', description: 'characterGenerator.classFeatures.eruditeSamurai.features.philosophyOfWar.description' }],
      [3, { title: 'characterGenerator.classFeatures.eruditeSamurai.features.tacticalGenius.title', description: 'characterGenerator.classFeatures.eruditeSamurai.features.tacticalGenius.description' }],
      [4, { title: 'characterGenerator.classFeatures.eruditeSamurai.features.preciseStrike.title', description: 'characterGenerator.classFeatures.eruditeSamurai.features.preciseStrike.description' }],
      [5, { title: 'characterGenerator.classFeatures.eruditeSamurai.features.intimidatingPresence.title', description: 'characterGenerator.classFeatures.eruditeSamurai.features.intimidatingPresence.description' }],
      [6, { title: 'characterGenerator.classFeatures.eruditeSamurai.features.zenFocus.title', description: 'characterGenerator.classFeatures.eruditeSamurai.features.zenFocus.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.eruditeSamurai.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.eruditeSamurai.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.eruditeSamurai.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.eruditeSamurai.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.eruditeSamurai.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.eruditeSamurai.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.eruditeSamurai.honourTenets.tenetsList.5',
      ]
    },
  },
  [CharacterClass.DrunkenMonk]: {
    modifiers: { swiftness: 2, spirit: 2, vigor: 1, resilience: -2, honour: -1 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 8)),
    rollRyo: () => rollDice(1, 6) * 10,
    rollVirtues: () => rollDice(1, 4),
    virtuesDice: "d4",
    weapons: [{ name: 'characterGenerator.classFeatures.drunkenMonk.weapons.brassKnuckles.name', damage: "d4" }],
    startingEquipment: ['characterGenerator.classFeatures.drunkenMonk.startingEquipment.monksRobesAndSandals', 'characterGenerator.classFeatures.drunkenMonk.startingEquipment.gourdOfSake'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.drunkenMonk.features.drunkenFist.title', description: 'characterGenerator.classFeatures.drunkenMonk.features.drunkenFist.description' }],
      [2, { title: 'characterGenerator.classFeatures.drunkenMonk.features.fiveFingerDeathPunch.title', description: 'characterGenerator.classFeatures.drunkenMonk.features.fiveFingerDeathPunch.description' }],
      [3, { title: 'characterGenerator.classFeatures.drunkenMonk.features.roadhouse.title', description: 'characterGenerator.classFeatures.drunkenMonk.features.roadhouse.description' }],
      [4, { title: 'characterGenerator.classFeatures.drunkenMonk.features.flameFist.title', description: 'characterGenerator.classFeatures.drunkenMonk.features.flameFist.description' }],
      [5, { title: 'characterGenerator.classFeatures.drunkenMonk.features.sakeStyle.title', description: 'characterGenerator.classFeatures.drunkenMonk.features.sakeStyle.description' }],
      [6, { title: 'characterGenerator.classFeatures.drunkenMonk.features.drunkenMaster.title', description: 'characterGenerator.classFeatures.drunkenMonk.features.drunkenMaster.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.drunkenMonk.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.drunkenMonk.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.drunkenMonk.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.drunkenMonk.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.drunkenMonk.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.drunkenMonk.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.drunkenMonk.honourTenets.tenetsList.5',
      ]
    },
  },
  [CharacterClass.CorruptedShinobi]: {
    modifiers: { swiftness: 2, spirit: 2, vigor: -1, resilience: 1, honour: -2 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 8)),
    rollRyo: () => rollDice(2, 6) * 10,
    rollVirtues: () => rollDice(1, 2),
    virtuesDice: "d2",
    weapons: [{ name: 'characterGenerator.classFeatures.corruptedShinobi.weapons.pairOfKusarigama.name', damage: "d6", amount: 'characterGenerator.classFeatures.corruptedShinobi.weapons.pairOfKusarigama.amount' },
      { name: 'characterGenerator.classFeatures.corruptedShinobi.weapons.shuriken.name', damage: "d4", amount: "characterGenerator.classFeatures.corruptedShinobi.weapons.shuriken.amount" }],
    startingEquipment: ['characterGenerator.classFeatures.corruptedShinobi.startingEquipment.darkClothing', 'characterGenerator.classFeatures.corruptedShinobi.startingEquipment.vialOfPoison'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.corruptedShinobi.features.corruptedTechniques.title', description: 'characterGenerator.classFeatures.corruptedShinobi.features.corruptedTechniques.description' }],
      [2, { title: 'characterGenerator.classFeatures.corruptedShinobi.features.poisonMaster.title', description: 'characterGenerator.classFeatures.corruptedShinobi.features.poisonMaster.description' }],
      [3, { title: 'characterGenerator.classFeatures.corruptedShinobi.features.smokeScreen.title', description: 'characterGenerator.classFeatures.corruptedShinobi.features.smokeScreen.description' }],
      [4, { title: 'characterGenerator.classFeatures.corruptedShinobi.features.betrayersBlade.title', description: 'characterGenerator.classFeatures.corruptedShinobi.features.betrayersBlade.description' }],
      [5, { title: 'characterGenerator.classFeatures.corruptedShinobi.features.shadowStep.title', description: 'characterGenerator.classFeatures.corruptedShinobi.features.shadowStep.description' }],
      [6, { title: 'characterGenerator.classFeatures.corruptedShinobi.features.darkIllusion.title', description: 'characterGenerator.classFeatures.corruptedShinobi.features.darkIllusion.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.corruptedShinobi.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.corruptedShinobi.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.corruptedShinobi.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.corruptedShinobi.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.corruptedShinobi.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.corruptedShinobi.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.corruptedShinobi.honourTenets.tenetsList.5',
      ]
    },
  },
  [CharacterClass.Onmyoji]: {
    modifiers: { swiftness: -1, spirit: 3, vigor: 2, resilience: -1, honour: 0 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 8)),
    rollRyo: () => rollDice(1, 6) * 10,
    rollVirtues: () => rollDice(1, 4),
    virtuesDice: "d4",
    weapons: [{ name: 'characterGenerator.classFeatures.onmyoji.weapons.kiseru.name', damage: "d4" }],
    startingEquipment: ['characterGenerator.classFeatures.onmyoji.startingEquipment.robesAndTalismans'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.onmyoji.features.diviningRod.title', description: 'characterGenerator.classFeatures.onmyoji.features.diviningRod.description' }],
      [2, { title: 'characterGenerator.classFeatures.onmyoji.features.ofudaTalisman.title', description: 'characterGenerator.classFeatures.onmyoji.features.ofudaTalisman.description' }],
      [3, { title: 'characterGenerator.classFeatures.onmyoji.features.spiritBeacon.title', description: 'characterGenerator.classFeatures.onmyoji.features.spiritBeacon.description' }],
      [4, { title: 'characterGenerator.classFeatures.onmyoji.features.shadowBinding.title', description: 'characterGenerator.classFeatures.onmyoji.features.shadowBinding.description' }],
      [5, { title: 'characterGenerator.classFeatures.onmyoji.features.textOfExorcism.title', description: 'characterGenerator.classFeatures.onmyoji.features.textOfExorcism.description' }],
      [6, { title: 'characterGenerator.classFeatures.onmyoji.features.mirrorOfReflection.title', description: 'characterGenerator.classFeatures.onmyoji.features.mirrorOfReflection.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.onmyoji.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.onmyoji.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.onmyoji.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.onmyoji.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.onmyoji.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.onmyoji.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.onmyoji.honourTenets.tenetsList.5',
      ]
    },
  },
  [CharacterClass.Bakuto]: {
    modifiers: { swiftness: -2, spirit: 2, vigor: 2, resilience: -1, honour: 1 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 10)),
    rollRyo: () => rollDice(3, 6) * 10,
    rollVirtues: () => rollDice(1, 4),
    virtuesDice: "d4",
    weapons: [{ name: 'characterGenerator.classFeatures.bakuto.weapons.tanto.name', damage: "d4" }],
    startingEquipment: ['characterGenerator.classFeatures.bakuto.startingEquipment.stylishClothing', 'characterGenerator.classFeatures.bakuto.startingEquipment.loadedDice'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.bakuto.features.gamblingLuck.title', description: 'characterGenerator.classFeatures.bakuto.features.gamblingLuck.description' }],
      [2, { title: 'characterGenerator.classFeatures.bakuto.features.suckerPunch.title', description: 'characterGenerator.classFeatures.bakuto.features.suckerPunch.description' }],
      [3, { title: 'characterGenerator.classFeatures.bakuto.features.dirtyTricks.title', description: 'characterGenerator.classFeatures.bakuto.features.dirtyTricks.description' }],
      [4, { title: 'characterGenerator.classFeatures.bakuto.features.sleightOfHand.title', description: 'characterGenerator.classFeatures.bakuto.features.sleightOfHand.description' }],
      [5, { title: 'characterGenerator.classFeatures.bakuto.features.doubleStrike.title', description: 'characterGenerator.classFeatures.bakuto.features.doubleStrike.description' }],
      [6, { title: 'characterGenerator.classFeatures.bakuto.features.feint.title', description: 'characterGenerator.classFeatures.bakuto.features.feint.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.bakuto.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.bakuto.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.bakuto.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.bakuto.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.bakuto.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.bakuto.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.bakuto.honourTenets.tenetsList.5',
      ]
    },
  },
  [CharacterClass.Yamabushi]: {
    modifiers: { swiftness: 1, spirit: 2, vigor: -1, resilience: 1, honour: 1 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 8)),
    rollRyo: () => rollDice(1, 6) * 10,
    rollVirtues: () => rollDice(1, 4),
    virtuesDice: "d4",
    weapons: [{ name: 'characterGenerator.classFeatures.yamabushi.weapons.boStaff.name', damage: "d6" }],
    startingEquipment: ['characterGenerator.classFeatures.yamabushi.startingEquipment.robesAndSash'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.yamabushi.features.mountainsResolve.title', description: 'characterGenerator.classFeatures.yamabushi.features.mountainsResolve.description' }],
      [2, { title: 'characterGenerator.classFeatures.yamabushi.features.spiritualMartialArts.title', description: 'characterGenerator.classFeatures.yamabushi.features.spiritualMartialArts.description' }],
      [3, { title: 'characterGenerator.classFeatures.yamabushi.features.mountainsFury.title', description: 'characterGenerator.classFeatures.yamabushi.features.mountainsFury.description' }],
      [4, { title: 'characterGenerator.classFeatures.yamabushi.features.asceticsWisdom.title', description: 'characterGenerator.classFeatures.yamabushi.features.asceticsWisdom.description' }],
      [5, { title: 'characterGenerator.classFeatures.yamabushi.features.divineGuidance.title', description: 'characterGenerator.classFeatures.yamabushi.features.divineGuidance.description' }],
      [6, { title: 'characterGenerator.classFeatures.yamabushi.features.mysticsShield.title', description: 'characterGenerator.classFeatures.yamabushi.features.mysticsShield.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.yamabushi.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.yamabushi.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.yamabushi.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.yamabushi.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.yamabushi.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.yamabushi.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.yamabushi.honourTenets.tenetsList.5',
      ]
    },
  },
  [CharacterClass.WildDancer]: {
    modifiers: { swiftness: -1, spirit: 2, vigor: 2, resilience: -2, honour: -1 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 8)),
    rollRyo: () => rollDice(1, 6) * 10,
    rollVirtues: () => rollDice(1, 2),
    virtuesDice: "d2",
    weapons: [{ name: 'characterGenerator.classFeatures.wildDancer.weapons.katana.name', damage: "d8" }, { name: 'characterGenerator.classFeatures.wildDancer.weapons.tanegashima.name', damage: "d8", amount: 'characterGenerator.classFeatures.wildDancer.weapons.tanegashima.amount' }],
    startingEquipment: ['characterGenerator.classFeatures.wildDancer.startingEquipment.flashyKimono'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.wildDancer.features.untamedFerocity.title', description: 'characterGenerator.classFeatures.wildDancer.features.untamedFerocity.description' }],
      [2, { title: 'characterGenerator.classFeatures.wildDancer.features.twoWeaponFighting.title', description: 'characterGenerator.classFeatures.wildDancer.features.twoWeaponFighting.description' }],
      [3, { title: 'characterGenerator.classFeatures.wildDancer.features.dancingDefence.title', description: 'characterGenerator.classFeatures.wildDancer.features.dancingDefence.description' }],
      [4, { title: 'characterGenerator.classFeatures.wildDancer.features.shootingStar.title', description: 'characterGenerator.classFeatures.wildDancer.features.shootingStar.description' }],
      [5, { title: 'characterGenerator.classFeatures.wildDancer.features.swordDance.title', description: 'characterGenerator.classFeatures.wildDancer.features.swordDance.description' }],
      [6, { title: 'characterGenerator.classFeatures.wildDancer.features.wildSpirit.title', description: 'characterGenerator.classFeatures.wildDancer.features.wildSpirit.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.wildDancer.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.wildDancer.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.wildDancer.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.wildDancer.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.wildDancer.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.wildDancer.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.wildDancer.honourTenets.tenetsList.5',
      ]
    },
  },
  [CharacterClass.RecklessSumo]: {
    modifiers: { swiftness: -2, spirit: -1, vigor: 3, resilience: 2, honour: 1 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 12)),
    rollRyo: () => rollDice(1, 6) * 10,
    rollVirtues: () => rollDice(1, 2),
    virtuesDice: "d2",
    weapons: [{ name: 'characterGenerator.classFeatures.recklessSumo.weapons.handChalk.name', damage: "d8" }],
    startingEquipment: ['characterGenerator.classFeatures.recklessSumo.startingEquipment.traditionalSumoClothing'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.recklessSumo.features.ironBody.title', description: 'characterGenerator.classFeatures.recklessSumo.features.ironBody.description' }],
      [2, { title: 'characterGenerator.classFeatures.recklessSumo.features.sumoSlam.title', description: 'characterGenerator.classFeatures.recklessSumo.features.sumoSlam.description' }],
      [3, { title: 'characterGenerator.classFeatures.recklessSumo.features.mountainsGrasp.title', description: 'characterGenerator.classFeatures.recklessSumo.features.mountainsGrasp.description' }],
      [4, { title: 'characterGenerator.classFeatures.recklessSumo.features.ringOut.title', description: 'characterGenerator.classFeatures.recklessSumo.features.ringOut.description' }],
      [5, { title: 'characterGenerator.classFeatures.recklessSumo.features.chankoPower.title', description: 'characterGenerator.classFeatures.recklessSumo.features.chankoPower.description' }],
      [6, { title: 'characterGenerator.classFeatures.recklessSumo.features.bellyBump.title', description: 'characterGenerator.classFeatures.recklessSumo.features.bellyBump.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.recklessSumo.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.recklessSumo.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.recklessSumo.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.recklessSumo.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.recklessSumo.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.recklessSumo.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.recklessSumo.honourTenets.tenetsList.5',
      ]
    },
    foodConsumption: 'characterGenerator.classFeatures.recklessSumo.foodConsumption',
  },
  [CharacterClass.SwordSaint]: {
    modifiers: { swiftness: 2, spirit: -1, vigor: 2, resilience: 1, honour: 1 },
    calculateHitPoints: (abilities) => Math.max(1, abilities.resilience + rollDice(1, 8)),
    rollRyo: () => rollDice(1, 6) * 10,
    rollVirtues: () => rollDice(1, 2),
    virtuesDice: "d2",
    weapons: [{ name: 'characterGenerator.classFeatures.swordSaint.weapons.odachi.name', damage: "d10" }],
    startingEquipment: ['characterGenerator.classFeatures.swordSaint.startingEquipment.emptyHanded'],
    features: new Map<number, Feature>([
      [1, { title: 'characterGenerator.classFeatures.swordSaint.features.artfulExecution.title', description: 'characterGenerator.classFeatures.swordSaint.features.artfulExecution.description' }],
      [2, { title: 'characterGenerator.classFeatures.swordSaint.features.unyieldingFocus.title', description: 'characterGenerator.classFeatures.swordSaint.features.unyieldingFocus.description' }],
      [3, { title: 'characterGenerator.classFeatures.swordSaint.features.bladesSpirit.title', description: 'characterGenerator.classFeatures.swordSaint.features.bladesSpirit.description' }],
      [4, { title: 'characterGenerator.classFeatures.swordSaint.features.ancestralWeapon.title', description: 'characterGenerator.classFeatures.swordSaint.features.ancestralWeapon.description' }],
      [5, { title: 'characterGenerator.classFeatures.swordSaint.features.harmonicDuel.title', description: 'characterGenerator.classFeatures.swordSaint.features.harmonicDuel.description' }],
      [6, { title: 'characterGenerator.classFeatures.swordSaint.features.unyieldingDiscipline.title', description: 'characterGenerator.classFeatures.swordSaint.features.unyieldingDiscipline.description' }],
    ]),
    honourTenets: {
      title: 'characterGenerator.classFeatures.swordSaint.honourTenets.title',
      tenetsList: [
        'characterGenerator.classFeatures.swordSaint.honourTenets.tenetsList.0',
        'characterGenerator.classFeatures.swordSaint.honourTenets.tenetsList.1',
        'characterGenerator.classFeatures.swordSaint.honourTenets.tenetsList.2',
        'characterGenerator.classFeatures.swordSaint.honourTenets.tenetsList.3',
        'characterGenerator.classFeatures.swordSaint.honourTenets.tenetsList.4',
        'characterGenerator.classFeatures.swordSaint.honourTenets.tenetsList.5',
      ]
    },
  },
});
