// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/lodash.debounce/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"js/news-service.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const API_KEY = 'b32f977d148061c9ab22a471ff2c7792';
const BASE_URL = 'https://api.themoviedb.org/3/';
class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  // запрос за популярными фильмами при загрузке сайта ////
  fetchArticles() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=b32f977d148061c9ab22a471ff2c7792&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(data => {
      this.incrementPage();
      return data.results;
    });
  }

  // запрос за фильмами в поиске ////
  filmRequest() {
    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`;
    return fetch(url).then(response => response.json()).then(data => {
      this.incrementPage();
      return data.results;
    });
  }

  // запрос за фильмо по Id ////
  getFilmById(id) {
    const url = `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
    return fetch(url).then(response => response.json());
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  setSearchQuery(data) {
    this.searchQuery = data;
  }
}
exports.default = NewApiService;
},{}],"../node_modules/handlebars/dist/handlebars.runtime.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/**!

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["Handlebars"] = factory();else root["Handlebars"] = factory();
})(this, function () {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/
      var installedModules = {};

      /******/ // The require function
      /******/
      function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) /******/return installedModules[moduleId].exports;

        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
          /******/exports: {},
          /******/id: moduleId,
          /******/loaded: false
          /******/
        };

        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        /******/ // Flag the module as loaded
        /******/
        module.loaded = true;

        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
      }

      /******/ // expose the modules object (__webpack_modules__)
      /******/
      __webpack_require__.m = modules;

      /******/ // expose the module cache
      /******/
      __webpack_require__.c = installedModules;

      /******/ // __webpack_public_path__
      /******/
      __webpack_require__.p = "";

      /******/ // Load entry module and return exports
      /******/
      return __webpack_require__(0);
      /******/
    }
    /************************************************************************/
    /******/([/* 0 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireWildcard = __webpack_require__(1)['default'];
      var _interopRequireDefault = __webpack_require__(2)['default'];
      exports.__esModule = true;
      var _handlebarsBase = __webpack_require__(3);
      var base = _interopRequireWildcard(_handlebarsBase);

      // Each of these augment the Handlebars object. No need to setup here.
      // (This is done to easily share code between commonjs and browse envs)

      var _handlebarsSafeString = __webpack_require__(36);
      var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
      var _handlebarsException = __webpack_require__(5);
      var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
      var _handlebarsUtils = __webpack_require__(4);
      var Utils = _interopRequireWildcard(_handlebarsUtils);
      var _handlebarsRuntime = __webpack_require__(37);
      var runtime = _interopRequireWildcard(_handlebarsRuntime);
      var _handlebarsNoConflict = __webpack_require__(43);
      var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

      // For compatibility and usage outside of module systems, make the Handlebars object a namespace
      function create() {
        var hb = new base.HandlebarsEnvironment();
        Utils.extend(hb, base);
        hb.SafeString = _handlebarsSafeString2['default'];
        hb.Exception = _handlebarsException2['default'];
        hb.Utils = Utils;
        hb.escapeExpression = Utils.escapeExpression;
        hb.VM = runtime;
        hb.template = function (spec) {
          return runtime.template(spec, hb);
        };
        return hb;
      }
      var inst = create();
      inst.create = create;
      _handlebarsNoConflict2['default'](inst);
      inst['default'] = inst;
      exports['default'] = inst;
      module.exports = exports['default'];

      /***/
    }, /* 1 */
    /***/function (module, exports) {
      "use strict";

      exports["default"] = function (obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }
          newObj["default"] = obj;
          return newObj;
        }
      };
      exports.__esModule = true;

      /***/
    }, /* 2 */
    /***/function (module, exports) {
      "use strict";

      exports["default"] = function (obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      };
      exports.__esModule = true;

      /***/
    }, /* 3 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];
      exports.__esModule = true;
      exports.HandlebarsEnvironment = HandlebarsEnvironment;
      var _utils = __webpack_require__(4);
      var _exception = __webpack_require__(5);
      var _exception2 = _interopRequireDefault(_exception);
      var _helpers = __webpack_require__(9);
      var _decorators = __webpack_require__(29);
      var _logger = __webpack_require__(31);
      var _logger2 = _interopRequireDefault(_logger);
      var _internalProtoAccess = __webpack_require__(32);
      var VERSION = '4.7.7';
      exports.VERSION = VERSION;
      var COMPILER_REVISION = 8;
      exports.COMPILER_REVISION = COMPILER_REVISION;
      var LAST_COMPATIBLE_COMPILER_REVISION = 7;
      exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
      var REVISION_CHANGES = {
        1: '<= 1.0.rc.2',
        // 1.0.rc.2 is actually rev2 but doesn't report it
        2: '== 1.0.0-rc.3',
        3: '== 1.0.0-rc.4',
        4: '== 1.x.x',
        5: '== 2.0.0-alpha.x',
        6: '>= 2.0.0-beta.1',
        7: '>= 4.0.0 <4.3.0',
        8: '>= 4.3.0'
      };
      exports.REVISION_CHANGES = REVISION_CHANGES;
      var objectType = '[object Object]';
      function HandlebarsEnvironment(helpers, partials, decorators) {
        this.helpers = helpers || {};
        this.partials = partials || {};
        this.decorators = decorators || {};
        _helpers.registerDefaultHelpers(this);
        _decorators.registerDefaultDecorators(this);
      }
      HandlebarsEnvironment.prototype = {
        constructor: HandlebarsEnvironment,
        logger: _logger2['default'],
        log: _logger2['default'].log,
        registerHelper: function registerHelper(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2['default']('Arg not supported with multiple helpers');
            }
            _utils.extend(this.helpers, name);
          } else {
            this.helpers[name] = fn;
          }
        },
        unregisterHelper: function unregisterHelper(name) {
          delete this.helpers[name];
        },
        registerPartial: function registerPartial(name, partial) {
          if (_utils.toString.call(name) === objectType) {
            _utils.extend(this.partials, name);
          } else {
            if (typeof partial === 'undefined') {
              throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
            }
            this.partials[name] = partial;
          }
        },
        unregisterPartial: function unregisterPartial(name) {
          delete this.partials[name];
        },
        registerDecorator: function registerDecorator(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2['default']('Arg not supported with multiple decorators');
            }
            _utils.extend(this.decorators, name);
          } else {
            this.decorators[name] = fn;
          }
        },
        unregisterDecorator: function unregisterDecorator(name) {
          delete this.decorators[name];
        },
        /**
         * Reset the memory of illegal property accesses that have already been logged.
         * @deprecated should only be used in handlebars test-cases
         */
        resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
          _internalProtoAccess.resetLoggedProperties();
        }
      };
      var log = _logger2['default'].log;
      exports.log = log;
      exports.createFrame = _utils.createFrame;
      exports.logger = _logger2['default'];

      /***/
    }, /* 4 */
    /***/function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports.extend = extend;
      exports.indexOf = indexOf;
      exports.escapeExpression = escapeExpression;
      exports.isEmpty = isEmpty;
      exports.createFrame = createFrame;
      exports.blockParams = blockParams;
      exports.appendContextPath = appendContextPath;
      var escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      var badChars = /[&<>"'`=]/g,
        possible = /[&<>"'`=]/;
      function escapeChar(chr) {
        return escape[chr];
      }
      function extend(obj /* , ...source */) {
        for (var i = 1; i < arguments.length; i++) {
          for (var key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
              obj[key] = arguments[i][key];
            }
          }
        }
        return obj;
      }
      var toString = Object.prototype.toString;
      exports.toString = toString;
      // Sourced from lodash
      // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
      /* eslint-disable func-style */
      var isFunction = function isFunction(value) {
        return typeof value === 'function';
      };
      // fallback for older versions of Chrome and Safari
      /* istanbul ignore next */
      if (isFunction(/x/)) {
        exports.isFunction = isFunction = function (value) {
          return typeof value === 'function' && toString.call(value) === '[object Function]';
        };
      }
      exports.isFunction = isFunction;

      /* eslint-enable func-style */

      /* istanbul ignore next */
      var isArray = Array.isArray || function (value) {
        return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
      };
      exports.isArray = isArray;
      // Older IE versions do not directly support indexOf so we must implement our own, sadly.

      function indexOf(array, value) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (array[i] === value) {
            return i;
          }
        }
        return -1;
      }
      function escapeExpression(string) {
        if (typeof string !== 'string') {
          // don't escape SafeStrings, since they're already safe
          if (string && string.toHTML) {
            return string.toHTML();
          } else if (string == null) {
            return '';
          } else if (!string) {
            return string + '';
          }

          // Force a string conversion as this will be done by the append regardless and
          // the regex test will do this transparently behind the scenes, causing issues if
          // an object's to string has escaped characters in it.
          string = '' + string;
        }
        if (!possible.test(string)) {
          return string;
        }
        return string.replace(badChars, escapeChar);
      }
      function isEmpty(value) {
        if (!value && value !== 0) {
          return true;
        } else if (isArray(value) && value.length === 0) {
          return true;
        } else {
          return false;
        }
      }
      function createFrame(object) {
        var frame = extend({}, object);
        frame._parent = object;
        return frame;
      }
      function blockParams(params, ids) {
        params.path = ids;
        return params;
      }
      function appendContextPath(contextPath, id) {
        return (contextPath ? contextPath + '.' : '') + id;
      }

      /***/
    }, /* 5 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$defineProperty = __webpack_require__(6)['default'];
      exports.__esModule = true;
      var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];
      function Exception(message, node) {
        var loc = node && node.loc,
          line = undefined,
          endLineNumber = undefined,
          column = undefined,
          endColumn = undefined;
        if (loc) {
          line = loc.start.line;
          endLineNumber = loc.end.line;
          column = loc.start.column;
          endColumn = loc.end.column;
          message += ' - ' + line + ':' + column;
        }
        var tmp = Error.prototype.constructor.call(this, message);

        // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
        for (var idx = 0; idx < errorProps.length; idx++) {
          this[errorProps[idx]] = tmp[errorProps[idx]];
        }

        /* istanbul ignore else */
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, Exception);
        }
        try {
          if (loc) {
            this.lineNumber = line;
            this.endLineNumber = endLineNumber;

            // Work around issue under safari where we can't directly set the column value
            /* istanbul ignore next */
            if (_Object$defineProperty) {
              Object.defineProperty(this, 'column', {
                value: column,
                enumerable: true
              });
              Object.defineProperty(this, 'endColumn', {
                value: endColumn,
                enumerable: true
              });
            } else {
              this.column = column;
              this.endColumn = endColumn;
            }
          }
        } catch (nop) {
          /* Ignore if the browser is very particular */
        }
      }
      Exception.prototype = new Error();
      exports['default'] = Exception;
      module.exports = exports['default'];

      /***/
    }, /* 6 */
    /***/function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(7),
        __esModule: true
      };

      /***/
    }, /* 7 */
    /***/function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(8);
      module.exports = function defineProperty(it, key, desc) {
        return $.setDesc(it, key, desc);
      };

      /***/
    }, /* 8 */
    /***/function (module, exports) {
      var $Object = Object;
      module.exports = {
        create: $Object.create,
        getProto: $Object.getPrototypeOf,
        isEnum: {}.propertyIsEnumerable,
        getDesc: $Object.getOwnPropertyDescriptor,
        setDesc: $Object.defineProperty,
        setDescs: $Object.defineProperties,
        getKeys: $Object.keys,
        getNames: $Object.getOwnPropertyNames,
        getSymbols: $Object.getOwnPropertySymbols,
        each: [].forEach
      };

      /***/
    }, /* 9 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];
      exports.__esModule = true;
      exports.registerDefaultHelpers = registerDefaultHelpers;
      exports.moveHelperToHooks = moveHelperToHooks;
      var _helpersBlockHelperMissing = __webpack_require__(10);
      var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
      var _helpersEach = __webpack_require__(11);
      var _helpersEach2 = _interopRequireDefault(_helpersEach);
      var _helpersHelperMissing = __webpack_require__(24);
      var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
      var _helpersIf = __webpack_require__(25);
      var _helpersIf2 = _interopRequireDefault(_helpersIf);
      var _helpersLog = __webpack_require__(26);
      var _helpersLog2 = _interopRequireDefault(_helpersLog);
      var _helpersLookup = __webpack_require__(27);
      var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
      var _helpersWith = __webpack_require__(28);
      var _helpersWith2 = _interopRequireDefault(_helpersWith);
      function registerDefaultHelpers(instance) {
        _helpersBlockHelperMissing2['default'](instance);
        _helpersEach2['default'](instance);
        _helpersHelperMissing2['default'](instance);
        _helpersIf2['default'](instance);
        _helpersLog2['default'](instance);
        _helpersLookup2['default'](instance);
        _helpersWith2['default'](instance);
      }
      function moveHelperToHooks(instance, helperName, keepHelper) {
        if (instance.helpers[helperName]) {
          instance.hooks[helperName] = instance.helpers[helperName];
          if (!keepHelper) {
            delete instance.helpers[helperName];
          }
        }
      }

      /***/
    }, /* 10 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;
      var _utils = __webpack_require__(4);
      exports['default'] = function (instance) {
        instance.registerHelper('blockHelperMissing', function (context, options) {
          var inverse = options.inverse,
            fn = options.fn;
          if (context === true) {
            return fn(this);
          } else if (context === false || context == null) {
            return inverse(this);
          } else if (_utils.isArray(context)) {
            if (context.length > 0) {
              if (options.ids) {
                options.ids = [options.name];
              }
              return instance.helpers.each(context, options);
            } else {
              return inverse(this);
            }
          } else {
            if (options.data && options.ids) {
              var data = _utils.createFrame(options.data);
              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
              options = {
                data: data
              };
            }
            return fn(context, options);
          }
        });
      };
      module.exports = exports['default'];

      /***/
    }, /* 11 */
    /***/function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */(function (global) {
        'use strict';

        var _Object$keys = __webpack_require__(12)['default'];
        var _interopRequireDefault = __webpack_require__(2)['default'];
        exports.__esModule = true;
        var _utils = __webpack_require__(4);
        var _exception = __webpack_require__(5);
        var _exception2 = _interopRequireDefault(_exception);
        exports['default'] = function (instance) {
          instance.registerHelper('each', function (context, options) {
            if (!options) {
              throw new _exception2['default']('Must pass iterator to #each');
            }
            var fn = options.fn,
              inverse = options.inverse,
              i = 0,
              ret = '',
              data = undefined,
              contextPath = undefined;
            if (options.data && options.ids) {
              contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
            }
            if (_utils.isFunction(context)) {
              context = context.call(this);
            }
            if (options.data) {
              data = _utils.createFrame(options.data);
            }
            function execIteration(field, index, last) {
              if (data) {
                data.key = field;
                data.index = index;
                data.first = index === 0;
                data.last = !!last;
                if (contextPath) {
                  data.contextPath = contextPath + field;
                }
              }
              ret = ret + fn(context[field], {
                data: data,
                blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
              });
            }
            if (context && typeof context === 'object') {
              if (_utils.isArray(context)) {
                for (var j = context.length; i < j; i++) {
                  if (i in context) {
                    execIteration(i, i, i === context.length - 1);
                  }
                }
              } else if (global.Symbol && context[global.Symbol.iterator]) {
                var newContext = [];
                var iterator = context[global.Symbol.iterator]();
                for (var it = iterator.next(); !it.done; it = iterator.next()) {
                  newContext.push(it.value);
                }
                context = newContext;
                for (var j = context.length; i < j; i++) {
                  execIteration(i, i, i === context.length - 1);
                }
              } else {
                (function () {
                  var priorKey = undefined;
                  _Object$keys(context).forEach(function (key) {
                    // We're running the iterations one step out of sync so we can detect
                    // the last iteration without have to scan the object twice and create
                    // an itermediate keys array.
                    if (priorKey !== undefined) {
                      execIteration(priorKey, i - 1);
                    }
                    priorKey = key;
                    i++;
                  });
                  if (priorKey !== undefined) {
                    execIteration(priorKey, i - 1, true);
                  }
                })();
              }
            }
            if (i === 0) {
              ret = inverse(this);
            }
            return ret;
          });
        };
        module.exports = exports['default'];
        /* WEBPACK VAR INJECTION */
      }).call(exports, function () {
        return this;
      }());

      /***/
    }, /* 12 */
    /***/function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(13),
        __esModule: true
      };

      /***/
    }, /* 13 */
    /***/function (module, exports, __webpack_require__) {
      __webpack_require__(14);
      module.exports = __webpack_require__(20).Object.keys;

      /***/
    }, /* 14 */
    /***/function (module, exports, __webpack_require__) {
      // 19.1.2.14 Object.keys(O)
      var toObject = __webpack_require__(15);
      __webpack_require__(17)('keys', function ($keys) {
        return function keys(it) {
          return $keys(toObject(it));
        };
      });

      /***/
    }, /* 15 */
    /***/function (module, exports, __webpack_require__) {
      // 7.1.13 ToObject(argument)
      var defined = __webpack_require__(16);
      module.exports = function (it) {
        return Object(defined(it));
      };

      /***/
    }, /* 16 */
    /***/function (module, exports) {
      // 7.2.1 RequireObjectCoercible(argument)
      module.exports = function (it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
      };

      /***/
    }, /* 17 */
    /***/function (module, exports, __webpack_require__) {
      // most Object methods by ES6 should accept primitives
      var $export = __webpack_require__(18),
        core = __webpack_require__(20),
        fails = __webpack_require__(23);
      module.exports = function (KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY],
          exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function () {
          fn(1);
        }), 'Object', exp);
      };

      /***/
    }, /* 18 */
    /***/function (module, exports, __webpack_require__) {
      var global = __webpack_require__(19),
        core = __webpack_require__(20),
        ctx = __webpack_require__(21),
        PROTOTYPE = 'prototype';
      var $export = function (type, name, source) {
        var IS_FORCED = type & $export.F,
          IS_GLOBAL = type & $export.G,
          IS_STATIC = type & $export.S,
          IS_PROTO = type & $export.P,
          IS_BIND = type & $export.B,
          IS_WRAP = type & $export.W,
          exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
          target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
          key,
          own,
          out;
        if (IS_GLOBAL) source = name;
        for (key in source) {
          // contains in native
          own = !IS_FORCED && target && key in target;
          if (own && key in exports) continue;
          // export native or passed
          out = own ? target[key] : source[key];
          // prevent global pollution for namespaces
          exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
          // bind timers to global for call from export context
          : IS_BIND && own ? ctx(out, global)
          // wrap global constructors for prevent change them in library
          : IS_WRAP && target[key] == out ? function (C) {
            var F = function (param) {
              return this instanceof C ? new C(param) : C(param);
            };
            F[PROTOTYPE] = C[PROTOTYPE];
            return F;
            // make static versions for prototype methods
          }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
          if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
        }
      };
      // type bitmap
      $export.F = 1; // forced
      $export.G = 2; // global
      $export.S = 4; // static
      $export.P = 8; // proto
      $export.B = 16; // bind
      $export.W = 32; // wrap
      module.exports = $export;

      /***/
    }, /* 19 */
    /***/function (module, exports) {
      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
      if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

      /***/
    }, /* 20 */
    /***/function (module, exports) {
      var core = module.exports = {
        version: '1.2.6'
      };
      if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

      /***/
    }, /* 21 */
    /***/function (module, exports, __webpack_require__) {
      // optional / simple context binding
      var aFunction = __webpack_require__(22);
      module.exports = function (fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;
        switch (length) {
          case 1:
            return function (a) {
              return fn.call(that, a);
            };
          case 2:
            return function (a, b) {
              return fn.call(that, a, b);
            };
          case 3:
            return function (a, b, c) {
              return fn.call(that, a, b, c);
            };
        }
        return function /* ...args */
        () {
          return fn.apply(that, arguments);
        };
      };

      /***/
    }, /* 22 */
    /***/function (module, exports) {
      module.exports = function (it) {
        if (typeof it != 'function') throw TypeError(it + ' is not a function!');
        return it;
      };

      /***/
    }, /* 23 */
    /***/function (module, exports) {
      module.exports = function (exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };

      /***/
    }, /* 24 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];
      exports.__esModule = true;
      var _exception = __webpack_require__(5);
      var _exception2 = _interopRequireDefault(_exception);
      exports['default'] = function (instance) {
        instance.registerHelper('helperMissing', function () /* [args, ]options */{
          if (arguments.length === 1) {
            // A missing field in a {{foo}} construct.
            return undefined;
          } else {
            // Someone is actually trying to call something, blow up.
            throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
          }
        });
      };
      module.exports = exports['default'];

      /***/
    }, /* 25 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];
      exports.__esModule = true;
      var _utils = __webpack_require__(4);
      var _exception = __webpack_require__(5);
      var _exception2 = _interopRequireDefault(_exception);
      exports['default'] = function (instance) {
        instance.registerHelper('if', function (conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#if requires exactly one argument');
          }
          if (_utils.isFunction(conditional)) {
            conditional = conditional.call(this);
          }

          // Default behavior is to render the positive path if the value is truthy and not empty.
          // The `includeZero` option may be set to treat the condtional as purely not empty based on the
          // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
          if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
            return options.inverse(this);
          } else {
            return options.fn(this);
          }
        });
        instance.registerHelper('unless', function (conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#unless requires exactly one argument');
          }
          return instance.helpers['if'].call(this, conditional, {
            fn: options.inverse,
            inverse: options.fn,
            hash: options.hash
          });
        });
      };
      module.exports = exports['default'];

      /***/
    }, /* 26 */
    /***/function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports['default'] = function (instance) {
        instance.registerHelper('log', function () /* message, options */{
          var args = [undefined],
            options = arguments[arguments.length - 1];
          for (var i = 0; i < arguments.length - 1; i++) {
            args.push(arguments[i]);
          }
          var level = 1;
          if (options.hash.level != null) {
            level = options.hash.level;
          } else if (options.data && options.data.level != null) {
            level = options.data.level;
          }
          args[0] = level;
          instance.log.apply(instance, args);
        });
      };
      module.exports = exports['default'];

      /***/
    }, /* 27 */
    /***/function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports['default'] = function (instance) {
        instance.registerHelper('lookup', function (obj, field, options) {
          if (!obj) {
            // Note for 5.0: Change to "obj == null" in 5.0
            return obj;
          }
          return options.lookupProperty(obj, field);
        });
      };
      module.exports = exports['default'];

      /***/
    }, /* 28 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];
      exports.__esModule = true;
      var _utils = __webpack_require__(4);
      var _exception = __webpack_require__(5);
      var _exception2 = _interopRequireDefault(_exception);
      exports['default'] = function (instance) {
        instance.registerHelper('with', function (context, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#with requires exactly one argument');
          }
          if (_utils.isFunction(context)) {
            context = context.call(this);
          }
          var fn = options.fn;
          if (!_utils.isEmpty(context)) {
            var data = options.data;
            if (options.data && options.ids) {
              data = _utils.createFrame(options.data);
              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
            }
            return fn(context, {
              data: data,
              blockParams: _utils.blockParams([context], [data && data.contextPath])
            });
          } else {
            return options.inverse(this);
          }
        });
      };
      module.exports = exports['default'];

      /***/
    }, /* 29 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];
      exports.__esModule = true;
      exports.registerDefaultDecorators = registerDefaultDecorators;
      var _decoratorsInline = __webpack_require__(30);
      var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
      function registerDefaultDecorators(instance) {
        _decoratorsInline2['default'](instance);
      }

      /***/
    }, /* 30 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;
      var _utils = __webpack_require__(4);
      exports['default'] = function (instance) {
        instance.registerDecorator('inline', function (fn, props, container, options) {
          var ret = fn;
          if (!props.partials) {
            props.partials = {};
            ret = function (context, options) {
              // Create a new partials stack frame prior to exec.
              var original = container.partials;
              container.partials = _utils.extend({}, original, props.partials);
              var ret = fn(context, options);
              container.partials = original;
              return ret;
            };
          }
          props.partials[options.args[0]] = options.fn;
          return ret;
        });
      };
      module.exports = exports['default'];

      /***/
    }, /* 31 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;
      var _utils = __webpack_require__(4);
      var logger = {
        methodMap: ['debug', 'info', 'warn', 'error'],
        level: 'info',
        // Maps a given level value to the `methodMap` indexes above.
        lookupLevel: function lookupLevel(level) {
          if (typeof level === 'string') {
            var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
            if (levelMap >= 0) {
              level = levelMap;
            } else {
              level = parseInt(level, 10);
            }
          }
          return level;
        },
        // Can be overridden in the host environment
        log: function log(level) {
          level = logger.lookupLevel(level);
          if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
            var method = logger.methodMap[level];
            // eslint-disable-next-line no-console
            if (!console[method]) {
              method = 'log';
            }
            for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              message[_key - 1] = arguments[_key];
            }
            console[method].apply(console, message); // eslint-disable-line no-console
          }
        }
      };

      exports['default'] = logger;
      module.exports = exports['default'];

      /***/
    }, /* 32 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$create = __webpack_require__(33)['default'];
      var _Object$keys = __webpack_require__(12)['default'];
      var _interopRequireWildcard = __webpack_require__(1)['default'];
      exports.__esModule = true;
      exports.createProtoAccessControl = createProtoAccessControl;
      exports.resultIsAllowed = resultIsAllowed;
      exports.resetLoggedProperties = resetLoggedProperties;
      var _createNewLookupObject = __webpack_require__(35);
      var _logger = __webpack_require__(31);
      var logger = _interopRequireWildcard(_logger);
      var loggedProperties = _Object$create(null);
      function createProtoAccessControl(runtimeOptions) {
        var defaultMethodWhiteList = _Object$create(null);
        defaultMethodWhiteList['constructor'] = false;
        defaultMethodWhiteList['__defineGetter__'] = false;
        defaultMethodWhiteList['__defineSetter__'] = false;
        defaultMethodWhiteList['__lookupGetter__'] = false;
        var defaultPropertyWhiteList = _Object$create(null);
        // eslint-disable-next-line no-proto
        defaultPropertyWhiteList['__proto__'] = false;
        return {
          properties: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
            defaultValue: runtimeOptions.allowProtoPropertiesByDefault
          },
          methods: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
            defaultValue: runtimeOptions.allowProtoMethodsByDefault
          }
        };
      }
      function resultIsAllowed(result, protoAccessControl, propertyName) {
        if (typeof result === 'function') {
          return checkWhiteList(protoAccessControl.methods, propertyName);
        } else {
          return checkWhiteList(protoAccessControl.properties, propertyName);
        }
      }
      function checkWhiteList(protoAccessControlForType, propertyName) {
        if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
          return protoAccessControlForType.whitelist[propertyName] === true;
        }
        if (protoAccessControlForType.defaultValue !== undefined) {
          return protoAccessControlForType.defaultValue;
        }
        logUnexpecedPropertyAccessOnce(propertyName);
        return false;
      }
      function logUnexpecedPropertyAccessOnce(propertyName) {
        if (loggedProperties[propertyName] !== true) {
          loggedProperties[propertyName] = true;
          logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
        }
      }
      function resetLoggedProperties() {
        _Object$keys(loggedProperties).forEach(function (propertyName) {
          delete loggedProperties[propertyName];
        });
      }

      /***/
    }, /* 33 */
    /***/function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(34),
        __esModule: true
      };

      /***/
    }, /* 34 */
    /***/function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(8);
      module.exports = function create(P, D) {
        return $.create(P, D);
      };

      /***/
    }, /* 35 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$create = __webpack_require__(33)['default'];
      exports.__esModule = true;
      exports.createNewLookupObject = createNewLookupObject;
      var _utils = __webpack_require__(4);

      /**
       * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
       * The resulting object can be used with "object[property]" to check if a property exists
       * @param {...object} sources a varargs parameter of source objects that will be merged
       * @returns {object}
       */

      function createNewLookupObject() {
        for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }
        return _utils.extend.apply(undefined, [_Object$create(null)].concat(sources));
      }

      /***/
    }, /* 36 */
    /***/function (module, exports) {
      // Build out our basic SafeString type
      'use strict';

      exports.__esModule = true;
      function SafeString(string) {
        this.string = string;
      }
      SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
        return '' + this.string;
      };
      exports['default'] = SafeString;
      module.exports = exports['default'];

      /***/
    }, /* 37 */
    /***/function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$seal = __webpack_require__(38)['default'];
      var _Object$keys = __webpack_require__(12)['default'];
      var _interopRequireWildcard = __webpack_require__(1)['default'];
      var _interopRequireDefault = __webpack_require__(2)['default'];
      exports.__esModule = true;
      exports.checkRevision = checkRevision;
      exports.template = template;
      exports.wrapProgram = wrapProgram;
      exports.resolvePartial = resolvePartial;
      exports.invokePartial = invokePartial;
      exports.noop = noop;
      var _utils = __webpack_require__(4);
      var Utils = _interopRequireWildcard(_utils);
      var _exception = __webpack_require__(5);
      var _exception2 = _interopRequireDefault(_exception);
      var _base = __webpack_require__(3);
      var _helpers = __webpack_require__(9);
      var _internalWrapHelper = __webpack_require__(42);
      var _internalProtoAccess = __webpack_require__(32);
      function checkRevision(compilerInfo) {
        var compilerRevision = compilerInfo && compilerInfo[0] || 1,
          currentRevision = _base.COMPILER_REVISION;
        if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
          return;
        }
        if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
          var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
            compilerVersions = _base.REVISION_CHANGES[compilerRevision];
          throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
        }
      }
      function template(templateSpec, env) {
        /* istanbul ignore next */
        if (!env) {
          throw new _exception2['default']('No environment passed to template');
        }
        if (!templateSpec || !templateSpec.main) {
          throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
        }
        templateSpec.main.decorator = templateSpec.main_d;

        // Note: Using env.VM references rather than local var references throughout this section to allow
        // for external users to override these as pseudo-supported APIs.
        env.VM.checkRevision(templateSpec.compiler);

        // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
        var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
        function invokePartialWrapper(partial, context, options) {
          if (options.hash) {
            context = Utils.extend({}, context, options.hash);
            if (options.ids) {
              options.ids[0] = true;
            }
          }
          partial = env.VM.resolvePartial.call(this, partial, context, options);
          var extendedOptions = Utils.extend({}, options, {
            hooks: this.hooks,
            protoAccessControl: this.protoAccessControl
          });
          var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
          if (result == null && env.compile) {
            options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
            result = options.partials[options.name](context, extendedOptions);
          }
          if (result != null) {
            if (options.indent) {
              var lines = result.split('\n');
              for (var i = 0, l = lines.length; i < l; i++) {
                if (!lines[i] && i + 1 === l) {
                  break;
                }
                lines[i] = options.indent + lines[i];
              }
              result = lines.join('\n');
            }
            return result;
          } else {
            throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
          }
        }

        // Just add water
        var container = {
          strict: function strict(obj, name, loc) {
            if (!obj || !(name in obj)) {
              throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
                loc: loc
              });
            }
            return container.lookupProperty(obj, name);
          },
          lookupProperty: function lookupProperty(parent, propertyName) {
            var result = parent[propertyName];
            if (result == null) {
              return result;
            }
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return result;
            }
            if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
              return result;
            }
            return undefined;
          },
          lookup: function lookup(depths, name) {
            var len = depths.length;
            for (var i = 0; i < len; i++) {
              var result = depths[i] && container.lookupProperty(depths[i], name);
              if (result != null) {
                return depths[i][name];
              }
            }
          },
          lambda: function lambda(current, context) {
            return typeof current === 'function' ? current.call(context) : current;
          },
          escapeExpression: Utils.escapeExpression,
          invokePartial: invokePartialWrapper,
          fn: function fn(i) {
            var ret = templateSpec[i];
            ret.decorator = templateSpec[i + '_d'];
            return ret;
          },
          programs: [],
          program: function program(i, data, declaredBlockParams, blockParams, depths) {
            var programWrapper = this.programs[i],
              fn = this.fn(i);
            if (data || depths || blockParams || declaredBlockParams) {
              programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
            } else if (!programWrapper) {
              programWrapper = this.programs[i] = wrapProgram(this, i, fn);
            }
            return programWrapper;
          },
          data: function data(value, depth) {
            while (value && depth--) {
              value = value._parent;
            }
            return value;
          },
          mergeIfNeeded: function mergeIfNeeded(param, common) {
            var obj = param || common;
            if (param && common && param !== common) {
              obj = Utils.extend({}, common, param);
            }
            return obj;
          },
          // An empty object to use as replacement for null-contexts
          nullContext: _Object$seal({}),
          noop: env.VM.noop,
          compilerInfo: templateSpec.compiler
        };
        function ret(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var data = options.data;
          ret._setup(options);
          if (!options.partial && templateSpec.useData) {
            data = initData(context, data);
          }
          var depths = undefined,
            blockParams = templateSpec.useBlockParams ? [] : undefined;
          if (templateSpec.useDepths) {
            if (options.depths) {
              depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
            } else {
              depths = [context];
            }
          }
          function main(context /*, options*/) {
            return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
          }
          main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
          return main(context, options);
        }
        ret.isTop = true;
        ret._setup = function (options) {
          if (!options.partial) {
            var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
            wrapHelpersToPassLookupProperty(mergedHelpers, container);
            container.helpers = mergedHelpers;
            if (templateSpec.usePartial) {
              // Use mergeIfNeeded here to prevent compiling global partials multiple times
              container.partials = container.mergeIfNeeded(options.partials, env.partials);
            }
            if (templateSpec.usePartial || templateSpec.useDecorators) {
              container.decorators = Utils.extend({}, env.decorators, options.decorators);
            }
            container.hooks = {};
            container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
            var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
            _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
            _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
          } else {
            container.protoAccessControl = options.protoAccessControl; // internal option
            container.helpers = options.helpers;
            container.partials = options.partials;
            container.decorators = options.decorators;
            container.hooks = options.hooks;
          }
        };
        ret._child = function (i, data, blockParams, depths) {
          if (templateSpec.useBlockParams && !blockParams) {
            throw new _exception2['default']('must pass block params');
          }
          if (templateSpec.useDepths && !depths) {
            throw new _exception2['default']('must pass parent depths');
          }
          return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
        };
        return ret;
      }
      function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
        function prog(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var currentDepths = depths;
          if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
            currentDepths = [context].concat(depths);
          }
          return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
        }
        prog = executeDecorators(fn, prog, container, depths, data, blockParams);
        prog.program = i;
        prog.depth = depths ? depths.length : 0;
        prog.blockParams = declaredBlockParams || 0;
        return prog;
      }

      /**
       * This is currently part of the official API, therefore implementation details should not be changed.
       */

      function resolvePartial(partial, context, options) {
        if (!partial) {
          if (options.name === '@partial-block') {
            partial = options.data['partial-block'];
          } else {
            partial = options.partials[options.name];
          }
        } else if (!partial.call && !options.name) {
          // This is a dynamic partial that returned a string
          options.name = partial;
          partial = options.partials[partial];
        }
        return partial;
      }
      function invokePartial(partial, context, options) {
        // Use the current closure context to save the partial-block if this partial
        var currentPartialBlock = options.data && options.data['partial-block'];
        options.partial = true;
        if (options.ids) {
          options.data.contextPath = options.ids[0] || options.data.contextPath;
        }
        var partialBlock = undefined;
        if (options.fn && options.fn !== noop) {
          (function () {
            options.data = _base.createFrame(options.data);
            // Wrapper function to get access to currentPartialBlock from the closure
            var fn = options.fn;
            partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
              var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

              // Restore the partial-block from the closure for the execution of the block
              // i.e. the part inside the block of the partial call.
              options.data = _base.createFrame(options.data);
              options.data['partial-block'] = currentPartialBlock;
              return fn(context, options);
            };
            if (fn.partials) {
              options.partials = Utils.extend({}, options.partials, fn.partials);
            }
          })();
        }
        if (partial === undefined && partialBlock) {
          partial = partialBlock;
        }
        if (partial === undefined) {
          throw new _exception2['default']('The partial ' + options.name + ' could not be found');
        } else if (partial instanceof Function) {
          return partial(context, options);
        }
      }
      function noop() {
        return '';
      }
      function initData(context, data) {
        if (!data || !('root' in data)) {
          data = data ? _base.createFrame(data) : {};
          data.root = context;
        }
        return data;
      }
      function executeDecorators(fn, prog, container, depths, data, blockParams) {
        if (fn.decorator) {
          var props = {};
          prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
          Utils.extend(prog, props);
        }
        return prog;
      }
      function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
        _Object$keys(mergedHelpers).forEach(function (helperName) {
          var helper = mergedHelpers[helperName];
          mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
        });
      }
      function passLookupPropertyOption(helper, container) {
        var lookupProperty = container.lookupProperty;
        return _internalWrapHelper.wrapHelper(helper, function (options) {
          return Utils.extend({
            lookupProperty: lookupProperty
          }, options);
        });
      }

      /***/
    }, /* 38 */
    /***/function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(39),
        __esModule: true
      };

      /***/
    }, /* 39 */
    /***/function (module, exports, __webpack_require__) {
      __webpack_require__(40);
      module.exports = __webpack_require__(20).Object.seal;

      /***/
    }, /* 40 */
    /***/function (module, exports, __webpack_require__) {
      // 19.1.2.17 Object.seal(O)
      var isObject = __webpack_require__(41);
      __webpack_require__(17)('seal', function ($seal) {
        return function seal(it) {
          return $seal && isObject(it) ? $seal(it) : it;
        };
      });

      /***/
    }, /* 41 */
    /***/function (module, exports) {
      module.exports = function (it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function';
      };

      /***/
    }, /* 42 */
    /***/function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports.wrapHelper = wrapHelper;
      function wrapHelper(helper, transformOptionsFn) {
        if (typeof helper !== 'function') {
          // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
          // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
          return helper;
        }
        var wrapper = function wrapper() /* dynamic arguments */{
          var options = arguments[arguments.length - 1];
          arguments[arguments.length - 1] = transformOptionsFn(options);
          return helper.apply(this, arguments);
        };
        return wrapper;
      }

      /***/
    }, /* 43 */
    /***/function (module, exports) {
      /* WEBPACK VAR INJECTION */(function (global) {
        'use strict';

        exports.__esModule = true;
        exports['default'] = function (Handlebars) {
          /* istanbul ignore next */
          var root = typeof global !== 'undefined' ? global : window,
            $Handlebars = root.Handlebars;
          /* istanbul ignore next */
          Handlebars.noConflict = function () {
            if (root.Handlebars === Handlebars) {
              root.Handlebars = $Handlebars;
            }
            return Handlebars;
          };
        };
        module.exports = exports['default'];
        /* WEBPACK VAR INJECTION */
      }).call(exports, function () {
        return this;
      }());

      /***/
    }
    /******/])
  );
});

