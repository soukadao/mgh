import { getRepository, githubFetcher, logger } from "../../shared/index.js";
import type { Issue } from "../../entities/index.js";

export async function getIssues(): Promise<Issue[]> {
  const repo = await getRepository();
  const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/issues`;

  const data = await githubFetcher<Issue[]>(url, {
    method: "GET",
  });

  logger.info("Fetched issues", {
    owner: repo.owner,
    repo: repo.repo,
    count: Array.isArray(data) ? data.length : 0,
  });
  return data;
}
