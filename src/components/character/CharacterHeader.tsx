"use client";

import { Character, CLASS_I18N_KEYS } from "@/lib/character-generator/types";
import { useTranslations } from "next-intl";

interface CharacterHeaderProps {
  character: Character;
}

export function CharacterHeader({ character }: CharacterHeaderProps) {
  const t = useTranslations();

  return (
    <div className="text-center space-y-2">
      <p className="text-muted-foreground">{t("page.youAre")}</p>
      <h2 className="text-4xl font-headline font-bold text-primary">
        {character.firstName.toUpperCase()}{" "}
        {character.lastName.toUpperCase()}
      </h2>
      <p className="text-xl italic">
        &quot;{character.nickName.english}&quot;
      </p>
      <p className="text-2xl font-headline font-bold text-primary">
        &quot;{character.nickName.kanji}&quot;
      </p>
      <p className="text-xl font-headline font-bold">
        &quot;{character.nickName.japanese}&quot;
      </p>
      <p className="text-muted-foreground">{t("page.the")}</p>
      <h3 className="text-3xl font-headline font-bold text-primary/80 tracking-wider">
        {t(CLASS_I18N_KEYS[character.class])}
      </h3>
    </div>
  );
}
