import CharacterEditor from "./Characters/CharacterEditor"
import CountersEditor from "./Counters/CountersEditor"
import FileInput from "./FileInput"
import FishingEditor from "./Fishing/FishingEditor"
import InventoryEditor from "./Inventory/InventoryEditor"
import PartyEditor from "./Party/PartyEditor"
import SaveFileNavigator from "./SaveFileNavigator"

export default function Editor() {
  return (
    <div className="flex flex-col gap-2">
      <FileInput />
      <SaveFileNavigator />
      <CharacterEditor />
      <InventoryEditor />
      <PartyEditor />
      <FishingEditor />
      <CountersEditor />
      <SaveFileNavigator />
    </div>
  )
}
