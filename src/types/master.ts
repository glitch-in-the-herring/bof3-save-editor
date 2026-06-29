import type { StatGrowthKey } from "./character"

export const masters: Record<number, string> = {
  0: "Bunyan",
  1: "Mygas",
  2: "Yggdrasil",
  3: "D'lonzo",
  4: "Fahl",
  5: "Durandal",
  6: "Giotto",
  7: "Hondara",
  8: "Emitai",
  9: "Deis",
  10: "Hachio",
  11: "Bais",
  12: "Lang",
  13: "Lee",
  14: "Wynn",
  15: "Ladon",
  16: "Meryleep",
  0xff: "--",
}

export const masterModifiers: Record<number, Record<StatGrowthKey, number>> = {
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
export type Master = (typeof masters)[number]
