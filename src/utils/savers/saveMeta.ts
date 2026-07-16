import { clockKeys } from "../../types/clock"
import type { SaveFile } from "../../types/memcard"
import { byteSafety, numberToBytes } from "../numbers"
import { encode } from "../strings"

export default function saveMeta(byteArray: Uint8Array, saveFile: SaveFile) {
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
