import type { ChangeEvent } from "react"

import { useGlobal, getSubstate } from "../../../store/globalStore"
import { formations, type Party } from "../../../types/formations"
import FormationSelect from "../FormationSelect"

export default function PartyFormation() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const party = getSubstate<Party>("party", activeOptions, memcard)

  return (
    <div>
      <h3>Active Formation</h3>
      <div>
        <FormationSelect
          value={party ? party.activeFormation : ""}
          onChange={switchFormationsHandler}
          disabled={!party}
        />
        {party && !(party.unlockedFormations & (0b1 << party.activeFormation)) && (
          <div className="bg-orange-300">
            Warning: The {formations[party.activeFormation]} formation is not yet unlocked!
          </div>
        )}
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
