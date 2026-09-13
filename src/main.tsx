import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Convex cloud deployment — client terhubung langsung.
const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const convex = new ConvexReactClient(
  convexUrl ?? "https://tangible-kudu-664.convex.cloud",
);

createRoot(document.getElementById("root")!).render(
  <ConvexProvider client={convex}>
    <App />
  </ConvexProvider>,
);