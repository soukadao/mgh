import { execAsync } from "./utils.js";

export interface Repository {
  owner: string;
  repo: string;
}

export async function getRepository(): Promise<Repository> {
  if (process.env.GH_REPOSITORY) {
    if (!process.env.GH_REPOSITORY.includes("/")) {
      throw new Error("GH_REPOSITORY must be in format: owner/repo");
    }

    const splitText = process.env.GH_REPOSITORY.split("/");

    if (splitText.length !== 2 || !splitText[0] || !splitText[1]) {
      throw new Error("GH_REPOSITORY must be in format: owner/repo");
    }

    return {
      owner: splitText[0],
      repo: splitText[1],
    };
  }

  try {
    const { stdout } = await execAsync("git config --get remote.origin.url");

    const regex = /github\.com[:/]([^/]+)\/([^/]+?)(\.git)?$/;
    const match = stdout.trim().match(regex);

    if (!match) {
      throw new Error(
        "Could not parse GitHub repository from git remote URL. Expected format: github.com/owner/repo",
      );
    }

    return {
      owner: match[1],
      repo: match[2],
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to get repository information: ${error}`);
  }
}
