import type { PullRequest } from "../../entities/index.js";
import { getRepository, githubFetcher, logger } from "../../shared/index.js";

export async function getPullRequests(): Promise<PullRequest[]> {
  const repo = await getRepository();
  const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/pulls`;

  const data = await githubFetcher<PullRequest[]>(url, {
    method: "GET",
  });

  logger.info("Fetched pull requests", {
    owner: repo.owner,
    repo: repo.repo,
    count: Array.isArray(data) ? data.length : 0,
  });

  return data;
}
