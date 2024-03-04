import { createRoot } from "react-dom/client"

import "./i18n"
import "./styles/app-base.css"
import "./styles/app-components.css"
import "./styles/app-utilities.css"

import App from "./App"

const container = document.getElementById("root")

if (!container) {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

const root = createRoot(container)

root.render(<App />)
