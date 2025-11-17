import { Command } from "commander";
import pkg from "../../package.json" with { type: "json" };
import { getBranches } from "../features/get-branches/index.js";
import { getIssues } from "../features/get-issues/index.js";
import { getLabels } from "../features/get-labels/index.js";
import { getPullRequests } from "../features/get-pull-requests/index.js";

export function createProgram() {
  const program = new Command();

  program.name("mgh").description(pkg.description).version(pkg.version);

  const issue = program.command("issue").description("Manage GitHub issues");

  issue
    .command("list")
    .description("List all issues")
    .action(async () => {
      console.log(await getIssues());
    });

  const label = program.command("label").description("Manage GitHub labels");

  label
    .command("list")
    .description("List all labels")
    .action(async () => {
      console.log(await getLabels());
    });

  const pulls = program
    .command("pulls")
    .alias("pr")
    .description("Manage GitHub pull requests");

  pulls
    .command("list")
    .description("List all pull requests")
    .action(async () => {
      console.log(await getPullRequests());
    });

  const branch = program
    .command("branch")
    .description("Manage GitHub branches");

  branch
    .command("list")
    .description("List all branches")
    .action(async () => {
      console.log(await getBranches());
    });

  return program;
}
