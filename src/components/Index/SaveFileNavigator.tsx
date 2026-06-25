import { useCharacter } from "../../store/characterStore"
import { useMemcard } from "../../store/memcardStore"
import { useSaveFile } from "../../store/saveFileStore"

type PaginationDirection = "prev" | "next"

export default function SaveFileNavigator() {
  const memcard = useMemcard((state) => state.memcard)
  const saveFileIndex = useMemcard((state) => state.saveFileIndex)

  return <>
    <div className="flex flex-row gap-4">
      <label htmlFor="slotPrevButton">Prev</label>
      <div className="flex flex-row gap-2">
        <button 
          id="slotPrevButton"
          onClick={() => paginationHandler("prev")}
          disabled={saveFileIndex === undefined || saveFileIndex <= 0}
        >&lt;</button>
        {
          saveFileIndex !== undefined ? 
          <label>Slot {saveFileIndex + 1} / {memcard.saveFiles.length}</label>
          : <label>Slot ... / ...</label>
        }
        <button 
          id="slotNextButton" 
          onClick={() => paginationHandler("next")}
          disabled={saveFileIndex === undefined || saveFileIndex >= memcard.saveFiles.length - 1}
        >&gt;</button>
      </div>
      <label htmlFor="slotNextButton">Next</label>
    </div>
    <button className="w-fit">Save</button>  
  </>
}

function paginationHandler(direction: PaginationDirection) {
  const memcard = useMemcard.getState().memcard
  const saveFileIndex = useMemcard.getState().saveFileIndex
  const setSaveFileIndex = useMemcard.getState().setSaveFileIndex

  const setSaveFile = useSaveFile.getState().setSaveFile
  const setCharacterIndex = useSaveFile.getState().setCharacterIndex

  const setCharacter = useCharacter.getState().setCharacter

  if (saveFileIndex === undefined)
    return

  if (direction === "prev" && saveFileIndex <= 0)
    return

  if (direction === "next" && saveFileIndex >= memcard.saveFiles.length - 1)
    return

  const delta = direction === "next" ? 1 : -1
  const saveFile = memcard.saveFiles[saveFileIndex + delta]

  setSaveFile(saveFile)
  setSaveFileIndex(saveFileIndex + delta)
  setCharacter(saveFile.characters![0])
  setCharacterIndex(0)
}