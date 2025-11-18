import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SbomResponse } from "../../../entities/index.js";

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
import { getSbom } from "../index.js";

describe("getSbom", () => {
  const mockResponse: SbomResponse = {
    sbom: {
      SPDXID: "SPDXRef-DOCUMENT",
      spdxVersion: "SPDX-2.2",
      creationInfo: {
        created: "2024-01-01T00:00:00Z",
        creators: ["Tool: GitHub.com"],
      },
      name: "soukadao/mgh",
      dataLicense: "CC0-1.0",
      documentNamespace:
        "https://github.com/soukadao/mgh/dependency-graph/sbom",
      documentDescribes: ["SPDXRef-RootPackage"],
      packages: [
        {
          SPDXID: "SPDXRef-RootPackage",
          name: "mgh",
          versionInfo: "1.0.0",
          downloadLocation: "NOASSERTION",
          filesAnalyzed: false,
          licenseConcluded: "NOASSERTION",
          licenseDeclared: "MIT",
          copyrightText: "NOASSERTION",
          externalRefs: [
            {
              referenceCategory: "PACKAGE-MANAGER",
              referenceType: "purl",
              referenceLocator: "pkg:npm/mgh@1.0.0",
            },
          ],
        },
      ],
      relationships: [
        {
          spdxElementId: "SPDXRef-RootPackage",
          relationshipType: "DESCRIBES",
          relatedSpdxElement: "SPDXRef-RootPackage",
        },
      ],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getRepository as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      owner: "soukadao",
      repo: "mgh",
    });
    (githubFetcher as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockResponse,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches SBOM with correct URL and options and logs summary", async () => {
    const result = await getSbom();

    expect(getRepository).toHaveBeenCalledTimes(1);
    expect(githubFetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/soukadao/mgh/dependency-graph/sbom",
      { method: "GET" },
    );
    expect(result).toEqual(mockResponse);
    expect(logger.info).toHaveBeenCalledWith("Fetched SBOM", {
      owner: "soukadao",
      repo: "mgh",
      packages: 1,
      relationships: 1,
      spdxId: "SPDXRef-DOCUMENT",
    });
  });

  it("logs zero counts when packages or relationships are not arrays", async () => {
    (
      githubFetcher as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce({
      sbom: {
        SPDXID: "SPDXRef-DOCUMENT",
        spdxVersion: "SPDX-2.2",
        creationInfo: {
          created: "2024-01-01T00:00:00Z",
          creators: ["Tool: GitHub.com"],
        },
        name: "soukadao/mgh",
        dataLicense: "CC0-1.0",
        documentNamespace:
          "https://github.com/soukadao/mgh/dependency-graph/sbom",
        packages: null as unknown as SbomResponse["sbom"]["packages"],
        relationships: undefined as unknown as SbomResponse["sbom"]["relationships"],
      },
    });

    const result = await getSbom();

    expect(result).toEqual({
      sbom: {
        SPDXID: "SPDXRef-DOCUMENT",
        spdxVersion: "SPDX-2.2",
        creationInfo: {
          created: "2024-01-01T00:00:00Z",
          creators: ["Tool: GitHub.com"],
        },
        name: "soukadao/mgh",
        dataLicense: "CC0-1.0",
        documentNamespace:
          "https://github.com/soukadao/mgh/dependency-graph/sbom",
        packages: null,
        relationships: undefined,
      },
    });

    expect(logger.info).toHaveBeenCalledWith("Fetched SBOM", {
      owner: "soukadao",
      repo: "mgh",
      packages: 0,
      relationships: 0,
      spdxId: "SPDXRef-DOCUMENT",
    });
  });
});
