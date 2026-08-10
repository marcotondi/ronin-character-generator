import {
    firstNames,
    lastNames,
} from './constants';
import { CLASSES, classFeatures } from './data/classes';
import { nicknames } from './data/nicknames';
import { carryMap, equipmentMap, startingWeaponsMap } from './data/equipment';
import { unseenTextsMap, shintaiTextsMap } from './data/texts';
import { brokenBodiesMap, grimChroniclesMap, badHabitsMap, awfulAfflictionsMap } from './data/flaws';
import { Character, Abilities, Weapon, Armor, CharacterClass, Modifiers, ClassFeature } from './types';
import { getRandomItem, rollDice, getAbilityModifier, determineArmorBasedOnRoll, rollForEquipment, HonourState } from './utils';

type Translator = (key: string, params?: any) => string;

function rollAbilities(classMods: Modifiers, honourState: HonourState): Abilities {
    return {
        swiftness: getAbilityModifier(rollDice(3, 6, honourState) + classMods.swiftness),
        spirit: getAbilityModifier(rollDice(3, 6, honourState) + classMods.spirit),
        vigor: getAbilityModifier(rollDice(3, 6, honourState) + classMods.vigor),
        resilience: getAbilityModifier(rollDice(3, 6, honourState) + classMods.resilience),
        honour: rollDice(3, 6, honourState) + classMods.honour,
    };
}

function rollArmor(selectedClass: CharacterClass, hasSpecialEquipment: boolean, honourState: HonourState): Armor {
    if (selectedClass === CharacterClass.EruditeSamurai) {
        return determineArmorBasedOnRoll(3);
    } else if (selectedClass === CharacterClass.SwordSaint) {
        return determineArmorBasedOnRoll(4);
    } else if (hasSpecialEquipment) {
        return determineArmorBasedOnRoll(rollDice(1, 2, honourState));
    } else {
        return determineArmorBasedOnRoll(rollDice(1, 4, honourState));
    }
}

function rollFlaws(honourState: HonourState) {
    return {
        brokenBodies: brokenBodiesMap.get(rollDice(1, 20, honourState)),
        grimChronicles: grimChroniclesMap.get(rollDice(1, 20, honourState)),
        badHabits: badHabitsMap.get(rollDice(1, 20, honourState)),
        awfulAfflictions: awfulAfflictionsMap.get(rollDice(1, 20, honourState)),
    };
}

function rollForStartingWeapon(honourState: HonourState): Weapon | undefined {
    const weaponRoll = rollDice(1, startingWeaponsMap.size, honourState);
    return startingWeaponsMap.get(weaponRoll);
}

export function generateCharacter(t: Translator, honourState: HonourState = "none"): Character {
    const selectedClass = getRandomItem(CLASSES);
    const classMods = classFeatures[selectedClass].modifiers;
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const nickName = { ...getRandomItem(nicknames) };
    nickName.english = t(nickName.english);

    const abilities = rollAbilities(classMods, honourState);
    const hitPoints = Math.max(1, classFeatures[selectedClass].calculateHitPoints(abilities));
    const honorStatus = abilities.honour >= 10 ? 'page.honour' : 'page.dishonour';
    const equipment = [...classFeatures[selectedClass].startingEquipment.map(key => t(key))];
    const randomCarry = rollForEquipment(carryMap, selectedClass);
    equipment.push(t(randomCarry));

    const randomEquipment = rollForEquipment(equipmentMap, selectedClass);
    const food = rollDice(1, 4, honourState);
    const water = rollDice(1, 4, honourState);
    equipment.push(`${food} ${t('characterGenerator.equipment.food')}`);
    equipment.push(`${water} ${t('characterGenerator.equipment.water')}`);

    const hasSpecialEquipment = randomEquipment === 'characterGenerator.equipmentMap.unseenText';
    const armor = rollArmor(selectedClass, hasSpecialEquipment, honourState);

    const featureRoll = rollDice(1, 6, honourState);
    const selectedFeature = classFeatures[selectedClass].features.get(featureRoll);
    const flaws = rollFlaws(honourState);

    const classWeapons = [...classFeatures[selectedClass].weapons];
    const randomStartingWeapon = rollForStartingWeapon(honourState);

    const character: Character = {
        class: selectedClass,
        firstName,
        lastName,
        nickName,
        abilities,
        hitPoints,
        honorStatus,
        ryo: classFeatures[selectedClass].rollRyo(),
        virtues: classFeatures[selectedClass].rollVirtues(),
        virtuesDice: classFeatures[selectedClass].virtuesDice,
        feature: selectedFeature!,
        equipment,
        honourTenets: classFeatures[selectedClass].honourTenets,
        armor,
        classWeapons,
        brokenBodies: flaws.brokenBodies,
        grimChronicles: flaws.grimChronicles,
        badHabits: flaws.badHabits,
        awfulAfflictions: flaws.awfulAfflictions,
    };

    if (randomStartingWeapon) {
        character.classWeapons.push(randomStartingWeapon);
    }

    if (randomEquipment === 'characterGenerator.equipmentMap.unseenText') {
        equipment.push(t('characterGenerator.equipmentMap.unseenText'));
        const unseenTextKey = rollDice(1, unseenTextsMap.size, honourState);
        const unseenText = unseenTextsMap.get(unseenTextKey);
        if (unseenText) {
            character.unseenText = unseenText;
        }
    } else {
        const translatedItem = t(randomEquipment);
        if (randomEquipment === 'characterGenerator.equipmentMap.firecrackers' ||
            randomEquipment === 'characterGenerator.equipmentMap.healersKits' ||
            randomEquipment === 'characterGenerator.equipmentMap.snakeVenomShuriken') {
            const quantity = rollDice(1, 4, honourState);
            equipment.push(translatedItem.replace("4", quantity.toString()));
        } else {
            equipment.push(translatedItem);
        }
    }

    if (selectedClass === CharacterClass.Yamabushi) {
        const unseenTextRoll = rollDice(1, unseenTextsMap.size, honourState);
        const unseenText = unseenTextsMap.get(unseenTextRoll);
        if (unseenText) {
            character.unseenText = unseenText;
        }
    }

    if (selectedClass === CharacterClass.Onmyoji) {
        const unseenTextKey = rollDice(1, unseenTextsMap.size, honourState);
        const shintaiTextKey = rollDice(1, shintaiTextsMap.size, honourState);
        const unseenText = unseenTextsMap.get(unseenTextKey);
        const shintaiText = shintaiTextsMap.get(shintaiTextKey);
        if (unseenText) {
            character.unseenText = unseenText;
        }
        if (shintaiText) {
            character.shintaiText = shintaiText;
        }
    }

    if (selectedClass === CharacterClass.RecklessSumo) {
        character.classFeatures = { foodConsumption: classFeatures[selectedClass].foodConsumption! };
    }

    return character;
}
