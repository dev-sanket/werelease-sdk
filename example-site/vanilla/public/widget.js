(function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    function bind(fn, thisArg) {
      return function wrap() {
        return fn.apply(thisArg, arguments);
      };
    }

    // utils is a library of generic helper functions non-specific to axios

    const {toString} = Object.prototype;
    const {getPrototypeOf} = Object;
    const {iterator, toStringTag} = Symbol;

    const kindOf = (cache => thing => {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(Object.create(null));

    const kindOfTest = (type) => {
      type = type.toLowerCase();
      return (thing) => kindOf(thing) === type
    };

    const typeOfTest = type => thing => typeof thing === type;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     *
     * @returns {boolean} True if value is an Array, otherwise false
     */
    const {isArray} = Array;

    /**
     * Determine if a value is undefined
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    const isUndefined = typeOfTest('undefined');

    /**
     * Determine if a value is a Buffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    const isArrayBuffer = kindOfTest('ArrayBuffer');


    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      let result;
      if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val);
      } else {
        result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
      }
      return result;
    }

    /**
     * Determine if a value is a String
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a String, otherwise false
     */
    const isString = typeOfTest('string');

    /**
     * Determine if a value is a Function
     *
     * @param {*} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    const isFunction = typeOfTest('function');

    /**
     * Determine if a value is a Number
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Number, otherwise false
     */
    const isNumber = typeOfTest('number');

    /**
     * Determine if a value is an Object
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an Object, otherwise false
     */
    const isObject = (thing) => thing !== null && typeof thing === 'object';

    /**
     * Determine if a value is a Boolean
     *
     * @param {*} thing The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */
    const isBoolean = thing => thing === true || thing === false;

    /**
     * Determine if a value is a plain Object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a plain Object, otherwise false
     */
    const isPlainObject = (val) => {
      if (kindOf(val) !== 'object') {
        return false;
      }

      const prototype = getPrototypeOf(val);
      return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(toStringTag in val) && !(iterator in val);
    };

    /**
     * Determine if a value is an empty object (safely handles Buffers)
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is an empty object, otherwise false
     */
    const isEmptyObject = (val) => {
      // Early return for non-objects or Buffers to prevent RangeError
      if (!isObject(val) || isBuffer(val)) {
        return false;
      }
      
      try {
        return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
      } catch (e) {
        // Fallback for any other objects that might cause RangeError with Object.keys()
        return false;
      }
    };

    /**
     * Determine if a value is a Date
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Date, otherwise false
     */
    const isDate$1 = kindOfTest('Date');

    /**
     * Determine if a value is a File
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFile = kindOfTest('File');

    /**
     * Determine if a value is a Blob
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    const isBlob = kindOfTest('Blob');

    /**
     * Determine if a value is a FileList
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFileList = kindOfTest('FileList');

    /**
     * Determine if a value is a Stream
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    const isStream = (val) => isObject(val) && isFunction(val.pipe);

    /**
     * Determine if a value is a FormData
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    const isFormData = (thing) => {
      let kind;
      return thing && (
        (typeof FormData === 'function' && thing instanceof FormData) || (
          isFunction(thing.append) && (
            (kind = kindOf(thing)) === 'formdata' ||
            // detect form-data instance
            (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
          )
        )
      )
    };

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    const isURLSearchParams = kindOfTest('URLSearchParams');

    const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     *
     * @returns {String} The String freed of excess whitespace
     */
    const trim = (str) => str.trim ?
      str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     *
     * @param {Boolean} [allOwnKeys = false]
     * @returns {any}
     */
    function forEach(obj, fn, {allOwnKeys = false} = {}) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      let i;
      let l;

      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Buffer check
        if (isBuffer(obj)) {
          return;
        }

        // Iterate over object keys
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;

        for (i = 0; i < len; i++) {
          key = keys[i];
          fn.call(null, obj[key], key, obj);
        }
      }
    }

    function findKey$1(obj, key) {
      if (isBuffer(obj)){
        return null;
      }

      key = key.toLowerCase();
      const keys = Object.keys(obj);
      let i = keys.length;
      let _key;
      while (i-- > 0) {
        _key = keys[i];
        if (key === _key.toLowerCase()) {
          return _key;
        }
      }
      return null;
    }

    const _global = (() => {
      /*eslint no-undef:0*/
      if (typeof globalThis !== "undefined") return globalThis;
      return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
    })();

    const isContextDefined = (context) => !isUndefined(context) && context !== _global;

    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     *
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      const {caseless} = isContextDefined(this) && this || {};
      const result = {};
      const assignValue = (val, key) => {
        const targetKey = caseless && findKey$1(result, key) || key;
        if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
          result[targetKey] = merge(result[targetKey], val);
        } else if (isPlainObject(val)) {
          result[targetKey] = merge({}, val);
        } else if (isArray(val)) {
          result[targetKey] = val.slice();
        } else {
          result[targetKey] = val;
        }
      };

      for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     *
     * @param {Boolean} [allOwnKeys]
     * @returns {Object} The resulting value of object a
     */
    const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
      forEach(b, (val, key) => {
        if (thisArg && isFunction(val)) {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      }, {allOwnKeys});
      return a;
    };

    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     *
     * @returns {string} content value without BOM
     */
    const stripBOM = (content) => {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    };

    /**
     * Inherit the prototype methods from one constructor into another
     * @param {function} constructor
     * @param {function} superConstructor
     * @param {object} [props]
     * @param {object} [descriptors]
     *
     * @returns {void}
     */
    const inherits = (constructor, superConstructor, props, descriptors) => {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      Object.defineProperty(constructor, 'super', {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };

    /**
     * Resolve object with deep prototype chain to a flat object
     * @param {Object} sourceObj source object
     * @param {Object} [destObj]
     * @param {Function|Boolean} [filter]
     * @param {Function} [propFilter]
     *
     * @returns {Object}
     */
    const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
      let props;
      let i;
      let prop;
      const merged = {};

      destObj = destObj || {};
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (sourceObj == null) return destObj;

      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

      return destObj;
    };

    /**
     * Determines whether a string ends with the characters of a specified string
     *
     * @param {String} str
     * @param {String} searchString
     * @param {Number} [position= 0]
     *
     * @returns {boolean}
     */
    const endsWith = (str, searchString, position) => {
      str = String(str);
      if (position === undefined || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      const lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };


    /**
     * Returns new array from array like object or null if failed
     *
     * @param {*} [thing]
     *
     * @returns {?Array}
     */
    const toArray = (thing) => {
      if (!thing) return null;
      if (isArray(thing)) return thing;
      let i = thing.length;
      if (!isNumber(i)) return null;
      const arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    };

    /**
     * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
     * thing passed in is an instance of Uint8Array
     *
     * @param {TypedArray}
     *
     * @returns {Array}
     */
    // eslint-disable-next-line func-names
    const isTypedArray = (TypedArray => {
      // eslint-disable-next-line func-names
      return thing => {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

    /**
     * For each entry in the object, call the function with the key and value.
     *
     * @param {Object<any, any>} obj - The object to iterate over.
     * @param {Function} fn - The function to call for each entry.
     *
     * @returns {void}
     */
    const forEachEntry = (obj, fn) => {
      const generator = obj && obj[iterator];

      const _iterator = generator.call(obj);

      let result;

      while ((result = _iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };

    /**
     * It takes a regular expression and a string, and returns an array of all the matches
     *
     * @param {string} regExp - The regular expression to match against.
     * @param {string} str - The string to search.
     *
     * @returns {Array<boolean>}
     */
    const matchAll = (regExp, str) => {
      let matches;
      const arr = [];

      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }

      return arr;
    };

    /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
    const isHTMLForm = kindOfTest('HTMLFormElement');

    const toCamelCase = str => {
      return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
        function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        }
      );
    };

    /* Creating a function that will check if an object has a property. */
    const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

    /**
     * Determine if a value is a RegExp object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a RegExp object, otherwise false
     */
    const isRegExp = kindOfTest('RegExp');

    const reduceDescriptors = (obj, reducer) => {
      const descriptors = Object.getOwnPropertyDescriptors(obj);
      const reducedDescriptors = {};

      forEach(descriptors, (descriptor, name) => {
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) {
          reducedDescriptors[name] = ret || descriptor;
        }
      });

      Object.defineProperties(obj, reducedDescriptors);
    };

    /**
     * Makes all methods read-only
     * @param {Object} obj
     */

    const freezeMethods = (obj) => {
      reduceDescriptors(obj, (descriptor, name) => {
        // skip restricted props in strict mode
        if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
          return false;
        }

        const value = obj[name];

        if (!isFunction(value)) return;

        descriptor.enumerable = false;

        if ('writable' in descriptor) {
          descriptor.writable = false;
          return;
        }

        if (!descriptor.set) {
          descriptor.set = () => {
            throw Error('Can not rewrite read-only method \'' + name + '\'');
          };
        }
      });
    };

    const toObjectSet = (arrayOrString, delimiter) => {
      const obj = {};

      const define = (arr) => {
        arr.forEach(value => {
          obj[value] = true;
        });
      };

      isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

      return obj;
    };

    const noop = () => {};

    const toFiniteNumber = (value, defaultValue) => {
      return value != null && Number.isFinite(value = +value) ? value : defaultValue;
    };

    /**
     * If the thing is a FormData object, return true, otherwise return false.
     *
     * @param {unknown} thing - The thing to check.
     *
     * @returns {boolean}
     */
    function isSpecCompliantForm(thing) {
      return !!(thing && isFunction(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator]);
    }

    const toJSONObject = (obj) => {
      const stack = new Array(10);

      const visit = (source, i) => {

        if (isObject(source)) {
          if (stack.indexOf(source) >= 0) {
            return;
          }

          //Buffer check
          if (isBuffer(source)) {
            return source;
          }

          if(!('toJSON' in source)) {
            stack[i] = source;
            const target = isArray(source) ? [] : {};

            forEach(source, (value, key) => {
              const reducedValue = visit(value, i + 1);
              !isUndefined(reducedValue) && (target[key] = reducedValue);
            });

            stack[i] = undefined;

            return target;
          }
        }

        return source;
      };

      return visit(obj, 0);
    };

    const isAsyncFn = kindOfTest('AsyncFunction');

    const isThenable = (thing) =>
      thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

    // original code
    // https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

    const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
      if (setImmediateSupported) {
        return setImmediate;
      }

      return postMessageSupported ? ((token, callbacks) => {
        _global.addEventListener("message", ({source, data}) => {
          if (source === _global && data === token) {
            callbacks.length && callbacks.shift()();
          }
        }, false);

        return (cb) => {
          callbacks.push(cb);
          _global.postMessage(token, "*");
        }
      })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
    })(
      typeof setImmediate === 'function',
      isFunction(_global.postMessage)
    );

    const asap = typeof queueMicrotask !== 'undefined' ?
      queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

    // *********************


    const isIterable = (thing) => thing != null && isFunction(thing[iterator]);


    var utils$1 = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isBoolean,
      isObject,
      isPlainObject,
      isEmptyObject,
      isReadableStream,
      isRequest,
      isResponse,
      isHeaders,
      isUndefined,
      isDate: isDate$1,
      isFile,
      isBlob,
      isRegExp,
      isFunction,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty,
      hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop,
      toFiniteNumber,
      findKey: findKey$1,
      global: _global,
      isContextDefined,
      isSpecCompliantForm,
      toJSONObject,
      isAsyncFn,
      isThenable,
      setImmediate: _setImmediate,
      asap,
      isIterable
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    function AxiosError$1(message, code, config, request, response) {
      Error.call(this);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = (new Error()).stack;
      }

      this.message = message;
      this.name = 'AxiosError';
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      if (response) {
        this.response = response;
        this.status = response.status ? response.status : null;
      }
    }

    utils$1.inherits(AxiosError$1, Error, {
      toJSON: function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: utils$1.toJSONObject(this.config),
          code: this.code,
          status: this.status
        };
      }
    });

    const prototype$1 = AxiosError$1.prototype;
    const descriptors = {};

    [
      'ERR_BAD_OPTION_VALUE',
      'ERR_BAD_OPTION',
      'ECONNABORTED',
      'ETIMEDOUT',
      'ERR_NETWORK',
      'ERR_FR_TOO_MANY_REDIRECTS',
      'ERR_DEPRECATED',
      'ERR_BAD_RESPONSE',
      'ERR_BAD_REQUEST',
      'ERR_CANCELED',
      'ERR_NOT_SUPPORT',
      'ERR_INVALID_URL'
    // eslint-disable-next-line func-names
    ].forEach(code => {
      descriptors[code] = {value: code};
    });

    Object.defineProperties(AxiosError$1, descriptors);
    Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

    // eslint-disable-next-line func-names
    AxiosError$1.from = (error, code, config, request, response, customProps) => {
      const axiosError = Object.create(prototype$1);

      utils$1.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      }, prop => {
        return prop !== 'isAxiosError';
      });

      AxiosError$1.call(axiosError, error.message, code, config, request, response);

      axiosError.cause = error;

      axiosError.name = error.name;

      customProps && Object.assign(axiosError, customProps);

      return axiosError;
    };

    // eslint-disable-next-line strict
    var httpAdapter = null;

    /**
     * Determines if the given thing is a array or js object.
     *
     * @param {string} thing - The object or array to be visited.
     *
     * @returns {boolean}
     */
    function isVisitable(thing) {
      return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
    }

    /**
     * It removes the brackets from the end of a string
     *
     * @param {string} key - The key of the parameter.
     *
     * @returns {string} the key without the brackets.
     */
    function removeBrackets(key) {
      return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
    }

    /**
     * It takes a path, a key, and a boolean, and returns a string
     *
     * @param {string} path - The path to the current key.
     * @param {string} key - The key of the current object being iterated over.
     * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
     *
     * @returns {string} The path to the current key.
     */
    function renderKey(path, key, dots) {
      if (!path) return key;
      return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
      }).join(dots ? '.' : '');
    }

    /**
     * If the array is an array and none of its elements are visitable, then it's a flat array.
     *
     * @param {Array<any>} arr - The array to check
     *
     * @returns {boolean}
     */
    function isFlatArray(arr) {
      return utils$1.isArray(arr) && !arr.some(isVisitable);
    }

    const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
      return /^is[A-Z]/.test(prop);
    });

    /**
     * Convert a data object to FormData
     *
     * @param {Object} obj
     * @param {?Object} [formData]
     * @param {?Object} [options]
     * @param {Function} [options.visitor]
     * @param {Boolean} [options.metaTokens = true]
     * @param {Boolean} [options.dots = false]
     * @param {?Boolean} [options.indexes = false]
     *
     * @returns {Object}
     **/

    /**
     * It converts an object into a FormData object
     *
     * @param {Object<any, any>} obj - The object to convert to form data.
     * @param {string} formData - The FormData object to append to.
     * @param {Object<string, any>} options
     *
     * @returns
     */
    function toFormData$1(obj, formData, options) {
      if (!utils$1.isObject(obj)) {
        throw new TypeError('target must be an object');
      }

      // eslint-disable-next-line no-param-reassign
      formData = formData || new (FormData)();

      // eslint-disable-next-line no-param-reassign
      options = utils$1.toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
      }, false, function defined(option, source) {
        // eslint-disable-next-line no-eq-null,eqeqeq
        return !utils$1.isUndefined(source[option]);
      });

      const metaTokens = options.metaTokens;
      // eslint-disable-next-line no-use-before-define
      const visitor = options.visitor || defaultVisitor;
      const dots = options.dots;
      const indexes = options.indexes;
      const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
      const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

      if (!utils$1.isFunction(visitor)) {
        throw new TypeError('visitor must be a function');
      }

      function convertValue(value) {
        if (value === null) return '';

        if (utils$1.isDate(value)) {
          return value.toISOString();
        }

        if (utils$1.isBoolean(value)) {
          return value.toString();
        }

        if (!useBlob && utils$1.isBlob(value)) {
          throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
        }

        if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
          return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }

        return value;
      }

      /**
       * Default visitor.
       *
       * @param {*} value
       * @param {String|Number} key
       * @param {Array<String|Number>} path
       * @this {FormData}
       *
       * @returns {boolean} return true to visit the each prop of the value recursively
       */
      function defaultVisitor(value, key, path) {
        let arr = value;

        if (value && !path && typeof value === 'object') {
          if (utils$1.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            key = metaTokens ? key : key.slice(0, -2);
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (
            (utils$1.isArray(value) && isFlatArray(value)) ||
            ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
            )) {
            // eslint-disable-next-line no-param-reassign
            key = removeBrackets(key);

            arr.forEach(function each(el, index) {
              !(utils$1.isUndefined(el) || el === null) && formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
                convertValue(el)
              );
            });
            return false;
          }
        }

        if (isVisitable(value)) {
          return true;
        }

        formData.append(renderKey(path, key, dots), convertValue(value));

        return false;
      }

      const stack = [];

      const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
      });

      function build(value, path) {
        if (utils$1.isUndefined(value)) return;

        if (stack.indexOf(value) !== -1) {
          throw Error('Circular reference detected in ' + path.join('.'));
        }

        stack.push(value);

        utils$1.forEach(value, function each(el, key) {
          const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
            formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
          );

          if (result === true) {
            build(el, path ? path.concat(key) : [key]);
          }
        });

        stack.pop();
      }

      if (!utils$1.isObject(obj)) {
        throw new TypeError('data must be an object');
      }

      build(obj);

      return formData;
    }

    /**
     * It encodes a string by replacing all characters that are not in the unreserved set with
     * their percent-encoded equivalents
     *
     * @param {string} str - The string to encode.
     *
     * @returns {string} The encoded string.
     */
    function encode$1(str) {
      const charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
      });
    }

    /**
     * It takes a params object and converts it to a FormData object
     *
     * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
     * @param {Object<string, any>} options - The options object passed to the Axios constructor.
     *
     * @returns {void}
     */
    function AxiosURLSearchParams(params, options) {
      this._pairs = [];

      params && toFormData$1(params, this, options);
    }

    const prototype = AxiosURLSearchParams.prototype;

    prototype.append = function append(name, value) {
      this._pairs.push([name, value]);
    };

    prototype.toString = function toString(encoder) {
      const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;

      return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
      }, '').join('&');
    };

    /**
     * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
     * URI encoded counterparts
     *
     * @param {string} val The value to be encoded.
     *
     * @returns {string} The encoded value.
     */
    function encode(val) {
      return encodeURIComponent(val).
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
    }

    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @param {?(object|Function)} options
     *
     * @returns {string} The formatted url
     */
    function buildURL(url, params, options) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }
      
      const _encode = options && options.encode || encode;

      if (utils$1.isFunction(options)) {
        options = {
          serialize: options
        };
      } 

      const serializeFn = options && options.serialize;

      let serializedParams;

      if (serializeFn) {
        serializedParams = serializeFn(params, options);
      } else {
        serializedParams = utils$1.isURLSearchParams(params) ?
          params.toString() :
          new AxiosURLSearchParams(params, options).toString(_encode);
      }

      if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");

        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    }

    class InterceptorManager {
      constructor() {
        this.handlers = [];
      }

      /**
       * Add a new interceptor to the stack
       *
       * @param {Function} fulfilled The function to handle `then` for a `Promise`
       * @param {Function} rejected The function to handle `reject` for a `Promise`
       *
       * @return {Number} An ID used to remove interceptor later
       */
      use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }

      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
       */
      eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }

      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
      clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }

      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
      forEach(fn) {
        utils$1.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      }
    }

    var transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };

    var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

    var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

    var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

    var platform$1 = {
      isBrowser: true,
      classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob: Blob$1
      },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
    };

    const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

    const _navigator = typeof navigator === 'object' && navigator || undefined;

    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     *
     * @returns {boolean}
     */
    const hasStandardBrowserEnv = hasBrowserEnv &&
      (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

    /**
     * Determine if we're running in a standard browser webWorker environment
     *
     * Although the `isStandardBrowserEnv` method indicates that
     * `allows axios to run in a web worker`, the WebWorker will still be
     * filtered out due to its judgment standard
     * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
     * This leads to a problem when axios post `FormData` in webWorker
     */
    const hasStandardBrowserWebWorkerEnv = (() => {
      return (
        typeof WorkerGlobalScope !== 'undefined' &&
        // eslint-disable-next-line no-undef
        self instanceof WorkerGlobalScope &&
        typeof self.importScripts === 'function'
      );
    })();

    const origin = hasBrowserEnv && window.location.href || 'http://localhost';

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        hasBrowserEnv: hasBrowserEnv,
        hasStandardBrowserEnv: hasStandardBrowserEnv,
        hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
        navigator: _navigator,
        origin: origin
    });

    var platform = {
      ...utils,
      ...platform$1
    };

    function toURLEncodedForm(data, options) {
      return toFormData$1(data, new platform.classes.URLSearchParams(), {
        visitor: function(value, key, path, helpers) {
          if (platform.isNode && utils$1.isBuffer(value)) {
            this.append(key, value.toString('base64'));
            return false;
          }

          return helpers.defaultVisitor.apply(this, arguments);
        },
        ...options
      });
    }

    /**
     * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
     *
     * @param {string} name - The name of the property to get.
     *
     * @returns An array of strings.
     */
    function parsePropPath(name) {
      // foo[x][y][z]
      // foo.x.y.z
      // foo-x-y-z
      // foo x y z
      return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
        return match[0] === '[]' ? '' : match[1] || match[0];
      });
    }

    /**
     * Convert an array to an object.
     *
     * @param {Array<any>} arr - The array to convert to an object.
     *
     * @returns An object with the same keys and values as the array.
     */
    function arrayToObject(arr) {
      const obj = {};
      const keys = Object.keys(arr);
      let i;
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = arr[key];
      }
      return obj;
    }

    /**
     * It takes a FormData object and returns a JavaScript object
     *
     * @param {string} formData The FormData object to convert to JSON.
     *
     * @returns {Object<string, any> | null} The converted object.
     */
    function formDataToJSON(formData) {
      function buildPath(path, value, target, index) {
        let name = path[index++];

        if (name === '__proto__') return true;

        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && utils$1.isArray(target) ? target.length : name;

        if (isLast) {
          if (utils$1.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }

          return !isNumericKey;
        }

        if (!target[name] || !utils$1.isObject(target[name])) {
          target[name] = [];
        }

        const result = buildPath(path, value, target[name], index);

        if (result && utils$1.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }

        return !isNumericKey;
      }

      if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
        const obj = {};

        utils$1.forEachEntry(formData, (name, value) => {
          buildPath(parsePropPath(name), value, obj, 0);
        });

        return obj;
      }

      return null;
    }

    /**
     * It takes a string, tries to parse it, and if it fails, it returns the stringified version
     * of the input
     *
     * @param {any} rawValue - The value to be stringified.
     * @param {Function} parser - A function that parses a string into a JavaScript object.
     * @param {Function} encoder - A function that takes a value and returns a string.
     *
     * @returns {string} A stringified version of the rawValue.
     */
    function stringifySafely(rawValue, parser, encoder) {
      if (utils$1.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils$1.trim(rawValue);
        } catch (e) {
          if (e.name !== 'SyntaxError') {
            throw e;
          }
        }
      }

      return (encoder || JSON.stringify)(rawValue);
    }

    const defaults = {

      transitional: transitionalDefaults,

      adapter: ['xhr', 'http', 'fetch'],

      transformRequest: [function transformRequest(data, headers) {
        const contentType = headers.getContentType() || '';
        const hasJSONContentType = contentType.indexOf('application/json') > -1;
        const isObjectPayload = utils$1.isObject(data);

        if (isObjectPayload && utils$1.isHTMLForm(data)) {
          data = new FormData(data);
        }

        const isFormData = utils$1.isFormData(data);

        if (isFormData) {
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }

        if (utils$1.isArrayBuffer(data) ||
          utils$1.isBuffer(data) ||
          utils$1.isStream(data) ||
          utils$1.isFile(data) ||
          utils$1.isBlob(data) ||
          utils$1.isReadableStream(data)
        ) {
          return data;
        }
        if (utils$1.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils$1.isURLSearchParams(data)) {
          headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
          return data.toString();
        }

        let isFileList;

        if (isObjectPayload) {
          if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString();
          }

          if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
            const _FormData = this.env && this.env.FormData;

            return toFormData$1(
              isFileList ? {'files[]': data} : data,
              _FormData && new _FormData(),
              this.formSerializer
            );
          }
        }

        if (isObjectPayload || hasJSONContentType ) {
          headers.setContentType('application/json', false);
          return stringifySafely(data);
        }

        return data;
      }],

      transformResponse: [function transformResponse(data) {
        const transitional = this.transitional || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const JSONRequested = this.responseType === 'json';

        if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
          return data;
        }

        if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;

          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }

        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,

      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',

      maxContentLength: -1,
      maxBodyLength: -1,

      env: {
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
      },

      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },

      headers: {
        common: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': undefined
        }
      }
    };

    utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
      defaults.headers[method] = {};
    });

    // RawAxiosHeaders whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    const ignoreDuplicateOf = utils$1.toObjectSet([
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ]);

    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} rawHeaders Headers needing to be parsed
     *
     * @returns {Object} Headers parsed into an object
     */
    var parseHeaders = rawHeaders => {
      const parsed = {};
      let key;
      let val;
      let i;

      rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();

        if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
          return;
        }

        if (key === 'set-cookie') {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });

      return parsed;
    };

    const $internals = Symbol('internals');

    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }

    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }

      return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
    }

    function parseTokens(str) {
      const tokens = Object.create(null);
      const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      let match;

      while ((match = tokensRE.exec(str))) {
        tokens[match[1]] = match[2];
      }

      return tokens;
    }

    const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

    function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
      if (utils$1.isFunction(filter)) {
        return filter.call(this, value, header);
      }

      if (isHeaderNameFilter) {
        value = header;
      }

      if (!utils$1.isString(value)) return;

      if (utils$1.isString(filter)) {
        return value.indexOf(filter) !== -1;
      }

      if (utils$1.isRegExp(filter)) {
        return filter.test(value);
      }
    }

    function formatHeader(header) {
      return header.trim()
        .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
          return char.toUpperCase() + str;
        });
    }

    function buildAccessors(obj, header) {
      const accessorName = utils$1.toCamelCase(' ' + header);

      ['get', 'set', 'has'].forEach(methodName => {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }

    let AxiosHeaders$1 = class AxiosHeaders {
      constructor(headers) {
        headers && this.set(headers);
      }

      set(header, valueOrRewrite, rewrite) {
        const self = this;

        function setHeader(_value, _header, _rewrite) {
          const lHeader = normalizeHeader(_header);

          if (!lHeader) {
            throw new Error('header name must be a non-empty string');
          }

          const key = utils$1.findKey(self, lHeader);

          if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
            self[key || _header] = normalizeValue(_value);
          }
        }

        const setHeaders = (headers, _rewrite) =>
          utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

        if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
          setHeaders(header, valueOrRewrite);
        } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
          setHeaders(parseHeaders(header), valueOrRewrite);
        } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
          let obj = {}, dest, key;
          for (const entry of header) {
            if (!utils$1.isArray(entry)) {
              throw TypeError('Object iterator must return a key-value pair');
            }

            obj[key = entry[0]] = (dest = obj[key]) ?
              (utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]]) : entry[1];
          }

          setHeaders(obj, valueOrRewrite);
        } else {
          header != null && setHeader(valueOrRewrite, header, rewrite);
        }

        return this;
      }

      get(header, parser) {
        header = normalizeHeader(header);

        if (header) {
          const key = utils$1.findKey(this, header);

          if (key) {
            const value = this[key];

            if (!parser) {
              return value;
            }

            if (parser === true) {
              return parseTokens(value);
            }

            if (utils$1.isFunction(parser)) {
              return parser.call(this, value, key);
            }

            if (utils$1.isRegExp(parser)) {
              return parser.exec(value);
            }

            throw new TypeError('parser must be boolean|regexp|function');
          }
        }
      }

      has(header, matcher) {
        header = normalizeHeader(header);

        if (header) {
          const key = utils$1.findKey(this, header);

          return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }

        return false;
      }

      delete(header, matcher) {
        const self = this;
        let deleted = false;

        function deleteHeader(_header) {
          _header = normalizeHeader(_header);

          if (_header) {
            const key = utils$1.findKey(self, _header);

            if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
              delete self[key];

              deleted = true;
            }
          }
        }

        if (utils$1.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }

        return deleted;
      }

      clear(matcher) {
        const keys = Object.keys(this);
        let i = keys.length;
        let deleted = false;

        while (i--) {
          const key = keys[i];
          if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
            delete this[key];
            deleted = true;
          }
        }

        return deleted;
      }

      normalize(format) {
        const self = this;
        const headers = {};

        utils$1.forEach(this, (value, header) => {
          const key = utils$1.findKey(headers, header);

          if (key) {
            self[key] = normalizeValue(value);
            delete self[header];
            return;
          }

          const normalized = format ? formatHeader(header) : String(header).trim();

          if (normalized !== header) {
            delete self[header];
          }

          self[normalized] = normalizeValue(value);

          headers[normalized] = true;
        });

        return this;
      }

      concat(...targets) {
        return this.constructor.concat(this, ...targets);
      }

      toJSON(asStrings) {
        const obj = Object.create(null);

        utils$1.forEach(this, (value, header) => {
          value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
        });

        return obj;
      }

      [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }

      toString() {
        return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
      }

      getSetCookie() {
        return this.get("set-cookie") || [];
      }

      get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
      }

      static from(thing) {
        return thing instanceof this ? thing : new this(thing);
      }

      static concat(first, ...targets) {
        const computed = new this(first);

        targets.forEach((target) => computed.set(target));

        return computed;
      }

      static accessor(header) {
        const internals = this[$internals] = (this[$internals] = {
          accessors: {}
        });

        const accessors = internals.accessors;
        const prototype = this.prototype;

        function defineAccessor(_header) {
          const lHeader = normalizeHeader(_header);

          if (!accessors[lHeader]) {
            buildAccessors(prototype, _header);
            accessors[lHeader] = true;
          }
        }

        utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

        return this;
      }
    };

    AxiosHeaders$1.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

    // reserved names hotfix
    utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({value}, key) => {
      let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
      return {
        get: () => value,
        set(headerValue) {
          this[mapped] = headerValue;
        }
      }
    });

    utils$1.freezeMethods(AxiosHeaders$1);

    /**
     * Transform the data for a request or a response
     *
     * @param {Array|Function} fns A single function or Array of functions
     * @param {?Object} response The response object
     *
     * @returns {*} The resulting transformed data
     */
    function transformData(fns, response) {
      const config = this || defaults;
      const context = response || config;
      const headers = AxiosHeaders$1.from(context.headers);
      let data = context.data;

      utils$1.forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
      });

      headers.normalize();

      return data;
    }

    function isCancel$1(value) {
      return !!(value && value.__CANCEL__);
    }

    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @param {string=} message The message.
     * @param {Object=} config The config.
     * @param {Object=} request The request.
     *
     * @returns {CanceledError} The created error.
     */
    function CanceledError$1(message, config, request) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      AxiosError$1.call(this, message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
      this.name = 'CanceledError';
    }

    utils$1.inherits(CanceledError$1, AxiosError$1, {
      __CANCEL__: true
    });

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     *
     * @returns {object} The response.
     */
    function settle(resolve, reject, response) {
      const validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError$1(
          'Request failed with status code ' + response.status,
          [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    }

    function parseProtocol(url) {
      const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || '';
    }

    /**
     * Calculate data maxRate
     * @param {Number} [samplesCount= 10]
     * @param {Number} [min= 1000]
     * @returns {Function}
     */
    function speedometer(samplesCount, min) {
      samplesCount = samplesCount || 10;
      const bytes = new Array(samplesCount);
      const timestamps = new Array(samplesCount);
      let head = 0;
      let tail = 0;
      let firstSampleTS;

      min = min !== undefined ? min : 1000;

      return function push(chunkLength) {
        const now = Date.now();

        const startedAt = timestamps[tail];

        if (!firstSampleTS) {
          firstSampleTS = now;
        }

        bytes[head] = chunkLength;
        timestamps[head] = now;

        let i = tail;
        let bytesCount = 0;

        while (i !== head) {
          bytesCount += bytes[i++];
          i = i % samplesCount;
        }

        head = (head + 1) % samplesCount;

        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }

        if (now - firstSampleTS < min) {
          return;
        }

        const passed = startedAt && now - startedAt;

        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
      };
    }

    /**
     * Throttle decorator
     * @param {Function} fn
     * @param {Number} freq
     * @return {Function}
     */
    function throttle(fn, freq) {
      let timestamp = 0;
      let threshold = 1000 / freq;
      let lastArgs;
      let timer;

      const invoke = (args, now = Date.now()) => {
        timestamp = now;
        lastArgs = null;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        fn(...args);
      };

      const throttled = (...args) => {
        const now = Date.now();
        const passed = now - timestamp;
        if ( passed >= threshold) {
          invoke(args, now);
        } else {
          lastArgs = args;
          if (!timer) {
            timer = setTimeout(() => {
              timer = null;
              invoke(lastArgs);
            }, threshold - passed);
          }
        }
      };

      const flush = () => lastArgs && invoke(lastArgs);

      return [throttled, flush];
    }

    const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
      let bytesNotified = 0;
      const _speedometer = speedometer(50, 250);

      return throttle(e => {
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;

        bytesNotified = loaded;

        const data = {
          loaded,
          total,
          progress: total ? (loaded / total) : undefined,
          bytes: progressBytes,
          rate: rate ? rate : undefined,
          estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
          event: e,
          lengthComputable: total != null,
          [isDownloadStream ? 'download' : 'upload']: true
        };

        listener(data);
      }, freq);
    };

    const progressEventDecorator = (total, throttled) => {
      const lengthComputable = total != null;

      return [(loaded) => throttled[0]({
        lengthComputable,
        total,
        loaded
      }), throttled[1]];
    };

    const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

    var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
      url = new URL(url, platform.origin);

      return (
        origin.protocol === url.protocol &&
        origin.host === url.host &&
        (isMSIE || origin.port === url.port)
      );
    })(
      new URL(platform.origin),
      platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
    ) : () => true;

    var cookies = platform.hasStandardBrowserEnv ?

      // Standard browser envs support document.cookie
      {
        write(name, value, expires, path, domain, secure) {
          const cookie = [name + '=' + encodeURIComponent(value)];

          utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

          utils$1.isString(path) && cookie.push('path=' + path);

          utils$1.isString(domain) && cookie.push('domain=' + domain);

          secure === true && cookie.push('secure');

          document.cookie = cookie.join('; ');
        },

        read(name) {
          const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      }

      :

      // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {},
        read() {
          return null;
        },
        remove() {}
      };

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     *
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     *
     * @returns {string} The combined URL
     */
    function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    }

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     *
     * @returns {string} The combined full path
     */
    function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
      let isRelativeUrl = !isAbsoluteURL(requestedURL);
      if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    }

    const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     *
     * @returns {Object} New object resulting from merging config2 to config1
     */
    function mergeConfig$1(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      const config = {};

      function getMergedValue(target, source, prop, caseless) {
        if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
          return utils$1.merge.call({caseless}, target, source);
        } else if (utils$1.isPlainObject(source)) {
          return utils$1.merge({}, source);
        } else if (utils$1.isArray(source)) {
          return source.slice();
        }
        return source;
      }

      // eslint-disable-next-line consistent-return
      function mergeDeepProperties(a, b, prop , caseless) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(a, b, prop , caseless);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(undefined, a, prop , caseless);
        }
      }

      // eslint-disable-next-line consistent-return
      function valueFromConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(undefined, b);
        }
      }

      // eslint-disable-next-line consistent-return
      function defaultToConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(undefined, b);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(undefined, a);
        }
      }

      // eslint-disable-next-line consistent-return
      function mergeDirectKeys(a, b, prop) {
        if (prop in config2) {
          return getMergedValue(a, b);
        } else if (prop in config1) {
          return getMergedValue(undefined, a);
        }
      }

      const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        withXSRFToken: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a, b , prop) => mergeDeepProperties(headersToObject(a), headersToObject(b),prop, true)
      };

      utils$1.forEach(Object.keys({...config1, ...config2}), function computeConfigValue(prop) {
        const merge = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge(config1[prop], config2[prop], prop);
        (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
      });

      return config;
    }

    var resolveConfig = (config) => {
      const newConfig = mergeConfig$1({}, config);

      let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

      newConfig.headers = headers = AxiosHeaders$1.from(headers);

      newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

      // HTTP basic authentication
      if (auth) {
        headers.set('Authorization', 'Basic ' +
          btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
        );
      }

      let contentType;

      if (utils$1.isFormData(data)) {
        if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
          headers.setContentType(undefined); // Let the browser set it
        } else if ((contentType = headers.getContentType()) !== false) {
          // fix semicolon duplication issue for ReactNative FormData implementation
          const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
          headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
        }
      }

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.

      if (platform.hasStandardBrowserEnv) {
        withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

        if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
          // Add xsrf header
          const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

          if (xsrfValue) {
            headers.set(xsrfHeaderName, xsrfValue);
          }
        }
      }

      return newConfig;
    };

    const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

    var xhrAdapter = isXHRAdapterSupported && function (config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        const _config = resolveConfig(config);
        let requestData = _config.data;
        const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
        let {responseType, onUploadProgress, onDownloadProgress} = _config;
        let onCanceled;
        let uploadThrottled, downloadThrottled;
        let flushUpload, flushDownload;

        function done() {
          flushUpload && flushUpload(); // flush events
          flushDownload && flushDownload(); // flush events

          _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

          _config.signal && _config.signal.removeEventListener('abort', onCanceled);
        }

        let request = new XMLHttpRequest();

        request.open(_config.method.toUpperCase(), _config.url, true);

        // Set the request timeout in MS
        request.timeout = _config.timeout;

        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          const responseHeaders = AxiosHeaders$1.from(
            'getAllResponseHeaders' in request && request.getAllResponseHeaders()
          );
          const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
            request.responseText : request.response;
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };

          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);

          // Clean up request
          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
          };
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
          const transitional = _config.transitional || transitionalDefaults;
          if (_config.timeoutErrorMessage) {
            timeoutErrorMessage = _config.timeoutErrorMessage;
          }
          reject(new AxiosError$1(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
            config,
            request));

          // Clean up request
          request = null;
        };

        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
          });
        }

        // Add withCredentials to request if needed
        if (!utils$1.isUndefined(_config.withCredentials)) {
          request.withCredentials = !!_config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = _config.responseType;
        }

        // Handle progress if needed
        if (onDownloadProgress) {
          ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
          request.addEventListener('progress', downloadThrottled);
        }

        // Not all browsers support upload events
        if (onUploadProgress && request.upload) {
          ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

          request.upload.addEventListener('progress', uploadThrottled);

          request.upload.addEventListener('loadend', flushUpload);
        }

        if (_config.cancelToken || _config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = cancel => {
            if (!request) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
            request.abort();
            request = null;
          };

          _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
          if (_config.signal) {
            _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
          }
        }

        const protocol = parseProtocol(_config.url);

        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(new AxiosError$1('Unsupported protocol ' + protocol + ':', AxiosError$1.ERR_BAD_REQUEST, config));
          return;
        }


        // Send the request
        request.send(requestData || null);
      });
    };

    const composeSignals = (signals, timeout) => {
      const {length} = (signals = signals ? signals.filter(Boolean) : []);

      if (timeout || length) {
        let controller = new AbortController();

        let aborted;

        const onabort = function (reason) {
          if (!aborted) {
            aborted = true;
            unsubscribe();
            const err = reason instanceof Error ? reason : this.reason;
            controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
          }
        };

        let timer = timeout && setTimeout(() => {
          timer = null;
          onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
        }, timeout);

        const unsubscribe = () => {
          if (signals) {
            timer && clearTimeout(timer);
            timer = null;
            signals.forEach(signal => {
              signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
            });
            signals = null;
          }
        };

        signals.forEach((signal) => signal.addEventListener('abort', onabort));

        const {signal} = controller;

        signal.unsubscribe = () => utils$1.asap(unsubscribe);

        return signal;
      }
    };

    const streamChunk = function* (chunk, chunkSize) {
      let len = chunk.byteLength;

      if (len < chunkSize) {
        yield chunk;
        return;
      }

      let pos = 0;
      let end;

      while (pos < len) {
        end = pos + chunkSize;
        yield chunk.slice(pos, end);
        pos = end;
      }
    };

    const readBytes = async function* (iterable, chunkSize) {
      for await (const chunk of readStream(iterable)) {
        yield* streamChunk(chunk, chunkSize);
      }
    };

    const readStream = async function* (stream) {
      if (stream[Symbol.asyncIterator]) {
        yield* stream;
        return;
      }

      const reader = stream.getReader();
      try {
        for (;;) {
          const {done, value} = await reader.read();
          if (done) {
            break;
          }
          yield value;
        }
      } finally {
        await reader.cancel();
      }
    };

    const trackStream = (stream, chunkSize, onProgress, onFinish) => {
      const iterator = readBytes(stream, chunkSize);

      let bytes = 0;
      let done;
      let _onFinish = (e) => {
        if (!done) {
          done = true;
          onFinish && onFinish(e);
        }
      };

      return new ReadableStream({
        async pull(controller) {
          try {
            const {done, value} = await iterator.next();

            if (done) {
             _onFinish();
              controller.close();
              return;
            }

            let len = value.byteLength;
            if (onProgress) {
              let loadedBytes = bytes += len;
              onProgress(loadedBytes);
            }
            controller.enqueue(new Uint8Array(value));
          } catch (err) {
            _onFinish(err);
            throw err;
          }
        },
        cancel(reason) {
          _onFinish(reason);
          return iterator.return();
        }
      }, {
        highWaterMark: 2
      })
    };

    const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
    const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

    // used only inside the fetch adapter
    const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
        ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
        async (str) => new Uint8Array(await new Response(str).arrayBuffer())
    );

    const test = (fn, ...args) => {
      try {
        return !!fn(...args);
      } catch (e) {
        return false
      }
    };

    const supportsRequestStream = isReadableStreamSupported && test(() => {
      let duplexAccessed = false;

      const hasContentType = new Request(platform.origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          duplexAccessed = true;
          return 'half';
        },
      }).headers.has('Content-Type');

      return duplexAccessed && !hasContentType;
    });

    const DEFAULT_CHUNK_SIZE = 64 * 1024;

    const supportsResponseStream = isReadableStreamSupported &&
      test(() => utils$1.isReadableStream(new Response('').body));


    const resolvers = {
      stream: supportsResponseStream && ((res) => res.body)
    };

    isFetchSupported && (((res) => {
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
        !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res) => res[type]() :
          (_, config) => {
            throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
          });
      });
    })(new Response));

    const getBodyLength = async (body) => {
      if (body == null) {
        return 0;
      }

      if(utils$1.isBlob(body)) {
        return body.size;
      }

      if(utils$1.isSpecCompliantForm(body)) {
        const _request = new Request(platform.origin, {
          method: 'POST',
          body,
        });
        return (await _request.arrayBuffer()).byteLength;
      }

      if(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
        return body.byteLength;
      }

      if(utils$1.isURLSearchParams(body)) {
        body = body + '';
      }

      if(utils$1.isString(body)) {
        return (await encodeText(body)).byteLength;
      }
    };

    const resolveBodyLength = async (headers, body) => {
      const length = utils$1.toFiniteNumber(headers.getContentLength());

      return length == null ? getBodyLength(body) : length;
    };

    var fetchAdapter = isFetchSupported && (async (config) => {
      let {
        url,
        method,
        data,
        signal,
        cancelToken,
        timeout,
        onDownloadProgress,
        onUploadProgress,
        responseType,
        headers,
        withCredentials = 'same-origin',
        fetchOptions
      } = resolveConfig(config);

      responseType = responseType ? (responseType + '').toLowerCase() : 'text';

      let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

      let request;

      const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
          composedSignal.unsubscribe();
      });

      let requestContentLength;

      try {
        if (
          onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
          (requestContentLength = await resolveBodyLength(headers, data)) !== 0
        ) {
          let _request = new Request(url, {
            method: 'POST',
            body: data,
            duplex: "half"
          });

          let contentTypeHeader;

          if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
            headers.setContentType(contentTypeHeader);
          }

          if (_request.body) {
            const [onProgress, flush] = progressEventDecorator(
              requestContentLength,
              progressEventReducer(asyncDecorator(onUploadProgress))
            );

            data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
          }
        }

        if (!utils$1.isString(withCredentials)) {
          withCredentials = withCredentials ? 'include' : 'omit';
        }

        // Cloudflare Workers throws when credentials are defined
        // see https://github.com/cloudflare/workerd/issues/902
        const isCredentialsSupported = "credentials" in Request.prototype;
        request = new Request(url, {
          ...fetchOptions,
          signal: composedSignal,
          method: method.toUpperCase(),
          headers: headers.normalize().toJSON(),
          body: data,
          duplex: "half",
          credentials: isCredentialsSupported ? withCredentials : undefined
        });

        let response = await fetch(request, fetchOptions);

        const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

        if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
          const options = {};

          ['status', 'statusText', 'headers'].forEach(prop => {
            options[prop] = response[prop];
          });

          const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

          const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
            responseContentLength,
            progressEventReducer(asyncDecorator(onDownloadProgress), true)
          ) || [];

          response = new Response(
            trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
              flush && flush();
              unsubscribe && unsubscribe();
            }),
            options
          );
        }

        responseType = responseType || 'text';

        let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

        !isStreamResponse && unsubscribe && unsubscribe();

        return await new Promise((resolve, reject) => {
          settle(resolve, reject, {
            data: responseData,
            headers: AxiosHeaders$1.from(response.headers),
            status: response.status,
            statusText: response.statusText,
            config,
            request
          });
        })
      } catch (err) {
        unsubscribe && unsubscribe();

        if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
          throw Object.assign(
            new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request),
            {
              cause: err.cause || err
            }
          )
        }

        throw AxiosError$1.from(err, err && err.code, config, request);
      }
    });

    const knownAdapters = {
      http: httpAdapter,
      xhr: xhrAdapter,
      fetch: fetchAdapter
    };

    utils$1.forEach(knownAdapters, (fn, value) => {
      if (fn) {
        try {
          Object.defineProperty(fn, 'name', {value});
        } catch (e) {
          // eslint-disable-next-line no-empty
        }
        Object.defineProperty(fn, 'adapterName', {value});
      }
    });

    const renderReason = (reason) => `- ${reason}`;

    const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

    var adapters = {
      getAdapter: (adapters) => {
        adapters = utils$1.isArray(adapters) ? adapters : [adapters];

        const {length} = adapters;
        let nameOrAdapter;
        let adapter;

        const rejectedReasons = {};

        for (let i = 0; i < length; i++) {
          nameOrAdapter = adapters[i];
          let id;

          adapter = nameOrAdapter;

          if (!isResolvedHandle(nameOrAdapter)) {
            adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

            if (adapter === undefined) {
              throw new AxiosError$1(`Unknown adapter '${id}'`);
            }
          }

          if (adapter) {
            break;
          }

          rejectedReasons[id || '#' + i] = adapter;
        }

        if (!adapter) {

          const reasons = Object.entries(rejectedReasons)
            .map(([id, state]) => `adapter ${id} ` +
              (state === false ? 'is not supported by the environment' : 'is not available in the build')
            );

          let s = length ?
            (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
            'as no adapter specified';

          throw new AxiosError$1(
            `There is no suitable adapter to dispatch the request ` + s,
            'ERR_NOT_SUPPORT'
          );
        }

        return adapter;
      },
      adapters: knownAdapters
    };

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     *
     * @param {Object} config The config that is to be used for the request
     *
     * @returns {void}
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }

      if (config.signal && config.signal.aborted) {
        throw new CanceledError$1(null, config);
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      config.headers = AxiosHeaders$1.from(config.headers);

      // Transform request data
      config.data = transformData.call(
        config,
        config.transformRequest
      );

      if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
        config.headers.setContentType('application/x-www-form-urlencoded', false);
      }

      const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData.call(
          config,
          config.transformResponse,
          response
        );

        response.headers = AxiosHeaders$1.from(response.headers);

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel$1(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }

        return Promise.reject(reason);
      });
    }

    const VERSION$1 = "1.11.0";

    const validators$1 = {};

    // eslint-disable-next-line func-names
    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
      validators$1[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });

    const deprecatedWarnings = {};

    /**
     * Transitional option validator
     *
     * @param {function|boolean?} validator - set to false if the transitional option has been removed
     * @param {string?} version - deprecated version / removed since version
     * @param {string?} message - some message with additional info
     *
     * @returns {function}
     */
    validators$1.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return '[Axios v' + VERSION$1 + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      }

      // eslint-disable-next-line func-names
      return (value, opt, opts) => {
        if (validator === false) {
          throw new AxiosError$1(
            formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
            AxiosError$1.ERR_DEPRECATED
          );
        }

        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          // eslint-disable-next-line no-console
          console.warn(
            formatMessage(
              opt,
              ' has been deprecated since v' + version + ' and will be removed in the near future'
            )
          );
        }

        return validator ? validator(value, opt, opts) : true;
      };
    };

    validators$1.spelling = function spelling(correctSpelling) {
      return (value, opt) => {
        // eslint-disable-next-line no-console
        console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
        return true;
      }
    };

    /**
     * Assert object's properties type
     *
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     *
     * @returns {object}
     */

    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== 'object') {
        throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      const keys = Object.keys(options);
      let i = keys.length;
      while (i-- > 0) {
        const opt = keys[i];
        const validator = schema[opt];
        if (validator) {
          const value = options[opt];
          const result = value === undefined || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError$1('option ' + opt + ' must be ' + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
        }
      }
    }

    var validator = {
      assertOptions,
      validators: validators$1
    };

    const validators = validator.validators;

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     *
     * @return {Axios} A new instance of Axios
     */
    let Axios$1 = class Axios {
      constructor(instanceConfig) {
        this.defaults = instanceConfig || {};
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager()
        };
      }

      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */
      async request(configOrUrl, config) {
        try {
          return await this._request(configOrUrl, config);
        } catch (err) {
          if (err instanceof Error) {
            let dummy = {};

            Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

            // slice off the Error: ... line
            const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
            try {
              if (!err.stack) {
                err.stack = stack;
                // match without the 2 top stack lines
              } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
                err.stack += '\n' + stack;
              }
            } catch (e) {
              // ignore the case where "stack" is an un-writable property
            }
          }

          throw err;
        }
      }

      _request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/
        // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === 'string') {
          config = config || {};
          config.url = configOrUrl;
        } else {
          config = configOrUrl || {};
        }

        config = mergeConfig$1(this.defaults, config);

        const {transitional, paramsSerializer, headers} = config;

        if (transitional !== undefined) {
          validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
          }, false);
        }

        if (paramsSerializer != null) {
          if (utils$1.isFunction(paramsSerializer)) {
            config.paramsSerializer = {
              serialize: paramsSerializer
            };
          } else {
            validator.assertOptions(paramsSerializer, {
              encode: validators.function,
              serialize: validators.function
            }, true);
          }
        }

        // Set config.allowAbsoluteUrls
        if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
          config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
        } else {
          config.allowAbsoluteUrls = true;
        }

        validator.assertOptions(config, {
          baseUrl: validators.spelling('baseURL'),
          withXsrfToken: validators.spelling('withXSRFToken')
        }, true);

        // Set config.method
        config.method = (config.method || this.defaults.method || 'get').toLowerCase();

        // Flatten headers
        let contextHeaders = headers && utils$1.merge(
          headers.common,
          headers[config.method]
        );

        headers && utils$1.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          (method) => {
            delete headers[method];
          }
        );

        config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

        // filter out skipped interceptors
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
            return;
          }

          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });

        let promise;
        let i = 0;
        let len;

        if (!synchronousRequestInterceptors) {
          const chain = [dispatchRequest.bind(this), undefined];
          chain.unshift(...requestInterceptorChain);
          chain.push(...responseInterceptorChain);
          len = chain.length;

          promise = Promise.resolve(config);

          while (i < len) {
            promise = promise.then(chain[i++], chain[i++]);
          }

          return promise;
        }

        len = requestInterceptorChain.length;

        let newConfig = config;

        i = 0;

        while (i < len) {
          const onFulfilled = requestInterceptorChain[i++];
          const onRejected = requestInterceptorChain[i++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected.call(this, error);
            break;
          }
        }

        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
          return Promise.reject(error);
        }

        i = 0;
        len = responseInterceptorChain.length;

        while (i < len) {
          promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }

        return promise;
      }

      getUri(config) {
        config = mergeConfig$1(this.defaults, config);
        const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
        return buildURL(fullPath, config.params, config.paramsSerializer);
      }
    };

    // Provide aliases for supported request methods
    utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios$1.prototype[method] = function(url, config) {
        return this.request(mergeConfig$1(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });

    utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/

      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig$1(config || {}, {
            method,
            headers: isForm ? {
              'Content-Type': 'multipart/form-data'
            } : {},
            url,
            data
          }));
        };
      }

      Axios$1.prototype[method] = generateHTTPMethod();

      Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
    });

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @param {Function} executor The executor function.
     *
     * @returns {CancelToken}
     */
    let CancelToken$1 = class CancelToken {
      constructor(executor) {
        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }

        let resolvePromise;

        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });

        const token = this;

        // eslint-disable-next-line func-names
        this.promise.then(cancel => {
          if (!token._listeners) return;

          let i = token._listeners.length;

          while (i-- > 0) {
            token._listeners[i](cancel);
          }
          token._listeners = null;
        });

        // eslint-disable-next-line func-names
        this.promise.then = onfulfilled => {
          let _resolve;
          // eslint-disable-next-line func-names
          const promise = new Promise(resolve => {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);

          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };

          return promise;
        };

        executor(function cancel(message, config, request) {
          if (token.reason) {
            // Cancellation has already been requested
            return;
          }

          token.reason = new CanceledError$1(message, config, request);
          resolvePromise(token.reason);
        });
      }

      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */
      throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }

      /**
       * Subscribe to the cancel signal
       */

      subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }

        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }

      /**
       * Unsubscribe from the cancel signal
       */

      unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }

      toAbortSignal() {
        const controller = new AbortController();

        const abort = (err) => {
          controller.abort(err);
        };

        this.subscribe(abort);

        controller.signal.unsubscribe = () => this.unsubscribe(abort);

        return controller.signal;
      }

      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
      static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token,
          cancel
        };
      }
    };

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     *
     * @returns {Function}
     */
    function spread$1(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    }

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     *
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    function isAxiosError$1(payload) {
      return utils$1.isObject(payload) && (payload.isAxiosError === true);
    }

    const HttpStatusCode$1 = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511,
    };

    Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
      HttpStatusCode$1[value] = key;
    });

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     *
     * @returns {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      const context = new Axios$1(defaultConfig);
      const instance = bind(Axios$1.prototype.request, context);

      // Copy axios.prototype to instance
      utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

      // Copy context to instance
      utils$1.extend(instance, context, null, {allOwnKeys: true});

      // Factory for creating new instances
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
      };

      return instance;
    }

    // Create the default instance to be exported
    const axios = createInstance(defaults);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios$1;

    // Expose Cancel & CancelToken
    axios.CanceledError = CanceledError$1;
    axios.CancelToken = CancelToken$1;
    axios.isCancel = isCancel$1;
    axios.VERSION = VERSION$1;
    axios.toFormData = toFormData$1;

    // Expose AxiosError class
    axios.AxiosError = AxiosError$1;

    // alias for CanceledError for backward compatibility
    axios.Cancel = axios.CanceledError;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };

    axios.spread = spread$1;

    // Expose isAxiosError
    axios.isAxiosError = isAxiosError$1;

    // Expose mergeConfig
    axios.mergeConfig = mergeConfig$1;

    axios.AxiosHeaders = AxiosHeaders$1;

    axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

    axios.getAdapter = adapters.getAdapter;

    axios.HttpStatusCode = HttpStatusCode$1;

    axios.default = axios;

    // This module is intended to unwrap Axios default export as named.
    // Keep top-level export same with static properties
    // so that it can keep same with es module or cjs
    const {
      Axios,
      AxiosError,
      CanceledError,
      isCancel,
      CancelToken,
      VERSION,
      all,
      Cancel,
      isAxiosError,
      spread,
      toFormData,
      AxiosHeaders,
      HttpStatusCode,
      formToJSON,
      getAdapter,
      mergeConfig
    } = axios;

    // Core constants for WeRelease SDK
    // API Configuration
    var API_BASE_URL = 'http://localhost:3000/api/sdk';
    // Storage Configuration
    var STORAGE_KEYS = {
        ANONYMOUS_ID: 'wrls.anonymous_id',
        BANNER_DISMISSED: 'wrls.banner_dismissed',
        FEEDBACK_SUBMITTED: 'wrls.feedback_submitted',
    };
    // Default Configuration
    var DEFAULT_OPTIONS = {
        showDismissButton: true,
        makeBannerClickable: true,
        dismissFeedbackModal: true,
        feedbackType: 'both',
        styles: {},
        className: '',
        onBannerClick: undefined,
    };
    var DEFAULT_CHANGELOG_DATA = {
        id: 1,
        title: 'Test',
        subtitle: 'Test',
        version: '1.0.0',
        tags: 'Test',
        description: 'Test',
        releaseDate: '2025-01-01',
        metaData: {
            test: 'test',
        },
    };

    var APIService = /** @class */ (function () {
        function APIService() {
            this.axiosInstance = axios.create({
                baseURL: API_BASE_URL,
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        /*
         * Fetch Project Data with current settings and subscription status
         */
        APIService.prototype.init = function (projectId, anonymousId) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.axiosInstance.post("/projects/".concat(projectId, "/init"), { anonymousId: anonymousId })];
                        case 1:
                            response = _a.sent();
                            if (response.status !== 200) {
                                console.warn('[WeRelease] Failed to init');
                            }
                            return [2 /*return*/, response.data];
                        case 2:
                            error_1 = _a.sent();
                            console.error('[WeRelease] Failed to init:', error_1);
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        APIService.prototype.fetchProjectDetails = function (projectId) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!projectId) {
                                console.warn('[WeRelease] No project ID provided');
                                return [2 /*return*/, null];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.axiosInstance.get("/projects/".concat(projectId))];
                        case 2:
                            response = _a.sent();
                            if (response.status !== 200) {
                                console.warn('[WeRelease] No published changelog found');
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, response.data];
                        case 3:
                            error_2 = _a.sent();
                            console.error('[WeRelease] Failed to fetch project:', error_2);
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Fetch the latest published changelog for a project
         */
        APIService.prototype.fetchLatest = function (projectId) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!projectId) {
                                console.warn('[WeRelease] No project ID provided');
                                return [2 /*return*/, null];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.axiosInstance.get("/projects/".concat(projectId, "/changelog?latest=true"))];
                        case 2:
                            response = _a.sent();
                            if (response.status !== 200) {
                                console.warn('[WeRelease] No published changelog found');
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, response.data];
                        case 3:
                            error_3 = _a.sent();
                            console.error('[WeRelease] Failed to fetch changelog:', error_3);
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Identify a user (map anonymous ID to user ID)
         */
        APIService.prototype.identifyUser = function (projectId, anonymousId, user) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.axiosInstance.post("/projects/".concat(projectId, "/users/identify"), {
                                    user: user,
                                    projectId: projectId,
                                    anonymousId: anonymousId,
                                })];
                        case 1:
                            response = _a.sent();
                            if (response.status !== 200) {
                                console.warn('[WeRelease] Failed to identify user');
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            console.error('[WeRelease] Error identifying user:', error_4);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Submit user feedback
         */
        APIService.prototype.submitFeedback = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.axiosInstance.post("/projects/".concat(data.projectId, "/feedback"), __assign(__assign({}, data), { meta: __assign(__assign({}, data.meta), { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, device: this.getDeviceInfo(), browser: this.getBrowserInfo(), os: this.getOSInfo(), pageUrl: window.location.href, referrer: document.referrer, screenSize: "".concat(window.innerWidth, "x").concat(window.innerHeight), userAgent: navigator.userAgent }) }))];
                        case 1:
                            response = _a.sent();
                            if (response.status !== 200) {
                                console.warn('[WeRelease] Failed to submit feedback');
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            console.error('[WeRelease] Error submitting feedback:', error_5);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // /**
        //  * Track banner impression
        //  */
        // async trackImpression(data: {
        //   projectId: string;
        //   anonymousId?: string;
        // }): Promise<void> {
        //   try {
        //     const response = await this.axiosInstance.post('/impression', {
        //       ...data,
        //       timestamp: Date.now(),
        //     });
        //     if (response.status !== 200) {
        //       console.warn('[WeRelease] Failed to track impression');
        //     }
        //   } catch (error) {
        //     console.error('[WeRelease] Error tracking impression:', error);
        //   }
        // }
        /**
         * Extract device information from user agent
         */
        APIService.prototype.getDeviceInfo = function () {
            var userAgent = navigator.userAgent;
            if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
                if (/iPad/i.test(userAgent))
                    return 'Tablet';
                return 'Mobile';
            }
            return 'Desktop';
        };
        /**
         * Extract browser information from user agent
         */
        APIService.prototype.getBrowserInfo = function () {
            var userAgent = navigator.userAgent;
            if (userAgent.includes('Chrome') && !userAgent.includes('Edg'))
                return 'Chrome';
            if (userAgent.includes('Safari') && !userAgent.includes('Chrome'))
                return 'Safari';
            if (userAgent.includes('Firefox'))
                return 'Firefox';
            if (userAgent.includes('Edg'))
                return 'Edge';
            if (userAgent.includes('Opera') || userAgent.includes('OPR'))
                return 'Opera';
            return 'Unknown';
        };
        /**
         * Extract operating system information from user agent
         */
        APIService.prototype.getOSInfo = function () {
            var userAgent = navigator.userAgent;
            if (userAgent.includes('Windows'))
                return 'Windows';
            if (userAgent.includes('Mac OS'))
                return 'macOS';
            if (userAgent.includes('Linux'))
                return 'Linux';
            if (userAgent.includes('Android'))
                return 'Android';
            if (userAgent.includes('iPhone') || userAgent.includes('iPad'))
                return 'iOS';
            return 'Unknown';
        };
        return APIService;
    }());

    // Storage Service for WeRelease SDK
    var LocalStorageService = /** @class */ (function () {
        function LocalStorageService() {
        }
        /**
         * Get or create anonymous user ID
         */
        LocalStorageService.prototype.getAnonymousId = function () {
            try {
                return localStorage.getItem(STORAGE_KEYS.ANONYMOUS_ID);
            }
            catch (error) {
                console.warn('[WeRelease] Failed to access localStorage:', error);
                return null;
            }
        };
        /**
         * Set anonymous user ID
         */
        LocalStorageService.prototype.setAnonymousId = function (id) {
            try {
                localStorage.setItem(STORAGE_KEYS.ANONYMOUS_ID, id);
            }
            catch (error) {
                console.warn('[WeRelease] Failed to set anonymous ID:', error);
            }
        };
        /**
         * Check if banner has been dismissed
         */
        LocalStorageService.prototype.isBannerDismissed = function () {
            try {
                return localStorage.getItem(STORAGE_KEYS.BANNER_DISMISSED) === 'true';
            }
            catch (error) {
                console.warn('[WeRelease] Failed to check banner dismissed state:', error);
                return false;
            }
        };
        /**
         * Mark banner as dismissed
         */
        LocalStorageService.prototype.setBannerDismissed = function () {
            try {
                localStorage.setItem(STORAGE_KEYS.BANNER_DISMISSED, 'true');
            }
            catch (error) {
                console.warn('[WeRelease] Failed to set banner dismissed:', error);
            }
        };
        /**
         * Get item from localStorage
         */
        LocalStorageService.prototype.getItem = function (key) {
            try {
                return localStorage.getItem(key);
            }
            catch (error) {
                console.warn('[WeRelease] Failed to get item from storage:', error);
                return null;
            }
        };
        /**
         * Set item in localStorage
         */
        LocalStorageService.prototype.setItem = function (key, value) {
            try {
                localStorage.setItem(key, value);
            }
            catch (error) {
                console.warn('[WeRelease] Failed to set item in storage:', error);
            }
        };
        /**
         * Clear all WeRelease storage
         */
        LocalStorageService.prototype.clear = function () {
            try {
                Object.values(STORAGE_KEYS).forEach(function (key) {
                    localStorage.removeItem(key);
                });
            }
            catch (error) {
                console.warn('[WeRelease] Failed to clear storage:', error);
            }
        };
        return LocalStorageService;
    }());
    /**
     * Generate a random anonymous ID
     */
    function generateAnonymousId() {
        return 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
    /**
     * Get or create anonymous ID with fallback
     */
    function getOrCreateAnonymousId() {
        var storage = new LocalStorageService();
        var anonymousId = storage.getAnonymousId();
        if (!anonymousId) {
            anonymousId = generateAnonymousId();
            storage.setAnonymousId(anonymousId);
        }
        return anonymousId;
    }

    var renderBasicBannerTemplate = function (redirectUrl) {
        return "\uD83D\uDE80 New update available! <a href='".concat(redirectUrl, "' target='_blank' style='color: #0066cc; text-decoration: underline;'>View Changes</a>");
    };
    var applyBasicBannerStyles = function (banner) {
        banner.style.padding = '12px 16px';
        banner.style.margin = '0';
        banner.style.border = '1px solid #ddd';
        banner.style.backgroundColor = '#f9f9f9';
        banner.style.color = '#333';
        banner.style.fontSize = '14px';
        banner.style.fontFamily = 'Arial, sans-serif';
        banner.style.lineHeight = '1.4';
    };

    var renderPremiumBannerTemplate = function (config) {
        var _a = config.showDismissButton, showDismissButton = _a === void 0 ? true : _a, _b = config.makeBannerClickable, makeBannerClickable = _b === void 0 ? true : _b, _c = config.releaseTime, releaseTime = _c === void 0 ? '' : _c, _d = config.changelog, changelog = _d === void 0 ? {} : _d;
        var _e = changelog.title, title = _e === void 0 ? 'New Release Available' : _e, _f = changelog.subtitle, subtitle = _f === void 0 ? '' : _f, _g = changelog.version, version = _g === void 0 ? '' : _g, _h = changelog.tags, tags = _h === void 0 ? '' : _h;
        return "\n    <div style=\"position: relative;\">\n      <div class=\"werelease-banner-content\" style=\"display: flex; align-items: flex-start; gap: 16px; cursor: pointer; padding: 20px;\" ".concat(makeBannerClickable ? 'data-clickable="true"' : '', ">\n        \n        <!-- Icon and NEW badge -->\n        <div style=\"\n          width: 48px; \n          height: 48px; \n          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);\n          border-radius: 50%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          font-size: 24px;\n          flex-shrink: 0;\n          position: relative;\n        \">\n          \uD83D\uDE80\n          ").concat(releaseTime
            ? "\n            <span style=\"\n              position: absolute;\n              top: -6px;\n              right: -6px;\n              background: #ef4444;\n              color: white;\n              font-size: 10px;\n              font-weight: 700;\n              padding: 3px 6px;\n              border-radius: 10px;\n              line-height: 1;\n              text-transform: uppercase;\n              letter-spacing: 0.5px;\n              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n            \">NEW</span>\n          "
            : '', "\n        </div>\n        \n        <!-- Main content area -->\n        <div style=\"flex: 1; min-width: 0;\">\n          <!-- 1st row: Title with version number -->\n          <div style=\"display: flex; align-items: center; gap: 12px; margin-bottom: 8px;\">\n            <span style=\"font-weight: 700; color: inherit; font-size: 16px;\">").concat(title, "</span>\n            ").concat(version ? "<span style=\"font-size: 11px; color:#a7a7a7; background: #83899245; padding: 3px 8px; border-radius: 12px; font-weight: 600;\">".concat(version, "</span>") : '', "\n          </div>\n          \n          <!-- 2nd row: Subtitle -->\n          ").concat(subtitle
            ? "\n            <div style=\"margin-bottom: 8px;\">\n              <span style=\"font-size: 13px; color: #6b7280; opacity: 0.8;\">".concat(subtitle, "</span>\n            </div>\n          ")
            : '', "\n          \n          <!-- 3rd row: Release date as \"3 days ago\" and tags -->\n          ").concat(releaseTime
            ? "\n            <div style=\"margin-bottom: 12px; display: flex; align-items: center; gap: 8px; flex-direction: row;\">\n              <span style=\"\n                font-size: 12px;\n                color: #9ca3af;\n                background: rgba(156, 163, 175, 0.1);\n                padding: 4px 8px;\n                border-radius: 12px;\n                font-weight: 500;\n              \">".concat(releaseTime, "</span>\n              ").concat(tags
                ? "\n                <span style=\"font-size: 11px; color: #6b7280; background: rgba(107, 114, 128, 0.1); padding: 3px 8px; border-radius: 12px;\">".concat(tags, "</span>\n              ")
                : '', "\n            </div>\n          ")
            : '', "\n        </div>\n        \n        <!-- Action buttons -->\n        <div style=\"display: flex; flex-direction: column; gap: 8px; flex-shrink: 0;\">\n          <a href=\"#\" class=\"werelease-view-changes\" style=\"\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            text-decoration: none;\n            padding: 12px 20px;\n            border-radius: 24px;\n            font-size: 14px;\n            font-weight: 600;\n            transition: all 0.2s ease;\n            border: none;\n            cursor: pointer;\n            white-space: nowrap;\n            text-align: center;\n            display: block;\n            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n          \" onmouseover=\"this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(102, 126, 234, 0.4)';\" \n             onmouseout=\"this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(102, 126, 234, 0.3)';\">\n            View Changes\n          </a>\n          ").concat(showDismissButton
            ? "\n            <button class=\"werelease-dismiss-banner\" style=\"\n              background: rgba(107, 114, 128, 0.1);\n              color: #6b7280;\n              text-decoration: none;\n              padding: 8px 16px;\n              border: 1px solid rgba(107, 114, 128, 0.2);\n              border-radius: 20px;\n              font-size: 13px;\n              font-weight: 500;\n              cursor: pointer;\n              white-space: nowrap;\n              text-align: center;\n              transition: all 0.2s ease;\n            \" onmouseover=\"this.style.background='rgba(107, 114, 128, 0.2)'\" \n               onmouseout=\"this.style.background='rgba(107, 114, 128, 0.1)'\">\n              Remind Later\n            </button>\n          "
            : '', "\n        </div>\n      </div>\n    </div>\n  ");
    };
    var applyPremiumBannerStyles = function (banner) {
        // Premium container styles
        banner.style.padding = '20px';
        banner.style.margin = '16px 0';
        banner.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)';
        banner.style.border = '1px solid rgba(102, 126, 234, 0.1)';
        banner.style.borderRadius = '16px';
        banner.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        banner.style.color = '#1a202c';
        banner.style.fontSize = '14px';
        banner.style.fontFamily =
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
        banner.style.lineHeight = '1.5';
        banner.style.transition = 'all 0.3s ease';
        banner.style.position = 'relative';
        banner.style.overflow = 'hidden';
        // Add subtle animation
        banner.style.animation = 'weReleaseSlideIn 0.4s ease-out';
        // Add class for dark mode support and interactions
        banner.className = (banner.className || '') + ' werelease-banner-premium';
    };
    var addPremiumBannerCSS = function () {
        // Add CSS keyframes for animation and hover effects
        if (!document.getElementById('weRelease-styles')) {
            var style = document.createElement('style');
            style.id = 'weRelease-styles';
            style.textContent = "\n      @keyframes weReleaseSlideIn {\n        from {\n          opacity: 0;\n          transform: translateY(-10px);\n        }\n        to {\n          opacity: 1;\n          transform: translateY(0);\n        }\n      }\n      \n      .werelease-banner-premium:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12) !important;\n      }\n      \n      @media (prefers-color-scheme: dark) {\n        .werelease-banner-premium {\n          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%) !important;\n          border-color: rgba(102, 126, 234, 0.2) !important;\n          color: #e2e8f0 !important;\n        }\n      }\n    ";
            document.head.appendChild(style);
        }
    };

    /**
     * @name toDate
     * @category Common Helpers
     * @summary Convert the given argument to an instance of Date.
     *
     * @description
     * Convert the given argument to an instance of Date.
     *
     * If the argument is an instance of Date, the function returns its clone.
     *
     * If the argument is a number, it is treated as a timestamp.
     *
     * If the argument is none of the above, the function returns Invalid Date.
     *
     * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param argument - The value to convert
     *
     * @returns The parsed date in the local time zone
     *
     * @example
     * // Clone the date:
     * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
     * //=> Tue Feb 11 2014 11:30:30
     *
     * @example
     * // Convert the timestamp to date:
     * const result = toDate(1392098430000)
     * //=> Tue Feb 11 2014 11:30:30
     */
    function toDate(argument) {
      const argStr = Object.prototype.toString.call(argument);

      // Clone the date
      if (
        argument instanceof Date ||
        (typeof argument === "object" && argStr === "[object Date]")
      ) {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new argument.constructor(+argument);
      } else if (
        typeof argument === "number" ||
        argStr === "[object Number]" ||
        typeof argument === "string" ||
        argStr === "[object String]"
      ) {
        // TODO: Can we get rid of as?
        return new Date(argument);
      } else {
        // TODO: Can we get rid of as?
        return new Date(NaN);
      }
    }

    /**
     * @name constructFrom
     * @category Generic Helpers
     * @summary Constructs a date using the reference date and the value
     *
     * @description
     * The function constructs a new date using the constructor from the reference
     * date and the given value. It helps to build generic functions that accept
     * date extensions.
     *
     * It defaults to `Date` if the passed reference date is a number or a string.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The reference date to take constructor from
     * @param value - The value to create the date
     *
     * @returns Date initialized using the given date and value
     *
     * @example
     * import { constructFrom } from 'date-fns'
     *
     * // A function that clones a date preserving the original type
     * function cloneDate<DateType extends Date(date: DateType): DateType {
     *   return constructFrom(
     *     date, // Use contrustor from the given date
     *     date.getTime() // Use the date value to create a new date
     *   )
     * }
     */
    function constructFrom(date, value) {
      if (date instanceof Date) {
        return new date.constructor(value);
      } else {
        return new Date(value);
      }
    }

    /**
     * @module constants
     * @summary Useful constants
     * @description
     * Collection of useful date constants.
     *
     * The constants could be imported from `date-fns/constants`:
     *
     * ```ts
     * import { maxTime, minTime } from "./constants/date-fns/constants";
     *
     * function isAllowedTime(time) {
     *   return time <= maxTime && time >= minTime;
     * }
     * ```
     */


    /**
     * @constant
     * @name millisecondsInWeek
     * @summary Milliseconds in 1 week.
     */
    const millisecondsInWeek = 604800000;

    /**
     * @constant
     * @name millisecondsInDay
     * @summary Milliseconds in 1 day.
     */
    const millisecondsInDay = 86400000;

    let defaultOptions = {};

    function getDefaultOptions() {
      return defaultOptions;
    }

    /**
     * The {@link startOfWeek} function options.
     */

    /**
     * @name startOfWeek
     * @category Week Helpers
     * @summary Return the start of a week for the given date.
     *
     * @description
     * Return the start of a week for the given date.
     * The result will be in the local timezone.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     * @param options - An object with options
     *
     * @returns The start of a week
     *
     * @example
     * // The start of a week for 2 September 2014 11:55:00:
     * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Sun Aug 31 2014 00:00:00
     *
     * @example
     * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
     * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
     * //=> Mon Sep 01 2014 00:00:00
     */
    function startOfWeek(date, options) {
      const defaultOptions = getDefaultOptions();
      const weekStartsOn =
        options?.weekStartsOn ??
        options?.locale?.options?.weekStartsOn ??
        defaultOptions.weekStartsOn ??
        defaultOptions.locale?.options?.weekStartsOn ??
        0;

      const _date = toDate(date);
      const day = _date.getDay();
      const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

      _date.setDate(_date.getDate() - diff);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }

    /**
     * @name startOfISOWeek
     * @category ISO Week Helpers
     * @summary Return the start of an ISO week for the given date.
     *
     * @description
     * Return the start of an ISO week for the given date.
     * The result will be in the local timezone.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     *
     * @returns The start of an ISO week
     *
     * @example
     * // The start of an ISO week for 2 September 2014 11:55:00:
     * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Mon Sep 01 2014 00:00:00
     */
    function startOfISOWeek(date) {
      return startOfWeek(date, { weekStartsOn: 1 });
    }

    /**
     * @name getISOWeekYear
     * @category ISO Week-Numbering Year Helpers
     * @summary Get the ISO week-numbering year of the given date.
     *
     * @description
     * Get the ISO week-numbering year of the given date,
     * which always starts 3 days before the year's first Thursday.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     *
     * @returns The ISO week-numbering year
     *
     * @example
     * // Which ISO-week numbering year is 2 January 2005?
     * const result = getISOWeekYear(new Date(2005, 0, 2))
     * //=> 2004
     */
    function getISOWeekYear(date) {
      const _date = toDate(date);
      const year = _date.getFullYear();

      const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
      fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
      fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
      const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);

      const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
      fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
      fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
      const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

      if (_date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (_date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    /**
     * @name startOfDay
     * @category Day Helpers
     * @summary Return the start of a day for the given date.
     *
     * @description
     * Return the start of a day for the given date.
     * The result will be in the local timezone.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     *
     * @returns The start of a day
     *
     * @example
     * // The start of a day for 2 September 2014 11:55:00:
     * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
     * //=> Tue Sep 02 2014 00:00:00
     */
    function startOfDay(date) {
      const _date = toDate(date);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }

    /**
     * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
     * They usually appear for dates that denote time before the timezones were introduced
     * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
     * and GMT+01:00:00 after that date)
     *
     * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
     * which would lead to incorrect calculations.
     *
     * This function returns the timezone offset in milliseconds that takes seconds in account.
     */
    function getTimezoneOffsetInMilliseconds(date) {
      const _date = toDate(date);
      const utcDate = new Date(
        Date.UTC(
          _date.getFullYear(),
          _date.getMonth(),
          _date.getDate(),
          _date.getHours(),
          _date.getMinutes(),
          _date.getSeconds(),
          _date.getMilliseconds(),
        ),
      );
      utcDate.setUTCFullYear(_date.getFullYear());
      return +date - +utcDate;
    }

    /**
     * @name differenceInCalendarDays
     * @category Day Helpers
     * @summary Get the number of calendar days between the given dates.
     *
     * @description
     * Get the number of calendar days between the given dates. This means that the times are removed
     * from the dates and then the difference in days is calculated.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param dateLeft - The later date
     * @param dateRight - The earlier date
     *
     * @returns The number of calendar days
     *
     * @example
     * // How many calendar days are between
     * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
     * const result = differenceInCalendarDays(
     *   new Date(2012, 6, 2, 0, 0),
     *   new Date(2011, 6, 2, 23, 0)
     * )
     * //=> 366
     * // How many calendar days are between
     * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
     * const result = differenceInCalendarDays(
     *   new Date(2011, 6, 3, 0, 1),
     *   new Date(2011, 6, 2, 23, 59)
     * )
     * //=> 1
     */
    function differenceInCalendarDays(dateLeft, dateRight) {
      const startOfDayLeft = startOfDay(dateLeft);
      const startOfDayRight = startOfDay(dateRight);

      const timestampLeft =
        +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
      const timestampRight =
        +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);

      // Round the number of days to the nearest integer because the number of
      // milliseconds in a day is not constant (e.g. it's different in the week of
      // the daylight saving time clock shift).
      return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
    }

    /**
     * @name startOfISOWeekYear
     * @category ISO Week-Numbering Year Helpers
     * @summary Return the start of an ISO week-numbering year for the given date.
     *
     * @description
     * Return the start of an ISO week-numbering year,
     * which always starts 3 days before the year's first Thursday.
     * The result will be in the local timezone.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     *
     * @returns The start of an ISO week-numbering year
     *
     * @example
     * // The start of an ISO week-numbering year for 2 July 2005:
     * const result = startOfISOWeekYear(new Date(2005, 6, 2))
     * //=> Mon Jan 03 2005 00:00:00
     */
    function startOfISOWeekYear(date) {
      const year = getISOWeekYear(date);
      const fourthOfJanuary = constructFrom(date, 0);
      fourthOfJanuary.setFullYear(year, 0, 4);
      fourthOfJanuary.setHours(0, 0, 0, 0);
      return startOfISOWeek(fourthOfJanuary);
    }

    /**
     * @name isDate
     * @category Common Helpers
     * @summary Is the given value a date?
     *
     * @description
     * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
     *
     * @param value - The value to check
     *
     * @returns True if the given value is a date
     *
     * @example
     * // For a valid date:
     * const result = isDate(new Date())
     * //=> true
     *
     * @example
     * // For an invalid date:
     * const result = isDate(new Date(NaN))
     * //=> true
     *
     * @example
     * // For some value:
     * const result = isDate('2014-02-31')
     * //=> false
     *
     * @example
     * // For an object:
     * const result = isDate({})
     * //=> false
     */
    function isDate(value) {
      return (
        value instanceof Date ||
        (typeof value === "object" &&
          Object.prototype.toString.call(value) === "[object Date]")
      );
    }

    /**
     * @name isValid
     * @category Common Helpers
     * @summary Is the given date valid?
     *
     * @description
     * Returns false if argument is Invalid Date and true otherwise.
     * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
     * Invalid Date is a Date, whose time value is NaN.
     *
     * Time value of Date: http://es5.github.io/#x15.9.1.1
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The date to check
     *
     * @returns The date is valid
     *
     * @example
     * // For the valid date:
     * const result = isValid(new Date(2014, 1, 31))
     * //=> true
     *
     * @example
     * // For the value, convertable into a date:
     * const result = isValid(1393804800000)
     * //=> true
     *
     * @example
     * // For the invalid date:
     * const result = isValid(new Date(''))
     * //=> false
     */
    function isValid(date) {
      if (!isDate(date) && typeof date !== "number") {
        return false;
      }
      const _date = toDate(date);
      return !isNaN(Number(_date));
    }

    /**
     * @name differenceInDays
     * @category Day Helpers
     * @summary Get the number of full days between the given dates.
     *
     * @description
     * Get the number of full day periods between two dates. Fractional days are
     * truncated towards zero.
     *
     * One "full day" is the distance between a local time in one day to the same
     * local time on the next or previous day. A full day can sometimes be less than
     * or more than 24 hours if a daylight savings change happens between two dates.
     *
     * To ignore DST and only measure exact 24-hour periods, use this instead:
     * `Math.trunc(differenceInHours(dateLeft, dateRight)/24)|0`.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param dateLeft - The later date
     * @param dateRight - The earlier date
     *
     * @returns The number of full days according to the local timezone
     *
     * @example
     * // How many full days are between
     * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
     * const result = differenceInDays(
     *   new Date(2012, 6, 2, 0, 0),
     *   new Date(2011, 6, 2, 23, 0)
     * )
     * //=> 365
     *
     * @example
     * // How many full days are between
     * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
     * const result = differenceInDays(
     *   new Date(2011, 6, 3, 0, 1),
     *   new Date(2011, 6, 2, 23, 59)
     * )
     * //=> 0
     *
     * @example
     * // How many full days are between
     * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
     * // Note: because local time is used, the
     * // result will always be 92 days, even in
     * // time zones where DST starts and the
     * // period has only 92*24-1 hours.
     * const result = differenceInDays(
     *   new Date(2020, 5, 1),
     *   new Date(2020, 2, 1)
     * )
     * //=> 92
     */
    function differenceInDays(dateLeft, dateRight) {
      const _dateLeft = toDate(dateLeft);
      const _dateRight = toDate(dateRight);

      const sign = compareLocalAsc(_dateLeft, _dateRight);
      const difference = Math.abs(differenceInCalendarDays(_dateLeft, _dateRight));

      _dateLeft.setDate(_dateLeft.getDate() - sign * difference);

      // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
      // If so, result must be decreased by 1 in absolute value
      const isLastDayNotFull = Number(
        compareLocalAsc(_dateLeft, _dateRight) === -sign,
      );
      const result = sign * (difference - isLastDayNotFull);
      // Prevent negative zero
      return result === 0 ? 0 : result;
    }

    // Like `compareAsc` but uses local time not UTC, which is needed
    // for accurate equality comparisons of UTC timestamps that end up
    // having the same representation in local time, e.g. one hour before
    // DST ends vs. the instant that DST ends.
    function compareLocalAsc(dateLeft, dateRight) {
      const diff =
        dateLeft.getFullYear() - dateRight.getFullYear() ||
        dateLeft.getMonth() - dateRight.getMonth() ||
        dateLeft.getDate() - dateRight.getDate() ||
        dateLeft.getHours() - dateRight.getHours() ||
        dateLeft.getMinutes() - dateRight.getMinutes() ||
        dateLeft.getSeconds() - dateRight.getSeconds() ||
        dateLeft.getMilliseconds() - dateRight.getMilliseconds();

      if (diff < 0) {
        return -1;
      } else if (diff > 0) {
        return 1;
        // Return 0 if diff is 0; return NaN if diff is NaN
      } else {
        return diff;
      }
    }

    /**
     * @name startOfYear
     * @category Year Helpers
     * @summary Return the start of a year for the given date.
     *
     * @description
     * Return the start of a year for the given date.
     * The result will be in the local timezone.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     *
     * @returns The start of a year
     *
     * @example
     * // The start of a year for 2 September 2014 11:55:00:
     * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
     * //=> Wed Jan 01 2014 00:00:00
     */
    function startOfYear(date) {
      const cleanDate = toDate(date);
      const _date = constructFrom(date, 0);
      _date.setFullYear(cleanDate.getFullYear(), 0, 1);
      _date.setHours(0, 0, 0, 0);
      return _date;
    }

    const formatDistanceLocale = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds",
      },

      xSeconds: {
        one: "1 second",
        other: "{{count}} seconds",
      },

      halfAMinute: "half a minute",

      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes",
      },

      xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes",
      },

      aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours",
      },

      xHours: {
        one: "1 hour",
        other: "{{count}} hours",
      },

      xDays: {
        one: "1 day",
        other: "{{count}} days",
      },

      aboutXWeeks: {
        one: "about 1 week",
        other: "about {{count}} weeks",
      },

      xWeeks: {
        one: "1 week",
        other: "{{count}} weeks",
      },

      aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months",
      },

      xMonths: {
        one: "1 month",
        other: "{{count}} months",
      },

      aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years",
      },

      xYears: {
        one: "1 year",
        other: "{{count}} years",
      },

      overXYears: {
        one: "over 1 year",
        other: "over {{count}} years",
      },

      almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years",
      },
    };

    const formatDistance = (token, count, options) => {
      let result;

      const tokenValue = formatDistanceLocale[token];
      if (typeof tokenValue === "string") {
        result = tokenValue;
      } else if (count === 1) {
        result = tokenValue.one;
      } else {
        result = tokenValue.other.replace("{{count}}", count.toString());
      }

      if (options?.addSuffix) {
        if (options.comparison && options.comparison > 0) {
          return "in " + result;
        } else {
          return result + " ago";
        }
      }

      return result;
    };

    function buildFormatLongFn(args) {
      return (options = {}) => {
        // TODO: Remove String()
        const width = options.width ? String(options.width) : args.defaultWidth;
        const format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
      };
    }

    const dateFormats = {
      full: "EEEE, MMMM do, y",
      long: "MMMM do, y",
      medium: "MMM d, y",
      short: "MM/dd/yyyy",
    };

    const timeFormats = {
      full: "h:mm:ss a zzzz",
      long: "h:mm:ss a z",
      medium: "h:mm:ss a",
      short: "h:mm a",
    };

    const dateTimeFormats = {
      full: "{{date}} 'at' {{time}}",
      long: "{{date}} 'at' {{time}}",
      medium: "{{date}}, {{time}}",
      short: "{{date}}, {{time}}",
    };

    const formatLong = {
      date: buildFormatLongFn({
        formats: dateFormats,
        defaultWidth: "full",
      }),

      time: buildFormatLongFn({
        formats: timeFormats,
        defaultWidth: "full",
      }),

      dateTime: buildFormatLongFn({
        formats: dateTimeFormats,
        defaultWidth: "full",
      }),
    };

    const formatRelativeLocale = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };

    const formatRelative = (token, _date, _baseDate, _options) =>
      formatRelativeLocale[token];

    /* eslint-disable no-unused-vars */

    /**
     * The localize function argument callback which allows to convert raw value to
     * the actual type.
     *
     * @param value - The value to convert
     *
     * @returns The converted value
     */

    /**
     * The map of localized values for each width.
     */

    /**
     * The index type of the locale unit value. It types conversion of units of
     * values that don't start at 0 (i.e. quarters).
     */

    /**
     * Converts the unit value to the tuple of values.
     */

    /**
     * The tuple of localized era values. The first element represents BC,
     * the second element represents AD.
     */

    /**
     * The tuple of localized quarter values. The first element represents Q1.
     */

    /**
     * The tuple of localized day values. The first element represents Sunday.
     */

    /**
     * The tuple of localized month values. The first element represents January.
     */

    function buildLocalizeFn(args) {
      return (value, options) => {
        const context = options?.context ? String(options.context) : "standalone";

        let valuesArray;
        if (context === "formatting" && args.formattingValues) {
          const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
          const width = options?.width ? String(options.width) : defaultWidth;

          valuesArray =
            args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
          const defaultWidth = args.defaultWidth;
          const width = options?.width ? String(options.width) : args.defaultWidth;

          valuesArray = args.values[width] || args.values[defaultWidth];
        }
        const index = args.argumentCallback ? args.argumentCallback(value) : value;

        // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
        return valuesArray[index];
      };
    }

    const eraValues = {
      narrow: ["B", "A"],
      abbreviated: ["BC", "AD"],
      wide: ["Before Christ", "Anno Domini"],
    };

    const quarterValues = {
      narrow: ["1", "2", "3", "4"],
      abbreviated: ["Q1", "Q2", "Q3", "Q4"],
      wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
    };

    // Note: in English, the names of days of the week and months are capitalized.
    // If you are making a new locale based on this one, check if the same is true for the language you're working on.
    // Generally, formatted dates should look like they are in the middle of a sentence,
    // e.g. in Spanish language the weekdays and months should be in the lowercase.
    const monthValues = {
      narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      abbreviated: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],

      wide: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };

    const dayValues = {
      narrow: ["S", "M", "T", "W", "T", "F", "S"],
      short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      wide: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };

    const dayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night",
      },
    };

    const formattingDayPeriodValues = {
      narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
      abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
      wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night",
      },
    };

    const ordinalNumber = (dirtyNumber, _options) => {
      const number = Number(dirtyNumber);

      // If ordinal numbers depend on context, for example,
      // if they are different for different grammatical genders,
      // use `options.unit`.
      //
      // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
      // 'day', 'hour', 'minute', 'second'.

      const rem100 = number % 100;
      if (rem100 > 20 || rem100 < 10) {
        switch (rem100 % 10) {
          case 1:
            return number + "st";
          case 2:
            return number + "nd";
          case 3:
            return number + "rd";
        }
      }
      return number + "th";
    };

    const localize = {
      ordinalNumber,

      era: buildLocalizeFn({
        values: eraValues,
        defaultWidth: "wide",
      }),

      quarter: buildLocalizeFn({
        values: quarterValues,
        defaultWidth: "wide",
        argumentCallback: (quarter) => quarter - 1,
      }),

      month: buildLocalizeFn({
        values: monthValues,
        defaultWidth: "wide",
      }),

      day: buildLocalizeFn({
        values: dayValues,
        defaultWidth: "wide",
      }),

      dayPeriod: buildLocalizeFn({
        values: dayPeriodValues,
        defaultWidth: "wide",
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: "wide",
      }),
    };

    function buildMatchFn(args) {
      return (string, options = {}) => {
        const width = options.width;

        const matchPattern =
          (width && args.matchPatterns[width]) ||
          args.matchPatterns[args.defaultMatchWidth];
        const matchResult = string.match(matchPattern);

        if (!matchResult) {
          return null;
        }
        const matchedString = matchResult[0];

        const parsePatterns =
          (width && args.parsePatterns[width]) ||
          args.parsePatterns[args.defaultParseWidth];

        const key = Array.isArray(parsePatterns)
          ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
            findKey(parsePatterns, (pattern) => pattern.test(matchedString));

        let value;

        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
            options.valueCallback(value)
          : value;

        const rest = string.slice(matchedString.length);

        return { value, rest };
      };
    }

    function findKey(object, predicate) {
      for (const key in object) {
        if (
          Object.prototype.hasOwnProperty.call(object, key) &&
          predicate(object[key])
        ) {
          return key;
        }
      }
      return undefined;
    }

    function findIndex(array, predicate) {
      for (let key = 0; key < array.length; key++) {
        if (predicate(array[key])) {
          return key;
        }
      }
      return undefined;
    }

    function buildMatchPatternFn(args) {
      return (string, options = {}) => {
        const matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        const matchedString = matchResult[0];

        const parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        let value = args.valueCallback
          ? args.valueCallback(parseResult[0])
          : parseResult[0];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        value = options.valueCallback ? options.valueCallback(value) : value;

        const rest = string.slice(matchedString.length);

        return { value, rest };
      };
    }

    const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
    const parseOrdinalNumberPattern = /\d+/i;

    const matchEraPatterns = {
      narrow: /^(b|a)/i,
      abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
      wide: /^(before christ|before common era|anno domini|common era)/i,
    };
    const parseEraPatterns = {
      any: [/^b/i, /^(a|c)/i],
    };

    const matchQuarterPatterns = {
      narrow: /^[1234]/i,
      abbreviated: /^q[1234]/i,
      wide: /^[1234](th|st|nd|rd)? quarter/i,
    };
    const parseQuarterPatterns = {
      any: [/1/i, /2/i, /3/i, /4/i],
    };

    const matchMonthPatterns = {
      narrow: /^[jfmasond]/i,
      abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
      wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
    };
    const parseMonthPatterns = {
      narrow: [
        /^j/i,
        /^f/i,
        /^m/i,
        /^a/i,
        /^m/i,
        /^j/i,
        /^j/i,
        /^a/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i,
      ],

      any: [
        /^ja/i,
        /^f/i,
        /^mar/i,
        /^ap/i,
        /^may/i,
        /^jun/i,
        /^jul/i,
        /^au/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i,
      ],
    };

    const matchDayPatterns = {
      narrow: /^[smtwf]/i,
      short: /^(su|mo|tu|we|th|fr|sa)/i,
      abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
      wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
    };
    const parseDayPatterns = {
      narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
      any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
    };

    const matchDayPeriodPatterns = {
      narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
      any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
    };
    const parseDayPeriodPatterns = {
      any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i,
      },
    };

    const match = {
      ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: (value) => parseInt(value, 10),
      }),

      era: buildMatchFn({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseEraPatterns,
        defaultParseWidth: "any",
      }),

      quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: "any",
        valueCallback: (index) => index + 1,
      }),

      month: buildMatchFn({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: "any",
      }),

      day: buildMatchFn({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseDayPatterns,
        defaultParseWidth: "any",
      }),

      dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: "any",
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: "any",
      }),
    };

    /**
     * @category Locales
     * @summary English locale (United States).
     * @language English
     * @iso-639-2 eng
     * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
     * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
     */
    const enUS = {
      code: "en-US",
      formatDistance: formatDistance,
      formatLong: formatLong,
      formatRelative: formatRelative,
      localize: localize,
      match: match,
      options: {
        weekStartsOn: 0 /* Sunday */,
        firstWeekContainsDate: 1,
      },
    };

    /**
     * @name getDayOfYear
     * @category Day Helpers
     * @summary Get the day of the year of the given date.
     *
     * @description
     * Get the day of the year of the given date.
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     *
     * @returns The day of year
     *
     * @example
     * // Which day of the year is 2 July 2014?
     * const result = getDayOfYear(new Date(2014, 6, 2))
     * //=> 183
     */
    function getDayOfYear(date) {
      const _date = toDate(date);
      const diff = differenceInCalendarDays(_date, startOfYear(_date));
      const dayOfYear = diff + 1;
      return dayOfYear;
    }

    /**
     * @name getISOWeek
     * @category ISO Week Helpers
     * @summary Get the ISO week of the given date.
     *
     * @description
     * Get the ISO week of the given date.
     *
     * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     *
     * @returns The ISO week
     *
     * @example
     * // Which week of the ISO-week numbering year is 2 January 2005?
     * const result = getISOWeek(new Date(2005, 0, 2))
     * //=> 53
     */
    function getISOWeek(date) {
      const _date = toDate(date);
      const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);

      // Round the number of weeks to the nearest integer because the number of
      // milliseconds in a week is not constant (e.g. it's different in the week of
      // the daylight saving time clock shift).
      return Math.round(diff / millisecondsInWeek) + 1;
    }

    /**
     * The {@link getWeekYear} function options.
     */

    /**
     * @name getWeekYear
     * @category Week-Numbering Year Helpers
     * @summary Get the local week-numbering year of the given date.
     *
     * @description
     * Get the local week-numbering year of the given date.
     * The exact calculation depends on the values of
     * `options.weekStartsOn` (which is the index of the first day of the week)
     * and `options.firstWeekContainsDate` (which is the day of January, which is always in
     * the first week of the week-numbering year)
     *
     * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     * @param options - An object with options.
     *
     * @returns The local week-numbering year
     *
     * @example
     * // Which week numbering year is 26 December 2004 with the default settings?
     * const result = getWeekYear(new Date(2004, 11, 26))
     * //=> 2005
     *
     * @example
     * // Which week numbering year is 26 December 2004 if week starts on Saturday?
     * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
     * //=> 2004
     *
     * @example
     * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
     * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
     * //=> 2004
     */
    function getWeekYear(date, options) {
      const _date = toDate(date);
      const year = _date.getFullYear();

      const defaultOptions = getDefaultOptions();
      const firstWeekContainsDate =
        options?.firstWeekContainsDate ??
        options?.locale?.options?.firstWeekContainsDate ??
        defaultOptions.firstWeekContainsDate ??
        defaultOptions.locale?.options?.firstWeekContainsDate ??
        1;

      const firstWeekOfNextYear = constructFrom(date, 0);
      firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
      firstWeekOfNextYear.setHours(0, 0, 0, 0);
      const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);

      const firstWeekOfThisYear = constructFrom(date, 0);
      firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
      firstWeekOfThisYear.setHours(0, 0, 0, 0);
      const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);

      if (_date.getTime() >= startOfNextYear.getTime()) {
        return year + 1;
      } else if (_date.getTime() >= startOfThisYear.getTime()) {
        return year;
      } else {
        return year - 1;
      }
    }

    /**
     * The {@link startOfWeekYear} function options.
     */

    /**
     * @name startOfWeekYear
     * @category Week-Numbering Year Helpers
     * @summary Return the start of a local week-numbering year for the given date.
     *
     * @description
     * Return the start of a local week-numbering year.
     * The exact calculation depends on the values of
     * `options.weekStartsOn` (which is the index of the first day of the week)
     * and `options.firstWeekContainsDate` (which is the day of January, which is always in
     * the first week of the week-numbering year)
     *
     * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     * @param options - An object with options
     *
     * @returns The start of a week-numbering year
     *
     * @example
     * // The start of an a week-numbering year for 2 July 2005 with default settings:
     * const result = startOfWeekYear(new Date(2005, 6, 2))
     * //=> Sun Dec 26 2004 00:00:00
     *
     * @example
     * // The start of a week-numbering year for 2 July 2005
     * // if Monday is the first day of week
     * // and 4 January is always in the first week of the year:
     * const result = startOfWeekYear(new Date(2005, 6, 2), {
     *   weekStartsOn: 1,
     *   firstWeekContainsDate: 4
     * })
     * //=> Mon Jan 03 2005 00:00:00
     */
    function startOfWeekYear(date, options) {
      const defaultOptions = getDefaultOptions();
      const firstWeekContainsDate =
        options?.firstWeekContainsDate ??
        options?.locale?.options?.firstWeekContainsDate ??
        defaultOptions.firstWeekContainsDate ??
        defaultOptions.locale?.options?.firstWeekContainsDate ??
        1;

      const year = getWeekYear(date, options);
      const firstWeek = constructFrom(date, 0);
      firstWeek.setFullYear(year, 0, firstWeekContainsDate);
      firstWeek.setHours(0, 0, 0, 0);
      const _date = startOfWeek(firstWeek, options);
      return _date;
    }

    /**
     * The {@link getWeek} function options.
     */

    /**
     * @name getWeek
     * @category Week Helpers
     * @summary Get the local week index of the given date.
     *
     * @description
     * Get the local week index of the given date.
     * The exact calculation depends on the values of
     * `options.weekStartsOn` (which is the index of the first day of the week)
     * and `options.firstWeekContainsDate` (which is the day of January, which is always in
     * the first week of the week-numbering year)
     *
     * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The given date
     * @param options - An object with options
     *
     * @returns The week
     *
     * @example
     * // Which week of the local week numbering year is 2 January 2005 with default options?
     * const result = getWeek(new Date(2005, 0, 2))
     * //=> 2
     *
     * @example
     * // Which week of the local week numbering year is 2 January 2005,
     * // if Monday is the first day of the week,
     * // and the first week of the year always contains 4 January?
     * const result = getWeek(new Date(2005, 0, 2), {
     *   weekStartsOn: 1,
     *   firstWeekContainsDate: 4
     * })
     * //=> 53
     */

    function getWeek(date, options) {
      const _date = toDate(date);
      const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);

      // Round the number of weeks to the nearest integer because the number of
      // milliseconds in a week is not constant (e.g. it's different in the week of
      // the daylight saving time clock shift).
      return Math.round(diff / millisecondsInWeek) + 1;
    }

    function addLeadingZeros(number, targetLength) {
      const sign = number < 0 ? "-" : "";
      const output = Math.abs(number).toString().padStart(targetLength, "0");
      return sign + output;
    }

    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* |                                |
     * |  d  | Day of month                   |  D  |                                |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  m  | Minute                         |  M  | Month                          |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  y  | Year (abs)                     |  Y  |                                |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     */

    const lightFormatters = {
      // Year
      y(date, token) {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

        const signedYear = date.getFullYear();
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        const year = signedYear > 0 ? signedYear : 1 - signedYear;
        return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
      },

      // Month
      M(date, token) {
        const month = date.getMonth();
        return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
      },

      // Day of the month
      d(date, token) {
        return addLeadingZeros(date.getDate(), token.length);
      },

      // AM or PM
      a(date, token) {
        const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

        switch (token) {
          case "a":
          case "aa":
            return dayPeriodEnumValue.toUpperCase();
          case "aaa":
            return dayPeriodEnumValue;
          case "aaaaa":
            return dayPeriodEnumValue[0];
          case "aaaa":
          default:
            return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
        }
      },

      // Hour [1-12]
      h(date, token) {
        return addLeadingZeros(date.getHours() % 12 || 12, token.length);
      },

      // Hour [0-23]
      H(date, token) {
        return addLeadingZeros(date.getHours(), token.length);
      },

      // Minute
      m(date, token) {
        return addLeadingZeros(date.getMinutes(), token.length);
      },

      // Second
      s(date, token) {
        return addLeadingZeros(date.getSeconds(), token.length);
      },

      // Fraction of second
      S(date, token) {
        const numberOfDigits = token.length;
        const milliseconds = date.getMilliseconds();
        const fractionalSeconds = Math.trunc(
          milliseconds * Math.pow(10, numberOfDigits - 3),
        );
        return addLeadingZeros(fractionalSeconds, token.length);
      },
    };

    const dayPeriodEnum = {
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    };

    /*
     * |     | Unit                           |     | Unit                           |
     * |-----|--------------------------------|-----|--------------------------------|
     * |  a  | AM, PM                         |  A* | Milliseconds in day            |
     * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
     * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
     * |  d  | Day of month                   |  D  | Day of year                    |
     * |  e  | Local day of week              |  E  | Day of week                    |
     * |  f  |                                |  F* | Day of week in month           |
     * |  g* | Modified Julian day            |  G  | Era                            |
     * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
     * |  i! | ISO day of week                |  I! | ISO week of year               |
     * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
     * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
     * |  l* | (deprecated)                   |  L  | Stand-alone month              |
     * |  m  | Minute                         |  M  | Month                          |
     * |  n  |                                |  N  |                                |
     * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
     * |  p! | Long localized time            |  P! | Long localized date            |
     * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
     * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
     * |  s  | Second                         |  S  | Fraction of second             |
     * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
     * |  u  | Extended year                  |  U* | Cyclic year                    |
     * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
     * |  w  | Local week of year             |  W* | Week of month                  |
     * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
     * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
     * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
     *
     * Letters marked by * are not implemented but reserved by Unicode standard.
     *
     * Letters marked by ! are non-standard, but implemented by date-fns:
     * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
     * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
     *   i.e. 7 for Sunday, 1 for Monday, etc.
     * - `I` is ISO week of year, as opposed to `w` which is local week of year.
     * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
     *   `R` is supposed to be used in conjunction with `I` and `i`
     *   for universal ISO week-numbering date, whereas
     *   `Y` is supposed to be used in conjunction with `w` and `e`
     *   for week-numbering date specific to the locale.
     * - `P` is long localized date format
     * - `p` is long localized time format
     */

    const formatters = {
      // Era
      G: function (date, token, localize) {
        const era = date.getFullYear() > 0 ? 1 : 0;
        switch (token) {
          // AD, BC
          case "G":
          case "GG":
          case "GGG":
            return localize.era(era, { width: "abbreviated" });
          // A, B
          case "GGGGG":
            return localize.era(era, { width: "narrow" });
          // Anno Domini, Before Christ
          case "GGGG":
          default:
            return localize.era(era, { width: "wide" });
        }
      },

      // Year
      y: function (date, token, localize) {
        // Ordinal number
        if (token === "yo") {
          const signedYear = date.getFullYear();
          // Returns 1 for 1 BC (which is year 0 in JavaScript)
          const year = signedYear > 0 ? signedYear : 1 - signedYear;
          return localize.ordinalNumber(year, { unit: "year" });
        }

        return lightFormatters.y(date, token);
      },

      // Local week-numbering year
      Y: function (date, token, localize, options) {
        const signedWeekYear = getWeekYear(date, options);
        // Returns 1 for 1 BC (which is year 0 in JavaScript)
        const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

        // Two digit year
        if (token === "YY") {
          const twoDigitYear = weekYear % 100;
          return addLeadingZeros(twoDigitYear, 2);
        }

        // Ordinal number
        if (token === "Yo") {
          return localize.ordinalNumber(weekYear, { unit: "year" });
        }

        // Padding
        return addLeadingZeros(weekYear, token.length);
      },

      // ISO week-numbering year
      R: function (date, token) {
        const isoWeekYear = getISOWeekYear(date);

        // Padding
        return addLeadingZeros(isoWeekYear, token.length);
      },

      // Extended year. This is a single number designating the year of this calendar system.
      // The main difference between `y` and `u` localizers are B.C. years:
      // | Year | `y` | `u` |
      // |------|-----|-----|
      // | AC 1 |   1 |   1 |
      // | BC 1 |   1 |   0 |
      // | BC 2 |   2 |  -1 |
      // Also `yy` always returns the last two digits of a year,
      // while `uu` pads single digit years to 2 characters and returns other years unchanged.
      u: function (date, token) {
        const year = date.getFullYear();
        return addLeadingZeros(year, token.length);
      },

      // Quarter
      Q: function (date, token, localize) {
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        switch (token) {
          // 1, 2, 3, 4
          case "Q":
            return String(quarter);
          // 01, 02, 03, 04
          case "QQ":
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th
          case "Qo":
            return localize.ordinalNumber(quarter, { unit: "quarter" });
          // Q1, Q2, Q3, Q4
          case "QQQ":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "formatting",
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case "QQQQQ":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "formatting",
            });
          // 1st quarter, 2nd quarter, ...
          case "QQQQ":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      // Stand-alone quarter
      q: function (date, token, localize) {
        const quarter = Math.ceil((date.getMonth() + 1) / 3);
        switch (token) {
          // 1, 2, 3, 4
          case "q":
            return String(quarter);
          // 01, 02, 03, 04
          case "qq":
            return addLeadingZeros(quarter, 2);
          // 1st, 2nd, 3rd, 4th
          case "qo":
            return localize.ordinalNumber(quarter, { unit: "quarter" });
          // Q1, Q2, Q3, Q4
          case "qqq":
            return localize.quarter(quarter, {
              width: "abbreviated",
              context: "standalone",
            });
          // 1, 2, 3, 4 (narrow quarter; could be not numerical)
          case "qqqqq":
            return localize.quarter(quarter, {
              width: "narrow",
              context: "standalone",
            });
          // 1st quarter, 2nd quarter, ...
          case "qqqq":
          default:
            return localize.quarter(quarter, {
              width: "wide",
              context: "standalone",
            });
        }
      },

      // Month
      M: function (date, token, localize) {
        const month = date.getMonth();
        switch (token) {
          case "M":
          case "MM":
            return lightFormatters.M(date, token);
          // 1st, 2nd, ..., 12th
          case "Mo":
            return localize.ordinalNumber(month + 1, { unit: "month" });
          // Jan, Feb, ..., Dec
          case "MMM":
            return localize.month(month, {
              width: "abbreviated",
              context: "formatting",
            });
          // J, F, ..., D
          case "MMMMM":
            return localize.month(month, {
              width: "narrow",
              context: "formatting",
            });
          // January, February, ..., December
          case "MMMM":
          default:
            return localize.month(month, { width: "wide", context: "formatting" });
        }
      },

      // Stand-alone month
      L: function (date, token, localize) {
        const month = date.getMonth();
        switch (token) {
          // 1, 2, ..., 12
          case "L":
            return String(month + 1);
          // 01, 02, ..., 12
          case "LL":
            return addLeadingZeros(month + 1, 2);
          // 1st, 2nd, ..., 12th
          case "Lo":
            return localize.ordinalNumber(month + 1, { unit: "month" });
          // Jan, Feb, ..., Dec
          case "LLL":
            return localize.month(month, {
              width: "abbreviated",
              context: "standalone",
            });
          // J, F, ..., D
          case "LLLLL":
            return localize.month(month, {
              width: "narrow",
              context: "standalone",
            });
          // January, February, ..., December
          case "LLLL":
          default:
            return localize.month(month, { width: "wide", context: "standalone" });
        }
      },

      // Local week of year
      w: function (date, token, localize, options) {
        const week = getWeek(date, options);

        if (token === "wo") {
          return localize.ordinalNumber(week, { unit: "week" });
        }

        return addLeadingZeros(week, token.length);
      },

      // ISO week of year
      I: function (date, token, localize) {
        const isoWeek = getISOWeek(date);

        if (token === "Io") {
          return localize.ordinalNumber(isoWeek, { unit: "week" });
        }

        return addLeadingZeros(isoWeek, token.length);
      },

      // Day of the month
      d: function (date, token, localize) {
        if (token === "do") {
          return localize.ordinalNumber(date.getDate(), { unit: "date" });
        }

        return lightFormatters.d(date, token);
      },

      // Day of year
      D: function (date, token, localize) {
        const dayOfYear = getDayOfYear(date);

        if (token === "Do") {
          return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
        }

        return addLeadingZeros(dayOfYear, token.length);
      },

      // Day of week
      E: function (date, token, localize) {
        const dayOfWeek = date.getDay();
        switch (token) {
          // Tue
          case "E":
          case "EE":
          case "EEE":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });
          // T
          case "EEEEE":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });
          // Tu
          case "EEEEEE":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });
          // Tuesday
          case "EEEE":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      // Local day of week
      e: function (date, token, localize, options) {
        const dayOfWeek = date.getDay();
        const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          // Numerical value (Nth day of week with current locale or weekStartsOn)
          case "e":
            return String(localDayOfWeek);
          // Padded numerical value
          case "ee":
            return addLeadingZeros(localDayOfWeek, 2);
          // 1st, 2nd, ..., 7th
          case "eo":
            return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
          case "eee":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });
          // T
          case "eeeee":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });
          // Tu
          case "eeeeee":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });
          // Tuesday
          case "eeee":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      // Stand-alone local day of week
      c: function (date, token, localize, options) {
        const dayOfWeek = date.getDay();
        const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch (token) {
          // Numerical value (same as in `e`)
          case "c":
            return String(localDayOfWeek);
          // Padded numerical value
          case "cc":
            return addLeadingZeros(localDayOfWeek, token.length);
          // 1st, 2nd, ..., 7th
          case "co":
            return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
          case "ccc":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "standalone",
            });
          // T
          case "ccccc":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "standalone",
            });
          // Tu
          case "cccccc":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "standalone",
            });
          // Tuesday
          case "cccc":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "standalone",
            });
        }
      },

      // ISO day of week
      i: function (date, token, localize) {
        const dayOfWeek = date.getDay();
        const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
        switch (token) {
          // 2
          case "i":
            return String(isoDayOfWeek);
          // 02
          case "ii":
            return addLeadingZeros(isoDayOfWeek, token.length);
          // 2nd
          case "io":
            return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
          // Tue
          case "iii":
            return localize.day(dayOfWeek, {
              width: "abbreviated",
              context: "formatting",
            });
          // T
          case "iiiii":
            return localize.day(dayOfWeek, {
              width: "narrow",
              context: "formatting",
            });
          // Tu
          case "iiiiii":
            return localize.day(dayOfWeek, {
              width: "short",
              context: "formatting",
            });
          // Tuesday
          case "iiii":
          default:
            return localize.day(dayOfWeek, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      // AM or PM
      a: function (date, token, localize) {
        const hours = date.getHours();
        const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

        switch (token) {
          case "a":
          case "aa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });
          case "aaa":
            return localize
              .dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              })
              .toLowerCase();
          case "aaaaa":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });
          case "aaaa":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      // AM, PM, midnight, noon
      b: function (date, token, localize) {
        const hours = date.getHours();
        let dayPeriodEnumValue;
        if (hours === 12) {
          dayPeriodEnumValue = dayPeriodEnum.noon;
        } else if (hours === 0) {
          dayPeriodEnumValue = dayPeriodEnum.midnight;
        } else {
          dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        }

        switch (token) {
          case "b":
          case "bb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });
          case "bbb":
            return localize
              .dayPeriod(dayPeriodEnumValue, {
                width: "abbreviated",
                context: "formatting",
              })
              .toLowerCase();
          case "bbbbb":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });
          case "bbbb":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      // in the morning, in the afternoon, in the evening, at night
      B: function (date, token, localize) {
        const hours = date.getHours();
        let dayPeriodEnumValue;
        if (hours >= 17) {
          dayPeriodEnumValue = dayPeriodEnum.evening;
        } else if (hours >= 12) {
          dayPeriodEnumValue = dayPeriodEnum.afternoon;
        } else if (hours >= 4) {
          dayPeriodEnumValue = dayPeriodEnum.morning;
        } else {
          dayPeriodEnumValue = dayPeriodEnum.night;
        }

        switch (token) {
          case "B":
          case "BB":
          case "BBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "abbreviated",
              context: "formatting",
            });
          case "BBBBB":
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "narrow",
              context: "formatting",
            });
          case "BBBB":
          default:
            return localize.dayPeriod(dayPeriodEnumValue, {
              width: "wide",
              context: "formatting",
            });
        }
      },

      // Hour [1-12]
      h: function (date, token, localize) {
        if (token === "ho") {
          let hours = date.getHours() % 12;
          if (hours === 0) hours = 12;
          return localize.ordinalNumber(hours, { unit: "hour" });
        }

        return lightFormatters.h(date, token);
      },

      // Hour [0-23]
      H: function (date, token, localize) {
        if (token === "Ho") {
          return localize.ordinalNumber(date.getHours(), { unit: "hour" });
        }

        return lightFormatters.H(date, token);
      },

      // Hour [0-11]
      K: function (date, token, localize) {
        const hours = date.getHours() % 12;

        if (token === "Ko") {
          return localize.ordinalNumber(hours, { unit: "hour" });
        }

        return addLeadingZeros(hours, token.length);
      },

      // Hour [1-24]
      k: function (date, token, localize) {
        let hours = date.getHours();
        if (hours === 0) hours = 24;

        if (token === "ko") {
          return localize.ordinalNumber(hours, { unit: "hour" });
        }

        return addLeadingZeros(hours, token.length);
      },

      // Minute
      m: function (date, token, localize) {
        if (token === "mo") {
          return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
        }

        return lightFormatters.m(date, token);
      },

      // Second
      s: function (date, token, localize) {
        if (token === "so") {
          return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
        }

        return lightFormatters.s(date, token);
      },

      // Fraction of second
      S: function (date, token) {
        return lightFormatters.S(date, token);
      },

      // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
      X: function (date, token, _localize) {
        const timezoneOffset = date.getTimezoneOffset();

        if (timezoneOffset === 0) {
          return "Z";
        }

        switch (token) {
          // Hours and optional minutes
          case "X":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XX`
          case "XXXX":
          case "XX": // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);

          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `XXX`
          case "XXXXX":
          case "XXX": // Hours and minutes with `:` delimiter
          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },

      // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
      x: function (date, token, _localize) {
        const timezoneOffset = date.getTimezoneOffset();

        switch (token) {
          // Hours and optional minutes
          case "x":
            return formatTimezoneWithOptionalMinutes(timezoneOffset);

          // Hours, minutes and optional seconds without `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xx`
          case "xxxx":
          case "xx": // Hours and minutes without `:` delimiter
            return formatTimezone(timezoneOffset);

          // Hours, minutes and optional seconds with `:` delimiter
          // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
          // so this token always has the same output as `xxx`
          case "xxxxx":
          case "xxx": // Hours and minutes with `:` delimiter
          default:
            return formatTimezone(timezoneOffset, ":");
        }
      },

      // Timezone (GMT)
      O: function (date, token, _localize) {
        const timezoneOffset = date.getTimezoneOffset();

        switch (token) {
          // Short
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");
          // Long
          case "OOOO":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },

      // Timezone (specific non-location)
      z: function (date, token, _localize) {
        const timezoneOffset = date.getTimezoneOffset();

        switch (token) {
          // Short
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + formatTimezoneShort(timezoneOffset, ":");
          // Long
          case "zzzz":
          default:
            return "GMT" + formatTimezone(timezoneOffset, ":");
        }
      },

      // Seconds timestamp
      t: function (date, token, _localize) {
        const timestamp = Math.trunc(date.getTime() / 1000);
        return addLeadingZeros(timestamp, token.length);
      },

      // Milliseconds timestamp
      T: function (date, token, _localize) {
        const timestamp = date.getTime();
        return addLeadingZeros(timestamp, token.length);
      },
    };

    function formatTimezoneShort(offset, delimiter = "") {
      const sign = offset > 0 ? "-" : "+";
      const absOffset = Math.abs(offset);
      const hours = Math.trunc(absOffset / 60);
      const minutes = absOffset % 60;
      if (minutes === 0) {
        return sign + String(hours);
      }
      return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
    }

    function formatTimezoneWithOptionalMinutes(offset, delimiter) {
      if (offset % 60 === 0) {
        const sign = offset > 0 ? "-" : "+";
        return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
      }
      return formatTimezone(offset, delimiter);
    }

    function formatTimezone(offset, delimiter = "") {
      const sign = offset > 0 ? "-" : "+";
      const absOffset = Math.abs(offset);
      const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
      const minutes = addLeadingZeros(absOffset % 60, 2);
      return sign + hours + delimiter + minutes;
    }

    const dateLongFormatter = (pattern, formatLong) => {
      switch (pattern) {
        case "P":
          return formatLong.date({ width: "short" });
        case "PP":
          return formatLong.date({ width: "medium" });
        case "PPP":
          return formatLong.date({ width: "long" });
        case "PPPP":
        default:
          return formatLong.date({ width: "full" });
      }
    };

    const timeLongFormatter = (pattern, formatLong) => {
      switch (pattern) {
        case "p":
          return formatLong.time({ width: "short" });
        case "pp":
          return formatLong.time({ width: "medium" });
        case "ppp":
          return formatLong.time({ width: "long" });
        case "pppp":
        default:
          return formatLong.time({ width: "full" });
      }
    };

    const dateTimeLongFormatter = (pattern, formatLong) => {
      const matchResult = pattern.match(/(P+)(p+)?/) || [];
      const datePattern = matchResult[1];
      const timePattern = matchResult[2];

      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }

      let dateTimeFormat;

      switch (datePattern) {
        case "P":
          dateTimeFormat = formatLong.dateTime({ width: "short" });
          break;
        case "PP":
          dateTimeFormat = formatLong.dateTime({ width: "medium" });
          break;
        case "PPP":
          dateTimeFormat = formatLong.dateTime({ width: "long" });
          break;
        case "PPPP":
        default:
          dateTimeFormat = formatLong.dateTime({ width: "full" });
          break;
      }

      return dateTimeFormat
        .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
        .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
    };

    const longFormatters = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter,
    };

    const dayOfYearTokenRE = /^D+$/;
    const weekYearTokenRE = /^Y+$/;

    const throwTokens = ["D", "DD", "YY", "YYYY"];

    function isProtectedDayOfYearToken(token) {
      return dayOfYearTokenRE.test(token);
    }

    function isProtectedWeekYearToken(token) {
      return weekYearTokenRE.test(token);
    }

    function warnOrThrowProtectedError(token, format, input) {
      const _message = message(token, format, input);
      console.warn(_message);
      if (throwTokens.includes(token)) throw new RangeError(_message);
    }

    function message(token, format, input) {
      const subject = token[0] === "Y" ? "years" : "days of the month";
      return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
    }

    // This RegExp consists of three parts separated by `|`:
    // - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
    //   (one of the certain letters followed by `o`)
    // - (\w)\1* matches any sequences of the same letter
    // - '' matches two quote characters in a row
    // - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
    //   except a single quote symbol, which ends the sequence.
    //   Two quote characters do not end the sequence.
    //   If there is no matching single quote
    //   then the sequence will continue until the end of the string.
    // - . matches any single character unmatched by previous parts of the RegExps
    const formattingTokensRegExp =
      /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

    // This RegExp catches symbols escaped by quotes, and also
    // sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
    const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

    const escapedStringRegExp = /^'([^]*?)'?$/;
    const doubleQuoteRegExp = /''/g;
    const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

    /**
     * The {@link format} function options.
     */

    /**
     * @name format
     * @alias formatDate
     * @category Common Helpers
     * @summary Format the date.
     *
     * @description
     * Return the formatted date string in the given format. The result may vary by locale.
     *
     * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
     * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * The characters wrapped between two single quotes characters (') are escaped.
     * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
     * (see the last example)
     *
     * Format of the string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * with a few additions (see note 7 below the table).
     *
     * Accepted patterns:
     * | Unit                            | Pattern | Result examples                   | Notes |
     * |---------------------------------|---------|-----------------------------------|-------|
     * | Era                             | G..GGG  | AD, BC                            |       |
     * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
     * |                                 | GGGGG   | A, B                              |       |
     * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
     * |                                 | yy      | 44, 01, 00, 17                    | 5     |
     * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
     * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
     * |                                 | yyyyy   | ...                               | 3,5   |
     * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
     * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
     * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
     * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
     * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
     * |                                 | YYYYY   | ...                               | 3,5   |
     * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
     * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
     * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
     * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
     * |                                 | RRRRR   | ...                               | 3,5,7 |
     * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
     * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
     * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
     * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
     * |                                 | uuuuu   | ...                               | 3,5   |
     * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
     * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | QQ      | 01, 02, 03, 04                    |       |
     * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
     * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
     * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
     * |                                 | qq      | 01, 02, 03, 04                    |       |
     * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
     * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
     * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
     * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
     * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | MM      | 01, 02, ..., 12                   |       |
     * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
     * |                                 | MMMM    | January, February, ..., December  | 2     |
     * |                                 | MMMMM   | J, F, ..., D                      |       |
     * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
     * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
     * |                                 | LL      | 01, 02, ..., 12                   |       |
     * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
     * |                                 | LLLL    | January, February, ..., December  | 2     |
     * |                                 | LLLLL   | J, F, ..., D                      |       |
     * | Local week of year              | w       | 1, 2, ..., 53                     |       |
     * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | ww      | 01, 02, ..., 53                   |       |
     * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
     * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
     * |                                 | II      | 01, 02, ..., 53                   | 7     |
     * | Day of month                    | d       | 1, 2, ..., 31                     |       |
     * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
     * |                                 | dd      | 01, 02, ..., 31                   |       |
     * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
     * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
     * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
     * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
     * |                                 | DDDD    | ...                               | 3     |
     * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
     * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
     * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
     * |                                 | ii      | 01, 02, ..., 07                   | 7     |
     * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
     * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
     * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
     * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
     * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
     * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | ee      | 02, 03, ..., 01                   |       |
     * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
     * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
     * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
     * |                                 | cc      | 02, 03, ..., 01                   |       |
     * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
     * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
     * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
     * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
     * | AM, PM                          | a..aa   | AM, PM                            |       |
     * |                                 | aaa     | am, pm                            |       |
     * |                                 | aaaa    | a.m., p.m.                        | 2     |
     * |                                 | aaaaa   | a, p                              |       |
     * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
     * |                                 | bbb     | am, pm, noon, midnight            |       |
     * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
     * |                                 | bbbbb   | a, p, n, mi                       |       |
     * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
     * |                                 | BBBB    | at night, in the morning, ...     | 2     |
     * |                                 | BBBBB   | at night, in the morning, ...     |       |
     * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
     * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
     * |                                 | hh      | 01, 02, ..., 11, 12               |       |
     * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
     * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
     * |                                 | HH      | 00, 01, 02, ..., 23               |       |
     * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
     * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
     * |                                 | KK      | 01, 02, ..., 11, 00               |       |
     * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
     * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
     * |                                 | kk      | 24, 01, 02, ..., 23               |       |
     * | Minute                          | m       | 0, 1, ..., 59                     |       |
     * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | mm      | 00, 01, ..., 59                   |       |
     * | Second                          | s       | 0, 1, ..., 59                     |       |
     * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
     * |                                 | ss      | 00, 01, ..., 59                   |       |
     * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
     * |                                 | SS      | 00, 01, ..., 99                   |       |
     * |                                 | SSS     | 000, 001, ..., 999                |       |
     * |                                 | SSSS    | ...                               | 3     |
     * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
     * |                                 | XX      | -0800, +0530, Z                   |       |
     * |                                 | XXX     | -08:00, +05:30, Z                 |       |
     * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
     * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
     * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
     * |                                 | xx      | -0800, +0530, +0000               |       |
     * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
     * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
     * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
     * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
     * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
     * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
     * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
     * | Seconds timestamp               | t       | 512969520                         | 7     |
     * |                                 | tt      | ...                               | 3,7   |
     * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
     * |                                 | TT      | ...                               | 3,7   |
     * | Long localized date             | P       | 04/29/1453                        | 7     |
     * |                                 | PP      | Apr 29, 1453                      | 7     |
     * |                                 | PPP     | April 29th, 1453                  | 7     |
     * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
     * | Long localized time             | p       | 12:00 AM                          | 7     |
     * |                                 | pp      | 12:00:00 AM                       | 7     |
     * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
     * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
     * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
     * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
     * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
     * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
     * Notes:
     * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
     *    are the same as "stand-alone" units, but are different in some languages.
     *    "Formatting" units are declined according to the rules of the language
     *    in the context of a date. "Stand-alone" units are always nominative singular:
     *
     *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
     *
     *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
     *
     * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
     *    the single quote characters (see below).
     *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
     *    the output will be the same as default pattern for this unit, usually
     *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
     *    are marked with "2" in the last column of the table.
     *
     *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
     *
     *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
     *
     * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
     *    The output will be padded with zeros to match the length of the pattern.
     *
     *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
     *
     * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
     *    These tokens represent the shortest form of the quarter.
     *
     * 5. The main difference between `y` and `u` patterns are B.C. years:
     *
     *    | Year | `y` | `u` |
     *    |------|-----|-----|
     *    | AC 1 |   1 |   1 |
     *    | BC 1 |   1 |   0 |
     *    | BC 2 |   2 |  -1 |
     *
     *    Also `yy` always returns the last two digits of a year,
     *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
     *
     *    | Year | `yy` | `uu` |
     *    |------|------|------|
     *    | 1    |   01 |   01 |
     *    | 14   |   14 |   14 |
     *    | 376  |   76 |  376 |
     *    | 1453 |   53 | 1453 |
     *
     *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
     *    except local week-numbering years are dependent on `options.weekStartsOn`
     *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
     *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
     *
     * 6. Specific non-location timezones are currently unavailable in `date-fns`,
     *    so right now these tokens fall back to GMT timezones.
     *
     * 7. These patterns are not in the Unicode Technical Standard #35:
     *    - `i`: ISO day of week
     *    - `I`: ISO week of year
     *    - `R`: ISO week-numbering year
     *    - `t`: seconds timestamp
     *    - `T`: milliseconds timestamp
     *    - `o`: ordinal number modifier
     *    - `P`: long localized date
     *    - `p`: long localized time
     *
     * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
     *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
     *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     *
     * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
     *
     * @param date - The original date
     * @param format - The string of tokens
     * @param options - An object with options
     *
     * @returns The formatted date string
     *
     * @throws `date` must not be Invalid Date
     * @throws `options.locale` must contain `localize` property
     * @throws `options.locale` must contain `formatLong` property
     * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     * @throws format string contains an unescaped latin alphabet character
     *
     * @example
     * // Represent 11 February 2014 in middle-endian format:
     * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
     * //=> '02/11/2014'
     *
     * @example
     * // Represent 2 July 2014 in Esperanto:
     * import { eoLocale } from 'date-fns/locale/eo'
     * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
     *   locale: eoLocale
     * })
     * //=> '2-a de julio 2014'
     *
     * @example
     * // Escape string by single quote characters:
     * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
     * //=> "3 o'clock"
     */
    function format(date, formatStr, options) {
      const defaultOptions = getDefaultOptions();
      const locale = defaultOptions.locale ?? enUS;

      const firstWeekContainsDate =
        defaultOptions.firstWeekContainsDate ??
        defaultOptions.locale?.options?.firstWeekContainsDate ??
        1;

      const weekStartsOn =
        defaultOptions.weekStartsOn ??
        defaultOptions.locale?.options?.weekStartsOn ??
        0;

      const originalDate = toDate(date);

      if (!isValid(originalDate)) {
        throw new RangeError("Invalid time value");
      }

      let parts = formatStr
        .match(longFormattingTokensRegExp)
        .map((substring) => {
          const firstCharacter = substring[0];
          if (firstCharacter === "p" || firstCharacter === "P") {
            const longFormatter = longFormatters[firstCharacter];
            return longFormatter(substring, locale.formatLong);
          }
          return substring;
        })
        .join("")
        .match(formattingTokensRegExp)
        .map((substring) => {
          // Replace two single quote characters with one single quote character
          if (substring === "''") {
            return { isToken: false, value: "'" };
          }

          const firstCharacter = substring[0];
          if (firstCharacter === "'") {
            return { isToken: false, value: cleanEscapedString(substring) };
          }

          if (formatters[firstCharacter]) {
            return { isToken: true, value: substring };
          }

          if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
            throw new RangeError(
              "Format string contains an unescaped latin alphabet character `" +
                firstCharacter +
                "`",
            );
          }

          return { isToken: false, value: substring };
        });

      // invoke localize preprocessor (only for french locales at the moment)
      if (locale.localize.preprocessor) {
        parts = locale.localize.preprocessor(originalDate, parts);
      }

      const formatterOptions = {
        firstWeekContainsDate,
        weekStartsOn,
        locale,
      };

      return parts
        .map((part) => {
          if (!part.isToken) return part.value;

          const token = part.value;

          if (
            (isProtectedWeekYearToken(token)) ||
            (isProtectedDayOfYearToken(token))
          ) {
            warnOrThrowProtectedError(token, formatStr, String(date));
          }

          const formatter = formatters[token[0]];
          return formatter(originalDate, token, locale.localize, formatterOptions);
        })
        .join("");
    }

    function cleanEscapedString(input) {
      const matched = input.match(escapedStringRegExp);

      if (!matched) {
        return input;
      }

      return matched[1].replace(doubleQuoteRegExp, "'");
    }

    // Date Utilities for WeRelease SDK
    /**
     * Format a date for display in the banner
     */
    function formatReleaseDate(dateString) {
        if (!dateString) {
            return '';
        }
        try {
            var date = new Date(dateString);
            if (!isValid(date)) {
                return '';
            }
            var daysSince = differenceInDays(new Date(), date);
            if (daysSince === 0) {
                return 'Today';
            }
            else if (daysSince === 1) {
                return 'Yesterday';
            }
            else if (daysSince < 7) {
                return "".concat(daysSince, " days ago");
            }
            else if (daysSince < 30) {
                var weeks = Math.floor(daysSince / 7);
                return "".concat(weeks, " week").concat(weeks !== 1 ? 's' : '', " ago");
            }
            else {
                return format(date, 'MMM d');
            }
        }
        catch (error) {
            console.warn('[WeRelease] Failed to format release date:', error);
            return '';
        }
    }

    // DOM Utilities for WeRelease SDK
    /**
     * Create a DOM element with attributes and content
     */
    /**
     * Append element to target
     */
    function appendToTarget(element, target) {
        var targetElement = typeof target === 'string' ? document.querySelector(target) : target;
        if (targetElement) {
            targetElement.appendChild(element);
        }
        else {
            console.warn('[WeRelease] Target element not found:', target);
        }
    }
    /**
     * Remove element from DOM
     */
    function removeElement(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
    /**
     * Add CSS class to element
     */
    function addClass(element, className) {
        element.classList.add(className);
    }
    /**
     * Remove CSS class from element
     */
    function removeClass(element, className) {
        element.classList.remove(className);
    }
    /**
     * Get viewport dimensions
     */
    function getViewportDimensions() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    // Banner Manager for WeRelease SDK
    var BannerManager = /** @class */ (function () {
        function BannerManager() {
            this.currentBanner = null;
        }
        /**
         * Render banner based on configuration
         */
        BannerManager.prototype.render = function (config) {
            // Remove existing banner if any
            if (this.currentBanner) {
                this.destroy(this.currentBanner);
            }
            var banner = document.createElement('div');
            banner.id = 'werelease-banner';
            if (config.theme === 'premium') {
                this.renderPremiumBanner(banner, config);
            }
            else {
                this.renderBasicBanner(banner, config);
            }
            // Append to target
            appendToTarget(banner, config.target);
            this.currentBanner = banner;
            return banner;
        };
        /**
         * Update banner with new data
         */
        BannerManager.prototype.update = function (element, data) {
            // Update banner content with new changelog data
            var config = this.getBannerConfig(element);
            if (config) {
                config.changelogData = data;
                this.render(config);
            }
        };
        /**
         * Destroy banner and clean up
         */
        BannerManager.prototype.destroy = function (element) {
            if (element && element.parentNode) {
                removeElement(element);
                this.currentBanner = null;
            }
        };
        /**
         * Render basic banner
         */
        BannerManager.prototype.renderBasicBanner = function (banner, config) {
            var redirectUrl = "".concat(API_BASE_URL, "/changelog/").concat(config.projectId);
            var template = renderBasicBannerTemplate(redirectUrl);
            banner.innerHTML = template;
            applyBasicBannerStyles(banner);
            if (config.options.className) {
                addClass(banner, config.options.className);
            }
            // Basic banner doesn't need event listeners - it just redirects
            // this.attachEventListeners(banner, config);
        };
        /**
         * Render premium banner
         */
        BannerManager.prototype.renderPremiumBanner = function (banner, config) {
            var _a, _b, _c, _d, _e;
            var template = renderPremiumBannerTemplate({
                showDismissButton: config.options.showDismissButton,
                makeBannerClickable: config.options.makeBannerClickable,
                releaseTime: ((_a = config.changelogData) === null || _a === void 0 ? void 0 : _a.releaseDate)
                    ? formatReleaseDate(config.changelogData.releaseDate)
                    : '',
                changelog: {
                    title: ((_b = config.changelogData) === null || _b === void 0 ? void 0 : _b.title) || 'New Release Available',
                    subtitle: ((_c = config.changelogData) === null || _c === void 0 ? void 0 : _c.subtitle) || '',
                    version: ((_d = config.changelogData) === null || _d === void 0 ? void 0 : _d.version) || '',
                    tags: ((_e = config.changelogData) === null || _e === void 0 ? void 0 : _e.tags) || '',
                },
            });
            banner.innerHTML = template;
            applyPremiumBannerStyles(banner);
            addPremiumBannerCSS();
            if (config.options.className) {
                addClass(banner, config.options.className);
            }
            this.attachEventListeners(banner, config);
        };
        BannerManager.prototype.attachEventListeners = function (banner, config) {
            var _this = this;
            // Handle banner click
            if (config.options.makeBannerClickable) {
                banner.addEventListener('click', function (event) {
                    if (event.target === banner ||
                        banner.querySelector('.werelease-banner-content')) {
                        _this.handleBannerClick(event, config);
                    }
                });
            }
            // Handle dismiss button click
            var dismissButton = banner.querySelector('.werelease-dismiss-banner');
            if (dismissButton && config.options.showDismissButton) {
                dismissButton.addEventListener('click', function (event) {
                    event.stopPropagation();
                    _this.handleDismissClick(event, config);
                });
            }
            // Handle view changes button click
            var viewChangesButton = banner.querySelector('.werelease-view-changes');
            if (viewChangesButton) {
                viewChangesButton.addEventListener('click', function (event) {
                    event.stopPropagation();
                    _this.handleViewChangesClick(event, config);
                });
            }
        };
        BannerManager.prototype.handleBannerClick = function (event, config) {
            var _a;
            if (config.onBannerClick) {
                config.onBannerClick(event, {
                    projectId: config.projectId,
                    releaseDate: (_a = config.changelogData) === null || _a === void 0 ? void 0 : _a.releaseDate,
                });
            }
        };
        BannerManager.prototype.handleDismissClick = function (event, config) {
            if (config.onDismiss) {
                config.onDismiss(event);
            }
        };
        BannerManager.prototype.handleViewChangesClick = function (event, config) {
            if (config.onViewChanges) {
                config.onViewChanges(event);
            }
        };
        /**
         * Handle emoji reaction
         */
        BannerManager.prototype.handleEmojiReaction = function (emoji, banner) {
            // Add visual feedback
            var emojiButton = banner.querySelector("[data-emoji=\"".concat(emoji, "\"]"));
            if (emojiButton) {
                addClass(emojiButton, 'reacted');
                setTimeout(function () { return removeClass(emojiButton, 'reacted'); }, 1000);
            }
            // Track reaction
            var projectId = banner.getAttribute('data-project-id');
            if (projectId) {
                // Send analytics event
                this.trackEmojiReaction(projectId, emoji);
            }
        };
        /**
         * Track emoji reaction for analytics
         */
        BannerManager.prototype.trackEmojiReaction = function (_projectId, _emoji) {
            // This would integrate with your analytics service
            // Track emoji reaction
        };
        /**
         * Get banner configuration from element
         */
        BannerManager.prototype.getBannerConfig = function (element) {
            var projectId = element.getAttribute('data-project-id');
            var target = element.getAttribute('data-target');
            var theme = element.getAttribute('data-theme');
            if (!projectId || !target)
                return null;
            return {
                projectId: projectId,
                target: target,
                theme: theme || 'basic',
                options: {
                    makeBannerClickable: true,
                },
            };
        };
        return BannerManager;
    }());

    // Simple markdown to HTML converter for basic formatting
    var convertMarkdownToHTML = function (markdown) {
        return (markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Code
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // Lists
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
            // Line breaks
            .replace(/\n/g, '<br/>'));
    };
    // Extract key features from markdown description
    var extractFeatures = function (description, tags) {
        var tagList = tags ? tags.split(',').map(function (t) { return t.trim(); }) : [];
        var lines = description.split('\n').filter(function (line) { return line.trim(); });
        // Try to extract bullet points or features from description
        var bulletPoints = lines.filter(function (line) {
            return line.trim().startsWith('-') ||
                line.trim().startsWith('*') ||
                line.trim().startsWith('•');
        });
        var features = [];
        // If we have bullet points, use them
        if (bulletPoints.length > 0) {
            bulletPoints.slice(0, 4).forEach(function (point, index) {
                var text = point.replace(/^[-*•]\s*/, '').trim();
                var icons = ['✨', '⚡', '🚀', '🎯', '💡', '🔥'];
                features.push({
                    icon: icons[index] || '✨',
                    title: text.length > 30 ? text.substring(0, 30) + '...' : text,
                    detail: text.length > 30 ? text.substring(30) : 'New improvement',
                });
            });
        }
        else {
            // Fallback: use tags and description
            tagList.slice(0, 4).forEach(function (tag, index) {
                var icons = ['✨', '⚡', '🚀', '🎯'];
                features.push({
                    icon: icons[index] || '✨',
                    title: tag.charAt(0).toUpperCase() + tag.slice(1),
                    detail: 'Enhanced functionality',
                });
            });
            // If no tags, create generic features
            if (features.length === 0) {
                features.push({ icon: '✨', title: 'New Features', detail: 'Latest improvements' }, { icon: '⚡', title: 'Performance', detail: 'Faster experience' }, { icon: '🚀', title: 'Enhancements', detail: 'Better usability' }, { icon: '🎯', title: 'Bug Fixes', detail: 'Stability improvements' });
            }
        }
        return features;
    };
    var renderChangesPopoverTemplate = function (changelogData) {
        // Use real data or fallback to defaults
        var title = (changelogData === null || changelogData === void 0 ? void 0 : changelogData.title) || "What's New";
        var subtitle = changelogData === null || changelogData === void 0 ? void 0 : changelogData.subtitle;
        var version = (changelogData === null || changelogData === void 0 ? void 0 : changelogData.version) || 'v1.0.0';
        var description = (changelogData === null || changelogData === void 0 ? void 0 : changelogData.description) ||
            'Check out our latest improvements and features.';
        var tags = (changelogData === null || changelogData === void 0 ? void 0 : changelogData.tags) || '';
        var features = extractFeatures(description, tags);
        return "\n    <div class=\"werelease-popover-overlay werelease-modal-close\">\n      <div class=\"werelease-popover-content\" onclick=\"event.stopPropagation()\">\n        <div class=\"werelease-popover-arrow\"></div>\n        \n        <div class=\"werelease-popover-header\">\n          <div class=\"werelease-header-content\">\n            <span class=\"werelease-rocket-icon\">\uD83D\uDE80</span>\n            <h3>".concat(title, "</h3>\n            <span class=\"werelease-version-badge\">").concat(version, "</span>\n          </div>\n          <button class=\"werelease-popover-close werelease-modal-close\">\u00D7</button>\n        </div>\n        \n        <div class=\"werelease-popover-body\">\n          ").concat(subtitle ? "<div class=\"werelease-subtitle\">".concat(subtitle, "</div>") : '', "\n          \n          <div class=\"werelease-features-grid\">\n            ").concat(features
            .map(function (feature, index) { return "\n              <div class=\"werelease-feature-card\" data-feature=\"feature-".concat(index, "\">\n                <div class=\"werelease-feature-icon\">").concat(feature.icon, "</div>\n                <div class=\"werelease-feature-content\">\n                  <h4>").concat(feature.title, "</h4>\n                  <p>").concat(feature.detail, "</p>\n                </div>\n              </div>\n            "); })
            .join(''), "\n          </div>\n          \n          ").concat(description.length > 200
            ? "\n            <div class=\"werelease-highlight-feature\">\n              <div class=\"werelease-highlight-icon\">\uD83D\uDCDD</div>\n              <div class=\"werelease-highlight-content\">\n                <h4>Full Release Notes</h4>\n                <div class=\"werelease-description-content\">\n                  ".concat(convertMarkdownToHTML(description), "\n                </div>\n              </div>\n            </div>\n          ")
            : '', "\n          \n          <div class=\"werelease-action-bar\">\n            <button class=\"werelease-btn-secondary werelease-modal-close\">\n              Show me later\n            </button>\n            <button class=\"werelease-btn-primary werelease-submit-feedback\">\n              Awesome! \uD83C\uDF89\n            </button>\n            <div class=\"werelease-feedback-loader\" style=\"display: none;\">\n              <div class=\"werelease-spinner\"></div>\n              <span>Saving your feedback...</span>\n            </div>\n            <div class=\"werelease-feedback-success\" style=\"display: none;\">\n              <div class=\"werelease-checkmark\">\n                <svg class=\"werelease-checkmark-circle\" viewBox=\"0 0 52 52\">\n                  <circle class=\"werelease-checkmark-circle-bg\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"/>\n                  <path class=\"werelease-checkmark-check\" fill=\"none\" d=\"m14.1 27.2l7.1 7.2 16.7-16.8\"/>\n                </svg>\n              </div>\n              <span>Thank you for your feedback!</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ");
    };
    var addChangesPopoverCSS = function () {
        // Check if CSS already added
        if (document.getElementById('werelease-popover-styles'))
            return;
        var style = document.createElement('style');
        style.id = 'werelease-popover-styles';
        style.textContent = "\n    .werelease-popover-overlay {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: transparent;\n      z-index: 10000;\n      opacity: 0;\n      transition: opacity 0.3s ease;\n      overflow: hidden;\n      display: flex;\n      align-items: flex-start;\n      justify-content: center;\n      padding-top: 20vh;\n      box-sizing: border-box;\n    }\n    \n    .werelease-popover-content {\n      position: relative;\n      transform: translateY(-20px) scale(0.95);\n      background: #ffffff;\n      border-radius: 16px;\n      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);\n      max-width: 420px;\n      width: 90%;\n      max-height: 80vh;\n      overflow: hidden;\n      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n      box-sizing: border-box;\n      border: 1px solid rgba(255, 255, 255, 0.2);\n    }\n    \n    .werelease-popover-arrow {\n      position: absolute;\n      top: -8px;\n      left: 50%;\n      transform: translateX(-50%);\n      width: 16px;\n      height: 16px;\n      background: #ffffff;\n      border: 1px solid rgba(0, 0, 0, 0.05);\n      border-bottom: none;\n      border-right: none;\n      transform: translateX(-50%) rotate(45deg);\n      z-index: 1;\n    }\n    \n    .werelease-popover-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 24px 24px 16px;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n      position: relative;\n    }\n    \n    .werelease-header-content {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n    \n    .werelease-rocket-icon {\n      font-size: 24px;\n      animation: rocket-bounce 2s ease-in-out infinite;\n    }\n    \n    @keyframes rocket-bounce {\n      0%, 100% { transform: translateY(0px); }\n      50% { transform: translateY(-3px); }\n    }\n    \n    .werelease-popover-header h3 {\n      margin: 0;\n      font-size: 18px;\n      font-weight: 600;\n      color: white;\n    }\n    \n    .werelease-version-badge {\n      background: rgba(255, 255, 255, 0.2);\n      color: white;\n      padding: 4px 8px;\n      border-radius: 12px;\n      font-size: 11px;\n      font-weight: 600;\n      letter-spacing: 0.5px;\n    }\n    \n    .werelease-popover-close {\n      background: rgba(255, 255, 255, 0.2);\n      border: none;\n      color: white;\n      font-size: 18px;\n      cursor: pointer;\n      padding: 8px;\n      border-radius: 8px;\n      transition: all 0.2s ease;\n      width: 36px;\n      height: 36px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n    \n    .werelease-popover-close:hover {\n      background: rgba(255, 255, 255, 0.3);\n      transform: scale(1.05);\n    }\n    \n    .werelease-popover-body {\n      padding: 24px;\n      max-height: 450px;\n      overflow-y: auto;\n      scrollbar-width: thin;\n      scrollbar-color: rgba(102, 126, 234, 0.3) transparent;\n    }\n    \n    .werelease-popover-body::-webkit-scrollbar {\n      width: 6px;\n    }\n    \n    .werelease-popover-body::-webkit-scrollbar-track {\n      background: transparent;\n    }\n    \n    .werelease-popover-body::-webkit-scrollbar-thumb {\n      background: rgba(102, 126, 234, 0.3);\n      border-radius: 3px;\n    }\n    \n    .werelease-popover-body::-webkit-scrollbar-thumb:hover {\n      background: rgba(102, 126, 234, 0.5);\n    }\n    \n    .werelease-subtitle {\n      font-size: 14px;\n      color: #64748b;\n      margin-bottom: 16px;\n      font-style: italic;\n      text-align: center;\n      line-height: 1.4;\n    }\n    \n    .werelease-description-content {\n      font-size: 13px;\n      color: #475569;\n      line-height: 1.5;\n      max-height: 120px;\n      overflow-y: auto;\n      padding: 8px 0;\n    }\n    \n    .werelease-description-content h1,\n    .werelease-description-content h2,\n    .werelease-description-content h3 {\n      font-size: 14px;\n      font-weight: 600;\n      margin: 8px 0 4px 0;\n      color: #1e293b;\n    }\n    \n    .werelease-description-content ul {\n      margin: 8px 0;\n      padding-left: 16px;\n    }\n    \n    .werelease-description-content li {\n      margin: 4px 0;\n    }\n    \n    .werelease-description-content code {\n      background: rgba(102, 126, 234, 0.1);\n      padding: 2px 4px;\n      border-radius: 4px;\n      font-family: monospace;\n      font-size: 12px;\n    }\n    \n    .werelease-features-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 16px;\n      margin-bottom: 24px;\n    }\n    \n    .werelease-feature-card {\n      display: flex;\n      align-items: flex-start;\n      gap: 12px;\n      padding: 16px;\n      border-radius: 12px;\n      background: #f8fafc;\n      border: 1px solid #e2e8f0;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      position: relative;\n      overflow: hidden;\n    }\n    \n    .werelease-feature-card:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);\n      border-color: #667eea;\n    }\n    \n    .werelease-feature-card::before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      height: 3px;\n      background: linear-gradient(90deg, #667eea, #764ba2);\n      transform: scaleX(0);\n      transition: transform 0.3s ease;\n    }\n    \n    .werelease-feature-card:hover::before {\n      transform: scaleX(1);\n    }\n    \n    .werelease-feature-icon {\n      font-size: 20px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 40px;\n      height: 40px;\n      background: white;\n      border-radius: 10px;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n      flex-shrink: 0;\n    }\n    \n    .werelease-feature-content h4 {\n      margin: 0 0 4px 0;\n      font-size: 14px;\n      font-weight: 600;\n      color: #1e293b;\n    }\n    \n    .werelease-feature-content p {\n      margin: 0 0 6px 0;\n      font-size: 12px;\n      color: #64748b;\n      line-height: 1.4;\n    }\n    \n    .werelease-feature-stat {\n      font-size: 10px;\n      color: #667eea;\n      font-weight: 600;\n      background: rgba(102, 126, 234, 0.1);\n      padding: 3px 6px;\n      border-radius: 8px;\n      display: inline-block;\n      margin-top: 4px;\n    }\n    \n    .werelease-highlight-feature {\n      display: flex;\n      align-items: flex-start;\n      gap: 12px;\n      padding: 16px;\n      margin: 16px 0;\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);\n      border: 1px solid rgba(102, 126, 234, 0.2);\n      border-radius: 12px;\n      position: relative;\n      overflow: hidden;\n    }\n    \n    .werelease-highlight-feature::before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      height: 2px;\n      background: linear-gradient(90deg, #667eea, #764ba2);\n    }\n    \n    .werelease-highlight-icon {\n      font-size: 20px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 36px;\n      height: 36px;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      border-radius: 50%;\n      flex-shrink: 0;\n      animation: pulse 2s ease-in-out infinite;\n    }\n    \n    @keyframes pulse {\n      0%, 100% { transform: scale(1); }\n      50% { transform: scale(1.05); }\n    }\n    \n    .werelease-highlight-content h4 {\n      margin: 0 0 4px 0;\n      font-size: 13px;\n      font-weight: 600;\n      color: #1e293b;\n      line-height: 1.3;\n    }\n    \n    .werelease-highlight-content p {\n      margin: 0;\n      font-size: 11px;\n      color: #64748b;\n      line-height: 1.4;\n    }\n    \n    .werelease-action-bar {\n      display: flex;\n      gap: 12px;\n      position: relative;\n      align-items: center;\n      min-height: 48px;\n    }\n    \n    .werelease-btn-secondary {\n      background: transparent;\n      color: #64748b;\n      border: 1px solid #e2e8f0;\n      padding: 12px 20px;\n      border-radius: 10px;\n      font-size: 14px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      flex: 1;\n    }\n    \n    .werelease-btn-secondary:hover {\n      background: #f1f5f9;\n      border-color: #cbd5e1;\n    }\n    \n    .werelease-btn-primary {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n      border: none;\n      padding: 12px 20px;\n      border-radius: 10px;\n      font-size: 14px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      flex: 1;\n      position: relative;\n      overflow: hidden;\n    }\n    \n    .werelease-btn-primary::before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: -100%;\n      width: 100%;\n      height: 100%;\n      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);\n      transition: left 0.5s ease;\n    }\n    \n    .werelease-btn-primary:hover {\n      transform: translateY(-1px);\n      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);\n    }\n    \n    .werelease-btn-primary:hover::before {\n      left: 100%;\n    }\n    \n    /* Loading Animation */\n    .werelease-feedback-loader {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      background: rgba(255, 255, 255, 0.95);\n      backdrop-filter: blur(8px);\n      padding: 12px 20px;\n      border-radius: 10px;\n      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n      border: 1px solid rgba(102, 126, 234, 0.2);\n      z-index: 10;\n      opacity: 0;\n      animation: fadeInLoader 0.3s ease forwards;\n    }\n    \n    @keyframes fadeInLoader {\n      to {\n        opacity: 1;\n      }\n    }\n    \n    .werelease-spinner {\n      width: 20px;\n      height: 20px;\n      border: 2px solid #e2e8f0;\n      border-top: 2px solid #667eea;\n      border-radius: 50%;\n      animation: spin 1s linear infinite;\n    }\n    \n    @keyframes spin {\n      0% { transform: rotate(0deg); }\n      100% { transform: rotate(360deg); }\n    }\n    \n    .werelease-feedback-loader span {\n      font-size: 14px;\n      color: #1e293b;\n      font-weight: 500;\n    }\n    \n    /* Success Animation */\n    .werelease-feedback-success {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      background: rgba(255, 255, 255, 0.95);\n      backdrop-filter: blur(8px);\n      padding: 12px 20px;\n      border-radius: 10px;\n      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n      border: 1px solid rgba(34, 197, 94, 0.3);\n      z-index: 10;\n      opacity: 0;\n      animation: slideUpSuccess 0.5s ease forwards;\n    }\n    \n    @keyframes slideUpSuccess {\n      0% {\n        opacity: 0;\n        transform: translate(-50%, -40%);\n      }\n      100% {\n        opacity: 1;\n        transform: translate(-50%, -50%);\n      }\n    }\n    \n    .werelease-checkmark {\n      width: 24px;\n      height: 24px;\n    }\n    \n    .werelease-checkmark-circle {\n      width: 24px;\n      height: 24px;\n    }\n    \n    .werelease-checkmark-circle-bg {\n      stroke: #22c55e;\n      stroke-width: 2;\n      stroke-dasharray: 166;\n      stroke-dashoffset: 166;\n      animation: drawCircle 0.6s ease-in-out forwards;\n    }\n    \n    .werelease-checkmark-check {\n      stroke: #22c55e;\n      stroke-width: 3;\n      stroke-linecap: round;\n      stroke-linejoin: round;\n      stroke-dasharray: 48;\n      stroke-dashoffset: 48;\n      animation: drawCheck 0.4s ease-in-out 0.3s forwards;\n    }\n    \n    @keyframes drawCircle {\n      to {\n        stroke-dashoffset: 0;\n      }\n    }\n    \n    @keyframes drawCheck {\n      to {\n        stroke-dashoffset: 0;\n      }\n    }\n    \n    .werelease-feedback-success span {\n      font-size: 14px;\n      color: #22c55e;\n      font-weight: 600;\n    }\n    \n    /* Button state transitions */\n    .werelease-action-bar.loading .werelease-btn-primary,\n    .werelease-action-bar.loading .werelease-btn-secondary {\n      opacity: 0.3;\n      pointer-events: none;\n      transition: opacity 0.3s ease;\n    }\n    \n    .werelease-action-bar.success .werelease-btn-primary,\n    .werelease-action-bar.success .werelease-btn-secondary {\n      opacity: 0.3;\n      transition: opacity 0.3s ease;\n    }\n    \n    /* Tablet Styles */\n    @media (max-width: 768px) and (min-width: 641px) {\n      .werelease-popover-overlay {\n        padding: 20px;\n      }\n      \n      .werelease-popover-content {\n        width: 100%;\n        max-width: 500px;\n        border-radius: 16px;\n      }\n      \n      .werelease-features-grid {\n        grid-template-columns: 1fr 1fr;\n        gap: 14px;\n      }\n      \n      .werelease-feature-card {\n        padding: 14px;\n      }\n      \n      .werelease-action-bar {\n        gap: 16px;\n      }\n      \n      .werelease-btn-primary,\n      .werelease-btn-secondary {\n        padding: 14px 24px;\n        font-size: 15px;\n      }\n    }\n    \n    /* Mobile Styles */\n    @media (max-width: 640px) {\n      .werelease-popover-overlay {\n        padding: 16px;\n        align-items: flex-start !important;\n        justify-content: center !important;\n      }\n      \n      .werelease-popover-content {\n        width: 100% !important;\n        max-width: calc(100vw - 32px) !important;\n        position: relative !important;\n        left: auto !important;\n        top: auto !important;\n        transform: none !important;\n        margin-top: 20px;\n        border-radius: 16px;\n        max-height: calc(100vh - 80px);\n        overflow-y: auto;\n      }\n      \n      .werelease-popover-arrow {\n        display: none !important;\n      }\n      \n      .werelease-popover-header {\n        padding: 20px 20px 16px;\n      }\n      \n      .werelease-header-content h3 {\n        font-size: 18px;\n      }\n      \n      .werelease-version-badge {\n        font-size: 11px;\n        padding: 4px 8px;\n      }\n      \n      .werelease-popover-body {\n        padding: 16px 20px 20px;\n        max-height: none;\n        overflow-y: visible;\n      }\n      \n      .werelease-subtitle {\n        font-size: 13px;\n        margin-bottom: 12px;\n      }\n      \n      .werelease-features-grid {\n        grid-template-columns: 1fr;\n        gap: 12px;\n        margin-bottom: 20px;\n      }\n      \n      .werelease-feature-card {\n        padding: 16px;\n        border-radius: 12px;\n      }\n      \n      .werelease-feature-icon {\n        width: 36px;\n        height: 36px;\n        font-size: 18px;\n      }\n      \n      .werelease-feature-content h4 {\n        font-size: 15px;\n        margin-bottom: 4px;\n      }\n      \n      .werelease-feature-content p {\n        font-size: 13px;\n        line-height: 1.4;\n      }\n      \n      .werelease-highlight-feature {\n        padding: 16px;\n        margin: 16px 0;\n        border-radius: 12px;\n      }\n      \n      .werelease-highlight-icon {\n        width: 32px;\n        height: 32px;\n        font-size: 16px;\n      }\n      \n      .werelease-highlight-content h4 {\n        font-size: 14px;\n        line-height: 1.3;\n      }\n      \n      .werelease-highlight-content p {\n        font-size: 12px;\n      }\n      \n      .werelease-description-content {\n        max-height: 100px;\n        font-size: 13px;\n      }\n      \n      .werelease-action-bar {\n        flex-direction: column;\n        gap: 12px;\n        margin-top: 20px;\n      }\n      \n      .werelease-btn-primary,\n      .werelease-btn-secondary {\n        width: 100%;\n        padding: 16px 20px;\n        font-size: 16px;\n        font-weight: 500;\n        border-radius: 12px;\n        justify-content: center;\n      }\n      \n      .werelease-btn-primary {\n        order: 1;\n      }\n      \n      .werelease-btn-secondary {\n        order: 2;\n      }\n      \n      /* Mobile loading and success animations */\n      .werelease-feedback-loader,\n      .werelease-feedback-success {\n        padding: 16px 24px;\n        border-radius: 12px;\n      }\n      \n      .werelease-feedback-loader span,\n      .werelease-feedback-success span {\n        font-size: 16px;\n      }\n      \n      .werelease-spinner {\n        width: 24px;\n        height: 24px;\n      }\n      \n      .werelease-checkmark {\n        width: 28px;\n        height: 28px;\n      }\n      \n      .werelease-checkmark-circle {\n        width: 28px;\n        height: 28px;\n      }\n    }\n    \n    /* Very small screens */\n    @media (max-width: 480px) {\n      .werelease-popover-overlay {\n        padding: 12px;\n      }\n      \n      .werelease-popover-content {\n        max-width: calc(100vw - 24px) !important;\n        margin-top: 10px;\n        border-radius: 14px;\n      }\n      \n      .werelease-popover-header {\n        padding: 16px 16px 12px;\n      }\n      \n      .werelease-header-content h3 {\n        font-size: 16px;\n      }\n      \n      .werelease-popover-body {\n        padding: 12px 16px 16px;\n      }\n      \n      .werelease-feature-card {\n        padding: 14px;\n      }\n      \n      .werelease-highlight-feature {\n        padding: 14px;\n      }\n    }\n    \n    /* Dark mode support */\n    @media (prefers-color-scheme: dark) {\n      .werelease-popover-content {\n        background: #1e293b;\n        border-color: #334155;\n      }\n      \n      .werelease-popover-arrow {\n        background: #1e293b;\n        border-color: #334155;\n      }\n      \n      .werelease-feature-card {\n        background: #334155;\n        border-color: #475569;\n      }\n      \n      .werelease-feature-card:hover {\n        border-color: #667eea;\n      }\n      \n      .werelease-feature-icon {\n        background: #475569;\n      }\n      \n      .werelease-feature-content h4 {\n        color: #f1f5f9;\n      }\n      \n      .werelease-feature-content p {\n        color: #94a3b8;\n      }\n      \n      .werelease-feature-stat {\n        color: #667eea;\n        background: rgba(102, 126, 234, 0.2);\n      }\n      \n      .werelease-highlight-feature {\n        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);\n        border-color: rgba(102, 126, 234, 0.3);\n      }\n      \n      .werelease-highlight-content h4 {\n        color: #f1f5f9;\n      }\n      \n      .werelease-highlight-content p {\n        color: #94a3b8;\n      }\n      \n      .werelease-btn-secondary {\n        color: #94a3b8;\n        border-color: #475569;\n      }\n      \n      .werelease-btn-secondary:hover {\n        background: #475569;\n        border-color: #64748b;\n      }\n      \n      .werelease-subtitle {\n        color: #94a3b8;\n      }\n      \n      .werelease-description-content {\n        color: #cbd5e1;\n      }\n      \n      .werelease-description-content h1,\n      .werelease-description-content h2,\n      .werelease-description-content h3 {\n        color: #f1f5f9;\n      }\n      \n      .werelease-description-content code {\n        background: rgba(102, 126, 234, 0.2);\n        color: #e2e8f0;\n      }\n      \n      .werelease-popover-body::-webkit-scrollbar-thumb {\n        background: rgba(102, 126, 234, 0.4);\n      }\n      \n      .werelease-popover-body::-webkit-scrollbar-thumb:hover {\n        background: rgba(102, 126, 234, 0.6);\n      }\n      \n      /* Dark mode for loading and success animations */\n      .werelease-feedback-loader {\n        background: rgba(30, 41, 59, 0.95);\n        border-color: rgba(102, 126, 234, 0.3);\n      }\n      \n      .werelease-feedback-loader span {\n        color: #f1f5f9;\n      }\n      \n      .werelease-spinner {\n        border-color: #475569;\n        border-top-color: #667eea;\n      }\n      \n      .werelease-feedback-success {\n        background: rgba(30, 41, 59, 0.95);\n        border-color: rgba(34, 197, 94, 0.4);\n      }\n      \n      /* Dark mode mobile adjustments */\n      @media (max-width: 640px) {\n        .werelease-popover-content {\n          background: #1e293b !important;\n          border-color: #334155 !important;\n        }\n        \n        .werelease-feature-card {\n          background: #334155 !important;\n          border-color: #475569 !important;\n        }\n        \n        .werelease-highlight-feature {\n          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%) !important;\n          border-color: rgba(102, 126, 234, 0.3) !important;\n        }\n      }\n    }\n    \n    /* Entrance Animation */\n    .werelease-popover-overlay.werelease-entering {\n      opacity: 1;\n    }\n    \n    .werelease-popover-overlay.werelease-entering .werelease-popover-content {\n      transform: translateY(0) scale(1);\n    }\n    \n    /* Stagger animation for feature cards */\n    .werelease-feature-card {\n      animation: slideInUp 0.5s ease forwards;\n      opacity: 0;\n      transform: translateY(20px);\n    }\n    \n    .werelease-feature-card:nth-child(1) { animation-delay: 0.1s; }\n    .werelease-feature-card:nth-child(2) { animation-delay: 0.2s; }\n    .werelease-feature-card:nth-child(3) { animation-delay: 0.3s; }\n    .werelease-feature-card:nth-child(4) { animation-delay: 0.4s; }\n    \n    @keyframes slideInUp {\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n  ";
        document.head.appendChild(style);
    };

    var renderFeedbackModalTemplate = function (canDismiss, feedbackType) {
        if (canDismiss === void 0) { canDismiss = true; }
        if (feedbackType === void 0) { feedbackType = 'both'; }
        return "\n    <div class=\"werelease-feedback-overlay werelease-modal-close\">\n      <div class=\"werelease-feedback-content\" onclick=\"event.stopPropagation()\">\n        <div class=\"werelease-feedback-header\">\n          <h2>\uD83D\uDCAC Share Your Feedback</h2>\n          ".concat(canDismiss ? '<button class="werelease-feedback-close werelease-modal-close">×</button>' : '', "\n        </div>\n        \n        <div class=\"werelease-feedback-body\">\n          ").concat(feedbackType === 'emoji' || feedbackType === 'both'
            ? "\n          <div class=\"werelease-rating-section\">\n            <label class=\"werelease-rating-label\">How do you feel about our latest updates?</label>\n            <div class=\"werelease-emoji-buttons\">\n              <button class=\"werelease-emoji-btn werelease-emoji-reaction\" data-emoji=\"\uD83D\uDE21\" data-rating=\"1\">\uD83D\uDE21</button>\n              <button class=\"werelease-emoji-btn werelease-emoji-reaction\" data-emoji=\"\uD83D\uDE1E\" data-rating=\"2\">\uD83D\uDE1E</button>\n              <button class=\"werelease-emoji-btn werelease-emoji-reaction\" data-emoji=\"\uD83D\uDE10\" data-rating=\"3\">\uD83D\uDE10</button>\n              <button class=\"werelease-emoji-btn werelease-emoji-reaction\" data-emoji=\"\uD83D\uDE0A\" data-rating=\"4\">\uD83D\uDE0A</button>\n              <button class=\"werelease-emoji-btn werelease-emoji-reaction\" data-emoji=\"\uD83E\uDD29\" data-rating=\"5\">\uD83E\uDD29</button>\n            </div>\n          </div>\n          "
            : '', "\n          \n          ").concat(feedbackType === 'text' || feedbackType === 'both'
            ? "\n          <div class=\"werelease-comment-section\">\n            <label for=\"werelease-feedback-comment\">".concat(feedbackType === 'both' ? 'Tell us more (optional):' : 'Share your thoughts:', "</label>\n            <textarea id=\"werelease-feedback-comment\" placeholder=\"").concat(feedbackType === 'both' ? 'What would you like to see improved or what do you love about the updates?' : 'What are your thoughts about our latest updates? What would you like to see improved?', "\"></textarea>\n          </div>\n          ")
            : '', "\n        </div>\n        \n        <div class=\"werelease-feedback-footer\">\n          ").concat(canDismiss ? '<button class="werelease-btn-secondary werelease-modal-close">Maybe Later</button>' : '', "\n          <button class=\"werelease-btn-primary werelease-submit-feedback\">Send Feedback</button>\n          <div class=\"werelease-feedback-loader\" style=\"display: none;\">\n            <div class=\"werelease-spinner\"></div>\n            <span>Saving your feedback...</span>\n          </div>\n          <div class=\"werelease-feedback-success\" style=\"display: none;\">\n            <div class=\"werelease-checkmark\">\n              <svg class=\"werelease-checkmark-circle\" viewBox=\"0 0 52 52\">\n                <circle class=\"werelease-checkmark-circle-bg\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"/>\n                <path class=\"werelease-checkmark-check\" fill=\"none\" d=\"m14.1 27.2l7.1 7.2 16.7-16.8\"/>\n              </svg>\n            </div>\n            <span>Thank you for your feedback!</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  ");
    };
    var addFeedbackModalCSS = function () {
        // Check if CSS already added
        if (document.getElementById('werelease-feedback-styles'))
            return;
        var style = document.createElement('style');
        style.id = 'werelease-feedback-styles';
        style.textContent = "\n    .werelease-feedback-overlay {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.5);\n      backdrop-filter: blur(4px);\n      z-index: 10001;\n      opacity: 0;\n      transition: opacity 0.2s ease;\n      overflow: hidden;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 16px;\n      box-sizing: border-box;\n    }\n    \n    .werelease-feedback-content {\n      position: relative;\n      transform: scale(0.95);\n      background: #ffffff;\n      border-radius: 16px;\n      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n      max-width: 480px;\n      width: 100%;\n      max-height: calc(100vh - 32px);\n      overflow: hidden;\n      transition: transform 0.2s ease;\n      box-sizing: border-box;\n    }\n    \n    .werelease-feedback-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 24px 24px 16px;\n      border-bottom: 1px solid #e5e7eb;\n    }\n    \n    .werelease-feedback-header h2 {\n      margin: 0;\n      font-size: 20px;\n      font-weight: 600;\n      color: #111827;\n    }\n    \n    .werelease-feedback-close {\n      background: none;\n      border: none;\n      font-size: 24px;\n      cursor: pointer;\n      padding: 4px 8px;\n      border-radius: 4px;\n      color: #6b7280;\n      transition: background-color 0.2s ease;\n    }\n    \n    .werelease-feedback-close:hover {\n      background: rgba(107, 114, 128, 0.1);\n    }\n    \n    .werelease-feedback-body {\n      padding: 24px;\n      max-height: calc(100vh - 200px);\n      overflow-y: auto;\n      overflow-x: hidden;\n      box-sizing: border-box;\n    }\n    \n    .werelease-rating-section {\n      margin-bottom: 24px;\n    }\n    \n    .werelease-rating-label {\n      display: block;\n      font-size: 16px;\n      font-weight: 500;\n      color: #374151;\n      margin-bottom: 16px;\n      text-align: center;\n    }\n    \n    .werelease-emoji-buttons {\n      display: flex;\n      gap: 12px;\n      justify-content: center;\n      flex-wrap: wrap;\n    }\n    \n    .werelease-emoji-btn {\n      background: none;\n      border: 2px solid #e5e7eb;\n      border-radius: 12px;\n      padding: 12px 16px;\n      font-size: 24px;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      min-width: 56px;\n      min-height: 56px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      position: relative;\n    }\n    \n    .werelease-emoji-btn:hover {\n      border-color: #667eea;\n      transform: scale(1.1);\n      background: rgba(102, 126, 234, 0.05);\n    }\n    \n    .werelease-emoji-btn.selected {\n      border-color: #667eea;\n      background: rgba(102, 126, 234, 0.1);\n      transform: scale(1.05);\n    }\n    \n    .werelease-emoji-btn.werelease-required {\n      border-color: #ef4444;\n      background: rgba(239, 68, 68, 0.1);\n      animation: shake 0.5s ease-in-out;\n    }\n    \n    @keyframes shake {\n      0%, 100% { transform: translateX(0); }\n      25% { transform: translateX(-4px); }\n      75% { transform: translateX(4px); }\n    }\n    \n    .werelease-comment-section label {\n      display: block;\n      font-size: 14px;\n      font-weight: 500;\n      color: #374151;\n      margin-bottom: 8px;\n    }\n    \n    .werelease-comment-section textarea {\n      width: 100%;\n      min-height: 100px;\n      padding: 12px;\n      border: 2px solid #e5e7eb;\n      border-radius: 8px;\n      font-size: 14px;\n      font-family: inherit;\n      resize: vertical;\n      transition: border-color 0.2s ease;\n      box-sizing: border-box;\n      max-width: 100%;\n      overflow-wrap: break-word;\n      word-wrap: break-word;\n    }\n    \n    .werelease-comment-section textarea:focus {\n      outline: none;\n      border-color: #667eea;\n    }\n    \n    .werelease-feedback-footer {\n      display: flex;\n      justify-content: space-between;\n      gap: 12px;\n      padding: 16px 24px 24px;\n      border-top: 1px solid #e5e7eb;\n      position: relative;\n      align-items: center;\n      min-height: 72px;\n    }\n    \n    .werelease-btn-secondary {\n      background: transparent;\n      color: #6b7280;\n      border: 1px solid #d1d5db;\n      padding: 10px 16px;\n      border-radius: 8px;\n      font-size: 14px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      flex: 1;\n    }\n    \n    .werelease-btn-secondary:hover {\n      background: #f9fafb;\n    }\n    \n    .werelease-btn-primary {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: white;\n      border: none;\n      padding: 10px 16px;\n      border-radius: 8px;\n      font-size: 14px;\n      font-weight: 500;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      flex: 1;\n    }\n    \n    .werelease-btn-primary:hover {\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n    }\n    \n    .werelease-success-message {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: #059669;\n      font-weight: 500;\n      font-size: 16px;\n      padding: 16px;\n    }\n    \n    .werelease-error-message {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: #dc2626;\n      font-weight: 500;\n      font-size: 16px;\n      padding: 16px;\n    }\n\n    /* Loading Animation */\n    .werelease-feedback-loader {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      background: rgba(255, 255, 255, 0.95);\n      backdrop-filter: blur(8px);\n      padding: 12px 20px;\n      border-radius: 10px;\n      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n      border: 1px solid rgba(102, 126, 234, 0.2);\n      z-index: 10;\n      opacity: 0;\n      animation: fadeInLoader 0.3s ease forwards;\n    }\n    \n    @keyframes fadeInLoader {\n      to {\n        opacity: 1;\n      }\n    }\n    \n    .werelease-spinner {\n      width: 20px;\n      height: 20px;\n      border: 2px solid #e2e8f0;\n      border-top: 2px solid #667eea;\n      border-radius: 50%;\n      animation: spin 1s linear infinite;\n    }\n    \n    @keyframes spin {\n      0% { transform: rotate(0deg); }\n      100% { transform: rotate(360deg); }\n    }\n    \n    .werelease-feedback-loader span {\n      font-size: 14px;\n      color: #1e293b;\n      font-weight: 500;\n    }\n    \n    /* Success Animation */\n    .werelease-feedback-success {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      background: rgba(255, 255, 255, 0.95);\n      backdrop-filter: blur(8px);\n      padding: 12px 20px;\n      border-radius: 10px;\n      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);\n      border: 1px solid rgba(34, 197, 94, 0.3);\n      z-index: 10;\n      opacity: 0;\n      animation: slideUpSuccess 0.5s ease forwards;\n    }\n    \n    @keyframes slideUpSuccess {\n      0% {\n        opacity: 0;\n        transform: translate(-50%, -40%);\n      }\n      100% {\n        opacity: 1;\n        transform: translate(-50%, -50%);\n      }\n    }\n    \n    .werelease-checkmark {\n      width: 24px;\n      height: 24px;\n    }\n    \n    .werelease-checkmark-circle {\n      width: 24px;\n      height: 24px;\n    }\n    \n    .werelease-checkmark-circle-bg {\n      stroke: #22c55e;\n      stroke-width: 2;\n      stroke-dasharray: 166;\n      stroke-dashoffset: 166;\n      animation: drawCircle 0.6s ease-in-out forwards;\n    }\n    \n    .werelease-checkmark-check {\n      stroke: #22c55e;\n      stroke-width: 3;\n      stroke-linecap: round;\n      stroke-linejoin: round;\n      stroke-dasharray: 48;\n      stroke-dashoffset: 48;\n      animation: drawCheck 0.4s ease-in-out 0.3s forwards;\n    }\n    \n    @keyframes drawCircle {\n      to {\n        stroke-dashoffset: 0;\n      }\n    }\n    \n    @keyframes drawCheck {\n      to {\n        stroke-dashoffset: 0;\n      }\n    }\n    \n    .werelease-feedback-success span {\n      font-size: 14px;\n      color: #22c55e;\n      font-weight: 600;\n    }\n    \n    /* Button state transitions for feedback modal */\n    .werelease-feedback-footer.loading .werelease-btn-primary,\n    .werelease-feedback-footer.loading .werelease-btn-secondary {\n      opacity: 0.3;\n      pointer-events: none;\n      transition: opacity 0.3s ease;\n    }\n    \n    .werelease-feedback-footer.success .werelease-btn-primary,\n    .werelease-feedback-footer.success .werelease-btn-secondary {\n      opacity: 0.3;\n      transition: opacity 0.3s ease;\n    }\n    \n    @media (max-width: 768px) {\n      .werelease-feedback-overlay {\n        padding: 12px;\n      }\n      \n      .werelease-feedback-content {\n        max-height: calc(100vh - 24px);\n        border-radius: 12px;\n      }\n      \n      .werelease-feedback-header,\n      .werelease-feedback-footer {\n        padding-left: 20px;\n        padding-right: 20px;\n      }\n      \n      .werelease-feedback-body {\n        padding: 20px;\n        max-height: calc(100vh - 160px);\n      }\n      \n      .werelease-feedback-header h2 {\n        font-size: 18px;\n      }\n      \n      .werelease-feedback-close {\n        font-size: 22px;\n        padding: 8px;\n        min-width: 44px;\n        min-height: 44px;\n      }\n      \n      .werelease-emoji-buttons {\n        gap: 8px;\n      }\n      \n      .werelease-emoji-btn {\n        min-width: 52px;\n        min-height: 52px;\n        font-size: 20px;\n      }\n      \n      .werelease-comment-section textarea {\n        min-height: 120px;\n        font-size: 16px;\n      }\n      \n      .werelease-feedback-footer {\n        flex-direction: column;\n        gap: 8px;\n      }\n      \n      .werelease-btn-primary,\n      .werelease-btn-secondary {\n        width: 100%;\n        padding: 12px 16px;\n        font-size: 16px;\n        min-height: 48px;\n      }\n      \n      /* Mobile loading and success animations */\n      .werelease-feedback-loader,\n      .werelease-feedback-success {\n        padding: 16px 24px;\n        border-radius: 12px;\n      }\n      \n      .werelease-feedback-loader span,\n      .werelease-feedback-success span {\n        font-size: 16px;\n      }\n      \n      .werelease-spinner {\n        width: 24px;\n        height: 24px;\n      }\n      \n      .werelease-checkmark {\n        width: 28px;\n        height: 28px;\n      }\n      \n      .werelease-checkmark-circle {\n        width: 28px;\n        height: 28px;\n      }\n    }\n    \n    @media (max-width: 480px) {\n      .werelease-feedback-overlay {\n        padding: 8px;\n      }\n      \n      .werelease-feedback-content {\n        border-radius: 8px;\n      }\n      \n      .werelease-feedback-header,\n      .werelease-feedback-body,\n      .werelease-feedback-footer {\n        padding-left: 16px;\n        padding-right: 16px;\n      }\n      \n      .werelease-feedback-body {\n        padding-top: 16px;\n        padding-bottom: 16px;\n      }\n      \n      .werelease-rating-label {\n        font-size: 15px;\n      }\n      \n      .werelease-emoji-btn {\n        min-width: 48px;\n        min-height: 48px;\n        font-size: 18px;\n      }\n    }\n    \n    /* Entrance Animation */\n    .werelease-feedback-overlay.werelease-entering {\n      opacity: 1;\n    }\n    \n    .werelease-feedback-overlay.werelease-entering .werelease-feedback-content {\n      transform: scale(1);\n    }\n    \n    /* Exit Animation */\n    .werelease-feedback-overlay.werelease-exiting {\n      opacity: 0;\n    }\n    \n    .werelease-feedback-overlay.werelease-exiting .werelease-feedback-content {\n      transform: scale(0.95);\n    }\n    \n    /* Dark mode support */\n    @media (prefers-color-scheme: dark) {\n      .werelease-feedback-content {\n        background: #1f2937;\n        color: #f9fafb;\n      }\n      \n      .werelease-feedback-header {\n        border-bottom-color: #374151;\n      }\n      \n      .werelease-feedback-header h2 {\n        color: #f9fafb;\n      }\n      \n      .werelease-rating-label,\n      .werelease-comment-section label {\n        color: #e5e7eb;\n      }\n      \n      .werelease-emoji-btn {\n        border-color: #4b5563;\n        background: #374151;\n      }\n      \n      .werelease-emoji-btn:hover {\n        border-color: #667eea;\n        background: #4b5563;\n      }\n      \n      .werelease-emoji-btn.selected {\n        border-color: #667eea;\n        background: #4b5563;\n      }\n      \n      .werelease-comment-section textarea {\n        background: #374151;\n        border-color: #4b5563;\n        color: #f9fafb;\n      }\n      \n      .werelease-comment-section textarea:focus {\n        border-color: #667eea;\n      }\n      \n      .werelease-feedback-footer {\n        border-top-color: #374151;\n      }\n      \n      .werelease-btn-secondary {\n        color: #d1d5db;\n        border-color: #4b5563;\n      }\n      \n      .werelease-btn-secondary:hover {\n        background: #374151;\n      }\n      \n      /* Dark mode for feedback modal loading and success animations */\n      .werelease-feedback-loader {\n        background: rgba(30, 41, 59, 0.95);\n        border-color: rgba(102, 126, 234, 0.3);\n      }\n      \n      .werelease-feedback-loader span {\n        color: #f1f5f9;\n      }\n      \n      .werelease-spinner {\n        border-color: #475569;\n        border-top-color: #667eea;\n      }\n      \n      .werelease-feedback-success {\n        background: rgba(30, 41, 59, 0.95);\n        border-color: rgba(34, 197, 94, 0.4);\n      }\n    }\n  ";
        document.head.appendChild(style);
    };

    var ModalManagerImpl = /** @class */ (function () {
        function ModalManagerImpl() {
            this.currentModal = null;
            this.selectedRating = null;
        }
        /**
         * Set callback for feedback submission
         */
        ModalManagerImpl.prototype.setFeedbackCallback = function (callback) {
            this.feedbackSubmissionCallback = callback;
        };
        /**
         * Show changes modal/popover
         */
        ModalManagerImpl.prototype.showChangesModal = function (triggerElement, changelogData) {
            var _this = this;
            // Close existing modal
            this.closeModal();
            // Create modal overlay
            var overlay = document.createElement('div');
            overlay.id = 'werelease-changes-modal';
            overlay.innerHTML = renderChangesPopoverTemplate(changelogData);
            // Add CSS
            addChangesPopoverCSS();
            // Append to body
            document.body.appendChild(overlay);
            this.currentModal = overlay;
            // Position popover if trigger element provided
            if (triggerElement) {
                this.positionPopover(overlay, triggerElement);
            }
            // Add entrance animation
            requestAnimationFrame(function () {
                var overlayEl = overlay.querySelector('.werelease-popover-overlay');
                if (overlayEl) {
                    overlayEl.classList.add('werelease-entering');
                }
            });
            // Add event listeners for close buttons
            this.attachChangesModalEventListeners(overlay);
            // Add click outside to close
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) {
                    _this.closeModal();
                }
            });
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        };
        /**
         * Show feedback modal
         */
        ModalManagerImpl.prototype.showFeedbackModal = function (canDismiss, feedbackType) {
            var _this = this;
            if (canDismiss === void 0) { canDismiss = true; }
            if (feedbackType === void 0) { feedbackType = 'both'; }
            // Close existing modal
            this.closeModal();
            // Create modal overlay
            var overlay = document.createElement('div');
            overlay.id = 'werelease-feedback-modal';
            overlay.innerHTML = renderFeedbackModalTemplate(canDismiss, feedbackType);
            // Add CSS
            addFeedbackModalCSS();
            // Append to body
            document.body.appendChild(overlay);
            this.currentModal = overlay;
            // Add entrance animation
            requestAnimationFrame(function () {
                var overlayEl = overlay.querySelector('.werelease-feedback-overlay');
                if (overlayEl) {
                    overlayEl.classList.add('werelease-entering');
                }
            });
            // Add event listeners with a small delay to ensure DOM is ready
            setTimeout(function () {
                _this.attachFeedbackEventListeners(overlay, canDismiss, feedbackType);
            }, 10);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        };
        /**
         * Show thank you modal for users who already submitted feedback
         */
        ModalManagerImpl.prototype.showThankYouModal = function () {
            var _this = this;
            // Close existing modal
            this.closeModal();
            // Create modal overlay
            var overlay = document.createElement('div');
            overlay.id = 'werelease-thankyou-modal';
            overlay.innerHTML = this.renderThankYouTemplate();
            // Add CSS (reuse feedback modal CSS)
            addFeedbackModalCSS();
            // Append to body
            document.body.appendChild(overlay);
            this.currentModal = overlay;
            // Add entrance animation
            requestAnimationFrame(function () {
                var overlayEl = overlay.querySelector('.werelease-feedback-overlay');
                if (overlayEl) {
                    overlayEl.classList.add('werelease-entering');
                }
            });
            // Add close event listeners
            setTimeout(function () {
                _this.attachThankYouEventListeners(overlay);
            }, 10);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        };
        /**
         * Close current modal
         */
        ModalManagerImpl.prototype.closeModal = function () {
            var _this = this;
            if (this.currentModal) {
                // Add exit animation
                var overlayEl = this.currentModal.querySelector('.werelease-modal, .werelease-popover-overlay, .werelease-feedback-overlay');
                if (overlayEl) {
                    overlayEl.classList.add('werelease-exiting');
                    setTimeout(function () {
                        removeElement(_this.currentModal);
                        _this.currentModal = null;
                        // Restore body scroll
                        document.body.style.overflow = '';
                    }, 300);
                }
                else {
                    removeElement(this.currentModal);
                    this.currentModal = null;
                    document.body.style.overflow = '';
                }
            }
        };
        /**
         * Position popover relative to trigger element
         */
        ModalManagerImpl.prototype.positionPopover = function (overlay, triggerElement) {
            var overlayEl = overlay.querySelector('.werelease-popover-overlay');
            var contentEl = overlay.querySelector('.werelease-popover-content');
            var arrowEl = overlay.querySelector('.werelease-popover-arrow');
            // Get trigger button position
            var triggerRect = triggerElement.getBoundingClientRect();
            var _a = getViewportDimensions(), viewportWidth = _a.width, viewportHeight = _a.height;
            // Check if we're on mobile (below 640px)
            var isMobile = viewportWidth <= 640;
            if (isMobile) {
                // On mobile, use simpler centered positioning
                overlayEl.style.alignItems = 'flex-start';
                overlayEl.style.justifyContent = 'center';
                overlayEl.style.paddingTop = '20px';
                overlayEl.style.paddingLeft = '16px';
                overlayEl.style.paddingRight = '16px';
                contentEl.style.position = 'relative';
                contentEl.style.left = 'auto';
                contentEl.style.top = 'auto';
                contentEl.style.transform = 'scale(0.95)';
                contentEl.style.width = '100%';
                contentEl.style.maxWidth = 'calc(100vw - 32px)';
                // Hide arrow on mobile for cleaner look
                if (arrowEl) {
                    arrowEl.style.display = 'none';
                }
                return;
            }
            // Desktop positioning logic
            var popoverWidth = 420;
            var popoverHeight = 480;
            // Determine if we should show above or below
            var spaceBelow = viewportHeight - (triggerRect.bottom + 16);
            var spaceAbove = triggerRect.top - 16;
            var showBelow = spaceBelow >= popoverHeight || spaceBelow > spaceAbove;
            // Calculate horizontal position (center on button, but keep in viewport)
            var leftPos = triggerRect.left + triggerRect.width / 2 - popoverWidth / 2;
            leftPos = Math.max(16, Math.min(leftPos, viewportWidth - popoverWidth - 16));
            // Calculate vertical position
            var topPos;
            var arrowTop = '0px';
            var arrowTransform = 'translateX(-50%) rotate(45deg)';
            if (showBelow) {
                topPos = triggerRect.bottom + 16;
                arrowTop = '-8px';
                arrowTransform = 'translateX(-50%) rotate(45deg)';
            }
            else {
                topPos = triggerRect.top - popoverHeight - 16;
                arrowTop = 'calc(100% - 8px)';
                arrowTransform = 'translateX(-50%) rotate(225deg)';
            }
            // Apply positioning
            overlayEl.style.alignItems = 'flex-start';
            overlayEl.style.justifyContent = 'flex-start';
            overlayEl.style.paddingTop = '0';
            contentEl.style.position = 'absolute';
            contentEl.style.left = "".concat(leftPos, "px");
            contentEl.style.top = "".concat(topPos, "px");
            contentEl.style.transform = 'scale(0.95)';
            contentEl.style.width = 'auto';
            contentEl.style.maxWidth = 'auto';
            // Position and rotate arrow
            if (arrowEl) {
                arrowEl.style.display = 'block';
                arrowEl.style.top = arrowTop;
                arrowEl.style.left = "".concat(triggerRect.left + triggerRect.width / 2 - leftPos, "px");
                arrowEl.style.transform = arrowTransform;
            }
        };
        /**
         * Attach event listeners to changes modal
         */
        ModalManagerImpl.prototype.attachChangesModalEventListeners = function (overlay) {
            var _this = this;
            // Close buttons (close button and "Show me later")
            var closeButtons = overlay.querySelectorAll('.werelease-modal-close');
            closeButtons.forEach(function (button) {
                button.addEventListener('click', function () { return _this.closeModal(); });
            });
            // Submit feedback button (the "Awesome! 🎉" button)
            var submitButton = overlay.querySelector('.werelease-submit-feedback');
            if (submitButton) {
                submitButton.addEventListener('click', function () {
                    _this.handleChangesModalFeedback(overlay);
                });
            }
        };
        /**
         * Attach event listeners to feedback modal
         */
        ModalManagerImpl.prototype.attachFeedbackEventListeners = function (overlay, canDismiss, feedbackType) {
            var _this = this;
            // Close buttons (close button and "Maybe Later" button) - only if dismiss is allowed
            if (canDismiss) {
                var closeButtons = overlay.querySelectorAll('.werelease-modal-close');
                closeButtons.forEach(function (button) {
                    button.addEventListener('click', function () {
                        _this.closeModal();
                    });
                });
            }
            // Emoji reaction buttons - only if emoji feedback is enabled
            if (feedbackType === 'emoji' || feedbackType === 'both') {
                var emojiButtons = overlay.querySelectorAll('.werelease-emoji-reaction');
                emojiButtons.forEach(function (button) {
                    button.addEventListener('click', function (event) {
                        event.stopPropagation();
                        var emoji = button.getAttribute('data-emoji');
                        if (emoji) {
                            _this.handleModalEmojiReaction(emoji);
                        }
                    });
                });
            }
            // Submit feedback button
            var submitButton = overlay.querySelector('.werelease-submit-feedback');
            if (submitButton) {
                submitButton.addEventListener('click', function (event) {
                    event.stopPropagation();
                    _this.submitFeedback(feedbackType);
                });
            }
            // Click outside to close - only if dismiss is allowed
            if (canDismiss) {
                overlay.addEventListener('click', function (event) {
                    if (event.target === overlay) {
                        _this.closeModal();
                    }
                });
            }
        };
        /**
         * Handle emoji reaction in modal
         */
        ModalManagerImpl.prototype.handleModalEmojiReaction = function (emoji) {
            // Remove previous selections
            var allEmojiButtons = document.querySelectorAll('.werelease-emoji-btn');
            allEmojiButtons.forEach(function (btn) { return btn.classList.remove('selected'); });
            // Add visual feedback to selected button
            var emojiButton = document.querySelector("[data-emoji=\"".concat(emoji, "\"]"));
            if (emojiButton) {
                emojiButton.classList.add('selected');
                // Get the rating from data attribute
                var rating = emojiButton.getAttribute('data-rating');
                this.selectedRating = rating ? parseInt(rating) : null;
            }
        };
        /**
         * Submit feedback
         */
        ModalManagerImpl.prototype.submitFeedback = function (feedbackType) {
            return __awaiter(this, void 0, void 0, function () {
                var commentInput, comment, emojiButtons, footer, loader, success, feedbackData;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commentInput = document.querySelector('#werelease-feedback-comment');
                            comment = (commentInput === null || commentInput === void 0 ? void 0 : commentInput.value) || '';
                            // Validate based on feedback type
                            if (feedbackType === 'emoji' || feedbackType === 'both') {
                                if (!this.selectedRating) {
                                    emojiButtons = document.querySelectorAll('.werelease-emoji-btn');
                                    emojiButtons.forEach(function (btn) {
                                        btn.classList.add('werelease-required');
                                        setTimeout(function () { return btn.classList.remove('werelease-required'); }, 1000);
                                    });
                                    return [2 /*return*/];
                                }
                            }
                            if (feedbackType === 'text' || feedbackType === 'both') {
                                if (!comment.trim()) {
                                    // Show error for empty text feedback
                                    // You could add visual feedback here
                                    return [2 /*return*/];
                                }
                            }
                            footer = document.querySelector('.werelease-feedback-footer');
                            loader = document.querySelector('.werelease-feedback-loader');
                            success = document.querySelector('.werelease-feedback-success');
                            if (!footer || !loader || !success)
                                return [2 /*return*/];
                            // Show loading state
                            footer.classList.add('loading');
                            loader.style.display = 'flex';
                            if (feedbackType === 'emoji') {
                                feedbackData = {
                                    feedback: {
                                        type: 'emoji',
                                        emojiRating: this.selectedRating,
                                        textComment: undefined,
                                        source: 'modal',
                                    },
                                    meta: {},
                                };
                            }
                            else if (feedbackType === 'text') {
                                feedbackData = {
                                    feedback: {
                                        type: 'text',
                                        emojiRating: undefined,
                                        textComment: comment,
                                        source: 'modal',
                                    },
                                    meta: {},
                                };
                            }
                            else {
                                // 'both'
                                feedbackData = {
                                    feedback: {
                                        type: 'both',
                                        emojiRating: this.selectedRating,
                                        textComment: comment || undefined,
                                        source: 'modal',
                                    },
                                    meta: {},
                                };
                            }
                            if (!this.feedbackSubmissionCallback) return [3 /*break*/, 5];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.feedbackSubmissionCallback(feedbackData)];
                        case 2:
                            _b.sent();
                            // Hide loader and show success
                            loader.style.display = 'none';
                            success.style.display = 'flex';
                            footer.classList.remove('loading');
                            footer.classList.add('success');
                            // Reset selection
                            this.selectedRating = null;
                            // Close modal after showing success
                            setTimeout(function () {
                                _this.closeModal();
                            }, 2000);
                            return [3 /*break*/, 4];
                        case 3:
                            _b.sent();
                            // Hide loader and show error message
                            loader.style.display = 'none';
                            footer.classList.remove('loading');
                            this.showErrorMessage();
                            setTimeout(function () {
                                _this.closeModal();
                            }, 1500);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            // No callback available, just show success animation
                            loader.style.display = 'none';
                            success.style.display = 'flex';
                            footer.classList.remove('loading');
                            footer.classList.add('success');
                            // Reset selection
                            this.selectedRating = null;
                            setTimeout(function () {
                                _this.closeModal();
                            }, 2000);
                            _b.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Handle feedback submission from changes modal
         */
        ModalManagerImpl.prototype.handleChangesModalFeedback = function (overlay) {
            return __awaiter(this, void 0, void 0, function () {
                var actionBar, loader, success, feedbackData;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            actionBar = overlay.querySelector('.werelease-action-bar');
                            loader = overlay.querySelector('.werelease-feedback-loader');
                            success = overlay.querySelector('.werelease-feedback-success');
                            if (!actionBar || !loader || !success)
                                return [2 /*return*/];
                            // Show loading state
                            actionBar.classList.add('loading');
                            loader.style.display = 'flex';
                            feedbackData = {
                                feedback: {
                                    type: 'emoji',
                                    emojiRating: 5,
                                    textComment: undefined,
                                    source: 'banner',
                                },
                                meta: {},
                            };
                            if (!this.feedbackSubmissionCallback) return [3 /*break*/, 5];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.feedbackSubmissionCallback(feedbackData)];
                        case 2:
                            _b.sent();
                            // Hide loader and show success
                            loader.style.display = 'none';
                            success.style.display = 'flex';
                            actionBar.classList.remove('loading');
                            actionBar.classList.add('success');
                            // Close modal after showing success
                            setTimeout(function () {
                                _this.closeModal();
                            }, 2000);
                            return [3 /*break*/, 4];
                        case 3:
                            _b.sent();
                            // Hide loader and show error (fall back to closing)
                            loader.style.display = 'none';
                            actionBar.classList.remove('loading');
                            // Could add error message here
                            setTimeout(function () {
                                _this.closeModal();
                            }, 500);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            // No callback available, just show success animation
                            loader.style.display = 'none';
                            success.style.display = 'flex';
                            actionBar.classList.remove('loading');
                            actionBar.classList.add('success');
                            setTimeout(function () {
                                _this.closeModal();
                            }, 2000);
                            _b.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Show success message in modal
         */
        ModalManagerImpl.prototype.showSuccessMessage = function () {
            var feedbackBody = document.querySelector('.werelease-feedback-body');
            if (feedbackBody) {
                feedbackBody.innerHTML = "\n        <div class=\"werelease-success-message\">\n          \u2705 Thank you for your feedback!\n        </div>\n      ";
            }
        };
        /**
         * Show error message in modal
         */
        ModalManagerImpl.prototype.showErrorMessage = function () {
            var feedbackBody = document.querySelector('.werelease-feedback-body');
            if (feedbackBody) {
                feedbackBody.innerHTML = "\n        <div class=\"werelease-error-message\">\n          \u274C Something went wrong. Please try again.\n        </div>\n      ";
            }
        };
        /**
         * Get rating value from emoji (legacy method, kept for compatibility)
         */
        ModalManagerImpl.prototype.getEmojiRating = function (emoji) {
            var ratings = {
                '👍': 5,
                '❤️': 5,
                '😊': 4,
                '😐': 3,
                '😕': 2,
                '👎': 1,
            };
            return ratings[emoji] || 3;
        };
        /**
         * Render thank you modal template
         */
        ModalManagerImpl.prototype.renderThankYouTemplate = function () {
            return "\n      <div class=\"werelease-feedback-overlay werelease-modal-close\">\n        <div class=\"werelease-feedback-content\" onclick=\"event.stopPropagation()\">\n          <div class=\"werelease-feedback-header\">\n            <h2>\uD83D\uDE4F Thank You!</h2>\n            <button class=\"werelease-feedback-close werelease-modal-close\">\u00D7</button>\n          </div>\n          \n          <div class=\"werelease-feedback-body\">\n            <div class=\"werelease-success-message\">\n              <p>Thank you for your feedback! We've already received your input for this update.</p>\n              <p>Your feedback helps us improve and we truly appreciate it.</p>\n            </div>\n          </div>\n          \n          <div class=\"werelease-feedback-footer\">\n            <button class=\"werelease-btn-primary werelease-modal-close\">Close</button>\n          </div>\n        </div>\n      </div>\n    ";
        };
        /**
         * Attach event listeners to thank you modal
         */
        ModalManagerImpl.prototype.attachThankYouEventListeners = function (overlay) {
            var _this = this;
            // Close modal on close button clicks
            var closeButtons = overlay.querySelectorAll('.werelease-modal-close');
            closeButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    _this.closeModal();
                });
            });
            // Click outside to close
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) {
                    _this.closeModal();
                }
            });
        };
        return ModalManagerImpl;
    }());

    /**
     * WeRelease SDK Instance Class
     * Provides methods for managing changelog banners, feedback, and user identification
     */
    var WeReleaseInstance = /** @class */ (function () {
        function WeReleaseInstance() {
            var _this = this;
            this.user = null;
            this.target = 'body';
            this.options = __assign({}, DEFAULT_OPTIONS);
            this.changelogData = DEFAULT_CHANGELOG_DATA;
            this.projectData = null;
            this.theme = 'basic';
            this.hasFeedbackSubmitted = false;
            this.apiService = new APIService();
            this.storageService = new LocalStorageService();
            this.bannerManager = new BannerManager();
            this.modalManager = new ModalManagerImpl();
            // Set up feedback callback for modal manager
            this.modalManager.setFeedbackCallback(function (feedbackData) { return __awaiter(_this, void 0, void 0, function () {
                var fullFeedbackData, feedbackKey, error_1;
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (!this.projectId || !this.anonymousId) {
                                throw new Error('WeRelease not properly initialized');
                            }
                            fullFeedbackData = {
                                projectId: this.projectId,
                                anonymousId: this.anonymousId,
                                changeLogId: ((_a = this.changelogData) === null || _a === void 0 ? void 0 : _a.id) || 0,
                                feedback: {
                                    type: ((_b = feedbackData.feedback) === null || _b === void 0 ? void 0 : _b.type) || 'both',
                                    emojiRating: (_c = feedbackData.feedback) === null || _c === void 0 ? void 0 : _c.emojiRating,
                                    textComment: (_d = feedbackData.feedback) === null || _d === void 0 ? void 0 : _d.textComment,
                                    source: ((_e = feedbackData.feedback) === null || _e === void 0 ? void 0 : _e.source) || 'modal',
                                },
                                meta: feedbackData.meta || {},
                            };
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.apiService.submitFeedback(fullFeedbackData)];
                        case 2:
                            _g.sent();
                            // Mark feedback as submitted and store in localStorage
                            this.hasFeedbackSubmitted = true;
                            feedbackKey = "".concat(STORAGE_KEYS.FEEDBACK_SUBMITTED, "_").concat(this.projectId, "_").concat(((_f = this.changelogData) === null || _f === void 0 ? void 0 : _f.id) || 'general');
                            this.storageService.setItem(feedbackKey, 'submitted');
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _g.sent();
                            console.error('[WeRelease] Failed to submit feedback:', error_1);
                            throw error_1; // Re-throw so modal can handle error state
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        }
        /**
         * Initialize the WeRelease SDK instance with configuration
         * @param config - Configuration object containing projectId and optional settings
         * @returns Promise that resolves when initialization is complete
         */
        WeReleaseInstance.prototype.init = function (config) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var projectDetails, latestChangelog, error_2;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 9, , 10]);
                            this.projectId = config.projectId;
                            this.user = config.user || null;
                            this.target = config.target || 'body';
                            this.options = __assign(__assign(__assign({}, DEFAULT_OPTIONS), config.options), { styles: ((_a = config.options) === null || _a === void 0 ? void 0 : _a.styles) || DEFAULT_OPTIONS.styles });
                            // Get or create anonymous ID
                            this.anonymousId = getOrCreateAnonymousId();
                            if (!this.user) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.apiService.identifyUser(this.projectId, this.anonymousId, this.user)];
                        case 1:
                            _d.sent();
                            _d.label = 2;
                        case 2:
                            _d.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.apiService.init(this.projectId, this.anonymousId)];
                        case 3:
                            projectDetails = _d.sent();
                            if (projectDetails) {
                                console.log('projectDetails', projectDetails.project);
                                this.projectData = projectDetails.project;
                                this.theme = this.projectData.uiVariant || 'basic';
                            }
                            else {
                                this.theme = 'basic';
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            _d.sent();
                            console.warn('[WeRelease] Could not fetch project data, using default theme');
                            this.theme = 'basic';
                            return [3 /*break*/, 5];
                        case 5:
                            _d.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.apiService.fetchLatest(this.projectId)];
                        case 6:
                            latestChangelog = _d.sent();
                            if (latestChangelog && latestChangelog.length > 0) {
                                this.changelogData = latestChangelog[0];
                            }
                            else {
                                this.changelogData = DEFAULT_CHANGELOG_DATA;
                            }
                            return [3 /*break*/, 8];
                        case 7:
                            _d.sent();
                            console.warn('[WeRelease] Could not fetch changelog data, using default');
                            this.changelogData = DEFAULT_CHANGELOG_DATA;
                            return [3 /*break*/, 8];
                        case 8:
                            // Check feedback status after initialization
                            this.checkFeedbackStatus();
                            return [3 /*break*/, 10];
                        case 9:
                            error_2 = _d.sent();
                            console.error('[WeRelease] Error during initialization:', error_2);
                            throw error_2;
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Show the changelog banner in the configured target
         */
        WeReleaseInstance.prototype.showBanner = function () {
            if (!this.projectId) {
                console.error('[WeRelease] SDK not initialized. Call init() first.');
                return;
            }
            var bannerConfig = {
                projectId: this.projectId,
                target: this.target,
                options: this.options,
                theme: this.theme,
                changelogData: this.changelogData,
                onBannerClick: this.handleBannerClick.bind(this),
                onViewChanges: this.handleViewChangesClick.bind(this),
                onDismiss: this.handleDismissClick.bind(this),
            };
            console.log('bannerConfig', bannerConfig);
            this.bannerManager.render(bannerConfig);
        };
        /**
         * Trigger the feedback UI modal
         * @param feedbackOptions - Optional feedback configuration
         */
        WeReleaseInstance.prototype.askForFeedback = function (feedbackOptions) {
            var _a, _b, _c;
            try {
                // Check if feedback has already been submitted
                this.checkFeedbackStatus();
                if (this.hasFeedbackSubmitted) {
                    // Show a "Thank you" message instead of the feedback form
                    this.modalManager.showThankYouModal();
                }
                else {
                    // Show the regular feedback modal with options
                    var canDismiss = (feedbackOptions === null || feedbackOptions === void 0 ? void 0 : feedbackOptions.dismiss) !== undefined
                        ? feedbackOptions.dismiss
                        : ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.dismissFeedbackModal) !== null && _b !== void 0 ? _b : true);
                    var type = (feedbackOptions === null || feedbackOptions === void 0 ? void 0 : feedbackOptions.type) || ((_c = this.options) === null || _c === void 0 ? void 0 : _c.feedbackType) || 'both';
                    this.modalManager.showFeedbackModal(canDismiss, type);
                }
            }
            catch (error) {
                console.error('[WeRelease] Error in askForFeedback:', error);
            }
        };
        /**
         * Map current anonymous session to the provided user
         * @param userData - User identification data
         */
        WeReleaseInstance.prototype.identify = function (userData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.projectId || !this.anonymousId) {
                                throw new Error('WeRelease not properly initialized');
                            }
                            this.user = userData;
                            return [4 /*yield*/, this.apiService.identifyUser(this.projectId, this.anonymousId, userData)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Check if user has already submitted feedback for current changelog
         * @returns boolean indicating if feedback was submitted
         */
        WeReleaseInstance.prototype.hasFeedbackBeenSubmitted = function () {
            this.checkFeedbackStatus();
            return this.hasFeedbackSubmitted;
        };
        /**
         * Reset feedback status (useful for testing or admin functions)
         * @returns boolean indicating if reset was successful
         */
        WeReleaseInstance.prototype.resetFeedbackStatus = function () {
            var _a;
            if (!this.projectId)
                return false;
            var feedbackKey = "".concat(STORAGE_KEYS.FEEDBACK_SUBMITTED, "_").concat(this.projectId, "_").concat(((_a = this.changelogData) === null || _a === void 0 ? void 0 : _a.id) || 'general');
            this.storageService.setItem(feedbackKey, '');
            this.hasFeedbackSubmitted = false;
            return true;
        };
        /**
         * Capture feedback (backward compatibility method)
         */
        WeReleaseInstance.prototype.captureFeedback = function () {
            var _this = this;
            this.modalManager.setFeedbackCallback(function (data) {
                _this.apiService.submitFeedback(data);
            });
        };
        /**
         * Get current project ID
         * @returns current project ID or undefined if not initialized
         */
        WeReleaseInstance.prototype.getProjectId = function () {
            return this.projectId;
        };
        /**
         * Get current user data
         * @returns current user data or null if not set
         */
        WeReleaseInstance.prototype.getUser = function () {
            return this.user;
        };
        /**
         * Get current target element
         * @returns current target selector
         */
        WeReleaseInstance.prototype.getTarget = function () {
            return this.target;
        };
        /**
         * Get current options
         * @returns current options object
         */
        WeReleaseInstance.prototype.getOptions = function () {
            return __assign({}, this.options);
        };
        // Private methods
        WeReleaseInstance.prototype.checkFeedbackStatus = function () {
            var _a;
            if (!this.projectId)
                return false;
            var feedbackKey = "".concat(STORAGE_KEYS.FEEDBACK_SUBMITTED, "_").concat(this.projectId, "_").concat(((_a = this.changelogData) === null || _a === void 0 ? void 0 : _a.id) || 'general');
            var feedbackStatus = this.storageService.getItem(feedbackKey);
            this.hasFeedbackSubmitted = feedbackStatus === 'submitted';
            return this.hasFeedbackSubmitted;
        };
        WeReleaseInstance.prototype.handleBannerClick = function (event) {
            var _a;
            if (this.options.onBannerClick) {
                this.options.onBannerClick(event, {
                    projectId: this.projectId,
                    releaseDate: (_a = this.changelogData) === null || _a === void 0 ? void 0 : _a.releaseDate,
                });
            }
        };
        WeReleaseInstance.prototype.handleViewChangesClick = function () {
            // Handle view changes click - could open modal or navigate
            // console.log('[WeRelease] View changes clicked');
        };
        WeReleaseInstance.prototype.handleDismissClick = function () {
            // Handle dismiss click - store in localStorage
            if (this.projectId) {
                var dismissKey = "".concat(STORAGE_KEYS.BANNER_DISMISSED, "_").concat(this.projectId);
                this.storageService.setItem(dismissKey, 'dismissed');
            }
        };
        return WeReleaseInstance;
    }());
    /**
     * WeRelease SDK Class
     * Only exposes the init method - all other functionality is available on instances
     */
    var WeRelease = /** @class */ (function () {
        function WeRelease() {
        }
        /**
         * Initialize WeRelease SDK
         * @param config - Configuration object
         * @returns WeReleaseInstance with all available methods
         */
        WeRelease.init = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            instance = new WeReleaseInstance();
                            // Initialize asynchronously but don't wait
                            return [4 /*yield*/, instance.init(config).catch(function (error) {
                                    console.error('[WeRelease] Initialization failed:', error);
                                })];
                        case 1:
                            // Initialize asynchronously but don't wait
                            _a.sent();
                            return [2 /*return*/, instance];
                    }
                });
            });
        };
        return WeRelease;
    }());

    // Main entry point for WeRelease SDK
    // Import WeRelease for global assignment
    // For IIFE builds, ensure WeRelease is globally available
    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.WeRelease = WeRelease;
    }

    exports.WeRelease = WeRelease;

})(this.WeRelease = this.WeRelease || {});
