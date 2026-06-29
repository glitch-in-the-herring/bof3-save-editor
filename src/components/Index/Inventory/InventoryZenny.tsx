import { useGlobal } from "../../../store/globalStore"
import Input from "../../shared/Input"

export default function InventoryZenny() {
  const activeOptions = useGlobal((state) => state.activeOptions)

  return (
    <div>
      <Input
        id="inventoryZenny"
        name="inventoryZenny"
        label="Zenny:"
        inputType="number"
        disabled={activeOptions.characterIndex === undefined}
      />
    </div>
  )
}
