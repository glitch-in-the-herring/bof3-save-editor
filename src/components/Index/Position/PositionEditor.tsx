import PositionArea from "./PositionArea"
import PositionCoords from "./PositionCoords"

export default function PositionEditor() {
  return (
    <div>
      <h2>Position</h2>
      <div className="grid grid-cols-1 lg:w-9/12 lg:grid-cols-2">
        <PositionArea />
        <PositionCoords />
      </div>
    </div>
  )
}
