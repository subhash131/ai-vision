import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Content from "./content/content";
import { ThemeProvider } from "./providers/theme-provider";
import StateContext from "./providers/state-context-provider";

// Create container element
const root = document.createElement("div");
root.style.position = "fixed";
root.style.top = "0";
root.style.left = "0";
root.style.width = "100vw";
root.style.height = "100vh";
root.style.pointerEvents = "none";
root.style.zIndex = "999999";
root.id = "__ai_vision_root__";
document.body.append(root);

// Attach Shadow DOM
const shadow = root.attachShadow({ mode: "open" });

// Inject Tailwind CSS inside Shadow DOM
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = window.chrome.runtime.getURL("assets/index.css");
shadow.appendChild(styleLink);

// Create mount point inside Shadow DOM
const mountPoint = document.createElement("div");
shadow.appendChild(mountPoint);

// Render React inside Shadow DOM
createRoot(mountPoint).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      attribute="class"
      storageKey="vite-ui-theme"
      forcedTheme="dark"
    >
      <StateContext>
        <Content />
      </StateContext>
    </ThemeProvider>
  </StrictMode>
);
