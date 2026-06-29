import InventoryItems from "./InventoryItems"
import InventoryVitals from "./InventoryVitals"
import InventoryZenny from "./InventoryZenny"

export default function InventoryEditor() {
  return (
    <div>
      <h2>Inventory</h2>
      <InventoryZenny />
      <div className="grid w-4/12 grid-cols-2 gap-1">
        <h3>Items</h3>
        <h3>Vitals</h3>
        <InventoryItems />
        <InventoryVitals />
      </div>
    </div>
  )
}
