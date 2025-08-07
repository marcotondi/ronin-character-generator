import {
    classes,
    firstNames,
    lastNames,
    nickNames,
    carryMap,
    equipmentMap,
    startingWeaponsMap,
    unseenTextsMap,
    shintaiTextsMap,
    brokenBodiesMap,
    grimChroniclesMap,
    badHabitsMap,
    awfulAfflictionsMap,
    classFeatures,
} from './constants';
import { Character, Abilities, UnseenText, ShintaiText, Weapon, Armor } from './types';
import { getRandomItem, rollDice, getAbilityModifier, determineArmorBasedOnRoll, rollForEquipment } from './utils';

function rollForStartingWeapon(): Weapon | undefined {
    const weaponRoll = rollDice(1, startingWeaponsMap.size);
    return startingWeaponsMap.get(weaponRoll);
}

export function generateCharacter(): Character {
    const selectedClass = getRandomItem(classes);
    const classMods = classFeatures[selectedClass].modifiers;
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const nickName = getRandomItem(nickNames);

    const abilities: Abilities = {
        swiftness: getAbilityModifier(rollDice(3, 6) + classMods.swiftness),
        spirit: getAbilityModifier(rollDice(3, 6) + classMods.spirit),
        vigor: getAbilityModifier(rollDice(3, 6) + classMods.vigor),
        resilience: getAbilityModifier(rollDice(3, 6) + classMods.resilience),
        honour: rollDice(3, 6) + classMods.honour,
    };

    const hitPoints = Math.max(1, classFeatures[selectedClass].calculateHitPoints(abilities));
    const honorStatus = abilities.honour >= 10 ? "Honourable" : "Dishonourable";
    const equipment = [...classFeatures[selectedClass].startingEquipment];
    const randomCarry = rollForEquipment(carryMap, selectedClass);
    equipment.push(randomCarry);

    const randomEquipmentRoll = rollDice(1, equipmentMap.size);
    const randomEquipment = rollForEquipment(equipmentMap, selectedClass);
    const texts: (UnseenText | ShintaiText)[] = [];
    const food = rollDice(1, 4);
    const water = rollDice(1, 4);
    equipment.push(`${food} <strong style='color:#ECCF18;'>Food</strong>`);
    equipment.push(`${water} <strong style='color:#ECCF18;'>Water</strong>`);

    const hasSpecialEquipment = equipment.includes("<strong style='color:#ECCF18;'>An Unseen Text</strong>") || equipment.includes("A Shintai Text");
    let armor: Armor;

    if (selectedClass === "Erudite Samurai") {
        armor = { style: "Do-maru", tier: 2, description: "Medium Armour, iron or leather plates. Reduces damage taken by -d4, +2 DR penalty on Swiftness." };
    } else if (selectedClass === "Sword Saint") {
        armor = { style: "O-yoroi", tier: 3, description: "Heavy Armour, iron plates and chainmail. Reduces damage taken by -d6, +4 DR penalty on Swiftness." };
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

    if (randomEquipment === "<strong style='color:#ECCF18;'>An Unseen Text</strong>") {
        equipment.push("<strong style='color:#ECCF18;'>An Unseen Text</strong>");
        const unseenTextKey = rollDice(1, unseenTextsMap.size);
        const unseenText = unseenTextsMap.get(unseenTextKey);
        if (unseenText) {
            character.randomUnseenText = unseenText;
        }
    } else {
        equipment.push(randomEquipment);
    }

    if (selectedClass === "Yamabushi") {
        const unseenTextRoll = rollDice(1, unseenTextsMap.size);
        const unseenText = unseenTextsMap.get(unseenTextRoll);
        if (unseenText) {
            character.unseenText = unseenText;
            console.log("Assigned Unseen Text:", character.unseenText);
        }
    }

    if (selectedClass === "Onmyoji") {
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

    if (selectedClass === "Reckless Sumo") {
        character.classFeatures = { foodConsumption: "Consumes 2 food when resting instead of 1" };
    }

    console.log("Generated Abilities:", abilities);
    console.log("About to display character", character);

    return character;
}
