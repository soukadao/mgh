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