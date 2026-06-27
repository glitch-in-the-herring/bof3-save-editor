import { armor } from "../../data/armor"
import type { DropdownProps } from "../../types/dropdowns"

export default function ArmorSelect({ value }: DropdownProps) {
  return (
    <select value={value}>
      {armor.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
