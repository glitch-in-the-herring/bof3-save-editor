import { create } from "zustand"
import type { SaveFile } from "../types/memcard"

interface SaveFileState {
  saveFile: SaveFile
  characterIndex?: number
  setSaveFile: (saveFile: SaveFile) => void
  setCharacterIndex: (index: number) => void
}

export const useSaveFile = create<SaveFileState>()((set) => ({
  saveFile: {},
  setSaveFile: (saveFile) => set({ saveFile: saveFile }),
  setCharacterIndex: (index) => set({ characterIndex: index })
}))