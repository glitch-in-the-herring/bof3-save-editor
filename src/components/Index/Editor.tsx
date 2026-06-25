import CharacterEditor from "./Characters/CharacterEditor";
import FileInput from "./FileInput";
import SaveFileNavigator from "./SaveFileNavigator";

export default function Editor() {
  return <div className="flex flex-col gap-2">
    <FileInput />
    <SaveFileNavigator />
    <CharacterEditor />
    <SaveFileNavigator />
  </div>
}