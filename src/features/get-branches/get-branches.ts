import type { Branch } from "../../entities/index.js";
import { getRepository, githubFetcher, logger } from "../../shared/index.js";

export async function getBranches(): Promise<Branch[]> {
  const repo = await getRepository();
  const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/branches`;

  const data = await githubFetcher<Branch[]>(url, { method: "GET" });

  logger.info("Fetched branches", {
    owner: repo.owner,
    repo: repo.repo,
    count: Array.isArray(data) ? data.length : 0,
  });

  return data;
}
