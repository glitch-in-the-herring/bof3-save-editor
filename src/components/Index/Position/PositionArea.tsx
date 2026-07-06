import type { ChangeEvent } from "react"

import { getPosition, useGlobal } from "../../../store/globalStore"
import AreaSelect from "../AreaSelect"

export default function PositionArea() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const position = getPosition(activeOptions, memcard)

  return (
    <div>
      <h3>Area</h3>
      <AreaSelect
        id="locationArea"
        value={position ? position.area : ""}
        onChange={changeAreaHandler}
        disabled={!position}
      />
    </div>
  )
}

function changeAreaHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setArea = useGlobal.getState().setArea

  setArea(Number(target.value), saveFileIndex)
}
