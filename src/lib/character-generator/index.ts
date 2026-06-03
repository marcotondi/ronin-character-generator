import {
    firstNames,
    lastNames,
} from './constants';
import {
    getClasses,
    getNickNames,
    getCarryMap,
    getEquipmentMap,
    getStartingWeaponsMap,
    getUnseenTextsMap,
    getShintaiTextsMap,
    getBrokenBodiesMap,
    getGrimChroniclesMap,
    getBadHabitsMap,
    getAwfulAfflictionsMap,
    getClassFeatures,
} from './i18n';
import { Character, Abilities, UnseenText, ShintaiText, Weapon, Armor, CharacterClass, CLASS_I18N_KEYS } from './types';
import { getRandomItem, rollDice, getAbilityModifier, determineArmorBasedOnRoll, rollForEquipment, HonourState } from './utils';

type Translator = (key: string, params?: any) => string;

function rollForStartingWeapon(honourState: HonourState): Weapon | undefined {
    const startingWeaponsMap = getStartingWeaponsMap();
    const weaponRoll = rollDice(1, startingWeaponsMap.size, honourState);
    return startingWeaponsMap.get(weaponRoll);
}

export function generateCharacter(t: Translator, honourState: HonourState = "none"): Character {
    const classes = getClasses();
    const nickNames = getNickNames();
    const carryMap = getCarryMap();
    const equipmentMap = getEquipmentMap();
    const unseenTextsMap = getUnseenTextsMap();
    const shintaiTextsMap = getShintaiTextsMap();
    const brokenBodiesMap = getBrokenBodiesMap();
    const grimChroniclesMap = getGrimChroniclesMap();
    const badHabitsMap = getBadHabitsMap();
    const awfulAfflictionsMap = getAwfulAfflictionsMap();
    const classFeatures = getClassFeatures(t);

    const selectedClass = getRandomItem(classes);
    const classMods = classFeatures[selectedClass].modifiers;
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const nickName = getRandomItem(nickNames);
    nickName.english = t(nickName.english);

    const abilities: Abilities = {
        swiftness: getAbilityModifier(rollDice(3, 6, honourState) + classMods.swiftness),
        spirit: getAbilityModifier(rollDice(3, 6, honourState) + classMods.spirit),
        vigor: getAbilityModifier(rollDice(3, 6, honourState) + classMods.vigor),
        resilience: getAbilityModifier(rollDice(3, 6, honourState) + classMods.resilience),
        honour: rollDice(3, 6, honourState) + classMods.honour,
    };

    const hitPoints = Math.max(1, classFeatures[selectedClass].calculateHitPoints(abilities));
    const honorStatus = abilities.honour >= 10 ? 'page.honour' : 'page.dishonour';
    const equipment = [...classFeatures[selectedClass].startingEquipment.map(key => t(key))];
    const randomCarry = rollForEquipment(carryMap, selectedClass);
    equipment.push(t(randomCarry));

    const randomEquipment = rollForEquipment(equipmentMap, selectedClass);
    const texts: (UnseenText | ShintaiText)[] = [];
    const food = rollDice(1, 4, honourState);
    const water = rollDice(1, 4, honourState);
    equipment.push(`${food} ${t('characterGenerator.equipment.food')}`);
    equipment.push(`${water} ${t('characterGenerator.equipment.water')}`);

    const hasSpecialEquipment = equipment.includes('characterGenerator.equipmentMap.unseenText') || equipment.includes('characterGenerator.equipmentMap.shintaiText');
    let armor: Armor;

    if (selectedClass === CharacterClass.EruditeSamurai) {
        armor = determineArmorBasedOnRoll(3);
    } else if (selectedClass === CharacterClass.SwordSaint) {
        armor = determineArmorBasedOnRoll(4);
    } else if (hasSpecialEquipment) {
        armor = determineArmorBasedOnRoll(rollDice(1, 2, honourState));
    } else {
        armor = determineArmorBasedOnRoll(rollDice(1, 4, honourState));
    }

    const featureRoll = rollDice(1, 6, honourState);
    const selectedFeature = classFeatures[selectedClass].features.get(featureRoll);
    const brokenBodies = brokenBodiesMap.get(rollDice(1, 20, honourState));
    const grimChronicles = grimChroniclesMap.get(rollDice(1, 20, honourState));
    const badHabits = badHabitsMap.get(rollDice(1, 20, honourState));
    const awfulAfflictions = awfulAfflictionsMap.get(rollDice(1, 20, honourState));

    const classWeapons = [...classFeatures[selectedClass].weapons];
    const otherEquipment = [...classFeatures[selectedClass].startingEquipment];
    const randomStartingWeapon = rollForStartingWeapon(honourState);

    const character: Character = {
        class: selectedClass,
        firstName,
        lastName,
        nickName,
        abilities,
        hitPoints,
        honor: abilities.honour,
        honorStatus,
        ryo: classFeatures[selectedClass].rollRyo(),
        virtues: classFeatures[selectedClass].rollVirtues(),
        virtuesDice: classFeatures[selectedClass].virtuesDice,
        feature: selectedFeature!,
        equipment,
        texts,
        honourTenets: classFeatures[selectedClass].honourTenets,
        armor,
        classWeapons,
        otherEquipment,
        brokenBodies,
        grimChronicles,
        badHabits,
        awfulAfflictions,
    };

    if (randomStartingWeapon) {
        character.classWeapons.push(randomStartingWeapon);
    }

    if (randomEquipment === 'characterGenerator.equipmentMap.unseenText') {
        equipment.push(t('characterGenerator.equipmentMap.unseenText'));
        const unseenTextKey = rollDice(1, unseenTextsMap.size, honourState);
        const unseenText = unseenTextsMap.get(unseenTextKey);
        if (unseenText) {
            character.randomUnseenText = unseenText;
        }
    } else {
        equipment.push(t(randomEquipment));
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
