import { weapons } from "../../data/weapons"
import type { DropdownProps } from "../../types/dropdowns"

export default function WeaponSelect({ value }: DropdownProps) {
  return (
    <select value={value}>
      {weapons.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