;
},{}],"templates/appenFilmMarkup.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const templateFunction = _handlebars.default.template({
  "1": function (container, depth0, helpers, partials, data) {
    var stack1,
      helper,
      alias1 = depth0 != null ? depth0 : container.nullContext || {},
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
    return "\r\n  <li class='gallery-item item'>\r\n    <div class='gallery-card-img'>\r\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "poster_path") : depth0, {
      "name": "if",
      "hash": {},
      "fn": container.program(2, data, 0),
      "inverse": container.program(4, data, 0),
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 6
        },
        "end": {
          "line": 17,
          "column": 13
        }
      }
    })) != null ? stack1 : "") + "\r\n    </div>\r\n    <div class='gallery-card-text'>\r\n      <h2 class='gallery-name'> " + alias4((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "title",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 21,
          "column": 32
        },
        "end": {
          "line": 21,
          "column": 41
        }
      }
    }) : helper)) + "</h2>\r\n      <p class='gallery-text'>\r\n        " + alias4((helper = (helper = lookupProperty(helpers, "release_date") || (depth0 != null ? lookupProperty(depth0, "release_date") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "release_date",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 23,
          "column": 8
        },
        "end": {
          "line": 23,
          "column": 24
        }
      }
    }) : helper)) + "\r\n        |\r\n        <span class='vote-average'>" + alias4((helper = (helper = lookupProperty(helpers, "vote_average") || (depth0 != null ? lookupProperty(depth0, "vote_average") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "vote_average",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 25,
          "column": 35
        },
        "end": {
          "line": 25,
          "column": 51
        }
      }
    }) : helper)) + "</span>\r\n      </p>\r\n\r\n    </div>\r\n  </li>\r\n\r\n";
  },
  "2": function (container, depth0, helpers, partials, data) {
    var helper,
      alias1 = depth0 != null ? depth0 : container.nullContext || {},
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
    return "        <img\r\n          src='https://image.tmdb.org/t/p/w500" + alias4((helper = (helper = lookupProperty(helpers, "poster_path") || (depth0 != null ? lookupProperty(depth0, "poster_path") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "poster_path",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 7,
          "column": 46
        },
        "end": {
          "line": 7,
          "column": 61
        }
      }
    }) : helper)) + "'\r\n          alt='" + alias4((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "title",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 8,
          "column": 15
        },
        "end": {
          "line": 8,
          "column": 24
        }
      }
    }) : helper)) + "'\r\n          data-movie-id=" + alias4((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "id",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 9,
          "column": 24
        },
        "end": {
          "line": 9,
          "column": 30
        }
      }
    }) : helper)) + "\r\n          class='gallery-img'\r\n        />\r\n";
  },
  "4": function (container, depth0, helpers, partials, data) {
    return "        <img\r\n          src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'\r\n          class='gallery-img'\r\n        />\r\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function (container, depth0, helpers, partials, data) {
    var stack1,
      lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
    return (stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 31,
          "column": 9
        }
      }
    })) != null ? stack1 : "";
  },
  "useData": true
});
var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"templates/header-home.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function (container, depth0, helpers, partials, data) {
    return "<div class='header-input-wrapper'>\r\n  <label class='header-input-label' for=''>\r\n    <input\r\n      id='header-input'\r\n      class='header-input'\r\n      type='text'\r\n      placeholder='Поиск фильмов'\r\n      autocomplete='off'\r\n    />\r\n    <svg class='header-input-icon'>\r\n      <use href='./images/sprait/symbol-defs.svg#icon-search-2'></use>\r\n    </svg>\r\n  </label>\r\n</div>";
  },
  "useData": true
});
var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"templates/header-library.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function (container, depth0, helpers, partials, data) {
    return "<div class='header-button-wrapper'>\r\n  <ul class='header-button-list list'>\r\n    <li class='header-button-item item'>\r\n      <button\r\n        class='button button-header button-header-watched-js'\r\n      >Watched</button>\r\n    </li>\r\n    <li class='header-button-item item'>\r\n      <button class='button button-header button-header-queue-js'>queue</button>\r\n    </li>\r\n  </ul>\r\n</div>";
  },
  "useData": true
});
var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"templates/empty-queue-list.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function (container, depth0, helpers, partials, data) {
    return "<div class='empty-movie-list empty-js'>\r\n  <div class='empty-movie-list-wrapper'>\r\n    <h2 class='empty-movie-list-title'>\r\n      <span class='empty-movie-list-title-par'>Queue</span>\r\n      is empty...\r\n    </h2>\r\n    <p class='empty-movie-list-text'>There's nothing in the QUEUE yet.</p>\r\n    <p class='empty-movie-list-text'>\r\n      Select and add to your library to quickly find your favorite movies!\r\n    </p>\r\n    <a class='link button button-empty' href='/'>Home</a>\r\n  </div>\r\n</div>";
  },
  "useData": true
});
var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"templates/empty-watched-list.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function (container, depth0, helpers, partials, data) {
    return "<div class='empty-movie-list empty-js'>\r\n  <div class='empty-movie-list-wrapper'>\r\n    <h2 class='empty-movie-list-title'>\r\n      <span class='empty-movie-list-title-par'>Watched</span>\r\n      is empty...\r\n    </h2>\r\n    <p class='empty-movie-list-text'>There's nothing in the WATCHED yet.</p>\r\n    <p class='empty-movie-list-text'>\r\n      Select and add to your library to quickly find your favorite movies!\r\n    </p>\r\n    <a class='link button button-empty' href='/'>Home</a>\r\n  </div>\r\n</div>";
  },
  "useData": true
});
var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"js/local-storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalStorage = getLocalStorage;
exports.setLocalStorage = setLocalStorage;
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
}
},{}],"js/io.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observer = void 0;
var _header = require("./header");
const onEntry = entries => {
  entries.forEach(entry => {
    //если entry пересекает порт, делаем новый запрос за фильмами ////
    if (entry.isIntersecting && _header.apiService.searchQuery.trim() === '' && _header.apiService.page > 1) {
      _header.apiService.fetchArticles().then(data => {
        (0, _header.addListTemplates)(data);
      });
    }
    if (entry.isIntersecting && _header.apiService.searchQuery.trim() !== '' && _header.apiService.page > 1) {
      _header.apiService.filmRequest().then(data => {
        (0, _header.addListTemplates)(data);
      });
    }
  });
};
const options = {
  rootMargin: '600px'
};

