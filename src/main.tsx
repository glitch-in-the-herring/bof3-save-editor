import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"

import Changelog from "./pages/Changelog.tsx"

import "./main.css"
import Index from "./pages/Index.tsx"
import Info from "./pages/Info.tsx"

const router = createBrowserRouter(
  [
    { index: true, element: <Index /> },
    { path: "/changelog", element: <Changelog /> },
    { path: "/info", element: <Info /> },
  ],
  { basename: import.meta.env.VITE_BASE_URL },
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
