import type { ChangeEvent } from "react"

import { useGlobal } from "../../../store/globalStore"
import CharacterAbilities from "./CharacterAbilities"
import CharacterEquipment from "./CharacterEquipment"
import CharacterGrowth from "./CharacterGrowth"
import CharacterResistances from "./CharacterResistances"
import CharacterStats from "./CharacterStats"

export default function CharacterEditor() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)

  return (
    <div>
      <h2>Characters</h2>
      <div>
        <div>
          <label>Character: </label>
          <select
            value={activeOptions.characterIndex !== undefined ? activeOptions.characterIndex : ""}
            disabled={activeOptions.characterIndex === undefined}
            onChange={switchCharactersHandler}
          >
            {activeOptions.characterIndex !== undefined &&
              activeOptions.saveFileIndex !== undefined &&
              memcard.saveFiles[activeOptions.saveFileIndex].characters!.map((c, i) => (
                <option key={c.name} value={i}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid w-9/12 grid-cols-2 gap-x-4">
          <CharacterStats />
          <div className="grid grid-rows-2 gap-y-4">
            <CharacterResistances />
            <CharacterEquipment />
          </div>
          <CharacterAbilities />
          <CharacterGrowth />
        </div>
      </div>
    </div>
  )
}

function switchCharactersHandler(e: ChangeEvent) {
  const target = e.target as HTMLSelectElement
  const index = Number(target.value)

  const setActiveOption = useGlobal.getState().setActiveOption

  setActiveOption(index, "characterIndex")
}
