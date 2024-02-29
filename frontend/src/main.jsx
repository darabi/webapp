import React from "react"
import { createRoot } from "react-dom/client"
import { Provider as ReduxProvider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App"
import { store } from "./app/store"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
