export const elements: string[] = [
  "fire",
  "ice",
  "electric",
  "earth",
  "wind",
  "holy",
  "psionic",
  "status",
  "death",
] as const

export const elementsMap: Record<Element, string> = {
  "fire" : "Fire",
  "ice" : "Ice",
  "electric" : "Electric",
  "earth" : "Earth",
  "wind" : "Wind",
  "holy" : "Holy",
  "psionic" : "Psionic",
  "status" : "Status",
  "death" : "Death",
}

export type Element = typeof elements[number]
