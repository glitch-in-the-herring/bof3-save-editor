import FaerieJobCard from "./FaerieJobCard"

export default function FaerieJobs() {
  return (
    <div>
      <h3>Individual Faeries</h3>
      <div className="h-100 w-10/12 overflow-y-scroll">
        <div className="bg-blue-200">
          Note: Faerie stats are stored in the ROM and cannot be modified through the save file.
        </div>
        <div className="grid grid-cols-3">
          {[...Array(60).keys()].map((i) => (
            <FaerieJobCard id={i} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
