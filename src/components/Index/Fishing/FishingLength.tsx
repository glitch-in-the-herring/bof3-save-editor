import type { ChangeEvent } from "react"

import { getFishing, useGlobal } from "../../../store/globalStore"
import { fish, type Fish } from "../../../types/fishing"
import Input from "../../shared/Input"

export default function FishingLength() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const fishing = getFishing(activeOptions, memcard)

  return (
    <div>
      <h3>Fish Lengths</h3>
      <div className="grid w-4/12 grid-cols-4 gap-2">
        {fish.map((f, i) => (
          <Input
            id={`fish${i}`}
            name={`fish${i}`}
            label={f}
            inputType="number"
            icon={`src/assets/fish/${f}.png`}
            iconHeight={40}
            iconWidth={64}
            value={fishing ? fishing.lengths[f] : ""}
            onChange={(e: ChangeEvent) => lengthChangeHandler(e, f)}
            divClassName="flex flex-col"
            key={i}
          />
        ))}
      </div>
    </div>
  )
}

function lengthChangeHandler(e: ChangeEvent, fish: Fish) {
  const { saveFileIndex } = useGlobal.getState().activeOptions

  if (saveFileIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setFishLength = useGlobal.getState().setFishLength

  setFishLength(Number(target.value), fish, saveFileIndex)
}
