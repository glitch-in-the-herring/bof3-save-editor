export const formationCategories = ["field", "battle"]

export type Formation = Record<FormationCategory, number[]>
export type FormationCategory = (typeof formationCategories)[number]
