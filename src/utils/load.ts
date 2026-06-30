import { statGrowthKeys, type Character, type StatGrowthKey } from "../types/character"
import { elements, type Element } from "../types/element"
import { equipment, type Equipment } from "../types/equipment"
import { fish, type Fish, type Fishing } from "../types/fishing"
import { formationCategories, type Formation } from "../types/formations"
import {
  itemCategories,
  type Inventory,
  type ItemCategory,
  type ItemEntry,
} from "../types/inventory"
import type { SaveFile } from "../types/memcard"
import { spellCategories, type SpellCategory } from "../types/spellCategories"
import { bytesToNumber } from "./numbers"
import { decode } from "./strings"

export function loadSaveFile(byteArray: Uint8Array, address: number) {
  let saveFile: SaveFile = {
    address: address,
    characters: loadCharacters(byteArray.slice(address + 0x290, address + 0x7b0)),
    inventory: loadInventory(byteArray.slice(address + 0x878, address + 0xe9f)),
    formations: loadFormations(byteArray.slice(address + 0x882, address + 0x888)),
    fishing: loadFishing(byteArray.slice(address + 0x90c, address + 0x924)),
  }

  return saveFile
}

function loadCharacters(byteArray: Uint8Array) {
  let characters: Character[] = []

  for (let i = 0; i < 8; i++) {
    const baseAddress = 0xa4 * i
    const character: Character = {
      name: decode(byteArray.slice(baseAddress, baseAddress + 5)),
      lvl: byteArray[baseAddress + 6],
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

function loadInventory(byteArray: Uint8Array) {
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

function loadFormations(byteArray: Uint8Array) {
  let formation: Formation = {
    battle: [],
    field: [],
  }

  for (let i = 0; i < formationCategories.length; i++) {
    formation[formationCategories[i]] = Array.from(byteArray.slice(i * 3, i * 3 + 3))
  }

  return formation
}

function loadFishing(byteArray: Uint8Array) {
  let fishing: Fishing = {
    lengths: Array.from(byteArray).reduce(
      (prev, cur, i) => ({
        ...prev,
        [fish[i]]: cur,
      }),
      {} as Record<Fish, number>,
    ),
  }

  return fishing
}
