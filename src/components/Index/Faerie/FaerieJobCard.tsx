import type { ChangeEvent } from "react"

import { faeries } from "../../../data/faeries"
import { jobs } from "../../../data/jobs"
import { useGlobal, getSubstate } from "../../../store/globalStore"
import {
  copyStatus,
  explorationStatus,
  FaerieStatsColors,
  FaerieStatsKeys,
  type FaerieVillage,
} from "../../../types/faerie"
import { itemCategories } from "../../../types/inventory"
import Input from "../../shared/Input"
import Label from "../../shared/Label"
import AccessorySelect from "../AccessorySelect"
import ArmorSelect from "../ArmorSelect"
import ItemSelect from "../ItemSelect"
import WeaponSelect from "../WeaponSelect"

interface FaerieJobCardProp {
  id: number
}

interface FaerieJobSubeditorProp {
  id: number
  jobData: number[]
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
  const faerieVillage = getSubstate<FaerieVillage>("faerieVillage", activeOptions, memcard)

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
            disabled={!faerieVillage}
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
          onChange={(e: ChangeEvent) => changeBattleCountHandler(e, id)}
          inputType="number"
          inputClassName="w-20"
          disabled={!faerieVillage}
        />
        {faerieVillage &&
          (() => {
            const room = faerieVillage.faerieJobs[id].room
            if (room < 1 || room > 8) return

            const job = faerieVillage.faerieRooms[room - 1].type
            switch (job) {
              case 0x09:
                return (
                  <ExplorationJobEditor jobData={faerieVillage.faerieJobs[id].jobData} id={id} />
                )
              case 0x0d:
                return <CopyJobEditor jobData={faerieVillage.faerieJobs[id].jobData} id={id} />
            }
          })()}
      </div>
    </div>
  )
}

function CopyJobEditor({ jobData, id }: FaerieJobSubeditorProp) {
  const itemType = jobData[1] & 0xf
  const status = jobData[1] & 0xf0
  let select

  switch (itemType) {
    case 0x00:
      select = (
        <ItemSelect
          value={jobData[0]}
          onChange={(e: ChangeEvent) => changeJobDataHandler(e, (n) => n, 0, id)}
        />
      )
      break
    case 0x01:
      select = (
        <WeaponSelect
          value={jobData[0]}
          onChange={(e: ChangeEvent) => changeJobDataHandler(e, (n) => n, 0, id)}
        />
      )
      break
    case 0x02:
      select = (
        <ArmorSelect
          value={jobData[0]}
          onChange={(e: ChangeEvent) => changeJobDataHandler(e, (n) => n, 0, id)}
        />
      )
      break
    case 0x03:
      select = (
        <AccessorySelect
          value={jobData[0]}
          onChange={(e: ChangeEvent) => changeJobDataHandler(e, (n) => n, 0, id)}
        />
      )
      break
  }

  return (
    <>
      <Label label="Selected item:">{select}</Label>
      <Label label="Item type:">
        <select
          value={itemType}
          onChange={(e: ChangeEvent) => {
            changeJobDataHandler(e, () => 0, 0, id)
            changeJobDataHandler(e, (n) => status | n, 1, id)
          }}
        >
          {itemCategories.map((c, i) => (
            <option key={c} value={i}>
              {c}
            </option>
          ))}
        </select>
      </Label>
      <Label label="Status">
        <select
          value={status}
          onChange={(e: ChangeEvent) => changeJobDataHandler(e, (n) => n | itemType, 1, id)}
        >
          {copyStatus.map((c, i) => (
            <option key={c} value={i * 0x10}>
              {c}
            </option>
          ))}
        </select>
      </Label>
    </>
  )
}

function ExplorationJobEditor({ jobData, id }: FaerieJobSubeditorProp) {
  const status = jobData[0]

  return (
    <>
      <Label label="Status">
        <select
          value={status}
          onChange={(e: ChangeEvent) => changeJobDataHandler(e, (n) => n, 0, id)}
        >
          {explorationStatus.map((c, i) => (
            <option key={c} value={i}>
              {c}
            </option>
          ))}
        </select>
      </Label>
    </>
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

function changeJobDataHandler(e: ChangeEvent, f: (n: number) => number, index: number, id: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setFaerieJobData = useGlobal.getState().setFaerieJobData

  setFaerieJobData(f(Number(target.value)), index, id, saveFileIndex)
}

function changeBattleCountHandler(e: ChangeEvent, id: number) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setFaerieBattleCount = useGlobal.getState().setFaerieBattleCount

  setFaerieBattleCount(Number(target.value), id, saveFileIndex)
}
