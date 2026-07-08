export interface Faerie {
  name: string
  stats: FaerieStats
}

export interface FaerieStats {
  power: number
  construction: number
  culture: number
  intelligence: number
}

export interface FaerieJob {
  status: FaerieStatus
  room: number
  jobData: number[]
  battles: number
}

export interface FaerieRoom {
  type: number
  subtype: number
  subsubtype: number
  battles: number
}

type FaerieStatus = "Dead" | "Alive"

export const FaerieStatsKeys: (keyof FaerieStats)[] = [
  "power",
  "construction",
  "culture",
  "intelligence",
]

export const FaerieStatsColors: Record<keyof FaerieStats, string> = {
  power: "bg-red-400",
  construction: "bg-green-400",
  culture: "bg-indigo-400",
  intelligence: "bg-cyan-400",
}