///////регистрируем IntersectionObserver////////
const observer = new IntersectionObserver(onEntry, options);
exports.observer = observer;
},{"./header":"js/header.js"}],"js/refs-header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refs = void 0;
const refs = {
  header: document.querySelector('.header'),
  libraryLink: document.querySelector('.link-library-js'),
  homeLink: document.querySelector('.link-home-js'),
  headerContent: document.querySelector('.header-content'),
  input: document.querySelector('#header-input'),
  galery: document.querySelector('.gallery-list'),
  buttonHeaderWatched: document.querySelector('.button-header-watched-js'),
  buttonHeaderQueue: document.querySelector('.button-header-queue-js'),
  sentinel: document.querySelector('#sentinel'),
  emptyMovieList: document.querySelector('.empty-js')
};
exports.refs = refs;
},{}],"js/header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListTemplates = addListTemplates;
exports.apiService = void 0;
exports.renderQueueList = renderQueueList;
exports.renderWathedList = renderWathedList;
var _lodash = _interopRequireDefault(require("lodash.debounce"));
var _newsService = _interopRequireDefault(require("./news-service"));
var _appenFilmMarkup = _interopRequireDefault(require("../templates/appenFilmMarkup.hbs"));
var _headerHome = _interopRequireDefault(require("../templates/header-home.hbs"));
var _headerLibrary = _interopRequireDefault(require("../templates/header-library.hbs"));
var _emptyQueueList = _interopRequireDefault(require("../templates/empty-queue-list.hbs"));
var _emptyWatchedList = _interopRequireDefault(require("../templates/empty-watched-list.hbs"));
var _localStorage = require("./local-storage");
var _io = require("./io");
var _refsHeader = require("./refs-header");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const apiService = new _newsService.default();
exports.apiService = apiService;
_refsHeader.refs.libraryLink.addEventListener('click', myLibrary);
_refsHeader.refs.homeLink.addEventListener('click', home);
function initializeHeader() {
  _refsHeader.refs.headerContent.insertAdjacentHTML('beforeend', (0, _headerHome.default)());
  _refsHeader.refs.input = document.querySelector('#header-input');
  _refsHeader.refs.input.addEventListener('input', (0, _lodash.default)(filmName, 1000));
  apiService.setSearchQuery('');
  fetchTrending();
}
// ========= инициализация хедера и запрос популярных =========
initializeHeader();
function home(evt) {
  evt.preventDefault();
  _refsHeader.refs.headerContent.innerHTML = '';
  initializeHeader();
  _refsHeader.refs.header.classList.remove('library');
  _refsHeader.refs.libraryLink.classList.remove('active');
  _refsHeader.refs.homeLink.classList.add('active');
  _refsHeader.refs.galery.innerHTML = '';
  _refsHeader.refs.emptyMovieList = document.querySelector('.empty-js');
  if (_refsHeader.refs.emptyMovieList) {
    _refsHeader.refs.emptyMovieList.remove();
  }
}
/////// рендер популярных фильмов //////
function fetchTrending() {
  apiService.fetchArticles().then(data => {
    addListTemplates(data);
    _io.observer.observe(_refsHeader.refs.sentinel);
  });
}

