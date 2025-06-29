import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Content from "./content/content";
import { ThemeProvider } from "./providers/theme-provider";
import StateContext from "./providers/state-context-provider";

const root = document.createElement("div");
root.style = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 999999;
`;
root.id = "__ai_vision_root__";
document.body.append(root);

createRoot(root).render(
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
