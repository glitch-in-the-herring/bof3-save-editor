import { useCharacter } from "../../../store/characterStore"
import Input from "../Input"

export default function CharacterStats() {
  const character = useCharacter((state) => state.character)

  return (
    <div>
      <h3>Stats</h3>
      <div className="grid grid-cols-2 gap-x-1">
        <Input
          id="charName"
          name="charName"
          label="Name:"
          inputType="text"
          divClassName="col-span-2"
          inputClassName="w-1/2"
          value={character.name}
        />
        <Input
          id="charLvl"
          name="charLvl"
          label="Level:"
          inputType="number"
          value={character.lvl}
        />
        <Input id="charEXP" name="charEXP" label="EXP:" inputType="number" value={character.exp} />
        <Input
          id="charCurHP"
          name="charCurHP"
          label="Current HP:"
          inputType="number"
          value={character.currentHP}
        />
        <Input
          id="charCurAP"
          name="charCurAP"
          label="Current AP:"
          inputType="number"
          value={character.currentAP}
        />
        <Input
          id="charCurMaxHP"
          name="charCurMaxHP"
          label="Current Max HP:"
          inputType="number"
          value={character.currentMaxHP}
        />
        <Input
          id="charCurMaxAP"
          name="charCurMaxAP"
          label="Current Max AP:"
          inputType="number"
          value={character.currentMaxAP}
        />
        <Input
          id="charTrueMaxHP"
          name="charTrueMaxHP"
          label="True Max HP:"
          inputType="number"
          value={character.trueMaxHP}
        />
        <Input
          id="charTrueMaxAP"
          name="charTrueMaxAP"
          label="True Max AP:"
          inputType="number"
          value={character.trueMaxAP}
        />
        <Input
          id="charBasePWR"
          name="charBasePWR"
          label="Base PWR:"
          inputType="number"
          value={character.pwr}
        />
        <Input
          id="charBaseINT"
          name="charBaseINT"
          label="Base INT:"
          inputType="number"
          value={character.int}
        />
        <Input
          id="charBaseDEF"
          name="charBaseDEF"
          label="Base DEF:"
          inputType="number"
          value={character.def}
        />
        <Input
          id="charBaseAGL"
          name="charBaseAGL"
          label="Base AGL:"
          inputType="number"
          value={character.agl}
        />
        <Input
          id="charBaseWillpower"
          name="charBaseWillpower"
          label="Base Willpower:"
          inputType="number"
          value={character.willpower}
        />
        <Input
          id="charBaseSurprise"
          name="charBaseSurprise"
          label="Base Surprise:"
          inputType="number"
          value={character.surprise}
        />
        <Input
          id="charBaseReprisal"
          name="charBaseReprisal"
          label="Base Reprisal:"
          inputType="number"
          value={character.reprisal}
        />
        <Input
          id="charBaseCritical"
          name="charBaseCritical"
          label="Base Critical:"
          inputType="number"
          value={character.critical}
        />
        <Input
          id="charBaseDodge"
          name="charBaseDodge"
          label="Base Dodge:"
          inputType="number"
          value={character.dodge}
        />
        <Input
          id="charBaseAccuracy"
          name="charBaseAccuracy"
          label="Base Accuracy:"
          inputType="number"
          value={character.accuracy}
        />
        <Input
          id="charFatigue"
          name="charFatigue"
          label="Fatigue:"
          inputType="number"
          value={character.fatigue}
        />
      </div>
    </div>
  )
}