// ========= если инпут пустая строка =>очищаем галерею и выходим =========
function filmName(e) {
  if (e.target.value.trim() === '') {
    _refsHeader.refs.galery.innerHTML = '';
    apiService.setSearchQuery('');
    apiService.resetPage();
    fetchTrending();
    return;
  }
  if (apiService.searchQuery !== e.target.value) {
    apiService.resetPage();
  }
  //если длина массива =0 =>алерт и выход
  apiService.setSearchQuery(e.target.value);
  apiService.filmRequest().then(data => {
    if (data.length === 0) {
      return alert('проверте правильность ввода');
    }
    _refsHeader.refs.galery.innerHTML = '';
    addListTemplates(data);
  });
}

// добавляем разметку галлереи по шаблону//
function addListTemplates(results) {
  _refsHeader.refs.galery.insertAdjacentHTML('beforeend', (0, _appenFilmMarkup.default)(results));
}
function myLibrary(evt) {
  evt.preventDefault();
  _refsHeader.refs.input.removeEventListener('input', (0, _lodash.default)(filmName, 1000));
  _refsHeader.refs.headerContent.innerHTML = '';
  _refsHeader.refs.headerContent.insertAdjacentHTML('beforeend', (0, _headerLibrary.default)());
  _refsHeader.refs.libraryLink.classList.add('active');
  _refsHeader.refs.homeLink.classList.remove('active');
  _refsHeader.refs.header.classList.add('library');
  addLibraryButtonsListeners();
  apiService.resetPage();
  _io.observer.disconnect();
}
function addLibraryButtonsListeners() {
  _refsHeader.refs.buttonHeaderQueue = document.querySelector('.button-header-queue-js');
  _refsHeader.refs.buttonHeaderWatched = document.querySelector('.button-header-watched-js');
  _refsHeader.refs.buttonHeaderQueue.classList.add('button-active');
  _refsHeader.refs.buttonHeaderQueue.addEventListener('click', renderQueueList);
  _refsHeader.refs.buttonHeaderWatched.addEventListener('click', renderWathedList);
  _refsHeader.refs.galery.innerHTML = '';
  renderQueueList();
}
function renderWathedList() {
  // 1. Снять класс актив с кнопки Кью и повесить на Вотчед
  _refsHeader.refs.buttonHeaderWatched.classList.add('button-active');
  _refsHeader.refs.buttonHeaderQueue.classList.remove('button-active');
  // 2. Получить список вотчед из локалсторадж
  const watched = (0, _localStorage.getLocalStorage)('watched');
  _refsHeader.refs.emptyMovieList = document.querySelector('.empty-js');

  // 3. Сделать иф если вотчед есть делаем АПИ запрос по каждому элементу, если нет рендерим заглушку
  if (watched && watched.length) {
    const movieArr = watched.map(id => {
      return apiService.getFilmById(id);
    });
    Promise.all(movieArr).then(data => {
      // 4. Очищащем галлерею и рендерим данные, которые получили с АПИ запроса
      _refsHeader.refs.galery.innerHTML = '';
      _refsHeader.refs.galery.insertAdjacentHTML('beforeend', (0, _appenFilmMarkup.default)(data));
      if (_refsHeader.refs.emptyMovieList) {
        _refsHeader.refs.emptyMovieList.remove();
      }
    });
  } else {
    _refsHeader.refs.galery.innerHTML = '';
    if (_refsHeader.refs.emptyMovieList) {
      _refsHeader.refs.emptyMovieList.remove();
    }
    _refsHeader.refs.galery.insertAdjacentHTML('afterend', (0, _emptyWatchedList.default)());
  }
}
function renderQueueList() {
  // 1. Снять класс актив с кнопки Вотчед и повесить на Кью
  _refsHeader.refs.buttonHeaderWatched.classList.remove('button-active');
  _refsHeader.refs.buttonHeaderQueue.classList.add('button-active');
  // 2. Получить список кью из локалсторадж
  const queue = (0, _localStorage.getLocalStorage)('queue');
  _refsHeader.refs.emptyMovieList = document.querySelector('.empty-js');
  // 3. Сделать иф если кью делаем АПИ запрос по каждому элементу, если нет рендерим заглушку
  if (queue && queue.length) {
    const movieArr = queue.map(id => {
      return apiService.getFilmById(id);
    });
    // 4. Очищащем галлерею и рендерим данные, которые получили с АПИ запроса
    Promise.all(movieArr).then(data => {
      _refsHeader.refs.galery.innerHTML = '';
      _refsHeader.refs.galery.insertAdjacentHTML('beforeend', (0, _appenFilmMarkup.default)(data));
      if (_refsHeader.refs.emptyMovieList) {
        _refsHeader.refs.emptyMovieList.remove();
      }
    });
  } else {
    _refsHeader.refs.galery.innerHTML = '';
    if (_refsHeader.refs.emptyMovieList) {
      _refsHeader.refs.emptyMovieList.remove();
    }
    _refsHeader.refs.galery.insertAdjacentHTML('afterend', (0, _emptyQueueList.default)());
  }
}
},{"lodash.debounce":"../node_modules/lodash.debounce/index.js","./news-service":"js/news-service.js","../templates/appenFilmMarkup.hbs":"templates/appenFilmMarkup.hbs","../templates/header-home.hbs":"templates/header-home.hbs","../templates/header-library.hbs":"templates/header-library.hbs","../templates/empty-queue-list.hbs":"templates/empty-queue-list.hbs","../templates/empty-watched-list.hbs":"templates/empty-watched-list.hbs","./local-storage":"js/local-storage.js","./io":"js/io.js","./refs-header":"js/refs-header.js"}],"templates/modal.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const templateFunction = _handlebars.default.template({
  "1": function (container, depth0, helpers, partials, data) {
    var helper,
      alias1 = depth0 != null ? depth0 : container.nullContext || {},
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
    return "      <img\r\n        class='modal-img'\r\n        style='max-width: 100%;'\r\n        src='https://image.tmdb.org/t/p/w500/" + alias4((helper = (helper = lookupProperty(helpers, "poster_path") || (depth0 != null ? lookupProperty(depth0, "poster_path") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "poster_path",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 7,
          "column": 45
        },
        "end": {
          "line": 7,
          "column": 60
        }
      }
    }) : helper)) + "'\r\n        alt='" + alias4((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "title",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 8,
          "column": 13
        },
        "end": {
          "line": 8,
          "column": 22
        }
      }
    }) : helper)) + "'\r\n      />\r\n";
  },
  "3": function (container, depth0, helpers, partials, data) {
    return "      <img\r\n        src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'\r\n        class='modal-img'\r\n      />\r\n";
  },
  "5": function (container, depth0, helpers, partials, data) {
    var helper,
      lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
    return "                <span class='card-text-genres'>" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "name") || (depth0 != null ? lookupProperty(depth0, "name") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
      "name": "name",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 45,
          "column": 47
        },
        "end": {
          "line": 45,
          "column": 55
        }
      }
    }) : helper)) + "</span>\r\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function (container, depth0, helpers, partials, data) {
    var stack1,
      helper,
      alias1 = depth0 != null ? depth0 : container.nullContext || {},
      alias2 = container.hooks.helperMissing,
      alias3 = "function",
      alias4 = container.escapeExpression,
      lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined;
      };
    return "<div class='card'>\r\n  <div class='card-img'>\r\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "poster_path") : depth0, {
      "name": "if",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.program(3, data, 0),
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 4
        },
        "end": {
          "line": 15,
          "column": 11
        }
      }
    })) != null ? stack1 : "") + "  </div>\r\n  <div class='card-content'>\r\n    <h1 class='card-name'> " + alias4((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "title",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 18,
          "column": 27
        },
        "end": {
          "line": 18,
          "column": 36
        }
      }
    }) : helper)) + "</h1>\r\n    <ul class='list'>\r\n      <li class='item'>\r\n        <p class='card-text'>\r\n          <span class='card-text-grey'>Vote / Votes</span>\r\n          <span class='vote-average'>" + alias4((helper = (helper = lookupProperty(helpers, "vote_average") || (depth0 != null ? lookupProperty(depth0, "vote_average") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "vote_average",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 23,
          "column": 37
        },
        "end": {
          "line": 23,
          "column": 53
        }
      }
    }) : helper)) + " </span>\r\n          /\r\n          <span class='card-text-black'> " + alias4((helper = (helper = lookupProperty(helpers, "vote_count") || (depth0 != null ? lookupProperty(depth0, "vote_count") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "vote_count",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 25,
          "column": 41
        },
        "end": {
          "line": 25,
          "column": 55
        }
      }
    }) : helper)) + "</span></p>\r\n      </li>\r\n      <li class='item'>\r\n        <p class='card-text'>\r\n          <span class='card-text-grey'>Popularity</span>\r\n          <span class='card-text-black'>" + alias4((helper = (helper = lookupProperty(helpers, "popularity") || (depth0 != null ? lookupProperty(depth0, "popularity") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "popularity",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 30,
          "column": 40
        },
        "end": {
          "line": 30,
          "column": 54
        }
      }
    }) : helper)) + "</span>\r\n        </p>\r\n      </li>\r\n      <li class='item'>\r\n        <p class='card-text'>\r\n          <span class='card-text-grey'>Original Title</span>\r\n          <span class='card-text-black'>" + alias4((helper = (helper = lookupProperty(helpers, "original_title") || (depth0 != null ? lookupProperty(depth0, "original_title") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "original_title",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 36,
          "column": 40
        },
        "end": {
          "line": 36,
          "column": 58
        }
      }
    }) : helper)) + "</span>\r\n        </p>\r\n      </li>\r\n      <li class='item item-genres'>\r\n        <p class='card-text'>\r\n          <span class='card-text-grey'>Genres</span>\r\n          <ul class='list'>\r\n            <li class='item item-genres-text'>\r\n" + ((stack1 = lookupProperty(helpers, "each").call(alias1, depth0 != null ? lookupProperty(depth0, "genres") : depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(5, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 44,
          "column": 14
        },
        "end": {
          "line": 46,
          "column": 23
        }
      }
    })) != null ? stack1 : "") + "            </li>\r\n          </ul>\r\n        </p>\r\n      </li>\r\n    </ul>\r\n    <p class='card-about'>About</p>\r\n    <p class='card-about-description'> " + alias4((helper = (helper = lookupProperty(helpers, "overview") || (depth0 != null ? lookupProperty(depth0, "overview") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
      "name": "overview",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 53,
          "column": 39
        },
        "end": {
          "line": 53,
          "column": 51
        }
      }
    }) : helper)) + "</p>\r\n    <div class='wrapper-button-modal'>\r\n      <button class='button button-modal button-watched-js'>add to Watched</button>\r\n      <button class='button button-modal button-queue-js'>add to queue</button>\r\n    </div>\r\n\r\n  </div>\r\n</div>";
  },
  "useData": true
});
var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"js/modal-card.js":[function(require,module,exports) {
"use strict";

var _newsService = _interopRequireDefault(require("./news-service"));
var _modal = _interopRequireDefault(require("../templates/modal.hbs"));
var _localStorage = require("./local-storage");
var _header = require("./header");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const apiService = new _newsService.default();
let movieId = '';
const refs = {
  galleryList: document.querySelector('.gallery-list'),
  backdrop: document.querySelector('.backdrop'),
  buttonModalClose: document.querySelector('.modal-close'),
  modalContent: document.querySelector('.modal-content'),
  buttonWatched: document.querySelector('.button-watched-js'),
  buttonQueue: document.querySelector('.button-queue-js'),
  body: document.querySelector('.body'),
  headerButtonQueue: document.querySelector('.button-header-queue-js'),
  headerButtonWatched: document.querySelector('.button-header-watched-js')
};
refs.galleryList.addEventListener('click', evt => {
  openModalFilm(evt);
});

/////// открыть модолку при клике на img вешаем класс/////
function openModalFilm(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  getMovieId(evt);
  refs.backdrop.classList.add('is-open');
  refs.body.classList.add('no-scroll');
  addModalListeners();
}
///////закрытие модалки при клике на бекдроп//////
function closeBackdrop(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalFilm();
  }
}
/////////закрытие модалки при нажатии кнопки Esc///////////////
function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closeModalFilm();
  }
}
/////////закрытие модалки при нажатии на крестик///////////////
function closeModalFilm(evt) {
  refs.backdrop.classList.remove('is-open');
  refs.modalContent.innerHTML = '';
  refs.body.classList.remove('no-scroll');
  removeModalListeners();
}
/////////добавляем слушатели при открытии модалки///////////////
function addModalListeners() {
  refs.buttonModalClose.addEventListener('click', closeModalFilm);
  refs.backdrop.addEventListener('click', closeBackdrop);
  refs.body.addEventListener('keyup', closeEsc);
}
/////////удаляем слушатели при закрытии модалки///////////////
function removeModalListeners() {
  refs.buttonModalClose.removeEventListener('click', closeModalFilm);
  refs.backdrop.removeEventListener('click', closeBackdrop);
  refs.body.removeEventListener('keyup', closeEsc);
}
// //////////рендер  модалки////
function getMovieId(evt) {
  movieId = evt.target.getAttribute('data-movie-id');
  // зaрос данных фильма по ID
  apiService.getFilmById(movieId).then(movie => {
    refs.modalContent.insertAdjacentHTML('beforeend', (0, _modal.default)(movie));
    setButtonsListeners();
  }).catch(err => {
    console.log(err);
  });
}

