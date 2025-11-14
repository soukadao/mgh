import type { Assignee, Label, Milestone, User } from "./issue.js";

export type PullRequestState = "open" | "closed";

export interface PullRequestTeam {
  id: number;
  node_id: string;
  url: string;
  members_url: string;
  name: string;
  description: string | null;
  permission: string;
  privacy: string;
  html_url: string;
  repositories_url: string;
  slug: string;
  parent?: PullRequestTeam | null;
}

export interface PullRequestRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: User;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  archive_url?: string;
  assignees_url?: string;
  blobs_url?: string;
  branches_url?: string;
  collaborators_url?: string;
  comments_url?: string;
  commits_url?: string;
  compare_url?: string;
  contents_url?: string;
  contributors_url?: string;
  deployments_url?: string;
  downloads_url?: string;
  events_url?: string;
  forks_url?: string;
  git_commits_url?: string;
  git_refs_url?: string;
  git_tags_url?: string;
  git_url?: string | null;
  issue_comment_url?: string;
  issue_events_url?: string;
  issues_url?: string;
  keys_url?: string;
  labels_url?: string;
  languages_url?: string;
  merges_url?: string;
  milestones_url?: string;
  notifications_url?: string;
  pulls_url?: string;
  releases_url?: string;
  ssh_url?: string;
  stargazers_url?: string;
  statuses_url?: string;
  subscribers_url?: string;
  subscription_url?: string;
  tags_url?: string;
  teams_url?: string;
  trees_url?: string;
  clone_url?: string;
  mirror_url?: string | null;
  hooks_url?: string;
  svn_url?: string;
  homepage?: string | null;
  language?: string | null;
  forks_count?: number;
  stargazers_count?: number;
  watchers_count?: number;
  size?: number;
  default_branch?: string;
  open_issues_count?: number;
  is_template?: boolean;
  topics?: string[];
  has_issues?: boolean;
  has_projects?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_downloads?: boolean;
  has_discussions?: boolean;
  archived?: boolean;
  disabled?: boolean;
  visibility?: string;
  pushed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  permissions?: Record<string, boolean>;
  allow_rebase_merge?: boolean;
  temp_clone_token?: string | null;
  allow_squash_merge?: boolean;
  allow_auto_merge?: boolean;
  delete_branch_on_merge?: boolean;
  allow_merge_commit?: boolean;
  subscribers_count?: number;
  network_count?: number;
  license?: {
    key: string;
    name: string;
    spdx_id: string | null;
    url: string | null;
    node_id: string;
  } | null;
  organization?: User;
  parent?: PullRequestRepo | null;
  source?: PullRequestRepo | null;
  template_repository?: PullRequestRepo | null;
}

export interface PullRequestBranch {
  label: string;
  ref: string;
  sha: string;
  user: User | null;
  repo: PullRequestRepo | null;
}

export interface PullRequestLink {
  href: string;
}

export interface PullRequestLinks {
  self: PullRequestLink;
  html: PullRequestLink;
  issue: PullRequestLink;
  comments: PullRequestLink;
  review_comments: PullRequestLink;
  review_comment: PullRequestLink;
  commits: PullRequestLink;
  statuses: PullRequestLink;
}

export interface PullRequestAutoMerge {
  enabled_by: User;
  merge_method: "merge" | "squash" | "rebase";
  commit_title?: string | null;
  commit_message?: string | null;
}

export interface PullRequest {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  number: number;
  state: PullRequestState;
  locked: boolean;
  title: string;
  user: User;
  body: string | null;
  created_at: string;
  updated_at: string;
  closed_at?: string | null;
  merged_at?: string | null;
  merge_commit_sha?: string | null;
  assignee?: Assignee | null;
  assignees?: Assignee[];
  requested_reviewers?: User[];
  requested_teams?: PullRequestTeam[];
  labels?: Label[];
  milestone?: Milestone | null;
  draft: boolean;
  head: PullRequestBranch;
  base: PullRequestBranch;
  _links: PullRequestLinks;
  author_association: string;
  auto_merge?: PullRequestAutoMerge | null;
  active_lock_reason?: string | null;
  merged?: boolean;
  mergeable?: boolean | null;
  rebaseable?: boolean | null;
  mergeable_state?: string;
  merged_by?: User | null;
  comments?: number;
  review_comments?: number;
  maintainer_can_modify?: boolean;
  commits?: number;
  additions?: number;
  deletions?: number;
  changed_files?: number;
}
