import type { Element } from "./element"
import type { Equipment } from "./equipment"
import type { SpellCategory } from "./spellCategories"

export interface Character {
  name: string
  lvl: number
  exp: number
  currentHP: number
  currentAP: number
  currentMaxHP: number
  currentMaxAP: number
  trueMaxHP: number
  trueMaxAP: number
  pwr: number
  def: number
  agl: number
  int: number
  willpower: number
  surprise: number
  reprisal: number
  critical: number
  dodge: number
  accuracy: number
  fatigue: number
  apprenticingLevel: number
  master: number
  resistances: Record<Element, number>
  equipment: Record<Equipment, number>
  statGrowth: Record<StatGrowthKey, number>
  spells: Record<SpellCategory, number[]>
}

export const characterNumberFields: (keyof Character)[] = [
  "lvl",
  "exp",
  "currentHP",
  "currentAP",
  "currentMaxHP",
  "currentMaxAP",
  "trueMaxHP",
  "trueMaxAP",
  "pwr",
  "def",
  "agl",
  "int",
  "willpower",
  "surprise",
  "reprisal",
  "critical",
  "dodge",
  "accuracy",
  "fatigue",
  "apprenticingLevel",
  "master",
]

export const statGrowthKeys = ["hp", "ap", "pwr", "def", "agl", "int"]
export type StatGrowthKey = (typeof statGrowthKeys)[number]
