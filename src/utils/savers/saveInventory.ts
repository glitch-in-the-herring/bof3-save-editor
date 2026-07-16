import { itemCategories } from "../../types/inventory"
import type { SaveFile } from "../../types/memcard"
import { byteSafety, numberToBytes } from "../numbers"

export default function saveInventory(byteArray: Uint8Array, saveFile: SaveFile) {
  const baseAddress = saveFile.address + 0x878
  const idBaseAddress = baseAddress + 0xfc
  const quantityBaseAddress = baseAddress + 0x2fc
  const vitalBaseAddress = baseAddress + 0x4fc
  const skillsBaseAddress = baseAddress + 0x51c
  const dragonGenesBaseAddress = baseAddress + 0x5f8
  const mastersBaseAddress = baseAddress + 0x5fc

  let buffer = numberToBytes(saveFile.inventory.zenny, 4, false)
  for (let i = 0; i < 4; i++) byteArray[baseAddress + i] = buffer[i]

  for (let i = 0; i < itemCategories.length; i++) {
    for (let j = 0; j < 128; j++) {
      byteArray[idBaseAddress + 128 * i + j] = byteSafety(
        saveFile.inventory.items[itemCategories[i]][j].id,
        1,
        false,
      )
      byteArray[quantityBaseAddress + 128 * i + j] = byteSafety(
        saveFile.inventory.items[itemCategories[i]][j].quantity,
        1,
        false,
      )
    }
  }

  for (let i = 0; i < 32; i++)
    byteArray[vitalBaseAddress + i] = byteSafety(saveFile.inventory.vitalItems[i], 1, false)

  for (let i = 0; i < 128; i++)
    byteArray[skillsBaseAddress + i] = byteSafety(saveFile.inventory.skillNote[i], 1, false)

  for (let i = 0; i < 3; i++)
    byteArray[dragonGenesBaseAddress + i] = byteSafety(saveFile.inventory.dragonGenes[i], 1, false)

  for (let i = 0; i < 3; i++) {
    byteArray[mastersBaseAddress + i] = byteSafety(saveFile.inventory.masters[i], 1, false)
    byteArray[mastersBaseAddress + i + 3] = byteSafety(saveFile.inventory.masters[i], 1, false)
  }
}
