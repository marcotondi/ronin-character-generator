import { Armor } from "./types";

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
    const armorsByRoll: { [key: number]: Armor[] } = {
        1: [{ style: "No Armour", tier: 0, description: "Leaves you vulnerable to all attacks. Good luck…" }],
        2: [
            { style: "Ashigaru Armour", tier: 1, description: "Light Armour with moderate protection. Reduces damage taken by -d2." },
            { style: "Kendo Armour", tier: 1, description: "Light Armour, cloth and padded. Reduces damage taken by -d2." },
        ],
        3: [
            { style: "Do-maru", tier: 2, description: "Medium Armour, iron or leather plates. Reduces damage taken by -d4, +2 DR penalty on Swiftness." },
            { style: "Kusari Armour", tier: 2, description: "Medium Armour, interlocking metal rings. Reduces damage taken by -d4, +2 DR penalty on Swiftness." },
        ],
        4: [
            { style: "O-yoroi", tier: 3, description: "Heavy Armour, iron plates and chainmail. Reduces damage taken by -d6, +4 DR penalty on Swiftness." },
            { style: "Haramaki", tier: 3, description: "Heavy Armour, leather and iron plates. Reduces damage taken by -d6, +4 DR penalty on Swiftness." },
        ],
    };
    const tierArmors = armorsByRoll[roll];
    if (tierArmors) {
        return tierArmors[Math.floor(Math.random() * tierArmors.length)];
    }
    console.error("Invalid roll for armor:", roll);
    return armorsByRoll[1][0];
}

export function rollForEquipment(equipmentMap2: Map<number, string>, selectedClass: string): string {
    let roll: number;
    let equipment: string | undefined;
    do {
        roll = rollDice(1, equipmentMap2.size);
        equipment = equipmentMap2.get(roll);
        if (equipment === "4 <strong style='color:#ECCF18;'>Firecrackers</strong>" || equipment === "4 <strong style='color:#ECCF18;'>Healers Kits</strong>" || equipment === "4 <strong style='color:#ECCF18;'>Snake venom shuriken</strong>") {
            const quantity = rollDice(1, 4);
            equipment = equipment.replace("4", quantity.toString());
        }
    } while ((selectedClass === "Onmyoji" || selectedClass === "Yamabushi") && equipment === "An Unseen Text");
    return equipment || "";
}
