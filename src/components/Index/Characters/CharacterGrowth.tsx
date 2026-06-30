import type { ChangeEvent } from "react"

import { getCharacter, useGlobal } from "../../../store/globalStore"
import type { StatGrowthKey } from "../../../types/character"
import Input from "../../shared/Input"
import Label from "../../shared/Label"
import MastersSelect from "../MastersSelect"

export default function CharacterGrowth() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const character = getCharacter(activeOptions, memcard)

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
          value={character ? character.statGrowth["hp"] : ""}
          onChange={(e: ChangeEvent) => statGrowthChangeHandler(e, "hp")}
          disabled={activeOptions.characterIndex === undefined}
        />
        <Input
          id="charAPGrowth"
          name="charAPGrowth"
          label="AP increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character ? character.statGrowth["ap"] : ""}
          onChange={(e: ChangeEvent) => statGrowthChangeHandler(e, "ap")}
          disabled={activeOptions.characterIndex === undefined}
        />
        <Input
          id="charPWRGrowth"
          name="charPWRGrowth"
          label="PWR increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character ? character.statGrowth["pwr"] : ""}
          onChange={(e: ChangeEvent) => statGrowthChangeHandler(e, "pwr")}
          disabled={activeOptions.characterIndex === undefined}
        />
        <Input
          id="charDEFGrowth"
          name="charDEFGrowth"
          label="DEF increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character ? character.statGrowth["def"] : ""}
          onChange={(e: ChangeEvent) => statGrowthChangeHandler(e, "def")}
          disabled={activeOptions.characterIndex === undefined}
        />
        <Input
          id="charAGLGrowth"
          name="charAGLGrowth"
          label="AGL increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character ? character.statGrowth["agl"] : ""}
          onChange={(e: ChangeEvent) => statGrowthChangeHandler(e, "agl")}
          disabled={activeOptions.characterIndex === undefined}
        />
        <Input
          id="charINTGrowth"
          name="charINTGrowth"
          label="INT increase:"
          inputType="number"
          inputClassName="w-1/2"
          value={character ? character.statGrowth["int"] : ""}
          onChange={(e: ChangeEvent) => statGrowthChangeHandler(e, "int")}
          disabled={activeOptions.characterIndex === undefined}
        />
        <Input
          id="charStartLvl"
          name="charStartLvl"
          label="Apprenticing level:"
          value={character ? character.apprenticingLevel : ""}
          inputType="number"
          inputClassName="w-1/2"
          onChange={startLvlChangeHandler}
          disabled={activeOptions.characterIndex === undefined}
        />
        <Label id="charMaster" label="Master:">
          <MastersSelect
            id="charMaster"
            value={character ? character.master : ""}
            disabled={activeOptions.characterIndex === undefined}
            onChange={switchMastersHandler}
          />
        </Label>
      </div>
    </div>
  )
}

function switchMastersHandler(e: ChangeEvent) {
  const target = e.target as HTMLSelectElement
  const { saveFileIndex, characterIndex } = useGlobal.getState().activeOptions

  if (saveFileIndex === undefined || characterIndex === undefined) return

  const setCharacterField = useGlobal.getState().setCharacterField
  setCharacterField(Number(target.value), "master", saveFileIndex, characterIndex)
}

function statGrowthChangeHandler(e: ChangeEvent, key: StatGrowthKey) {
  const { saveFileIndex, characterIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined || characterIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setCharacterGrowth = useGlobal.getState().setCharacterGrowth

  setCharacterGrowth(Number(target.value), key, saveFileIndex, characterIndex)
}

function startLvlChangeHandler(e: ChangeEvent) {
  const { saveFileIndex, characterIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined || characterIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setCharacterField = useGlobal.getState().setCharacterField

  setCharacterField(Number(target.value), "apprenticingLevel", saveFileIndex, characterIndex)
}
