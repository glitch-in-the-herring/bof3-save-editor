import type { ChangeEvent } from "react"

import { getCounters, useGlobal } from "../../../store/globalStore"
import {
  countdownCategories,
  type ClockTimer,
  type CountdownCategory,
} from "../../../types/counters"
import Input from "../../shared/Input"

export default function CountersTimers() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const counters = getCounters(activeOptions, memcard)

  return (
    <div>
      <h3>Timers</h3>
      <div className="flex flex-col gap-4">
        {countdownCategories.map((c, i) => (
          <div key={i}>
            <span>{c} Timer</span>
            <div className="flex flex-row gap-2">
              <Input
                id={`${c}Hour`}
                inputType="number"
                label="h:"
                value={counters ? counters.countdowns[c].hour : ""}
                onChange={(e: ChangeEvent) => changeTimerHandler(e, "hour", c)}
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
                onChange={(e: ChangeEvent) => changeTimerHandler(e, "minute", c)}
              />
              <Input
                id={`${c}Second`}
                inputType="number"
                label="s:"
                value={counters ? counters.countdowns[c].second : ""}
                inputClassName="w-10"
                disabled={!counters}
                onChange={(e: ChangeEvent) => changeTimerHandler(e, "second", c)}
              />
              <Input
                id={`${c}Subsecond`}
                inputType="number"
                label="ss:"
                value={counters ? counters.countdowns[c].subsecond : ""}
                inputClassName="w-10"
                disabled={!counters}
                onChange={(e: ChangeEvent) => changeTimerHandler(e, "subsecond", c)}
              />
            </div>
            <button onClick={() => resetTimerHandler(c)} disabled={!counters}>
              Reset to zero
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function changeTimerHandler(
  e: ChangeEvent,
  subdivision: keyof ClockTimer,
  category: CountdownCategory,
) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setCountdown = useGlobal.getState().setCountdown

  setCountdown(Number(target.value), subdivision, category, saveFileIndex)
}

function resetTimerHandler(category: CountdownCategory) {
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
