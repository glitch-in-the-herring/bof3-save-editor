import { create } from "zustand"

import type { Character } from "../types/character"

interface CharacterState {
  character: Character
  setCharacter: (character: Character) => void
}

export const useCharacter = create<CharacterState>((set) => ({
  character: {},
  setCharacter: (character: Character) => set({ character: character }),
}))
