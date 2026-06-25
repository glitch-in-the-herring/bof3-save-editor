import { equipment, equipmentIconMap, equipmentLabelMap } from "../../../types/equipment";
import Input from "../Input";

export default function CharacterEquipment() {
  return <div>
    <h3>Equipment</h3>
    <div className="grid grid-cols-2">
      {equipment.map((e) => (
        <Input
          id={`char${equipmentLabelMap[e]}`}
          name={`char${equipmentLabelMap[e]}`}
          label={`${equipmentLabelMap[e]}:`}
          inputType="number"
          inputClassName="w-1/2"
          icon={`src/assets/items/${equipmentIconMap[e]}.png`}
          key={e}
        />
      ))}
    </div>
  </div>
}