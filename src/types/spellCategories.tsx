export const spellCategories: string[] = ["Heal", "Assist", "Attack", "Skill"] as const

export type SpellCategory = (typeof spellCategories)[number]
