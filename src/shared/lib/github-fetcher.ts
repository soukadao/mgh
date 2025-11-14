import { type FetcherOptions, fetcher } from "../utils.js";
import { ghAuthToken } from "./gh-auth-token.js";

const GITHUB_API_VERSION = "2022-11-28";
const GITHUB_ACCEPT = "application/vnd.github+json";

export interface GitHubFetcherOptions extends Omit<FetcherOptions, "headers"> {
  headers?: Record<string, string>;
}

/**
 * Fetcher wrapper for GitHub API with automatic authentication
 * @param url - GitHub API endpoint URL
 * @param options - Fetch options
 * @returns Parsed response data
 */
export async function githubFetcher<T = unknown>(
  url: string,
  options: GitHubFetcherOptions = {},
): Promise<T> {
  const { headers = {}, ...fetcherOptions } = options;

  let authToken = process.env.GH_TOKEN;

  if (!authToken) {
    authToken = await ghAuthToken();
  }

  return fetcher<T>(url, {
    ...fetcherOptions,
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: GITHUB_ACCEPT,
      "X-GitHub-Api-Version": GITHUB_API_VERSION,
      ...headers,
    },
  });
}
