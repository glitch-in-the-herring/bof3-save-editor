import MetaIcons from "./MetaIcons"
import MetaInfo from "./MetaInfo"

export default function MetaEditor() {
  return (
    <div>
      <h2>Metadata</h2>
      <div className="grid grid-cols-1 lg:w-9/12 lg:grid-cols-2">
        <MetaInfo />
        <MetaIcons />
      </div>
    </div>
  )
}
