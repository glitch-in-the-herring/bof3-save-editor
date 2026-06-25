import type { ChangeEvent } from "react"

import { useCharacter } from "../../store/characterStore"
import { useMemcard } from "../../store/memcardStore"
import { useSaveFile } from "../../store/saveFileStore"
import type { Memcard } from "../../types/memcard"
import { browseTOC, isMemcard } from "../../utils/memcard"
import { loadSaveFile } from "../../utils/saveFile"

export default function FileInput() {
  return (
    <input
      id="uploadInput"
      type="file"
      autoComplete="off"
      name="uploadInput"
      onChange={uploadHandler}
    />
  )
}

function uploadHandler(e: ChangeEvent) {
  const target = e.target as HTMLInputElement
  const reader = new FileReader()

  if (!target.files) throw Error("Error reading memory card")

  const file = target.files[0]

  reader.onload = fileReadHandler
  reader.readAsArrayBuffer(file)
}

function fileReadHandler(e: ProgressEvent<FileReader>) {
  const setMemcard = useMemcard.getState().setMemcard
  const setSaveFileIndex = useMemcard.getState().setSaveFileIndex

  const setSaveFile = useSaveFile.getState().setSaveFile
  const setCharacterIndex = useSaveFile.getState().setCharacterIndex

  const setCharacter = useCharacter.getState().setCharacter

  if (!e.target) throw Error("Error reading memory card")

  const byteArray = new Uint8Array(e.target.result as ArrayBuffer)
  if (!isMemcard(byteArray)) throw Error("Not a valid memory card file")

  const addresses = browseTOC(byteArray)
  if (addresses.length == 0) throw Error("No Breath of Fire III save files found")

  const saveFiles = addresses.map((address) => loadSaveFile(byteArray, address))

  const memcard: Memcard = {
    addresses: addresses,
    saveFiles: saveFiles,
  }

  setMemcard(memcard)
  setSaveFile(saveFiles[0])
  setSaveFileIndex(0)
  setCharacter(saveFiles[0].characters![0])
  setCharacterIndex(0)
}
