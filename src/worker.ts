import { WorkerState, RedditComment, SearchResult, WorkerRequest } from "./shared";
import { DocumentIndex } from "ndx";

const DB_NAME = "docs";
const DB_VERSION = 1;
const DATA_URL = "data/reddit_comments.json";

function emitStateChange(state: WorkerState): void {
  postMessage({ type: "state", state });
}

function emitResults(id: number, results: SearchResult[]): void {
  postMessage({ type: "query", id, results });
}

async function fetchComments(url: string): Promise<RedditComment[]> {
  const data = await fetch(url);
  const raw = await data.json() as RedditComment[];
  return raw.map((d, i) => ({ id: i, author: d.author, body: d.body }));
}

function openDB(dbName: string, dbVersion: number): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, dbVersion);
    req.onerror = (e) => { reject(req.error); }
    req.onsuccess = (e) => { resolve(req.result as IDBDatabase); }
    req.onupgradeneeded = (e) => {
      const db = req.result as IDBDatabase;
      if (!db.objectStoreNames.contains("comments")) {
        db.createObjectStore("comments", { autoIncrement: true })
      }
    }
  });
}

function queryCommentsCount(db: IDBDatabase): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const comments = db.transaction("comments").objectStore("comments");
    const req = comments.count();
    req.onerror = (e) => { reject(req.error); };
    req.onsuccess = (e) => { resolve(req.result); };
  });
}

function saveComments(db: IDBDatabase, comments: RedditComment[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("comments", "readwrite");
    transaction.onerror = (e) => { reject(transaction.error); };
    transaction.oncomplete = (e) => { resolve(); };

    const commentsStore = transaction.objectStore("comments");
    for (const comment of comments) {
      commentsStore.add(comment);
    }
  });
}

function loadComments(db: IDBDatabase): Promise<RedditComment[]> {
  return new Promise((resolve, reject) => {
    const result: RedditComment[] = [];
    const commentsStore = db.transaction("comments").objectStore("comments");
    const cursor = commentsStore.openCursor();

    cursor.onerror = (e) => { reject(cursor.error); };
    cursor.onsuccess = (e) => {
      const cursor = (e.target as IDBRequest).result as IDBCursorWithValue;
      if (cursor) {
        result.push(cursor.value as RedditComment);
        cursor.continue();
      } else {
        resolve(result);
      }
    }
  });
}

async function main() {
  emitStateChange(WorkerState.Started);

  const db = await openDB(DB_NAME, DB_VERSION);

  emitStateChange(WorkerState.LoadingData);
  const commentsCount = await queryCommentsCount(db);
  let comments: RedditComment[];
  if (commentsCount === 0) {
    comments = await fetchComments(DATA_URL);
    emitStateChange(WorkerState.SavingData);
    saveComments(db, comments);
  } else {
    comments = await loadComments(db);
  }

  emitStateChange(WorkerState.IndexingData);
  const index = new DocumentIndex<number, RedditComment>();
  index.addField("author");
  index.addField("body");
  for (const comment of comments) {
    index.add(comment.id, comment);
  }

  emitStateChange(WorkerState.Ready);
  onmessage = (e) => {
    const req = e.data as WorkerRequest;
    switch (req.type) {
      case "query": {
        emitResults(
          req.id,
          index.search(req.query).slice(0, 50).map((r) => ({ comment: comments[r.docId], score: r.score })),
        );
        break;
      }
    }
  };
}

main();
