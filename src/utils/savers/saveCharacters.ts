import { statGrowthKeys } from "../../types/character"
import { elements } from "../../types/element"
import { equipment } from "../../types/equipment"
import type { SaveFile } from "../../types/memcard"
import { spellCategories } from "../../types/spellCategories"
import { numberToBytes, byteSafety } from "../numbers"
import { encode } from "../strings"

export default function saveCharacters(byteArray: Uint8Array, saveFile: SaveFile) {
  if (!saveFile.characters) return

  let baseAddress: number

  for (let i = 0; i < 8; i++) {
    let buffer: number[]
    baseAddress = saveFile.address + 0x290 + 0xa4 * i

    buffer = encode(saveFile.characters[i].name)
    for (let j = 0; j < 5; j++) byteArray[baseAddress + j] = buffer[j]

    byteArray[baseAddress + 6] = byteSafety(saveFile.characters[i].level, 1, false)

    buffer = numberToBytes(saveFile.characters[i].exp, 4, false)
    for (let j = 0; j < 4; j++) byteArray[baseAddress + 8 + j] = buffer[j]

    buffer = numberToBytes(saveFile.characters[i].currentHP, 2, false)
    buffer = buffer.concat(numberToBytes(saveFile.characters[i].currentAP, 2, false))
    for (let j = 0; j < 4; j++) byteArray[baseAddress + 20 + j] = buffer[j]

    buffer = numberToBytes(saveFile.characters[i].currentMaxHP, 2, false)
    buffer = buffer.concat(numberToBytes(saveFile.characters[i].currentMaxAP, 2, false))
    for (let j = 0; j < 4; j++) byteArray[baseAddress + 28 + j] = buffer[j]

    buffer = numberToBytes(saveFile.characters[i].trueMaxHP, 2, false)
    buffer = buffer.concat(numberToBytes(saveFile.characters[i].trueMaxAP, 2, false))
    for (let j = 0; j < 4; j++) byteArray[baseAddress + 60 + j] = buffer[j]

    buffer = numberToBytes(saveFile.characters[i].pwr!, 2, false)
    buffer = buffer.concat(numberToBytes(saveFile.characters[i].def, 2, true))
    buffer = buffer.concat(numberToBytes(saveFile.characters[i].agl, 2, true))
    buffer = buffer.concat(numberToBytes(saveFile.characters[i].int, 2, true))
    for (let j = 0; j < 8; j++) byteArray[baseAddress + 64 + j] = buffer[j]

    byteArray[baseAddress + 74] = byteSafety(saveFile.characters[i].willpower, 1, false)
    byteArray[baseAddress + 25] = byteSafety(saveFile.characters[i].fatigue, 1, false)
    byteArray[baseAddress + 27] = byteSafety(saveFile.characters[i].master, 1, false)

    buffer = [
      saveFile.characters[i].surprise,
      saveFile.characters[i].reprisal,
      saveFile.characters[i].critical,
      saveFile.characters[i].dodge,
      saveFile.characters[i].accuracy,
    ]

    for (let j = 0; j < 5; j++) byteArray[baseAddress + 84 + j] = byteSafety(buffer[j], 1, false)

    for (let j = 0; j < elements.length; j++) {
      const element = elements[j]
      byteArray[baseAddress + 75 + j] = byteSafety(
        saveFile.characters[i].resistances[element],
        1,
        false,
      )
    }

    for (let j = 0; j < equipment.length; j++) {
      const eq = equipment[j]
      byteArray[baseAddress + 14 + j] = byteSafety(saveFile.characters[i].equipment[eq], 1, false)
    }

    for (let j = 0; j < spellCategories.length; j++) {
      const spellCategory = spellCategories[j]
      for (let k = 0; k < 10; k++)
        byteArray[baseAddress + 92 + j * 10 + k] = byteSafety(
          saveFile.characters[i].spells[spellCategory][k],
          1,
          false,
        )
    }

    byteArray[baseAddress + 132] = saveFile.characters[i].apprenticingLevel

    for (let j = 0; j < statGrowthKeys.length; j++) {
      byteArray[baseAddress + 133 + j] = byteSafety(
        saveFile.characters[i].statGrowth[statGrowthKeys[j]],
        1,
        true,
      )
    }
  }
}
