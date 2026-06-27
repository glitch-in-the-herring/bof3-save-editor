import { create } from "zustand"

import type { Character } from "../types/character"
import { masterModifiers } from "../types/master"
import type { SpellCategory } from "../types/spellCategories"

interface CharacterState {
  character: Character
  spellCategory?: SpellCategory
  setCharacter: (character: Character) => void
  setMaster: (master: number) => void
  setSpellCategory: (category: SpellCategory) => void
  setSpell: (category: SpellCategory, index: number, spell: number) => void
}

export const useCharacter = create<CharacterState>((set) => ({
  character: {},
  setCharacter: (character: Character) => set({ character: character }),
  setMaster: (master) =>
    set((prev) => {
      console.log("Deez Nuts")
      return {
        ...prev,
        character: {
          ...prev.character,
          master: master,
          statGrowth: {
            hp: masterModifiers[master]["hp"],
            ap: masterModifiers[master]["ap"],
            pwr: masterModifiers[master]["pwr"],
            def: masterModifiers[master]["def"],
            agl: masterModifiers[master]["agl"],
            int: masterModifiers[master]["int"],
          },
        },
      }
    }),
  setSpellCategory: (category) => set({ spellCategory: category }),
  setSpell: (category, index, spell) =>
    set((prev) => {
      const spells = prev.character.spells![category]
      spells[index] = spell

      return {
        ...prev,
        character: {
          ...prev.character,
          spells: {
            ...prev.character.spells,
            [category]: spells,
          },
        },
      }
    }),
}))
