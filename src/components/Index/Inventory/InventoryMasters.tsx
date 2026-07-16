import type { ChangeEvent } from "react"

import { useGlobal, getInventory } from "../../../store/globalStore"
import { masters } from "../../../types/master"
import { logicalNot } from "../../../utils/numbers"

export default function InventoryMasters() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const inventory = getInventory(activeOptions, memcard)

  if (inventory) console.log(inventory.masters)

  return (
    <div className="flex flex-col">
      <h3>Masters</h3>
      <div className="h-100">
        <div className="grid grid-cols-1 px-6">
          {masters.map((m, i) => {
            if (m.id === 0xff) return
            return (
              <div key={i}>
                <input
                  id={`inventoryMaster${m.id}`}
                  type="checkbox"
                  checked={inventory ? !!(inventory.masters[m.id >> 3] & (0b1 << (m.id % 8))) : false}
                  value={inventory ? inventory.masters[m.id >> 3] : ""}
                  onChange={(e: ChangeEvent) => enableMasterHandler(e, m.id)}
                  disabled={!inventory}
                />
                <label htmlFor={`inventoryMaster${m.id}`}>{m.name}</label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function enableMasterHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  let masterByte = Number(target.value)

  if (target.checked) masterByte |= 0b1 << (index % 8)
  else masterByte &= logicalNot(0b1 << (index % 8), 1)

  const setMasters = useGlobal.getState().setMasters

  setMasters(masterByte, index >> 3, saveFileIndex)
}
