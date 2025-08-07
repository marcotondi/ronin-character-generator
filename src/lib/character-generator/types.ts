export interface NickName {
    english: string;
    japanese: string;
    kanji: string;
}

export interface Weapon {
    name: string;
    damage: string;
    amount?: string;
}

export interface UnseenText {
    title: string;
    description: string;
}

export interface ShintaiText {
    title: string;
    description: string;
}

export interface Modifiers {
    swiftness: number;
    spirit: number;
    vigor: number;
    resilience: number;
    honour: number;
}

export interface Abilities {
    swiftness: number;
    spirit: number;
    vigor: number;
    resilience: number;
    honour: number;
}

export interface Feature {
    title: string;
    description: string;
}

export interface HonourTenet {
    title: string;
    tenetsList: string[];
}

export interface ClassFeature {
    modifiers: Modifiers;
    calculateHitPoints: (abilities: Abilities) => number;
    rollRyo: () => number;
    rollVirtues: () => number;
    virtuesDice: string;
    weapons: Weapon[];
    startingEquipment: string[];
    features: Map<number, Feature>;
    honourTenets: HonourTenet;
    foodConsumption?: string;
}

export interface Armor {
    style: string;
    tier: number;
    description: string;
}

export interface Character {
    class: string;
    firstName: string;
    lastName: string;
    nickName: NickName;
    abilities: Abilities;
    hitPoints: number;
    honor: number;
    honorStatus: string;
    ryo: number;
    virtues: number;
    virtuesDice: string;
    feature: Feature;
    equipment: string[];
    texts: (UnseenText | ShintaiText)[];
    honourTenets: HonourTenet;
    armor: Armor;
    classWeapons: Weapon[];
    otherEquipment: string[];
    brokenBodies: string | undefined;
    grimChronicles: string | undefined;
    badHabits: string | undefined;
    awfulAfflictions: string | undefined;
    randomUnseenText?: UnseenText;
    unseenText?: UnseenText;
    shintaiText?: ShintaiText;
    classFeatures?: { foodConsumption: string };
}
