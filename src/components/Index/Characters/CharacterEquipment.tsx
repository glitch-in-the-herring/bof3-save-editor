import type { ChangeEvent } from "react"

import accessoryIcon from "../../../assets/items/accessory.png"
import armorIcon from "../../../assets/items/armor.png"
import helmIcon from "../../../assets/items/helm.png"
import shieldIcon from "../../../assets/items/shield.png"
import weaponIcon from "../../../assets/items/weapon.png"
import { useGlobal, getCharacter } from "../../../store/globalStore"
import {
  equipment,
  equipmentLabelMap,
  equipmentSelectMap,
  type Equipment,
} from "../../../types/equipment"
import Label from "../../shared/Label"

const equipmentIconMap: Record<Equipment, string> = {
  weapon: weaponIcon,
  shield: shieldIcon,
  helm: helmIcon,
  armor: armorIcon,
  accessory1: accessoryIcon,
  accessory2: accessoryIcon,
}

export default function CharacterEquipment() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const character = getCharacter(activeOptions, memcard)

  return (
    <div>
      <h3>Equipment</h3>
      <div className="grid grid-cols-2">
        {equipment.map((eq) => (
          <Label
            id={`char${equipmentLabelMap[eq]}`}
            label={`${equipmentLabelMap[eq]}:`}
            icon={equipmentIconMap[eq]}
            key={eq}
          >
            {equipmentSelectMap[eq]({
              id: `char${equipmentLabelMap[eq]}`,
              value: character ? character.equipment[eq] : "",
              disabled: activeOptions.characterIndex === undefined,
              onChange: (ev: ChangeEvent) => equipmentChangeHandler(ev, eq),
            })}
          </Label>
        ))}
      </div>
    </div>
  )
}

function equipmentChangeHandler(e: ChangeEvent, equipment: Equipment) {
  const { saveFileIndex, characterIndex } = useGlobal.getState().activeOptions

  if (saveFileIndex === undefined || characterIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setCharacterEquipment = useGlobal.getState().setCharacterEquipment

  setCharacterEquipment(Number(target.value), equipment, saveFileIndex, characterIndex)
}
