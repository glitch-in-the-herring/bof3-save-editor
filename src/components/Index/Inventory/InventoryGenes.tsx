import type { ChangeEvent } from "react"

import { genes, geneIconsMap } from "../../../data/genes"
import { useGlobal, getInventory } from "../../../store/globalStore"
import { logicalNot } from "../../../utils/numbers"

export default function InventoryGenes() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const inventory = getInventory(activeOptions, memcard)

  return (
    <div className="h-100">
      <div className="grid grid-cols-3 px-6">
        {genes.map((g, i) => (
          <div key={i}>
            <label>
              <div className="flex flex-row items-end">
                <input
                  type="checkbox"
                  className="peer"
                  value={inventory ? inventory.dragonGenes[i >> 3] : ""}
                  checked={inventory ? !!(inventory.dragonGenes[i >> 3] & (0b1 << (i % 8))) : false}
                  onChange={(e: ChangeEvent) => enableGeneHandler(e, i)}
                  disabled={!inventory}
                />
                <img
                  src={`src/assets/genes/${geneIconsMap[g]}.gif`}
                  className="opacity-100 peer-disabled:opacity-40"
                />
              </div>
              <span>{g}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

function enableGeneHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  let geneByte = Number(target.value)

  if (target.checked) geneByte |= 0b1 << (index % 8)
  else geneByte &= logicalNot(0b1 << (index % 8), 1)

  const setDragonGenes = useGlobal.getState().setDragonGenes

  setDragonGenes(geneByte, index >> 3, saveFileIndex)
}
