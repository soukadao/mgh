import { githubFetcher } from "../../shared/index.js";

interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  body: string | null;
  user: {
    login: string;
  };
  created_at: string;
  updated_at: string;
}

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
