import type { ChangeEvent } from "react"

import { getSubstate, useGlobal } from "../../../store/globalStore"
import type { Clock } from "../../../types/clock"
import { countdownCategories, type Counters, type CountdownCategory } from "../../../types/counters"
import Input from "../../shared/Input"

export default function CountersTimers() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const counters = getSubstate<Counters>("counters", activeOptions, memcard)

  return (
    <div>
      <h3>Timers</h3>
      <div className="flex flex-col gap-4">
        <div>
          <span>Play time</span>
          <div className="flex flex-row gap-2">
            <Input
              id={`$playTimeHour`}
              inputType="number"
              label="h:"
              value={counters ? counters.playTime.hour : ""}
              onChange={(e: ChangeEvent) => changePlayTimeHandler(e, "hour")}
              disabled={!counters}
              inputClassName="w-10"
            />
            <Input
              id={`$playTimeMinute`}
              inputType="number"
              label="m:"
              value={counters ? counters.playTime.minute : ""}
              onChange={(e: ChangeEvent) => changePlayTimeHandler(e, "minute")}
              inputClassName="w-10"
              disabled={!counters}
            />
            <Input
              id={`$playTimeSecond`}
              inputType="number"
              label="s:"
              value={counters ? counters.playTime.second : ""}
              onChange={(e: ChangeEvent) => changePlayTimeHandler(e, "second")}
              inputClassName="w-10"
              disabled={!counters}
            />
            <Input
              id={`$playTimeSubsecond`}
              inputType="number"
              label="ss:"
              value={counters ? counters.playTime.subsecond : ""}
              onChange={(e: ChangeEvent) => changePlayTimeHandler(e, "subsecond")}
              inputClassName="w-10"
              disabled={!counters}
            />
          </div>
          <div className="flex flex-row gap-2">
            <button onClick={resetPlayTimeHandler} disabled={!counters}>
              Reset to zero
            </button>
            <button disabled={!counters}>Copy from metadata</button>
          </div>
        </div>
        {countdownCategories.map((c, i) => (
          <div key={i}>
            <span>{c} Timer</span>
            <div className="flex flex-row gap-2">
              <Input
                id={`${c}Hour`}
                inputType="number"
                label="h:"
                value={counters ? counters.countdowns[c].hour : ""}
                onChange={(e: ChangeEvent) => changeCountdownHandler(e, "hour", c)}
                disabled={!counters}
                inputClassName="w-10"
              />
              <Input
                id={`${c}Minute`}
                inputType="number"
                label="m:"
                value={counters ? counters.countdowns[c].minute : ""}
                inputClassName="w-10"
                disabled={!counters}
                onChange={(e: ChangeEvent) => changeCountdownHandler(e, "minute", c)}
              />
              <Input
                id={`${c}Second`}
                inputType="number"
                label="s:"
                value={counters ? counters.countdowns[c].second : ""}
                inputClassName="w-10"
                disabled={!counters}
                onChange={(e: ChangeEvent) => changeCountdownHandler(e, "second", c)}
              />
              <Input
                id={`${c}Subsecond`}
                inputType="number"
                label="ss:"
                value={counters ? counters.countdowns[c].subsecond : ""}
                inputClassName="w-10"
                disabled={!counters}
                onChange={(e: ChangeEvent) => changeCountdownHandler(e, "subsecond", c)}
              />
            </div>
            <button onClick={() => resetCountdownHandler(c)} disabled={!counters}>
              Reset to zero
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function changeCountdownHandler(
  e: ChangeEvent,
  subdivision: keyof Clock,
  category: CountdownCategory,
) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setCountdown = useGlobal.getState().setCountdown

  setCountdown(Number(target.value), subdivision, category, saveFileIndex)
}

function resetCountdownHandler(category: CountdownCategory) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const copyCountdown = useGlobal.getState().copyCountdown

  copyCountdown(
    {
      hour: 0,
      minute: 0,
      second: 0,
      subsecond: 0,
    },
    category,
    saveFileIndex,
  )
}

function changePlayTimeHandler(e: ChangeEvent, subdivision: keyof Clock) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setPlayTime = useGlobal.getState().setPlayTime

  setPlayTime(Number(target.value), subdivision, saveFileIndex)
}

function resetPlayTimeHandler() {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const copyPlayTime = useGlobal.getState().copyPlayTime

  copyPlayTime(
    {
      hour: 0,
      minute: 0,
      second: 0,
      subsecond: 0,
    },
    saveFileIndex,
  )
}
