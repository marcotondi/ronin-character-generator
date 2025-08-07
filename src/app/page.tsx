"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const AttributeItem = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <div className="py-2">
    <p className="font-semibold">{name}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default function Home() {
  const [lastDeath, setLastDeath] = useState<"honour" | "dishonour" | null>(
    null
  );

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
          <button className="bg-transparent hover:bg-primary/10 text-foreground rounded-full border-2 border-dashed border-foreground/50 w-48 h-48 flex flex-col justify-center items-center text-center p-4 transition-colors duration-300">
            <span className="font-headline text-lg font-bold">CLICK</span>
            <span className="text-sm">FOR NEW</span>
            <span className="font-headline text-lg font-bold">WARRIOR</span>
          </button>
        </div>

        <div className="text-center space-y-2">
          <p className="text-muted-foreground">You are...</p>
          <h2 className="text-4xl font-headline font-bold text-primary">
            ZEN OKADA
          </h2>
          <p className="text-xl italic">"Sword Saint of the Wind"</p>
          <p className="text-2xl font-special">風の剣聖</p>
          <p className="text-lg text-muted-foreground">Kaze no Kensei</p>
          <p className="text-muted-foreground">...the...</p>
          <h3 className="text-3xl font-headline font-bold text-primary/80 tracking-wider">
            Wild Dancer
          </h3>
        </div>

        <Separator className="my-8" />

        <div className="flex justify-around items-center text-center flex-wrap gap-4 text-sm sm:text-base">
          <p>
            <span className="font-bold">HP</span> 7
          </p>
          <p>
            <span className="font-bold">Virtues</span> 1 (d2)
          </p>
          <p>
            <span className="font-bold">Honour</span> 8 (Dishonourable)
          </p>
          <p>
            <span className="font-bold">Ryo</span> 20
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-5 gap-x-8 gap-y-6">
          <div className="col-span-5 md:col-span-3 space-y-2">
            <h3 className="text-2xl font-headline text-primary font-bold">
              Attributes
            </h3>
            <p className="text-muted-foreground">
              You are covered in scars or wounds, some of which are infected and
              have anger management issues. Tend to lash out violently.
            </p>
            <p className="text-muted-foreground">
              Fanatical. You have a powerful enemy who wants you dead at all
              costs.
            </p>
          </div>
          <div className="col-span-5 md:col-span-2 space-y-2">
            <h3 className="text-2xl font-headline text-primary font-bold">
              Abilities
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
              <li>Swiftness: ±0</li>
              <li>Spirit: +1</li>
              <li>Vigor: -1</li>
              <li>Resilience: ±0</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center space-y-2">
          <p className="text-muted-foreground">You must follow...</p>
          <h3 className="text-2xl font-headline font-bold text-primary tracking-wider">
            THE DANCER'S CODE
          </h3>
          <p className="text-muted-foreground">
            Expression • Rhythm • Passion • Grace • Courage • Innovation
          </p>
        </div>

        <Separator className="my-8" />

        <div className="grid grid-cols-5 gap-x-8 gap-y-6">
          <div className="col-span-5 md:col-span-2 space-y-2">
            <h3 className="text-2xl font-headline text-primary font-bold">
              WEAPONS
            </h3>
            <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
              <li>Katana d8</li>
              <li>Tanegashima d8(Spirit+5 bullets)</li>
            </ul>
          </div>
          <div className="col-span-5 md:col-span-3 space-y-2">
            <h3 className="text-2xl font-headline text-primary font-bold">
              ARMOUR
            </h3>
            <div className="flex items-baseline gap-4">
              <p className="font-semibold">Kusari Armour</p>
              <p className="text-sm text-muted-foreground">Tier 2</p>
            </div>
            <p className="text-muted-foreground">
              Medium Armour, interlocking metal rings. Reduces damage taken by
              -d4, +2 DR penalty on Swiftness.
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
              <li>Flashy, decorative kimono</li>
              <li>Sack up to 10 small items</li>
              <li>1 Food</li>
              <li>2 Water</li>
              <li>An Unseen Text</li>
            </ul>
          </div>
          <div className="col-span-5 md:col-span-3 space-y-2">
            <h3 className="text-2xl font-headline text-primary font-bold">
              Feature
            </h3>
            <p className="font-semibold">Wild Spirit</p>
            <p className="text-muted-foreground">
              Unpredictable nature makes it hard for enemies to anticipate
              actions. Once per combat, reroll a failed attack or defence roll.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center space-y-4 py-8">
          <p className="font-special text-muted-foreground text-sm tracking-[0.5em] bg-stone-700/50 rounded-sm px-4 py-1 inline-block">
            texts
          </p>
          <h3 className="text-2xl font-headline font-bold text-primary tracking-wider">
            UNSEEN TEXT
          </h3>
          <h4 className="text-xl font-bold">Eagle Eye</h4>
          <p className="text-muted-foreground">
            Gain +4 to hit for your next attack.
          </p>
        </div>

        <div className="text-center pb-8">
          <Button size="lg" className="font-headline font-bold tracking-wider">
            Download Character Sheet
          </Button>
        </div>
      </main>
    </div>
  );
}
