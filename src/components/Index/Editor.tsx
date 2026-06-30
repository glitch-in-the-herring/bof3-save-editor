import CharacterEditor from "./Characters/CharacterEditor"
import FileInput from "./FileInput"
import FishingEditor from "./Fishing/FishingEditor"
import FormationEditor from "./Formation/FormationEditor"
import InventoryEditor from "./Inventory/InventoryEditor"
import SaveFileNavigator from "./SaveFileNavigator"

export default function Editor() {
  return (
    <div className="flex flex-col gap-2">
      <FileInput />
      <SaveFileNavigator />
      <CharacterEditor />
      <InventoryEditor />
      <FormationEditor />
      <FishingEditor />
      <SaveFileNavigator />
    </div>
  )
}
