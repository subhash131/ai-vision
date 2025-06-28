import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Content from "./content/content";

const root = document.createElement("div");
root.id = "__ai_vision_root__";
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <Content />
  </StrictMode>
);
