#!/usr/bin/env node
import { Command } from "commander";
import { getIssues } from "../features/get-tissues/get-issues.js";
import pkg from "../../package.json" with { type: "json" };

async function main() {
  const program = new Command();

  program
    .name("mgh")
    .description(pkg.description)
    .version(pkg.version);

  const issue = program
    .command("issue")
    .description("Manage GitHub issues")
  ;

  issue
    .command("list")
    .description("List all issues")
    .action(async () => {
      await getIssues();
    });

  program.parse(process.argv);
}

main();
