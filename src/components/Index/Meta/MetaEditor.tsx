import MetaIcons from "./MetaIcons"
import MetaInfo from "./MetaInfo"

export default function MetaEditor() {
  return (
    <div>
      <h2>Metadata</h2>
      <div className="grid w-9/12 grid-cols-2">
        <MetaInfo />
        <MetaIcons />
      </div>
    </div>
  )
}
