import type { SaveFile } from "../../types/memcard"
import { byteSafety, numberToBytes } from "../numbers"
import { encode } from "../strings"

export default function saveFaerieVillage(byteArray: Uint8Array, saveFile: SaveFile) {
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
