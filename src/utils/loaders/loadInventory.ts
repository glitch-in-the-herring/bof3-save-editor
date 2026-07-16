import {
  itemCategories,
  type Inventory,
  type ItemCategory,
  type ItemEntry,
} from "../../types/inventory"
import { bytesToNumber } from "../numbers"

export default function loadInventory(byteArray: Uint8Array) {
  const idBaseAddress = 0xfc
  const quantityBaseAddress = 0x2fc
  const vitalBaseAddress = 0x4fc
  const skillsBaseAddress = 0x51c
  const dragonGenesBaseAddress = 0x5f8
  const mastersBaseAddress = 0x5fc

  let inventory: Inventory = {
    zenny: bytesToNumber(byteArray.slice(0, 4), false),
    items: itemCategories.reduce(
      (prev, cur, i) => {
        const idArray = Array.from(
          byteArray.slice(idBaseAddress + 128 * i, idBaseAddress + 128 * i + 128),
        )
        const quantityArray = Array.from(
          byteArray.slice(quantityBaseAddress + 128 * i, quantityBaseAddress + 128 * i + 128),
        )

        return {
          ...prev,
          [cur]: idArray.map((id, idIdx) => ({
            id: id,
            quantity: quantityArray[idIdx],
          })),
        }
      },
      {} as Record<ItemCategory, ItemEntry[]>,
    ),
    vitalItems: Array.from(byteArray.slice(vitalBaseAddress, vitalBaseAddress + 32)),
    skillNote: Array.from(byteArray.slice(skillsBaseAddress, skillsBaseAddress + 128)),
    dragonGenes: Array.from(byteArray.slice(dragonGenesBaseAddress, dragonGenesBaseAddress + 3)),
    masters: Array.from(byteArray.slice(mastersBaseAddress, mastersBaseAddress + 3)),
  }

  return inventory
}
