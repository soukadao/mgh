# AGENTS.md

## Feature-Sliced Design

The main purpose of this methodology is to make the project more understandable and stable in the face of ever-changing business requirements.

```
src
├── cli
│   └── index.ts
├── entities
│   └──
├── features
│   └──
└── shared
```

### Directory Structure

- **cli/**: Command-line interface entry point. Contains the main CLI application logic and command definitions.
- **entities/**: Business entities and domain models. Represents the core data structures and business logic that are shared across features.
- **features/**: Feature modules that implement specific user-facing functionality. Each feature is self-contained and follows a consistent internal structure.
- **shared/**: Shared utilities, helpers, types, and common code used across the entire application. This layer has no knowledge of business logic or features.

### Define a strict public API
In the context of Feature-Sliced Design, the term public API refers to a slice or segment declaring what can be imported from it by other modules in the project. For example, in JavaScript that can be an index.js file re-exporting objects from other files in the slice. This enables freedom in refactoring code inside a slice as long as the contract with the outside world (i.e. the public API) stays the same.


**Package Manager**: `pnpm`

## Commands

- **test**: `pnpm run test`
- **coverage**: `pnpm run coverage`
- **format,lint**: `pnpm run biome:check`

## Wiki Submodule (`wiki/`)

The repository includes a GitHub Wiki as a Git submodule at `wiki/`. All project documentation pages live there and are published via the GitHub Wiki of this repo.

- Location: `wiki/` (tracked as a submodule; see `.gitmodules`).
- Purpose: Source of truth for docs/How‑tos/Guides, versioned alongside code.

### Clone / Initialize
- Clone with submodules: `git clone --recurse-submodules <repo-url>`
- Or initialize after clone: `git submodule update --init --recursive`

### Update to Latest Wiki
- Fetch latest wiki content: `git submodule update --remote wiki`
- Or pull inside the submodule: `cd wiki && git pull && cd -`

### Edit and Publish Wiki
1) Enter submodule: `cd wiki`
2) Edit Markdown pages, then commit and push:
   - `git add -A && git commit -m "docs: update wiki"`
   - `git push` (ensure you have push access; switch to SSH if needed)
3) Update submodule pointer in the main repo:
   - `cd .. && git add wiki && git commit -m "chore(wiki): bump submodule"`

Tips:
- If you edited the Wiki via GitHub UI, sync locally with `git submodule update --remote wiki` and commit the pointer.
- To push via SSH, set the submodule remote: `cd wiki && git remote set-url origin git@github.com:soukadao/mgh.wiki.git`

### After Editing
- Whenever you modify this file, run the following to ensure consistency:
  - `pnpm run test`
  - `pnpm run coverage`
  - `pnpm run biome:check`
