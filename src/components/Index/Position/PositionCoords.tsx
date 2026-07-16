import type { ChangeEvent } from "react"

import { useGlobal, getSubstate } from "../../../store/globalStore"
import type { Axis, Position } from "../../../types/position"
import Input from "../../shared/Input"

export default function PositionCoords() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const position = getSubstate<Position>("position", activeOptions, memcard)

  return (
    <div>
      <h3>Coordinates</h3>
      <div className="flex flex-row">
        <Input
          id="locationXWhole"
          name="locationXWhole"
          label="X:"
          value={position ? position.x.integer : ""}
          onChange={(e: ChangeEvent) => changeXHandler(e, "integer")}
          disabled={!position}
          inputType="number"
          inputClassName="w-20"
        />
        <Input
          id="locationXFraction"
          name="locationXFraction"
          label=". "
          value={position ? position.x.fraction : ""}
          onChange={(e: ChangeEvent) => changeXHandler(e, "fraction")}
          disabled={!position}
          inputType="number"
          inputClassName="w-20"
        />
      </div>
      <div className="flex flex-row">
        <Input
          id="locationYWhole"
          name="locationYWhole"
          label="Y:"
          value={position ? position.y.integer : ""}
          onChange={(e: ChangeEvent) => changeYHandler(e, "integer")}
          disabled={!position}
          inputType="number"
          inputClassName="w-20"
        />
        <Input
          id="locationYFraction"
          name="locationYFraction"
          label=". "
          value={position ? position.y.fraction : ""}
          onChange={(e: ChangeEvent) => changeYHandler(e, "fraction")}
          disabled={!position}
          inputType="number"
          inputClassName="w-20"
        />
      </div>
    </div>
  )
}

function changeXHandler(e: ChangeEvent, key: keyof Axis) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setX = useGlobal.getState().setX

  setX(Number(target.value), key, saveFileIndex)
}

function changeYHandler(e: ChangeEvent, key: keyof Axis) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setY = useGlobal.getState().setY

  setY(Number(target.value), key, saveFileIndex)
}
