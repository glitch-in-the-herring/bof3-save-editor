import { useGlobal } from "../store/globalStore"
import { statGrowthKeys } from "../types/character"
import { clockKeys } from "../types/clock"
import { countdownCategories } from "../types/counters"
import { elements } from "../types/element"
import { equipment } from "../types/equipment"
import { fish } from "../types/fishing"
import { itemCategories } from "../types/inventory"
import type { SaveFile } from "../types/memcard"
import { axisKeys } from "../types/position"
import { spellCategories } from "../types/spellCategories"
import { byteSafety, numberToBytes } from "./numbers"
import { encode } from "./strings"

export function saveMemcard() {
  const memcard = useGlobal.getState().memcard
  const byteArray = useGlobal.getState().byteArray
  const filename = useGlobal.getState().filename

  if (!byteArray) return
  const tmpByteArray = byteArray.slice()

  for (const saveFile of memcard.saveFiles) {
    saveMeta(tmpByteArray, saveFile)
    saveCharacters(tmpByteArray, saveFile)
    saveInventory(tmpByteArray, saveFile)
    saveFormations(tmpByteArray, saveFile)
    saveFishing(tmpByteArray, saveFile)
    saveCounters(tmpByteArray, saveFile)
    savePosition(tmpByteArray, saveFile)
    saveFaerieVillage(tmpByteArray, saveFile)

    checksum(tmpByteArray, saveFile.address)
  }

  const outputFile = new File([tmpByteArray], filename!)
  const link = document.createElement("a")
  link.href = window.URL.createObjectURL(outputFile)
  link.download = filename!
  link.click()
}

function saveMeta(byteArray: Uint8Array, saveFile: SaveFile) {
  const metaBaseAdddress = saveFile.address + 0xea0

  let buffer = encode(saveFile.meta.name)
  for (let i = 0; i < 5; i++) byteArray[metaBaseAdddress + i] = byteSafety(buffer[i], 1, false)

  for (let i = 0; i < 3; i++)
    byteArray[metaBaseAdddress + 5 + i] = byteSafety(saveFile.meta.portraits[i], 1, false)

  byteArray[metaBaseAdddress + 8] = byteSafety(saveFile.meta.level, 1, false)

  for (let i = 0; i < clockKeys.length; i++) {
    byteArray[metaBaseAdddress + 12 + i] = byteSafety(
      saveFile.meta.playTime[clockKeys[i]],
      1,
      false,
    )
  }

  buffer = numberToBytes(saveFile.meta.exp, 4, false)
  for (let i = 0; i < 4; i++) byteArray[metaBaseAdddress + 16 + i] = byteSafety(buffer[i], 1, false)
}

