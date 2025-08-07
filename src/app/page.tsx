"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import {
  generateCharacter,
} from "@/lib/character-generator";
import { Character } from "@/lib/character-generator/types";



export default function Home() {
  const [lastDeath, setLastDeath] = useState<"honour" | "dishonour" | null>(
    null
  );
  const [character, setCharacter] = useState<Character | null>(null);

  const handleGenerate = () => {
    const newCharacter = generateCharacter();
    setCharacter(newCharacter);
  };

  useEffect(() => {
    // Generate a character on initial load
    handleGenerate();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 md:p-8">
      <main className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-widest">
            THE{" "}
            <span className="text-primary relative">
              RŌNIN
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
            CHARACTER GENERATOR
          </h1>
        </header>

        <div className="text-center space-y-4">
          <p>Your last warrior died with...</p>

          <div className="flex justify-center gap-4">
            <Button
              variant={lastDeath === "honour" ? "default" : "outline"}
              onClick={() =>
                setLastDeath(lastDeath === "honour" ? null : "honour")
              }
            >
              Honour
            </Button>
            <Button
              variant={lastDeath === "dishonour" ? "destructive" : "outline"}
              onClick={() =>
                setLastDeath(lastDeath === "dishonour" ? null : "dishonour")
              }
            >
              Dishonour
            </Button>

          </div>
        </div>

        <div className="flex justify-center items-center py-8">
          <button
            onClick={handleGenerate}
            className="bg-transparent hover:bg-primary/10 text-foreground rounded-full border-2 border-dashed border-foreground/50 w-48 h-48 flex flex-col justify-center items-center text-center p-4 transition-colors duration-300"
          >
            <span className="font-headline text-lg font-bold">CLICK</span>
            <span className="text-sm">FOR NEW</span>
            <span className="font-headline text-lg font-bold">WARRIOR</span>
          </button>
        </div>

        {character && (
          <>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">You are...</p>
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
              <p className="text-muted-foreground">...the...</p>
              <h3 className="text-3xl font-headline font-bold text-primary/80 tracking-wider">
                {character.class}
              </h3>
            </div>

            <Separator className="my-8" />

            <div className="flex justify-around items-center text-center flex-wrap gap-4 text-sm sm:text-base">
              <p>
                <span className="font-bold">HP</span> <span className="">{character.hitPoints}</span>
              </p>
              <p>
                <span className="font-bold">Virtues</span>{" "}
                {character.virtues} ({character.virtuesDice})
              </p>
              <p>
                <span className="font-bold">Honour</span> {character.honor} (
                {character.honorStatus})
              </p>
              <p>
                <span className="font-bold">Ryo</span> {character.ryo}
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid grid-cols-5 gap-x-8 gap-y-6">
              <div className="col-span-5 md:col-span-3 space-y-2">
                <h3 className="text-2xl font-headline text-primary font-bold">
                  Attributes
                </h3>
                <p className="text-muted-foreground">
                  {character.brokenBodies}
                </p>
                <p className="text-muted-foreground">
                  {character.grimChronicles}
                </p>
              </div>
              <div className="col-span-5 md:col-span-2 space-y-2">
                <h3 className="text-2xl font-headline text-primary font-bold">
                  Abilities
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  <li>Swiftness: {character.abilities.swiftness}</li>
                  <li>Spirit: {character.abilities.spirit}</li>
                  <li>Vigor: {character.abilities.vigor}</li>
                  <li>Resilience: {character.abilities.resilience}</li>
                </ul>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="text-center space-y-2">
              <p className="text-muted-foreground">You must follow...</p>
              <h3 className="text-2xl font-headline font-bold text-primary tracking-wider">
                {character.honourTenets.title}
              </h3>
              <p className="text-muted-foreground">
                {character.honourTenets.tenetsList.join(" • ")}
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid grid-cols-5 gap-x-8 gap-y-6">
              <div className="col-span-5 md:col-span-2 space-y-2">
                <h3 className="text-2xl font-headline text-primary font-bold">
                  WEAPONS
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  {character.classWeapons.map((weapon, index) => (
                    <li key={index}>
                      {weapon.name} {weapon.damage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-5 md:col-span-3 space-y-2">
                <h3 className="text-2xl font-headline text-primary font-bold">
                  ARMOUR
                </h3>
                <div className="flex items-baseline gap-4">
                  <p className="font-semibold">{character.armor.style}</p>
                  <p className="text-sm text-muted-foreground">
                    Tier {character.armor.tier}
                  </p>
                </div>
                <p className="text-muted-foreground">
                  {character.armor.description}
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="grid grid-cols-5 gap-x-8 gap-y-6">
              <div className="col-span-5 md:col-span-2 space-y-2">
                <h3 className="text-2xl font-headline text-primary font-bold">
                  Equipment
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
                  {character.equipment.map((item, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                  ))}
                </ul>
              </div>
              <div className="col-span-5 md:col-span-3 space-y-2">
                <h3 className="text-2xl font-headline text-primary font-bold">
                  Feature
                </h3>
                <p className="font-semibold">{character.feature.title}</p>
                <p className="text-muted-foreground">
                  {character.feature.description}
                </p>
              </div>
            </div>

            {(character.unseenText || character.shintaiText) && (
            <>
              <Separator className="my-8" />
              <div className="py-8 flex justify-center">
                <div className="flex w-full max-w-4xl items-start gap-8">
                  {character.unseenText && (
                    <div className="flex-1 space-y-4 text-center">
                      <h3 className="text-2xl font-headline font-bold text-primary tracking-wider">
                        Unseen Text
                      </h3>
                      <p className="font-special text-muted-foreground text-sm tracking-[0.5em] bg-stone-700/50 rounded-sm px-4 py-1 inline-block">
                        {character.unseenText.title}
                      </p>
                      <p className="text-muted-foreground">
                        {character.unseenText.description}
                      </p>
                    </div>
                  )}

                  {/* Linea verticale di separazione */}
                  {character.unseenText && character.shintaiText && (
                    <div className="w-px bg-border h-auto self-stretch" />
                  )}

                  {character.shintaiText && (
                    <div className="flex-1 space-y-4 text-center">
                      <h3 className="text-2xl font-headline font-bold text-primary tracking-wider">
                        Shintai Text
                      </h3>
                      <p className="font-special text-muted-foreground text-sm tracking-[0.5em] bg-stone-700/50 rounded-sm px-4 py-1 inline-block">
                        {character.shintaiText.title}
                      </p>
                      <p className="text-muted-foreground">
                        {character.shintaiText.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}


            <div className="text-center pb-8">
              <Button
                size="lg"
                className="font-headline font-bold tracking-wider"
              >
                Download Character Sheet
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
