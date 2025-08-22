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
import { Character, Abilities, UnseenText, ShintaiText, Weapon, Armor } from './types';
import { getRandomItem, rollDice, getAbilityModifier, determineArmorBasedOnRoll, rollForEquipment } from './utils';

type Translator = (key: string, params?: any) => string;

function rollForStartingWeapon(): Weapon | undefined {
    const startingWeaponsMap = getStartingWeaponsMap();
    const weaponRoll = rollDice(1, startingWeaponsMap.size);
    return startingWeaponsMap.get(weaponRoll);
}

export function generateCharacter(t: Translator): Character {
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
    console.log("Selected class:", selectedClass);
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const nickName = getRandomItem(nickNames);
    nickName.english = t(nickName.english);

    const abilities: Abilities = {
        swiftness: getAbilityModifier(rollDice(3, 6) + classMods.swiftness),
        spirit: getAbilityModifier(rollDice(3, 6) + classMods.spirit),
        vigor: getAbilityModifier(rollDice(3, 6) + classMods.vigor),
        resilience: getAbilityModifier(rollDice(3, 6) + classMods.resilience),
        honour: rollDice(3, 6) + classMods.honour,
    };

    const hitPoints = Math.max(1, classFeatures[selectedClass].calculateHitPoints(abilities));
    const honorStatus = abilities.honour >= 10 ? 'page.honour' : 'page.dishonour';
    const equipment = [...classFeatures[selectedClass].startingEquipment.map(key => t(key))];
    const randomCarry = rollForEquipment(carryMap, selectedClass);
    equipment.push(t(randomCarry));

    const randomEquipment = rollForEquipment(equipmentMap, selectedClass);
    const texts: (UnseenText | ShintaiText)[] = [];
    const food = rollDice(1, 4);
    const water = rollDice(1, 4);
    equipment.push(`${food} ${t('characterGenerator.equipment.food')}`);
    equipment.push(`${water} ${t('characterGenerator.equipment.water')}`);

    const hasSpecialEquipment = equipment.includes('characterGenerator.equipmentMap.unseenText') || equipment.includes('characterGenerator.equipmentMap.shintaiText');
    let armor: Armor;

    if (selectedClass === 'characterGenerator.classes.eruditeSamurai') {
        armor = determineArmorBasedOnRoll(3);
    } else if (selectedClass === 'characterGenerator.classes.swordSaint') {
        armor = determineArmorBasedOnRoll(4);
    } else if (hasSpecialEquipment) {
        armor = determineArmorBasedOnRoll(rollDice(1, 2));
    } else {
        armor = determineArmorBasedOnRoll(rollDice(1, 4));
    }

    const featureRoll = rollDice(1, 6);
    const selectedFeature = classFeatures[selectedClass].features.get(featureRoll);
    const brokenBodies = brokenBodiesMap.get(rollDice(1, 20));
    const grimChronicles = grimChroniclesMap.get(rollDice(1, 20));
    const badHabits = badHabitsMap.get(rollDice(1, 20));
    const awfulAfflictions = awfulAfflictionsMap.get(rollDice(1, 20));

    console.log("Selected class:", selectedClass);
    console.log("Generated character abilities:", abilities);
    console.log("Selected feature:", selectedFeature?.title);

    const classWeapons = [...classFeatures[selectedClass].weapons];
    const otherEquipment = [...classFeatures[selectedClass].startingEquipment];
    const randomStartingWeapon = rollForStartingWeapon();

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
        const unseenTextKey = rollDice(1, unseenTextsMap.size);
        const unseenText = unseenTextsMap.get(unseenTextKey);
        if (unseenText) {
            character.randomUnseenText = unseenText;
        }
    } else {
        equipment.push(t(randomEquipment));
    }

    if (selectedClass === 'characterGenerator.classes.yamabushi') {
        const unseenTextRoll = rollDice(1, unseenTextsMap.size);
        const unseenText = unseenTextsMap.get(unseenTextRoll);
        if (unseenText) {
            character.unseenText = unseenText;
            console.log("Assigned Unseen Text:", character.unseenText);
        }
    }

    if (selectedClass === 'characterGenerator.classes.onmyoji') {
        const unseenTextKey = rollDice(1, unseenTextsMap.size);
        const shintaiTextKey = rollDice(1, shintaiTextsMap.size);
        const unseenText = unseenTextsMap.get(unseenTextKey);
        const shintaiText = shintaiTextsMap.get(shintaiTextKey);
        if (unseenText) {
            character.unseenText = unseenText;
            console.log("Assigned Unseen Text for Onmyoji:", character.unseenText);
        }
        if (shintaiText) {
            character.shintaiText = shintaiText;
            console.log("Assigned Shintai Text for Onmyoji:", character.shintaiText);
        }
    }

    if (selectedClass === 'characterGenerator.classes.recklessSumo') {
        character.classFeatures = { foodConsumption: classFeatures[selectedClass].foodConsumption! };
    }

    console.log("Generated Abilities:", abilities);
    console.log("About to display character", character);

    return character;
}
