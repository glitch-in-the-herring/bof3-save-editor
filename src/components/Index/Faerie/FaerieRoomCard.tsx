import { jobs } from "../../../data/jobs"
import Label from "../../shared/Label"

interface FaerieRoomCardProp {
  id: number
}

export default function FaerieRoomCard({ id }: FaerieRoomCardProp) {
  return (
    <div>
      <div className="font-bold">Room {id + 1}</div>
      <Label label="Job type:">
        <select>
          {jobs.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </Label>
      <Label label="Job subtype:">
        <select>
          {jobs.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </Label>
      <Label label="Job subsubtype:">
        <select>
          {jobs.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </Label>
    </div>
  )
}
