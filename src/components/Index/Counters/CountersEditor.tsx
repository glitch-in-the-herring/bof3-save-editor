import CountersTimers from "./CountersTimers"

export default function CountersEditor() {
  return (
    <div>
      <h2>Counters and Timers</h2>
      <div className="grid w-5/12 grid-cols-2">
        <CountersTimers />
      </div>
    </div>
  )
}
