import type { ChangeEvent } from "react";
import { useSaveFile } from "../../../store/saveFileStore";
import CharacterAbilities from "./CharacterAbilities";
import CharacterEquipment from "./CharacterEquipment";
import CharacterGrowth from "./CharacterGrowth";
import CharacterResistances from "./CharacterResistances";
import CharacterStats from "./CharacterStats";
import { useCharacter } from "../../../store/characterStore";

export default function CharacterEditor() {
  const saveFile = useSaveFile((state) => state.saveFile)
  const characterIndex = useSaveFile((state) => state.characterIndex)

  return <div>
    <h2>Characters</h2>
    <div>
      <div>
        <label>Character: </label>
        <select 
          value={characterIndex}
          onChange={switchCharactersHandler}
        >
          {
            saveFile.characters && saveFile.characters.map((c, i) => (
              <option key={c.name} value={i}>{c.name}</option>
            ))
          }
        </select>
      </div>
      <div className="grid grid-cols-2 w-300 gap-x-4">
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
}

function switchCharactersHandler(e: ChangeEvent) {
  const target = e.target as HTMLSelectElement
  const index = Number(target.value)

  const saveFile = useSaveFile.getState().saveFile
  const setCharacterIndex = useSaveFile.getState().setCharacterIndex

  const setCharacter = useCharacter.getState().setCharacter


  setCharacterIndex(index)
  setCharacter(saveFile.characters![index])
}