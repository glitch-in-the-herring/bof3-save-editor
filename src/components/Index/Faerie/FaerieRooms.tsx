import FaerieRoomCard from "./FaerieRoomCard"

export default function FaerieRooms() {
  return (
    <div>
      <h3>Rooms</h3>
      <div className="grid w-10/12 grid-cols-4">
        {[...Array(8).keys()].map((x) => (
          <FaerieRoomCard id={x} key={x} />
        ))}
      </div>
    </div>
  )
}
