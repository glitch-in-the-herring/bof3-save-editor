import type { Clock } from "./clock"

export const countdownCategories: CountdownCategory[] = ["Celerity", "Bonebreak"]
export type CountdownCategory = "Celerity" | "Bonebreak"

export interface Counters {
  countdowns: Record<CountdownCategory, Clock>
  playTime: Clock
}
