import PartyFormation from "./PartyActiveFormation"
import PartyOrderingList from "./PartyOrderingList"
import PartyUnlockedFormations from "./PartyUnlockedFormations"

export default function PartyEditor() {
  return (
    <div>
      <h2>Formation and Ordering</h2>
      <div className="grid w-6/12 grid-cols-2">
        <PartyOrderingList category="field" heading="Field Ordering" />
        <PartyOrderingList category="battle" heading="Battle Ordering" />
        <PartyFormation />
        <PartyUnlockedFormations />
      </div>
    </div>
  )
}
