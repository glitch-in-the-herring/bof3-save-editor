import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

import { statGrowthKeys, type Character, type StatGrowthKey } from "../types/character"
import { clockKeys, type Clock } from "../types/clock"
import { type CountdownCategory } from "../types/counters"
import type { Element } from "../types/element"
import type { Equipment } from "../types/equipment"
import type { Fish } from "../types/fishing"
import type { OrderingCategory } from "../types/formations"
import type { ItemCategory } from "../types/inventory"
import type { Memcard } from "../types/memcard"
import type { Axis } from "../types/position"
import type { SpellCategory } from "../types/spellCategories"

interface GlobalState
  extends
    ActiveOptionsState,
    MetaState,
    CharacterState,
    InventoryState,
    PartyState,
    FishingState,
    CountersState,
    PositionState,
    FaerieRoomState,
    FaerieJobState {
  memcard: Memcard
  byteArray?: Uint8Array
  filename?: string
  setMemcard: (memcard: Memcard) => void
  setByteArray: (byteArray: Uint8Array) => void
  setFilename: (filename: string) => void
}

interface ActiveOptions {
  saveFileIndex?: number
  characterIndex?: number
  spellCategory?: SpellCategory
  itemCategory?: ItemCategory
}

interface ActiveOptionsState {
  activeOptions: ActiveOptions
  setActiveOption: <K extends keyof ActiveOptions>(value: ActiveOptions[K], key: K) => void
}

interface MetaState {
  setMetaName: (value: string, saveFileIndex: number) => void
  setMetaLevel: (value: number, saveFileIndex: number) => void
  setMetaEXP: (value: number, saveFileIndex: number) => void
  setMetaPlayTime: (value: number, subdivision: keyof Clock, saveFileIndex: number) => void
  copyMetaPlayTime: (value: Clock, saveFileIndex: number) => void
  setMetaPortrait: (value: number, index: number, saveFileIndex: number) => void
}

