import { getFaerieVillage, useGlobal } from "../../../store/globalStore"
import FaerieJobCard from "./FaerieJobCard"

export default function FaerieJobs() {
  const memcard = useGlobal((state) => state.memcard)
  const activeOptions = useGlobal((state) => state.activeOptions)
  const faerieVillage = getFaerieVillage(activeOptions, memcard)

  return (
    <div>
      <h3>Individual Faeries</h3>
      <div className="bg-blue-200 w-10/12">
        Note: Faerie stats are stored in the ROM and cannot be modified through the save file.
      </div>
      <div className="h-100 w-10/12 overflow-y-scroll">
        <div className="grid grid-cols-3">
          {[...Array(60).keys()].map((i) => (
            <FaerieJobCard id={i} key={i} />
          ))}
        </div>
      </div>
      {faerieVillage && (
        <div>
          There are{" "}
          {faerieVillage.faerieJobs.filter((x) => !!x.status).length} living
          faeries
        </div>
      )}
    </div>
  )
}
