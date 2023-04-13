export interface IRepoData {
  fullName: string;
  starGazersCount: number;
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
}
