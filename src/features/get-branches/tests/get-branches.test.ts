import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Branch } from "../../../entities/index.js";

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
import { getBranches } from "../index.js";

describe("getBranches", () => {
  const mockBranch: Branch = {
    name: "main",
    commit: {
      sha: "abc123",
      url: "https://api.github.com/repos/soukadao/mgh/commits/abc123",
    },
    protected: true,
    protection_url:
      "https://api.github.com/repos/soukadao/mgh/branches/main/protection",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getRepository as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      owner: "soukadao",
      repo: "mgh",
    });
    (githubFetcher as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      mockBranch,
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches branches with correct URL and options and logs summary", async () => {
    const result = await getBranches();

    expect(getRepository).toHaveBeenCalledTimes(1);
    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/branches",
      { method: "GET" },
    );
    expect(result).toEqual([mockBranch]);
    expect(logger.info).toHaveBeenCalledWith("Fetched branches", {
      owner: "soukadao",
      repo: "mgh",
      count: 1,
    });
  });

  it("logs count 0 when response is not an array", async () => {
    (
      githubFetcher as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({} as unknown as Branch[]);

    const result = await getBranches();

    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/branches",
      { method: "GET" },
    );
    expect(result).toEqual({});
    expect(logger.info).toHaveBeenCalledWith("Fetched branches", {
      owner: "soukadao",
      repo: "mgh",
      count: 0,
    });
  });
});
