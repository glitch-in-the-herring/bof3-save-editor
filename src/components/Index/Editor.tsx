import { useTab } from "../../store/tabStore"
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

const tabs: Record<string, React.JSX.Element> = {
  meta: <MetaEditor />,
  characters: <CharacterEditor />,
  inventory: <InventoryEditor />,
  party: <PartyEditor />,
  fishing: <FishingEditor />,
  counters: <CountersEditor />,
  position: <PositionEditor />,
  faerie: <FaerieEditor />,
}

export default function Editor() {
  const activeTab = useTab((state) => state.activeTab)
  const setTab = useTab((state) => state.setTab)

  return (
    <div className="flex flex-col gap-2">
      <FileInput />
      <SaveFileNavigator />
      <div className="grid grid-cols-[1fr_7fr]">
        <div className="flex flex-col px-2">
          <button onClick={() => setTab("meta")}>Meta</button>
          <button onClick={() => setTab("characters")}>Characters</button>
          <button onClick={() => setTab("inventory")}>Inventory</button>
          <button onClick={() => setTab("party")}>Party</button>
          <button onClick={() => setTab("fishing")}>Fishing</button>
          <button onClick={() => setTab("counters")}>Counter</button>
          <button onClick={() => setTab("position")}>Position</button>
          <button onClick={() => setTab("faerie")}>Faerie</button>
        </div>
        {tabs[activeTab]}
      </div>
      <SaveFileNavigator />
    </div>
  )
}
