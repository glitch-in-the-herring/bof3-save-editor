import type { Clock } from "../../types/clock"
import { countdownCategories, type CountdownCategory, type Counters } from "../../types/counters"

export default function loadCounters(byteArray: Uint8Array) {
  const countdownsBaseAddress = 0x594

  let counters: Counters = {
    countdowns: countdownCategories.reduce(
      (prev, cur, i) => ({
        ...prev,
        [cur]: {
          hour: byteArray[countdownsBaseAddress + 4 * i],
          minute: byteArray[countdownsBaseAddress + 4 * i + 1],
          second: byteArray[countdownsBaseAddress + 4 * i + 2],
          subsecond: byteArray[countdownsBaseAddress + 4 * i + 3],
        },
      }),
      {} as Record<CountdownCategory, Clock>,
    ),
    playTime: {
      hour: byteArray[0],
      minute: byteArray[1],
      second: byteArray[2],
      subsecond: byteArray[3],
    },
  }

  return counters
}
