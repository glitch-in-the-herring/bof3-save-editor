import type { Position } from "../../types/position"
import { bytesToNumber } from "../numbers"

export default function loadLocation(byteArray: Uint8Array) {
  const coordsBaseAddress = 4

  let position: Position = {
    area: byteArray[0],
    x: {
      fraction: bytesToNumber(byteArray.slice(coordsBaseAddress, coordsBaseAddress + 2), false),
      integer: bytesToNumber(byteArray.slice(coordsBaseAddress + 2, coordsBaseAddress + 4), false),
    },
    y: {
      fraction: bytesToNumber(byteArray.slice(coordsBaseAddress + 4, coordsBaseAddress + 6), false),
      integer: bytesToNumber(byteArray.slice(coordsBaseAddress + 6, coordsBaseAddress + 7), false),
    },
  }
  return position
}
