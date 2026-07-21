import { items } from "../../data/items"
import type { DropdownProps } from "../../types/dropdowns"

export default function ItemSelect({ value, onChange, disabled }: DropdownProps) {
  "use no memo"
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {items.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
