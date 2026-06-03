"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { generateCharacter } from "@/lib/character-generator";
import { Character } from "@/lib/character-generator/types";
import { HonourState } from "@/lib/character-generator/utils";
import { useTranslations } from "next-intl";
import { CharacterHeader } from "./character/CharacterHeader";
import { StatsDisplay } from "./character/StatsDisplay";
import { AttributesDisplay } from "./character/AttributesDisplay";
import { HonourTenetsDisplay } from "./character/HonourTenetsDisplay";
import { EquipmentDisplay } from "./character/EquipmentDisplay";
import { TextsDisplay } from "./character/TextsDisplay";

export default function CharacterGenerator() {
  const t = useTranslations();
  const [lastDeath, setLastDeath] = useState<"honour" | "dishonour" | null>(
    null
  );
  const [character, setCharacter] = useState<Character | null>(null);

  const handleGenerate = () => {
    const honourState: HonourState = lastDeath === "honour" ? "honourable" : lastDeath === "dishonour" ? "dishonourable" : "none";
    const newCharacter = generateCharacter(t, honourState);
    setCharacter(newCharacter);
  };

  useEffect(() => {
    // Generate a character on initial load
    handleGenerate();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 md:p-8">
      <main className="max-w-4xl mx-auto space-y-6">
        <header className="text-center space-y-2 py-2">
          <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-widest">
            <span className="text-primary relative">
              RŌNIN:
              <svg
                className="absolute -bottom-1 left-0 w-full h-auto text-primary"
                viewBox="0 0 100 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              <path
                d="M2 4.15625C18.5 2.15625 58.5 2.15625 98 6.15625"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              </svg>
            </span>{" "}
            {t("page.title")}
          </h1>
        </header>

        <div className="text-center space-y-1">
          <p>{t("page.lastWarrior")}</p>

          <div className="flex justify-center gap-4">
            <Button
              variant={lastDeath === "honour" ? "default" : "outline"}
              onClick={() =>
                setLastDeath(lastDeath === "honour" ? null : "honour")
              }
            >
              {t("page.honour")}
            </Button>
            <Button
              variant={lastDeath === "dishonour" ? "destructive" : "outline"}
              onClick={() =>
                setLastDeath(lastDeath === "dishonour" ? null : "dishonour")
              }
            >
              {t("page.dishonour")}
            </Button>
          </div>
        </div>

        <div className="flex justify-center items-center py-4">
          <button
            onClick={handleGenerate}
            className="bg-transparent hover:bg-primary/10 text-foreground rounded-full border-2 border-foreground/50 w-40 h-40 flex flex-col justify-center items-center text-center p-4 transition-colors duration-300"
          >
            <span className="font-headline text-lg font-bold">
              {t("page.click")}
            </span>
            <span className="text-sm">{t("page.forNew")}</span>
            <span className="font-headline text-lg font-bold">
              {t("page.warrior")}
            </span>
          </button>
        </div>

        {character && (
          <>
            <CharacterHeader character={character} />

            <Separator className="my-8" />

            <StatsDisplay character={character} />

            <Separator className="my-8" />

            <AttributesDisplay character={character} />

            <Separator className="my-8" />

            <HonourTenetsDisplay character={character} />

            <Separator className="my-8" />

            <EquipmentDisplay character={character} />

            {(character.unseenText || character.randomUnseenText || character.shintaiText) && (
              <>
                <Separator className="my-8" />
                <TextsDisplay character={character} />
              </>
            )}

            {/* TODO: Abilitare pulsante download  */}
            {/* <div className="text-center pb-8">
              <Button
                size="lg"
                className="font-headline font-bold tracking-wider"
              >
                {t("page.download")}
              </Button>
            </div> */}
          </>
        )}
      </main>
    </div>
  );
}
