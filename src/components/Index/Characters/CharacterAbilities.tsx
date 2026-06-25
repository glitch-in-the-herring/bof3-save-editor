import { spellCategories } from "../../../types/spellCategories"

export default function CharacterAbilities() {
  return (
    <div>
      <h3>Abilities</h3>
      <select>
        {spellCategories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <ol>
        {[...Array(10).keys()].map((i) => (
          <li key={i}>
            <select></select>
          </li>
        ))}
      </ol>
    </div>
  )
}
