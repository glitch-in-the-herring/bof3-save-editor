import type { Clock } from "./clock"

export interface Meta {
  name: string
  playTime: Clock
  level: number
  exp: number
  portraits: number[]
  checksum: number
}
