import FormationBattle from "./FormationBattle"
import FormationField from "./FormationField"

export default function FormationEditor() {
  return (
    <div>
      <h2>Party Formations</h2>
      <div className="grid w-6/12 grid-cols-2">
        <FormationField />
        <FormationBattle />
      </div>
    </div>
  )
}
