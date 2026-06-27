import { accessories } from "../../data/accessories"
import type { DropdownProps } from "../../types/dropdowns"

export default function AccessorySelect({ value }: DropdownProps) {
  return (
    <select value={value}>
      {accessories.map((e, i) => (
        <option key={i} value={i}>
          {e}
        </option>
      ))}
    </select>
  )
}
