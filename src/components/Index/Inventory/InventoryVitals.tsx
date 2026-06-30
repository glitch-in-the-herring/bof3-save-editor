import type { ChangeEvent } from "react"

import { getVitalItems, useGlobal } from "../../../store/globalStore"
import VitalsSelect from "../VitalsSelect"

export default function InventoryVitals() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const vitalItems = getVitalItems(activeOptions, memcard)

  return (
    <div className="h-100 overflow-y-scroll">
      <div className="grid grid-cols-1 px-6">
        {vitalItems &&
          [...Array(32).keys()].map((i) => (
            <VitalsSelect
              key={i}
              value={vitalItems ? vitalItems[i] : ""}
              disabled={!vitalItems}
              onChange={(e: ChangeEvent) => changeVitalItemsHandler(e, i)}
            />
          ))}
      </div>
    </div>
  )
}

function changeVitalItemsHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setVitalItem = useGlobal.getState().setVitalItem

  setVitalItem(Number(target.value), index, saveFileIndex)
}
