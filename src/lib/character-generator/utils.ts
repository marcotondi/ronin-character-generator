import { Armor } from "./types";
import { getArmorsByRoll } from "./i18n-armor";

type Translator = (key: string) => string;

let honourState: "honourable" | "dishonourable" | "none" = "none";

export function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function rollDice(numberOfDice: number, sides: number): number {
    let total = 0;
    for (let i = 0; i < numberOfDice; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    if (numberOfDice === 3) {
        if (honourState === "honourable") {
            console.log("Original total:", total, "+ 1 for being honourable");
            total += 1;
        } else if (honourState === "dishonourable") {
            console.log("Original total:", total, "- 1 for being dishonourable");
            total -= 1;
        }
    }
    return total;
}

export function getAbilityModifier(score: number): number {
    if (score <= 4) return -3;
    if (score <= 6) return -2;
    if (score <= 8) return -1;
    if (score <= 12) return 0;
    if (score <= 14) return 1;
    if (score <= 16) return 2;
    return 3;
}

export function toggleHonourState(state: "honourable" | "dishonourable"): void {
    honourState = honourState === state ? "none" : state;
}

export function determineArmorBasedOnRoll(roll: number): Armor {
    const armorsByRoll = getArmorsByRoll();
    const tierArmors = armorsByRoll[roll];
    if (tierArmors) {
        return tierArmors[Math.floor(Math.random() * tierArmors.length)];
    }
    console.error("Invalid roll for armor:", roll);
    return armorsByRoll[1][0];
}

export function rollForEquipment(equipmentMap: Map<number, string>, selectedClass: string): string {
    let roll: number;
    let equipment: string | undefined;
    do {
        roll = rollDice(1, equipmentMap.size);
        equipment = equipmentMap.get(roll);
        if (equipment === 'characterGenerator.equipmentMap.firecrackers' || equipment === 'characterGenerator.equipmentMap.healersKits' || equipment === 'characterGenerator.equipmentMap.snakeVenomShuriken') {
            const quantity = rollDice(1, 4);
            equipment = equipment.replace("4", quantity.toString());
        }
    } while ((selectedClass === 'characterGenerator.classes.onmyoji' || selectedClass === 'characterGenerator.classes.yamabushi') && equipment === 'characterGenerator.equipmentMap.unseenText');
    return equipment || "";
}