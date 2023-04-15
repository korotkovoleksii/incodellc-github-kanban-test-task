export interface IRepoData {
  fullName: string;
  stargazersCount: number;
  todoState: IIssuesListTask;
  progressState: IIssuesListTask;
  doneState: IIssuesListTask;
}

interface IIssuesListTask {
  taskList: IIssuesItem[];
  title: string;
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
