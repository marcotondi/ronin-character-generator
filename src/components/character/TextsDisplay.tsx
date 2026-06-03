"use client";

import { Character } from "@/lib/character-generator/types";
import { useTranslations } from "next-intl";

interface TextsDisplayProps {
  character: Character;
}

export function TextsDisplay({ character }: TextsDisplayProps) {
  const t = useTranslations();

  if (!character.unseenText && !character.randomUnseenText && !character.shintaiText) {
    return null;
  }

  return (
    <div className="py-8 flex justify-center">
      <div className="flex w-full max-w-4xl items-start gap-8">
        {(character.unseenText || character.randomUnseenText) && (
          <div className="flex-1 space-y-4 text-center">
            <h3 className="text-2xl font-headline font-bold text-primary tracking-wider">
              {t("page.unseenText")}
            </h3>
            <p className="font-special text-muted-foreground text-sm tracking-[0.5em] bg-stone-700/50 rounded-sm px-4 py-1 inline-block">
              {t((character.unseenText ?? character.randomUnseenText)!.title)}
            </p>
            <p className="text-muted-foreground">
              {t((character.unseenText ?? character.randomUnseenText)!.description)}
            </p>
          </div>
        )}

        {(character.unseenText || character.randomUnseenText) && character.shintaiText && (
          <div className="w-px bg-border h-auto self-stretch" />
        )}

        {character.shintaiText && (
          <div className="flex-1 space-y-4 text-center">
            <h3 className="text-2xl font-headline font-bold text-primary tracking-wider">
              {t("page.shintaiText")}
            </h3>
            <p className="font-special text-muted-foreground text-sm tracking-[0.5em] bg-stone-700/50 rounded-sm px-4 py-1 inline-block">
              {t(character.shintaiText.title)}
            </p>
            <p className="text-muted-foreground">
              {t(character.shintaiText.description)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
