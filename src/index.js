import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { runAgent } from "./agent.js";

const terminal = createInterface({
  input: stdin,
  output: stdout
});

console.log("Local AI Troubleshooting Agent");
console.log("Type 'exit' to quit.\n");

try {
  while (true) {
    const question = await terminal.question("You: ");
    const trimmed = question.trim();

    if (trimmed.toLowerCase() === "exit") {
      break;
    }

    if (!trimmed) {
      continue;
    }

    try {
      const answer = await runAgent(trimmed);

      console.log("\nAgent:", answer, "\n");
    } catch (error) {
      console.error("\nAgent failed:", error.message, "\n");
    }
  }
} finally {
  terminal.close();
}