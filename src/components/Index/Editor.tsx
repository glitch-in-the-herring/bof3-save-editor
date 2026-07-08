import CharacterEditor from "./Characters/CharacterEditor"
import CountersEditor from "./Counters/CountersEditor"
import FaerieEditor from "./Faerie/FaerieEditor"
import FileInput from "./FileInput"
import FishingEditor from "./Fishing/FishingEditor"
import InventoryEditor from "./Inventory/InventoryEditor"
import MetaEditor from "./Meta/MetaEditor"
import PartyEditor from "./Party/PartyEditor"
import PositionEditor from "./Position/PositionEditor"
import SaveFileNavigator from "./SaveFileNavigator"

export default function Editor() {
  return (
    <div className="flex flex-col gap-2">
      <FileInput />
      <SaveFileNavigator />
      <MetaEditor />
      <CharacterEditor />
      <InventoryEditor />
      <PartyEditor />
      <FishingEditor />
      <CountersEditor />
      <PositionEditor />
      <FaerieEditor />
      <SaveFileNavigator />
    </div>
  )
}
