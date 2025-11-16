import { expect, test } from "vitest";
import { createProgram } from "../program.js";

test("registers pulls command without legacy alias", () => {
  const program = createProgram();
  const commandNames = program.commands.map((command) => command.name());

  expect(commandNames).toContain("pulls");
  expect(commandNames).not.toContain("pull-request");

  const pulls = program.commands.find((command) => command.name() === "pulls");
  expect(pulls?.aliases()).toContain("pr");
});
