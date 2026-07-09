import type { Character } from "./character"
import type { Counters } from "./counters"
import type { FaerieVillage } from "./faerie"
import type { Fishing } from "./fishing"
import type { Party } from "./formations"
import type { Inventory } from "./inventory"
import type { Meta } from "./meta"
import type { Position } from "./position"

export interface Memcard {
  addresses?: number[]
  saveFiles: SaveFile[]
}

export interface SaveFile {
  address: number
  meta: Meta
  characters: Character[]
  inventory: Inventory
  party: Party
  fishing: Fishing
  counters: Counters
  position: Position
  faerieVillage?: FaerieVillage
}
