import { getRepository, githubFetcher } from "../../shared/index.js";

export async function getIssues() {
  const repo = await getRepository();
  const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/issues`;

  const data = await githubFetcher(url, {
    method: "GET",
  });

  console.log(data);
  return data;
}
