import type { SaveFile } from "../../types/memcard"
import { axisKeys } from "../../types/position"
import { numberToBytes } from "../numbers"

export default function savePosition(byteArray: Uint8Array, saveFile: SaveFile) {
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
