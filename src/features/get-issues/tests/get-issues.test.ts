import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Issue } from "../../../entities/index.js";

// Mock shared dependencies used by the feature
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
import { getIssues } from "../index.js";

describe("getIssues", () => {
  const mockIssue: Issue = {
    url: "https://api.github.com/repos/soukadao/mgh/issues/1",
    repository_url: "https://api.github.com/repos/soukadao/mgh",
    labels_url:
      "https://api.github.com/repos/soukadao/mgh/issues/1/labels{/name}",
    comments_url: "https://api.github.com/repos/soukadao/mgh/issues/1/comments",
    events_url: "https://api.github.com/repos/soukadao/mgh/issues/1/events",
    html_url: "https://github.com/soukadao/mgh/issues/1",
    id: 1,
    node_id: "I_123",
    number: 1,
    title: "Issue 1",
    user: {
      login: "user",
      id: 100,
      node_id: "U_100",
      avatar_url: "https://avatars.githubusercontent.com/u/100",
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
      received_events_url: "https://api.github.com/users/user/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
    },
    labels: [
      { name: "bug", color: "d73a4a", description: "Something isn't working" },
    ],
    state: "open",
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    closed_at: null,
    author_association: "CONTRIBUTOR",
    active_lock_reason: null,
    sub_issues_summary: { total: 0, completed: 0, percent_completed: 0 },
    issue_dependencies_summary: {
      blocked_by: 0,
      total_blocked_by: 0,
      blocking: 0,
      total_blocking: 0,
    },
    body: "Test body",
    closed_by: null,
    reactions: {
      url: "https://api.github.com/repos/soukadao/mgh/issues/1/reactions",
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
    timeline_url: "https://api.github.com/repos/soukadao/mgh/issues/1/timeline",
    performed_via_github_app: null,
    state_reason: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getRepository as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      owner: "soukadao",
      repo: "mgh",
    });
    (githubFetcher as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      mockIssue,
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches issues with correct URL and options and logs summary", async () => {
    const result = await getIssues();

    expect(getRepository).toHaveBeenCalledTimes(1);
    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/issues",
      { method: "GET" },
    );
    expect(result).toEqual([mockIssue]);

    expect(logger.info).toHaveBeenCalledWith("Fetched issues", {
      owner: "soukadao",
      repo: "mgh",
      count: 1,
    });
  });

  it("logs count 0 when response is not an array", async () => {
    (
      githubFetcher as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({} as unknown as Issue[]);

    const result = await getIssues();

    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/issues",
      { method: "GET" },
    );
    expect(result).toEqual({});
    expect(logger.info).toHaveBeenCalledWith("Fetched issues", {
      owner: "soukadao",
      repo: "mgh",
      count: 0,
    });
  });
});
