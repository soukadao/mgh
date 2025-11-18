import type { IssueComment } from "../../entities/index.js";
import { getRepository, githubFetcher, logger } from "../../shared/index.js";

export async function getRepoComments(): Promise<IssueComment[]> {
  const repo = await getRepository();
  const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/issues/comments`;

  const data = await githubFetcher<IssueComment[]>(url, {
    method: "GET",
  });

  logger.info("Fetched repository issue comments", {
    owner: repo.owner,
    repo: repo.repo,
    count: Array.isArray(data) ? data.length : 0,
  });

  return data;
}
