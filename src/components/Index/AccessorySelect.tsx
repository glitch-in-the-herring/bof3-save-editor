import { accessories } from "../../data/accessories"
import type { DropdownProps } from "../../types/dropdowns"

export default function AccessorySelect({ value, onChange, disabled }: DropdownProps) {
  console.log("accessory dropdown")
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {accessories.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
