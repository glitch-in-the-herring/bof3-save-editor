import type { ChangeEvent } from "react"

import deathIcon from "../../../assets/elements/death.png"
import earthIcon from "../../../assets/elements/earth.png"
import electricIcon from "../../../assets/elements/electric.png"
import fireIcon from "../../../assets/elements/fire.png"
import holyIcon from "../../../assets/elements/holy.png"
import iceIcon from "../../../assets/elements/ice.png"
import psionicIcon from "../../../assets/elements/psionic.png"
import statusIcon from "../../../assets/elements/status.png"
import windIcon from "../../../assets/elements/wind.png"
import { getCharacter, useGlobal } from "../../../store/globalStore"
import { elements, elementsMap, type Element } from "../../../types/element"
import Input from "../../shared/Input"

const elementIconsMap: Record<Element, string> = {
  fire: fireIcon,
  ice: iceIcon,
  electric: electricIcon,
  earth: earthIcon,
  wind: windIcon,
  holy: holyIcon,
  psionic: psionicIcon,
  status: statusIcon,
  death: deathIcon,
}

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
            inputClassName="w-20"
            icon={elementIconsMap[el]}
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
