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
        label="Renamed as:"
        value={faerieVillage ? faerieVillage.faerieNames[id] : faeries[id].name}
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
          />
        </Label>
        <Label label="Assignment:">
          <select value={faerieVillage ? faerieVillage.faerieJobs[id].room : ""}>
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
      </div>
    </div>
  )
}
