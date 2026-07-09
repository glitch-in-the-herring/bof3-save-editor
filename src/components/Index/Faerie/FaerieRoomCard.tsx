import type { ChangeEvent } from "react"

import { explorationSubjobs, jobs, merchantSubjobs, merchantSubsubjobs } from "../../../data/jobs"
import { getFaerieVillage, useGlobal } from "../../../store/globalStore"
import Input from "../../shared/Input"
import Label from "../../shared/Label"

interface FaerieRoomCardProp {
  id: number
}

export default function FaerieRoomCard({ id }: FaerieRoomCardProp) {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const faerieVillage = getFaerieVillage(activeOptions, memcard)

  return (
    <div>
      <div className="font-bold">Room {id + 1}</div>
      <Label label="Job type:">
        <select
          value={faerieVillage ? faerieVillage.faerieRooms[id].type : ""}
          onChange={(e: ChangeEvent) => changeTypeHandler(e, id)}
          disabled={!faerieVillage}
        >
          {jobs.map((x, i) => (
            <option value={i + 4} key={x}>
              {x}
            </option>
          ))}
        </select>
      </Label>
      {faerieVillage &&
        (faerieVillage.faerieRooms[id].type === 5 || faerieVillage.faerieRooms[id].type === 9) && (
          <>
            <Label label="Job subtype:">
              <select
                value={faerieVillage ? faerieVillage.faerieRooms[id].subtype : ""}
                onChange={(e: ChangeEvent) => changeSubtypeHandler(e, id)}
                disabled={!faerieVillage}
              >
                {faerieVillage.faerieRooms[id].type === 5
                  ? merchantSubjobs.map((x, i) => (
                      <option value={i} key={x}>
                        {x}
                      </option>
                    ))
                  : explorationSubjobs.map((x, i) => (
                      <option value={i} key={x}>
                        {x}
                      </option>
                    ))}
              </select>
            </Label>
            {faerieVillage.faerieRooms[id].type === 5 && (
              <Label label="Job subsubtype:">
                <select
                  onChange={(e: ChangeEvent) => changeSubsubtypeHandler(e, id)}
                  disabled={!faerieVillage}
                >
                  {merchantSubsubjobs.map((x, i) => (
                    <option value={i} key={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </Label>
            )}
          </>
        )}
      <Input
        id={`faerieRoomBattle${id}`}
        value={faerieVillage ? faerieVillage.faerieRooms[id].battles : ""}
        label="Battle count:"
        inputType="number"
        inputClassName="w-20"
        disabled={!faerieVillage}
      />
    </div>
  )
}

function changeTypeHandler(e: ChangeEvent, room: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setRoomType = useGlobal.getState().setRoomType
  const setRoomSubtype = useGlobal.getState().setRoomSubtype
  const setRoomSubsubtype = useGlobal.getState().setRoomSubsubtype

  setRoomType(Number(target.value), room, saveFileIndex)
  setRoomSubtype(0, room, saveFileIndex)
  setRoomSubsubtype(0, room, saveFileIndex)
}

function changeSubtypeHandler(e: ChangeEvent, room: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setRoomSubtype = useGlobal.getState().setRoomSubtype
  const setRoomSubsubtype = useGlobal.getState().setRoomSubsubtype

  setRoomSubtype(Number(target.value), room, saveFileIndex)
  setRoomSubsubtype(0, room, saveFileIndex)
}

function changeSubsubtypeHandler(e: ChangeEvent, room: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setRoomSubsubtype = useGlobal.getState().setRoomSubsubtype

  setRoomSubsubtype(Number(target.value), room, saveFileIndex)
}
