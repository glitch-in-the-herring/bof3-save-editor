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
              <select>
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
                <select>
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
        label="Last battle count:"
        inputType="number"
        inputClassName="w-20"
      />
    </div>
  )
}
