import { Armor } from "./types";

type Translator = (key: string) => string;

export const getArmorsByRoll = (): { [key: number]: Armor[] } => ({
    1: [{ style: 'characterGenerator.armors.noArmour.style', tier: 0, description: 'characterGenerator.armors.noArmour.description' }],
    2: [
        { style: 'characterGenerator.armors.ashigaruArmour.style', tier: 1, description: 'characterGenerator.armors.ashigaruArmour.description' },
        { style: 'characterGenerator.armors.kendoArmour.style', tier: 1, description: 'characterGenerator.armors.kendoArmour.description' },
    ],
    3: [
        { style: 'characterGenerator.armors.doMaru.style', tier: 2, description: 'characterGenerator.armors.doMaru.description' },
        { style: 'characterGenerator.armors.kusariArmour.style', tier: 2, description: 'characterGenerator.armors.kusariArmour.description' },
    ],
    4: [
        { style: 'characterGenerator.armors.oYoroi.style', tier: 3, description: 'characterGenerator.armors.oYoroi.description' },
        { style: 'characterGenerator.armors.haramaki.style', tier: 3, description: 'characterGenerator.armors.haramaki.description' },
    ],
});
