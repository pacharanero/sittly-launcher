await window.extensionsLoaded;
console.log("INITIALIZING MAIN APP");

import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { BrowserRouter } from "react-router-dom";
import { hideApp, showApp } from "./devtools/api/app";

const appWindow = getCurrentWindow();
const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

unregister("Ctrl+Alt+K");
register("Ctrl+Alt+K", async () => {
  console.log("Open!");
  await showApp();
});
if (import.meta.env.PROD) {
  appWindow.onFocusChanged(({ payload: focused }) => {
    if (!focused) hideApp();
  });
}
