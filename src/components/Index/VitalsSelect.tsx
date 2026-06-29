import { vitals } from "../../data/vitals"
import type { DropdownProps } from "../../types/dropdowns"

export default function VitalsSelect({ value, onChange, disabled }: DropdownProps) {
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {vitals.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
