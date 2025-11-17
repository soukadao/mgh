export interface BranchCommit {
  sha: string;
  url: string;
  node_id?: string;
  [key: string]: unknown;
}

export interface Branch {
  name: string;
  commit: BranchCommit;
  protected: boolean;
  protection_url?: string;
  protection?: Record<string, unknown> | null;
  pattern?: string | null;
  allow_force_pushes?: Record<string, unknown> | null;
  allow_deletions?: Record<string, unknown> | null;
  block_creations?: Record<string, unknown> | null;
  required_signatures?: Record<string, unknown> | null;
  required_linear_history?: Record<string, unknown> | null;
  allow_merge_commit?: Record<string, unknown> | null;
  allow_squash_merge?: Record<string, unknown> | null;
  allow_rebase_merge?: Record<string, unknown> | null;
  required_pull_request_reviews?: Record<string, unknown> | null;
  required_status_checks?: Record<string, unknown> | null;
  enforce_admins?: Record<string, unknown> | null;
  required_conversation_resolution?: Record<string, unknown> | null;
  [key: string]: unknown;
}
