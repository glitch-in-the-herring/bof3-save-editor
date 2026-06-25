import { create } from "zustand";
import type { Memcard, SaveFile } from "../types/memcard";

interface MemcardState {
  memcard: Memcard
  saveFileIndex?: number
  setMemcard: (memcard: Memcard) => void
  setSaveFileIndex: (index: number) => void
  getSaveFiles: () => SaveFile[]
}

export const useMemcard = create<MemcardState>((set, get) => ({
  memcard: {
    saveFiles: [],
  },
  setMemcard: (memcard) => set({ memcard: memcard }),
  getSaveFiles: () => get().memcard.saveFiles,
  setSaveFileIndex: (index) => set({ saveFileIndex: index })
}))