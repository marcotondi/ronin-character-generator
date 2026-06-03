"use client";

import { Character } from "@/lib/character-generator/types";
import { useTranslations } from "next-intl";

interface AttributesDisplayProps {
  character: Character;
}

export function AttributesDisplay({ character }: AttributesDisplayProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-5 gap-x-8 gap-y-6">
      <div className="col-span-5 md:col-span-3 space-y-2">
        <h3 className="text-2xl font-headline text-primary font-bold">
          {t("page.attributes")}
        </h3>
        <p className="text-muted-foreground">
          {t(character.brokenBodies ?? "")}
        </p>
        <p className="text-muted-foreground">
          {t(character.grimChronicles ?? "")}
        </p>
        <p className="text-muted-foreground">
          {t(character.badHabits ?? "")}
        </p>
        <p className="text-muted-foreground">
          {t(character.awfulAfflictions ?? "")}
        </p>
      </div>
      <div className="col-span-5 md:col-span-2 space-y-2">
        <h3 className="text-2xl font-headline text-primary font-bold">
          {t("page.abilities")}
        </h3>
        <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
          <li>
            {t("page.swiftness")}: {character.abilities.swiftness}
          </li>
          <li>
            {t("page.spirit")}: {character.abilities.spirit}
          </li>
          <li>
            {t("page.vigor")}: {character.abilities.vigor}
          </li>
          <li>
            {t("page.resilience")}: {character.abilities.resilience}
          </li>
        </ul>
      </div>
    </div>
  );
}