function saveCharacters(byteArray: Uint8Array, saveFile: SaveFile) {
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

function saveInventory(byteArray: Uint8Array, saveFile: SaveFile) {
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

function saveFormations(byteArray: Uint8Array, saveFile: SaveFile) {
  const baseAddress = saveFile.address + 0x880
  const orderingBaseAddress = baseAddress + 2

  byteArray[baseAddress] = byteSafety(saveFile.party.activeFormation, 1, false)
  byteArray[baseAddress + 1] = byteSafety(saveFile.party.unlockedFormations, 1, false)

  for (let i = 0; i < 3; i++) {
    byteArray[orderingBaseAddress + i] = byteSafety(saveFile.party.orderings["field"][i], 1, false)
    byteArray[orderingBaseAddress + i + 3] = byteSafety(
      saveFile.party.orderings["battle"][i],
      1,
      false,
    )
  }
}

function saveFishing(byteArray: Uint8Array, saveFile: SaveFile) {
  const baseAddress = saveFile.address + 0x90c

  for (let i = 0; i < fish.length; i++) {
    byteArray[baseAddress + i] = byteSafety(saveFile.fishing.lengths[fish[i]], 1, false)
  }
}

function saveCounters(byteArray: Uint8Array, saveFile: SaveFile) {
  const playtimeBaseAddress = saveFile.address + 0x8e8
  const countdownsBaseAddress = saveFile.address + 0xe7c

  for (let i = 0; i < clockKeys.length; i++) {
    byteArray[playtimeBaseAddress + i] = byteSafety(
      saveFile.counters.playTime[clockKeys[i]],
      1,
      false,
    )
  }

  for (let i = 0; i < countdownCategories.length; i++) {
    for (let j = 0; j < clockKeys.length; j++) {
      byteArray[countdownsBaseAddress + i * 4 + j] = byteSafety(
        saveFile.counters.countdowns[countdownCategories[i]][clockKeys[j]],
        1,
        false,
      )
    }
  }
}

function savePosition(byteArray: Uint8Array, saveFile: SaveFile) {
  const baseAddress = saveFile.address + 0x224

  byteArray[baseAddress] = saveFile.position.area

  for (let i = 0; i < axisKeys.length; i++) {
    const buffer = numberToBytes(saveFile.position.x[axisKeys[i]], 2, false)
    for (let j = 0; j < 2; j++) {
      byteArray[baseAddress + 4 + i * 2 + j] = buffer[j]
    }
  }

  for (let i = 0; i < axisKeys.length; i++) {
    const buffer = numberToBytes(saveFile.position.y[axisKeys[i]], 2, false)
    for (let j = 0; j < 2; j++) {
      byteArray[baseAddress + 8 + i * 2 + j] = buffer[j]
    }
  }
}

function saveFaerieVillage(byteArray: Uint8Array, saveFile: SaveFile) {
  const stageBaseAddress = saveFile.address + 0x86e
  const foodBaseAddress = saveFile.address + 0xeea
  const maxJobsBaseAddress = saveFile.address + 0xeeb
  const cultureBaseAddress = saveFile.address + 0xeec
  const huntingCountBaseAddress = saveFile.address + 0xedc
  const scholarCountBaseAddress = saveFile.address + 0xee0
  const constructionCountBaseAddress = saveFile.address + 0xed0
  const powerBaseAddress = saveFile.address + 0xeed
  const realBaseAddress = saveFile.address + 0xef0
  const roomsBaseAddress = realBaseAddress + 0x1e0
  const namesBaseAddress = realBaseAddress + 0x220

  for (let i = 0; i < 2; i++)
    byteArray[stageBaseAddress + i] = byteSafety(saveFile.faerieVillage.stage[i], 1, false)

  byteArray[foodBaseAddress] = byteSafety(saveFile.faerieVillage.food, 1, false)
  byteArray[foodBaseAddress] = byteSafety(saveFile.faerieVillage.food, 1, false)
  byteArray[maxJobsBaseAddress] = byteSafety(saveFile.faerieVillage.maxJobs, 1, false)
  byteArray[cultureBaseAddress] = byteSafety(saveFile.faerieVillage.culture, 1, false)

  let buffer: number[]
  buffer = numberToBytes(saveFile.faerieVillage.battleCounts.huntingBattleCount, 4, false)

  for (let i = 0; i < 4; i++) {
    byteArray[huntingCountBaseAddress + i] = buffer[i]
  }

  buffer = numberToBytes(saveFile.faerieVillage.battleCounts.scholarBattleCount, 4, false)

  for (let i = 0; i < 4; i++) {
    byteArray[scholarCountBaseAddress + i] = buffer[i]
  }

  buffer = numberToBytes(saveFile.faerieVillage.battleCounts.constructionBattleCounter, 4, false)

  for (let i = 0; i < 4; i++) {
    byteArray[constructionCountBaseAddress + i] = buffer[i]
  }

  byteArray[powerBaseAddress] = saveFile.faerieVillage.constructionPowers.clearPower
  byteArray[powerBaseAddress + 1] = saveFile.faerieVillage.constructionPowers.buildPower

  for (let i = 0; i < 60; i++) {
    byteArray[realBaseAddress + i * 8] = byteSafety(
      saveFile.faerieVillage.faerieJobs[i].status,
      1,
      false,
    )
    byteArray[realBaseAddress + i * 8 + 1] = byteSafety(
      saveFile.faerieVillage.faerieJobs[i].room,
      1,
      false,
    )
    byteArray[realBaseAddress + i * 8 + 2] = byteSafety(
      saveFile.faerieVillage.faerieJobs[i].jobData[0],
      1,
      false,
    )
    byteArray[realBaseAddress + i * 8 + 3] = byteSafety(
      saveFile.faerieVillage.faerieJobs[i].jobData[1],
      1,
      false,
    )

    let buffer = numberToBytes(saveFile.faerieVillage.faerieJobs[i].battles, 4, false)
    for (let j = 0; j < 4; j++) {
      byteArray[realBaseAddress + i * 8 + 4 + j] = buffer[j]
    }

    if (saveFile.faerieVillage.faerieNames[i] === "") {
      for (let j = 0; j < 5; j++) {
        byteArray[namesBaseAddress + i * 5 + j] = 0
      }
      continue
    }

    buffer = encode(saveFile.faerieVillage.faerieNames[i])
    for (let j = 0; j < 5; j++) {
      if (buffer[j] === 0) {
        byteArray[roomsBaseAddress + i * 8 + 4 + j] = 0xff
        continue
      }

      byteArray[namesBaseAddress + i * 5 + j] = buffer[j]
    }
  }

  for (let i = 0; i < 8; i++) {
    byteArray[roomsBaseAddress + i * 8] = byteSafety(
      saveFile.faerieVillage.faerieRooms[i].type,
      1,
      false,
    )
    byteArray[roomsBaseAddress + i * 8 + 1] = byteSafety(
      saveFile.faerieVillage.faerieRooms[i].subtype,
      1,
      false,
    )
    byteArray[roomsBaseAddress + i * 8 + 2] = byteSafety(
      saveFile.faerieVillage.faerieRooms[i].subsubtype,
      1,
      false,
    )
    byteArray[roomsBaseAddress + i * 8 + 3] = byteSafety(
      saveFile.faerieVillage.faerieRooms[i].level,
      1,
      false,
    )

    let buffer = numberToBytes(saveFile.faerieVillage.faerieRooms[i].battles, 4, false)
    for (let j = 0; j < 4; j++) {
      byteArray[roomsBaseAddress + i * 8 + 4 + j] = buffer[j]
    }
  }
}

export function checksum(byteArray: Uint8Array, address: number) {
  let sum = 0
  let buffer
  byteArray[address + 0x270] = 0
  byteArray[address + 0x271] = 0

  for (let i = 0; i < 0x10b0; i++) sum += byteArray[address + 0x200 + i]

  buffer = numberToBytes(sum, 4, false)
  byteArray[address + 0x270] = buffer[0]
  byteArray[address + 0x271] = buffer[1]
}
