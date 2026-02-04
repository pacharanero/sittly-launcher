# Sittly Launcher — Current Specification (2024 baseline)

## 1. Purpose and scope
Sittly is a Tauri-based desktop launcher focused on fast command search, OS integrations, and extensibility. It currently targets Linux and exposes a modular extension system, allowing built-in features and third-party extensions to share a unified command palette, pages, and context menus. This document describes the current, shipped functionality and architecture. It is not a roadmap.

## 2. Product goals (current)
- Provide a single, searchable command surface for apps, files, utilities, and actions.
- Provide lightweight OS integrations (apps, system settings, brightness, battery, wallpaper, music).
- Offer extension loading from disk and an extension store for downloading community features.
- Offer quick utilities when no direct match is found (QR, Base64/JWT decoding, web search, date helpers).

## 3. Architecture overview
**Frontend**
- React + TypeScript UI with a Command-style input and list-based results.
- Built-in extensions register pages, list items, context menu items, and “no results” fallbacks.
- A small “devtools” layer wraps Tauri APIs and provides state management + utilities.

**Backend (Tauri/Rust)**
- Tauri commands provide system-level functionality (wallpaper, brightness, nightlight, battery info, music controls, file IO, clipboard access, and shell command execution).
- Linux/GNOME integration uses D-Bus and CLI tools (e.g., `xdotool`, `wmctrl`) for application visibility and window control.

**Data & storage**
- Simple key/value storage via Rustbreak (stored on disk in the user environment).

## 4. Current user-facing functionality
### 4.1 Core launcher experience
- Global command input with list results and context menu actions.
- Navigation helpers (back/forward/home/reload), theme toggle, and quit actions.
- Context menu action list (with keyboard shortcut `Ctrl+O`).

### 4.2 App discovery and launching (Linux)
- Read system apps via Linux APIs and launch them from the launcher list.
- Show app icons and descriptions where available.

### 4.3 System controls (Linux)
- Brightness up/down (5% steps).
- Night light enable/disable and temperature adjustment.
- Battery device list with status, type, and health percentage.
- Wallpaper set from local file or remote URL.

### 4.4 Music controls
- Play/pause, previous, next, volume up/down, mute.
- Background polling of player status to display current track info.

### 4.5 File explorer
- Browse the filesystem with a list view and preview panel.
- Open files or navigate into directories.
- Preview metadata (size, type, last modified).
- Copy path, filename, contents, or image to clipboard.
- Paste file contents into the active app.

### 4.6 Clipboard helpers
- Paste text into the current active window.
- Copy text and images to the clipboard.
- Read selected text from the OS clipboard.

### 4.7 Todoist-like task tracker
- Create, list, filter, edit, and delete tasks.
- List by status, priority, or date.
- Quick-add tasks from the global search bar when no direct match exists.

### 4.8 Extension system
- Load extensions from `~/.sittly/extensions/**/dist/compiled.js`.
- Manage installed extensions from the “Extensions” page.
- Download extensions from a store backed by a remote database table.
- Open extension repositories in the browser.

### 4.9 “No results” utilities
When the query doesn’t directly match a command, Sittly shows helpful utilities:
- Email actions (open in default mail app, Gmail, Outlook).
- Date transformations (relative date, millis, weekday/month/year).
- Base64 decode + clipboard actions.
- JWT decode + clipboard actions.
- Hash detection (common hash types).
- Quick web searches (Google, DuckDuckGo, GitHub, YouTube, YouTube Music).
- QR code generation.

### 4.10 Shell command execution
- Users can execute shell commands from the launcher.
- The UI provides a “Run shell command” option when a command is prefixed with `>`.

### 4.11 AI chat (MVP)
- Dedicated AI chat page for prompt-based interactions.
- Local chat history persistence (no provider integration yet).
- Local provider settings storage for API key, base URL, model, and local-model toggle.

## 5. Developer ergonomics
- Tauri commands are grouped by domain: files, clipboard, music, system, and app events.
- Frontend uses a shared design system with re-usable list and command components.
- Extension code is assembled dynamically and can contribute pages and results.

## 6. Current limitations
- OS integrations and window control are Linux-specific.
- Cross-platform packaging and CI automation are not yet defined.
- AI provider integrations and universal command palette workflows (à la Alfred) are not implemented yet.

## 7. Request summary (tidied)
The requested work for this iteration is to:
- Document current behavior and add a 2026 update plan.
- Audit other launcher products for feature gaps and place those gaps into a roadmap.
- Define an ambitious roadmap including AI use cases, cross-platform packaging, and CI.
- Add shell-command execution to the launcher.
- Make AI chat a first-class launcher surface and start implementation.
- Automate common workflows with scripts.
- Update README with all user-facing docs.
