export interface Position {
  area: number
  x: Axis
  y: Axis
}

export interface Axis {
  fraction: number
  integer: number
}


export const axisKeys: (keyof Axis)[] = ["fraction", "integer"]