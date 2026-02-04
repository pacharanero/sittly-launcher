import React from "react";
import sittlyDevtools from "./devtools/index";
import { mkdir, readDir, readTextFile } from "@tauri-apps/plugin-fs";
import { join, homeDir } from "@tauri-apps/api/path";

async function initLoad() {
  // Plug the devtools when end testing

  window.React = React;
  window.SittlyDevtools = sittlyDevtools;

  // EXPOSED REACT AND DEVTOOLS TO THE WINDOW OBJECT

  const home = await homeDir();
  const sittlyExtensionsPath = await join(home, ".sittly", "extensions");

  await mkdir(sittlyExtensionsPath, {
    recursive: true,
  }).catch((err: unknown) => console.log(err));

  const sittlyExtensions = await readDir(sittlyExtensionsPath);
  console.log("SITTLY EXTENSIONS PATH: ", sittlyExtensionsPath);
  const thisScript = import.meta.env.DEV
    ? document.querySelector("#init-script")
    : document.querySelector("#sittly-extensions-set");

  console.log("THIS SCRIPT: ", thisScript);
  (await Promise.allSettled(
    sittlyExtensions.map(async (extension) => {
      const extensionFile = await join(extension.name, "dist", "compiled.js");
      const fullPath = await join(sittlyExtensionsPath, extensionFile);
      const fileContent = await readTextFile(fullPath);
      const script = document.createElement("script");
      script.innerHTML = fileContent;
      script.async = false;
      (thisScript as HTMLScriptElement).after(script);
      console.log("Extension loaded: ", extension.name);
    })
  )) as any;
  console.log("SCRIPTS INJECTED SUCCESSFULLY");
}

window.extensionsLoaded = initLoad();
