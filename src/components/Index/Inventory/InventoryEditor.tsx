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
      <div className="grid w-10/12 grid-cols-5 gap-1">
        <h3>Items</h3>
        <h3>Vitals</h3>
        <h3>Skill List</h3>
        <h3>Dragon Genes</h3>
        <h3>Masters</h3>
        <InventoryItems />
        <InventoryVitals />
        <InventorySkills />
        <InventoryGenes />
        <InventoryMasters />
      </div>
    </div>
  )
}
