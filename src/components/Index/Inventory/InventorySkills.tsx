import type { ChangeEvent } from "react"

import { getSkillNote, useGlobal } from "../../../store/globalStore"
import SpellSelect from "../SpellSelect"

export default function InventorySkills() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const skillNote = getSkillNote(activeOptions, memcard)

  return (
    <div className="flex flex-col justify-between">
      <h3>Skill List</h3>
      <div className="h-100 overflow-y-scroll">
        <div className="grid grid-cols-1 px-6">
          {skillNote &&
            [...Array(128).keys()].map((i) => (
              <SpellSelect
                key={i}
                value={skillNote ? skillNote[i] : ""}
                onChange={(e: ChangeEvent) => changeSkillNoteHandler(e, i)}
                disabled={!skillNote}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

function changeSkillNoteHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setSkillNote = useGlobal.getState().setSkillNote

  setSkillNote(Number(target.value), index, saveFileIndex)
}
