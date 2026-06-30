import type { ChangeEvent } from "react"

import defenderIcon from "../../../assets/genes/defender.gif"
import eldritchIcon from "../../../assets/genes/eldritch.gif"
import failureIcon from "../../../assets/genes/failure.gif"
import flameIcon from "../../../assets/genes/flame.gif"
import forceIcon from "../../../assets/genes/force.gif"
import frostIcon from "../../../assets/genes/frost.gif"
import fusionIcon from "../../../assets/genes/fusion.gif"
import grossIcon from "../../../assets/genes/gross.gif"
import infinityIcon from "../../../assets/genes/infinity.gif"
import miracleIcon from "../../../assets/genes/miracle.gif"
import mutantIcon from "../../../assets/genes/mutant.gif"
import questionIcon from "../../../assets/genes/question.gif"
import radianceIcon from "../../../assets/genes/radiance.gif"
import reverseIcon from "../../../assets/genes/reverse.gif"
import shadowIcon from "../../../assets/genes/shadow.gif"
import thornIcon from "../../../assets/genes/thorn.gif"
import thunderIcon from "../../../assets/genes/thunder.gif"
import tranceIcon from "../../../assets/genes/trance.gif"
import { genes } from "../../../data/genes"
import { useGlobal, getInventory } from "../../../store/globalStore"
import { logicalNot } from "../../../utils/numbers"

const geneIconsMap: Record<string, string> = {
  Flame: flameIcon,
  Frost: frostIcon,
  Thunder: thunderIcon,
  Shadow: shadowIcon,
  Radiance: radianceIcon,
  Force: forceIcon,
  Defender: defenderIcon,
  Eldritch: eldritchIcon,
  Miracle: miracleIcon,
  Gross: grossIcon,
  Thorn: thornIcon,
  Reverse: reverseIcon,
  Mutant: mutantIcon,
  "???": questionIcon,
  Trance: tranceIcon,
  Failure: failureIcon,
  Fusion: fusionIcon,
  Infinity: infinityIcon,
}

export default function InventoryGenes() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const inventory = getInventory(activeOptions, memcard)

  return (
    <div className="h-100">
      <div className="grid grid-cols-3 px-6">
        {genes.map((g, i) => (
          <div key={i}>
            <label className="flex flex-col">
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
                  src={geneIconsMap[g]}
                  height={32}
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
