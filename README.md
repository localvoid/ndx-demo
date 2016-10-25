[ndx](https://github.com/localvoid/ndx) library demo application.

It is a simple demo application that indexes 10,000 reddit comments. Demo application requires modern browser features:
[WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) and
[IndexedDB](https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API). Comments are stored in the IndexedDB,
and search engine is working in a WebWorker.
