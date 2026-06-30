import type { ChangeEvent } from "react"

import { useGlobal, getParty } from "../../../store/globalStore"
import FormationSelect from "../FormationSelect"

export default function PartyFormation() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const party = getParty(activeOptions, memcard)

  return (
    <div>
      <h3>Active Formation</h3>
      <div>
        <FormationSelect
          value={party ? party.activeFormation : ""}
          onChange={switchFormationsHandler}
          disabled={!party}
        />
      </div>
    </div>
  )
}

function switchFormationsHandler(e: ChangeEvent) {
  const target = e.target as HTMLSelectElement
  const { saveFileIndex } = useGlobal.getState().activeOptions

  if (saveFileIndex === undefined) return

  const setActiveFormation = useGlobal.getState().setActiveFormation
  setActiveFormation(Number(target.value), saveFileIndex)
}
