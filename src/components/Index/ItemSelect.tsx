import { items } from "../../data/items"
import type { DropdownProps } from "../../types/dropdowns"

export default function ItemSelect({ value }: DropdownProps) {
  return (
    <select value={value}>
      {items.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
