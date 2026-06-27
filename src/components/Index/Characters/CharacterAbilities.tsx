import type { ChangeEvent } from "react"

import { useCharacter } from "../../../store/characterStore"
import { spellCategories } from "../../../types/spellCategories"
import SpellSelect from "../SpellSelect"

export default function CharacterAbilities() {
  const character = useCharacter((state) => state.character)
  const spellCategory = useCharacter((state) => state.spellCategory)

  return (
    <div>
      <h3>Abilities</h3>
      <select value={spellCategory || ""} onChange={switchSpellCategoriesHandler}>
        {spellCategories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <ol>
        {[...Array(10).keys()].map((i) => (
          <li key={i}>
            <SpellSelect
              value={spellCategory && character.spells ? character.spells[spellCategory][i] : ""}
              onChange={(e: ChangeEvent) => switchSpellsHandler(e, i)}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}

function switchSpellCategoriesHandler(e: ChangeEvent) {
  const target = e.target as HTMLSelectElement

  const setSpellCategory = useCharacter.getState().setSpellCategory

  setSpellCategory(target.value)
}

function switchSpellsHandler(e: ChangeEvent, index: number) {
  const target = e.target as HTMLSelectElement

  const spellCategory = useCharacter.getState().spellCategory
  if (!spellCategory) return

  const setSpell = useCharacter.getState().setSpell

  setSpell(spellCategory, index, Number(target.value))
}
