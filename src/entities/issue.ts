export type IssueState = "open" | "closed";

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

import type { Label } from "./label.js";

export type Assignee = User;

export interface Milestone {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  description: string | null;
  creator: User;
  open_issues: number;
  closed_issues: number;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  due_on: string | null;
  closed_at: string | null;
}

export interface SubIssuesSummary {
  total: number;
  completed: number;
  percent_completed: number;
}

export interface IssueDependenciesSummary {
  blocked_by: number;
  total_blocked_by: number;
  blocking: number;
  total_blocking: number;
}

export interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface GitHubApp {
  id?: number;
  slug?: string;
  name?: string;
  description?: string | null;
  external_url?: string;
  html_url?: string;
  created_at?: string;
  updated_at?: string;
  owner?: User;
  [key: string]: unknown;
}

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: IssueState;
  locked: boolean;
  assignee: Assignee | null;
  assignees: Assignee[];
  milestone: Milestone | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: string | null;
  sub_issues_summary: SubIssuesSummary;
  issue_dependencies_summary: IssueDependenciesSummary;
  body: string | null;
  closed_by: User | null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: GitHubApp | null;
  state_reason: string | null;
}
