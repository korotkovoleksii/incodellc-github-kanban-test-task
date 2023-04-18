export interface IResponseIssues {
  assignee: IAssignee | null;
  comments: number;
  number: number;
  createdAt: string;
  title: string;
  state: string;
  user: {
    type: string;
  };
}

interface IAssignee {
  id: number;
  login: string;
  nodeId: string;
  type: string;
  url: string;
}
