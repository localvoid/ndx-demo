import { WorkerState, ActionType, Action, RedditComment } from "./shared";

postMessage(WorkerState.Started);

import { DocumentIndex } from "ndx";

const DB_NAME = "docs";
const DB_VERSION = 1;
const DATA_URL = "reddit_comments.json";

function loadData(): Promise<RedditComment[]> {
  return new Promise<RedditComment[]>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = function () {
      const data = JSON.parse(request.responseText);
      const documents = [] as RedditComment[];
      data.forEach((d: RedditComment) => {
        documents.push(d);
      });
      resolve(documents);
    };

    request.onerror = function (e) {
      reject(e.message);
    };

    request.open("GET", DATA_URL);
    request.send();
  });
}

const index = new DocumentIndex<number, RedditComment>();
index.addField("author");
index.addField("body");

let ready = false;

onmessage = function (e) {
  if (ready) {
    const action = e.data as Action;
    if (action["type"] === ActionType.SearchQuery) {
      const query = action["payload"] as string;
      const results = index.search(query);

      postMessage({
        "id": action["id"],
        "type": ActionType.SearchQuery,
        "payload": results.slice(0, 50).map((r) => ({ "docId": r.docId, "score": r.score })),
      });
    }
  }
};

let DB: IDBDatabase | undefined;

new Promise<IDBDatabase>((resolve, reject) => {
  const req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onerror = function (e) {
    reject(e.message);
  }
  req.onsuccess = function (e) {
    resolve((e.target as IDBOpenDBRequest).result as IDBDatabase);
  }
  req.onupgradeneeded = function (e) {
    const db = (e.target as IDBOpenDBRequest).result as IDBDatabase;
    if (!db.objectStoreNames.contains("comments")) {
      db.createObjectStore("comments", { autoIncrement: true })
    }
  }
})
  .then((db) => {
    DB = db;
    return new Promise<number>((resolve, reject) => {
      const comments = db.transaction("comments").objectStore("comments");
      const req = comments.count();
      req.onerror = function (e) {
        reject(e.message);
      };
      req.onsuccess = function (e) {
        resolve(req.result);
      };
    });
  })
  .then((c) => {
    if (c === 0) {
      postMessage(WorkerState.LoadingData);
      return loadData().then((data) => {
        return new Promise((resolve, reject) => {
          postMessage(WorkerState.SavingData);

          const transaction = DB!.transaction("comments", "readwrite");
          transaction.onerror = function (e) {
            reject(e.message);
          };
          transaction.oncomplete = function (e) {
            resolve();
          };

          const comments = transaction.objectStore("comments");
          data.forEach((d) => {
            comments.add(d);
          });
        });
      });
    }
    return Promise.resolve();
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      postMessage(WorkerState.IndexingData);

      const transaction = DB!.transaction("comments");
      transaction.onerror = function (e) {
        reject(e.message);
      };

      transaction.oncomplete = function (e) {
        resolve();
      };

      const comments = transaction.objectStore("comments");
      const cursor = comments.openCursor();

      cursor.onsuccess = function (e) {
        const cursor = (e.target as IDBRequest).result as IDBCursorWithValue;
        if (cursor) {
          index.add(cursor.key as number, cursor.value as RedditComment);
          cursor.continue();
        }
      }
    });
  })
  .then(() => {
    postMessage(WorkerState.Ready);
    ready = true;
  });
