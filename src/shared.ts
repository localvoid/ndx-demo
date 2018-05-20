export const enum WorkerState {
  Waiting = 0,
  Started = 1,
  LoadingData = 2,
  SavingData = 3,
  IndexingData = 4,
  Ready = 5,
}

export interface RedditComment {
  readonly id: number;
  readonly author: string;
  readonly body: string;
}

export interface SearchResult {
  readonly comment: RedditComment;
  readonly score: number;
}

export interface WorkerQueryRequest {
  readonly type: "query";
  readonly id: number;
  readonly query: string;
}

export interface WorkerStateResponse {
  readonly type: "state";
  readonly state: WorkerState;
}

export interface WorkerQueryResponse {
  readonly type: "query";
  readonly id: number;
  readonly results: SearchResult[];
}

export type WorkerRequest = WorkerQueryRequest;
export type WorkerResponse = WorkerStateResponse | WorkerQueryResponse;
