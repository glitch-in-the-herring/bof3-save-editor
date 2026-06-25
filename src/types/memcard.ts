import type { Character } from "./character"

export interface Memcard {
  addresses?: number[]
  saveFiles: SaveFile[]
}

export interface SaveFile {
  address?: number
  characters?: Character[]
}
