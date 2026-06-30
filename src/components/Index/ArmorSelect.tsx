import { armor } from "../../data/armor"
import type { DropdownProps } from "../../types/dropdowns"

export default function ArmorSelect({ value, onChange, disabled }: DropdownProps) {
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {armor.map((a, i) => (
        <option key={i} value={i}>
          {a}
        </option>
      ))}
    </select>
  )
}
