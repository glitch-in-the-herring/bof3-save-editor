export const formationCategories: FormationCategory[] = ["field", "battle"]

export type Formation = Record<FormationCategory, number[]>
export type FormationCategory = "field" | "battle"
