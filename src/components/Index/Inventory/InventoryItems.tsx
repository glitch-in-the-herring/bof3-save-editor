import { itemSelectMap, itemTypes } from "../../../types/inventory"
import Input from "../../shared/Input"

export default function InventoryItems() {
  return (
    <>
      <div className="col-span-2">
        <label htmlFor="inventoryItemCategory">Item category: </label>
        <select id="inventoryItemCategory">
          {itemTypes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="h-120 overflow-scroll">
        <div className="grid grid-cols-2 px-6">
          {[...Array(128).keys()].map(() => (
            <>
              {itemSelectMap["Item"]({})} <Input inputType="number" inputClassName="w-full" />
            </>
          ))}
        </div>
      </div>
    </>
  )
}
