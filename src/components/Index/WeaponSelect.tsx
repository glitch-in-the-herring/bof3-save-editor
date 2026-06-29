import { weapons } from "../../data/weapons"
import type { DropdownProps } from "../../types/dropdowns"

export default function WeaponSelect({ value, onChange, disabled }: DropdownProps) {
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {weapons.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
