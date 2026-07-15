export interface FaerieVillage {
  faerieJobs: FaerieJob[]
  faerieRooms: FaerieRoom[]
  faerieNames: string[]
  food: number
  culture: number
  maxJobs: number
  stage: number[]
  battleCounts: FaerieVillageBattles
  constructionPowers: ConstructionPowers
}

export interface FaerieVillageBattles {
  huntingBattleCount: number
  constructionBattleCounter: number
  scholarBattleCount: number
}

export interface ConstructionPowers {
  clearPower: number
  buildPower: number
}

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
  status: number
  room: number
  jobData: number[]
  battles: number
}

export interface FaerieRoom {
  type: number
  subtype: number
  subsubtype: number
  level: number
  battles: number
}

export const faerieStatus = ["Dead", "Alive"]
export const copyStatus = ["Idle", "Not Done", "Success", "Failure", "Spectacular Failure"]
export const explorationStatus = ["Idle", "Exploring", "Success", "Failure"]

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
