import type { ChangeEvent } from "react"

import { getCharacters, getCounters, getMeta, useGlobal } from "../../../store/globalStore"
import type { Clock } from "../../../types/clock"
import Input from "../../shared/Input"

export default function MetaInfo() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const meta = getMeta(activeOptions, memcard)

  return (
    <div>
      <h3>File Info</h3>
      <div className="flex flex-col gap-2">
        <div>
          <Input
            id="metaChecksum"
            label="Checksum:"
            defaultValue={meta ? meta.checksum : ""}
            disabled
          />
        </div>
        <div className="flex flex-row gap-2">
          <Input
            id="metaName"
            label="Save file name:"
            value={meta ? meta.name : ""}
            onChange={changeFileNameHandler}
            disabled={!meta}
          />
          <button onClick={copyFileNameHandler} disabled={!meta}>
            Copy from Ryu's name
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <Input
            id="metaName"
            inputType="number"
            label="Save file level:"
            value={meta ? meta.level : ""}
            onChange={changeFileLevelHandler}
            disabled={!meta}
          />
          <button onClick={copyFileLevelHandler} disabled={!meta}>
            Copy from Ryu's level
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <Input
            id="metaName"
            inputType="number"
            label="Save file EXP:"
            value={meta ? meta.exp : ""}
            onChange={changeFileEXPHandler}
            disabled={!meta}
          />
          <button onClick={copyFileEXPHandler} disabled={!meta}>
            Copy from Ryu's EXP
          </button>
        </div>
        <div>
          <span>Play time</span>
          <div className="flex flex-row gap-2">
            <Input
              id={`$playTimeHour`}
              inputType="number"
              label="h:"
              value={meta ? meta.playTime.hour : ""}
              onChange={(e: ChangeEvent) => changePlayTimeHandler(e, "hour")}
              disabled={!meta}
              inputClassName="w-10"
            />
            <Input
              id={`$playTimeMinute`}
              inputType="number"
              label="m:"
              value={meta ? meta.playTime.minute : ""}
              onChange={(e: ChangeEvent) => changePlayTimeHandler(e, "minute")}
              inputClassName="w-10"
              disabled={!meta}
            />
            <Input
              id={`$playTimeSecond`}
              inputType="number"
              label="s:"
              value={meta ? meta.playTime.second : ""}
              onChange={(e: ChangeEvent) => changePlayTimeHandler(e, "second")}
              inputClassName="w-10"
              disabled={!meta}
            />
            <Input
              id={`$playTimeSubsecond`}
              inputType="number"
              label="ss:"
              value={meta ? meta.playTime.subsecond : ""}
              onChange={(e: ChangeEvent) => changePlayTimeHandler(e, "subsecond")}
              inputClassName="w-10"
              disabled={!meta}
            />
          </div>
          <button onClick={copyPlayTimeHandler} disabled={!meta}>
            Copy from timers
          </button>
        </div>
      </div>
    </div>
  )
}

function changeFileNameHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setMetaName = useGlobal.getState().setMetaName

  setMetaName(target.value, saveFileIndex)
}

function copyFileNameHandler() {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const memcard = useGlobal.getState().memcard
  const activeOptions = useGlobal.getState().activeOptions
  const characters = getCharacters(activeOptions, memcard)
  if (!characters) return

  const setMetaName = useGlobal.getState().setMetaName

  setMetaName(characters[0].name, saveFileIndex)
}

function changeFileLevelHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setMetaLevel = useGlobal.getState().setMetaLevel

  setMetaLevel(Number(target.value), saveFileIndex)
}

function copyFileLevelHandler() {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const memcard = useGlobal.getState().memcard
  const activeOptions = useGlobal.getState().activeOptions
  const characters = getCharacters(activeOptions, memcard)
  if (!characters) return

  const setMetaLevel = useGlobal.getState().setMetaLevel

  setMetaLevel(characters[0].level, saveFileIndex)
}

function changeFileEXPHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setMetaEXP = useGlobal.getState().setMetaEXP

  setMetaEXP(Number(target.value), saveFileIndex)
}

function copyFileEXPHandler() {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const memcard = useGlobal.getState().memcard
  const activeOptions = useGlobal.getState().activeOptions
  const characters = getCharacters(activeOptions, memcard)
  if (!characters) return

  const setMetaEXP = useGlobal.getState().setMetaEXP

  setMetaEXP(characters[0].exp, saveFileIndex)
}

function changePlayTimeHandler(e: ChangeEvent, subdivision: keyof Clock) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement

  const setMetaPlayTime = useGlobal.getState().setMetaPlayTime

  setMetaPlayTime(Number(target.value), subdivision, saveFileIndex)
}

function copyPlayTimeHandler() {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const memcard = useGlobal.getState().memcard
  const activeOptions = useGlobal.getState().activeOptions
  const counters = getCounters(activeOptions, memcard)
  if (!counters) return

  const copyMetaPlayTime = useGlobal.getState().copyMetaPlayTime

  copyMetaPlayTime(counters.playTime, saveFileIndex)
}
