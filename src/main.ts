import { render, updateNextFrame, statefulComponent, Component, statelessComponent, connect, map } from "ivi";
import { div, input } from "ivi-html";
import { onInput } from "ivi-events";
import Worker from "worker-loader!./worker";
import { WorkerState, WorkerResponse, WorkerQueryRequest, SearchResult } from "./shared";

const enum AppState {
  Ready = 0,
  WaitingForQuery = 1,
}

const WORKER = new Worker();
const STATE = {
  appState: AppState.Ready,
  workerState: WorkerState.Waiting,
  queryId: 0,
  results: null as SearchResult[] | null,
};

function search(query: string): void {
  if (query) {
    STATE.appState = AppState.WaitingForQuery;
    WORKER.postMessage({ id: ++STATE.queryId, type: "query", query } as WorkerQueryRequest);
  } else {
    STATE.appState = AppState.Ready;
  }

  STATE.results = null;
  updateNextFrame();
}

function workerStateToText(s: WorkerState): string {
  switch (s) {
    case WorkerState.Waiting:
      return "Waiting for a Web Worker";
    case WorkerState.Started:
      return "Worker is Ready";
    case WorkerState.LoadingData:
      return "Loading Documents";
    case WorkerState.SavingData:
      return "Saving Documents to the IndexedDB";
    case WorkerState.IndexingData:
      return "Indexing Documents";
  }
  return "";
}

const PLACEHOLDER = { placeholder: "Type to search" };
const SearchField = statefulComponent(class extends Component {
  private value = "";
  private events = onInput((ev) => {
    search(this.value = (ev.target as HTMLInputElement).value);
  });

  render() {
    return div("search-field").c(
      input()
        .a(PLACEHOLDER)
        .e(this.events)
        .value(this.value)
    );
  }
});

const Result = statelessComponent<SearchResult>((r) => (
  div("result").c(
    div("result-score").c(r.score),
    div("result-author").c(r.comment.author),
    div("result-body").c(r.comment.body),
  )
));

const SearchResults = connect<{ appState: AppState, results: SearchResult[] | null }>(
  (prev) => {
    const appState = STATE.appState;
    const results = STATE.results;

    return (prev !== null && prev.appState === appState && prev.results === results) ? prev :
      { appState, results };
  },
  ({ appState, results }) => (
    div("search-results").c(
      (appState === AppState.Ready) ?
        (
          results ?
            map(results, (r, i) => Result(r).k(i)) :
            null
        ) :
        div("spinner"),
    )
  ),
);

const App = connect<WorkerState>(
  () => STATE.workerState,
  (workerState) => div("main").c(
    (workerState === WorkerState.Ready) ?
      div("search-view").c(
        SearchField(),
        SearchResults(),
      ) :
      div("main-progress").c(
        div("spinner"),
        div("main-progress-text").c(
          workerStateToText(workerState),
        ),
      ),
  )
);

WORKER.addEventListener("message", (e) => {
  if (typeof e.data !== "number") {
    const data = e.data as WorkerResponse;
    switch (data.type) {
      case "state": {
        STATE.workerState = data.state;
        updateNextFrame();
        break;
      }
      case "query": {
        if (STATE.appState & AppState.WaitingForQuery) {
          if (STATE.queryId === data.id) {
            STATE.appState = AppState.Ready;
            STATE.results = data.results;
            updateNextFrame();
          }
        }
        break;
      }
    }
  }
});

render(
  App(),
  document.getElementById("app")!,
);
