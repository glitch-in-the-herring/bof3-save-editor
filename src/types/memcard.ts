import type { Character } from "./character"
import type { Fishing } from "./fishing"
import type { Party } from "./formations"
import type { Inventory } from "./inventory"

export interface Memcard {
  addresses?: number[]
  saveFiles: SaveFile[]
}

export interface SaveFile {
  address: number
  characters: Character[]
  inventory: Inventory
  party: Party
  fishing: Fishing
}
