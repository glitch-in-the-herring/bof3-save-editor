import type { Element } from "./element"

export interface Character {
  name?: string
  lvl?: number
  exp?: number
  currentHP?: number
  currentAP?: number
  currentMaxHP?: number
  currentMaxAP?: number
  trueMaxHP?: number
  trueMaxAP?: number
  pwr?: number
  def?: number
  agl?: number
  int?: number
  willpower?: number
  surprise?: number
  reprisal?: number
  critical?: number
  dodge?: number
  accuracy?: number
  fatigue?: number
  resistances?: Record<Element, number>
  weaponID?: number
  helmetID?: number
  chestplateID?: number
  shieldID?: number
  accessory1ID?: number
  accessory2ID?: number
  statGrowth?: StatGrowth
}

interface StatGrowth {
  hp: number
  ap: number
  pwr: number
  def: number
  agl: number
  int: number
}
