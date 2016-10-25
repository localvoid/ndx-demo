import { RedditComment } from "./shared";
import { ComponentDescriptor, VNode, Invalidator, injectComponent, createVElement as h } from "kivi";
import { SearchResult } from "ndx";
import { WorkerState, Action, ActionType } from "./shared";

declare global {
  interface Window {
    wwState(cb: (w: Worker, state: WorkerState) => void): void;
  }
}

const DB_NAME = "docs";
const DB_VERSION = 1;

let worker: Worker | undefined;
let db: IDBDatabase | undefined;

const enum AppStateType {
  Init = 0,
  Ready = 1,
  WaitingForQuery = 2,
}

const appState = {
  state: AppStateType.Init,
  workerState: WorkerState.Waiting,
  onChange: new Invalidator(),
  queryId: 0,
  documents: new Map<number, RedditComment>(),
  results: null as SearchResult<number>[] | null,
};

function search(query: string): void {
  const id = ++appState.queryId;
  if (query) {
    worker!.postMessage({
      "id": id,
      "type": ActionType.SearchQuery,
      "payload": query,
    } as Action);
    appState.state = AppStateType.WaitingForQuery;
  } else {
    appState.state = AppStateType.Ready;
  }

  appState.results = null;
  appState.onChange.invalidate();
}

function updateSearchResults(queryId: number, results: SearchResult<number>[]): void {
  if (appState.queryId === queryId) {
    const fetchDocs = [] as number[];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const docId = result["docId"];
      if (!appState.documents.has(docId)) {
        fetchDocs.push(docId);
      }
    }
    if (fetchDocs.length > 0) {
      new Promise((resolve, reject) => {
        const transaction = db!.transaction("comments");
        transaction.onerror = function (e) {
          reject(e.message);
        }
        transaction.oncomplete = function () {
          resolve();
        }
        const comments = transaction.objectStore("comments");
        for (let i = 0; i < fetchDocs.length; i++) {
          const key = fetchDocs[i];
          const req = comments.get(fetchDocs[i]);
          req.onsuccess = (e) => {
            const comment = (e.target as IDBRequest).result as RedditComment;
            if (comment) {
              appState.documents.set(key, comment);
            }
          };
        }
      })
        .then(() => {
          if (appState.queryId === queryId) {
            appState.results = results;
            appState.state = AppStateType.Ready;
            appState.onChange.invalidate();
          }
        });
    } else {
      appState.results = results;
      appState.state = AppStateType.Ready;
      appState.onChange.invalidate();
    }
  }
}

function openDB(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = function (e) {
      reject(e.message);
    }
    req.onsuccess = function (e) {
      resolve(req.result);
    }
  });
}

window.wwState(function (w, state) {
  if (worker === undefined) {
    worker = w;
    worker.addEventListener("message", function (e) {
      if (typeof e.data !== "number") {
        const data = e.data as Action;
        if (data["type"] === ActionType.SearchQuery) {
          updateSearchResults(data["id"], data["payload"]);
        }
      }
    });
  }

  appState.workerState = state;
  appState.onChange.invalidate();

  if (db === undefined && state > WorkerState.SavingData) {
    openDB()
      .then((d) => {
        db = d;
        appState.state = AppStateType.Ready;
        appState.onChange.invalidate();
      });
  }
});

const SearchField = new ComponentDescriptor<void, string>()
  .init((c) => {
    c.state = "";
    (c.element as HTMLElement).oninput = onSearchChange;
  })
  .update((c, props, state) => {
    c.sync(c.createVRoot()
      .className("search-field")
      .child(h("input").props({ "placeholder": "Type to search" }).value(state)));
  });

const onSearchChange = SearchField.createDelegatedEventHandler<Event>("input", false, (e, c, props, state, mTarget) => {
  const value = (mTarget as HTMLInputElement).value;
  if (value !== state) {
    c.state = value;
    search(value);
  }
});

const Result = new ComponentDescriptor<{ doc: RedditComment, score: number }, void>()
  .update((c, props) => {
    c.sync(c.createVRoot().className("result").children([
      h("div").className("result-score").child(props.score.toString()),
      h("div").className("result-author").child(props.doc["author"]),
      h("div").className("result-body").child(props.doc["body"]),
    ]));
  });

const SearchResults = new ComponentDescriptor()
  .update((c) => {
    const children = [] as VNode[];
    if (appState.state === AppStateType.Ready) {
      if (appState.results !== null) {
        for (let i = 0; i < appState.results.length; i++) {
          const result = appState.results[i];
          const doc = appState.documents.get(result["docId"]);
          if (doc !== undefined) {
            children.push(Result.createVNode({
              doc: doc,
              score: result["score"],
            }));
          }
        }
      }
    } else {
      children.push(h("div").className("spinner"));
    }
    c.sync(c.createVRoot().className("search-results").children(children));
  });

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

const MainProgressView = new ComponentDescriptor<WorkerState, void>()
  .update((c, s) => {
    c.sync(c.createVRoot()
      .className("main-progress")
      .children([
        h("div").className("spinner"),
        h("div").className("main-progress-text").child(workerStateToText(s)),
      ]));
  });

const SearchView = new ComponentDescriptor()
  .update((c) => {
    c.sync(c.createVRoot()
      .className("search-view")
      .children([
        SearchField.createVNode(),
        SearchResults.createVNode(),
      ]));
  });

const MainView = new ComponentDescriptor<void, void>()
  .init((c) => {
    c.subscribe(appState.onChange);
  })
  .update((c) => {
    c.sync(c.createVRoot()
      .className("main")
      .child(appState.state > AppStateType.Init && appState.workerState === WorkerState.Ready ?
        SearchView.createVNode() :
        MainProgressView.createImmutableVNode(appState.workerState)));
  });

injectComponent(MainView, document.getElementById("app") !);
