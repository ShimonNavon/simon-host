import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = document.getElementById("root")!;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build ships prerendered markup inside #root, so we adopt it
// instead of throwing it away. In dev the container is empty and there is
// nothing to hydrate.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
