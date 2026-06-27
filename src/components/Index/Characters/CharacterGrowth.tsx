import type { ChangeEvent } from "react"

import { useCharacter } from "../../../store/characterStore"
import Input from "../../shared/Input"
import Label from "../../shared/Label"
import MastersSelect from "../MastersSelect"

export default function CharacterGrowth() {
  const character = useCharacter((state) => state.character)
  console.log("RERENDER")
  console.log(character.master)

  return (
    <div>
      <h3>Stat Growth Modifier</h3>
      <div className="grid grid-cols-2">
        <Input
          id="charHPGrowth"
          name="charHPGrowth"
          label="HP increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character.statGrowth ? character.statGrowth["hp"] : ""}
        />
        <Input
          id="charAPGrowth"
          name="charAPGrowth"
          label="AP increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character.statGrowth ? character.statGrowth["ap"] : ""}
        />
        <Input
          id="charPWRGrowth"
          name="charPWRGrowth"
          label="PWR increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character.statGrowth ? character.statGrowth["pwr"] : ""}
        />
        <Input
          id="charDEFGrowth"
          name="charDEFGrowth"
          label="DEF increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character.statGrowth ? character.statGrowth["def"] : ""}
        />
        <Input
          id="charAGLGrowth"
          name="charAGLGrowth"
          label="AGL increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character.statGrowth ? character.statGrowth["agl"] : ""}
        />
        <Input
          id="charINTGrowth"
          name="charINTGrowth"
          label="INT increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character.statGrowth ? character.statGrowth["int"] : ""}
        />
        <Input
          id="charStartLvl"
          name="charStartLvl"
          label="Apprenticing level:"
          value={character.apprenticingLevel}
          inputType="number"
          inputClassName="w-1/2"
        />
        <Label id="charMaster" label="Master:">
          <MastersSelect
            id="charMaster"
            value={character.master !== undefined ? character.master : ""}
            onChange={switchMastersHandler}
          />
        </Label>
      </div>
    </div>
  )
}

function switchMastersHandler(e: ChangeEvent) {
  const target = e.target as HTMLSelectElement

  const setMaster = useCharacter.getState().setMaster
  setMaster(Number(target.value))
}
