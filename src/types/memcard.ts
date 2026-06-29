import type { Character } from "./character"
import type { Inventory } from "./inventory"

export interface Memcard {
  addresses?: number[]
  saveFiles: SaveFile[]
}

export interface SaveFile {
  address?: number
  characters?: Character[]
  inventory?: Inventory
}
