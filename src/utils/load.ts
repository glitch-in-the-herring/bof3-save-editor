import type { SaveFile } from "../types/memcard"
import loadCharacters from "./loaders/loadCharacters"
import loadCounters from "./loaders/loadCounters"
import loadFaerieVillage from "./loaders/loadFaerieVillage"
import loadFishing from "./loaders/loadFishing"
import loadInventory from "./loaders/loadInventory"
import loadLocation from "./loaders/loadLocation"
import loadMeta from "./loaders/loadMeta"
import loadParty from "./loaders/loadParty"

export function loadSaveFile(byteArray: Uint8Array, address: number) {
  let saveFile: SaveFile = {
    address: address,
    meta: loadMeta(byteArray.slice(address + 0x270, address + 0xeb4)),
    characters: loadCharacters(byteArray.slice(address + 0x290, address + 0x7b0)),
    inventory: loadInventory(byteArray.slice(address + 0x878, address + 0xea0)),
    party: loadParty(byteArray.slice(address + 0x880, address + 0x888)),
    fishing: loadFishing(byteArray.slice(address + 0x90c, address + 0x924)),
    counters: loadCounters(byteArray.slice(address + 0x8e8, address + 0xe84)),
    position: loadLocation(byteArray.slice(address + 0x224, address + 0x230)),
    faerieVillage: loadFaerieVillage(byteArray.slice(address + 0x86e, address + 0x123c)),
  }

  return saveFile
}
