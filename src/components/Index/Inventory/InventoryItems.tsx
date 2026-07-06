import { type ChangeEvent } from "react"

import { getItems, useGlobal } from "../../../store/globalStore"
import { itemSelectMap, itemCategories } from "../../../types/inventory"
import Input from "../../shared/Input"

export default function InventoryItems() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const items = getItems(activeOptions, memcard)

  return (
    <div className="flex flex-col justify-between">
      <h3>Items</h3>
      <div className="col-span-5">
        <label htmlFor="inventoryItemCategory">Item category: </label>
        <select id="inventoryItemCategory" onChange={switchItemCategoriesHandler} disabled={!items}>
          {itemCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="h-100 overflow-y-scroll">
        <div className="grid grid-cols-2 px-6">
          <div>Item</div>
          <div>Quantity</div>
          {activeOptions.itemCategory &&
            [...Array(128).keys()].map((i) => (
              <>
                {itemSelectMap[activeOptions.itemCategory!]({
                  value: items ? items[i].id : "",
                  disabled: !items,
                  onChange: (e: ChangeEvent) => switchItemsHandler(e, i),
                })}
                <Input
                  inputType="number"
                  value={items ? items[i].quantity : ""}
                  inputClassName="w-full"
                  disabled={!items}
                  onChange={(e: ChangeEvent) => changeQuantityHandler(e, i)}
                />
              </>
            ))}
        </div>
      </div>
    </div>
  )
}

function switchItemCategoriesHandler(e: ChangeEvent) {
  const target = e.target as HTMLSelectElement

  const setActiveOption = useGlobal.getState().setActiveOption

  setActiveOption(target.value, "itemCategory")
}

function switchItemsHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex, itemCategory } = useGlobal.getState().activeOptions
  if (!itemCategory || saveFileIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setItemID = useGlobal.getState().setItemID

  setItemID(Number(target.value), index, itemCategory, saveFileIndex)
}

function changeQuantityHandler(e: ChangeEvent, index: number) {
  const { saveFileIndex, itemCategory } = useGlobal.getState().activeOptions
  if (!itemCategory || saveFileIndex === undefined) return

  const target = e.target as HTMLSelectElement

  const setItemQuantity = useGlobal.getState().setItemQuantity

  setItemQuantity(Number(target.value), index, itemCategory, saveFileIndex)
}
