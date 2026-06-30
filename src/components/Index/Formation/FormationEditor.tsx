import FormationList from "./FormationList"

export default function FormationEditor() {
  return (
    <div>
      <h2>Party Formations</h2>
      <div className="grid w-6/12 grid-cols-2">
        <FormationList category="field" heading="Field Formation" />
        <FormationList category="battle" heading="Battle Formation" />
      </div>
    </div>
  )
}
