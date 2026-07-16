import type { FaerieVillage } from "../../types/faerie"
import { bytesToNumber } from "../numbers"
import { decode } from "../strings"

export default function loadFaerieVillage(byteArray: Uint8Array) {
  const jobsBaseAddress = 0x652 + 0x30
  const namesBaseAddress = jobsBaseAddress + 0x220
  const roomsBaseAddress = jobsBaseAddress + 0x1e0
  const foodBaseAddress = 0x652 + 42
  const cultureBaseAddress = 0x652 + 44

  let faerieVillage: FaerieVillage = {
    faerieJobs: [...Array(60).keys()].map((i) => ({
      status: byteArray[jobsBaseAddress + i * 8],
      room: byteArray[jobsBaseAddress + i * 8 + 1],
      jobData: Array.from(
        byteArray.slice(jobsBaseAddress + i * 8 + 2, jobsBaseAddress + i * 8 + 4),
      ),
      battles: bytesToNumber(
        byteArray.slice(jobsBaseAddress + i * 8 + 4, jobsBaseAddress + i * 8 + 8),
        false,
      ),
    })),
    faerieRooms: [...Array(8).keys()].map((i) => ({
      type: byteArray[roomsBaseAddress + i * 8],
      subtype: byteArray[roomsBaseAddress + i * 8 + 1],
      subsubtype: byteArray[roomsBaseAddress + i * 8 + 2],
      level: byteArray[roomsBaseAddress + i * 8 + 3],
      battles: bytesToNumber(
        byteArray.slice(roomsBaseAddress + i * 8 + 4, roomsBaseAddress + i * 8 + 8),
        false,
      ),
    })),
    faerieNames: [...Array(60).keys()].map((i) =>
      decode(byteArray.slice(namesBaseAddress + i * 5, namesBaseAddress + i * 5 + 5)),
    ),
    food: byteArray[foodBaseAddress],
    culture: byteArray[cultureBaseAddress],
    stage: Array.from(byteArray.slice(0, 2)),
    maxJobs: byteArray[0x67d],
    battleCounts: {
      huntingBattleCount: bytesToNumber(byteArray.slice(0x66e, 0x672), false),
      constructionBattleCounter: bytesToNumber(byteArray.slice(0x662, 0x666), false),
      scholarBattleCount: bytesToNumber(byteArray.slice(0x672, 0x676), false),
    },
    constructionPowers: {
      clearPower: byteArray[0x67f],
      buildPower: byteArray[0x680],
    },
  }

  return faerieVillage
}
