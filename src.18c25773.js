parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"PZFh":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3],e="Expected a function",n=NaN,r="[object Symbol]",i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,c=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,v=a||s||Function("return this")(),l=Object.prototype,p=l.toString,b=Math.max,m=Math.min,y=function(){return v.Date.now()};function d(t,n,r){var i,o,u,f,c,a,s=0,v=!1,l=!1,p=!0;if("function"!=typeof t)throw new TypeError(e);function d(e){var n=i,r=o;return i=o=void 0,s=e,f=t.apply(r,n)}function g(t){var e=t-a;return void 0===a||e>=n||e<0||l&&t-s>=u}function O(){var t=y();if(g(t))return x(t);c=setTimeout(O,function(t){var e=n-(t-a);return l?m(e,u-(t-s)):e}(t))}function x(t){return c=void 0,p&&i?d(t):(i=o=void 0,f)}function T(){var t=y(),e=g(t);if(i=arguments,o=this,a=t,e){if(void 0===c)return function(t){return s=t,c=setTimeout(O,n),v?d(t):f}(a);if(l)return c=setTimeout(O,n),d(a)}return void 0===c&&(c=setTimeout(O,n)),f}return n=h(n)||0,j(r)&&(v=!!r.leading,u=(l="maxWait"in r)?b(h(r.maxWait)||0,n):u,p="trailing"in r?!!r.trailing:p),T.cancel=function(){void 0!==c&&clearTimeout(c),s=0,i=a=o=c=void 0},T.flush=function(){return void 0===c?f:x(y())},T}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){return!!t&&"object"==typeof t}function O(t){return"symbol"==typeof t||g(t)&&p.call(t)==r}function h(t){if("number"==typeof t)return t;if(O(t))return n;if(j(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=j(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var r=u.test(t);return r||f.test(t)?c(t.slice(2),r?2:8):o.test(t)?n:+t}module.exports=d;
},{}],"IuX0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e="b32f977d148061c9ab22a471ff2c7792",t="https://api.themoviedb.org/3/";class s{constructor(){this.searchQuery="",this.page=1}fetchArticles(){const e=`https://api.themoviedb.org/3/trending/movie/week?api_key=b32f977d148061c9ab22a471ff2c7792&page=${this.page}`;return fetch(e).then(e=>e.json()).then(e=>(this.incrementPage(),e.results))}filmRequest(){const s=`${t}search/movie?api_key=${e}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`;return fetch(s).then(e=>e.json()).then(e=>(this.incrementPage(),e.results))}getFilmById(s){return fetch(`${t}movie/${s}?api_key=${e}&language=en-US`).then(e=>e.json())}incrementPage(){this.page+=1}resetPage(){this.page=1}setSearchQuery(e){this.searchQuery=e}}exports.default=s;
},{}],"pAws":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,t=arguments[3];!function(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof e&&e.amd?e([],r):"object"==typeof exports?exports.Handlebars=r():t.Handlebars=r()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}return r.m=e,r.c=t,r.p="",r(0)}([function(e,t,r){"use strict";var n=r(1).default,o=r(2).default;t.__esModule=!0;var a=n(r(3)),i=o(r(36)),u=o(r(5)),l=n(r(4)),s=n(r(37)),c=o(r(43));function f(){var e=new a.HandlebarsEnvironment;return l.extend(e,a),e.SafeString=i.default,e.Exception=u.default,e.Utils=l,e.escapeExpression=l.escapeExpression,e.VM=s,e.template=function(t){return s.template(t,e)},e}var p=f();p.create=f,c.default(p),p.default=p,t.default=p,e.exports=t.default},function(e,t){"use strict";t.default=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},t.__esModule=!0},function(e,t){"use strict";t.default=function(e){return e&&e.__esModule?e:{default:e}},t.__esModule=!0},function(e,t,r){"use strict";var n=r(2).default;t.__esModule=!0,t.HandlebarsEnvironment=c;var o=r(4),a=n(r(5)),i=r(9),u=r(29),l=n(r(31)),s=r(32);t.VERSION="4.7.7";t.COMPILER_REVISION=8;t.LAST_COMPATIBLE_COMPILER_REVISION=7;t.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0 <4.3.0",8:">= 4.3.0"};function c(e,t,r){this.helpers=e||{},this.partials=t||{},this.decorators=r||{},i.registerDefaultHelpers(this),u.registerDefaultDecorators(this)}c.prototype={constructor:c,logger:l.default,log:l.default.log,registerHelper:function(e,t){if("[object Object]"===o.toString.call(e)){if(t)throw new a.default("Arg not supported with multiple helpers");o.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){if("[object Object]"===o.toString.call(e))o.extend(this.partials,e);else{if(void 0===t)throw new a.default('Attempting to register a partial called "'+e+'" as undefined');this.partials[e]=t}},unregisterPartial:function(e){delete this.partials[e]},registerDecorator:function(e,t){if("[object Object]"===o.toString.call(e)){if(t)throw new a.default("Arg not supported with multiple decorators");o.extend(this.decorators,e)}else this.decorators[e]=t},unregisterDecorator:function(e){delete this.decorators[e]},resetLoggedPropertyAccesses:function(){s.resetLoggedProperties()}};var f=l.default.log;t.log=f,t.createFrame=o.createFrame,t.logger=l.default},function(e,t){"use strict";t.__esModule=!0,t.extend=i,t.indexOf=function(e,t){for(var r=0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1},t.escapeExpression=function(e){if("string"!=typeof e){if(e&&e.toHTML)return e.toHTML();if(null==e)return"";if(!e)return e+"";e=""+e}if(!o.test(e))return e;return e.replace(n,a)},t.isEmpty=function(e){return!e&&0!==e||!(!s(e)||0!==e.length)},t.createFrame=function(e){var t=i({},e);return t._parent=e,t},t.blockParams=function(e,t){return e.path=t,e},t.appendContextPath=function(e,t){return(e?e+".":"")+t};var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},n=/[&<>"'`=]/g,o=/[&<>"'`=]/;function a(e){return r[e]}function i(e){for(var t=1;t<arguments.length;t++)for(var r in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],r)&&(e[r]=arguments[t][r]);return e}var u=Object.prototype.toString;t.toString=u;var l=function(e){return"function"==typeof e};l(/x/)&&(t.isFunction=l=function(e){return"function"==typeof e&&"[object Function]"===u.call(e)}),t.isFunction=l;var s=Array.isArray||function(e){return!(!e||"object"!=typeof e)&&"[object Array]"===u.call(e)};t.isArray=s},function(e,t,r){"use strict";var n=r(6).default;t.__esModule=!0;var o=["description","fileName","lineNumber","endLineNumber","message","name","number","stack"];function a(e,t){var r=t&&t.loc,i=void 0,u=void 0,l=void 0,s=void 0;r&&(i=r.start.line,u=r.end.line,l=r.start.column,s=r.end.column,e+=" - "+i+":"+l);for(var c=Error.prototype.constructor.call(this,e),f=0;f<o.length;f++)this[o[f]]=c[o[f]];Error.captureStackTrace&&Error.captureStackTrace(this,a);try{r&&(this.lineNumber=i,this.endLineNumber=u,n?(Object.defineProperty(this,"column",{value:l,enumerable:!0}),Object.defineProperty(this,"endColumn",{value:s,enumerable:!0})):(this.column=l,this.endColumn=s))}catch(p){}}a.prototype=new Error,t.default=a,e.exports=t.default},function(e,t,r){e.exports={default:r(7),__esModule:!0}},function(e,t,r){var n=r(8);e.exports=function(e,t,r){return n.setDesc(e,t,r)}},function(e,t){var r=Object;e.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(e,t,r){"use strict";var n=r(2).default;t.__esModule=!0,t.registerDefaultHelpers=function(e){o.default(e),a.default(e),i.default(e),u.default(e),l.default(e),s.default(e),c.default(e)},t.moveHelperToHooks=function(e,t,r){e.helpers[t]&&(e.hooks[t]=e.helpers[t],r||delete e.helpers[t])};var o=n(r(10)),a=n(r(11)),i=n(r(24)),u=n(r(25)),l=n(r(26)),s=n(r(27)),c=n(r(28))},function(e,t,r){"use strict";t.__esModule=!0;var n=r(4);t.default=function(e){e.registerHelper("blockHelperMissing",function(t,r){var o=r.inverse,a=r.fn;if(!0===t)return a(this);if(!1===t||null==t)return o(this);if(n.isArray(t))return t.length>0?(r.ids&&(r.ids=[r.name]),e.helpers.each(t,r)):o(this);if(r.data&&r.ids){var i=n.createFrame(r.data);i.contextPath=n.appendContextPath(r.data.contextPath,r.name),r={data:i}}return a(t,r)})},e.exports=t.default},function(e,t,r){(function(n){"use strict";var o=r(12).default,a=r(2).default;t.__esModule=!0;var i=r(4),u=a(r(5));t.default=function(e){e.registerHelper("each",function(e,t){if(!t)throw new u.default("Must pass iterator to #each");var r,a=t.fn,l=t.inverse,s=0,c="",f=void 0,p=void 0;function d(t,r,n){f&&(f.key=t,f.index=r,f.first=0===r,f.last=!!n,p&&(f.contextPath=p+t)),c+=a(e[t],{data:f,blockParams:i.blockParams([e[t],t],[p+t,null])})}if(t.data&&t.ids&&(p=i.appendContextPath(t.data.contextPath,t.ids[0])+"."),i.isFunction(e)&&(e=e.call(this)),t.data&&(f=i.createFrame(t.data)),e&&"object"==typeof e)if(i.isArray(e))for(var h=e.length;s<h;s++)s in e&&d(s,s,s===e.length-1);else if(n.Symbol&&e[n.Symbol.iterator]){for(var v=[],m=e[n.Symbol.iterator](),g=m.next();!g.done;g=m.next())v.push(g.value);for(h=(e=v).length;s<h;s++)d(s,s,s===e.length-1)}else r=void 0,o(e).forEach(function(e){void 0!==r&&d(r,s-1),r=e,s++}),void 0!==r&&d(r,s-1,!0);return 0===s&&(c=l(this)),c})},e.exports=t.default}).call(t,function(){return this}())},function(e,t,r){e.exports={default:r(13),__esModule:!0}},function(e,t,r){r(14),e.exports=r(20).Object.keys},function(e,t,r){var n=r(15);r(17)("keys",function(e){return function(t){return e(n(t))}})},function(e,t,r){var n=r(16);e.exports=function(e){return Object(n(e))}},function(e,t){e.exports=function(e){if(null==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,r){var n=r(18),o=r(20),a=r(23);e.exports=function(e,t){var r=(o.Object||{})[e]||Object[e],i={};i[e]=t(r),n(n.S+n.F*a(function(){r(1)}),"Object",i)}},function(e,t,r){var n=r(19),o=r(20),a=r(21),i=function(e,t,r){var u,l,s,c=e&i.F,f=e&i.G,p=e&i.S,d=e&i.P,h=e&i.B,v=e&i.W,m=f?o:o[t]||(o[t]={}),g=f?n:p?n[t]:(n[t]||{}).prototype;for(u in f&&(r=t),r)(l=!c&&g&&u in g)&&u in m||(s=l?g[u]:r[u],m[u]=f&&"function"!=typeof g[u]?r[u]:h&&l?a(s,n):v&&g[u]==s?function(e){var t=function(t){return this instanceof e?new e(t):e(t)};return t.prototype=e.prototype,t}(s):d&&"function"==typeof s?a(Function.call,s):s,d&&((m.prototype||(m.prototype={}))[u]=s))};i.F=1,i.G=2,i.S=4,i.P=8,i.B=16,i.W=32,e.exports=i},function(e,t){var r=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(e,t){var r=e.exports={version:"1.2.6"};"number"==typeof __e&&(__e=r)},function(e,t,r){var n=r(22);e.exports=function(e,t,r){if(n(e),void 0===t)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,n){return e.call(t,r,n)};case 3:return function(r,n,o){return e.call(t,r,n,o)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t,r){"use strict";var n=r(2).default;t.__esModule=!0;var o=n(r(5));t.default=function(e){e.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new o.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},e.exports=t.default},function(e,t,r){"use strict";var n=r(2).default;t.__esModule=!0;var o=r(4),a=n(r(5));t.default=function(e){e.registerHelper("if",function(e,t){if(2!=arguments.length)throw new a.default("#if requires exactly one argument");return o.isFunction(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||o.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,r){if(2!=arguments.length)throw new a.default("#unless requires exactly one argument");return e.helpers.if.call(this,t,{fn:r.inverse,inverse:r.fn,hash:r.hash})})},e.exports=t.default},function(e,t){"use strict";t.__esModule=!0,t.default=function(e){e.registerHelper("log",function(){for(var t=[void 0],r=arguments[arguments.length-1],n=0;n<arguments.length-1;n++)t.push(arguments[n]);var o=1;null!=r.hash.level?o=r.hash.level:r.data&&null!=r.data.level&&(o=r.data.level),t[0]=o,e.log.apply(e,t)})},e.exports=t.default},function(e,t){"use strict";t.__esModule=!0,t.default=function(e){e.registerHelper("lookup",function(e,t,r){return e?r.lookupProperty(e,t):e})},e.exports=t.default},function(e,t,r){"use strict";var n=r(2).default;t.__esModule=!0;var o=r(4),a=n(r(5));t.default=function(e){e.registerHelper("with",function(e,t){if(2!=arguments.length)throw new a.default("#with requires exactly one argument");o.isFunction(e)&&(e=e.call(this));var r=t.fn;if(o.isEmpty(e))return t.inverse(this);var n=t.data;return t.data&&t.ids&&((n=o.createFrame(t.data)).contextPath=o.appendContextPath(t.data.contextPath,t.ids[0])),r(e,{data:n,blockParams:o.blockParams([e],[n&&n.contextPath])})})},e.exports=t.default},function(e,t,r){"use strict";var n=r(2).default;t.__esModule=!0,t.registerDefaultDecorators=function(e){o.default(e)};var o=n(r(30))},function(e,t,r){"use strict";t.__esModule=!0;var n=r(4);t.default=function(e){e.registerDecorator("inline",function(e,t,r,o){var a=e;return t.partials||(t.partials={},a=function(o,a){var i=r.partials;r.partials=n.extend({},i,t.partials);var u=e(o,a);return r.partials=i,u}),t.partials[o.args[0]]=o.fn,a})},e.exports=t.default},function(e,t,r){"use strict";t.__esModule=!0;var n=r(4),o={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(e){if("string"==typeof e){var t=n.indexOf(o.methodMap,e.toLowerCase());e=t>=0?t:parseInt(e,10)}return e},log:function(e){if(e=o.lookupLevel(e),"undefined"!=typeof console&&o.lookupLevel(o.level)<=e){var t=o.methodMap[e];console[t]||(t="log");for(var r=arguments.length,n=Array(r>1?r-1:0),a=1;a<r;a++)n[a-1]=arguments[a];console[t].apply(console,n)}}};t.default=o,e.exports=t.default},function(e,t,r){"use strict";var n=r(33).default,o=r(12).default,a=r(1).default;t.__esModule=!0,t.createProtoAccessControl=function(e){var t=n(null);t.constructor=!1,t.__defineGetter__=!1,t.__defineSetter__=!1,t.__lookupGetter__=!1;var r=n(null);return r.__proto__=!1,{properties:{whitelist:i.createNewLookupObject(r,e.allowedProtoProperties),defaultValue:e.allowProtoPropertiesByDefault},methods:{whitelist:i.createNewLookupObject(t,e.allowedProtoMethods),defaultValue:e.allowProtoMethodsByDefault}}},t.resultIsAllowed=function(e,t,r){return s("function"==typeof e?t.methods:t.properties,r)},t.resetLoggedProperties=function(){o(l).forEach(function(e){delete l[e]})};var i=r(35),u=a(r(31)),l=n(null);function s(e,t){return void 0!==e.whitelist[t]?!0===e.whitelist[t]:void 0!==e.defaultValue?e.defaultValue:(function(e){!0!==l[e]&&(l[e]=!0,u.log("error",'Handlebars: Access has been denied to resolve the property "'+e+'" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details'))}(t),!1)}},function(e,t,r){e.exports={default:r(34),__esModule:!0}},function(e,t,r){var n=r(8);e.exports=function(e,t){return n.create(e,t)}},function(e,t,r){"use strict";var n=r(33).default;t.__esModule=!0,t.createNewLookupObject=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return o.extend.apply(void 0,[n(null)].concat(t))};var o=r(4)},function(e,t){"use strict";function r(e){this.string=e}t.__esModule=!0,r.prototype.toString=r.prototype.toHTML=function(){return""+this.string},t.default=r,e.exports=t.default},function(e,t,r){"use strict";var n=r(38).default,o=r(12).default,a=r(1).default,i=r(2).default;t.__esModule=!0,t.checkRevision=function(e){var t=e&&e[0]||1,r=s.COMPILER_REVISION;if(t>=s.LAST_COMPATIBLE_COMPILER_REVISION&&t<=s.COMPILER_REVISION)return;if(t<s.LAST_COMPATIBLE_COMPILER_REVISION){var n=s.REVISION_CHANGES[r],o=s.REVISION_CHANGES[t];throw new l.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n+") or downgrade your runtime to an older version ("+o+").")}throw new l.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")},t.template=function(e,t){if(!t)throw new l.default("No environment passed to template");if(!e||!e.main)throw new l.default("Unknown template object: "+typeof e);e.main.decorator=e.main_d,t.VM.checkRevision(e.compiler);var r=e.compiler&&7===e.compiler[0];var a={strict:function(e,t,r){if(!(e&&t in e))throw new l.default('"'+t+'" not defined in '+e,{loc:r});return a.lookupProperty(e,t)},lookupProperty:function(e,t){var r=e[t];return null==r?r:Object.prototype.hasOwnProperty.call(e,t)?r:p.resultIsAllowed(r,a.protoAccessControl,t)?r:void 0},lookup:function(e,t){for(var r=e.length,n=0;n<r;n++){var o=e[n]&&a.lookupProperty(e[n],t);if(null!=o)return e[n][t]}},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:u.escapeExpression,invokePartial:function(r,n,o){o.hash&&(n=u.extend({},n,o.hash),o.ids&&(o.ids[0]=!0));r=t.VM.resolvePartial.call(this,r,n,o);var a=u.extend({},o,{hooks:this.hooks,protoAccessControl:this.protoAccessControl}),i=t.VM.invokePartial.call(this,r,n,a);null==i&&t.compile&&(o.partials[o.name]=t.compile(r,e.compilerOptions,t),i=o.partials[o.name](n,a));if(null!=i){if(o.indent){for(var s=i.split("\n"),c=0,f=s.length;c<f&&(s[c]||c+1!==f);c++)s[c]=o.indent+s[c];i=s.join("\n")}return i}throw new l.default("The partial "+o.name+" could not be compiled when running in runtime-only mode")},fn:function(t){var r=e[t];return r.decorator=e[t+"_d"],r},programs:[],program:function(e,t,r,n,o){var a=this.programs[e],i=this.fn(e);return t||o||n||r?a=d(this,e,i,t,r,n,o):a||(a=this.programs[e]=d(this,e,i)),a},data:function(e,t){for(;e&&t--;)e=e._parent;return e},mergeIfNeeded:function(e,t){var r=e||t;return e&&t&&e!==t&&(r=u.extend({},t,e)),r},nullContext:n({}),noop:t.VM.noop,compilerInfo:e.compiler};function i(t){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=r.data;i._setup(r),!r.partial&&e.useData&&(n=function(e,t){t&&"root"in t||((t=t?s.createFrame(t):{}).root=e);return t}(t,n));var o=void 0,u=e.useBlockParams?[]:void 0;function l(t){return""+e.main(a,t,a.helpers,a.partials,n,u,o)}return e.useDepths&&(o=r.depths?t!=r.depths[0]?[t].concat(r.depths):r.depths:[t]),(l=v(e.main,l,a,r.depths||[],n,u))(t,r)}return i.isTop=!0,i._setup=function(n){if(n.partial)a.protoAccessControl=n.protoAccessControl,a.helpers=n.helpers,a.partials=n.partials,a.decorators=n.decorators,a.hooks=n.hooks;else{var i=u.extend({},t.helpers,n.helpers);!function(e,t){o(e).forEach(function(r){var n=e[r];e[r]=function(e,t){var r=t.lookupProperty;return f.wrapHelper(e,function(e){return u.extend({lookupProperty:r},e)})}(n,t)})}(i,a),a.helpers=i,e.usePartial&&(a.partials=a.mergeIfNeeded(n.partials,t.partials)),(e.usePartial||e.useDecorators)&&(a.decorators=u.extend({},t.decorators,n.decorators)),a.hooks={},a.protoAccessControl=p.createProtoAccessControl(n);var l=n.allowCallsToHelperMissing||r;c.moveHelperToHooks(a,"helperMissing",l),c.moveHelperToHooks(a,"blockHelperMissing",l)}},i._child=function(t,r,n,o){if(e.useBlockParams&&!n)throw new l.default("must pass block params");if(e.useDepths&&!o)throw new l.default("must pass parent depths");return d(a,t,e[t],r,0,n,o)},i},t.wrapProgram=d,t.resolvePartial=function(e,t,r){e?e.call||r.name||(r.name=e,e=r.partials[e]):e="@partial-block"===r.name?r.data["partial-block"]:r.partials[r.name];return e},t.invokePartial=function(e,t,r){var n=r.data&&r.data["partial-block"];r.partial=!0,r.ids&&(r.data.contextPath=r.ids[0]||r.data.contextPath);var o=void 0;r.fn&&r.fn!==h&&function(){r.data=s.createFrame(r.data);var e=r.fn;o=r.data["partial-block"]=function(t){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return r.data=s.createFrame(r.data),r.data["partial-block"]=n,e(t,r)},e.partials&&(r.partials=u.extend({},r.partials,e.partials))}();void 0===e&&o&&(e=o);if(void 0===e)throw new l.default("The partial "+r.name+" could not be found");if(e instanceof Function)return e(t,r)},t.noop=h;var u=a(r(4)),l=i(r(5)),s=r(3),c=r(9),f=r(42),p=r(32);function d(e,t,r,n,o,a,i){function u(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],u=i;return!i||t==i[0]||t===e.nullContext&&null===i[0]||(u=[t].concat(i)),r(e,t,e.helpers,e.partials,o.data||n,a&&[o.blockParams].concat(a),u)}return(u=v(r,u,e,i,n,a)).program=t,u.depth=i?i.length:0,u.blockParams=o||0,u}function h(){return""}function v(e,t,r,n,o,a){if(e.decorator){var i={};t=e.decorator(t,i,r,n&&n[0],o,a,n),u.extend(t,i)}return t}},function(e,t,r){e.exports={default:r(39),__esModule:!0}},function(e,t,r){r(40),e.exports=r(20).Object.seal},function(e,t,r){var n=r(41);r(17)("seal",function(e){return function(t){return e&&n(t)?e(t):t}})},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t){"use strict";t.__esModule=!0,t.wrapHelper=function(e,t){if("function"!=typeof e)return e;return function(){var r=arguments[arguments.length-1];return arguments[arguments.length-1]=t(r),e.apply(this,arguments)}}},function(e,t){(function(r){"use strict";t.__esModule=!0,t.default=function(e){var t=void 0!==r?r:window,n=t.Handlebars;e.noConflict=function(){return t.Handlebars===e&&(t.Handlebars=n),e}},e.exports=t.default}).call(t,function(){return this}())}])});
},{}],"ViIS":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var l=e(require("handlebars/dist/handlebars.runtime"));function e(l){return l&&l.__esModule?l:{default:l}}const n=l.default.template({1:function(l,e,n,t,a){var r,o,i=null!=e?e:l.nullContext||{},s=l.hooks.helperMissing,u=l.escapeExpression,c=l.lookupProperty||function(l,e){if(Object.prototype.hasOwnProperty.call(l,e))return l[e]};return"\r\n  <li class='gallery-item item'>\r\n    <div class='gallery-card-img'>\r\n"+(null!=(r=c(n,"if").call(i,null!=e?c(e,"poster_path"):e,{name:"if",hash:{},fn:l.program(2,a,0),inverse:l.program(4,a,0),data:a,loc:{start:{line:5,column:6},end:{line:17,column:13}}}))?r:"")+"\r\n    </div>\r\n    <div class='gallery-card-text'>\r\n      <h2 class='gallery-name'> "+u("function"==typeof(o=null!=(o=c(n,"title")||(null!=e?c(e,"title"):e))?o:s)?o.call(i,{name:"title",hash:{},data:a,loc:{start:{line:21,column:32},end:{line:21,column:41}}}):o)+"</h2>\r\n      <p class='gallery-text'> "+u("function"==typeof(o=null!=(o=c(n,"release_date")||(null!=e?c(e,"release_date"):e))?o:s)?o.call(i,{name:"release_date",hash:{},data:a,loc:{start:{line:22,column:31},end:{line:22,column:47}}}):o)+"</p>\r\n    </div>\r\n  </li>\r\n\r\n"},2:function(l,e,n,t,a){var r,o=null!=e?e:l.nullContext||{},i=l.hooks.helperMissing,s=l.escapeExpression,u=l.lookupProperty||function(l,e){if(Object.prototype.hasOwnProperty.call(l,e))return l[e]};return"        <img\r\n          src='https://image.tmdb.org/t/p/w500"+s("function"==typeof(r=null!=(r=u(n,"poster_path")||(null!=e?u(e,"poster_path"):e))?r:i)?r.call(o,{name:"poster_path",hash:{},data:a,loc:{start:{line:7,column:46},end:{line:7,column:61}}}):r)+"'\r\n          alt='"+s("function"==typeof(r=null!=(r=u(n,"title")||(null!=e?u(e,"title"):e))?r:i)?r.call(o,{name:"title",hash:{},data:a,loc:{start:{line:8,column:15},end:{line:8,column:24}}}):r)+"'\r\n          data-movie-id="+s("function"==typeof(r=null!=(r=u(n,"id")||(null!=e?u(e,"id"):e))?r:i)?r.call(o,{name:"id",hash:{},data:a,loc:{start:{line:9,column:24},end:{line:9,column:30}}}):r)+"\r\n          class='gallery-img'\r\n        />\r\n"},4:function(l,e,n,t,a){return"        <img\r\n          src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'\r\n          class='gallery-img'\r\n        />\r\n"},compiler:[8,">= 4.3.0"],main:function(l,e,n,t,a){var r;return null!=(r=(l.lookupProperty||function(l,e){if(Object.prototype.hasOwnProperty.call(l,e))return l[e]})(n,"each").call(null!=e?e:l.nullContext||{},e,{name:"each",hash:{},fn:l.program(1,a,0),inverse:l.noop,data:a,loc:{start:{line:1,column:0},end:{line:26,column:9}}}))?r:""},useData:!0});var t=n;exports.default=t;
},{"handlebars/dist/handlebars.runtime":"pAws"}],"kRmY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("handlebars/dist/handlebars.runtime"));function r(e){return e&&e.__esModule?e:{default:e}}const a=e.default.template({compiler:[8,">= 4.3.0"],main:function(e,r,a,n,t){return"<div class='header-input-wrapper'>\r\n  <label class='header-input-label' for=''>\r\n    <input\r\n      id='header-input'\r\n      class='header-input'\r\n      type='text'\r\n      placeholder='Поиск фильмов'\r\n    />\r\n    <svg class='header-input-icon'>\r\n      <use href='./images/sprait/symbol-defs.svg#icon-search-2'></use>\r\n    </svg>\r\n  </label>\r\n</div>"},useData:!0});var n=a;exports.default=n;
},{"handlebars/dist/handlebars.runtime":"pAws"}],"ayIC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=e(require("handlebars/dist/handlebars.runtime"));function e(t){return t&&t.__esModule?t:{default:t}}const r=t.default.template({compiler:[8,">= 4.3.0"],main:function(t,e,r,n,u){return"<div class='header-button-wrapper'>\r\n  <ul class='header-button-list list'>\r\n    <li class='header-button-item item'>\r\n      <button\r\n        class='button button-header button-header-watched-js'\r\n      >Watched</button>\r\n    </li>\r\n    <li class='header-button-item item'>\r\n      <button class='button button-header button-header-queue-js'>queue</button>\r\n    </li>\r\n  </ul>\r\n</div>"},useData:!0});var n=r;exports.default=n;
},{"handlebars/dist/handlebars.runtime":"pAws"}],"yGjV":[function(require,module,exports) {
"use strict";function e(e,t){localStorage.setItem(e,JSON.stringify(t))}function t(e){const t=localStorage.getItem(e);return t?JSON.parse(t):null}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getLocalStorage=t,exports.setLocalStorage=e;
},{}],"cGsR":[function(require,module,exports) {
"use strict";var e=i(require("lodash.debounce")),t=i(require("./news-service")),r=i(require("../templates/appenFilmMarkup.hbs")),n=i(require("../templates/header-home.hbs")),a=i(require("../templates/header-library.hbs")),u=require("./local-storage");function i(e){return e&&e.__esModule?e:{default:e}}const d=new t.default,c={header:document.querySelector(".header"),libraryLink:document.querySelector(".link-library-js"),homeLink:document.querySelector(".link-home-js"),headerContent:document.querySelector(".header-content"),input:document.querySelector("#header-input"),galery:document.querySelector(".gallery-list"),buttonHeaderWatched:document.querySelector(".button-header-watched-js"),buttonHeaderQueue:document.querySelector(".button-header-queue-js")};function l(){c.headerContent.insertAdjacentHTML("beforeend",(0,n.default)()),c.input=document.querySelector("#header-input"),c.input.addEventListener("input",(0,e.default)(s,1e3)),d.setSearchQuery(""),o()}function o(){d.fetchArticles().then(e=>{h(e)})}function s(e){if(""===e.target.value.trim())return c.galery.innerHTML="",d.setSearchQuery(""),d.resetPage(),void o();d.searchQuery!==e.target.value&&d.resetPage(),d.setSearchQuery(e.target.value),d.filmRequest().then(e=>{if(0===e.length)return alert("проверте правильность ввода");c.galery.innerHTML="",h(e)})}function h(e){c.galery.insertAdjacentHTML("beforeend",(0,r.default)(e))}function L(t){t.preventDefault(),c.input.removeEventListener("input",(0,e.default)(s,1e3)),c.headerContent.innerHTML="",c.headerContent.insertAdjacentHTML("beforeend",(0,a.default)()),c.libraryLink.classList.add("active"),c.homeLink.classList.remove("active"),c.header.classList.add("library"),m()}function m(){c.buttonHeaderQueue=document.querySelector(".button-header-queue-js"),c.buttonHeaderWatched=document.querySelector(".button-header-watched-js"),c.buttonHeaderQueue.classList.add("active"),c.buttonHeaderQueue.addEventListener("click",b),c.buttonHeaderWatched.addEventListener("click",y),c.galery.innerHTML="",b()}function y(){c.buttonHeaderWatched.classList.add("active"),c.buttonHeaderQueue.classList.remove("active");const e=(0,u.getLocalStorage)("watched");if(e&&e.length){const t=e.map(e=>d.getFilmById(e));Promise.all(t).then(e=>{c.galery.innerHTML="",c.galery.insertAdjacentHTML("beforeend",(0,r.default)(e))})}else alert("нет просмотренных фильмов")}function b(){c.buttonHeaderWatched.classList.remove("active"),c.buttonHeaderQueue.classList.add("active");const e=(0,u.getLocalStorage)("queue");if(e&&e.length){const t=e.map(e=>d.getFilmById(e));Promise.all(t).then(e=>{c.galery.innerHTML="",c.galery.insertAdjacentHTML("beforeend",(0,r.default)(e))})}else alert("нет фильмов к просмотру")}function f(e){e.preventDefault(),c.headerContent.innerHTML="",l(),c.header.classList.remove("library"),c.libraryLink.classList.remove("active"),c.homeLink.classList.add("active")}c.libraryLink.addEventListener("click",L),c.homeLink.addEventListener("click",f),l();
},{"lodash.debounce":"PZFh","./news-service":"IuX0","../templates/appenFilmMarkup.hbs":"ViIS","../templates/header-home.hbs":"kRmY","../templates/header-library.hbs":"ayIC","./local-storage":"yGjV"}],"a5Hl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var n=t(require("handlebars/dist/handlebars.runtime"));function t(n){return n&&n.__esModule?n:{default:n}}const l=n.default.template({1:function(n,t,l,e,a){var r,o=null!=t?t:n.nullContext||{},s=n.hooks.helperMissing,i=n.escapeExpression,c=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return"      <img\r\n        class='modal-img'\r\n        style='max-width: 100%;'\r\n        src='https://image.tmdb.org/t/p/w500/"+i("function"==typeof(r=null!=(r=c(l,"poster_path")||(null!=t?c(t,"poster_path"):t))?r:s)?r.call(o,{name:"poster_path",hash:{},data:a,loc:{start:{line:7,column:45},end:{line:7,column:60}}}):r)+"'\r\n        alt='"+i("function"==typeof(r=null!=(r=c(l,"title")||(null!=t?c(t,"title"):t))?r:s)?r.call(o,{name:"title",hash:{},data:a,loc:{start:{line:8,column:13},end:{line:8,column:22}}}):r)+"'\r\n      />\r\n"},3:function(n,t,l,e,a){return"      <img\r\n        src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'\r\n        class='modal-img'\r\n      />\r\n"},compiler:[8,">= 4.3.0"],main:function(n,t,l,e,a){var r,o,s=null!=t?t:n.nullContext||{},i=n.hooks.helperMissing,c="function",u=n.escapeExpression,p=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return"<div class='card'>\r\n  <div class='card-img'>\r\n"+(null!=(r=p(l,"if").call(s,null!=t?p(t,"poster_path"):t,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.program(3,a,0),data:a,loc:{start:{line:3,column:4},end:{line:15,column:11}}}))?r:"")+"  </div>\r\n  <div class='card-content'>\r\n    <h1 class='card-name'> "+u(typeof(o=null!=(o=p(l,"title")||(null!=t?p(t,"title"):t))?o:i)===c?o.call(s,{name:"title",hash:{},data:a,loc:{start:{line:18,column:27},end:{line:18,column:36}}}):o)+"</h1>\r\n    <p class='card-text'>\r\n      <span class='card-text-grey'>Vote / Votes</span>"+u(typeof(o=null!=(o=p(l,"vote_average")||(null!=t?p(t,"vote_average"):t))?o:i)===c?o.call(s,{name:"vote_average",hash:{},data:a,loc:{start:{line:20,column:54},end:{line:20,column:70}}}):o)+"</p>\r\n    <p class='card-text'><span class='card-text-grey'>Popularity</span>\r\n      "+u(typeof(o=null!=(o=p(l,"popularity")||(null!=t?p(t,"popularity"):t))?o:i)===c?o.call(s,{name:"popularity",hash:{},data:a,loc:{start:{line:22,column:6},end:{line:22,column:20}}}):o)+"</p>\r\n    <p class='card-text'><span class='card-text-grey'>Original Title\r\n      </span>"+u(typeof(o=null!=(o=p(l,"original_title")||(null!=t?p(t,"original_title"):t))?o:i)===c?o.call(s,{name:"original_title",hash:{},data:a,loc:{start:{line:24,column:13},end:{line:24,column:31}}}):o)+"</p>\r\n    <p class='card-text'><span class='card-text-grey'>\r\n        Genre\r\n      </span>"+u(typeof(o=null!=(o=p(l,"genre_ids")||(null!=t?p(t,"genre_ids"):t))?o:i)===c?o.call(s,{name:"genre_ids",hash:{},data:a,loc:{start:{line:27,column:13},end:{line:27,column:26}}}):o)+"</p>\r\n    <p class='card-about'>About</p>\r\n    <p class='card-about-description'> "+u(typeof(o=null!=(o=p(l,"overview")||(null!=t?p(t,"overview"):t))?o:i)===c?o.call(s,{name:"overview",hash:{},data:a,loc:{start:{line:29,column:39},end:{line:29,column:51}}}):o)+"</p>\r\n    <div class='wrapper-button-modal'>\r\n      <button class='button button-modal button-watched-js'>add to Watched</button>\r\n      <button class='button button-modal button-queue-js'>add to queue</button>\r\n    </div>\r\n\r\n  </div>\r\n</div>"},useData:!0});var e=l;exports.default=e;
},{"handlebars/dist/handlebars.runtime":"pAws"}],"DnHo":[function(require,module,exports) {
"use strict";var e=c(require("./news-service")),t=c(require("../templates/modal.hbs")),o=require("./local-storage");function c(e){return e&&e.__esModule?e:{default:e}}const n=new e.default;let u="";const a={galleryList:document.querySelector(".gallery-list"),backdrop:document.querySelector(".backdrop"),buttonModalClose:document.querySelector(".modal-close"),modalContent:document.querySelector(".modal-content"),buttonWatched:document.querySelector(".button-watched-js"),buttonQueue:document.querySelector(".button-queue-js")};function l(e){"IMG"!==!e.target.nodeName&&(d(e),a.backdrop.classList.add("is-open"),a.buttonModalClose.addEventListener("click",s))}function s(e){a.backdrop.classList.remove("is-open"),a.buttonModalClose.removeEventListener("click",s),a.modalContent.innerHTML=""}function d(e){u=e.target.getAttribute("data-movie-id"),n.getFilmById(u).then(e=>{console.log(u,e),a.modalContent.insertAdjacentHTML("beforeend",(0,t.default)(e)),r()}).catch(e=>{console.log(e)})}function r(){a.buttonWatched=document.querySelector(".button-watched-js"),a.buttonQueue=document.querySelector(".button-queue-js"),a.buttonWatched.addEventListener("click",b),a.buttonQueue.addEventListener("click",g),i()}function i(){const e=(0,o.getLocalStorage)("watched");e&&e.includes(u)&&a.buttonWatched.classList.add("active");const t=(0,o.getLocalStorage)("queue");t&&t.includes(u)&&a.buttonQueue.classList.add("active")}function b(e){e.preventDefault();const t=(0,o.getLocalStorage)("watched");if(t){if(t.includes(u))return void m("watched",t,a.buttonWatched);t.push(u),(0,o.setLocalStorage)("watched",t),a.buttonWatched.classList.add("active")}else h("watched");L()}function g(e){e.preventDefault();const t=(0,o.getLocalStorage)("queue");if(t){if(t.includes(u))return void m("queue",t,a.buttonQueue);t.push(u),(0,o.setLocalStorage)("queue",t),a.buttonQueue.classList.add("active")}else h("queue");f()}function L(){const e=(0,o.getLocalStorage)("queue");e&&e.includes(u)&&m("queue",e,a.buttonQueue)}function f(){const e=(0,o.getLocalStorage)("watched");e&&e.includes(u)&&m("watched",e,a.buttonWatched)}function h(e){const t=[];t.push(u),(0,o.setLocalStorage)(e,t)}function m(e,t,c){const n=t.filter(e=>e!==u);(0,o.setLocalStorage)(e,n),c.classList.remove("active"),c.blur()}a.galleryList.addEventListener("click",e=>{l(e)});
},{"./news-service":"IuX0","../templates/modal.hbs":"a5Hl","./local-storage":"yGjV"}],"ipg4":[function(require,module,exports) {
"use strict";var e=t(require("./news-service")),n=t(require("../templates/appenFilmMarkup.hbs"));function t(e){return e&&e.__esModule?e:{default:e}}const r={sentinel:document.querySelector("#sentinel"),galery:document.querySelector(".gallery-list")},s=new e.default,l=e=>{e.forEach(e=>{e.isIntersecting&&(console.log("пора грузить еще фильмы"),s.fetchArticles().then(e=>{o(e),s.incrementPage()}))})},i={rootMargin:"500px"},c=new IntersectionObserver(l,i);function o(e){r.galery.insertAdjacentHTML("beforeend",(0,n.default)(e))}c.observe(r.sentinel);
},{"./news-service":"IuX0","../templates/appenFilmMarkup.hbs":"ViIS"}],"Focm":[function(require,module,exports) {
"use strict";require("./js/header"),require("./js/modal-card"),require("./js/io");
},{"./js/header":"cGsR","./js/modal-card":"DnHo","./js/io":"ipg4"}]},{},["Focm"], null)
//# sourceMappingURL=/Filmoteka/src.18c25773.js.map