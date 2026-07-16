import type { ChangeEvent } from "react"

import { getSubstate, useGlobal } from "../../../store/globalStore"
import type { Inventory } from "../../../types/inventory"
import Input from "../../shared/Input"

export default function InventoryZenny() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const inventory = getSubstate<Inventory>("inventory", activeOptions, memcard)

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
