export const enum WorkerState {
  Waiting = 0,
  Started = 1,
  LoadingData = 2,
  SavingData = 3,
  IndexingData = 4,
  Ready = 5,
}

export interface RedditComment {
  author: string;
  body: string;
}

export const enum ActionType {
  SearchQuery = 1,
}

export interface Action {
  id: number;
  type: ActionType;
  payload: any;
}
