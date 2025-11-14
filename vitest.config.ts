import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.{spec,test}.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
      exclude: ["**/index.ts"],
      thresholds: {
        statements: 60,
        branches: 60,
        functions: 60,
        lines: 60,
      },
    },
  },
});
