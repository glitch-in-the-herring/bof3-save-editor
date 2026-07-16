import { useGlobal } from "../store/globalStore"
import { checksum } from "./memcard"
import saveCharacters from "./savers/saveCharacters"
import saveCounters from "./savers/saveCounters"
import saveFaerieVillage from "./savers/saveFaerieVillage"
import saveFishing from "./savers/saveFishing"
import saveInventory from "./savers/saveInventory"
import saveMeta from "./savers/saveMeta"
import saveParty from "./savers/saveParty"
import savePosition from "./savers/savePosition"

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
    saveParty(tmpByteArray, saveFile)
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
