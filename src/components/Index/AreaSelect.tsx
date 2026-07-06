import { areas } from "../../data/areas"
import type { DropdownProps } from "../../types/dropdowns"

export default function AreaSelect({ value, onChange, disabled }: DropdownProps) {
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {areas.map((a, i) => (
        <option key={i} value={i}>
          AREA{String(i).padStart(3, "0")}: {a}
        </option>
      ))}
    </select>
  )
}
