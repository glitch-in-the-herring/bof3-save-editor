import {
  FaerieStatsColors,
  FaerieStatsKeys,
  type FaerieJob,
  type Faerie,
} from "../../../types/faerie"
import Label from "../../shared/Label"

interface FaerieJobCardProp {
  faerie: Faerie
  job?: FaerieJob
}

// w-0/5
// w-1/5
// w-2/5
// w-3/5
// w-4/5
// w-5/5

export default function FaerieJobCard({ faerie }: FaerieJobCardProp) {
  return (
    <div className="border p-2">
      <div className="font-bold">{faerie.name}</div>
      <div className="grid grid-cols-2">
        {FaerieStatsKeys.map((x) => (
          <>
            <div className="capitalize">{x}</div>
            <div className="bg-gray-300">
              <div
                className={`${faerie.stats[x] > 0 && FaerieStatsColors[x]} h-full w-${faerie.stats[x]}/5 pl-2`}
              >
                <span>{faerie.stats[x]}</span>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="flex flex-col">
        <Label label="Alive?">
          <input type="checkbox" />
        </Label>
        <Label label="Assignment:">
          <select>
            {[...Array(12).keys()].map((i) => (
              <option key={i}>
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
                  if (i >= 1 && i <= 8) return `Room ${i}`
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
