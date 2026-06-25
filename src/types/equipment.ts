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

export const equipmentIconMap: Record<Equipment, string> = {
  weapon: "weapon",
  shield: "shield",
  helm: "helm",
  armor: "armor",
  accessory1: "accessory",
  accessory2: "accessory",
}

export type Equipment = (typeof equipment)[number]
