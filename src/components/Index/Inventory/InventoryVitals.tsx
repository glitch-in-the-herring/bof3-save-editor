import VitalsSelect from "../VitalsSelect"

export default function InventoryVitals() {
  return (
    <>
      <div className="h-120 overflow-scroll">
        <div className="grid grid-cols-1 px-6">
          {[...Array(32).keys()].map((i) => (
            <VitalsSelect key={i}/>
          ))}
        </div>
      </div>
    </>
  )
}
