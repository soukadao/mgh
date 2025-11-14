import type { Label } from "../../entities/index.js";
import { getRepository, githubFetcher, logger } from "../../shared/index.js";

export async function getLabels(): Promise<Label[]> {
  const repo = await getRepository();
  const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/labels`;

  const data = await githubFetcher<Label[]>(url, { method: "GET" });

  logger.info("Fetched labels", {
    owner: repo.owner,
    repo: repo.repo,
    count: Array.isArray(data) ? data.length : 0,
  });

  return data;
}
