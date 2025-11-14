import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PullRequest } from "../../../entities/index.js";

vi.mock("../../../shared/index.js", () => {
  return {
    getRepository: vi.fn(),
    githubFetcher: vi.fn(),
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
    },
  };
});

import { getRepository, githubFetcher, logger } from "../../../shared/index.js";
import { getPullRequests } from "../index.js";

describe("getPullRequests", () => {
  const baseUser = {
    login: "user",
    id: 101,
    node_id: "U_101",
    avatar_url: "https://avatars.githubusercontent.com/u/101",
    gravatar_id: "",
    url: "https://api.github.com/users/user",
    html_url: "https://github.com/user",
    followers_url: "https://api.github.com/users/user/followers",
    following_url: "https://api.github.com/users/user/following{/other_user}",
    gists_url: "https://api.github.com/users/user/gists{/gist_id}",
    starred_url: "https://api.github.com/users/user/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/user/subscriptions",
    organizations_url: "https://api.github.com/users/user/orgs",
    repos_url: "https://api.github.com/users/user/repos",
    events_url: "https://api.github.com/users/user/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/user/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
  } as const;

  const mockPullRequest: PullRequest = {
    url: "https://api.github.com/repos/soukadao/mgh/pulls/1",
    id: 2001,
    node_id: "PR_2001",
    html_url: "https://github.com/soukadao/mgh/pull/1",
    diff_url: "https://github.com/soukadao/mgh/pull/1.diff",
    patch_url: "https://github.com/soukadao/mgh/pull/1.patch",
    issue_url: "https://api.github.com/repos/soukadao/mgh/issues/1",
    commits_url: "https://api.github.com/repos/soukadao/mgh/pulls/1/commits",
    review_comments_url:
      "https://api.github.com/repos/soukadao/mgh/pulls/1/comments",
    review_comment_url:
      "https://api.github.com/repos/soukadao/mgh/pulls/comments{/number}",
    comments_url:
      "https://api.github.com/repos/soukadao/mgh/issues/1/comments",
    statuses_url: "https://api.github.com/repos/soukadao/mgh/statuses/sha",
    number: 1,
    state: "open",
    locked: false,
    title: "Add new feature",
    user: baseUser,
    body: "Please merge",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    draft: false,
    head: {
      label: "soukadao:feature",
      ref: "feature",
      sha: "abcdef123456",
      user: baseUser,
      repo: {
        id: 3001,
        node_id: "R_3001",
        name: "mgh",
        full_name: "soukadao/mgh",
        private: false,
        owner: baseUser,
        html_url: "https://github.com/soukadao/mgh",
        description: "Test repo",
        fork: false,
        url: "https://api.github.com/repos/soukadao/mgh",
      },
    },
    base: {
      label: "soukadao:main",
      ref: "main",
      sha: "fedcba654321",
      user: baseUser,
      repo: {
        id: 3001,
        node_id: "R_3001",
        name: "mgh",
        full_name: "soukadao/mgh",
        private: false,
        owner: baseUser,
        html_url: "https://github.com/soukadao/mgh",
        description: "Test repo",
        fork: false,
        url: "https://api.github.com/repos/soukadao/mgh",
      },
    },
    _links: {
      self: { href: "https://api.github.com/repos/soukadao/mgh/pulls/1" },
      html: { href: "https://github.com/soukadao/mgh/pull/1" },
      issue: { href: "https://api.github.com/repos/soukadao/mgh/issues/1" },
      comments: {
        href: "https://api.github.com/repos/soukadao/mgh/issues/1/comments",
      },
      review_comments: {
        href: "https://api.github.com/repos/soukadao/mgh/pulls/1/comments",
      },
      review_comment: {
        href: "https://api.github.com/repos/soukadao/mgh/pulls/comments{/number}",
      },
      commits: {
        href: "https://api.github.com/repos/soukadao/mgh/pulls/1/commits",
      },
      statuses: {
        href: "https://api.github.com/repos/soukadao/mgh/statuses/sha",
      },
    },
    author_association: "CONTRIBUTOR",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getRepository as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      owner: "soukadao",
      repo: "mgh",
    });
    (githubFetcher as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      mockPullRequest,
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches pull requests with correct URL and options and logs summary", async () => {
    const result = await getPullRequests();

    expect(getRepository).toHaveBeenCalledTimes(1);
    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/pulls",
      { method: "GET" },
    );
    expect(result).toEqual([mockPullRequest]);

    expect(logger.info).toHaveBeenCalledWith("Fetched pull requests", {
      owner: "soukadao",
      repo: "mgh",
      count: 1,
    });
  });

  it("logs count 0 when response is not an array", async () => {
    (
      githubFetcher as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({} as unknown as PullRequest[]);

    const result = await getPullRequests();

    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/pulls",
      { method: "GET" },
    );
    expect(result).toEqual({});
    expect(logger.info).toHaveBeenCalledWith("Fetched pull requests", {
      owner: "soukadao",
      repo: "mgh",
      count: 0,
    });
  });
});
