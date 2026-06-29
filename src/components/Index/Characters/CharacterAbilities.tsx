import type { ChangeEvent } from "react"

import { useGlobal, getCharacter } from "../../../store/globalStore"
import { spellCategories } from "../../../types/spellCategories"
import SpellSelect from "../SpellSelect"

export default function CharacterAbilities() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const character = getCharacter(activeOptions, memcard)

  return (
    <div>
      <h3>Abilities</h3>
      <select
        value={activeOptions.spellCategory || ""}
        onChange={switchSpellCategoriesHandler}
        disabled={activeOptions.characterIndex === undefined}
      >
        {spellCategories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {activeOptions.characterIndex !== undefined && (
        <ol>
          {[...Array(10).keys()].map((i) => (
            <li key={i}>
              <SpellSelect
                value={
                  activeOptions.spellCategory && character && character.spells
                    ? character.spells[activeOptions.spellCategory][i]
                    : ""
                }
                onChange={(e: ChangeEvent) => switchSpellsHandler(e, i)}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function switchSpellCategoriesHandler(e: ChangeEvent) {
  const target = e.target as HTMLSelectElement

  const setActiveOption = useGlobal.getState().setActiveOption

  setActiveOption(target.value, "spellCategory")
}

function switchSpellsHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex, characterIndex, spellCategory } = useGlobal.getState().activeOptions

  if (!spellCategory || saveFileIndex === undefined || characterIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setCharacterSpell = useGlobal.getState().setCharacterSpell

  setCharacterSpell(Number(target.value), index, spellCategory, saveFileIndex, characterIndex)
}
