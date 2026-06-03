import { Weapon } from '../types';

export const carryMap: Map<number, string> = new Map<number, string>([
  [1, 'characterGenerator.carryMap.emptyHanded'],
  [2, 'characterGenerator.carryMap.emptyHanded'],
  [3, 'characterGenerator.carryMap.backpack'],
  [4, 'characterGenerator.carryMap.sack'],
  [5, 'characterGenerator.carryMap.smallWagon'],
  [6, 'characterGenerator.carryMap.trustyPackAnimal'],
]);

export const equipmentMap: Map<number, string> = new Map<number, string>([
  [1, 'characterGenerator.equipmentMap.rope'],
  [2, 'characterGenerator.equipmentMap.torches'],
  [3, 'characterGenerator.equipmentMap.lantern'],
  [4, 'characterGenerator.equipmentMap.magnesiumStrip'],
  [5, 'characterGenerator.equipmentMap.unseenText'],
  [6, 'characterGenerator.equipmentMap.firecrackers'],
  [7, 'characterGenerator.equipmentMap.healersKits'],
  [8, 'characterGenerator.equipmentMap.metalFileAndLockpicks'],
  [9, 'characterGenerator.equipmentMap.bearTrap'],
  [10, 'characterGenerator.equipmentMap.blackPowderBomb'],
  [11, 'characterGenerator.equipmentMap.snakeVenomShuriken'],
  [12, 'characterGenerator.equipmentMap.silverTalisman'],
]);

export const startingWeaponsMap: Map<number, Weapon> = new Map<number, Weapon>([
  [1, { name: 'characterGenerator.startingWeapons.shuriken.name', damage: "d4", amount: 'characterGenerator.startingWeapons.shuriken.amount' }],
  [2, { name: 'characterGenerator.startingWeapons.tanto.name', damage: "d4" }],
  [3, { name: 'characterGenerator.startingWeapons.yumi.name', damage: "d6", amount: 'characterGenerator.startingWeapons.yumi.amount' }],
  [4, { name: 'characterGenerator.startingWeapons.boStaff.name', damage: "d6" }],
  [5, { name: 'characterGenerator.startingWeapons.naginata.name', damage: "d8" }],
  [6, { name: 'characterGenerator.startingWeapons.kusarigama.name', damage: "d6", amount: 'characterGenerator.startingWeapons.kusarigama.amount' }],
  [7, { name: 'characterGenerator.startingWeapons.wakizashi.name', damage: "d6" }],
  [8, { name: 'characterGenerator.startingWeapons.nunchaku.name', damage: "d6" }],
  [9, { name: 'characterGenerator.startingWeapons.tanegashima.name', damage: "d8", amount: 'characterGenerator.startingWeapons.tanegashima.amount' }],
  [10, { name: 'characterGenerator.startingWeapons.katana.name', damage: "d10" }],
]);
