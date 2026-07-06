import { Link, useLocation } from "react-router"

export default function Header({ ref }: { ref?: React.Ref<HTMLHeadingElement> }) {
  const currentURL = useLocation()

  return (
    <>
      <h1 ref={ref}>Breath of Fire III Save Editor</h1>
      <div className="flex flex-col">
        <Link to="/changelog" className="block italic">
          Updated 6 July 2026
        </Link>
        <Link to="/info" className="block italic">
          Info
        </Link>
        {currentURL.pathname !== "/" && (
          <Link to="/" className="block italic">
            Return to Editor
          </Link>
        )}
      </div>
    </>
  )
}
