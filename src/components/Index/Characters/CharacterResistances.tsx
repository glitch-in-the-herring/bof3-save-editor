import type { ChangeEvent } from "react"

import { getCharacter, useGlobal } from "../../../store/globalStore"
import { elements, elementsMap, type Element } from "../../../types/element"
import Input from "../../shared/Input"

export default function CharacterResistances() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const character = getCharacter(activeOptions, memcard)

  return (
    <div>
      <h3>Resistances</h3>
      <div className="grid grid-cols-3 gap-x-1">
        {elements.map((el) => (
          <Input
            id={`char${elementsMap[el]}`}
            name={`char${elementsMap[el]}`}
            label={`${elementsMap[el]}:`}
            inputType="number"
            inputClassName="w-1/2"
            icon={`src/assets/elements/${el}.png`}
            value={character ? character.resistances[el] : ""}
            disabled={activeOptions.characterIndex === undefined}
            onChange={(ev: ChangeEvent) => resistanceChangeHandler(ev, el)}
            key={el}
          />
        ))}
      </div>
    </div>
  )
}

function resistanceChangeHandler(e: ChangeEvent, element: Element) {
  const { saveFileIndex, characterIndex } = useGlobal.getState().activeOptions

  if (saveFileIndex === undefined || characterIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setCharacterResistance = useGlobal.getState().setCharacterResistance

  setCharacterResistance(Number(target.value), element, saveFileIndex, characterIndex)
}