// ======== coхранение в localStorage ========
// ======== ищем кнопки и вешаем слушатели на них ========
function setButtonsListeners() {
  refs.buttonWatched = document.querySelector('.button-watched-js');
  refs.buttonQueue = document.querySelector('.button-queue-js');
  refs.buttonWatched.addEventListener('click', addWatched);
  refs.buttonQueue.addEventListener('click', addQueue);
  // ======== проверяем фильм в списках и добавляем класс active на кнопку ========
  checkLocalStorage();
}

// ======== проверяем фильм в списках и добавляем класс active на кнопку ========
function checkLocalStorage() {
  const watched = (0, _localStorage.getLocalStorage)('watched');
  if (watched && watched.includes(movieId)) {
    refs.buttonWatched.classList.add('button-active');
  }
  const queue = (0, _localStorage.getLocalStorage)('queue');
  if (queue && queue.includes(movieId)) {
    refs.buttonQueue.classList.add('button-active');
  }
}

// ======== при нажатии на buttonWatched добавляем фильи в watched ========
function addWatched(evt) {
  evt.preventDefault();
  // ======== получаем список фильмов watched из localStorage или null ========
  const watched = (0, _localStorage.getLocalStorage)('watched');
  if (watched) {
    if (watched.includes(movieId)) {
      // ======== удаляем фильм из watched в locatStorage, если он уже есть ========
      removeFromLocalStorage('watched', watched, refs.buttonWatched);
      refs.headerButtonQueue = document.querySelector('.button-header-queue-js');
      if (refs.headerButtonQueue) {
        if (refs.headerButtonQueue.classList.contains('button-active')) {
          //TODO: Обновляем гарелерею из либрари Queue
          (0, _header.renderQueueList)();
        } else {
          //TODO: Обновляем гарелерею из либрари Watched
          (0, _header.renderWathedList)();
        }
      }
      return;
    }
    // ======== добавляем фильм в watched в localStorage ========
    watched.push(movieId);
    (0, _localStorage.setLocalStorage)('watched', watched);
    // ======== вешаем класс active на кпопку buttonWatched ========
    refs.buttonWatched.classList.add('button-active');
  } else {
    // ======== создаем новый массив и записываем фильм в watched в localStorage ========
    addToLocalStorage('watched');
  }
  // ======== удаляем фильм в Queue из localStorage, если такой фильм есть ========
  removeFromQueue();
  refs.headerButtonQueue = document.querySelector('.button-header-queue-js');
  if (refs.headerButtonQueue) {
    if (refs.headerButtonQueue.classList.contains('button-active')) {
      //TODO: Обновляем гарелерею из либрари Queue
      (0, _header.renderQueueList)();
    } else {
      //TODO: Обновляем гарелерею из либрари Watched
      (0, _header.renderWathedList)();
    }
  }
}

