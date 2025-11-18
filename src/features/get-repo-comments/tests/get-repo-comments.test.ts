import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IssueComment } from "../../../entities/index.js";

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
import { getRepoComments } from "../index.js";

describe("getRepoComments", () => {
  const mockComment: IssueComment = {
    id: 10,
    node_id: "IC_kwDOExample",
    url: "https://api.github.com/repos/soukadao/mgh/issues/comments/10",
    html_url: "https://github.com/soukadao/mgh/issues/1#issuecomment-10",
    body: "Test comment",
    user: {
      login: "commenter",
      id: 101,
      node_id: "MDQ6VXNlcjEwMQ==",
      avatar_url: "https://avatars.githubusercontent.com/u/101",
      gravatar_id: "",
      url: "https://api.github.com/users/commenter",
      html_url: "https://github.com/commenter",
      followers_url: "https://api.github.com/users/commenter/followers",
      following_url:
        "https://api.github.com/users/commenter/following{/other_user}",
      gists_url: "https://api.github.com/users/commenter/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/commenter/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/commenter/subscriptions",
      organizations_url: "https://api.github.com/users/commenter/orgs",
      repos_url: "https://api.github.com/users/commenter/repos",
      events_url: "https://api.github.com/users/commenter/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/commenter/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    issue_url: "https://api.github.com/repos/soukadao/mgh/issues/1",
    author_association: "CONTRIBUTOR",
    performed_via_github_app: null,
    reactions: {
      url: "https://api.github.com/repos/soukadao/mgh/issues/comments/10/reactions",
      total_count: 0,
      "+1": 0,
      "-1": 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getRepository as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      owner: "soukadao",
      repo: "mgh",
    });
    (githubFetcher as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      mockComment,
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches repository issue comments and logs summary", async () => {
    const result = await getRepoComments();

    expect(getRepository).toHaveBeenCalledTimes(1);
    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/issues/comments",
      { method: "GET" },
    );
    expect(result).toEqual([mockComment]);
    expect(logger.info).toHaveBeenCalledWith(
      "Fetched repository issue comments",
      {
        owner: "soukadao",
        repo: "mgh",
        count: 1,
      },
    );
  });

  it("logs count 0 when response is not an array", async () => {
    (
      githubFetcher as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({} as unknown as IssueComment[]);

    const result = await getRepoComments();

    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/issues/comments",
      { method: "GET" },
    );
    expect(result).toEqual({});
    expect(logger.info).toHaveBeenCalledWith(
      "Fetched repository issue comments",
      {
        owner: "soukadao",
        repo: "mgh",
        count: 0,
      },
    );
  });
});
