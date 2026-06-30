import type { ChangeEvent } from "react"
import { useGlobal, getParty } from "../../../store/globalStore"
import { formations } from "../../../types/formations"
import { logicalNot } from "../../../utils/numbers"

export default function PartyUnlockedFormations() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const party = getParty(activeOptions, memcard)

  return (
    <div>
      <h3>Unlocked Formations</h3>
      <div className="grid grid-cols-1 px-6">
        {formations.map((f, i) => (
          <div key={i}>
            <input
              id={`inventoryMaster${i}`}
              type="checkbox"
              value={party ? party.unlockedFormations : ""}
              checked={party ? !!(party.unlockedFormations & (0b1 << i)) : false}
              onChange={(e: ChangeEvent) => enableFormationHandler(e, i)}
              disabled={!party}
            />
            <label htmlFor={`partyFormations${i}`}>{f}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

function enableFormationHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  let formationsByte = Number(target.value)

  if (target.checked) formationsByte |= 0b1 << index
  else formationsByte &= logicalNot(0b1 << index, 1)

  const setUnlockedFormations = useGlobal.getState().setUnlockedFormations

  setUnlockedFormations(formationsByte, saveFileIndex)
}