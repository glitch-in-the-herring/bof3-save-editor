import type { JSX } from "react/jsx-runtime"

import AccessorySelect from "../components/Index/AccessorySelect"
import ArmorSelect from "../components/Index/ArmorSelect"
import WeaponSelect from "../components/Index/WeaponSelect"
import type { DropdownProps } from "./dropdowns"

export const equipment: string[] = [
  "weapon",
  "shield",
  "helm",
  "armor",
  "accessory1",
  "accessory2",
] as const

export const equipmentLabelMap: Record<Equipment, string> = {
  weapon: "Weapon",
  shield: "Shield",
  helm: "Helm",
  armor: "Armor",
  accessory1: "Accessory 1",
  accessory2: "Accessory 2",
}

export const equipmentSelectMap: Record<Equipment, (props: DropdownProps) => JSX.Element> = {
  weapon: WeaponSelect,
  shield: ArmorSelect,
  helm: ArmorSelect,
  armor: ArmorSelect,
  accessory1: AccessorySelect,
  accessory2: AccessorySelect,
}

export type Equipment = (typeof equipment)[number]
