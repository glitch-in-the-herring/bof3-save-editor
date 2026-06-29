import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

import type { Character, StatGrowthKey } from "../types/character"
import type { Element } from "../types/element"
import type { Equipment } from "../types/equipment"
import type { Memcard } from "../types/memcard"
import type { SpellCategory } from "../types/spellCategories"

interface GlobalState extends ActiveOptionsState, CharacterState {
  memcard: Memcard
  setMemcard: (memcard: Memcard) => void
}

interface ActiveOptions {
  saveFileIndex?: number
  characterIndex?: number
  spellCategory?: SpellCategory
}

interface ActiveOptionsState {
  activeOptions: ActiveOptions
  setActiveOption: <K extends keyof ActiveOptions>(value: ActiveOptions[K], key: K) => void
}

interface CharacterState {
  setCharacterField: <K extends keyof Character>(
    value: Character[K],
    key: K,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  setCharacterResistance: (
    value: number,
    element: Element,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  setCharacterEquipment: (
    value: number,
    equipment: Equipment,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  setCharacterSpell: (
    value: number,
    index: number,
    category: SpellCategory,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  setCharacterGrowth: (
    value: number,
    key: StatGrowthKey,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
}

export const useGlobal = create<GlobalState>()(
  immer((set) => ({
    memcard: {
      saveFiles: [],
    },
    activeOptions: {},
    setMemcard: (memcard) => set({ memcard: memcard }),
    setActiveOption: (value, key) =>
      set((state) => {
        state.activeOptions[key] = value
      }),
    setCharacterField: (value, key, saveFileIndex, characterIndex) =>
      set((state) => {
        if (
          !state.memcard.saveFiles[saveFileIndex] ||
          !state.memcard.saveFiles[saveFileIndex].characters
        )
          return

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex][key] = value
      }),
    setCharacterResistance: (value, element, saveFileIndex, characterIndex) =>
      set((state) => {
        if (
          !state.memcard.saveFiles[saveFileIndex] ||
          !state.memcard.saveFiles[saveFileIndex].characters
        )
          return

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex].resistances[element] =
          value
      }),
    setCharacterEquipment: (value, equipment, saveFileIndex, characterIndex) =>
      set((state) => {
        if (
          !state.memcard.saveFiles[saveFileIndex] ||
          !state.memcard.saveFiles[saveFileIndex].characters
        )
          return

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex].equipment[equipment] =
          value
      }),
    setCharacterSpell: (value, index, category, saveFileIndex, characterIndex) =>
      set((state) => {
        if (
          !state.memcard.saveFiles[saveFileIndex] ||
          !state.memcard.saveFiles[saveFileIndex].characters
        )
          return

        const spells =
          state.memcard.saveFiles[saveFileIndex].characters[characterIndex].spells[category]

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex].spells[category] =
          spells.map((id, i) => (i === index ? value : id))
      }),
    setCharacterGrowth: (value, key, saveFileIndex, characterIndex) =>
      set((state) => {
        if (
          !state.memcard.saveFiles[saveFileIndex] ||
          !state.memcard.saveFiles[saveFileIndex].characters
        )
          return

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex].statGrowth[key] = value
      }),
  })),
)

export function getCharacter(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.characterIndex !== undefined && activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].characters![activeOptions.characterIndex]
    : null
}
