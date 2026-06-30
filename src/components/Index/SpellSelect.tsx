import { spells } from "../../data/spells"
import type { DropdownProps } from "../../types/dropdowns"

export default function SpellSelect({ value, onChange, disabled }: DropdownProps) {
  return (
    <select value={value} disabled={disabled} onChange={onChange}>
      {spells.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
