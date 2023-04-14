export interface IRepoData {
  fullName: string;
  stargazersCount: number;
  todoState: IIssuesItem[];
  progressState: IIssuesItem[];
  doneState: IIssuesItem[];
}

export interface IIssuesItem {
  title: string;
  number: number;
  createdAt: string;
  typeUser: string;
  comments: number;
  state: string;
  assignee: boolean;
}
