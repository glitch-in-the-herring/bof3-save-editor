import { useGlobal } from "../../store/globalStore"

type PaginationDirection = "prev" | "next"

export default function SaveFileNavigator() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)

  return (
    <>
      <div className="flex flex-row gap-4">
        <label htmlFor="slotPrevButton">Prev</label>
        <div className="flex flex-row gap-2">
          <button
            id="slotPrevButton"
            onClick={() => paginationHandler("prev")}
            disabled={activeOptions.saveFileIndex === undefined || activeOptions.saveFileIndex <= 0}
          >
            &lt;
          </button>
          {activeOptions.saveFileIndex !== undefined ? (
            <label>
              Slot {activeOptions.saveFileIndex + 1} / {memcard.saveFiles.length}
            </label>
          ) : (
            <label>Slot ... / ...</label>
          )}
          <button
            id="slotNextButton"
            onClick={() => paginationHandler("next")}
            disabled={
              activeOptions.saveFileIndex === undefined ||
              activeOptions.saveFileIndex >= memcard.saveFiles.length - 1
            }
          >
            &gt;
          </button>
        </div>
        <label htmlFor="slotNextButton">Next</label>
      </div>
      <button className="w-fit" disabled={activeOptions.characterIndex === undefined}>
        Save
      </button>
    </>
  )
}

function paginationHandler(direction: PaginationDirection) {
  const memcard = useGlobal.getState().memcard
  const activeOptions = useGlobal.getState().activeOptions
  const setActiveOption = useGlobal.getState().setActiveOption

  if (activeOptions.saveFileIndex === undefined) return
  if (direction === "prev" && activeOptions.saveFileIndex <= 0) return
  if (direction === "next" && activeOptions.saveFileIndex >= memcard.saveFiles.length - 1) return

  const delta = direction === "next" ? 1 : -1

  setActiveOption(activeOptions.saveFileIndex + delta, "saveFileIndex")
  setActiveOption(0, "characterIndex")
}
