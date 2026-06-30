import type { DropdownProps } from "../../types/dropdowns"
import { formations } from "../../types/formations"

export default function FormationSelect({ value, onChange, disabled }: DropdownProps) {
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {formations.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
