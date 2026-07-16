import type { ChangeEvent } from "react"

import { getSubstate, useGlobal } from "../../../store/globalStore"
import type { Meta } from "../../../types/meta"
import PartySelect from "../PartySelect"

export default function MetaIcons() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const meta = getSubstate<Meta>("meta", activeOptions, memcard)

  return (
    <div>
      <h3>File Icons</h3>
      <ol>
        {[...Array(3).keys()].map((i) => (
          <li key={i}>
            <PartySelect
              value={meta ? meta.portraits[i] : ""}
              onChange={(e: ChangeEvent) => changePortraitHandler(e, i)}
              disabled={!meta}
              portraitMode
            />
          </li>
        ))}
      </ol>
    </div>
  )
}

function changePortraitHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setMetaPortrait = useGlobal.getState().setMetaPortrait

  setMetaPortrait(Number(target.value), index, saveFileIndex)
}