// ======== при нажатии на buttonQueue добавляем фильмы в queue ========
function addQueue(evt) {
  evt.preventDefault();
  // ======== получаем список фильмов queue из localStorage или null ========
  const queue = (0, _localStorage.getLocalStorage)('queue');
  refs.headerButtonWatched = document.querySelector('.button-header-watched-js');
  if (queue) {
    if (queue.includes(movieId)) {
      // ======== удаляем фильм из queue в locatStorage, если он уже есть ========
      removeFromLocalStorage('queue', queue, refs.buttonQueue);
      if (refs.headerButtonWatched) {
        if (refs.headerButtonWatched.classList.contains('button-active')) {
          //TODO: Обновляем гарелерею из либрари Watched
          (0, _header.renderWathedList)();
        } else {
          //TODO: Обновляем гарелерею из либрари Queue
          (0, _header.renderQueueList)();
        }
      }
      return;
    }
    // ======== добавляем фильм в queue в localStorage ========
    queue.push(movieId);
    (0, _localStorage.setLocalStorage)('queue', queue);
    // ======== вешаем класс active на кпопку buttonQueue ========
    refs.buttonQueue.classList.add('button-active');
  } else {
    // ======== создаем новый массив и записываем фильм в queue в localStorage ========
    addToLocalStorage('queue');
  }
  // ======== удаляем фильм в Watched из localStorage, если такой фильм есть ========
  removeFromWatched();
  if (refs.headerButtonWatched) {
    if (refs.headerButtonWatched.classList.contains('button-active')) {
      //TODO: Обновляем гарелерею из либрари Watched
      (0, _header.renderWathedList)();
    } else {
      //TODO: Обновляем гарелерею из либрари Queue
      (0, _header.renderQueueList)();
    }
  }
}

