# Sittly Launcher Plan + Roadmap

## Competitive feature audit (gap analysis)
### Alfred (macOS)
- [ ] Workflows and automation graphing.
- [ ] Clipboard history and snippet expansion.
- [ ] Universal actions on selected results.
- [ ] Theming and appearance customization.
- [ ] Powerful web search presets.

### Spotlight (macOS)
- [ ] Fast OS-level app/file search.
- [ ] Natural language calculations and conversions.
- [ ] Quick look previews.
- [ ] Deep OS integration (contacts, calendar, messages).

### Albert (Linux)
- [ ] Modular plugin ecosystem.
- [ ] Inline calculators and conversions.
- [ ] System commands and window actions.

### Feature gaps to implement in Sittly
- [ ] Workflow/automation builder.
- [ ] Clipboard history and snippet expansion.
- [ ] Universal actions + result actions pipeline.
- [ ] Quick look/preview panels for more file types.
- [ ] Calculator, unit/currency conversions, natural language parsing.
- [ ] Deep OS integrations (calendar, contacts, messages, browser tabs).
- [ ] Theming, appearance presets, and layout customization.

## Plan + roadmap phases

### Phase 0 — Raycast Extension API (Clean-Room Reverse Engineering)
Target: API-compatible extension SDK that allows Raycast extensions to run on Sittly.

#### Research & documentation
- [ ] Document the `@raycast/api` public TypeScript interface from npm types.
- [ ] Document the `@raycast/utils` package hooks and helpers.
- [ ] Map the extension manifest format (`package.json` superset with commands, preferences, tools).
- [ ] Document command modes: `view`, `no-view`, `menu-bar`.
- [ ] Document the command lifecycle (launch types, props, unloading conditions).

#### Core UI components
- [ ] Implement `<List>` component with sections, items, filtering, and detail panels.
- [ ] Implement `<Grid>` component for image-focused layouts.
- [ ] Implement `<Detail>` component with markdown rendering.
- [ ] Implement `<Form>` component with all field types (TextField, PasswordField, TextArea, Checkbox, DatePicker, Dropdown, TagPicker, FilePicker).
- [ ] Implement `<ActionPanel>` and `<Action>` components with keyboard shortcuts.
- [ ] Implement `<MenuBarExtra>` for menu bar commands.

#### System APIs
- [ ] Implement `LocalStorage` API (encrypted key-value store).
- [ ] Implement `Cache` API (LRU disk-based cache).
- [ ] Implement `Clipboard` API (copy, paste, read, clear).
- [ ] Implement `environment` object (extension info, paths, appearance, launch context).
- [ ] Implement `Keyboard.Shortcut` system with common shortcuts.

#### Navigation & feedback
- [ ] Implement `popToRoot`, `closeMainWindow`, `clearSearchBar` functions.
- [ ] Implement `showToast`, `showHUD`, `confirmAlert` feedback APIs.
- [ ] Implement `launchCommand` for inter-command navigation.
- [ ] Implement `updateCommandMetadata` for dynamic command subtitles.

#### System integration
- [ ] Implement `open` function for URLs and files.
- [ ] Implement `getSelectedFinderItems` equivalent for file selection.
- [ ] Implement `getSelectedText` for system-wide text selection.
- [ ] Implement preferences system with type generation.

#### Extension runtime
- [ ] Build extension loader that parses Raycast-style manifests.
- [ ] Implement React-to-native-UI bridge for declarative rendering.
- [ ] Implement extension sandboxing and memory limits.
- [ ] Implement background refresh for interval-based commands.
- [ ] Add extension compatibility shim for `@raycast/api` imports.

#### Utilities package (`@sittly/utils` mirroring `@raycast/utils`)
- [ ] Implement `usePromise` and `useCachedPromise` hooks.
- [ ] Implement `useFetch` with caching and pagination.
- [ ] Implement `useForm` for form state management.
- [ ] Implement `useExec` for shell command execution.
- [ ] Implement `useLocalStorage` and `useCachedState` hooks.
- [ ] Implement `useFrecencySorting` for usage-based ordering.
- [ ] Implement `showFailureToast` and `getFavicon` utilities.

