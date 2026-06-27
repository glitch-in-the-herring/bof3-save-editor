import { useCharacter } from "../../../store/characterStore"
import {
  equipment,
  equipmentIconMap,
  equipmentLabelMap,
  equipmentSelectMap,
} from "../../../types/equipment"
import Label from "../../shared/Label"

export default function CharacterEquipment() {
  const character = useCharacter((state) => state.character)

  return (
    <div>
      <h3>Equipment</h3>
      <div className="grid grid-cols-2">
        {equipment.map((e) => (
          <Label
            id={`char${equipmentLabelMap[e]}`}
            label={`${equipmentLabelMap[e]}:`}
            icon={`src/assets/items/${equipmentIconMap[e]}.png`}
            key={e}
          >
            {equipmentSelectMap[e]({
              id: `char${equipmentLabelMap[e]}`,
              value: character.equipment ? character.equipment[e] : "",
            })}
          </Label>
        ))}
      </div>
    </div>
  )
}
