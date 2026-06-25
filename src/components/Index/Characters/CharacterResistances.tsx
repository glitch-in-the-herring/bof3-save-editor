import { useCharacter } from "../../../store/characterStore"
import { elements, elementsMap } from "../../../types/element"
import Input from "../Input"

export default function CharacterResistances() {
  const character = useCharacter((state) => state.character)

  return (
    <div>
      <h3>Resistances</h3>
      <div className="grid grid-cols-3 gap-x-1">
        {elements.map((e) => (
          <Input
            id={`char${elementsMap[e]}`}
            name={`char${elementsMap[e]}`}
            label={`${elementsMap[e]}:`}
            inputType="number"
            inputClassName="w-1/2"
            icon={`src/assets/elements/${e}.png`}
            value={character.resistances ? character.resistances[e] : ""}
            key={e}
          />
        ))}
      </div>
    </div>
  )
}
