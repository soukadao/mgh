import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
import { getLabels } from "../index.js";

describe("getLabels", () => {
  const mockLabel = {
    id: 1,
    node_id: "MDU6TGFiZWwx",
    url: "https://api.github.com/repos/soukadao/mgh/labels/bug",
    name: "bug",
    color: "d73a4a",
    default: true,
    description: "Something isn't working",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getRepository as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      owner: "soukadao",
      repo: "mgh",
    });
    (githubFetcher as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      mockLabel,
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches labels with correct URL and options and logs summary", async () => {
    const result = await getLabels();
    expect(getRepository).toHaveBeenCalledTimes(1);
    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/labels",
      { method: "GET" },
    );
    expect(result).toEqual([mockLabel]);
    expect(logger.info).toHaveBeenCalledWith("Fetched labels", {
      owner: "soukadao",
      repo: "mgh",
      count: 1,
    });
  });

  it("logs count 0 when response is not an array", async () => {
    (
      githubFetcher as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({} as unknown as Array<typeof mockLabel>);

    const result = await getLabels();
    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/labels",
      { method: "GET" },
    );
    expect(result).toEqual({});
    expect(logger.info).toHaveBeenCalledWith("Fetched labels", {
      owner: "soukadao",
      repo: "mgh",
      count: 0,
    });
  });
});
