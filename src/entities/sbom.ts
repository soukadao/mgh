export interface SbomResponse {
  sbom: Sbom;
}

export interface Sbom {
  SPDXID: string;
  spdxVersion: string;
  creationInfo: CreationInfo;
  name: string;
  dataLicense: string;
  documentNamespace: string;
  documentDescribes?: string[];
  packages: Package[];
  relationships: Relationship[];
  comment?: string;
}

export interface CreationInfo {
  created: string;
  creators: string[];
  licenseListVersion?: string;
  comment?: string;
}

export interface Package {
  SPDXID: string;
  name: string;
  downloadLocation: string;
  filesAnalyzed: boolean;
  licenseConcluded: string;
  licenseDeclared: string;
  copyrightText: string;
  versionInfo?: string;
  supplier?: string;
  originator?: string;
  summary?: string;
  description?: string;
  homepage?: string;
  externalRefs?: ExternalRef[];
  checksums?: Checksum[];
  licenseInfoFromFiles?: string[];
  primaryPackagePurpose?: string;
  releaseDate?: string;
  builtDate?: string;
  validUntilDate?: string;
}

export interface ExternalRef {
  referenceCategory: string;
  referenceType: string;
  referenceLocator: string;
  comment?: string;
}

export interface Relationship {
  spdxElementId: string;
  relationshipType: string;
  relatedSpdxElement: string;
  comment?: string;
}

export interface Checksum {
  algorithm: string;
  checksumValue: string;
}
