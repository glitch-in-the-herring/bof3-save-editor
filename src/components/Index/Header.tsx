import { Link } from "react-router"

export default function Header() {
  return (
    <>
      <h1>Breath of Fire III Save Editor</h1>
      <div className="flex flex-col">
        <Link to="/changelog" className="block italic">
          Updated 5 October 2024
        </Link>
        <Link to="/info" className="block italic">
          Info
        </Link>
      </div>
    </>
  )
}
