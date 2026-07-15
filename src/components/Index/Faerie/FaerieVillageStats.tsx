import type { ChangeEvent } from "react"

import { villageStage } from "../../../data/faeries"
import { jobs } from "../../../data/jobs"
import { useGlobal, getFaerieVillage } from "../../../store/globalStore"
import type { ConstructionPowers, FaerieVillageBattles } from "../../../types/faerie"
import Input from "../../shared/Input"
import Label from "../../shared/Label"

export default function FaerieVillageStats() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const faerieVillage = getFaerieVillage(activeOptions, memcard)

  return (
    <div>
      <h3>Village Stats</h3>
      <div className="grid w-10/12 grid-cols-3">
        <div>
          <Input
            id="villageFood"
            label="Food:"
            inputType="number"
            value={faerieVillage ? faerieVillage.food : ""}
            onChange={changeFoodHandler}
            inputClassName="w-20"
            disabled={!faerieVillage}
          />
          <Input
            id="villageFood"
            label="Culture:"
            inputType="number"
            value={faerieVillage ? faerieVillage.culture : ""}
            onChange={changeCultureHandler}
            inputClassName="w-20"
            disabled={!faerieVillage}
          />
          <Label label="Unlocked jobs up to:">
            <select
              value={faerieVillage ? faerieVillage.maxJobs : ""}
              onChange={changeMaxJobsHandler}
              disabled={!faerieVillage}
            >
              {jobs.map((x, i) => (
                <option value={i + 1} key={i}>
                  {x}
                </option>
              ))}
            </select>
          </Label>
          <Label label="Construction stage:">
            <select
              value={
                faerieVillage
                  ? ((faerieVillage.stage[0] & 0xc0) >> 6) | (faerieVillage.stage[1] << 2)
                  : ""
              }
              onChange={changeStageHandler}
              disabled={!faerieVillage}
            >
              {villageStage.map((x, i) => (
                <option value={(1 << i) - 1} key={i}>
                  {x}
                </option>
              ))}
            </select>
          </Label>
          <Label label="Unknown bit enabled?">
            <input
              type="checkbox"
              checked={faerieVillage ? !!(faerieVillage.stage[0] & 0x20) : false}
              value={faerieVillage ? faerieVillage.stage[0] : ""}
              onChange={setUnknownByteHandler}
              disabled={!faerieVillage}
            />
          </Label>
        </div>
        <div>
          <Input
            id="villageBuildPower"
            label="Build power:"
            inputType="number"
            value={faerieVillage ? faerieVillage.constructionPowers.buildPower : ""}
            onChange={(e: ChangeEvent) => changePowerHandler(e, "buildPower")}
            inputClassName="w-20"
            disabled={!faerieVillage}
          />
          <Input
            id="villageClearPower"
            label="Clear power:"
            inputType="number"
            value={faerieVillage ? faerieVillage.constructionPowers.clearPower : ""}
            onChange={(e: ChangeEvent) => changePowerHandler(e, "clearPower")}
            inputClassName="w-20"
            disabled={!faerieVillage}
          />
        </div>
        <div>
          <Input
            id="villageHuntBattle"
            label="Hunting battle count:"
            inputType="number"
            value={faerieVillage ? faerieVillage.battleCounts.huntingBattleCount : ""}
            onChange={(e: ChangeEvent) => changeBattleCountHandler(e, "huntingBattleCount")}
            inputClassName="w-20"
            disabled={!faerieVillage}
          />
          <Input
            id="villageConstructionCounter"
            label="Construction battle counter:"
            inputType="number"
            value={faerieVillage ? faerieVillage.battleCounts.constructionBattleCounter : ""}
            onChange={(e: ChangeEvent) => changeBattleCountHandler(e, "constructionBattleCounter")}
            inputClassName="w-20"
            disabled={!faerieVillage}
          />
          <Input
            id="villageScholarBattle"
            label="Scholar battle count:"
            inputType="number"
            value={faerieVillage ? faerieVillage.battleCounts.scholarBattleCount : ""}
            onChange={(e: ChangeEvent) => changeBattleCountHandler(e, "scholarBattleCount")}
            inputClassName="w-20"
            disabled={!faerieVillage}
          />
        </div>
      </div>
    </div>
  )
}

function changeFoodHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setFood = useGlobal.getState().setFood

  setFood(Number(target.value), saveFileIndex)
}

function changeCultureHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setCulture = useGlobal.getState().setCulture

  setCulture(Number(target.value), saveFileIndex)
}

function changeStageHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setConstructionStage = useGlobal.getState().setConstructionStage

  setConstructionStage((Number(target.value) & 0x3) << 6, 0, saveFileIndex)
  setConstructionStage((Number(target.value) & 0x3fc) >> 2, 1, saveFileIndex)
}

function setUnknownByteHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setConstructionStage = useGlobal.getState().setConstructionStage

  setConstructionStage(Number(target.value) | 0x20, 0, saveFileIndex)
}

function changePowerHandler(e: ChangeEvent, key: keyof ConstructionPowers) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setConstructionPower = useGlobal.getState().setConstructionPower

  setConstructionPower(Number(target.value), key, saveFileIndex)
}

function changeBattleCountHandler(e: ChangeEvent, key: keyof FaerieVillageBattles) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setBattleCount = useGlobal.getState().setBattleCount

  setBattleCount(Number(target.value), key, saveFileIndex)
}

function changeMaxJobsHandler(e: ChangeEvent) {
  const { saveFileIndex } = useGlobal.getState().activeOptions
  if (saveFileIndex === undefined) return

  const target = e.target as HTMLInputElement
  const setMaxJob = useGlobal.getState().setMaxJob

  setMaxJob(Number(target.value), saveFileIndex)
}
