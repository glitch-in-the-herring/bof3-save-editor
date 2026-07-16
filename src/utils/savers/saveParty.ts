import type { SaveFile } from "../../types/memcard"
import { byteSafety } from "../numbers"

export default function saveParty(byteArray: Uint8Array, saveFile: SaveFile) {
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
