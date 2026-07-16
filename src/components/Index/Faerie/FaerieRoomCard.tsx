import type { ChangeEvent } from "react"

import { explorationSubjobs, jobs, merchantSubjobs, merchantSubsubjobs } from "../../../data/jobs"
import { getSubstate, useGlobal } from "../../../store/globalStore"
import type { FaerieVillage } from "../../../types/faerie"
import Input from "../../shared/Input"
import Label from "../../shared/Label"

interface FaerieRoomCardProp {
  id: number
}

export default function FaerieRoomCard({ id }: FaerieRoomCardProp) {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const faerieVillage = getSubstate<FaerieVillage>("faerieVillage", activeOptions, memcard)

  return (
    <div>
      <div className="font-bold">Room {id + 1}</div>
      <Label label="Job type:">
        <select
          value={faerieVillage ? faerieVillage.faerieRooms[id].type : ""}
          onChange={(e: ChangeEvent) => changeTypeHandler(e, id)}
          disabled={!faerieVillage}
        >
          <option value={0}>--</option>
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
              <>
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
                <Input
                  label="Level:"
                  inputType="number"
                  value={faerieVillage ? faerieVillage.faerieRooms[id].level : ""}
                  onChange={(e: ChangeEvent) => changeLevelHandler(e, id)}
                  inputClassName="w-20"
                />
              </>
            )}
          </>
        )}
      <Input
        id={`faerieRoomBattle${id}`}
        value={faerieVillage ? faerieVillage.faerieRooms[id].battles : ""}
        onChange={(e: ChangeEvent) => changeBattleCountHandler(e, id)}
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

function changeLevelHandler(e: ChangeEvent, room: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setRoomLevel = useGlobal.getState().setRoomLevel

  setRoomLevel(Number(target.value), room, saveFileIndex)
}

function changeBattleCountHandler(e: ChangeEvent, room: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setRoomBattleCount = useGlobal.getState().setRoomBattleCount

  setRoomBattleCount(Number(target.value), room, saveFileIndex)
}