interface CharacterState {
  setCharacterField: <K extends keyof Character>(
    value: Character[K],
    key: K,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  setCharacterResistance: (
    value: number,
    element: Element,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  setCharacterEquipment: (
    value: number,
    equipment: Equipment,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  setCharacterSpell: (
    value: number,
    index: number,
    category: SpellCategory,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  setCharacterGrowth: (
    value: number,
    key: StatGrowthKey,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
  copyStatGrowth: (
    statGrowth: Record<StatGrowthKey, number>,
    saveFileIndex: number,
    characterIndex: number,
  ) => void
}

interface InventoryState {
  setZenny: (value: number, saveFileIndex: number) => void
  setItemID: (value: number, index: number, category: ItemCategory, saveFileIndex: number) => void
  setItemQuantity: (
    value: number,
    index: number,
    category: ItemCategory,
    saveFileIndex: number,
  ) => void
  setVitalItem: (value: number, index: number, saveFileIndex: number) => void
  setSkillNote: (value: number, index: number, saveFileIndex: number) => void
  setDragonGenes: (value: number, index: number, saveFileIndex: number) => void
  setMasters: (value: number, index: number, saveFileIndex: number) => void
}

interface PartyState {
  setOrdering: (
    value: number,
    index: number,
    category: OrderingCategory,
    saveFileIndex: number,
  ) => void
  setActiveFormation: (value: number, saveFileIndex: number) => void
  setUnlockedFormations: (value: number, saveFileIndex: number) => void
}

interface FishingState {
  setFishLength: (value: number, fish: Fish, saveFileIndex: number) => void
}

interface CountersState {
  setCountdown: (
    value: number,
    subdivision: keyof Clock,
    category: CountdownCategory,
    saveFileIndex: number,
  ) => void
  setPlayTime: (value: number, subdivision: keyof Clock, saveFileIndex: number) => void
  copyCountdown: (value: Clock, category: CountdownCategory, saveFileIndex: number) => void
  copyPlayTime: (value: Clock, saveFileIndex: number) => void
}

interface PositionState {
  setArea: (value: number, saveFileIndex: number) => void
  setX: (value: number, part: keyof Axis, saveFileIndex: number) => void
  setY: (value: number, part: keyof Axis, saveFileIndex: number) => void
}

interface FaerieRoomState {
  setRoomType: (value: number, room: number, saveFileIndex: number) => void
  setRoomSubtype: (value: number, room: number, saveFileIndex: number) => void
  setRoomSubsubtype: (value: number, room: number, saveFileIndex: number) => void
}

interface FaerieJobState {
  setFaerieAlive: (value: number, id: number, saveFileIndex: number) => void
  setFaerieName: (value: string, id: number, saveFileIndex: number) => void
  setFaerieRoom: (value: number, id: number, saveFileIndex: number) => void
}

export const useGlobal = create<GlobalState>()(
  immer((set) => ({
    memcard: {
      saveFiles: [],
    },
    activeOptions: {},
    setMemcard: (memcard) => set({ memcard: memcard }),
    setByteArray: (byteArray) => set({ byteArray: byteArray }),
    setFilename: (filename) => set({ filename: filename }),
    setActiveOption: (value, key) =>
      set((state) => {
        state.activeOptions[key] = value
      }),
    setMetaName: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].meta.name = value
      }),
    setMetaLevel: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].meta.level = value
      }),
    setMetaEXP: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].meta.exp = value
      }),
    setMetaPlayTime: (value, subdivision, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].meta.playTime[subdivision] = value
      }),
    copyMetaPlayTime: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        clockKeys.forEach((key) => {
          state.memcard.saveFiles[saveFileIndex].meta.playTime[key] = value[key]
        })
      }),
    setMetaPortrait: (value, index, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].meta.portraits[index] = value
      }),
    setCharacterField: (value, key, saveFileIndex, characterIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex][key] = value
      }),
    setCharacterResistance: (value, element, saveFileIndex, characterIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex].resistances[element] =
          value
      }),
    setCharacterEquipment: (value, equipment, saveFileIndex, characterIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex].equipment[equipment] =
          value
      }),
    setCharacterSpell: (value, index, category, saveFileIndex, characterIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const spells =
          state.memcard.saveFiles[saveFileIndex].characters[characterIndex].spells[category]

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex].spells[category] =
          spells.map((id, i) => (i === index ? value : id))
      }),
    setCharacterGrowth: (value, key, saveFileIndex, characterIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].characters[characterIndex].statGrowth[key] = value
      }),
    copyStatGrowth: (statGrowth, saveFileIndex, characterIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        statGrowthKeys.forEach((key) => {
          state.memcard.saveFiles[saveFileIndex].characters[characterIndex].statGrowth[key] =
            statGrowth[key]
        })
      }),
    setZenny: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].inventory.zenny = value
      }),
    setItemID: (value, index, category, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const items = state.memcard.saveFiles[saveFileIndex].inventory.items[category]
        state.memcard.saveFiles[saveFileIndex].inventory.items[category] = items.map((item, i) =>
          i === index ? { id: value, quantity: item.quantity } : item,
        )
      }),
    setItemQuantity: (value, index, category, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const items = state.memcard.saveFiles[saveFileIndex].inventory.items[category]
        state.memcard.saveFiles[saveFileIndex].inventory.items[category] = items.map((item, i) =>
          i === index ? { id: item.id, quantity: value } : item,
        )
      }),
    setSkillNote: (value, index, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const skillNote = state.memcard.saveFiles[saveFileIndex].inventory.skillNote
        state.memcard.saveFiles[saveFileIndex].inventory.skillNote = skillNote.map((id, i) =>
          i === index ? value : id,
        )
      }),
    setVitalItem: (value, index, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const vitalItems = state.memcard.saveFiles[saveFileIndex].inventory.vitalItems
        state.memcard.saveFiles[saveFileIndex].inventory.vitalItems = vitalItems.map((id, i) =>
          i === index ? value : id,
        )
      }),
    setDragonGenes: (value, index, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const dragonGenes = state.memcard.saveFiles[saveFileIndex].inventory.dragonGenes
        state.memcard.saveFiles[saveFileIndex].inventory.dragonGenes = dragonGenes.map((g, i) =>
          i === index ? value : g,
        )
      }),
    setMasters: (value, index, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const masters = state.memcard.saveFiles[saveFileIndex].inventory.masters
        state.memcard.saveFiles[saveFileIndex].inventory.masters = masters.map((m, i) =>
          i === index ? value : m,
        )
      }),
    setOrdering: (value, index, category, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const formation = state.memcard.saveFiles[saveFileIndex].party.orderings[category]
        state.memcard.saveFiles[saveFileIndex].party.orderings[category] = formation.map((p, i) =>
          i === index ? value : p,
        )
      }),
    setActiveFormation: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].party.activeFormation = value
      }),
    setUnlockedFormations: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].party.unlockedFormations = value
      }),
    setFishLength: (value, fish, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].fishing.lengths[fish] = value
      }),
    setCountdown: (value, subdivision, category, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].counters.countdowns[category][subdivision] = value
      }),
    setPlayTime: (value, subdivision, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].counters.playTime[subdivision] = value
      }),
    copyCountdown: (value, category, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        clockKeys.forEach((key) => {
          state.memcard.saveFiles[saveFileIndex].counters.countdowns[category][key] = value[key]
        })
      }),
    copyPlayTime: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        clockKeys.forEach((key) => {
          state.memcard.saveFiles[saveFileIndex].counters.playTime[key] = value[key]
        })
      }),
    setArea: (value, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].position.area = value
      }),
    setX: (value, part, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].position.x[part] = value
      }),
    setY: (value, part, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        state.memcard.saveFiles[saveFileIndex].position.y[part] = value
      }),
    setRoomType: (value, room, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const rooms = state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieRooms
        state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieRooms = rooms.map((x, i) =>
          i === room ? { ...x, type: value } : x,
        )
      }),
    setRoomSubtype: (value, room, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const rooms = state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieRooms
        state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieRooms = rooms.map((x, i) =>
          i === room ? { ...x, subtype: value } : x,
        )
      }),
    setRoomSubsubtype: (value, room, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const rooms = state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieRooms
        state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieRooms = rooms.map((x, i) =>
          i === room ? { ...x, subsubtype: value } : x,
        )
      }),
    setFaerieAlive: (value, id, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const jobs = state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieJobs
        state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieJobs = jobs.map((x, i) =>
          i === id ? { ...x, status: value } : x,
        )
      }),
    setFaerieName: (value, id, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const names = state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieNames
        state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieNames = names.map((x, i) =>
          i === id ? value : x,
        )
      }),
    setFaerieRoom: (value, id, saveFileIndex) =>
      set((state) => {
        if (!state.memcard.saveFiles[saveFileIndex]) return

        const jobs = state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieJobs
        state.memcard.saveFiles[saveFileIndex].faerieVillage.faerieJobs = jobs.map((x, i) =>
          i === id ? { ...x, room: value } : x,
        )
      }),
  })),
)

export function getMeta(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.characterIndex !== undefined && activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].meta
    : null
}

export function getCharacters(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.characterIndex !== undefined && activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].characters
    : null
}

export function getCharacter(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.characterIndex !== undefined && activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].characters[activeOptions.characterIndex]
    : null
}

export function getInventory(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].inventory
    : null
}

export function getItems(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.itemCategory && activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].inventory.items[activeOptions.itemCategory]
    : null
}

export function getVitalItems(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].inventory.vitalItems
    : null
}

export function getSkillNote(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].inventory.skillNote
    : null
}

export function getParty(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].party
    : null
}

export function getFishing(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].fishing
    : null
}

export function getCounters(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].counters
    : null
}

export function getPosition(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].position
    : null
}

export function getFaerieVillage(activeOptions: ActiveOptions, memcard: Memcard) {
  return activeOptions.saveFileIndex !== undefined
    ? memcard.saveFiles[activeOptions.saveFileIndex].faerieVillage
    : null
}
