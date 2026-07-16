import { fish } from "../../types/fishing"
import type { SaveFile } from "../../types/memcard"
import { byteSafety } from "../numbers"

export default function saveFishing(byteArray: Uint8Array, saveFile: SaveFile) {
  const baseAddress = saveFile.address + 0x90c

  for (let i = 0; i < fish.length; i++) {
    byteArray[baseAddress + i] = byteSafety(saveFile.fishing.lengths[fish[i]], 1, false)
  }
}
