!function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{enumerable:!0,get:getter})},__webpack_require__.r=function(exports){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.t=function(value,mode){if(1&mode&&(value=__webpack_require__(value)),8&mode)return value;if(4&mode&&"object"==typeof value&&value&&value.__esModule)return value;var ns=Object.create(null);if(__webpack_require__.r(ns),Object.defineProperty(ns,"default",{enumerable:!0,value:value}),2&mode&&"string"!=typeof value)for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=2)}([,function(module,exports,__webpack_require__){module.exports=function(){return new Worker(__webpack_require__.p+"20fa8a724c4344169f4e.worker.js")}},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};function __extends(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}var __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},ua=navigator.userAgent,IOS_UA=/iPad|iPhone|iPod/.test(ua)&&!("MSStream"in window);function unorderedArrayDelete(array,index){var length=array.length-1,last=array.pop();index!==length&&(array[index]=last)}function NOOP(){}var ERROR_HANDLERS=[];function catchError(fn){return function(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];try{return fn.apply(void 0,args)}catch(e){for(var _a=0,ERROR_HANDLERS_1=ERROR_HANDLERS;_a<ERROR_HANDLERS_1.length;_a++)(0,ERROR_HANDLERS_1[_a])(e);throw e}}}function runRepeatableTasks(tasks){for(var i=0;i<tasks.length;++i)!0===tasks[i]()&&unorderedArrayDelete(tasks,i--)}function run(t){var tasks=t.a;t.a=[];for(var _i=0,tasks_1=tasks;_i<tasks_1.length;_i++)(0,tasks_1[_i])()}var _isHidden,_flags=0,_microtasks={a:[]},_tasks={a:[]},_visibilityObservers=[],_animations=[],_readers=[],_updateDOMHandler=NOOP,_currentFrame={f:0,w:{a:[]},r:{a:[]},a:{a:[]}},_nextFrame={f:0,w:{a:[]},r:{a:[]},a:{a:[]}},_autofocusedElement=null,runMicrotasks=catchError(function(){for(;_microtasks.a.length>0;)run(_microtasks);_flags^=4});(new MessageChannel).port1.onmessage=catchError(function(ev){_flags^=8,run(_tasks)});var handleVisibilityChange=catchError(function(){var newHidden=_isHidden();if(0!=(1&_flags)!==newHidden){_flags^=3,!newHidden&&_animations.length>0&&requestNextFrame();for(var observers=_visibilityObservers,i=0;i<observers.length;++i)observers[i](newHidden);_flags^=2}});function _requestNextFrame(){16&_flags&&requestAnimationFrame(_handleNextFrame)}function requestNextFrame(){var task;16&_flags||(task=_requestNextFrame,4&(_flags|=16)||(_flags|=4,Promise.resolve().then(runMicrotasks)),_microtasks.a.push(task))}void 0!==document.hidden?(_isHidden=function(){return document.hidden},document.addEventListener("visibilitychange",handleVisibilityChange)):void 0!==document.webkitHidden?(_isHidden=function(){return document.webkitHidden},document.addEventListener("webkitvisibilitychange",handleVisibilityChange)):_isHidden=function(){return!1},_isHidden()&&(_flags|=1);var _handleNextFrame=catchError(function(time){_flags^=48;var frame=_nextFrame;_nextFrame=_currentFrame,_currentFrame=frame,runRepeatableTasks(_readers);do{for(;4&frame.f;)frame.f^=4,run(frame.r);for(;3&frame.f;)2&frame.f&&(frame.f^=2,run(frame.w)),1&frame.f&&(frame.f^=1,_updateDOMHandler())}while(7&frame.f);for(1&(_flags^=32)||runRepeatableTasks(_animations);8&frame.f;)frame.f^=8,run(frame.a);null!==_autofocusedElement&&(_autofocusedElement.focus(),_autofocusedElement=null),_animations.length&&requestNextFrame()});function addFrameTaskUpdate(frame){frame.f|=1}function triggerNextFrame(){16&_flags&&_handleNextFrame(performance.now())}var nodeProto=Node.prototype,elementProto=Element.prototype,nodeInsertBefore=(Object.prototype.hasOwnProperty,nodeProto.insertBefore),nodeRemoveChild=nodeProto.removeChild,nodeReplaceChild=nodeProto.replaceChild,nodeCloneNode=nodeProto.cloneNode,elementSetAttribute=elementProto.setAttribute,elementSetAttributeNS=elementProto.setAttributeNS,elementRemoveAttribute=elementProto.removeAttribute,SVG_NAMESPACE="http://www.w3.org/2000/svg",XLINK_NAMESPACE="http://www.w3.org/1999/xlink",XML_NAMESPACE="http://www.w3.org/XML/1998/namespace";function attachEvents(events){if(events instanceof Array)for(var i=0;i<events.length;++i){var h=events[i];null!==h&&registerEventHandler(h)}else registerEventHandler(events)}function detachEvents(events){if(events instanceof Array)for(var i=0;i<events.length;++i){var h=events[i];null!==h&&unregisterEventHandler(h)}else unregisterEventHandler(events)}function registerEventHandler(handler){handler.src.add(handler)}function unregisterEventHandler(handler){handler.src.remove(handler)}var VNode=function(){function VNode(flags,tag,props,className,children){this._f=flags,this._l=this,this._r=null,this._c=children,this._t=tag,this._k=0,this._p=props,this._i=null,this._cs=className,this._s=null,this._e=null}return VNode.prototype.k=function(key){return this._f|=128,this._k=key,this},VNode.prototype.s=function(style){return this._s=style,this},VNode.prototype.e=function(events){return this._f|=512,this._e=events,this},VNode.prototype.a=function(attrs){return this._p=attrs,this},VNode.prototype.c=function(){for(var children=arguments,first=null,prev=null,i=0,p=0;i<children.length;++i,++p){var n=children[i];if(null!==n){"object"!=typeof n&&(n=new VNode(1,null,null,void 0,n));var last=n._l,flags=n._f;if(last===n)0==(128&flags)&&(n._k=p);else if(0==(256&flags)){var c=n;do{0==(128&c._f)&&(c._k=p),++p,c=c._r}while(null!==c);--p}null!==prev?(n._l=prev,prev._r=n):first=n,prev=last}}return null!==first&&(first._l=prev,this._f|=32,this._c=first),this},VNode.prototype.unsafeHTML=function(html){return this._f|=64,this._c=html,this},VNode.prototype.value=function(value){return this._c=value,this},VNode}();function getDOMInstanceFromVNode(node){return 0!=(49176&node._f)?getDOMInstanceFromVNode(node._c):node._i}function syncStyle(node,a,b){var key,bValue,style=node.style;if(null===a)for(key in b)void 0!==(bValue=b[key])&&style.setProperty(key,bValue);else if(null!==b)for(key in b)bValue=b[key],a[key]!==bValue&&(void 0!==bValue?style.setProperty(key,bValue):style.removeProperty(key))}function setDOMAttribute(node,svg,key,value){if("boolean"==typeof value){if(!value)return;value=""}if(!0===svg&&key.length>5&&120===key.charCodeAt(0)&&(58===key.charCodeAt(3)||58===key.charCodeAt(5))){if(key.startsWith("xml:"))return void elementSetAttributeNS.call(node,XML_NAMESPACE,key,value);if(key.startsWith("xlink:"))return void elementSetAttributeNS.call(node,XLINK_NAMESPACE,key,value)}elementSetAttribute.call(node,key,value)}function syncDOMAttrs(node,svg,a,b){var key,bValue;if(null===a)for(key in b)void 0!==(bValue=b[key])&&setDOMAttribute(node,svg,key,bValue);else if(null!==b)for(key in b)bValue=b[key],a[key]!==bValue&&(void 0!==bValue?setDOMAttribute(node,svg,key,bValue):elementRemoveAttribute.call(node,key))}function removeVNode(parent,vnode){nodeRemoveChild.call(parent,getDOMInstanceFromVNode(vnode)),_detach(vnode)}function _attach(vnode){var flags=vnode._f;if(0!=(32&flags)){var child=vnode._c;do{_attach(child),child=child._r}while(null!==child)}else 0!=(49176&flags)&&(0!=(16&flags)&&vnode._i.attached(),_attach(vnode._c));0!=(512&flags)&&null!==vnode._e&&attachEvents(vnode._e)}function _detach(vnode){var flags=vnode._f;if(0!=(32&flags)){var child=vnode._c;do{_detach(child),child=child._r}while(null!==child)}else if(0!=(49176&flags)&&(_detach(vnode._c),0!=(16&flags))){var component=vnode._i;component.flags|=1,component.detached()}0!=(512&flags)&&null!==vnode._e&&detachEvents(vnode._e)}function dirtyCheck(parent,vnode,context,dirtyContext){var children,instance,flags=vnode._f,deepUpdate=0;if((-2147434440&flags)>0)if(children=vnode._c,0!=(32&flags)){instance=vnode._i;do{deepUpdate|=dirtyCheck(instance,children,context,dirtyContext),children=children._r}while(null!==children)}else if(0!=(16&flags))0!=(6&(instance=vnode._i).flags)?(syncVNode(parent,children,vnode._c=instance.render(),context,dirtyContext),instance.flags&=-7,instance.updated(!0),deepUpdate=1):0!==(deepUpdate=dirtyCheck(parent,children,context,dirtyContext))&&instance.updated(!1);else if(0!=(16384&flags)){var connect=vnode._t;instance=vnode._i;var selectData=connect.select(instance,vnode._p,context);instance===selectData?deepUpdate=dirtyCheck(parent,children,context,dirtyContext):(deepUpdate=1,vnode._i=selectData,syncVNode(parent,children,vnode._c=connect.render(selectData),context,dirtyContext))}else 0!=(32768&flags)&&(!0===dirtyContext&&(vnode._i=__assign({},context,vnode._p)),context=vnode._i),deepUpdate=dirtyCheck(parent,children,context,dirtyContext);return deepUpdate}function _removeAllChildren(parent,firstVNode){parent.textContent="";var vnode=firstVNode;do{_detach(vnode),vnode=vnode._r}while(null!==vnode)}function _setInputValue(input,value){"string"==typeof value?input.value=value:input.checked=value}function _render(parent,vnode,context){var node,flags=vnode._f,instance=null;if(0!=(1&flags))instance=node=document.createTextNode(vnode._c);else{var tag=vnode._t;if(0!=(18&flags))if(0!=(2&flags)){var svg=0!=(8192&flags);0==(4&flags)?node=svg?document.createElementNS(SVG_NAMESPACE,tag):document.createElement(tag):(null===tag._i&&_render(parent,tag,context),node=nodeCloneNode.call(tag._i,!1)),void 0!==vnode._cs&&(!0===svg?elementSetAttribute.call(node,"class",vnode._cs):node.className=vnode._cs),null!==vnode._p&&syncDOMAttrs(node,svg,null,vnode._p),null!==vnode._s&&syncStyle(node,null,vnode._s);var children=vnode._c;if(null!==children)if(0!=(32&flags)){children=children;do{nodeInsertBefore.call(node,_render(node,children,context),null),children=children._r}while(null!==children)}else 0!=(3072&flags)?_setInputValue(node,children):node.innerHTML=children;instance=node}else{var component=instance=new tag(vnode._p);node=_render(parent,vnode._c=component.render(),context)}else{if(0!=(49152&flags))if(0!=(16384&flags)){var connect=tag,selectData=instance=connect.select(null,vnode._p,context);vnode._c=connect.render(selectData)}else context=instance=__assign({},context,vnode._p);else vnode._c=tag.render(vnode._p);node=_render(parent,vnode._c,context)}0!=(131072&flags)&&function(node){node instanceof Element&&(_autofocusedElement=node)}(node)}return vnode._i=instance,node}function renderVNode(parent,refChild,vnode,context){var node=_render(parent,vnode,context);return nodeInsertBefore.call(parent,node,refChild),_attach(vnode),node}function syncVNode(parent,a,b,context,dirtyContext){if(a!==b){var instance,aFlags=a._f,bFlags=b._f;if(0!=(134020319&(aFlags^bFlags))||0!=(16412&aFlags)&&a._t!==b._t||a._k!==b._k)instance=_render(parent,b,context),nodeReplaceChild.call(parent,instance,getDOMInstanceFromVNode(a)),_detach(a),_attach(b);else{b._i=instance=a._i;var aChild=a._c,bChild=b._c;if(0!=(1&bFlags))aChild!==bChild&&(instance.data=bChild);else if(a._e!==b._e&&function(a,b){var i,h1,h2;if(null===a)attachEvents(b);else if(null===b)detachEvents(a);else if(a instanceof Array)if(b instanceof Array){for(i=0;i<a.length&&i<b.length;)(h1=a[i])!==(h2=b[i++])&&(null!==h2&&registerEventHandler(h2),null!==h1&&unregisterEventHandler(h1));for(;i<b.length;)null!==(h1=b[i++])&&registerEventHandler(h1);for(;i<a.length;)null!==(h1=a[i++])&&unregisterEventHandler(h1)}else for(registerEventHandler(b),i=0;i<a.length;++i)null!==(h1=a[i])&&unregisterEventHandler(h1);else attachEvents(b),unregisterEventHandler(a)}(a._e,b._e),0!=(18&bFlags))if(0!=(2&bFlags)){var svg=0!=(8192&bFlags);if(a._cs!==b._cs){var className=void 0===b._cs?"":b._cs;!0===svg?elementSetAttribute.call(instance,"class",className):instance.className=className}if(a._p!==b._p&&syncDOMAttrs(instance,svg,a._p,b._p),a._s!==b._s&&syncStyle(instance,a._s,b._s),aChild!==bChild)if(null===aChild)if(0!=(32&bFlags)){bChild=bChild;do{renderVNode(instance,null,bChild,context),bChild=bChild._r}while(null!==bChild)}else 0!=(3072&bFlags)?_setInputValue(instance,bChild):instance.innerHTML=bChild;else null===bChild?0!=(32&aFlags)?_removeAllChildren(instance,aChild):0!=(64&aFlags)&&(instance.textContent=""):0!=(32&aFlags)?function(parent,aStartVNode,bStartVNode,context,dirtyContext){var aEndVNode=aStartVNode._l,bEndVNode=bStartVNode._l,i=0,step1Synced=0;outer:for(;;){for(;aStartVNode._k===bStartVNode._k&&0==(128&(aStartVNode._f^bStartVNode._f));)if(syncVNode(parent,aStartVNode,bStartVNode,context,dirtyContext),step1Synced++,aStartVNode===aEndVNode?i=1:aStartVNode=aStartVNode._r,bStartVNode===bEndVNode?i|=2:bStartVNode=bStartVNode._r,i)break outer;for(;aEndVNode._k===bEndVNode._k&&0==(128&(aEndVNode._f^bEndVNode._f));)if(syncVNode(parent,aEndVNode,bEndVNode,context,dirtyContext),step1Synced++,aStartVNode===aEndVNode?i=1:aEndVNode=aEndVNode._l,bStartVNode===bEndVNode?i|=2:bEndVNode=bEndVNode._l,i)break outer;break}if(i){if(i<3)if(i<2)for(var next=nextNode(bEndVNode);renderVNode(parent,next,bStartVNode,context),bStartVNode!==bEndVNode;)bStartVNode=bStartVNode._r;else for(;removeVNode(parent,aStartVNode),aStartVNode!==aEndVNode;)aStartVNode=aStartVNode._r}else{for(var aInnerLength=0,bInnerLength=0,lastPosition=0,bInnerArray=[],explicitKeyIndex=void 0,implicitKeyIndex=void 0,key=void 0,vnode=bStartVNode;key=vnode._k,128&vnode._f?(void 0===explicitKeyIndex&&(explicitKeyIndex=new Map),explicitKeyIndex.set(key,bInnerLength)):(void 0===implicitKeyIndex&&(implicitKeyIndex=new Map),implicitKeyIndex.set(key,bInnerLength)),bInnerArray[bInnerLength++]=vnode,vnode!==bEndVNode;)vnode=vnode._r;var prevPositionsForB=new Array(bInnerLength).fill(-1),step2Synced=0;for(vnode=aStartVNode;key=vnode._k,void 0===(i=128&vnode._f?explicitKeyIndex?explicitKeyIndex.get(key):void 0:implicitKeyIndex?implicitKeyIndex.get(key):void 0)?vnode._k=null:(lastPosition=lastPosition>i?1e9:i,prevPositionsForB[i]=aInnerLength,syncVNode(parent,vnode,bInnerArray[i],context,dirtyContext),step2Synced++),aInnerLength++,vnode!==aEndVNode;)vnode=vnode._r;if(step1Synced||step2Synced){for(i=aInnerLength-step2Synced;i>0;)null===aStartVNode._k&&(removeVNode(parent,aStartVNode),i--),aStartVNode=aStartVNode._r;if(1e9===lastPosition){var seq=function(a){var u,v,j,p=a.slice(),result=[];result.push(0);for(var i=0;i<a.length;++i){var k=a[i];if(-1!==k)if(a[j=result[result.length-1]]<k)p[i]=j,result.push(i);else{for(u=0,v=result.length-1;u<v;)a[result[j=(u+v)/2|0]]<k?u=j+1:v=j;k<a[result[u]]&&(u>0&&(p[i]=result[u-1]),result[u]=i)}}for(v=result[(u=result.length)-1];u-- >0;)result[u]=v,v=p[v];return result}(prevPositionsForB);for(i=seq.length-1;bInnerLength>0;)prevPositionsForB[--bInnerLength]<0?renderVNode(parent,nextNode(bEndVNode),bEndVNode,context):i<0||bInnerLength!==seq[i]?nodeInsertBefore.call(parent,getDOMInstanceFromVNode(bEndVNode),nextNode(bEndVNode)):i--,bEndVNode=bEndVNode._l}else if(step2Synced!==bInnerLength)for(;bInnerLength>0;)prevPositionsForB[--bInnerLength]<0&&renderVNode(parent,nextNode(bEndVNode),bEndVNode,context),bEndVNode=bEndVNode._l}else{_removeAllChildren(parent,aStartVNode);do{renderVNode(parent,null,bStartVNode,context),bStartVNode=bStartVNode._r}while(null!==bStartVNode)}}}(instance,aChild,bChild,context,dirtyContext):0!=(64&aFlags)?instance.innerHTML=bChild:"string"==typeof bChild?instance.value!==bChild&&(instance.value=bChild):instance.checked=bChild}else{var oldProps=a._p,newProps=b._p;oldProps!==newProps&&instance.newPropsReceived(oldProps,newProps),instance.props=newProps,0!=(6&instance.flags)||!0===instance.shouldUpdate(oldProps,newProps)?(syncVNode(parent,aChild,b._c=instance.render(),context,dirtyContext),instance.flags&=-7,instance.updated(!0)):0!==dirtyCheck(parent,b._c=aChild,context,dirtyContext)&&instance.updated(!1)}else if(0!=(49152&bFlags))if(0!=(16384&bFlags)){var connect=b._t,prevSelectData=instance,selectData=b._i=connect.select(prevSelectData,b._p,context);prevSelectData===selectData?dirtyCheck(parent,b._c=aChild,context,dirtyContext):syncVNode(parent,aChild,b._c=connect.render(selectData),context,dirtyContext)}else a._p!==b._p&&(dirtyContext=!0),b._i=context=!0===dirtyContext?__assign({},context,b._p):instance,syncVNode(parent,aChild,bChild,context,dirtyContext);else{var sc=b._t;a._p===b._p||0!=(65536&bFlags)&&!0!==sc.shouldUpdate(a._p,b._p)?dirtyCheck(parent,b._c=aChild,context,dirtyContext):syncVNode(parent,aChild,b._c=sc.render(b._p),context,dirtyContext)}}}else dirtyCheck(parent,b,context,dirtyContext)}function nextNode(vnode){var next=vnode._r;return null===next?null:getDOMInstanceFromVNode(next)}var ROOTS=[],EMPTY_CONTEXT={},_pendingUpdate=0;function _update(){if(_pendingUpdate){_pendingUpdate=0,_updateDOMHandler=update;for(var i=0;i<ROOTS.length;++i){var root=ROOTS[i],container=root.container,currentVNode=root.currentVNode;if(root.invalidated){var newVNode=root.newVNode;newVNode?(currentVNode?syncVNode(container,currentVNode,newVNode,EMPTY_CONTEXT,!1):(renderVNode(container,null,newVNode,EMPTY_CONTEXT),IOS_UA&&(container.onclick=NOOP)),root.currentVNode=newVNode):currentVNode&&(removeVNode(container,currentVNode),unorderedArrayDelete(ROOTS,ROOTS.indexOf(root)),--i),root.newVNode=null,root.invalidated=!1}else currentVNode&&dirtyCheck(container,currentVNode,EMPTY_CONTEXT,!1)}}}function update(){updateNextFrame(),triggerNextFrame()}function updateNextFrame(){var task;_pendingUpdate||(_pendingUpdate=1,task=_update,requestNextFrame(),function(frame,task){frame.f|=2,frame.w.a.push(task)}(_nextFrame,task))}function vnode_factories_connect(select,render){var descriptor={select:select,render:render};return function(props){return new VNode(16384,descriptor,props,void 0,null)}}function visitMatchingDOMTargets(result,match,vnode,nodes,index){var flags=vnode._f;if(6&flags){if(vnode._i===nodes[index]){if(0===index)return accumulateDispatchTargetsFromVNode(result,vnode,match),1;--index;for(var child=vnode._c;null!==child;){if(visitMatchingDOMTargets(result,match,child,nodes,index))return accumulateDispatchTargetsFromVNode(result,vnode,match),1;child=child._r}}}else if(49176&flags&&visitMatchingDOMTargets(result,match,vnode._c,nodes,index))return accumulateDispatchTargetsFromVNode(result,vnode,match),1;return 0}function accumulateDispatchTargetsFromVNode(result,target,match){var events=target._e;if(events){var handlers=void 0;if(Array.isArray(events))for(var count=0,_a=0,events_1=events;_a<events_1.length;_a++){var h=events_1[_a];null!==h&&!0===match(h)&&(0===count?handlers=h:1===count?handlers=[handlers,h]:handlers.push(h),++count)}else!0===match(events)&&(handlers=events);void 0!==handlers&&result.push({target:target,handlers:handlers})}}function dispatchEventToLocalEventHandlers(target,event,matchFlags,dispatch){var handlers=target.handlers,flags=0;if(Array.isArray(handlers))for(var _i=0,handlers_1=handlers;_i<handlers_1.length;_i++){var handler=handlers_1[_i];handler.flags&matchFlags&&(flags|=_dispatch(handler,dispatch,event))}else handlers.flags&matchFlags&&(flags=_dispatch(handlers,dispatch,event));event.flags|=flags}function _dispatch(handler,dispatch,event){var flags=void 0===dispatch?handler.handler(event):dispatch(handler,event);return void 0===flags?0:flags}var PASSIVE_EVENTS=function(){var v=!1;try{var opts=Object.defineProperty({},"passive",{get:function(){v=!0}});window.addEventListener("test",null,opts)}catch(e){}return v}();KeyboardEvent.prototype.hasOwnProperty("key"),MouseEvent.prototype.hasOwnProperty("buttons"),window,window,window;var EVENT_CAPTURE_PASSIVE_OPTIONS=!PASSIVE_EVENTS||{capture:!0,passive:!0},EVENT_CAPTURE_ACTIVE_OPTIONS=!PASSIVE_EVENTS||{capture:!0,passive:!1},EVENT_PASSIVE_OPTIONS=!!PASSIVE_EVENTS&&{passive:!0},EVENT_ACTIVE_OPTIONS=!!PASSIVE_EVENTS&&{passive:!1};function getNativeEventOptions(flags){return 2&flags?1&flags?EVENT_CAPTURE_PASSIVE_OPTIONS:EVENT_PASSIVE_OPTIONS:1&flags?EVENT_CAPTURE_ACTIVE_OPTIONS:EVENT_ACTIVE_OPTIONS}var synthetic_native_event_SyntheticNativeEvent=function(_super){function SyntheticNativeEvent(flags,target,timestamp,native){var _this=_super.call(this,flags,timestamp)||this;return _this.target=target,_this.native=native,_this}return __extends(SyntheticNativeEvent,_super),SyntheticNativeEvent}(function(flags,timestamp){this.flags=flags,this.timestamp=timestamp});function dispatchToListeners(listeners,ev){if(null!==listeners)for(var _i=0,cbs_1=listeners.slice();_i<cbs_1.length;_i++)(0,cbs_1[_i])(ev)}var EVENT_DISPATCHER_INPUT=function(flags,name){var source={src:{add:function(){++source.listeners,function(source){0==source.deps++&&document.addEventListener(source.name,source.dispatch,getNativeEventOptions(source.flags))}(source)},remove:function(){--source.listeners,function(source){0==--source.deps&&document.removeEventListener(source.name,source.dispatch,getNativeEventOptions(source.flags))}(source)}},deps:0,listeners:0,flags:5,name:"input",before:null,after:null,dispatch:null},matchEventSource=function(h){return h.src===source.src};return source.dispatch=catchError(function(ev){var domTarget=function(ev){var target=ev.target||window;return void 0!==target.correspondingUseElement&&(target=target.correspondingUseElement),target}(ev),targets=[];if(source.listeners>0&&function(result,target,match){for(var _a=0,ROOTS_1=ROOTS;_a<ROOTS_1.length;_a++){var root=ROOTS_1[_a],container=root.container;if(container.contains(target)){for(var domTargets=[];target!==container;)domTargets.push(target),target=target.parentNode;visitMatchingDOMTargets(result,match,root.currentVNode,domTargets,domTargets.length-1);break}}}(targets,domTarget,matchEventSource),targets.length||null!==source.before||null!==source.after){var syntheticEvent=new synthetic_native_event_SyntheticNativeEvent(0,domTarget,ev.timeStamp,ev);dispatchToListeners(source.before,syntheticEvent),targets.length&&function(targets,event,bubble,dispatch){for(var i=targets.length-1;i>=0;)if(dispatchEventToLocalEventHandlers(targets[i--],event,1,void 0),2&event.flags)return;if(bubble)for(event.flags|=32,i=0;i<targets.length;++i)if(dispatchEventToLocalEventHandlers(targets[i],event,2,void 0),2&event.flags)return}(targets,syntheticEvent,0!=(4&source.flags)),dispatchToListeners(source.after,syntheticEvent),0!=(1&syntheticEvent.flags)&&ev.preventDefault()}}),source}(),component_Component=function(){function Component(props){this.flags=0,this.props=props}return Component.prototype.newPropsReceived=function(prev,next){},Component.prototype.attached=function(){},Component.prototype.detached=function(){},Component.prototype.shouldUpdate=function(prev,next){return prev!==next},Component.prototype.updated=function(local){},Component.prototype.invalidated=function(){},Component.prototype.invalidate=function(){this.flags|=2,this.invalidated(),0==(1&this.flags)&&(32&_flags?addFrameTaskUpdate(_currentFrame):(requestNextFrame(),addFrameTaskUpdate(_nextFrame)))},Component}();function div(className){return new VNode(15728642,"div",null,className,null)}var c,d,worker=__webpack_require__(1),WORKER=new(__webpack_require__.n(worker).a),STATE={appState:0,workerState:0,queryId:0,results:null},PLACEHOLDER={placeholder:"Type to search"},SearchField=(c=function(_super){function class_1(){var handler,capture,_this=null!==_super&&_super.apply(this,arguments)||this;return _this.value="",_this.events=(handler=function(ev){var query;(query=_this.value=ev.target.value)?(STATE.appState=1,WORKER.postMessage({id:++STATE.queryId,type:"query",query:query})):STATE.appState=0,STATE.results=null,updateNextFrame()},void 0===capture&&(capture=!1),function(src,handler,capture){return{src:src,flags:!0===capture?1:2,handler:handler,listeners:0,props:null,state:null}}(EVENT_DISPATCHER_INPUT.src,handler,capture)),_this}return __extends(class_1,_super),class_1.prototype.render=function(){return div("search-field").c(new VNode(30147586,"input",null,void 0,null).a(PLACEHOLDER).e(this.events).value(this.value))},class_1}(component_Component),function(props){return new VNode(16,c,props,void 0,null)}),Result=(d={render:function(r){return div("result").c(div("result-score").c(r.score),div("result-author").c(r.comment.author),div("result-body").c(r.comment.body))},shouldUpdate:null},function(props){return new VNode(8,d,props,void 0,null)}),SearchResults=vnode_factories_connect(function(prev){var appState=STATE.appState,results=STATE.results;return null!==prev&&prev.appState===appState&&prev.results===results?prev:{appState:appState,results:results}},function(_a){var appState=_a.appState,results=_a.results;return div("search-results").c(0===appState?results?function(array,fn){for(var first=null,prev=null,i=0;i<array.length;++i){var n=fn(array[i],i);null!==n&&(null!==prev?(n._l=prev,prev._r=n):first=n,prev=n)}return null!==first?(first._l=prev,first._f|=256,first):null}(results,function(r,i){return Result(r).k(i)}):null:div("spinner"))}),App=vnode_factories_connect(function(){return STATE.workerState},function(workerState){return div("main").c(5===workerState?div("search-view").c(SearchField(),SearchResults()):div("main-progress").c(div("spinner"),div("main-progress-text").c(function(s){switch(workerState){case 0:return"Waiting for a Web Worker";case 1:return"Worker is Ready";case 2:return"Loading Documents";case 3:return"Saving Documents to the IndexedDB";case 4:return"Indexing Documents"}return""}())))});WORKER.addEventListener("message",function(e){if("number"!=typeof e.data){var data=e.data;switch(data.type){case"state":STATE.workerState=data.state,updateNextFrame();break;case"query":1&STATE.appState&&STATE.queryId===data.id&&(STATE.appState=0,STATE.results=data.results,updateNextFrame())}}}),function(vnode,container){var root=function(container){for(var _i=0,ROOTS_1=ROOTS;_i<ROOTS_1.length;_i++){var root=ROOTS_1[_i];if(root.container===container)return root}}(container);root?(root.newVNode=vnode,root.invalidated=!0):ROOTS.push({container:container,currentVNode:null,newVNode:vnode,invalidated:!0}),updateNextFrame()}(App(),document.getElementById("app")),triggerNextFrame()}]);