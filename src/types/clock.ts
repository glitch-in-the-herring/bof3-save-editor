export interface Clock {
  hour: number
  minute: number
  second: number
  subsecond: number
}

export const clockKeys: (keyof Clock)[] = ["hour", "minute", "second", "subsecond"]
