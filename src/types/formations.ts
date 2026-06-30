export const orderingCategories: OrderingCategory[] = ["field", "battle"]
export type OrderingCategory = "field" | "battle"

export const formations = ["Normal", "Attack", "Defense", "Chain", "Magic", "Refuge"]

export interface Party {
  orderings: Record<OrderingCategory, number[]>
  activeFormation: number
  unlockedFormations: number
}
