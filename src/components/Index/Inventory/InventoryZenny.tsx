import type { ChangeEvent } from "react"

import { getInventory, useGlobal } from "../../../store/globalStore"
import Input from "../../shared/Input"

export default function InventoryZenny() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const inventory = getInventory(activeOptions, memcard)

  return (
    <div>
      <Input
        id="inventoryZenny"
        name="inventoryZenny"
        label="Zenny:"
        inputType="number"
        value={inventory ? inventory.zenny : ""}
        onChange={zennyChangeHandler}
        disabled={activeOptions.characterIndex === undefined}
      />
    </div>
  )
}

function zennyChangeHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setZenny = useGlobal.getState().setZenny

  setZenny(Number(target.value), saveFileIndex)
}
