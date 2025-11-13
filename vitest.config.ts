import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.{spec,test}.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "v8",
      thresholds: {
        // TODO: 一旦、100%にしておく
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
