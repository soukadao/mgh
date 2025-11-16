#!/usr/bin/env node
import { createProgram } from "./program.js";

function main() {
  const program = createProgram();
  program.parse(process.argv);
}

main();
