import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"

import Index from "./pages/Index.tsx"

import "./main.css"

const router = createBrowserRouter(
  [
    {
      index: true,
      element: <Index />,
    },
  ],
  { basename: import.meta.env.VITE_BASE_URL },
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