#### Validation & testing
- [ ] Create test harness to run real Raycast extensions (MIT/open-source only).
- [ ] Document API coverage percentage vs. `@raycast/api`.
- [ ] Publish compatibility matrix for supported features.

### Phase 1 — AI chat as a flagship surface
- [ ] Launch AI chat page inside the launcher (primary interaction surface).
- [ ] Local history + prompt management with opt-out storage controls.
- [ ] Provider-agnostic settings for API keys, model selection, and base URLs.
- [ ] Local model support (Ollama, LM Studio, llama.cpp) as a first-class path.
- [ ] Safety/permission prompts for AI-suggested actions.

### Phase 2 — Cross-platform core
- [ ] Platform abstraction layer for app indexing, window control, and OS actions.
- [ ] Dedicated indexer services for macOS and Windows.
- [ ] Toggleable capabilities so unavailable commands hide by platform.

### Phase 3 — Performance + reliability
- [ ] Background indexing and incremental updates (file system + apps).
- [ ] Caching and warm-start to keep cold-start under 500ms.
- [ ] Safe mode for broken extensions.

### Phase 4 — Feature parity
- [ ] Clipboard history (searchable, pinned entries).
- [ ] Snippets / text expansions.
- [ ] Window management (snap, move, focus, resize).
- [ ] Quick look previews (images, PDFs, markdown, audio).
- [ ] Inline calculations, conversions, and natural language math.
- [ ] Web search presets (custom engines).
- [ ] Workflow builder (node graph + YAML/JSON export).

### Phase 5 — AI platform expansion
#### Provider support
- [ ] Built-in provider adapters: OpenAI, Anthropic, Google Gemini, Mistral, Cohere, Azure OpenAI.
- [ ] Local models: Ollama, LM Studio, llama.cpp (OpenAI-compatible base URLs).
- [ ] Per-provider API key management and model selection.
- [ ] Offline fallback when local models are configured.

#### AI use cases (10)
- [ ] Command prediction — suggest next action based on query and history.
- [ ] Natural language actions — “open recent invoices and email to finance.”
- [ ] Summarize clipboard — summarize the clipboard text or a selected file.
- [ ] Code snippet generator — generate shell scripts or regex from a prompt.
- [ ] Quick translations — translate selected text with target language presets.
- [ ] Meeting notes — summarize notes from clipboard or file to a task list.
- [ ] File triage — classify files into folders based on names/content.
- [ ] Intent routing — select best extension/workflow automatically.
- [ ] Search refinements — propose filters for apps/files/web searches.
- [ ] Command safety — explain a shell command before running it.

#### Implementation path
- [ ] Add a provider-agnostic AI client + registry.
- [ ] Add secure settings UI for API keys and base URLs.
- [ ] Store AI interactions locally with opt-out.
- [ ] Add “approval required” prompts for AI-initiated system changes.

### Phase 6 — Distribution & CI
- [ ] GitHub Actions + matrix builds for Linux/macOS/Windows.
- [ ] Release outputs: AppImage, DEB, RPM, Flatpak, DMG, MSI/EXE, Homebrew, Winget, Scoop.
- [ ] Signed binaries and auto-update channels.
- [ ] Cargo + crates.io release for any CLI tooling.

### Phase 7 — Ecosystem & extensibility
- [ ] Extension SDK with versioned API, type-safe tooling, and lint rules.
- [ ] Extension marketplace with submission pipeline and automated tests.
- [ ] Plugin security policies and permissions.
- [ ] Add SPDX front matter to source files and enforce via linting/CI.

## Ordering rationale
- [ ] Raycast API reverse-engineering is Phase 0 to unlock the extension ecosystem early and inform all later SDK/extension work.
- [ ] Cross-platform core must come early to avoid feature fragmentation.
- [ ] Performance improvements should precede major feature expansion to keep UI fast.
- [ ] AI features depend on safe permissioning and robust extension APIs.
- [ ] Distribution and CI should mature once platform parity is stable.

## Success metrics
- [ ] <50ms search result rendering.
- [ ] <200ms app lookup from cached index.
- [ ] <500ms cold-start-to-input readiness.
