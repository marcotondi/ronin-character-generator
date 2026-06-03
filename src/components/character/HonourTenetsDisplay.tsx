"use client";

import { Character } from "@/lib/character-generator/types";
import { useTranslations } from "next-intl";

interface HonourTenetsDisplayProps {
  character: Character;
}

export function HonourTenetsDisplay({ character }: HonourTenetsDisplayProps) {
  const t = useTranslations();

  return (
    <div className="text-center space-y-2">
      <p className="text-muted-foreground">{t("page.youMustFollow")}</p>
      <h3 className="text-2xl font-headline font-bold text-primary tracking-wider">
        {t(character.honourTenets.title)}
      </h3>
      <p className="text-muted-foreground">
        {character.honourTenets.tenetsList
          .map((tenet: string) => t(tenet))
          .join(" • ")}
      </p>
    </div>
  );
}
