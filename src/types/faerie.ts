export interface FaerieStats {
  name: string
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
