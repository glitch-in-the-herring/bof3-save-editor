import { fish, type Fish, type Fishing } from "../../types/fishing"

export default function loadFishing(byteArray: Uint8Array) {
  let fishing: Fishing = {
    lengths: Array.from(byteArray).reduce(
      (prev, cur, i) => ({
        ...prev,
        [fish[i]]: cur,
      }),
      {} as Record<Fish, number>,
    ),
  }

  return fishing
}
