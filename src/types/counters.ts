export interface ClockTimer {
  hour: number
  minute: number
  second: number
  subsecond: number
}
export const clockTimerKeys: (keyof ClockTimer)[] = ["hour", "minute", "second", "subsecond"]

export const countdownCategories: CountdownCategory[] = ["Celerity", "Bonebreak"]
export type CountdownCategory = "Celerity" | "Bonebreak"

export interface Counters {
  countdowns: Record<CountdownCategory, ClockTimer>
}
