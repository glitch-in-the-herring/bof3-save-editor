import { orderingCategories, type OrderingCategory, type Party } from "../../types/formations"

export default function loadParty(byteArray: Uint8Array) {
  let orderingBaseAddress = 0x2

  let formation: Party = {
    orderings: orderingCategories.reduce(
      (prev, cur, i) => ({
        ...prev,
        [cur]: Array.from(
          byteArray.slice(orderingBaseAddress + i * 3, orderingBaseAddress + i * 3 + 3),
        ),
      }),
      {} as Record<OrderingCategory, number[]>,
    ),
    activeFormation: byteArray[0],
    unlockedFormations: byteArray[1],
  }

  return formation
}
