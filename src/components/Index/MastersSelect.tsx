import type { DropdownProps } from "../../types/dropdowns"
import { masters } from "../../types/master"

export default function MastersSelect({ value, onChange, disabled }: DropdownProps) {
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {Object.entries(masters).map((e) => (
        <option key={e[0]} value={e[0]}>
          {e[1]}
        </option>
      ))}
    </select>
  )
}
