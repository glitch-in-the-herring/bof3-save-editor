import type { ChangeEvent } from "react"

import { getFormations, useGlobal } from "../../../store/globalStore"
import type { FormationCategory } from "../../../types/formations"
import PartySelect from "../PartySelect"

interface FormationListProps {
  heading: string
  category: FormationCategory
}

export default function FormationList({ heading, category }: FormationListProps) {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const formations = getFormations(activeOptions, memcard)

  return (
    <div>
      <h3>{heading}</h3>
      <ol>
        {[...Array(3).keys()].map((i) => (
          <li key={i}>
            <PartySelect
              value={formations ? formations[category][i] : ""}
              onChange={(e: ChangeEvent) => formationChangeHandler(e, i, category)}
              disabled={!formations}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}

function formationChangeHandler(e: ChangeEvent, index: number, category: FormationCategory) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setFormation = useGlobal.getState().setFormation

  setFormation(Number(target.value), index, category, saveFileIndex)
}
