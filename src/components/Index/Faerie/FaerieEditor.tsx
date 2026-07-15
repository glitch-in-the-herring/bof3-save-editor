import FaerieRooms from "./FaerieRooms"
import FaerieJobs from "./FaeriesJobs"
import FaerieVillageStats from "./FaerieVillageStats"

export default function FaerieEditor() {
  return (
    <div>
      <h2>Faeries</h2>
      <FaerieVillageStats />
      <FaerieJobs />
      <FaerieRooms />
    </div>
  )
}
