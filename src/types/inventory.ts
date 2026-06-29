import type { JSX } from "react/jsx-runtime"

import AccessorySelect from "../components/Index/AccessorySelect"
import ArmorSelect from "../components/Index/ArmorSelect"
import ItemSelect from "../components/Index/ItemSelect"
import WeaponSelect from "../components/Index/WeaponSelect"
import type { DropdownProps } from "./dropdowns"

export interface Inventory {
  zenny: number
  items: Record<ItemType, ItemEntry[]>
  vitalItems: number[]
  skillNote: number[]
  dragonGenes: number[]
  masters: number[]
}

export interface ItemEntry {
  id: number
  quantity: number
}

export const itemSelectMap: Record<ItemType, (props: DropdownProps) => JSX.Element> = {
  Item: ItemSelect,
  Weapon: WeaponSelect,
  Armor: ArmorSelect,
  Option: AccessorySelect,
}

export const itemTypes = ["Item", "Weapon", "Armor", "Option"]
export type ItemType = (typeof itemTypes)[number]
