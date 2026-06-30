import { useRef } from "react"

import Editor from "../components/Index/Editor"
import Footer from "../components/Index/Footer"
import Header from "../components/Index/Header"

export default function Index() {
  const headerRef = useRef<null | HTMLHeadingElement>(null)
  const footerRef = useRef<null | HTMLDivElement>(null)

  return (
    <>
      <div className="relative">
        <Header ref={headerRef} />
        <Editor />
        <Footer ref={footerRef} />
      </div>
      <div className="fixed right-0 bottom-0 flex flex-row">
        <button
          onClick={() =>
            headerRef.current!.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Scroll to Top
        </button>
        <button
          onClick={() =>
            footerRef.current!.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Scroll to Bottom
        </button>
      </div>
    </>
  )
}