// ======== при нажатии на buttonWatched удаляем фильм в queue ========
function removeFromQueue() {
  const queue = (0, _localStorage.getLocalStorage)('queue');
  if (queue && queue.includes(movieId)) {
    removeFromLocalStorage('queue', queue, refs.buttonQueue);
  }
}

// ======== при нажатии на buttonQueue удаляем фильм в watched ========
function removeFromWatched() {
  const watched = (0, _localStorage.getLocalStorage)('watched');
  if (watched && watched.includes(movieId)) {
    removeFromLocalStorage('watched', watched, refs.buttonWatched);
  }
}

//======== функция добавления нового массива в список по ключу ========
function addToLocalStorage(key) {
  const arr = [];
  arr.push(movieId);
  (0, _localStorage.setLocalStorage)(key, arr);
}

// ======== функция удаление фильма из localStorage ========
function removeFromLocalStorage(key, array, button) {
  const newArr = array.filter(id => id !== movieId);
  (0, _localStorage.setLocalStorage)(key, newArr);
  button.classList.remove('button-active');
  button.blur();
}
},{"./news-service":"js/news-service.js","../templates/modal.hbs":"templates/modal.hbs","./local-storage":"js/local-storage.js","./header":"js/header.js"}],"js/theme-switch.js":[function(require,module,exports) {
"use strict";

var _localStorage = require("./local-storage");
const refs = {
  body: document.querySelector('.body'),
  input: document.querySelector('#checkbox')
};
refs.input.addEventListener('change', themesWitch);

// ======== coхранение в localStorage ========
function checkedTheme() {
  const theme = (0, _localStorage.getLocalStorage)('theme');
  if (theme) {
    if (theme === 'dark') {
      refs.body.classList.add('dark-theme');
      refs.body.classList.remove('light-theme');
      refs.input.checked = true;
    } else {
      refs.body.classList.add('light-theme');
      refs.body.classList.remove('dark-theme');
      refs.input.checked = false;
    }
  } else {
    refs.body.classList.add('light-theme');
  }
}
checkedTheme();
function themesWitch(evt) {
  if (evt.target.checked) {
    refs.body.classList.add('dark-theme');
    refs.body.classList.remove('light-theme');
    (0, _localStorage.setLocalStorage)('theme', 'dark');
  } else {
    refs.body.classList.remove('dark-theme');
    refs.body.classList.add('light-theme');
    (0, _localStorage.setLocalStorage)('theme', 'light');
  }
}
},{"./local-storage":"js/local-storage.js"}],"../node_modules/vanilla-back-to-top/dist/vanilla-back-to-top.umd.js":[function(require,module,exports) {
var define;
"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.commonJsStrict = {});
  }
})(typeof self !== 'undefined' ? self : void 0, function (exports) {
  exports.addBackToTop = addBackToTop; // FUNCTION START

  'use strict';
  function addBackToTop() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _params$backgroundCol = params.backgroundColor,
      backgroundColor = _params$backgroundCol === void 0 ? '#000' : _params$backgroundCol,
      _params$cornerOffset = params.cornerOffset,
      cornerOffset = _params$cornerOffset === void 0 ? 20 : _params$cornerOffset,
      _params$diameter = params.diameter,
      diameter = _params$diameter === void 0 ? 56 : _params$diameter,
      _params$ease = params.ease,
      ease = _params$ease === void 0 ? inOutSine : _params$ease,
      _params$id = params.id,
      id = _params$id === void 0 ? 'back-to-top' : _params$id,
      _params$innerHTML = params.innerHTML,
      innerHTML = _params$innerHTML === void 0 ? '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>' : _params$innerHTML,
      _params$onClickScroll = params.onClickScrollTo,
      onClickScrollTo = _params$onClickScroll === void 0 ? 0 : _params$onClickScroll,
      _params$scrollContain = params.scrollContainer,
      scrollContainer = _params$scrollContain === void 0 ? document.body : _params$scrollContain,
      _params$scrollDuratio = params.scrollDuration,
      scrollDuration = _params$scrollDuratio === void 0 ? 100 : _params$scrollDuratio,
      _params$showWhenScrol = params.showWhenScrollTopIs,
      showWhenScrollTopIs = _params$showWhenScrol === void 0 ? 1 : _params$showWhenScrol,
      _params$size = params.size,
      size = _params$size === void 0 ? diameter : _params$size,
      _params$textColor = params.textColor,
      textColor = _params$textColor === void 0 ? '#fff' : _params$textColor,
      _params$zIndex = params.zIndex,
      zIndex = _params$zIndex === void 0 ? 1 : _params$zIndex;
    var scrollContainerIsBody = scrollContainer === document.body;
    var scrollDocumentElement = scrollContainerIsBody && document.documentElement;
    appendStyles();
    var upEl = appendElement();
    var hidden = true;
    var scrollEmitter = scrollContainerIsBody ? window : scrollContainer;
    scrollEmitter.addEventListener('scroll', adapt);
    adapt();
    function adapt() {
      getScrollTop() >= showWhenScrollTopIs ? show() : hide();
    }
    function show() {
      if (!hidden) {
        return;
      }
      upEl.className = '';
      hidden = false;
    }
    function hide() {
      if (hidden) {
        return;
      }
      upEl.className = 'hidden';
      hidden = true;
    }
    function appendElement() {
      var upEl = document.createElement('div');
      upEl.id = id;
      upEl.className = 'hidden';
      upEl.innerHTML = innerHTML;
      upEl.addEventListener('click', function (event) {
        event.preventDefault();
        scrollUp();
      });
      document.body.appendChild(upEl);
      return upEl;
    }
    function appendStyles() {
      var svgSize = Math.round(0.43 * size);
      var svgTop = Math.round(0.29 * size);
      var styles = '#' + id + '{background:' + backgroundColor + ';-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;bottom:' + cornerOffset + 'px;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);-moz-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26);color:' + textColor + ';cursor:pointer;display:block;height:' + size + 'px;opacity:1;outline:0;position:fixed;right:' + cornerOffset + 'px;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-transition:bottom .2s,opacity .2s;-o-transition:bottom .2s,opacity .2s;-moz-transition:bottom .2s,opacity .2s;transition:bottom .2s,opacity .2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:' + size + 'px;z-index:' + zIndex + '}#' + id + ' svg{display:block;fill:currentColor;height:' + svgSize + 'px;margin:' + svgTop + 'px auto 0;width:' + svgSize + 'px}#' + id + '.hidden{bottom:-' + size + 'px;opacity:0}';
      var styleEl = document.createElement('style');
      styleEl.appendChild(document.createTextNode(styles));
      document.head.insertAdjacentElement('afterbegin', styleEl);
    }
    function scrollUp() {
      var scrollTo = typeof onClickScrollTo === 'function' ? onClickScrollTo() : onClickScrollTo;
      var _window = window,
        performance = _window.performance,
        requestAnimationFrame = _window.requestAnimationFrame;
      if (scrollDuration <= 0 || typeof performance === 'undefined' || typeof requestAnimationFrame === 'undefined') {
        return setScrollTop(scrollTo);
      }
      var start = performance.now();
      var initScrollTop = getScrollTop();
      var pxsToScrollBy = initScrollTop - scrollTo;
      requestAnimationFrame(step);
      function step(timestamp) {
        var progress = Math.min((timestamp - start) / scrollDuration, 1);
        setScrollTop(initScrollTop - Math.round(ease(progress) * pxsToScrollBy));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
    }
    function getScrollTop() {
      return scrollContainer.scrollTop || scrollDocumentElement && document.documentElement.scrollTop || 0;
    }
    function setScrollTop(value) {
      scrollContainer.scrollTop = value;
      if (scrollDocumentElement) {
        document.documentElement.scrollTop = value;
      }
    }
    function inOutSine(n) {
      return 0.5 * (1 - Math.cos(Math.PI * n));
    }
  } // FUNCTION END
});
},{}],"js/to-top.js":[function(require,module,exports) {
"use strict";

var _vanillaBackToTop = require("vanilla-back-to-top");
(0, _vanillaBackToTop.addBackToTop)({
  diameter: 44,
  backgroundColor: '#ff6b08',
  textColor: '#fff'
});
},{"vanilla-back-to-top":"../node_modules/vanilla-back-to-top/dist/vanilla-back-to-top.umd.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./js/header");
require("./js/modal-card");
require("./js/io");
require("./js/theme-switch");
require("./js/to-top");
},{"./js/header":"js/header.js","./js/modal-card":"js/modal-card.js","./js/io":"js/io.js","./js/theme-switch":"js/theme-switch.js","./js/to-top":"js/to-top.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49851" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map