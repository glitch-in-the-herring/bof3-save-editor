import type { ChangeEvent } from "react"

import { faeries } from "../../../data/faeries"
import { jobs } from "../../../data/jobs"
import { useGlobal, getFaerieVillage } from "../../../store/globalStore"
import { FaerieStatsColors, FaerieStatsKeys } from "../../../types/faerie"
import Input from "../../shared/Input"
import Label from "../../shared/Label"

interface FaerieJobCardProp {
  id: number
}

// w-0/5
// w-1/5
// w-2/5
// w-3/5
// w-4/5
// w-5/5

export default function FaerieJobCard({ id }: FaerieJobCardProp) {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const faerieVillage = getFaerieVillage(activeOptions, memcard)

  return (
    <div className="border p-2">
      <div className="font-bold">{faeries[id].name}</div>
      <Input
        id={`faerieName${id}`}
        label="Renamed as:"
        value={faerieVillage ? faerieVillage.faerieNames[id] : faeries[id].name}
        onChange={(e: ChangeEvent) => changeNameHandler(e, id)}
        disabled={!faerieVillage}
      />
      <div className="grid grid-cols-2">
        {FaerieStatsKeys.map((x) => (
          <>
            <div className="capitalize">{x}</div>
            <div className="bg-gray-300">
              <div
                className={`${faeries[id].stats[x] > 0 && FaerieStatsColors[x]} h-full w-${faeries[id].stats[x]}/5 pl-2`}
              >
                <span>{faeries[id].stats[x]}</span>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="flex flex-col">
        <Label label="Alive?">
          <input
            type="checkbox"
            checked={faerieVillage ? !!faerieVillage.faerieJobs[id].status : false}
            onChange={(e: ChangeEvent) => changeAliveHandler(e, id)}
          />
        </Label>
        <Label id={`faerieRoomAssignment${id}`} label="Assignment:">
          <select
            id={`faerieRoomAssignment${id}`}
            value={faerieVillage ? faerieVillage.faerieJobs[id].room : ""}
            onChange={(e: ChangeEvent) => changeRoomHandler(e, id)}
            disabled={!faerieVillage}
          >
            {[...Array(12).keys()].map((i) => (
              <option value={i} key={i}>
                {((): string => {
                  switch (i) {
                    case 0:
                      return "Idle"
                    case 9:
                      return "Hunt"
                    case 10:
                      return "Clear"
                    case 11:
                      return "Build"
                  }
                  if (i >= 1 && i <= 8)
                    return `Room ${i}${faerieVillage ? ` (${jobs[faerieVillage.faerieRooms[i - 1].type - 4]})` : ""}`
                  return ""
                })()}
              </option>
            ))}
          </select>
        </Label>
        {faerieVillage &&
          (() => {
            const currentRoom = faerieVillage.faerieJobs[id].room
            if (!faerieVillage.faerieJobs[id].status) return
            if (
              currentRoom === 0 ||
              currentRoom === 9 ||
              currentRoom === 0xa ||
              currentRoom === 0xb
            )
              return

            if (
              faerieVillage.faerieJobs.filter((x) => x.room === currentRoom && x.status).length > 3
            )
              return (
                <div className="bg-orange-300">
                  Warning: Room {currentRoom} has more than three occupants!
                </div>
              )
          })()}
        <Input
          label="Battle count:"
          value={faerieVillage ? faerieVillage.faerieJobs[id].battles : ""}
          inputType="number"
          inputClassName="w-20"
          disabled={!faerieVillage}
        />
      </div>
    </div>
  )
}

function changeAliveHandler(e: ChangeEvent, id: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setAlive = useGlobal.getState().setFaerieAlive
  const setFaerieName = useGlobal.getState().setFaerieName

  setAlive(Number(target.checked), id, saveFileIndex)
  setFaerieName(faeries[id].name, id, saveFileIndex)
}

function changeNameHandler(e: ChangeEvent, id: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setFaerieName = useGlobal.getState().setFaerieName

  setFaerieName(target.value, id, saveFileIndex)
}

function changeRoomHandler(e: ChangeEvent, id: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setFaerieRoom = useGlobal.getState().setFaerieRoom

  setFaerieRoom(Number(target.value), id, saveFileIndex)
}
