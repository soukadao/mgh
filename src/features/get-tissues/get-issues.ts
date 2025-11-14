import { githubFetcher } from "../../shared/index.js";

export async function getIssues() {
  const url =
    "https://api.github.com/repos/soukadao/github-actions-test/issues";

  const data = await githubFetcher(url, {
    method: "GET",
  });

  console.log(data);
  return data;
}

getIssues();
