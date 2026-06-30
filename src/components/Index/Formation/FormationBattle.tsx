import { getFormations, useGlobal } from "../../../store/globalStore"
import PartySelect from "../PartySelect"

export default function FormationBattle() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const formations = getFormations(activeOptions, memcard)

  return (
    <div>
      <h3>Battle Formation</h3>
      <ol>
        {[...Array(3).keys()].map((i) => (
          <li key={i}>
            <PartySelect value={formations ? formations["battle"][i] : ""} />
          </li>
        ))}
      </ol>
    </div>
  )
}
