"use client";

import { Character } from "@/lib/character-generator/types";
import { useTranslations } from "next-intl";

interface EquipmentDisplayProps {
  character: Character;
}

export function EquipmentDisplay({ character }: EquipmentDisplayProps) {
  const t = useTranslations();

  return (
    <>
      <div className="grid grid-cols-5 gap-x-8 gap-y-6">
        <div className="col-span-5 md:col-span-2 space-y-2">
          <h3 className="text-2xl font-headline text-primary font-bold">
            {t("page.weapons")}
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
            {character.classWeapons.map((weapon) => (
              <li key={weapon.name}>
                <strong className="text-primary">
                  {t(weapon.name)}{" "}
                </strong>
                {weapon.damage ? weapon.damage : ""}{" "}
                {weapon.amount ? t(weapon.amount) : ""}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 space-y-2">
          <h3 className="text-2xl font-headline text-primary font-bold">
            {t("page.armour")}
          </h3>
          <div className="flex items-baseline gap-4">
            <p className="font-semibold">{t(character.armor.style)}</p>
            <p className="text-sm text-muted-foreground">
              {t("page.tier")} {character.armor.tier}
            </p>
          </div>
          <p className="text-muted-foreground">
            {t(character.armor.description)}
          </p>
        </div>
      </div>

      <div className="my-8 border-t border-border" />

      <div className="grid grid-cols-5 gap-x-8 gap-y-6">
        <div className="col-span-5 md:col-span-2 space-y-2">
          <h3 className="text-2xl font-headline text-primary font-bold">
            {t("page.equipment")}
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
            {character.equipment.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 space-y-2">
          <h3 className="text-2xl font-headline text-primary font-bold">
            {t("page.feature")}
          </h3>
          <p className="font-semibold">{t(character.feature.title)}</p>
          <p className="text-muted-foreground">
            {t(character.feature.description)}
          </p>
        </div>
      </div>
    </>
  );
}
