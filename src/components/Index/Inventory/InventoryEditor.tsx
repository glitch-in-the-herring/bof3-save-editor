import InventoryGenes from "./InventoryGenes"
import InventoryItems from "./InventoryItems"
import InventoryMasters from "./InventoryMasters"
import InventorySkills from "./InventorySkills"
import InventoryVitals from "./InventoryVitals"
import InventoryZenny from "./InventoryZenny"

export default function InventoryEditor() {
  return (
    <div>
      <h2>Inventory</h2>
      <InventoryZenny />
      <div className="grid gap-1 lg:w-9/12 lg:grid-cols-5 grid-cols-1">
        <InventoryItems />
        <InventoryVitals />
        <InventorySkills />
        <InventoryGenes />
        <InventoryMasters />
      </div>
    </div>
  )
}
