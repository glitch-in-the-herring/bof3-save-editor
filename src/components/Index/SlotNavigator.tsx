export default function SlotNavigator() {
  return <>
    <label htmlFor="slot_prev_button">Prev</label>
    <button className="slot_prev_button" disabled>&lt;</button>
    <label className="slot_position_indicator">Slot ... / ...</label>
    <button className="slot_next_button" disabled>&gt;</button>
    <label htmlFor="slot_next_button">Next</label>
  </>
}