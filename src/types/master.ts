import type { StatGrowthKey } from "./character"

interface MasterRecord {
  id: number
  name: string
}

export const masters: MasterRecord[] = [
  { id: 0xff, name: "--" },
  { id: 0, name: "Bunyan" },
  { id: 1, name: "Mygas" },
  { id: 2, name: "Yggdrasil" },
  { id: 3, name: "D'lonzo" },
  { id: 4, name: "Fahl" },
  { id: 5, name: "Durandal" },
  { id: 6, name: "Giotto" },
  { id: 7, name: "Hondara" },
  { id: 8, name: "Emitai" },
  { id: 9, name: "Deis" },
  { id: 10, name: "Hachio" },
  { id: 11, name: "Bais" },
  { id: 12, name: "Lang" },
  { id: 13, name: "Lee" },
  { id: 14, name: "Wynn" },
  { id: 15, name: "Ladon" },
  { id: 16, name: "Meryleep" },
]

export const masterStatGrowth: Record<number, Record<StatGrowthKey, number>> = {
  0: { hp: 2, ap: -2, pwr: 2, def: 1, agl: 0, int: -3 },
  1: { hp: 0, ap: 1, pwr: -1, def: -1, agl: 0, int: 2 },
  2: { hp: -1, ap: 1, pwr: -2, def: 1, agl: 0, int: 2 },
  3: { hp: -1, ap: -2, pwr: 1, def: 0, agl: 1, int: 0 },
  4: { hp: 4, ap: 0, pwr: 1, def: 3, agl: -3, int: -3 },
  5: { hp: 0, ap: 0, pwr: 0, def: 0, agl: 0, int: 0 },
  6: { hp: 4, ap: 3, pwr: -1, def: -1, agl: -1, int: -1 },
  7: { hp: 0, ap: 1, pwr: -2, def: 0, agl: 0, int: 1 },
  8: { hp: 0, ap: 4, pwr: -2, def: -2, agl: 0, int: 4 },
  9: { hp: -3, ap: 3, pwr: 1, def: -3, agl: 1, int: 3 },
  10: { hp: 2, ap: -2, pwr: 2, def: 1, agl: -1, int: -1 },
  11: { hp: 0, ap: 0, pwr: 1, def: 0, agl: 0, int: 0 },
  12: { hp: 0, ap: 0, pwr: 0, def: 1, agl: 0, int: 0 },
  13: { hp: 0, ap: 0, pwr: 0, def: 0, agl: 1, int: 0 },
  14: { hp: 1, ap: 0, pwr: 0, def: 0, agl: 0, int: 0 },
  15: { hp: -6, ap: -6, pwr: 2, def: 2, agl: 1, int: 2 },
  16: { hp: -1, ap: 0, pwr: -1, def: -1, agl: 2, int: 0 },
  0xff: { hp: 0, ap: 0, pwr: 0, def: 0, agl: 0, int: 0 },
}
