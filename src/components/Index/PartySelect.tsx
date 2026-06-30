import { useGlobal } from "../../store/globalStore"
import type { DropdownProps } from "../../types/dropdowns"

interface PartyMember {
  id: number
  name: string
}

export default function PartySelect({ value, onChange, disabled }: DropdownProps) {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const partyNames: PartyMember[] = [{ id: 0xff, name: "--" }]

  if (activeOptions.saveFileIndex !== undefined) {
    const characters = memcard.saveFiles[activeOptions.saveFileIndex].characters
    partyNames.push({ id: 0x00, name: `${characters[0].name} (young)` })
    partyNames.push({ id: 0x01, name: `${characters[1].name} (young)` })
    partyNames.push(
      ...characters.slice(2, 7).map(
        (c, i) =>
          ({
            id: i + 2,
            name: c.name,
          }) as PartyMember,
      ),
    )
    partyNames.push({ id: 0x07, name: `${characters[0].name} (adult)` })
    partyNames.push({ id: 0x08, name: `${characters[1].name} (adult)` })
    partyNames.push({ id: 0x09, name: `${characters[0].name} (pajamas)` })
  }

  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {partyNames.map((e, i) => (
        <option key={i} value={e.id}>
          {e.name}
        </option>
      ))}
    </select>
  )
}
