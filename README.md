# Sittly launcher

**Fork notice:** This project is a fork of the archived **Sittly** repository. We acknowledge and thank **Julian Kominovic** and the other Sittly authors for their original work.

Launcher for Linux similar to Raycast, Spotlight, Albert...

## Docs

- [spec.md](./spec.md) — current functionality and architecture overview.
- [roadmap.md](./roadmap.md) — unified plan + roadmap with AI, cross-platform, and distribution goals.

## Features (current)

- App search + launcher (Linux).
- File explorer with previews, copy/paste, and open actions.
- Music controls (play/pause, next/prev, volume).
- System controls (brightness, nightlight, battery devices, wallpaper).
- Extension store + extension management.
- Todoist-style task tracker.
- Clipboard utilities and “no results” helpers (Base64/JWT decode, QR generation, date utilities, web search).
- Shell command execution from the command bar (`>` prefix).
- AI chat page (MVP UI + local history).

## Usage

### Search and actions

1. Open the launcher and type a query.
2. Use **Enter** to run the main action.
3. Use **Ctrl+O** to open the context menu actions.

### Shell commands

Use the `>` prefix to run a shell command. Example:

```
> ls -la
```

You will get command results via notifications, and you can choose “Run and copy stdout” to copy output to your clipboard.

### Files

Open the **Files** page to browse directories. Selecting a file shows metadata and actions like copy path, copy contents, and open with the default app.

### Extensions

Open **Extensions** to manage installed extensions, or **Store** to download new ones.

### Tasks

Open **Todoist** to create and manage tasks. From the search bar, type a task name when no results are found and choose “Create task.”

### AI Chat

Open **AI Chat** to access the prompt box and a local conversation history. Provider settings (API key, base URL, model, local toggle) are stored locally and will power upcoming integrations.

## Automation scripts

Common workflows live in the `s/` folder:

| Script          | Purpose                                       |
| --------------- | --------------------------------------------- |
| `s/bootstrap`   | Install dependencies and prefetch Rust crates |
| `s/dev`         | Run the Vite dev server                       |
| `s/tauri-dev`   | Run the Tauri dev app                         |
| `s/build`       | Build the web assets                          |
| `s/tauri-build` | Build the Tauri app                           |

## Development

1. Run `s/bootstrap` once.
2. Use `s/tauri-dev` for the desktop app.
3. Use `s/dev` for the web UI (limited Tauri APIs in browser mode).

## Interact with your OS

![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/01520c1b-40a9-4017-a9cb-c68bb9e5f39c)
![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/7b743274-eecc-450a-a1c0-31dc4f7f2225)
![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/a97ed981-d20a-4e7d-821a-5a4e99c6355a)

## Couldn't find what you asked?

Generic options & QR code generation

![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/f7e5a55f-da5a-47f1-af0e-cc5f4ecb22f5)
![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/f389b5f7-c495-49f3-9b90-ed7dbe6a2b48)

Decode JWT and Base64

![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/192c7f01-5da7-4d0f-b004-e57b58a38675)
![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/b1b7b9a3-8f69-4330-a685-b6073a32585a)

Send email

![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/53a35445-e17f-4132-9d99-2a995cbd28e9)

Date

![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/2c8d176f-c5ce-47cc-939e-d4d232ee4229)

Is a hash?

![image](https://github.com/JulianKominovic/sittly-launcher/assets/70329467/7f1518f8-c9c1-43dd-9a49-fca79d963965)
