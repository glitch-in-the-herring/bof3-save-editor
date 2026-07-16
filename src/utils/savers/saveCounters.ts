import { clockKeys } from "../../types/clock"
import { countdownCategories } from "../../types/counters"
import type { SaveFile } from "../../types/memcard"
import { byteSafety } from "../numbers"

export default function saveCounters(byteArray: Uint8Array, saveFile: SaveFile) {
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
