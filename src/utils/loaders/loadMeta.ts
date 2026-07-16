import type { Meta } from "../../types/meta"
import { bytesToNumber } from "../numbers"
import { decode } from "../strings"

export default function loadMeta(byteArray: Uint8Array) {
  const metaBaseAdddress = 0xc30

  let meta: Meta = {
    checksum: bytesToNumber(byteArray.slice(0, 2), false),
    name: decode(byteArray.slice(metaBaseAdddress, metaBaseAdddress + 5)),
    portraits: Array.from(byteArray.slice(metaBaseAdddress + 5, metaBaseAdddress + 8)),
    level: byteArray[metaBaseAdddress + 8],
    exp: bytesToNumber(byteArray.slice(metaBaseAdddress + 16, metaBaseAdddress + 20), false),
    playTime: {
      hour: byteArray[metaBaseAdddress + 12],
      minute: byteArray[metaBaseAdddress + 13],
      second: byteArray[metaBaseAdddress + 14],
      subsecond: byteArray[metaBaseAdddress + 15],
    },
  }

  return meta
}
