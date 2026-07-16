import { statGrowthKeys, type Character, type StatGrowthKey } from "../../types/character"
import { elements, type Element } from "../../types/element"
import { equipment, type Equipment } from "../../types/equipment"
import { spellCategories, type SpellCategory } from "../../types/spellCategories"
import { bytesToNumber } from "../numbers"
import { decode } from "../strings"

export default function loadCharacters(byteArray: Uint8Array) {
  let characters: Character[] = []

  for (let i = 0; i < 8; i++) {
    const baseAddress = 0xa4 * i
    const character: Character = {
      name: decode(byteArray.slice(baseAddress, baseAddress + 5)),
      level: byteArray[baseAddress + 6],
      exp: bytesToNumber(byteArray.slice(baseAddress + 8, baseAddress + 12), false),
      currentHP: bytesToNumber(byteArray.slice(baseAddress + 20, baseAddress + 22), false),
      currentAP: bytesToNumber(byteArray.slice(baseAddress + 22, baseAddress + 24), false),
      currentMaxHP: bytesToNumber(byteArray.slice(baseAddress + 28, baseAddress + 30), false),
      currentMaxAP: bytesToNumber(byteArray.slice(baseAddress + 30, baseAddress + 32), false),
      trueMaxHP: bytesToNumber(byteArray.slice(baseAddress + 60, baseAddress + 62), false),
      trueMaxAP: bytesToNumber(byteArray.slice(baseAddress + 62, baseAddress + 64), false),
      pwr: bytesToNumber(byteArray.slice(baseAddress + 64, baseAddress + 66), false),
      def: bytesToNumber(byteArray.slice(baseAddress + 66, baseAddress + 68), false),
      agl: bytesToNumber(byteArray.slice(baseAddress + 68, baseAddress + 70), false),
      int: bytesToNumber(byteArray.slice(baseAddress + 70, baseAddress + 72), false),
      willpower: byteArray[baseAddress + 74],
      surprise: byteArray[baseAddress + 84],
      reprisal: byteArray[baseAddress + 85],
      critical: byteArray[baseAddress + 86],
      dodge: byteArray[baseAddress + 87],
      accuracy: byteArray[baseAddress + 88],
      fatigue: byteArray[baseAddress + 25],
      apprenticingLevel: byteArray[baseAddress + 132],
      master: byteArray[baseAddress + 27],
      resistances: elements.reduce(
        (prev, cur, i) => ({
          ...prev,
          [cur]: byteArray[baseAddress + 75 + i],
        }),
        {} as Record<Element, number>,
      ),
      equipment: equipment.reduce(
        (prev, cur, i) => ({
          ...prev,
          [cur]: byteArray[baseAddress + 14 + i],
        }),
        {} as Record<Equipment, number>,
      ),
      statGrowth: statGrowthKeys.reduce(
        (prev, cur, i) => ({
          ...prev,
          [cur]: byteArray[baseAddress + 133 + i],
        }),
        {} as Record<StatGrowthKey, number>,
      ),
      spells: spellCategories.reduce(
        (prev, cur, i) => ({
          ...prev,
          [cur]: Array.from(
            byteArray.slice(baseAddress + 92 + i * 10, baseAddress + 92 + i * 10 + 10),
          ),
        }),
        {} as Record<SpellCategory, number[]>,
      ),
    }

    characters.push(character)
  }

  return characters
}
