!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){"use strict";function r(t,e,n,r){return new(n||(n=Promise))(function(o,i){function s(t){try{a(r.next(t))}catch(t){i(t)}}function u(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(s,u)}a((r=r.apply(t,e||[])).next())})}function o(t,e){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=r[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}n.r(e),Object.setPrototypeOf||Array,Object.assign;var i=/[\s]+/;function s(t){return t.trim().split(i)}var u=/^\W+/,a=/\W+$/,c=function(t){this.charCode=t,this.next=null,this.firstChild=null,this.firstPosting=null};function f(t,e,n){for(;n<e.length;n++){var r=new c(e.charCodeAt(n));null===t.firstChild?t.firstChild=r:(r.next=t.firstChild,t.firstChild=r),t=r}return t}function l(t,e){for(var n=t.firstChild;null!==n;){if(n.charCode===e)return n;n=n.next}}var d=function(){function t(){this.root=new c(0)}return t.prototype.get=function(t){for(var e=this.root,n=0;n<t.length;n++)if(void 0===(e=l(e,t.charCodeAt(n))))return null;return e},t.prototype.add=function(t,e,n){for(var r=this.root,o=0;o<t.length;o++){if(null===r.firstChild){r=f(r,t,o);break}var i=l(r,t.charCodeAt(o));if(void 0===i){r=f(r,t,o);break}r=i}var s={next:null,details:e,termFrequency:n};null===r.firstPosting?r.firstPosting=s:(s.next=r.firstPosting,r.firstPosting=s)},t.prototype.expandTerm=function(t){var e=this.get(t),n=[];return null!==e&&function t(e,n,r){null!==e.firstPosting&&null!==e.firstPosting&&n.push(r);for(var o=e.firstChild;null!==o;)t(o,n,r+String.fromCharCode(o.charCode)),o=o.next}(e,n,t),n},t.prototype.vacuum=function(){!function t(e){for(var n=null,r=e.firstPosting;null!==r;)r.details.removed?null===n?e.firstPosting=r.next:n.next=r.next:n=r,r=r.next;for(var o=e.firstChild;null!==o;)t(o),o=o.next}(this.root)},t}();function h(t){return function(t){return t.replace(u,"").replace(a,"")}(function(t){return t.toLowerCase()}(t))}var v=function(){function t(t){if(this._documents=new Map,this._index=new d,this._fields=[],this._tokenizer=s,this._filter=h,this._bm25k1=1.2,this._bm25b=.75,void 0!==t){void 0!==t.tokenizer&&(this._tokenizer=t.tokenizer),void 0!==t.filter&&(this._filter=t.filter);var e=t.bm25;void 0!==e&&(void 0!==e.k1&&(this._bm25k1=e.k1),void 0!==e.b&&(this._bm25b=e.b))}}return Object.defineProperty(t.prototype,"size",{get:function(){return this._documents.size},enumerable:!0,configurable:!0}),t.prototype.addField=function(t,e){var n=t,r=1;void 0!==e&&(void 0!==e.getter&&(n=e.getter),void 0!==e.boost&&(r=e.boost));var o={name:t,getter:n,boost:r,sumLength:0,avgLength:0};this._fields.push(o)},t.prototype.add=function(t,e){for(var n=this,r=new Array(this._fields.length),o=new Map,i=0;i<this._fields.length;i++){var s=this._fields[i],u=s.getter,a="string"==typeof u?e[u]:u(e);if(void 0===a)r[i]=0;else{for(var c=this._tokenizer(a),f=0,l=0;l<c.length;l++){var d=this._filter(c[l]);if(""!==d){f++;var h=o.get(d);void 0===h&&(h=new Array(this._fields.length).fill(0),o.set(d,h)),h[i]+=1}}s.sumLength+=f,s.avgLength=s.sumLength/(this._documents.size+1),r[i]=f}}var v={docId:t,removed:!1,fieldLengths:r};this._documents.set(t,v),o.forEach(function(t,e){n._index.add(e,v,t)})},t.prototype.remove=function(t){var e=this._documents.get(t);if(void 0!==e){e.removed=!0,this._documents.delete(t);for(var n=0;n<this._fields.length;n++){var r=e.fieldLengths[n];if(r>0){var o=this._fields[n];o.sumLength-=r,o.avgLength=o.sumLength/this._documents.size}}}},t.prototype.search=function(t){for(var e=this._tokenizer(t),n=new Map,r=0;r<e.length;r++){var o=this._filter(e[r]);if(""!==o)for(var i=this._index.expandTerm(o),s=new Set,u=0;u<i.length;u++){var a=i[u],c=a===o?1:Math.log(1+1/(1+a.length-o.length)),f=this._index.get(a);if(null!==f&&null!==f.firstPosting){for(var l=0,d=f.firstPosting,h=null;null!==d;)d.details.removed?null===h?f.firstPosting=d.next:h.next=d.next:(h=d,l++),d=d.next;if(l>0){var v=Math.log(1+(this.size-l+.5)/(l+.5));for(d=f.firstPosting;null!==d;){if(!d.details.removed){for(var p=0,m=0;m<d.details.fieldLengths.length;m++){var g=d.termFrequency[m];if(g>0){var b=d.details.fieldLengths[m],y=this._fields[m],_=y.avgLength,x=this._bm25k1,w=this._bm25b;p+=(g=(x+1)*g/(x*(1-w+w*(b/_))+g))*v*y.boost*c}}if(p>0){var P=d.details.docId,C=n.get(P);void 0!==C&&s.has(P)?n.set(P,Math.max(C,p)):n.set(P,void 0===C?p:C+p),s.add(P)}}d=d.next}}}}}var k=[];return n.forEach(function(t,e){k.push({docId:e,score:t})}),k.sort(function(t,e){return e.score-t.score}),k},t.prototype.expandTerm=function(t){return this._index.expandTerm(t)},t.prototype.queryToTerms=function(t){for(var e=[],n=this._tokenizer(t),r=0;r<n.length;r++){var o=this._filter(n[r]);""!==o&&(e=e.concat(this._index.expandTerm(o)))}return e},t.prototype.vacuum=function(){this._index.vacuum()},t}();function p(t){postMessage({type:"state",state:t})}!function(){r(this,void 0,void 0,function(){var t,e,n,i,s,u;return o(this,function(a){switch(a.label){case 0:return p(1),[4,new Promise(function(t,e){var n=indexedDB.open("docs",1);n.onerror=function(t){e(n.error)},n.onsuccess=function(e){t(n.result)},n.onupgradeneeded=function(t){var e=n.result;e.objectStoreNames.contains("comments")||e.createObjectStore("comments",{autoIncrement:!0})}})];case 1:return t=a.sent(),p(2),[4,function(t){return new Promise(function(e,n){var r=t.transaction("comments").objectStore("comments").count();r.onerror=function(t){n(r.error)},r.onsuccess=function(t){e(r.result)}})}(t)];case 2:return 0!==a.sent()?[3,4]:[4,function(t){return r(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,fetch("data/reddit_comments.json")];case 1:return[4,t.sent().json()];case 2:return[2,t.sent().map(function(t,e){return{id:e,author:t.author,body:t.body}})]}})})}()];case 3:return e=a.sent(),p(3),function(t,e){new Promise(function(n,r){var o=t.transaction("comments","readwrite");o.onerror=function(t){r(o.error)},o.oncomplete=function(t){n()};for(var i=o.objectStore("comments"),s=0,u=e;s<u.length;s++){var a=u[s];i.add(a)}})}(t,e),[3,6];case 4:return[4,function(t){return new Promise(function(e,n){var r=[],o=t.transaction("comments").objectStore("comments").openCursor();o.onerror=function(t){n(o.error)},o.onsuccess=function(t){var n=t.target.result;n?(r.push(n.value),n.continue()):e(r)}})}(t)];case 5:e=a.sent(),a.label=6;case 6:for(p(4),(n=new v).addField("author"),n.addField("body"),i=0,s=e;i<s.length;i++)u=s[i],n.add(u.id,u);return p(5),onmessage=function(t){var r,o,i=t.data;switch(i.type){case"query":r=i.id,o=n.search(i.query).slice(0,50).map(function(t){return{comment:e[t.docId],score:t.score}}),postMessage({type:"query",id:r,results:o})}},[2]}})})}()}]);