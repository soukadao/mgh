# mgh — GitHub API Mini CLI

A small, typed Node.js CLI for querying the GitHub REST API. It follows Feature‑Sliced Design and ships a strict public API per slice. Currently supports listing issues, labels, and pull requests for a repository.

## Requirements
- Node.js 20+
- pnpm 9+
- Authentication: either set `GH_TOKEN` or have GitHub CLI (`gh`) logged in

## Installation
- Install dependencies: `pnpm install`
- Build the CLI: `pnpm run build`
- Run without installing: `node dist/index.js --help`
- Optional (global link): `pnpm link --global` then run `mgh` directly

## Authentication
`mgh` authenticates to GitHub by:
- Using `GH_TOKEN` if present (recommended for CI)
- Otherwise, falling back to `gh auth token` (requires GitHub CLI to be installed and logged in)

If neither is available, commands that call GitHub will fail with a clear error.

## Repository detection
The target repo is resolved by:
- `GH_REPOSITORY` env var in `owner/repo` format, or
- The current Git remote: `git config --get remote.origin.url`

If parsing fails, the CLI throws an error indicating the expected format.

## Commands
- `issue list` — List issues for the detected repository
- `label list` — List labels for the detected repository
- `pull-request list` (alias: `pr list`) — List pull requests for the detected repository

Examples:
- `mgh issue list`
- `mgh label list`
- `mgh pull-request list`
- Without global link: `node dist/index.js issue list`

## Scripts
- Test: `pnpm run test`
- Coverage: `pnpm run coverage` (global threshold 60%)
- Lint/Format: `pnpm run biome:check`

## Project Structure (Feature‑Sliced)
```
src
├── cli            # CLI entry + command wiring
├── entities       # Domain models (types) shared across features
├── features       # User-facing functionality (feature slices)
└── shared         # Cross-cutting utils with no business knowledge
```

Guidelines:
- Each slice exposes a public API via its `index.ts`.
- Import only through a slice’s public API from outside that slice.

## Notable Modules
- `src/shared/lib/github-fetcher.ts` — Adds GitHub auth + headers to requests
- `src/shared/repository.ts` — Resolves repo from env or git remote
- `src/shared/lib/logger.ts` — Simple logger abstraction
- `src/entities/issue.ts` — Typed Issue model
- `src/entities/label.ts` — Typed Label model
- `src/features/get-issues` — `getIssues()` feature
- `src/features/get-labels` — `getLabels()` feature
- `src/features/get-pull-requests` — `getPullRequests()` feature

## Development
1) Make changes under the appropriate slice (features/entities/shared)
2) Re-export via the slice’s `index.ts`
3) Add tests under `src/features/<feature>/tests`
4) Run scripts:
   - `pnpm run biome:check`
   - `pnpm run test`
   - `pnpm run coverage`

Tip: After editing `AGENTS.md`, also run the above three scripts to keep the repo consistent.

## CI Workflows (overview)
- `.github/workflows/code-review.yml` — LLM review on PR open/sync; posts review (no auto-merge)
- `.github/workflows/code-review-fix.yml` — On “changes requested”, attempts an auto-fix commit
- `.github/workflows/issue-triage.yml` — Classifies new issues using a JSON schema file
- `.github/workflows/auto-code-update.yml` — For issues labeled `task` or `bug`, creates branch `features/<#>` or `hotfix/<#>`, applies changes, opens a PR
- `.github/workflows/question.yml` — Answers issues/comments labeled `question`

## Troubleshooting
- “GitHub CLI is not installed” — Install `gh` or set `GH_TOKEN`
- “GH_REPOSITORY must be in format: owner/repo” — Set a valid env or ensure your git remote points to GitHub
- Network/auth errors — Verify token scopes and connectivity

## License
MIT
