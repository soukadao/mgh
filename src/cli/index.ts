#!/usr/bin/env node
import { Command } from "commander";
import pkg from "../../package.json" with { type: "json" };
import { getIssues } from "../features/get-issues/index.js";
import { getLabels } from "../features/get-labels/index.js";

async function main() {
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

  program.parse(process.argv);
}

main();
