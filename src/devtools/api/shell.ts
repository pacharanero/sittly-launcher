import { invoke } from "@tauri-apps/api/core";
import { mkdir, writeFile } from "@tauri-apps/plugin-fs";
import { fetch } from "@tauri-apps/plugin-http";
import { open } from "@tauri-apps/plugin-shell";
import { fileTypeFromBuffer } from "file-type";
import { sendNotification } from "./notifications";
import { homeDir, join } from "@tauri-apps/api/path";
import { notifyAsyncOperationStatus } from "./indicators";
import { hideApp } from "./app";

/**
 *
 * Shell are the APIs that allow you to interact with the desktop env.
 */

/**
 * Open any URI using the default app
@example // opens the given URL on the default browser:
await open('https://github.com/tauri-apps/tauri');
@example // opens the given URL using `firefox`:
await open('https://github.com/tauri-apps/tauri', 'firefox');
@example // opens a file using the default program:
await open('/path/to/file');
 */
export const openURI = (
  path: string,
  openWith?:
    | "firefox"
    | "google chrome"
    | "chromium"
    | "safari"
    | "open"
    | "start"
    | "xdg-open"
    | "gio"
    | "gnome-open"
    | "kde-open"
    | "wslview"
) => {
  open(path, openWith);
  hideApp();
};
/**
 * Set the wallpaper given a path
 * @example
 * setWallpaper('/home/tauri/Pictures/wallpaper.png')
 * setWallpaper('https://fffuel.co/images/dddepth-preview/dddepth-353.jpg')
 */
export const setWallpaper = async (path: string): Promise<void> => {
  notifyAsyncOperationStatus({
    title: "Setting wallpaper",
    description: "wait a moment...",
    status: "IN_PROGRESS",
  });
  if (path.startsWith("http") || path.startsWith("https")) {
    // Fetch the image as a blob
    let fileType = "";
    const response = await fetch(path, {
      method: "GET",
    });
    const blob = await response.arrayBuffer();

    const arrayBuffer = new Uint8Array(blob);
    fileType = (await fileTypeFromBuffer(arrayBuffer))?.ext || "";
    if (blob && fileType) {
      // Save into the default downloads directory, like in the browser
      const suggestedFilename = path.replaceAll("/", "_");
      const baseTempPath = await join(await homeDir(), ".sittly", "temp");
      await mkdir(baseTempPath, {
        recursive: true,
      });
      const tempAssetsPathFile = await join(baseTempPath, suggestedFilename);
      // Now we can write the file to the disk
      await writeFile(tempAssetsPathFile, arrayBuffer);
      await invoke("set_wallpaper", { path: tempAssetsPathFile });
      notifyAsyncOperationStatus({
        title: "Wallpaper set",
        description: "enjoy your new wallpaper!",
        status: "SUCCESS",
      });
      return sendNotification({
        title: "Wallpaper set",
        icon: "image-x-generic",
      });
    }

    notifyAsyncOperationStatus({
      title: "Error",
      description: "we could not set the wallpaper",
      status: "ERROR",
    });
    return sendNotification({
      title: "Reading image failed",
      body: "The image could not be read",
      icon: "image-missing",
    });
  } else {
    await invoke("set_wallpaper", { path });
    notifyAsyncOperationStatus({
      title: "Wallpaper set",
      description: "enjoy your new wallpaper!",
      status: "SUCCESS",
    });
  }
};

export function getSelectedText() {
  return invoke<string>("get_selected_text");
}

export async function cmd(
  command: string,
  args: string[]
): Promise<{ stdout: string | null; stderr: string | null }> {
  notifyAsyncOperationStatus({
    title: "Executing command",
    description: command,
    status: "IN_PROGRESS",
  });
  try {
    const response = await invoke<string>("cmd", {
      command,
      args,
    });
    notifyAsyncOperationStatus({
      title: "Command executed",
      description: command,
      status: "SUCCESS",
    });
    return {
      stdout: response,
      stderr: null,
    };
  } catch (err: unknown) {
    console.log(err);
    notifyAsyncOperationStatus({
      title: "Error",
      description: err as string,
      status: "ERROR",
    });
    return {
      stdout: null,
      stderr: err as string,
    };
  }
}
