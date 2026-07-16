import type { ChangeEvent } from "react"

import { getSubstate, useGlobal } from "../../../store/globalStore"
import type { OrderingCategory, Party } from "../../../types/formations"
import PartySelect from "../PartySelect"

interface PartyOrderingListProps {
  heading: string
  category: OrderingCategory
}

export default function PartyOrderingList({ heading, category }: PartyOrderingListProps) {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const party = getSubstate<Party>("party", activeOptions, memcard)

  return (
    <div>
      <h3>{heading}</h3>
      <ol>
        {[...Array(3).keys()].map((i) => (
          <li key={i}>
            <PartySelect
              value={party ? party.orderings[category][i] : ""}
              onChange={(e: ChangeEvent) => formationChangeHandler(e, i, category)}
              disabled={!party}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}

function formationChangeHandler(e: ChangeEvent, index: number, category: OrderingCategory) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setFormation = useGlobal.getState().setOrdering

  setFormation(Number(target.value), index, category, saveFileIndex)
}
