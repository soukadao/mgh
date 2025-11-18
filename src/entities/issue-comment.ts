import type { GitHubApp, Reactions, User } from "./issue.js";

export type IssueCommentAuthorAssociation =
  | "COLLABORATOR"
  | "CONTRIBUTOR"
  | "FIRST_TIMER"
  | "FIRST_TIME_CONTRIBUTOR"
  | "MANNEQUIN"
  | "MEMBER"
  | "NONE"
  | "OWNER";

export interface IssueComment {
  id: number;
  node_id: string;
  url: string;
  html_url: string;
  body: string;
  user: User | null;
  created_at: string;
  updated_at: string;
  issue_url: string;
  author_association: IssueCommentAuthorAssociation;
  performed_via_github_app: GitHubApp | null;
  reactions: Reactions;
}
