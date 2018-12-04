import {
  _, render, requestDirtyCheck, statelessComponent, onInput, selector, component, TrackByKey, key, Events,
} from "ivi";
import { div, input, VALUE } from "ivi-html";
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

const useAppState = selector(() => STATE.appState);
const useWorkerState = selector(() => STATE.workerState);
const useResults = selector(() => STATE.results);

function search(query: string): void {
  if (query) {
    STATE.appState = AppState.WaitingForQuery;
    WORKER.postMessage({ id: ++STATE.queryId, type: "query", query } as WorkerQueryRequest);
  } else {
    STATE.appState = AppState.Ready;
  }

  STATE.results = null;
  requestDirtyCheck();
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

const SearchField = component((c) => {
  let value = "";
  const events = onInput((ev) => {
    search(value = (ev.native.target as HTMLInputElement).value);
  });

  return () => (
    div("search-field", _,
      Events(events,
        input(_, { placeholder: "Type to search", value: VALUE(value) }),
      ),
    )
  );
});

const Result = statelessComponent<SearchResult>(({ score, comment: { author, body } }) => (
  div("result", _, [
    div("result-score", _, score),
    div("result-author", _, author),
    div("result-body", _, body),
  ])
));

const SearchResults = component((c) => {
  const getAppState = useAppState(c);
  const getResults = useResults(c);

  return () => {
    const appState = getAppState();
    const results = getResults();

    return (
      div("search-results", _, appState === AppState.Ready ?
        (results ? TrackByKey(results.map((r, i) => key(i, Result(r)))) : null) :
        div("spinner"),
      )
    );
  };
});

const App = component((c) => {
  const getWorkerState = useWorkerState(c);
  return () => {
    const workerState = getWorkerState();

    return (
      div("main", _,
        (workerState === WorkerState.Ready) ?
          div("search-view", _, [
            SearchField(),
            SearchResults(),
          ]) :
          div("main-progress", _, [
            div("spinner"),
            div("main-progress-text", _, workerStateToText(workerState)),
          ]),
      )
    );
  };
});

WORKER.addEventListener("message", (e) => {
  if (typeof e.data !== "number") {
    const data = e.data as WorkerResponse;
    switch (data.type) {
      case "state": {
        STATE.workerState = data.state;
        requestDirtyCheck();
        break;
      }
      case "query": {
        if (STATE.appState & AppState.WaitingForQuery) {
          if (STATE.queryId === data.id) {
            STATE.appState = AppState.Ready;
            STATE.results = data.results;
            requestDirtyCheck();
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
