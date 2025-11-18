import type { SbomResponse } from "../../entities/index.js";
import { getRepository, githubFetcher, logger } from "../../shared/index.js";

export async function getSbom(): Promise<SbomResponse> {
  const repo = await getRepository();
  const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/dependency-graph/sbom`;

  const data = await githubFetcher<SbomResponse>(url, { method: "GET" });

  const packagesCount = Array.isArray(data?.sbom?.packages)
    ? data.sbom.packages.length
    : 0;
  const relationshipsCount = Array.isArray(data?.sbom?.relationships)
    ? data.sbom.relationships.length
    : 0;

  logger.info("Fetched SBOM", {
    owner: repo.owner,
    repo: repo.repo,
    packages: packagesCount,
    relationships: relationshipsCount,
    spdxId: data?.sbom?.SPDXID ?? "unknown",
  });

  return data;
}
