"use client";

import { Character } from "@/lib/character-generator/types";
import { useTranslations } from "next-intl";

interface StatsDisplayProps {
  character: Character;
}

export function StatsDisplay({ character }: StatsDisplayProps) {
  const t = useTranslations();

  return (
    <div className="flex justify-around items-center text-center flex-wrap gap-4 text-sm sm:text-base">
      <p>
        <span className="font-bold">{t("page.hp")}</span>{" "}
        <span className="">{character.hitPoints}</span>
      </p>
      <p>
        <span className="font-bold">{t("page.virtues")}</span>{" "}
        {character.virtues} ({character.virtuesDice})
      </p>
      <p>
        <span className="font-bold">{t("page.honor")}</span>{" "}
        {character.abilities.honour} ({t(character.honorStatus)})
      </p>
      <p>
        <span className="font-bold">{t("page.ryo")}</span>{" "}
        {character.ryo}
      </p>
    </div>
  );
}
