Agent Guidance
Use these rules when working in this repository:
Libraries: Check `package.json` for the list of libraries.
When modifying files under `src`, run:
Tests: `pnpm run vitest:test`
Coverage: `pnpm run vitest:coverage`
Lint/format check: `pnpm run biome:check`

Code Quality Principles
1. Improve code structure and readability without changing its behavior.
2. Organize code before adding new features.
3. Emphasize small, continuous improvements over large-scale refactoring.

Test Example
Use this Vitest style for tests:
```ts
import { expect, test } from "vitest";
import { sum } from "./sum.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Network Access Policy
- When network/search access is allowed, do not access any external domains other than:
  - `docs.github.com`
