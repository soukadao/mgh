import { execAsync } from "../utils.js";

/**
 * Retrieves the GitHub authentication token from GitHub CLI
 * @returns GitHub authentication token
 * @throws When GitHub CLI is not authenticated or command execution fails
 */
export async function ghAuthToken(): Promise<string> {
  try {
    const { stdout } = await execAsync("gh auth token");
    return stdout.trim();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("command not found")) {
        throw new Error(
          "GitHub CLI (gh) is not installed. Please install it from https://cli.github.com/",
        );
      }
      throw new Error(`Failed to get GitHub auth token: ${error.message}`);
    }
    throw error;
  }
}
