import type { ChangeEvent } from "react"

import { getCharacter, useGlobal } from "../../../store/globalStore"
import { characterNumberFields, type Character } from "../../../types/character"
import Input from "../../shared/Input"

export default function CharacterStats() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const character = getCharacter(activeOptions, memcard)

  return (
    <div>
      <h3>Stats</h3>
      <div className="grid grid-cols-2 gap-x-1">
        <Input
          id="charName"
          name="charName"
          label="Name:"
          inputType="text"
          divClassName="flex flex-row gap-1 col-span-2"
          inputClassName="w-1/4"
          value={character ? character.name : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "name")}
        />
        <Input
          id="charLvl"
          name="charLvl"
          label="Level:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.level : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "level")}
        />
        <Input
          id="charEXP"
          name="charEXP"
          label="EXP:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.exp : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "exp")}
        />
        <Input
          id="charCurrentHP"
          name="charCurrentHP"
          label="Current HP:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.currentHP : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "currentHP")}
        />
        <Input
          id="charCurrentAP"
          name="charCurrentAP"
          label="Current AP:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.currentAP : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "currentAP")}
        />
        <Input
          id="charCurrentMaxHP"
          name="charCurrentMaxHP"
          label="Current Max HP:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.currentMaxHP : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "currentMaxHP")}
        />
        <Input
          id="charCurrentMaxAP"
          name="charCurrentMaxAP"
          label="Current Max AP:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.currentMaxAP : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "currentMaxAP")}
        />
        <Input
          id="charTrueMaxHP"
          name="charTrueMaxHP"
          label="True Max HP:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.trueMaxHP : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "trueMaxHP")}
        />
        <Input
          id="charTrueMaxAP"
          name="charTrueMaxAP"
          label="True Max AP:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.trueMaxAP : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "trueMaxAP")}
        />
        <Input
          id="charBasePWR"
          name="charBasePWR"
          label="Base PWR:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.pwr : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "pwr")}
        />
        <Input
          id="charBaseINT"
          name="charBaseINT"
          label="Base INT:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.int : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "int")}
        />
        <Input
          id="charBaseDEF"
          name="charBaseDEF"
          label="Base DEF:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.def : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "def")}
        />
        <Input
          id="charBaseAGL"
          name="charBaseAGL"
          label="Base AGL:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.agl : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "agl")}
        />
        <Input
          id="charBaseWillpower"
          name="charBaseWillpower"
          label="Base Willpower:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.willpower : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "willpower")}
        />
        <Input
          id="charBaseSurprise"
          name="charBaseSurprise"
          label="Base Surprise:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.surprise : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "surprise")}
        />
        <Input
          id="charBaseReprisal"
          name="charBaseReprisal"
          label="Base Reprisal:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.reprisal : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "reprisal")}
        />
        <Input
          id="charBaseCritical"
          name="charBaseCritical"
          label="Base Critical:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.critical : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "critical")}
        />
        <Input
          id="charBaseDodge"
          name="charBaseDodge"
          label="Base Dodge:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.dodge : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "dodge")}
        />
        <Input
          id="charBaseAccuracy"
          name="charBaseAccuracy"
          label="Base Accuracy:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.accuracy : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "accuracy")}
        />
        <Input
          id="charFatigue"
          name="charFatigue"
          label="Fatigue:"
          inputType="number"
          inputClassName="w-20"
          value={character ? character.fatigue : ""}
          disabled={activeOptions.characterIndex === undefined}
          onChange={(e: ChangeEvent) => statChangeHandler(e, "fatigue")}
        />
      </div>
    </div>
  )
}

function statChangeHandler(e: ChangeEvent, key: keyof Character) {
  const { saveFileIndex, characterIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined || characterIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setCharacterField = useGlobal.getState().setCharacterField

  if (characterNumberFields.includes(key))
    setCharacterField(Number(target.value), key, saveFileIndex, characterIndex)
  else setCharacterField(target.value, key, saveFileIndex, characterIndex)
}
