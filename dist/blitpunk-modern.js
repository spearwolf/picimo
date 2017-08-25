(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["blitpunk"] = factory();
	else
		root["Blitpunk"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

const DOM_ELEM_CANVAS = exports.DOM_ELEM_CANVAS = 'blitpunk-canvas';
const DOM_ELEM_SCENE = exports.DOM_ELEM_SCENE = 'blitpunk-scene';
const DOM_ELEM_SPRITE_GROUP = exports.DOM_ELEM_SPRITE_GROUP = 'blitpunk-sprite-group';
const DOM_ELEM_TEXTURE_ATLAS = exports.DOM_ELEM_TEXTURE_ATLAS = 'blitpunk-texture-atlas';

const NODE_NAME_CANVAS = exports.NODE_NAME_CANVAS = DOM_ELEM_CANVAS.toUpperCase();
const NODE_NAME_SCENE = exports.NODE_NAME_SCENE = DOM_ELEM_SCENE.toUpperCase();
const NODE_NAME_SPRITE_GROUP = exports.NODE_NAME_SPRITE_GROUP = DOM_ELEM_SPRITE_GROUP.toUpperCase();
const NODE_NAME_TEXTURE_ATLAS = exports.NODE_NAME_TEXTURE_ATLAS = DOM_ELEM_TEXTURE_ATLAS.toUpperCase();

const COMP_PRIO_PROJECTION = exports.COMP_PRIO_PROJECTION = 1000;
const COMP_PRIO_BLEND_BEFORE = exports.COMP_PRIO_BLEND_BEFORE = 500;
const COMP_PRIO_CHILDREN = exports.COMP_PRIO_CHILDREN = 100;
const COMP_PRIO_BLEND_AFTER = exports.COMP_PRIO_BLEND_AFTER = -500;

const ATTR_ALPHA = exports.ATTR_ALPHA = 'alpha';
const ATTR_ANTIALIAS = exports.ATTR_ANTIALIAS = 'antialias';
const ATTR_BLEND_MODE = exports.ATTR_BLEND_MODE = 'blend-mode';
const ATTR_CAPACITY = exports.ATTR_CAPACITY = 'capacity';
const ATTR_CLEAR_COLOR = exports.ATTR_CLEAR_COLOR = 'clear-color';
const ATTR_DEPTH = exports.ATTR_DEPTH = 'depth';
const ATTR_DESCRIPTOR = exports.ATTR_DESCRIPTOR = 'descriptor';
const ATTR_FLIP_Y = exports.ATTR_FLIP_Y = 'flip-y';
const ATTR_FRAGMENT_SHADER = exports.ATTR_FRAGMENT_SHADER = 'fragment-shader';
const ATTR_MODULE_SRC = exports.ATTR_MODULE_SRC = 'module-src';
const ATTR_NEAREST = exports.ATTR_NEAREST = 'nearest';
const ATTR_PREMULTIPLIED_ALPHA = exports.ATTR_PREMULTIPLIED_ALPHA = 'premultiplied-alpha';
const ATTR_PREMULTIPLY_ALPHA = exports.ATTR_PREMULTIPLY_ALPHA = 'premultiply-alpha';
const ATTR_PRESERVE_DRAW = exports.ATTR_PRESERVE_DRAW = 'preserve-drawing-buffer';
const ATTR_PRIMITIVE = exports.ATTR_PRIMITIVE = 'primitive';
const ATTR_PROJECTION = exports.ATTR_PROJECTION = 'projection';
const ATTR_REPEATABLE = exports.ATTR_REPEATABLE = 'repeatable';
const ATTR_SRC = exports.ATTR_SRC = 'src';
const ATTR_STENCIL = exports.ATTR_STENCIL = 'stencil';
const ATTR_TEXTURE_MAP = exports.ATTR_TEXTURE_MAP = 'texture-map';
const ATTR_VERTEX_SHADER = exports.ATTR_VERTEX_SHADER = 'vertex-shader';
const ATTR_VO_NEW = exports.ATTR_VO_NEW = 'vo-new';
const ATTR_VO_ZERO = exports.ATTR_VO_ZERO = 'vo-zero';

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARRAY_TYPE", function() { return ARRAY_TYPE; });
/* harmony export (immutable) */ __webpack_exports__["setMatrixArrayType"] = setMatrixArrayType;
/* harmony export (immutable) */ __webpack_exports__["toRadian"] = toRadian;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */

/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
const EPSILON = 0.000001;
/* harmony export (immutable) */ __webpack_exports__["EPSILON"] = EPSILON;

let ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
const RANDOM = Math.random;
/* harmony export (immutable) */ __webpack_exports__["RANDOM"] = RANDOM;


/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}

const degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */
function toRadian(a) {
  return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
function equals(a, b) {
  return Math.abs(a - b) <= EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasMap = canUseMap();
var hasSymbol = canUseSymbol();
var hasConsole = typeof console !== 'undefined';

var PROP_NAMESPACE  = !hasSymbol ? '@@eventize' : (function () {
    if (!Symbol.eventize) {
        Symbol.eventize = Symbol('eventize');
    }
    return Symbol.eventize;
})();

var CATCH_ALL_EVENT = '*';
var LOG_NAMESPACE   = '[eventize.js]';

// =====================================================================
//
// eventize( object )
//
// =====================================================================

function eventize (o) {

    if (o[PROP_NAMESPACE]) return o;

    var _e = {
        lastCallbackId : 0,
        callbacks      : {},
        boundObjects   : []
    };

    _e.callbacks[CATCH_ALL_EVENT] = [];

    var _ePublic = definePublicPropertiesRO({}, {
        silenced : false,
        off      : []
    });

    defineHiddenPropertyRO(o, PROP_NAMESPACE, _ePublic);

    if (eventize.PRIO_DEFAULT === undefined) {

        definePublicPropertiesRO(eventize, {
            PRIO_MAX     : Number.POSITIVE_INFINITY,
            PRIO_A       : 1000000000,
            PRIO_B       : 10000000,
            PRIO_C       : 100000,
            PRIO_DEFAULT : 0,
            PRIO_LOW     : -100000,
            PRIO_MIN     : Number.NEGATIVE_INFINITY
        });

    }

    // -----------------------------------------------------------------
    //
    // object.on( eventName, [ prio, ] callbackFunc )
    // object.on( eventName, [ prio, ] obj )
    //
    // object.on( callbackFunc )    => object.on( '*', callbackFunc )
    // object.on( obj )             => object.on( '*', obj )
    //
    // object.on( eventName )
    // object.on()
    //
    // -----------------------------------------------------------------

    o.on = function (eventName, prio, fn) {  // --- {{{

        var argsLen = arguments.length;

        if (argsLen === 0) {
            if (_ePublic.silenced) {
                definePublicPropertyRO(_ePublic, 'silenced', false);
                _ePublic.off.length = 0;
            }
            return;
        }

        var i;

        if (argsLen === 1) {
            if (typeof eventName === 'string') {

                i = _ePublic.off.indexOf(eventName);
                if (i >= 0) {
                    _ePublic.off.splice(i, 1);
                }
                return;

            } else if (typeof eventName === 'object' || typeof eventName === 'function') {

                // alias for: on('*', listener)

                fn = eventName;
                eventName = CATCH_ALL_EVENT;
                prio = eventize.PRIO_DEFAULT;

            } else {
                if (hasConsole) {
                    console.warn(LOG_NAMESPACE, '.on() called with insufficient arguments!', arguments);
                }
                return;
            }
        }

        if (argsLen === 2) {
            fn = prio;
            prio = eventize.PRIO_DEFAULT;
        }

        var eventizeCallbacks = _e.callbacks;
        var eventListener = eventizeCallbacks[eventName] || (eventizeCallbacks[eventName] = []);
        var listenerId = createId();
        var listener = definePublicPropertiesRO({}, {
            id         : listenerId,
            fn         : fn,
            prio       : (typeof prio !== 'number' ? eventize.PRIO_DEFAULT : prio),
            isFunction : (typeof fn === 'function'),
        });

        eventListener.push(listener);
        eventListener.sort(sortListenerByPrio);

        return listenerId;

    };

    function createId () {
        return ++_e.lastCallbackId;
    }

    function sortListenerByPrio (a, b) {
        return a.prio !== b.prio ? b.prio - a.prio : a.id - b.id;
    }

    // --- on }}}

    // ----------------------------------------------------------------------
    //
    // object.once( eventName, [ prio, ] callbackFunc )
    // object.once( eventName, [ prio, ] obj )
    //
    // object.once( callbackFunc )      => object.once( '*', callbackFunc )
    // object.once( obj )               => object.once( '*', obj )
    //
    // ----------------------------------------------------------------------

    o.once = function (eventName, prio, fn) {  // --- {{{

        var argsLen = arguments.length;

        if (!argsLen || argsLen > 3) {
            if (hasConsole) {
                console.warn(LOG_NAMESPACE, '.once() called with insufficient arguments!', arguments);
            }
            return;
        }

        if (argsLen === 1) {

            fn = eventName;
            eventName = CATCH_ALL_EVENT;
            prio = eventize.PRIO_DEFAULT;

        } else if (argsLen === 2) {

            fn = prio;
            prio = eventize.PRIO_DEFAULT;

        }

        var id = o.on(eventName, prio, function () {
            var res = fn.apply(this, arguments);
            o.off(id);
            return res;
        });

        return id;

    };

    // --- once }}}

    // -----------------------------------------------------------------
    //
    // object.off( id )
    // object.off( callback )
    // object.off( obj )
    // object.off( eventName )
    // object.off()
    //
    // deactive listener by id or previously bound object or
    // function reference or event name or silence all events
    //
    // -----------------------------------------------------------------

    o.off = function (id) {  // -- {{{

        if (arguments.length === 0) {
            if (!_ePublic.silenced) {
                definePublicPropertyRO(_ePublic, 'silenced', true);
                _ePublic.off.length = 0;
            }
            return;
        }

        if (typeof id === 'string') {
            //
            // by event name
            //
            if (_ePublic.off.indexOf(id) === -1) {
                _ePublic.off.push(id);
            }
            return;
        }

        var eventizeCallbacks = _e.callbacks;
        var cb, i, j, _callbacks, keys;
        var isObject = typeof id === 'object';

        if (typeof id === 'number' || typeof id === 'function' || isObject) {
            //
            // by id or function reference
            //
            keys = Object.keys(eventizeCallbacks);
            for (j = 0; j < keys.length; j++) {
                _callbacks = eventizeCallbacks[keys[j]];
                for (i = 0; i < _callbacks.length; i++) {
                    cb = _callbacks[i];
                    if (cb.id === id || cb.fn === id) {
                        _callbacks.splice(i, 1);
                        if (!isObject) return;
                    }
                }
            }
        }

        if (isObject) {
            //
            // by bound object reference
            //
            i = _e.boundObjects.indexOf(id);
            if ( i >= 0 ) {
                _e.boundObjects.splice(i, 1);
            }
        }

    };

    // --- off }}}

    // -----------------------------------------------------------------
    //
    // object.connect( obj )
    // object.connect( obj, mapping )
    //
    // Example:
    //
    //   object.connect(options, {
    //        onProjectionUpdated : [100, 'projectionUpdated'],
    //        onFrame             : 'frame',
    //        onFrameEnd          : 'frameEnd'
    //   })
    //
    // -----------------------------------------------------------------

    o.connect = function (obj, mapping) {  // --- {{{
        var argsLen = arguments.length;
        if (argsLen === 1) {
            return _bindObject(obj);
        } else if (argsLen === 2) {
            return _connectWithMapping(this, obj, mapping);
        } else {
            if (hasConsole) {
                console.warn(LOG_NAMESPACE, '.connect() called with insufficient arguments!', arguments);
            }
        }
    };

    function _bindObject (obj) {

        // TODO connect(obj) should ..
        // - support priority
        // - support filters? (via only, except options)
        // - support senderContextArgument?: 'prepend'|'append'|false

        if (!obj) return;
        var i = _e.boundObjects.indexOf(obj);
        if (i === -1) {
            _e.boundObjects.push(obj);
        }
        return obj;

    }

    function _connectWithMapping (obj, options, listenerMap) {

        var eventName, listenName, listenFunc, prio;

        for (listenName in listenerMap) {
            if (listenerMap.hasOwnProperty(listenName)) {
                listenFunc = options[listenName];
                if (typeof listenFunc === 'function') {
                    eventName = listenerMap[listenName];
                    if (Array.isArray(eventName)) {
                        prio = eventName[0];
                        eventName = eventName[1];
                    } else {
                        prio = eventize.PRIO_DEFAULT;
                    }
                    obj.on(eventName, prio, listenFunc);
                }
            }
        }

        return obj;

    }

    // --- connect }}}

    // -----------------------------------------------------------------
    //
    // object.emit( eventName [, arguments .. ] )
    //
    // -----------------------------------------------------------------

    o.emit = function () {  // --- {{{

        // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        var eventName;
        var senderCtx = this;
        var rootCtx;
        var argsCtx;

        if (args.length > 1 && typeof args[0] !== 'string' && typeof args[1] === 'string') {
            rootCtx = args.shift();
            eventName = args.shift();
            args[args.length - 1] = rootCtx;
            argsCtx = args;
        } else {
            eventName = args.shift();  // throw out eventName
            argsCtx = args.concat([senderCtx]);
        }

        _dispatch(eventName, function (listener) {

            if (listener.isFunction) {
                listener.fn.apply(senderCtx, args);
            } else {
                var fn = listener.fn[eventName];
                if (typeof fn === 'function') {
                    fn.apply(listener.fn, argsCtx);
                } else if (listener.fn[PROP_NAMESPACE]) {
                    listener.fn.emit.apply(listener.fn, [eventName].concat(args));
                }
            }

        }, function (fn, boundObj) {

            if (fn) {
                fn.apply(boundObj, argsCtx);
            } else {
                boundObj.emit.apply(boundObj, [senderCtx, eventName].concat(argsCtx));
            }

        });

    }

    function _dispatch (eventName, emitListener, emitBoundObject) {

        if (_ePublic.silenced) return;
        if (_ePublic.off.indexOf(eventName) >= 0) return;

        var listeners              = _e.callbacks[eventName];
        var catchAllListeners      = _e.callbacks[CATCH_ALL_EVENT];
        var boundObjsCount         = _e.boundObjects.length;
        var hasBoundObjectsEmitted = false;

        function _emitBoundObjects () {
            var j, bo, fn;
            if (boundObjsCount) {
                for (j = 0; j < boundObjsCount; j++) {
                    bo = _e.boundObjects[j];
                    fn = bo[eventName];
                    if (typeof fn === 'function') {
                        emitBoundObject(fn, bo);
                    } else if (bo[PROP_NAMESPACE]) {
                        emitBoundObject(null, bo);
                    }
                }
            }
        }

        var i, len, listen;

        if (listeners || catchAllListeners.length) {

            listeners = listeners ? listeners.concat(catchAllListeners) : catchAllListeners;
            len = listeners.length;

            for (i = 0; i < len; i++) {
                listen = listeners[i];
                if (!hasBoundObjectsEmitted && listen && listen.prio < eventize.PRIO_DEFAULT) {
                    _emitBoundObjects();
                    hasBoundObjectsEmitted = true;
                }
                emitListener(listen);
            }
        }

        if (!hasBoundObjectsEmitted) _emitBoundObjects();

    }

    // --- emit }}}

    // --------------------------------------------------------------------
    //
    // object.emitReduce( eventName [, value= {} ] [, arguments .. ] )
    //
    // --------------------------------------------------------------------

    o.emitReduce = function () {  // --- {{{

        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        var eventName = args.shift();
        var value;

        function setValue (val) {
            if (val !== undefined) {
                value = val;
            }
        }

        if (args.length === 0) {
            value = {};
            args.push(value);
        } else {
            setValue(args[0]);
        }

        var ctx = this;
        var argsWithEventName = [eventName].concat(args);
        var argsCtx = args.concat([ctx]);

        _dispatch(eventName, function (listener) {

            if (listener.isFunction) {
                args[0] = value;
                setValue(listener.fn.apply(ctx, args));
            } else {
                var fn = listener.fn[eventName];
                if (typeof fn === 'function') {
                    argsCtx[0] = value;
                    setValue(fn.apply(listener.fn, argsCtx));
                } else if (listener.fn[PROP_NAMESPACE]) {
                    argsWithEventName[1] = value;
                    setValue(listener.fn.emitReduce.apply(listener.fn, argsWithEventName));
                }
            }

        }, function (fn, boundObj) {

            if (fn) {
                argsCtx[0] = value;
                setValue(fn.apply(boundObj, argsCtx));
            }

        });

        return value;

    };

    // --- emit }}}

    // --------------------------------------------------------------------
    //
    // object.from( eventName, Observable )
    //
    // See https://github.com/tc39/proposal-observable
    //
    // Example:
    //
    //      object
    //          .from('foo', Rx.Observable)
    //          .filter(x => x % 2 === 0)
    //          .subscribe(x => console.log(x));
    //
    //
    // --------------------------------------------------------------------

    o.from = function (eventName, observable) {  // --- {{{
        var self = this;
        return new observable(function (observer) {

            var id = self.on(eventName, function (data) {
                observer.next(data);
            });

            return function () {
                self.off(id);
            };

        });
    };

    // --- from }}}

    // --------------------------------------------------------------------
    //
    // object.subscribe( Observable, onNext[, onError][, onComplete] )
    //
    // Example:
    //
    //      object.subscribe(a, 'value', 'error');   // a => Observable
    //
    // --------------------------------------------------------------------

    o.subscribe = function (source, onNext, onError, onComplete) {  // --- {{{
        var self = this;
        return source.subscribe(function (value) {
            self.emit(onNext, value);
        }, onError ? function (errorValue) {
            self.emit(onError, errorValue);
        } : undefined, onComplete ? function (completeValue) {
            self.emit(onComplete, completeValue);
        } : undefined);
    };

    // --- subscribe }}}

    return o;

} // <= eventize()


eventize.is = function (obj) {
    return !!( obj && obj[PROP_NAMESPACE] );
};


defineHiddenPropertyRO( eventize,
    'EventizeNamespace', PROP_NAMESPACE);


// ==========================================================================
//
// eventize.queue([ queueId ][, options]) : queue
//
// options are:
//    - replace: true|false  - replace previous events with same name
//                             when queue is in collection mode
//
// queue.play()              - activate play (immediately emit) mode
// queue.collect()           - activate collection (store all events) mode
// queue.toggle()            - toggle state
// queue.state               - 'play'|'collect'
//
// ==========================================================================

defineHiddenPropertyRO(eventize, 'queues', hasMap ? new Map : {});

eventize.queue = function (id/*, options */) {

    var queue, options;
    var len = arguments.length;

    if (len >= 1) {
        if (typeof id !== 'object' || len === 2) {
            queue = hasMap ? eventize.queues.get(id) : eventize.queues[id];
        }
        if (len === 2) {
            options = arguments[1];
        } else if (len === 1 && typeof id === 'object') {
            options = id;
        }
    }

    if (!queue) {
        queue = createQueue(id, options);
        if (hasMap) {
            eventize.queues.set(queue.id, queue);
        } else {
            eventize.queues[queue.id] = queue;
        }
    }

    return queue;

};


var STATE = 'state';
var PLAY = 'play';
var COLLECT = 'collect';

function createQueue (id, options) {

    var queueId = ((typeof id === 'string' || typeof id === 'symbol') && id) || createUuid();
    var queue = eventize({});
    var isReplace = !!(options && options.replace);

    var setState = function (state) {
        definePublicPropertyRO(queue, STATE, state);
    };

    var emit = (function (_emit) {
            return function (args) {
            _emit.apply(queue, args);
        };
    })(queue.emit);

    defineHiddenPropertyRO(queue, 'events', []);
    definePublicPropertyRO(queue, 'id', queueId);

    queue.collect = function () {
        if (queue[STATE] !== COLLECT) {
            setState(COLLECT);
        }
        return queue;
    };

    queue.emit = function () {
        var args = new Array(arguments.length);
        var i;
        for (i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }
        if (queue[STATE] === PLAY) {
            emit(args);
        } else {  // COLLECT
            if (isReplace) {
                var len, eventName = args[0];
                for (i = 0, len = queue.events.length; i < len; i++) {
                    if (queue.events[i][0] === eventName) {
                        queue.events[i] = args;
                        return;
                    }
                }
            }
            queue.events.push(args);
        }
    };

    queue.play = function () {
        if (queue[STATE] !== PLAY) {
            setState(PLAY);
            queue.events.forEach(emit);
            queue.events.length = 0;
        }
        return queue;
    };

    queue.toggle = function () {
        return queue[STATE] !== PLAY ? queue.play() : queue.collect();
    };

    return queue.play();

}


// =====================================================================
//
// helper functions
//
// =====================================================================


function createUuid () {
    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    return hasSymbol ? Symbol(uuid) : uuid;
}

function canUseSymbol () {
    return typeof Symbol !== 'undefined';
}

function canUseMap () {
    return typeof Map !== 'undefined';
}

function definePublicPropertyRO (obj, name, value) {
    Object.defineProperty(obj, name, {
        value        : value,
        configurable : true,
        enumerable   : true
    });
    return obj;
}

function definePublicPropertiesRO (obj, attrs) {
    var i, keys = Object.keys(attrs);
    for (i = keys.length; i--;) {
        definePublicPropertyRO(obj, keys[i], attrs[keys[i]]);
    }
    return obj;
}

function defineHiddenPropertyRO (obj, name, value) {
    Object.defineProperty(obj, name, {
        value        : value,
        configurable : true
    });
    return obj;
}


// --- end
//
module.exports = eventize;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

// https://github.com/kelektiv/node-uuid
/** @private */
const uuid = __webpack_require__(53);

exports.default = uuid;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _generate_uuid = __webpack_require__(3);

var _generate_uuid2 = _interopRequireDefault(_generate_uuid);

var _serial = __webpack_require__(59);

var _serial2 = _interopRequireDefault(_serial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents a resource reference which points to a *renderable resource*.
 * Every resource has an id, serial and possible resource allocation *hints*.
 * The resource reference will be used by the resource library to find or
 * create *renderable resources* (like WebGlBuffer, WebGlTexture, ..).
 */
class ResourceRef {
  constructor(resource, hints = {}) {
    this.resource = resource;
    this.hints = hints;
    this.id = hints.id || (0, _generate_uuid2.default)();
    this.serial = new _serial2.default(typeof hints.serial === 'number' ? hints.serial : 1);
  }

  /**
   * @param {ResourceRef} sourceRef
   * @returns {boolean}
   */
  isSynced(sourceRef) {
    const { value } = this.serial;
    return value > 0 && value === sourceRef.serial.value;
  }

  /**
   * @param {ResourceRef} sourceRef
   * @returns {boolean}
   */
  needSync(sourceRef) {
    return !this.isSynced(sourceRef);
  }

  /**
   * @param {ResourceRef} sourceRef
   * @param {function} cb
   */
  sync(sourceRef, cb) {
    if (this.needSync(sourceRef)) {
      cb(this.resource);
      this.serial.value = sourceRef.serial.value;
    }
  }
}
exports.default = ResourceRef;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

/** @private */
const BYTES_PER_ELEMENT = Object.freeze({
  float32: 4,
  int16: 2,
  int32: 4,
  int8: 1,
  uint16: 2,
  uint32: 4,
  uint8: 1
});

/** @private */
const TYPED_ARRAY_CONSTRUCTOR = Object.freeze({
  float32: Float32Array,
  int16: Int16Array,
  int32: Int32Array,
  int8: Int8Array,
  uint16: Uint16Array,
  uint32: Uint32Array,
  uint8: Uint8Array
});

/** @private */
const TYPED_ARRAY_GETTER = Object.freeze({
  float32: obj => obj.float32Array,
  int32: obj => obj.int32Array,
  int16: obj => obj.int16Array,
  int8: obj => obj.int8Array,
  uint32: obj => obj.uint32Array,
  uint16: obj => obj.uint16Array,
  uint8: obj => obj.uint8Array
});

/** @private */
const GL_ITEM_TYPES = Object.freeze({
  float32: 'FLOAT',
  int16: 'SHORT',
  int32: 'INT',
  int8: 'BYTE',
  uint16: 'UNSIGNED_SHORT',
  uint32: 'UNSIGNED_INT',
  uint8: 'UNSIGNED_BYTE'
});

exports.BYTES_PER_ELEMENT = BYTES_PER_ELEMENT;
exports.TYPED_ARRAY_CONSTRUCTOR = TYPED_ARRAY_CONSTRUCTOR;
exports.TYPED_ARRAY_GETTER = TYPED_ARRAY_GETTER;
exports.GL_ITEM_TYPES = GL_ITEM_TYPES;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Generic container for shader variables. eg. uniform, vertex attributes, textures ..
 * @desc
 * Each time you change the value, a serial number will be increased.
 * Use `.touch()` if you want to increase the serial number without changing the value.
 */
class ShaderVariable {
  /**
   * @param {string} name
   * @param {string} type
   * @param {number|Object} value
   */
  constructor(name, type, value) {
    this.name = name;
    this.type = type;
    this._value = value;

    /**
     * The serial number increases each time you change the value.
     * @type {number}
     */
    this.serial = 0;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (this._value !== val) {
      this._value = val;
      ++this.serial;
    }
  }

  /**
   * Increase serial number.
   */
  touch() {
    ++this.serial;
  }
}

exports.default = ShaderVariable;
ShaderVariable.TYPE = Object.freeze({
  UNIFORM: 'uniform',
  ATTRIB: 'attrib',
  TEXTURE_2D: 'tex2d'
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(19);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(4),
    isKey = __webpack_require__(137),
    stringToPath = __webpack_require__(138),
    toString = __webpack_require__(18);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(23);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(42);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(163);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _resource_ref = __webpack_require__(5);

var _resource_ref2 = _interopRequireDefault(_resource_ref);

var _typed_array_helpers = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vertex Object Array
 *
 * @class VOArray
 *
 * @param {VODescriptor} descriptor - *Vertex object* descriptor
 * @param {number} capacity - Maximum number of *vertex objects*
 * @param {?ArrayBuffer|DataView|Float32Array} data
 * @param {string} [usage=VOArray.USAGE.DYNAMIC] usage hint
 * @param {boolean} [autotouch] autotouch
 *
 * @desc
 * An array of *vertex objects*.
 * Has a maximum capacity and a reference to the *vertex object descriptor*.
 *
 */

class VOArray {
  constructor(descriptor, capacity, data, usage = VOArray.USAGE.DYNAMIC, autotouch = undefined) {
    /** @type {ResourceRef} */
    this.resourceRef = new _resource_ref2.default(this, { usage });

    /** @type {VODescriptor} */
    this.descriptor = descriptor;
    /** @type {number} */
    this.capacity = capacity;

    if (data instanceof ArrayBuffer) {
      this.float32Array = new Float32Array(data);
    } else if (data instanceof DataView) {
      this.float32Array = new Float32Array(data.buffer, data.byteOffset, data.byteLength / 4);
    } else if (data instanceof Float32Array) {
      this.float32Array = data;
    } else {
      this.float32Array = new Float32Array(new ArrayBuffer(capacity * descriptor.bytesPerVO));
    }

    // needed by WebGlRenderer#syncBuffer
    this.resourceRef.hints.typedArray = this.float32Array;

    const { buffer, bufferByteOffset, bufferByteLength } = this;
    descriptor.typeList.filter(type => type !== 'float32').forEach(type => {
      this[`${type}Array`] = new _typed_array_helpers.TYPED_ARRAY_CONSTRUCTOR[type](buffer, bufferByteOffset, bufferByteLength / _typed_array_helpers.BYTES_PER_ELEMENT[type]);
    });

    /** @type {boolean} */
    this.enableAutotouch = typeof autotouch === 'boolean' ? autotouch : usage === VOArray.USAGE.DYNAMIC;

    Object.freeze(this);
  }

  /**
   * increase serial value from resource reference
   */
  touch() {
    this.resourceRef.serial.touch();
  }

  /** @type {ArrayBuffer} */
  get buffer() {
    return this.float32Array.buffer;
  }

  /** @type {number} */
  get bufferByteOffset() {
    return this.float32Array.byteOffset;
  }

  /** @type {number} */
  get bufferByteLength() {
    return this.float32Array.byteLength;
  }

  /**
   * Copy **all** *vertex object* data from an external vertex array to the internal array
   * @param {VOArray} fromVOArray - The source vertex array
   * @param {number} [toOffset=0] - *Vertex object* offset for the internal vertex array
   */
  copy(fromVOArray, toOffset) {
    let offset = 0;

    if (toOffset === undefined) {
      offset = toOffset * (this.descriptor.bytesPerVO >> 2);
    }

    this.float32Array.set(fromVOArray.float32Array, offset);
  }

  /**
   * Create a VOArray *sub* array
   * @desc
   * This will **not** *copy* the internal vertex data - this will create a new view into the internal buffer.
   * Both (the new VOArray and the current one) will share the
   * same memory buffer.
   *
   * @param {number} begin - Index of first vertex object
   * @param {number} [size=1]
   * @return {VOArray}
   */
  subarray(begin, size = 1) {
    return new VOArray(this.descriptor, size, new DataView(this.buffer, this.bufferByteOffset + begin * this.descriptor.bytesPerVO, size * this.descriptor.bytesPerVO));
  }
}

exports.default = VOArray;
VOArray.USAGE = Object.freeze({
  STATIC: 'static',
  DYNAMIC: 'dynamic'
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typed_array_helpers = __webpack_require__(6);

/**
 * Vertex object *attribute* descriptor.
 */
class VOAttrDescriptor {
  /**
   * @param {string} name
   * @param {string} type
   * @param {number} size
   * @param {number} [offset] - either `offset` or `byteOffset` must be specified
   * @param {number} [byteOffset] - either `offset` or `byteOffset` must be specified
   * @param {boolean} uniform
   * @param {string[]} [attrNames]
   */
  constructor(name, type, size, offset, byteOffset, uniform, attrNames) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.uniform = uniform;
    this.attrNames = attrNames;

    this.bytesPerElement = _typed_array_helpers.BYTES_PER_ELEMENT[this.type];
    this.bytesPerVertex = this.bytesPerElement * size;

    if (typeof byteOffset !== 'number') {
      this.byteOffset = offset * this.bytesPerElement;
    } else {
      this.byteOffset = byteOffset;
    }

    if (typeof offset !== 'number') {
      this.offset = byteOffset / this.bytesPerElement;
    } else {
      this.offset = offset;
    }
  }

  /**
   * Number of attributes per vertex
   * @type {number}
   */
  vertexAttrCount(descriptor) {
    return descriptor.bytesPerVertex / this.bytesPerElement;
  }

  /**
   * @private
   */
  static defineProperties(attrDesc, propertiesObject, descriptor) {
    const { name } = attrDesc;
    const getArray = _typed_array_helpers.TYPED_ARRAY_GETTER[attrDesc.type];
    const vertexCount = descriptor.vertexCount;
    const vertexAttrCount = attrDesc.vertexAttrCount(descriptor);
    const offset = attrDesc.byteOffset / attrDesc.bytesPerElement;

    let i, j;

    if (attrDesc.size === 1) {
      if (attrDesc.uniform) {
        const valueGetter = getV1u(getArray, offset);
        const valueSetter = setV1u(getArray, vertexCount, vertexAttrCount, offset);

        attrDesc.getValue = vo => valueGetter.call(vo);
        attrDesc.setValue = (vo, arg) => valueSetter.call(vo, arg);

        propertiesObject[name] = {
          get: valueGetter,
          set: valueSetter,
          enumerable: true
        };
      } else {
        const valueSetter = setVNv(getArray, 1, vertexCount, vertexAttrCount, offset);

        attrDesc.setValue = (vo, args) => valueSetter.apply(vo, args);

        propertiesObject['set' + camelize(name)] = {
          value: valueSetter,
          enumerable: true
        };

        const valueGetters = [];

        for (i = 0; i < descriptor.vertexCount; ++i) {
          const curValueGetter = getV1u(getArray, offset + i * vertexAttrCount);

          valueGetters.push(curValueGetter);

          propertiesObject[name + i] = {

            get: curValueGetter,
            set: setVNv(getArray, 1, 1, 0, offset + i * vertexAttrCount),
            enumerable: true

          };
        }

        attrDesc.getValue = function (vo, vi) {
          return valueGetters[vi].call(vo);
        };
      }
    } else if (attrDesc.size >= 2) {
      if (attrDesc.uniform) {
        const valueGetter = getVNu(getArray, offset);
        const valueSetter = setVNu(getArray, attrDesc.size, vertexCount, vertexAttrCount, offset);

        attrDesc.getValue = (vo, vi, idx) => valueGetter.call(vo, idx);
        attrDesc.setValue = (vo, args) => valueSetter.apply(vo, args);

        propertiesObject['get' + camelize(name)] = {
          value: valueGetter,
          enumerable: true
        };

        propertiesObject['set' + camelize(name)] = {
          value: valueSetter,
          enumerable: true
        };

        for (i = 0; i < attrDesc.size; ++i) {
          const setterName = attrPostfix(attrDesc, name, i);

          propertiesObject[setterName] = {

            get: getV1u(getArray, offset + i),
            set: setV1u(getArray, vertexCount, vertexAttrCount, offset + i),
            enumerable: true

          };
        }
      } else {
        const valueSetter = setVNv(getArray, attrDesc.size, vertexCount, vertexAttrCount, offset);

        attrDesc.setValue = (vo, args) => valueSetter.apply(vo, args);

        propertiesObject['set' + camelize(name)] = {
          value: valueSetter,
          enumerable: true
        };

        const valueGetters = [];

        for (i = 0; i < descriptor.vertexCount; ++i) {
          const curVertexValueGetters = [];

          for (j = 0; j < attrDesc.size; ++j) {
            const setterName = attrPostfix(attrDesc, name, j) + i;
            const curValueGetter = getV1u(getArray, offset + i * vertexAttrCount + j);

            curVertexValueGetters.push(curValueGetter);

            propertiesObject[setterName] = {

              get: curValueGetter,
              set: setVNv(getArray, 1, 1, 0, offset + i * vertexAttrCount + j),
              enumerable: true

            };
          }

          valueGetters.push(curVertexValueGetters);
        }

        attrDesc.getValue = function (vo, vi, idx) {
          return valueGetters[vi][idx].call(vo);
        };
      }
    }
  }
}

exports.default = VOAttrDescriptor; /** @private */

function attrPostfix(attrDesc, name, index) {
  if (attrDesc.attrNames) {
    let postfix = attrDesc.attrNames[index];

    if (postfix !== undefined) {
      return postfix;
    }
  }

  return name + '_' + index;
}

/** @private */
function getVNu(getArray, offset) {
  return function (attrIndex) {
    return getArray(this.voArray)[offset + attrIndex];
  };
}

/** @private */
function setVNu(getArray, vectorLength, vertexCount, vertexAttrCount, offset) {
  return function () {
    const _array = getArray(this.voArray);
    let i;
    let n;

    for (i = 0; i < vertexCount; ++i) {
      for (n = 0; n < vectorLength; ++n) {
        _array[i * vertexAttrCount + offset + n] = arguments[n];
      }
    }
  };
}

/** @private */
function getV1u(getArray, offset) {
  return function () {
    return getArray(this.voArray)[offset];
  };
}

/** @private */
function setVNv(getArray, vectorLength, vertexCount, vertexAttrCount, offset) {
  return function () {
    const _array = getArray(this.voArray);
    let i;
    let n;

    for (i = 0; i < vertexCount; ++i) {
      for (n = 0; n < vectorLength; ++n) {
        _array[i * vertexAttrCount + offset + n] = arguments[i * vectorLength + n];
      }
    }
  };
}

/** @private */
function setV1u(getArray, vertexCount, vertexAttrCount, offset) {
  return function (value) {
    const _array = getArray(this.voArray);

    for (let i = 0; i < vertexCount; ++i) {
      _array[i * vertexAttrCount + offset] = value;
    }
  };
}

/** @private */
function camelize(name) {
  return name[0].toUpperCase() + name.substr(1);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _power_of_2_image = __webpack_require__(29);

var _power_of_2_image2 = _interopRequireDefault(_power_of_2_image);

var _resource_ref = __webpack_require__(5);

var _resource_ref2 = _interopRequireDefault(_resource_ref);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getOption = (options, key, defaultValue) => options != null ? options[key] !== undefined ? options[key] : defaultValue : defaultValue;

/**
 * Represents texture coordinates and holds a reference to a `<img>` or `<canvas>` element.
 * Textures can form hierachical structures.
 * The *root* texture contains always the image reference, all other *sub* textures contain
 * references to their parent (and the root).
 *
 * @class Texture
 *
 * @example
 * const canvas = document.createElement("canvas")
 * const texture = new Texture(canvas)
 * texture.width    // => 300 <- default size of <canvas> element
 * texture.height   // => 150
 *
 * let subTex = new Texture(texture, 30, 15, 100, 100)
 * subTex.width    // => 100
 *
 * Texture.load('test/assets/bird-chicken-penguin.png').then(tex => {
 *   tex.width    // => 640
 *   tex.height   // => 480
 * })
 */

class Texture {
  /**
   * @param {Texture|PowerOf2Image|HTMLImageElement|HTMLCanvasElement} source - image elements must be *completed* (loaded)
   * @param {number} [width]
   * @param {number} [height]
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {Object} [hints] texture hints
   * @param {boolean} [hints.flipY=false]
   * @param {boolean} [hints.repeatable=false]
   * @param {boolean} [hints.premultiplyAlpha=true]
   */
  constructor(source, width, height, x = 0, y = 0, hints = undefined) {
    if (source instanceof Texture) {
      /**
       * @type {Texture}
       */
      this.parent = source;
      /**
       * @type {PowerOf2Image|HTMLImageElement|HTMLCanvasElement}
       */
      this.image = null;
    } else if (typeof source === 'object' && 'width' in source && 'height' in source) {
      this.image = source;
      this.parent = null;

      this._resourceRef = new _resource_ref2.default(this, {
        flipY: getOption(hints, 'flipY', false),
        repeatable: getOption(hints, 'repeatable', false),
        premultiplyAlpha: getOption(hints, 'premultiplyAlpha', true),
        nearest: getOption(hints, 'nearest', false)
      });

      if ('origWidth' in source && 'origHeight' in source) {
        width = source.origWidth;
        height = source.origHeight;
      }
    } else {
      throw new Error('new Texture() panic: unexpected source argument!');
    }

    this._width = width;
    this._height = height;

    /**
     * @type {number}
     */
    this.x = x;
    /**
     * @type {number}
     */
    this.y = y;
  }

  /**
   * @type {Texture}
   */
  get root() {
    return this.parent && this.parent.root || this;
  }

  /**
   * @type {HTMLImageElement|HTMLCanvasElement}
   */
  get imgEl() {
    const { root } = this;
    return root.image.imgEl || root.image;
  }

  /**
   * @type {ResourceRef}
   */
  get resourceRef() {
    return this._resourceRef || this.root.resourceRef;
  }

  /**
   * @type {number}
   */
  get width() {
    return typeof this._width === 'number' ? this._width : this.image ? this.image.width : this.parent ? this.root.width : 0;
  }

  set width(w) {
    this._width = w;
  }

  /**
   * @type {number}
   */
  get height() {
    return typeof this._height === 'number' ? this._height : this.image ? this.image.height : this.parent ? this.root.height : 0;
  }

  set height(h) {
    this._height = h;
  }

  /**
   * @type {number}
   */
  get minS() {
    let x = this.x;
    let texture = this;

    while ((texture = texture.parent) != null) {
      x += texture.x;
    }

    return x / this.root.image.width;
  }

  /**
   * @type {number}
   */
  get minT() {
    let y = this.y;
    let texture = this;

    while ((texture = texture.parent) != null) {
      y += texture.y;
    }

    return y / this.root.image.height;
  }

  /**
   * @type {number}
   */
  get maxS() {
    let x = this.x + this.width;
    let texture = this;

    while ((texture = texture.parent) != null) {
      x += texture.x;
    }

    return x / this.root.image.width;
  }

  /**
   * @type {number}
   */
  get maxT() {
    let y = this.y + this.height;
    let texture = this;

    while ((texture = texture.parent) != null) {
      y += texture.y;
    }

    return y / this.root.image.height;
  }

  /**
    * Loads an image from url and returns a texture.
    * @param {string} url
    * @param {object} [textureHints]
    * @returns {Promise<Texture>}
    */
  static load(url, textureHints) {
    return new _power_of_2_image2.default(url).complete.then(p2img => new Texture(p2img, undefined, undefined, 0, 0, textureHints));
  }
}
exports.default = Texture;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

/**
 * Group of shader variables.
 */
class ShaderVariableGroup {
  /**
  * @param {Array<ShaderVariable|ShaderVariableAlias>} shaderVars
   */
  constructor(shaderVars) {
    this.shaderVars = shaderVars;
  }

  pushVar(shaderContext) {
    this.shaderVars.forEach(shaderContext.pushVar.bind(shaderContext));
  }

  popVar(shaderContext) {
    this.shaderVars.forEach(shaderContext.popVar.bind(shaderContext));
  }
}
exports.default = ShaderVariableGroup;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* eslint-env browser */
const reNumber = /^[-+]?(\d+\.|\.)?\d+(e\d+|e[-+]\d+)?$/;
const reUrl = /^url\(\s*([^)]+)\)$/;
const reVec2 = /^vec2\(\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*\)$/;
const reVec3 = /^vec3\(\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*\)$/;
const reVec4 = /^vec4\(\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*,\s*([-+\d.e]+)\s*\)$/;
const reFunc = /^\s*[a-zA-Z]+\(\s*[^)]+\)\s*$/;

// parseValue(str) expects a trimmed string!
//
// special transform rules:
//
//   (string)   => (type)
//   ---------------------
//   '...'      => string: ...
//   "..."      => string: ...
//   123        => number
//   123.456    => number
//   null       => object: null
//   undefined  => undefined
//   true       => boolean: true
//   false      => boolean: false
//   {...}      => JSON.parse(...)
//   [...]      => JSON.parse(...)
//   url(...)   => new URL(...)
//   vec2(<number>, <number>) => new Float32Array([number, number])
//   vec3(<number>, <number>, <number>) => new Float32Array([number, number, number])
//   vec4(<number>, <number>, <number>, <number>) => new Float32Array([...])
//
function parseValue(value) {
  const len = value.length;
  if (len >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.substr(1, value.length - 2);
  } else if (len >= 2 && value.startsWith('{') && value.endsWith('}')) {
    return JSON.parse(value);
  } else if (len >= 2 && value.startsWith('[') && value.endsWith(']')) {
    return JSON.parse(value);
  } else if (len >= 2 && value.startsWith('\'') && value.endsWith('\'')) {
    return value.substr(1, value.length - 2);
  } else if (len > 0 && reNumber.exec(value)) {
    return parseFloat(value);
  }

  let m = reUrl.exec(value);
  if (m) return new URL(m[1].trim());

  m = reVec2.exec(value);
  if (m) return new Float32Array(m.slice(1, 3).map(parseFloat));

  m = reVec3.exec(value);
  if (m) return new Float32Array(m.slice(1, 4).map(parseFloat));

  m = reVec4.exec(value);
  if (m) return new Float32Array(m.slice(1, 5).map(parseFloat));

  switch (value) {
    case 'null':
      return null;
    case 'undefined':
      return undefined;
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return value;
  }
}

function indexOfNextNonWhitespace(str, curIdx) {
  const len = str.length;
  let i = curIdx;
  if (i >= len) return len;
  do {
    if (str[i] === ' ' || str[i] === '\t') {
      ++i;
    } else {
      return i;
    }
  } while (i < len);
  return len;
}

function indexOfNextSeperator(str, curIdx, seperator = ';') {
  const len = str.length;
  let i = curIdx;
  let isInside = null;
  do {
    if (isInside === null) {
      switch (str[i]) {
        case seperator:
          return i;
        case '\'':
          isInside = '\'';
          ++i;
          break;
        case '"':
          isInside = '"';
          ++i;
          break;
        case '(':
          isInside = ')';
          ++i;
          break;
        case '{':
          isInside = '}';
          ++i;
          break;
        case '\\':
          i += 2;
          break;
        default:
          ++i;
      }
    } else {
      if (str[i] === isInside) {
        isInside = null;
        ++i;
      } else if (str[i] === '\\') {
        i += 2;
      } else {
        ++i;
      }
    }
  } while (i < len);
  return len;
}

function splitIntoPropTokens(str) {
  if (typeof str !== 'string' || !str) return;

  const propTokens = [];
  const len = str.length;

  let i = indexOfNextNonWhitespace(str, 0);
  do {
    const to = indexOfNextSeperator(str, i, ';');
    if (to > i) {
      propTokens.push(str.slice(i, to));
    }
    i = indexOfNextNonWhitespace(str, to + 1);
  } while (i < len);

  return propTokens;
}

function splitIntoProps(str) {
  const tokens = splitIntoPropTokens(str);
  if (!tokens) return;
  return tokens.map(tok => {
    if (reFunc.exec(tok)) {
      return { value: tok.trim() };
    }
    const colon = tok.indexOf(':');
    if (colon === -1) {
      return { value: tok.trim() };
    }
    const key = tok.slice(0, colon).trim();
    const value = tok.substr(colon + 1).trim();
    return {
      key,
      value
    };
  }).filter(prop => !(prop.key === '' && prop.value === ''));
}

function parseCssStyledProperties(data) {
  if (typeof data !== 'string') return data;

  // => json
  const str = data.trim();
  if (str.startsWith('{') && str.endsWith('}')) {
    return JSON.parse(str);
  }

  const props = splitIntoProps(str);

  // => undefined
  if (!props || props.length === 0) return;

  if ('key' in props[0]) {
    // => properties
    const map = {};
    props.forEach(({ key, value }) => {
      map[key] = parseValue(value);
    });
    return map;
  } else {
    // => array of values OR single value
    const values = props.map(({ value }) => parseValue(value));
    return values.length === 1 ? values[0] : values;
  }
}

exports.default = parseCssStyledProperties;
exports.splitIntoPropTokens = splitIntoPropTokens;
exports.splitIntoProps = splitIntoProps;
exports.indexOfNextNonWhitespace = indexOfNextNonWhitespace;
exports.indexOfNextSeperator = indexOfNextSeperator;
exports.parseValue = parseValue;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(108);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(109);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(21),
    isObjectLike = __webpack_require__(22);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

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
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8),
    getRawTag = __webpack_require__(111),
    objectToString = __webpack_require__(112);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

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
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(145),
    getValue = __webpack_require__(150);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

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
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(20);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineCustomElements = __webpack_require__(47);

var _defineCustomElements2 = _interopRequireDefault(_defineCustomElements);

var _sample = __webpack_require__(31);

var _sample2 = _interopRequireDefault(_sample);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (customElements.get(_constants.DOM_ELEM_CANVAS)) {
  console.log('custom elements for <blitpunk> aleady defined!');
} else {
  console.log('defining custom elements for <blitpunk>');
  (0, _defineCustomElements2.default)();
} /* global customElements */


const publicApi = {
  utils: {
    sample: _sample2.default
  }
};

publicApi.whenReady = customElements.whenDefined(_constants.DOM_ELEM_CANVAS).then(() => publicApi);

exports.default = publicApi;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _generate_uuid = __webpack_require__(3);

var _generate_uuid2 = _interopRequireDefault(_generate_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShaderSource {
  /**
   * @param {string} type - `VERTEX_SHADER` or `FRAGMENT_SHADER`
   * @param {HTMLElement|string} source
   */
  constructor(type, source) {
    /**
     * @type {string}
     */
    this.id = (0, _generate_uuid2.default)();

    this.type = type;

    /**
     * @type {string}
     */
    this.source = source instanceof HTMLElement ? source.textContent : source;
  }
}

exports.default = ShaderSource; /* global HTMLElement */

ShaderSource.VERTEX_SHADER = 'VERTEX_SHADER';
ShaderSource.FRAGMENT_SHADER = 'FRAGMENT_SHADER';

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _math_helpers = __webpack_require__(74);

/**
 * Represents a `<img>` or `<canvas>` element which sizes (width and height) are
 * always power of 2.
 */
class PowerOf2Image {
  /**
   * If image dimension is NOT power of 2 then create a new `<canvas>`
   * (with power of 2 dimension) and copy the original image content onto it.
   * Since fetching imge data from server is a *async* operation the `imgEl` property
   * can be `null` right after object construction and will be set later after
   * image is loaded (and possible converted).
   *
   * @param {string|HTMLImageElement|HTMLCanvasElement} from - url or html *image* element
   */
  constructor(from) {
    let imgEl;
    if (typeof from === 'string') {
      imgEl = new window.Image();
      imgEl.src = from;
    } else {
      imgEl = from;
    }
    if (imgEl.complete === false || imgEl.width === 0 && imgEl.height === 0) {
      /**
       * @type {HTMLImageElement|HTMLCanvasElement}
       */
      this.imgEl = null;
      /**
       * @type {Promise<PowerOf2Image>}
       */
      this.complete = new Promise(resolve => {
        const origOnLoad = imgEl.onload;
        imgEl.onload = () => {
          if (origOnLoad) origOnLoad.call(imgEl);
          setPowerOf2ImgEl(this, imgEl);
          resolve(this);
        };
      });
    } else {
      setPowerOf2ImgEl(this, imgEl);
      /**
       * @type {Promise<PowerOf2Image>}
       */
      this.complete = Promise.resolve(this);
    }
  }

  /**
   * A boolean that is `true` if the image has loaded and possible converted.
   * @type {boolean}
   */
  get isComplete() {
    return this.imgEl != null;
  }

  /**
   * Returns image width or `0` if image loading is not finished.
   * @type {number}
   */
  get width() {
    return this.imgEl && this.imgEl.width || 0;
  }

  /**
   * Returns image height or `0` if image loading is not finished.
   * @type {number}
   */
  get height() {
    return this.imgEl && this.imgEl.height || 0;
  }
}

exports.default = PowerOf2Image;
function setPowerOf2ImgEl(p2img, imgEl) {
  p2img.imgEl = (0, _math_helpers.isPowerOf2)(imgEl.width) && (0, _math_helpers.isPowerOf2)(imgEl.height) ? imgEl : convertToPowerOf2(imgEl);
  p2img.origWidth = imgEl.width;
  p2img.origHeight = imgEl.height;
}

function convertToPowerOf2(image) {
  const w = (0, _math_helpers.findNextPowerOf2)(image.width);
  const h = (0, _math_helpers.findNextPowerOf2)(image.height);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.getContext('2d').drawImage(image, 0, 0);

  return canvas;
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _texture = __webpack_require__(15);

var _texture2 = _interopRequireDefault(_texture);

var _texture_atlas_spec = __webpack_require__(76);

var _texture_atlas_spec2 = _interopRequireDefault(_texture_atlas_spec);

var _sample = __webpack_require__(31);

var _sample2 = _interopRequireDefault(_sample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * @example
  * TextureAtlas.load('nobinger.json').then(atlas => {
  *   const blau = atlas.getFrame('nobinger-blau.png')
  *   blau.width   # => 55
  *   blau.height  # => 61
  * })
  */
class TextureAtlas {
  /**
   * @param {Texture} rootTexture
   * @param {TextureAtlasSpec} [spec=null]
   */
  constructor(rootTexture, spec = null) {
    /**
     * @type {Texture}
     */
    this.rootTexture = rootTexture;
    /**
     * @type {TextureAtlasSpec}
     */
    this.spec = spec;
    /**
     * @type {Map<string,Texture>}
     */
    this.frames = new Map();
  }

  /**
   * @param {string} name
   * @param {number} width
   * @param {number} height
   * @param {number} x
   * @param {number} y
   */
  addFrame(name, width, height, x, y) {
    this.frames.set(name, new _texture2.default(this.rootTexture, width, height, x, y));
  }

  /**
   * @param {string} name
   * @returns {Texture}
   */
  getFrame(name) {
    return this.frames.get(name);
  }

  /**
   * @returns {Texture}
   */
  getRandomFrame() {
    return (0, _sample2.default)(Array.from(this.frames.values()));
  }

  /**
   * @returns {string}
   */
  getRandomFrameName() {
    return (0, _sample2.default)(this.frameNames());
  }

  /**
   * @returns {Array<string>}
   */
  frameNames() {
    return Array.from(this.frames.keys());
  }

  /**
   * Loads a TextureAtlas.
   * @param {string} url - should point to the *texture atlas json spec*
   * @param {object} [fetchOptions=undefined] - options for the `fetch()` call
   * @param {string|function|PowerOf2Image|HTMLImageElement|HTMLCanvasElement} [image=null] - per default the image will be loaded from `meta.image` url from the *texture atlas spec*
   * @param {object} [textureHints=undefined] - texture hints
   * @returns {Promise<TextureAtlas>}
   */
  static load(url, fetchOptions = null, image = null, textureHints = undefined) {
    return _texture_atlas_spec2.default.load(url, fetchOptions || {}).then(atlasSpec => atlasSpec.createTextureAtlas(image || atlasSpec.imageUrl, textureHints));
  }
}
exports.default = TextureAtlas;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = sample;
function sample(arr) {
  return arr[Math.random() * arr.length | 0];
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shader_variable = __webpack_require__(7);

var _shader_variable2 = _interopRequireDefault(_shader_variable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Shader texture 2d variable.
 */
class ShaderTexture2dVariable extends _shader_variable2.default {
  /**
   * @param {string} name
   * @param {number|Object} value
   */
  constructor(name, value) {
    super(name, _shader_variable2.default.TYPE.TEXTURE_2D, value);
    this.texture = null;
  }

  /**
   * Sync texture to gpu and update `.value` to the gl texture unit.
   *
   * @param {WebGlRenderer} renderer
   */
  syncTextureAndValue(renderer) {
    if (this.texture != null) {
      const glTex = renderer.syncTexture(this.texture);
      this.value = glTex.bind();
    }
  }
}
exports.default = ShaderTexture2dVariable;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
class WebGlBuffer {
  constructor(glx, target = WebGlBuffer.ARRAY_BUFFER, usage = WebGlBuffer.STATIC_DRAW) {
    this.glx = glx;

    const { gl } = glx;
    this.target = gl[target];
    this.usage = gl[usage];

    this.glBuffer = gl.createBuffer();
  }

  bindBuffer() {
    this.glx.bindBuffer(this.target, this.glBuffer);
  }

  /**
   * Upload array buffer content to gpu via `g.bufferData(..)`.
   */
  bufferData(typedArray) {
    this.bindBuffer();
    this.glx.gl.bufferData(this.target, typedArray, this.usage);
  }
}

exports.default = WebGlBuffer;
WebGlBuffer.ARRAY_BUFFER = 'ARRAY_BUFFER';
WebGlBuffer.ELEMENT_ARRAY_BUFFER = 'ELEMENT_ARRAY_BUFFER';

WebGlBuffer.STATIC_DRAW = 'STATIC_DRAW';
WebGlBuffer.DYNAMIC_DRAW = 'DYNAMIC_DRAW';

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if (typeof module !== "undefined" && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {return tinycolor;}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
// Browser: Expose to window
else {
    window.tinycolor = tinycolor;
}

})(Math);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["fromMat4"] = fromMat4;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["transpose"] = transpose;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["adjoint"] = adjoint;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["fromTranslation"] = fromTranslation;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["fromMat2d"] = fromMat2d;
/* harmony export (immutable) */ __webpack_exports__["fromQuat"] = fromQuat;
/* harmony export (immutable) */ __webpack_exports__["normalFromMat4"] = normalFromMat4;
/* harmony export (immutable) */ __webpack_exports__["projection"] = projection;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */



/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](9);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1], a02 = a[2], a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function invert(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  let b01 = a22 * a11 - a12 * a21;
  let b11 = -a22 * a10 + a12 * a20;
  let b21 = a21 * a10 - a11 * a20;

  // Calculate the determinant
  let det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function adjoint(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  out[0] = (a11 * a22 - a12 * a21);
  out[1] = (a02 * a21 - a01 * a22);
  out[2] = (a01 * a12 - a02 * a11);
  out[3] = (a12 * a20 - a10 * a22);
  out[4] = (a00 * a22 - a02 * a20);
  out[5] = (a02 * a10 - a00 * a12);
  out[6] = (a10 * a21 - a11 * a20);
  out[7] = (a01 * a20 - a00 * a21);
  out[8] = (a00 * a11 - a01 * a10);
  return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function multiply(out, a, b) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  let b00 = b[0], b01 = b[1], b02 = b[2];
  let b10 = b[3], b11 = b[4], b12 = b[5];
  let b20 = b[6], b21 = b[7], b22 = b[8];

  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;

  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;

  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function translate(out, a, v) {
  let a00 = a[0], a01 = a[1], a02 = a[2],
    a10 = a[3], a11 = a[4], a12 = a[5],
    a20 = a[6], a21 = a[7], a22 = a[8],
    x = v[0], y = v[1];

  out[0] = a00;
  out[1] = a01;
  out[2] = a02;

  out[3] = a10;
  out[4] = a11;
  out[5] = a12;

  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function rotate(out, a, rad) {
  let a00 = a[0], a01 = a[1], a02 = a[2],
    a10 = a[3], a11 = a[4], a12 = a[5],
    a20 = a[6], a21 = a[7], a22 = a[8],

    s = Math.sin(rad),
    c = Math.cos(rad);

  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;

  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;

  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function scale(out, a, v) {
  let x = v[0], y = v[1];

  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];

  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];

  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function fromRotation(out, rad) {
  let s = Math.sin(rad), c = Math.cos(rad);

  out[0] = c;
  out[1] = s;
  out[2] = 0;

  out[3] = -s;
  out[4] = c;
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;

  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;

  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;

  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;

  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
function fromQuat(out, q) {
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;

  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;

  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;

  return out;
}

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
function normalFromMat4(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

  return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
}

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
          a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
          a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}



/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  out[4] = a[4] + (b[4] * scale);
  out[5] = a[5] + (b[5] * scale);
  out[6] = a[6] + (b[6] * scale);
  out[7] = a[7] + (b[7] * scale);
  out[8] = a[8] + (b[8] * scale);
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] &&
         a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
         a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
          Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
          Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
          Math.abs(a6 - b6) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
          Math.abs(a7 - b7) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
          Math.abs(a8 - b8) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
}

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link mat3.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["length"] = length;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["divide"] = divide;
/* harmony export (immutable) */ __webpack_exports__["ceil"] = ceil;
/* harmony export (immutable) */ __webpack_exports__["floor"] = floor;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["scaleAndAdd"] = scaleAndAdd;
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
/* harmony export (immutable) */ __webpack_exports__["squaredDistance"] = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["inverse"] = inverse;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;
/* harmony export (immutable) */ __webpack_exports__["cross"] = cross;
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["hermite"] = hermite;
/* harmony export (immutable) */ __webpack_exports__["bezier"] = bezier;
/* harmony export (immutable) */ __webpack_exports__["random"] = random;
/* harmony export (immutable) */ __webpack_exports__["transformMat4"] = transformMat4;
/* harmony export (immutable) */ __webpack_exports__["transformMat3"] = transformMat3;
/* harmony export (immutable) */ __webpack_exports__["transformQuat"] = transformQuat;
/* harmony export (immutable) */ __webpack_exports__["rotateX"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["rotateY"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["rotateZ"] = rotateZ;
/* harmony export (immutable) */ __webpack_exports__["angle"] = angle;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */



/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
  var out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return Math.sqrt(x*x + y*y + z*z);
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return Math.sqrt(x*x + y*y + z*z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  return x*x + y*y + z*z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return x*x + y*y + z*z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let len = x*x + y*y + z*z;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  let ax = a[0], ay = a[1], az = a[2];
  let bx = b[0], by = b[1], bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function hermite(out, a, b, c, d, t) {
  let factorTimes2 = t * t;
  let factor1 = factorTimes2 * (2 * t - 3) + 1;
  let factor2 = factorTimes2 * (t - 2) + t;
  let factor3 = factorTimes2 * (t - 1);
  let factor4 = factorTimes2 * (3 - 2 * t);

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function bezier(out, a, b, c, d, t) {
  let inverseFactor = 1 - t;
  let inverseFactorTimesTwo = inverseFactor * inverseFactor;
  let factorTimes2 = t * t;
  let factor1 = inverseFactorTimesTwo * inverseFactor;
  let factor2 = 3 * t * inverseFactorTimesTwo;
  let factor3 = 3 * factorTimes2 * inverseFactor;
  let factor4 = factorTimes2 * t;

  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
  scale = scale || 1.0;

  let r = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]() * 2.0 * Math.PI;
  let z = (__WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]() * 2.0) - 1.0;
  let zScale = Math.sqrt(1.0-z*z) * scale;

  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
  let x = a[0], y = a[1], z = a[2];
  let w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
  let x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
  // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

  let x = a[0], y = a[1], z = a[2];
  let qx = q[0], qy = q[1], qz = q[2], qw = q[3];

  // calculate quat * vec
  let ix = qw * x + qy * z - qz * y;
  let iy = qw * y + qz * x - qx * z;
  let iz = qw * z + qx * y - qy * x;
  let iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  return out;
}

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c){
  let p = [], r=[];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0];
  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c){
  let p = [], r=[];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  r[1] = p[1];
  r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c){
  let p = [], r=[];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];

  //perform rotation
  r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  r[2] = p[2];

  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];

  return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
  let tempA = fromValues(a[0], a[1], a[2]);
  let tempB = fromValues(b[0], b[1], b[2]);

  normalize(tempA, tempA);
  normalize(tempB, tempB);

  let cosine = dot(tempA, tempB);

  if(cosine > 1.0) {
    return 0;
  }
  else if(cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2];
  let b0 = b[0], b1 = b[1], b2 = b[2];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
}

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;


/**
 * Alias for {@link vec3.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link vec3.divide}
 * @function
 */
const div = divide;
/* harmony export (immutable) */ __webpack_exports__["div"] = div;


/**
 * Alias for {@link vec3.distance}
 * @function
 */
const dist = distance;
/* harmony export (immutable) */ __webpack_exports__["dist"] = dist;


/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
const sqrDist = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["sqrDist"] = sqrDist;


/**
 * Alias for {@link vec3.length}
 * @function
 */
const len = length;
/* harmony export (immutable) */ __webpack_exports__["len"] = len;


/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
const sqrLen = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["sqrLen"] = sqrLen;


/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach = (function() {
  let vec = create();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 3;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
    }

    return a;
  };
})();
/* harmony export (immutable) */ __webpack_exports__["forEach"] = forEach;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["divide"] = divide;
/* harmony export (immutable) */ __webpack_exports__["ceil"] = ceil;
/* harmony export (immutable) */ __webpack_exports__["floor"] = floor;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["scaleAndAdd"] = scaleAndAdd;
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
/* harmony export (immutable) */ __webpack_exports__["squaredDistance"] = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["length"] = length;
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["inverse"] = inverse;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["random"] = random;
/* harmony export (immutable) */ __webpack_exports__["transformMat4"] = transformMat4;
/* harmony export (immutable) */ __webpack_exports__["transformQuat"] = transformQuat;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */



/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
function fromValues(x, y, z, w) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  return out;
}

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  let w = b[3] - a[3];
  return Math.sqrt(x*x + y*y + z*z + w*w);
}

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  let x = b[0] - a[0];
  let y = b[1] - a[1];
  let z = b[2] - a[2];
  let w = b[3] - a[3];
  return x*x + y*y + z*z + w*w;
}

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  return Math.sqrt(x*x + y*y + z*z + w*w);
}

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  return x*x + y*y + z*z + w*w;
}

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  let len = x*x + y*y + z*z + w*w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
function lerp(out, a, b, t) {
  let ax = a[0];
  let ay = a[1];
  let az = a[2];
  let aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
function random(out, vectorScale) {
  vectorScale = vectorScale || 1.0;

  //TODO: This is a pretty awful way of doing this. Find something better.
  out[0] = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]();
  out[1] = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]();
  out[2] = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]();
  out[3] = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]();
  normalize(out, out);
  scale(out, out, vectorScale);
  return out;
}

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
function transformMat4(out, a, m) {
  let x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
function transformQuat(out, a, q) {
  let x = a[0], y = a[1], z = a[2];
  let qx = q[0], qy = q[1], qz = q[2], qw = q[3];

  // calculate quat * vec
  let ix = qw * x + qy * z - qz * y;
  let iy = qw * y + qz * x - qx * z;
  let iz = qw * z + qx * y - qy * x;
  let iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
}

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;


/**
 * Alias for {@link vec4.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link vec4.divide}
 * @function
 */
const div = divide;
/* harmony export (immutable) */ __webpack_exports__["div"] = div;


/**
 * Alias for {@link vec4.distance}
 * @function
 */
const dist = distance;
/* harmony export (immutable) */ __webpack_exports__["dist"] = dist;


/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
const sqrDist = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["sqrDist"] = sqrDist;


/**
 * Alias for {@link vec4.length}
 * @function
 */
const len = length;
/* harmony export (immutable) */ __webpack_exports__["len"] = len;


/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
const sqrLen = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["sqrLen"] = sqrLen;


/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach = (function() {
  let vec = create();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 4;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
    }

    return a;
  };
})();
/* harmony export (immutable) */ __webpack_exports__["forEach"] = forEach;



/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (el, name, defaultValue) {
  if (!el.hasAttribute(name)) return defaultValue;
  switch (el.getAttribute(name).toLowerCase()) {
    case 'true':
    case 'yes':
    case 'on':
    case '':
    case name:
      return true;
  }
  return false;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = findParentElementByName;
const EXIT_NODES = ['BODY', 'HTML'];

function findParentElementByName(node, ...names) {
  const parent = node.parentElement;
  if (!parent || parent.nodeType !== 1) return;
  const { nodeName } = parent;
  if (names.includes(nodeName)) return parent;
  if (EXIT_NODES.includes(nodeName)) return;
  return parent;
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (el) {
  el.blitpunkCanvas = (0, _findBlitpunkCanvasElement2.default)(el);
  el.blitpunk = el.blitpunkCanvas.blitpunk;

  el.entityManager = el.blitpunk.entityManager;
  el.entity = el.entityManager.createEntity();
  el.entity.on(el);

  el.parentSceneElement = (0, _findParentElementByProperty2.default)(el, 'scene');
  el.parentScene = el.parentSceneElement.scene;
  el.parentScene.children.appendChild(el.entity);
};

var _findBlitpunkCanvasElement = __webpack_require__(119);

var _findBlitpunkCanvasElement2 = _interopRequireDefault(_findBlitpunkCanvasElement);

var _findParentElementByProperty = __webpack_require__(120);

var _findParentElementByProperty2 = _interopRequireDefault(_findParentElementByProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (el) {
  el.parentScene.children.removeChild(el.entity);
  el.parentScene = null;
  el.parentSceneElement = null;
  el.entity.off(el);
  el.entityManager.destroyEntity(el.entity);
  el.entity = null;
  el.blitpunk = null;
  el.blitpunkCanvas = null;
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(23);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(173),
    isObjectLike = __webpack_require__(22);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(26);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = defineCustomElements;

var _CanvasElement = __webpack_require__(48);

var _CanvasElement2 = _interopRequireDefault(_CanvasElement);

var _SceneElement = __webpack_require__(117);

var _SceneElement2 = _interopRequireDefault(_SceneElement);

var _TextureAtlasElement = __webpack_require__(118);

var _TextureAtlasElement2 = _interopRequireDefault(_TextureAtlasElement);

var _SpriteGroupElement = __webpack_require__(122);

var _SpriteGroupElement2 = _interopRequireDefault(_SpriteGroupElement);

var _constants = __webpack_require__(0);

__webpack_require__(191);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Define all `<blitpunk-*>` custom html elements.
 * Should be called once at startup.
 */
function defineCustomElements() {
  // define element in the CustomElementRegistry
  window.customElements.define(_constants.DOM_ELEM_CANVAS, _CanvasElement2.default);
  window.customElements.define(_constants.DOM_ELEM_SCENE, _SceneElement2.default);
  window.customElements.define(_constants.DOM_ELEM_TEXTURE_ATLAS, _TextureAtlasElement2.default);
  window.customElements.define(_constants.DOM_ELEM_SPRITE_GROUP, _SpriteGroupElement2.default);
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _app = __webpack_require__(49);

var _app2 = _interopRequireDefault(_app);

var _blitpunk = __webpack_require__(26);

var _blitpunk2 = _interopRequireDefault(_blitpunk);

var _readBooleanAttribute = __webpack_require__(38);

var _readBooleanAttribute2 = _interopRequireDefault(_readBooleanAttribute);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global SystemJS HTMLElement */
const eventize = __webpack_require__(2);

const createContextAttributes = el => ({
  alpha: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_ALPHA, false),
  depth: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_DEPTH, true), // ie 11 has no support for false
  stencil: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_STENCIL, false),
  antialias: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_ANTIALIAS, false),
  premultipliedAlpha: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_PREMULTIPLIED_ALPHA, false),
  preserveDrawingBuffer: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_PRESERVE_DRAW, false)
});

/**
 * The **custom HTML `<blitpunk-canvas></blitpunk-canvas>` element** represents the *webgl* canvas,
 * which acts also as the main API entrypoint for every *blitpunk* application.
 *
 * The size of the html element should be defined by css styles (eg. `display: block; width: 100%; height: 100%`) &mdash; without
 * any styles (or `display: inline`) the canvas will mimic the size of the parent element.
 *
 * You can customize the wegl context by specifying html attributes:
 * - `alpha`
 * - `depth`
 * - `stencil`
 * - `antialias`
 * - `premultiplied-alpha`
 * - `preserve-drawing-buffer`
 *
 * _ATTENTION:_ changing these html attributes has no effect *after* the webgl context is initialized!
 *
 * @example
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <title>fullscreen blitpunk canvas example</title>
 *   <meta name="viewport" content="width=device-width,initial-scale=1.0">
 *   <style>
 *     html, body {
 *       margin: 0;
 *       overflow: hidden;
 *       width: 100%;
 *       height: 100%;
 *     }
 *   </style>
 * </head>
 * <body>
 *   <blitpunk-canvas alpha antialias>
 *     ...
 *   </blitpunk-canvas>
 *   ...
 */
class CanvasElement extends HTMLElement {
  /** @ignore */
  constructor(_) {
    const self = super(_);
    eventize(self);
    self.blitpunk = new _app2.default();
    self.blitpunk.entity.on(self);
    return self;
  }

  get blitpunkNodeName() {
    return _constants.NODE_NAME_CANVAS;
  }

  get canvas() {
    return this.blitpunk.canvas;
  }
  get width() {
    return this.blitpunk.width;
  }
  get height() {
    return this.blitpunk.height;
  }

  get glx() {
    return this.blitpunk.glx;
  }
  get renderer() {
    return this.blitpunk.renderer;
  }
  get time() {
    return this.blitpunk.time;
  }
  get startTime() {
    return this.blitpunk.startTime;
  }
  get frameNo() {
    return this.blitpunk.frameNo;
  }

  get componentRegistry() {
    return this.blitpunk.componentRegistry;
  }
  get entityManager() {
    return this.blitpunk.entityManager;
  }
  get resourceLibrary() {
    return this.blitpunk.resourceLibrary;
  }
  get textureLibrary() {
    return this.blitpunk.textureLibrary;
  }

  get scene() {
    return this.blitpunk.entity;
  }

  /** @private */
  static get observedAttributes() {
    return [_constants.ATTR_BLEND_MODE, _constants.ATTR_CLEAR_COLOR, _constants.ATTR_PROJECTION];
  }

  /** @private */
  onKeydown(event) {
    if (event.ctrlKey && event.key === 'd') {
      console.group('<blitpunk/>', 'frameNo', this.frameNo);
      console.log(this);
      console.log(this.blitpunk);
      this.blitpunk.entity.emit('debug', this);
      this.renderer.emit('debug', this.renderer);
      console.groupEnd();
    }
  }

  set clearColor(color) {
    this.blitpunk.clearColor = color;
  }

  get clearColor() {
    const col = this.blitpunk.clearColor;
    if (col) {
      return col.getAlpha() === 1 ? col.toHexString() : col.toRgbString();
    }
  }

  /** @private */
  connectedCallback() {
    this.blitpunk.contextAttributes = Object.freeze(createContextAttributes(this));

    this.onKeydown = this.onKeydown.bind(this);
    document.body.addEventListener('keydown', this.onKeydown);

    this.blitpunk.start(this);

    // TODO check for onInit= attribute?
    const src = this.getAttribute(_constants.ATTR_MODULE_SRC);
    if (src) {
      SystemJS.import(src).then(appModule => {
        appModule.default(this, _blitpunk2.default);
        // TODO configure blitpunk dynamic package
        // TODO check for .init() method?
      });
    }
  }

  /** @private */
  disconnectedCallback() {
    this.blitpunk.destroy();

    document.body.removeEventListener('keydown', this.onKeydown);
  }

  /** @private */
  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case _constants.ATTR_CLEAR_COLOR:
        this.clearColor = newValue;
        break;
      case _constants.ATTR_BLEND_MODE:
      case _constants.ATTR_PROJECTION:
        this.blitpunk.componentRegistry.createOrUpdateComponent(this.blitpunk.entity, attr, newValue);
    }
  }
}
exports.default = CanvasElement;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component_registry = __webpack_require__(50);

var _component_registry2 = _interopRequireDefault(_component_registry);

var _entity_manager = __webpack_require__(51);

var _entity_manager2 = _interopRequireDefault(_entity_manager);

var _resource_library = __webpack_require__(56);

var _resource_library2 = _interopRequireDefault(_resource_library);

var _texture_library = __webpack_require__(73);

var _texture_library2 = _interopRequireDefault(_texture_library);

var _web_gl_context = __webpack_require__(77);

var _web_gl_context2 = _interopRequireDefault(_web_gl_context);

var _web_gl_renderer = __webpack_require__(86);

var _web_gl_renderer2 = _interopRequireDefault(_web_gl_renderer);

var _registerDefaultComponents = __webpack_require__(88);

var _registerDefaultComponents2 = _interopRequireDefault(_registerDefaultComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventize = __webpack_require__(2);
const tinycolor = __webpack_require__(34);

const now = () => window.performance.now() / 1000;

const defaultOption = (options, key, defaultValueFn) => {
  if (options && key in options) {
    return options[key];
  }
  return typeof defaultValueFn === 'function' ? defaultValueFn() : defaultValueFn;
};

class App {
  constructor(options) {
    eventize(this);

    const getOption = defaultOption.bind(null, options);

    this.componentRegistry = getOption('componentRegistry', () => new _component_registry2.default());
    this.entityManager = getOption('entityManager', () => new _entity_manager2.default());
    this.resourceLibrary = getOption('resourceLibrary', () => new _resource_library2.default());
    this.textureLibrary = getOption('textureLibrary', () => new _texture_library2.default());

    /**
     * @type {CanvasHTMLElement}
     */
    this.canvas = getOption('canvas', () => document.createElement('canvas'));

    /**
     * The initial attributes used to create the webgl context
     * @type {Object}
     * @see https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/getContext
     */
    this.contextAttributes = {
      alpha: getOption('alpha', false),
      depth: getOption('depth', false),
      stencil: getOption('stencil', false),
      antialias: getOption('antialias', false),
      premultipliedAlpha: getOption('premultipliedAlpha', false),
      preserveDrawingBuffer: getOption('preserveDrawingBuffer', false)

      /**
       * Seconds since App startup
       * @type {number}
       */
    };this.time = getOption('time', 0);

    /** @private */
    this.lastFrameTime = 0;

    /**
     * Seconds since last frame
     * @type {number}
     */
    this.timeFrameOffset = 0;

    /**
     * Frame counter since application startup
     * @type {number}
     */
    this.frameNo = getOption('frameNo', 0);

    this.clearColor = getOption('clearColor');

    this.createGlContext = getOption('createGlContext', () => () => createGlContext(this.canvas, this.contextAttributes));

    (0, _registerDefaultComponents2.default)(this.componentRegistry);

    this.entity = this.entityManager.createEntity();
    this.entity.setComponent('blitpunk', this);
    this.entity.setComponent('resourceLibrary', this.resourceLibrary);
    this.entity.setComponent('textureLibrary', this.textureLibrary);
    this.componentRegistry.createComponent(this.entity, 'children');

    this.el = null;

    this.started = false;
    this.stopped = false;
    this.destroyed = false;
  }

  get clearColor() {
    return this.renderer ? this.renderer.clearColor : this._clearColor;
  }

  set clearColor(color) {
    this._clearColor = color == null ? color : tinycolor(color);
    if (this.renderer) {
      this.renderer.setClearColor(this._clearColor);
    }
  }

  get canStart() {
    return (!this.started || this.started && this.stopped) && !this.destroyed;
  }

  start(el = this) {
    if (!this.canStart) return;

    if (this.stopped) {
      this.stopped = false;
      this.resize();
      this.requestAnimate();
      return;
    }

    this.el = el;
    this.started = true;

    /**
     * @type {WebGlContext}
     */
    this.glx = new _web_gl_context2.default(this.createGlContext());

    /**
     * @type {WebGlRenderer}
     */
    this.renderer = new _web_gl_renderer2.default(this.glx);

    if (this._clearColor) {
      this.renderer.setClearColor(this._clearColor);
    }

    /**
     * Startup time in seconds.
     * @type {number}
     */
    this.startTime = now();

    this.el.appendChild(this.canvas);
    this.resize();
    this.requestAnimate();
  }

  requestAnimate() {
    this.rafSubscription = window.requestAnimationFrame(() => this.animate());
  }

  cancelAnimate() {
    window.cancelAnimationFrame(this.rafSubscription);
  }

  get canStop() {
    return this.started && !this.stopped && !this.destroyed;
  }

  stop() {
    if (!this.canStop) return;
    this.stopped = true;
    this.cancelAnimate();
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.cancelAnimate();
  }

  get canAnimate() {
    return this.started && !this.stopped && !this.destroyed;
  }

  /**
   * Start the main animation loop.
   */
  animate() {
    if (!this.canAnimate) return;
    this.renderFrame();
    this.requestAnimate();
  }

  /**
   * Render the frame.
   */
  renderFrame() {
    ++this.frameNo;
    this.time = now() - this.startTime;
    if (this.lastFrameTime) {
      this.timeFrameOffset = this.time - this.lastFrameTime;
    }
    this.lastFrameTime = this.time;
    this.resize();
    this.renderer.renderFrame(this.entity, this);
  }

  /**
   * Resize the canvas dom element to the same size as the `<blitpunk-canvas>.parentNode`
   */
  resize() {
    const style = window.getComputedStyle(this.el, null);
    const el = style.display === 'inline' ? this.el.parentNode : this.el;

    const { canvas } = this;
    const dpr = window.devicePixelRatio || 1;

    let wPx = el.clientWidth;
    let hPx = el.clientHeight;

    canvas.style.width = wPx + 'px';
    canvas.style.height = hPx + 'px';

    const w = Math.round(wPx * dpr);
    const h = Math.round(hPx * dpr);

    if (w !== canvas.width || h !== canvas.height) {
      canvas.width = w;
      canvas.height = h;
    }

    if (w !== this.width || h !== this.height) {
      /**
       * Canvas size in _device_ pixels.
       * @type {number}
       */
      this.width = w;
      /**
       * Canvas size in _device_ pixels.
       * @type {number}
       */
      this.height = h;

      this.glx.gl.viewport(0, 0, w, h); // TODO move this into WebGlRenderer
    }
  }
}

/** @private */
function createGlContext(canvas, ctxAttrs) {
  let gl;

  try {
    gl = canvas.getContext('webgl', ctxAttrs);
  } catch (err0) {
    console.error(err0);
  }

  if (!gl) {
    try {
      gl = canvas.getContext('experimental-webgl', ctxAttrs);
    } catch (err1) {
      console.error(err1);
    }
  }

  if (!gl) {
    throw new Error('cannot create webgl1 context');
  }

  return gl;
}

exports.default = App;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
class ComponentRegistry {
  constructor() {
    this.registry = new Map();
  }

  /**
   * @param {string} name - component name
   * @param {object} componentFactory - the component factory interface
   * @param {function} componentFactory.create - create a new component instance
   * @param {function} componentFactory.update - update a component
   */
  registerComponent(name, componentFactory) {
    this.registry.set(name, componentFactory);
    return this;
  }

  createComponent(entity, name, data) {
    const factory = this.registry.get(name);
    const component = factory.create(entity, data);
    entity.setComponent(name, component);
    return this;
  }

  updateComponent(entity, name, data) {
    const component = entity[name];
    const factory = this.registry.get(name);
    factory.update(component, data);
    return this;
  }

  createOrUpdateComponent(entity, name, data) {
    if (entity[name] != null) {
      this.updateComponent(entity, name, data);
    } else {
      this.createComponent(entity, name, data);
    }
    return this;
  }
}
exports.default = ComponentRegistry;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _entity = __webpack_require__(52);

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The entity manager holds references to all entities.
 */
class EntityManager {
  constructor() {
    this.entities = new Map();
  }

  createEntity() {
    const entity = new _entity2.default();
    this.entities.set(entity.id, entity);
    return entity;
  }

  getEntity(id) {
    return this.entities.get(id);
  }

  destroyEntity(id) {
    const entity = this.entities.get(id);
    if (entity) {
      entity.destroy();
      this.entities.delete(id);
      return true;
    }
    return false;
  }
}
exports.default = EntityManager;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _generate_uuid = __webpack_require__(3);

var _generate_uuid2 = _interopRequireDefault(_generate_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventize = __webpack_require__(2);

const destroyAllComponents = entity => {
  for (const name of entity.components.keys()) {
    entity.destroyComponent(name);
  }
};

/**
 * An Entity.
 */
class Entity {
  constructor() {
    this.components = new Map();

    /**
     * @type {string}
     */
    this.id = (0, _generate_uuid2.default)();

    eventize(this);
  }

  hasComponent(name) {
    return this.components.has(name);
  }

  setComponent(name, component) {
    if (this[name]) {
      throw new Error(`Component name "${name}" is already assigned!`);
    }
    this.components.set(name, component);
    this[name] = component;
    if (component.connectedEntity) {
      component.connectedEntity(this);
    }
    return this;
  }

  destroyComponent(name) {
    if (this.components.delete(name)) {
      const component = this[name];
      delete this[name];
      if (component.disconnectedEntity) {
        component.disconnectedEntity(this);
      }
    }
    return this;
  }

  destroy() {
    this.emit('destroy', this);
    destroyAllComponents(this);
  }
}
exports.default = Entity;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(54);
var bytesToUuid = __webpack_require__(55);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 55 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _v_o_descriptor = __webpack_require__(57);

var _v_o_descriptor2 = _interopRequireDefault(_v_o_descriptor);

var _shader_source = __webpack_require__(28);

var _shader_source2 = _interopRequireDefault(_shader_source);

var _sprites = __webpack_require__(64);

var _sprites2 = _interopRequireDefault(_sprites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceLibrary {
  constructor() {
    this.descriptors = new Map();
    this.vertexShaders = new Map();
    this.fragmentShaders = new Map();

    (0, _sprites2.default)(this);
  }

  /**
   * @param {string} name
   * @param {Object} description - see `VODescriptor` for more details
   */
  addDescriptor(name, description) {
    this.descriptors.set(name, new _v_o_descriptor2.default(description));
    return this;
  }

  /**
   * @param {string} name
   * @param {string|function|string[]} source - see `ShaderSource` for more details
   */
  addVertexShader(name, source) {
    this.vertexShaders.set(name, new _shader_source2.default(_shader_source2.default.VERTEX_SHADER, source));
    return this;
  }

  /**
   * @param {string} name
   * @param {string|function|string[]} source - see `ShaderSource` for more details
   */
  addFragmentShader(name, source) {
    this.fragmentShaders.set(name, new _shader_source2.default(_shader_source2.default.FRAGMENT_SHADER, source));
    return this;
  }

  /**
   * @param {string} name
   * @returns {VODescriptor}
   */
  findDescriptor(name) {
    return this.descriptors.get(name);
  }

  /**
   * @param {string} name
   * @returns {ShaderSource}
   */
  findVertexShader(name) {
    return this.vertexShaders.get(name);
  }

  /**
   * @param {string} name
   * @returns {ShaderSource}
   */
  findFragmentShader(name) {
    return this.fragmentShaders.get(name);
  }
}
exports.default = ResourceLibrary;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _v_o_helper = __webpack_require__(58);

var _v_o_array = __webpack_require__(13);

var _v_o_array2 = _interopRequireDefault(_v_o_array);

var _create_v_o_prototype = __webpack_require__(60);

var _create_v_o_prototype2 = _interopRequireDefault(_create_v_o_prototype);

var _create_typed_arrays = __webpack_require__(61);

var _create_typed_arrays2 = _interopRequireDefault(_create_typed_arrays);

var _create_attributes = __webpack_require__(62);

var _create_attributes2 = _interopRequireDefault(_create_attributes);

var _create_aliases = __webpack_require__(63);

var _create_aliases2 = _interopRequireDefault(_create_aliases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vertex object descriptor.
 *
 * @class VODescriptor
 *
 * @param {Object} options
 * @param {number} options.vertexCount - number of vertices
 * @param {Object[]} options.attributes - list of vertex attribute descriptions (see example)
 * @param {Object} [options.aliases] - *optional* list of attribute aliases
 * @param {Object} [options.proto]
 *
 * @example
 * const descriptor = new VODescriptor({
 *
 *     proto: {
 *         foo() {
 *             return this.voArray.float32Array[0];
 *         }
 *     },
 *
 *     // vertex buffer layout
 *     // --------------------
 *     //
 *     // v0: (x0)(y0)(z0)(rotate](s0)(t0)(tx)(ty)(scale)(opacity)
 *     // v1: (x1)(y1)(z1)(rotate](s1)(t1)(tx)(ty)(scale)(opacity)
 *     // v2: (x2)(y2)(z2)(rotate](s2)(t2)(tx)(ty)(scale)(opacity)
 *     // v3: (x3)(y3)(z3)(rotate](s3)(t3)(tx)(ty)(scale)(opacity)
 *     //
 *     vertexCount: 4,
 *
 *     attributes: [
 *
 *         { name: 'position',  type: 'float32', size: 3, attrNames: [ 'x', 'y', 'z' ] },
 *         { name: 'rotate',    type: 'float32', size: 1, uniform: true },
 *         { name: 'texCoords', type: 'float32', size: 2, attrNames: [ 's', 't' ] },
 *         { name: 'translate', type: 'float32', size: 2, attrNames: [ 'tx', 'ty' ], uniform: true },
 *         { name: 'scale',     type: 'float32', size: 1, uniform: true },
 *         { name: 'opacity',   type: 'float32', size: 1, uniform: true }
 *
 *     ],
 *
 *     aliases: {
 *
 *         pos2d: { size: 2, type: 'float32', offset: 0 },
 *         posZ:  { size: 1, type: 'float32', offset: 2, uniform: true },
 *         r:     { size: 1, type: 'float32', offset: 3 },
 *         uv:    'texCoords',
 *
 *     }
 *
 * });
 *
 */

class VODescriptor {
  constructor({ vertexCount, attributes, aliases, proto }) {
    this.vertexCount = parseInt(vertexCount, 10);

    (0, _create_attributes2.default)(this, attributes);
    (0, _create_aliases2.default)(this, aliases);
    (0, _create_v_o_prototype2.default)(this, proto);
    (0, _create_typed_arrays2.default)(this);

    // === winterkälte jetzt

    Object.keys(this.attr).forEach(name => Object.freeze(this.attr[name]));
    Object.freeze(this.attr);
    Object.freeze(this);
  }

  /**
   * @param {number} [size=1]
   * @param {string} [usage]
   * @returns {VOArray}
   */
  createVOArray(size = 1, usage = undefined) {
    return new _v_o_array2.default(this, size, null, usage);
  }

  /**
   * Create a new *vertex object*
   *
   * @param {VOArray} [voArray]
   * @returns {Object} the *vertex object*
   */
  createVO(voArray) {
    return (0, _v_o_helper.createVO)(Object.create(this.voPrototype), this, voArray);
  }

  /**
   * @param {string} name
   * @param {number} size - attribute item count
   * @returns {boolean}
   */
  hasAttribute(name, size) {
    const attr = this.attr[name];
    return attr && attr.size === size;
  }

  /**
   * Max number of vertex objects when a vertex buffer is used together
   * with a indexed element array to draw primitives. the reason for
   * such a limit is that webgl restricts element array indices
   * to an uin16 data type.
   * @type {number}
   */

  get maxIndexedVOPoolSize() {
    return Math.floor(65536 / this.vertexCount);
  }
}
exports.default = VODescriptor;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createVO = createVO;

/** @private */
function createVO(obj, descriptor, voArray) {
  // set VODescriptor
  //
  obj.descriptor = descriptor || (voArray ? voArray.descriptor : null);

  if (!obj.descriptor) {
    throw new Error('could not detect VODescriptor!');
  }

  // set VOArray
  //
  obj.voArray = voArray || obj.descriptor.createVOArray();

  if (obj.descriptor !== obj.voArray.descriptor && (obj.descriptor.vertexCount !== obj.voArray.descriptor.vertexCount || obj.descriptor.vertexAttrCount !== obj.voArray.descriptor.vertexAttrCount)) {
    throw new Error('Incompatible vertex object descriptors!');
  }

  return obj;
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
class Serial {
  /**
   * @param {number} [initialValue=1]
   */
  constructor(initialValue = 1) {
    this.value = initialValue;
  }

  touch() {
    ++this.value;
  }
}
exports.default = Serial;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (descriptor, proto) {
  const propertiesObject = {

    toArray: {

      value: function (attrNames) {
        const arr = [];
        const attrList = Array.isArray(attrNames) ? attrNames.map(name => descriptor.attr[name]) : descriptor.attrList;
        const len = attrList.length;
        for (let i = 0; i < descriptor.vertexCount; ++i) {
          for (let j = 0; j < len; ++j) {
            const attr = attrList[j];
            for (let k = 0; k < attr.size; ++k) {
              arr.push(attr.getValue(this, i, k));
            }
          }
        }
        return arr;
      }

    }

  };

  Object.keys(descriptor.attr).forEach(name => {
    const attr = descriptor.attr[name];

    _v_o_attr_descriptor2.default.defineProperties(attr, propertiesObject, descriptor);
  });

  descriptor.voPrototype = Object.create(typeof proto === 'object' ? proto : {}, propertiesObject);
};

var _v_o_attr_descriptor = __webpack_require__(14);

var _v_o_attr_descriptor2 = _interopRequireDefault(_v_o_attr_descriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (descriptor) {
  descriptor.typedArrays = {
    float32: false,
    int16: false,
    int32: false,
    int8: false,
    uint16: false,
    uint32: false,
    uint8: false
  };

  Object.keys(descriptor.attr).forEach(name => {
    descriptor.typedArrays[descriptor.attr[name].type] = true;
  });

  Object.freeze(descriptor.typedArrays);

  descriptor.typeList = Object.keys(descriptor.typedArrays).filter(type => descriptor.typedArrays[type]).sort();
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (descriptor, attributes) {
  descriptor.attr = {};
  descriptor.attrNames = [];

  if (Array.isArray(attributes)) {
    let offset = 0;
    let byteOffset = 0;

    for (let i = 0; i < attributes.length; ++i) {
      const attr = attributes[i];

      if (attr.size === undefined) throw new Error('vertex object attribute descriptor has no size!');

      const type = attr.type || 'float32';

      if (attr.name !== undefined) {
        descriptor.attrNames.push(attr.name);
        descriptor.attr[attr.name] = new _v_o_attr_descriptor2.default(attr.name, type, attr.size, offset, byteOffset, !!attr.uniform, attr.attrNames);
      }

      offset += attr.size;
      byteOffset += _typed_array_helpers.BYTES_PER_ELEMENT[type] * attr.size;
    }

    // bytes per vertex is always aligned to 4-bytes!
    descriptor.rightPadBytesPerVertex = byteOffset % 4 > 0 ? 4 - byteOffset % 4 : 0;
    descriptor.bytesPerVertex = byteOffset + descriptor.rightPadBytesPerVertex;
    descriptor.bytesPerVO = descriptor.bytesPerVertex * descriptor.vertexCount;
    descriptor.vertexAttrCount = offset;
  }

  descriptor.attrList = descriptor.attrNames.map(name => descriptor.attr[name]);
};

var _typed_array_helpers = __webpack_require__(6);

var _v_o_attr_descriptor = __webpack_require__(14);

var _v_o_attr_descriptor2 = _interopRequireDefault(_v_o_attr_descriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (descriptor, aliases) {
  if (typeof aliases !== 'object') return;

  Object.keys(aliases).forEach(name => {
    let attr = aliases[name];

    if (typeof attr === 'string') {
      attr = descriptor.attr[attr];

      if (attr !== undefined) {
        descriptor.attr[name] = attr;
      }
    } else {
      descriptor.attr[name] = new _v_o_attr_descriptor2.default(name, attr.type, attr.size, attr.offset, attr.byteOffset, !!attr.uniform, attr.attrNames);
    }
  });
};

var _v_o_attr_descriptor = __webpack_require__(14);

var _v_o_attr_descriptor2 = _interopRequireDefault(_v_o_attr_descriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (spriteLibrary) {
  spriteLibrary.addDescriptor('simple', simple.description).addVertexShader('simple', simple.vertexShader).addFragmentShader('simple', simple.fragmentShader);
};

var _simple = __webpack_require__(65);

var simple = _interopRequireWildcard(_simple);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.description = exports.fragmentShader = exports.vertexShader = undefined;

var _rotate = __webpack_require__(66);

var _rotate2 = _interopRequireDefault(_rotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const vertexShader = exports.vertexShader = [`

  attribute vec2 pos2d;
  attribute float posZ;
  attribute vec2 uv;
  attribute vec2 translate;
  attribute float rotate;
  attribute float scale;
  attribute float opacity;

  uniform mat4 viewMatrix;

  varying vec4 vTextureCoordScaleOpacity;

  `, (0, _rotate2.default)('rotateZ', 0.0, 0.0, 1.0), `

  void main(void)
  {
    mat4 rotationMatrix = rotateZ(rotate);
    gl_Position = viewMatrix * ((rotationMatrix * (vec4(scale, scale, scale, 1.0) * vec4(pos2d.xy, posZ, 1.0))) + vec4(translate.xy, 0.0, 0.0));
    vTextureCoordScaleOpacity = vec4(uv.xy, opacity, 0.0);
  }
`];

const fragmentShader = exports.fragmentShader = `

  precision mediump float;

  varying vec4 vTextureCoordScaleOpacity;
  uniform sampler2D tex;

  void main(void) {
    gl_FragColor = vTextureCoordScaleOpacity.z * texture2D(tex, vec2(vTextureCoordScaleOpacity.s, vTextureCoordScaleOpacity.t));
  }

`;

const description = exports.description = {
  vertexCount: 4,

  // +-+-+-+-+ +-+-+-+-+ +-+-+
  // |0|1|2|3| |4|5|6|7| |8|9|
  // +-+-+-+-+ +-+-+-+-+ +-+-+
  //
  // |o-o-o|                       (3) position: x,y,z
  //       |o|                     (1) rotate
  //           |o-o|               (2) tex-coords: s, t
  //               |o-o|           (3) translate: tx, ty
  //                     |o|       (1) scale
  //                       |o|     (1) opacity
  //

  attributes: [{ name: 'position', type: 'float32', size: 3, attrNames: ['x', 'y', 'z'] }, { name: 'rotate', type: 'float32', size: 1, uniform: true }, { name: 'texCoords', type: 'float32', size: 2, attrNames: ['s', 't'] }, { name: 'translate', type: 'float32', size: 2, attrNames: ['tx', 'ty'], uniform: true }, { name: 'scale', type: 'float32', size: 1, uniform: true }, { name: 'opacity', type: 'float32', size: 1, uniform: true }],

  aliases: {
    pos2d: { size: 2, type: 'float32', offset: 0 },
    posZ: { size: 1, type: 'float32', offset: 2, uniform: true },
    uv: 'texCoords'
  },

  proto: {
    /**
     * @param {Viewport} viewport
     * @param {number} textureWidth
     * @param {number} textureHeight
     * @param {number} [repeat] - texture repeat factor
     */
    setTexCoordsByViewport(viewport, textureWidth, textureHeight, repeat) {
      let x0 = viewport.x === 0 ? 0 : viewport.x / textureWidth;
      let x1 = (viewport.x + viewport.width) / textureWidth;
      let y0 = 1 - (viewport.y + viewport.height) / textureHeight;
      let y1 = viewport.y === 0 ? 1 : 1 - viewport.y / textureHeight;

      if (repeat !== undefined) {
        x0 *= repeat;
        x1 *= repeat;
        y0 *= repeat;
        y1 *= repeat;
      }

      this.setTexCoords(x0, y0, x1, y0, x1, y1, x0, y1);
    },

    /**
     * @param {Texture} texture
     */
    setTexCoordsByTexture(texture) {
      const x0 = texture.minS;
      const y0 = texture.minT;
      const x1 = texture.maxS;
      const y1 = texture.maxT;

      this.setTexCoords(x0, y0, x1, y0, x1, y1, x0, y1);
    },

    /**
     * @param {number} width
     * @param {number} height
     */
    setSize(width, height) {
      const halfWidth = width * 0.5;
      const halfHeight = (height == null ? width : height) * 0.5;

      this.setPos2d(-halfWidth, halfHeight, halfWidth, halfHeight, halfWidth, -halfHeight, -halfWidth, -halfHeight);
    },

    get width() {
      return this.x1 - this.x3;
    },

    get height() {
      return this.y0 - this.y2;
    },

    get rotateDegree() {
      return this.rotate * 180.0 / Math.PI;
    },

    set rotateDegree(degree) {
      this.rotate = degree * (Math.PI / 180.0);
    },

    get z() {
      return this.z0;
    },

    set z(z) {
      this.z0 = z;
      this.z1 = z;
      this.z2 = z;
      this.z3 = z;
    }
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (funcName = 'rotate', x = 0.0, y = 0.0, z = 1.0) {
  return [`mat4 ${funcName}(float angle) {`, 'float s = sin(angle);', 'float c = cos(angle);', 'float oc = 1.0 - c;', (0, _ret2.default)((0, _mat2.default)((0, _add2.default)((0, _mul2.default)('oc', x * x), 'c'), (0, _sub2.default)((0, _mul2.default)('oc', x * y), (0, _mul2.default)(z, 's')), (0, _add2.default)((0, _mul2.default)('oc', z * x), (0, _mul2.default)(y, 's')), 0, (0, _add2.default)((0, _mul2.default)('oc', x * y), (0, _mul2.default)(z, 's')), (0, _add2.default)((0, _mul2.default)('oc', y * y), 'c'), (0, _sub2.default)((0, _mul2.default)('oc', y * z), (0, _mul2.default)(x, 's')), 0, (0, _sub2.default)((0, _mul2.default)('oc', z * x), (0, _mul2.default)(y, 's')), (0, _add2.default)((0, _mul2.default)('oc', y * z), (0, _mul2.default)(x, 's')), (0, _add2.default)((0, _mul2.default)('oc', z * z), 'c'))), '}'];
};

var _ret = __webpack_require__(67);

var _ret2 = _interopRequireDefault(_ret);

var _mat = __webpack_require__(68);

var _mat2 = _interopRequireDefault(_mat);

var _mul = __webpack_require__(70);

var _mul2 = _interopRequireDefault(_mul);

var _sub = __webpack_require__(71);

var _sub2 = _interopRequireDefault(_sub);

var _add = __webpack_require__(72);

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = ret;
function ret(res) {
  return `return ${res};`;
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mat4;

var _as_float = __webpack_require__(69);

var _as_float2 = _interopRequireDefault(_as_float);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mat4(m00 = 0, m01 = 0, m02 = 0, m03 = 0, m10 = 0, m11 = 0, m12 = 0, m13 = 0, m20 = 0, m21 = 0, m22 = 0, m23 = 0, m30 = 0, m31 = 0, m32 = 0, m33 = 1, as = _as_float2.default) {
                              const toStr = as || (x => x + '');
                              return `mat4(${toStr(m00)}, ${toStr(m01)}, ${toStr(m02)}, ${toStr(m03)}, ${toStr(m10)}, ${toStr(m11)}, ${toStr(m12)}, ${toStr(m13)}, ${toStr(m20)}, ${toStr(m21)}, ${toStr(m22)}, ${toStr(m23)}, ${toStr(m30)}, ${toStr(m31)}, ${toStr(m32)}, ${toStr(m33)})`;
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (number) {
  const str = (number + '').trim();
  if (str.match(/^[0-9]+$/)) {
    return str + '.0';
  }
  return str;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function isNumber(x) {
  return typeof x === 'number';
}

exports.default = (a, b) => {
  if (isNumber(b) && isNumber(a)) {
    return a * b;
  } else if (isNumber(a)) {
    switch (a) {
      case 0:
        return 0;
      case 1:
        return b;
      default:
        return `${a} * ${b}`;
    }
  } else if (isNumber(b)) {
    switch (b) {
      case 0:
        return 0;
      case 1:
        return a;
      default:
        return `${a} * ${b}`;
    }
  } else {
    return `${a} * ${b}`;
  }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = sub;

function isNumber(x) {
  return typeof x === 'number';
}

function sub(a, b) {
  if (isNumber(a) && isNumber(b)) {
    return a - b;
  } else if (isNumber(a)) {
    switch (a) {
      case 0:
        return `-${b}`;
      default:
        return `${a} - ${b}`;
    }
  } else if (isNumber(b)) {
    switch (b) {
      case 0:
        return a;
      default:
        return `${a} - ${b}`;
    }
  } else {
    return `${a} - ${b}`;
  }
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = add;

function isNumber(x) {
  return typeof x === 'number';
}

function add(a, b) {
  if (isNumber(a) && isNumber(b)) {
    return a + b;
  } else if (isNumber(a)) {
    switch (a) {
      case 0:
        return b;
      default:
        return `${a} + ${b}`;
    }
  } else if (isNumber(b)) {
    switch (b) {
      case 0:
        return a;
      default:
        return `${a} + ${b}`;
    }
  } else {
    return `${a} + ${b}`;
  }
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _texture = __webpack_require__(15);

var _texture2 = _interopRequireDefault(_texture);

var _texture_state = __webpack_require__(75);

var _texture_state2 = _interopRequireDefault(_texture_state);

var _texture_atlas = __webpack_require__(30);

var _texture_atlas2 = _interopRequireDefault(_texture_atlas);

var _shader_texture_2d_variable = __webpack_require__(32);

var _shader_texture_2d_variable2 = _interopRequireDefault(_shader_texture_2d_variable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextureLibrary {
  constructor() {
    this.states = new Map();
    this.shaderVars = new Map();
  }

  loadTexture(id, url = id, textureHints = undefined) {
    const state = new _texture_state2.default(_texture2.default.load(url, textureHints));
    this.states.set(id, state);
    return state.promise;
  }

  loadTextureAtlas(id, url = id, textureHints = undefined) {
    const atlas = _texture_atlas2.default.load(url, null, null, textureHints);
    const state = new _texture_state2.default(atlas.then(atlas => {
      state.atlas = atlas;
      return atlas.rootTexture;
    }));
    this.states.set(id, state);
    return atlas;
  }

  getTextureAtlas(id) {
    return this.states.get(id).atlas;
  }

  whenLoaded(textureId, shaderVarKey, onLoaded) {
    const state = this.states.get(textureId);
    if (state === undefined || !state.isReady) return;

    let shaderVar = this.shaderVars.get(shaderVarKey);
    if (shaderVar === undefined) {
      shaderVar = new _shader_texture_2d_variable2.default(shaderVarKey);
      this.shaderVars.set(shaderVarKey, shaderVar);
    }

    shaderVar.texture = state.texture;
    onLoaded(shaderVar);
  }
}
exports.default = TextureLibrary;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const maxOf = (a, b) => a > b ? a : b;

/**
 * @param {number} x
 * @return {number}
 */
function findNextPowerOf2(x) {
  let p = 1;
  while (x > p) p <<= 1;
  return p;
}

/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOf2 = n => n !== 0 && (n & n - 1) === 0;

exports.maxOf = maxOf;
exports.findNextPowerOf2 = findNextPowerOf2;
exports.isPowerOf2 = isPowerOf2;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
class TextureState {
  constructor(texture, atlas) {
    this.texture = null;
    this.atlas = null;
    this.promise = Promise.resolve(texture).then(tex => {
      this.texture = tex;
      return tex;
    }).catch(err => {
      console.error('TextureState error:', err);
    });
    Promise.resolve(atlas).then(atlas => {
      this.atlas = atlas;
    });
  }

  get isReady() {
    return this.texture != null;
  }
}
exports.default = TextureState;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _texture = __webpack_require__(15);

var _texture2 = _interopRequireDefault(_texture);

var _texture_atlas = __webpack_require__(30);

var _texture_atlas2 = _interopRequireDefault(_texture_atlas);

var _power_of_2_image = __webpack_require__(29);

var _power_of_2_image2 = _interopRequireDefault(_power_of_2_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextureAtlasSpec {
  constructor(jsonDef) {
    this.jsonDef = jsonDef;
    this.frameNames = Object.keys(jsonDef.frames);
  }

  get frames() {
    return this.jsonDef.frames;
  }

  get meta() {
    return this.jsonDef.meta;
  }

  get imageUrl() {
    return this.meta.image;
  }

  createTextureAtlas(image = null, textureHints = undefined) {
    return Promise.resolve(image).then(image => {
      if (typeof image === 'function') {
        return Promise.resolve(image(this)).then(img => {
          if (typeof img === 'string') {
            return new _power_of_2_image2.default(img).complete;
          }
          return img;
        });
      } else if (typeof image === 'string') {
        return new _power_of_2_image2.default(image).complete;
      } else if (image) {
        return image;
      } else {
        throw new Error('TextureAtlasSpec.createTextureAtlas(): no image found!');
      }
    }).then(image => {
      const rootTexture = new _texture2.default(image, undefined, undefined, 0, 0, textureHints);
      const atlas = new _texture_atlas2.default(rootTexture, this);
      for (let name of Object.keys(this.frames)) {
        const { frame } = this.frames[name];
        atlas.addFrame(name, frame.w, frame.h, frame.x, frame.y);
      }
      return atlas;
    });
  }

  static load(url, options) {
    return window.fetch(url, options).then(response => response.json()).then(json => new TextureAtlasSpec(json));
  }
}
exports.default = TextureAtlasSpec;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _web_gl_resource_library = __webpack_require__(78);

var _web_gl_resource_library2 = _interopRequireDefault(_web_gl_resource_library);

var _web_gl_texture_manager = __webpack_require__(85);

var _web_gl_texture_manager2 = _interopRequireDefault(_web_gl_texture_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WebGlContext {
  constructor(gl) {
    Object.defineProperty(this, 'gl', { value: gl });

    initialize(this);

    this.resourceLibrary = new _web_gl_resource_library2.default(this);
    this.boundBuffers = new Map();
    this.currentProgram = 0;
    this.enabledVertexAttribLocations = [];

    this.textureManager = new _web_gl_texture_manager2.default(this);

    this.boundTextures = new Array(this.MAX_TEXTURE_IMAGE_UNITS);
    for (let i = 0; i < this.boundTextures.length; i++) {
      this.boundTextures[i] = { TEXTURE_2D: null };
    }

    this.readCurrentState();
    this.activeTexture(0); // enable first texture unit by default
  }

  /**
   * @param {BlendMode} blendMode
   */
  blend(blendMode) {
    const { gl } = this;
    if (blendMode.enable) {
      if (!this.blendEnabled) {
        gl.enable(gl.BLEND);
        this.blendEnabled = true;
      }
      gl.blendFunc(gl[blendMode.sfactor], gl[blendMode.dfactor]);
    } else if (this.blendEnabled) {
      gl.disable(gl.BLEND);
      this.blendEnabled = false;
    }
  }

  /**
   * @param {number} texUnit
   */
  activeTexture(texUnit) {
    const { gl } = this;
    const tex = gl.TEXTURE0 + texUnit;

    if (this.activeTexUnit !== tex) {
      this.activeTexUnit = tex;
      gl.activeTexture(this.activeTexUnit);
    }
  }

  /**
   * @param {number} glTextureId
   */
  bindTexture2d(glTextureId) {
    const { gl } = this;
    const bound = this.boundTextures[this.activeTexUnit - gl.TEXTURE0];

    if (bound.TEXTURE_2D !== glTextureId) {
      bound.TEXTURE_2D = glTextureId;
      gl.bindTexture(gl.TEXTURE_2D, glTextureId);
    }
  }

  readCurrentState() {
    const { gl } = this;

    // https://developer.mozilla.org/de/docs/Web/API/WebGLRenderingContext/getParameter

    this.boundBuffers.set(gl.ARRAY_BUFFER, gl.getParameter(gl.ARRAY_BUFFER_BINDING));
    this.boundBuffers.set(gl.ELEMENT_ARRAY_BUFFER, gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING));

    this.currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    this.blendEnabled = gl.getParameter(gl.BLEND);
  }

  bindBuffer(target, buffer) {
    if (this.boundBuffers.get(target) !== buffer) {
      this.gl.bindBuffer(target, buffer);
      this.boundBuffers.set(target, buffer);
    }
  }

  /**
   * @return {boolean}
   */
  useProgram(glProgram) {
    if (this.currentProgram !== glProgram) {
      this.gl.useProgram(glProgram);
      this.currentProgram = glProgram;
      return true;
    }
    return false;
  }

  enableVertexAttribArrays(enableLocations) {
    const { gl } = this;

    this.enabledVertexAttribLocations.filter(location => enableLocations.indexOf(location) === -1).forEach(location => {
      gl.disableVertexAttribArray(location);
      this.enabledVertexAttribLocations.splice(enableLocations.indexOf(location), 1);
    });

    enableLocations.forEach(loc => {
      const idx = this.enabledVertexAttribLocations.indexOf(loc);
      if (idx === -1) {
        gl.enableVertexAttribArray(loc);
        this.enabledVertexAttribLocations.push(loc);
      }
    });
  }
}

exports.default = WebGlContext; /** @private */

function initialize(glx) {
  const { gl } = glx;

  glx.DEPTH_BITS = gl.getParameter(gl.DEPTH_BITS);
  glx.MAX_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _resource_ref = __webpack_require__(5);

var _resource_ref2 = _interopRequireDefault(_resource_ref);

var _web_gl_shader = __webpack_require__(79);

var _web_gl_shader2 = _interopRequireDefault(_web_gl_shader);

var _web_gl_program = __webpack_require__(81);

var _web_gl_program2 = _interopRequireDefault(_web_gl_program);

var _web_gl_buffer = __webpack_require__(33);

var _web_gl_buffer2 = _interopRequireDefault(_web_gl_buffer);

var _web_gl_texture = __webpack_require__(84);

var _web_gl_texture2 = _interopRequireDefault(_web_gl_texture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WEB_GL_BUFFER_USAGE = Object.freeze({
  static: _web_gl_buffer2.default.STATIC_DRAW,
  dynamic: _web_gl_buffer2.default.DYNAMIC_DRAW
});

class WebGlResourceLibrary {
  constructor(glx) {
    Object.defineProperty(this, 'glx', { value: glx });

    /** @private */
    this.vertexShader = new Map();
    /** @private */
    this.fragmentShader = new Map();
    /** @private */
    this.shaderProgram = new Map();
    /** @private */
    this.buffer = new Map();
    /** @private */
    this.texture = new Map();
  }

  loadVertexShader(shaderSource) {
    let glShader = this.vertexShader.get(shaderSource.id);
    if (!glShader) {
      glShader = new _web_gl_shader2.default(this.glx, shaderSource);
      this.vertexShader.set(shaderSource.id, glShader);
    }
    return glShader;
  }

  loadFragementShader(shaderSource) {
    let glShader = this.fragmentShader.get(shaderSource.id);
    if (!glShader) {
      glShader = new _web_gl_shader2.default(this.glx, shaderSource);
      this.vertexShader.set(shaderSource.id, glShader);
    }
    return glShader;
  }

  loadProgram(shaderProgram) {
    let program = this.shaderProgram.get(shaderProgram.id);
    if (!program) {
      program = new _web_gl_program2.default(this.glx, shaderProgram);
      this.shaderProgram.set(shaderProgram.id, program);
    }
    return program;
  }

  /**
   * @param {ResourceRef} ref - resource reference to VOArray or `ElementIndexArray`
   * @returns {ResourceRef} resource reference to `WebGlBuffer`
   */
  loadBuffer(ref) {
    let bufferRef = this.buffer.get(ref.id);
    if (!bufferRef) {
      // create WebGlBuffer
      const target = ref.hints.target || _web_gl_buffer2.default.ARRAY_BUFFER;
      const glBuffer = new _web_gl_buffer2.default(this.glx, target, WEB_GL_BUFFER_USAGE[ref.hints.usage]);
      // create ResourceRef
      bufferRef = new _resource_ref2.default(glBuffer, { id: ref.id, serial: 0 });
      this.buffer.set(ref.id, bufferRef);
    }
    return bufferRef;
  }

  /**
   * @param {ResourceRef} resourceRef
   * @returns {ResourceRef} resource reference to WebGlBuffer
   */
  findBuffer(resourceRef) {
    return this.buffer.get(resourceRef.id);
  }

  /**
   * @param {ResourceRef} texRef - resource reference to texture
   * @returns {ResourceRef} resource reference to WebGlTexture
   */
  loadTexture(texRef) {
    let glTextureRef = this.texture.get(texRef.id);
    if (!glTextureRef) {
      // create WebGlTexture
      const glTex = new _web_gl_texture2.default(this.glx, texRef.resource.imgEl, texRef.hints.flipY, texRef.hints.repeatable, texRef.hints.premultiplyAlpha, texRef.hints.nearest);
      // create ResourceRef
      glTextureRef = new _resource_ref2.default(glTex, { id: texRef.id, serial: 0 });
      this.texture.set(texRef.id, glTextureRef);
    }
    return glTextureRef;
  }
}
exports.default = WebGlResourceLibrary;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shader_source = __webpack_require__(28);

var _shader_source2 = _interopRequireDefault(_shader_source);

var _source_to_str = __webpack_require__(80);

var _source_to_str2 = _interopRequireDefault(_source_to_str);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WebGlShader {
  constructor(glx, source) {
    this.glx = glx;

    if (!(source instanceof _shader_source2.default)) {
      throw new Error('WebGlShader panic! source must be an instance of ShaderSource!');
    }
    this.source = source;

    const { gl } = glx;
    this.shaderType = gl[source.type];

    this.glShader = gl.createShader(this.shaderType);
    compileShader(this);

    Object.freeze(this);
  }
}

exports.default = WebGlShader;
function compileShader(shader) {
  const { gl } = shader.glx;
  const { glShader, source } = shader;

  const src = (0, _source_to_str2.default)({ glx: shader.glx }, source.source);

  gl.shaderSource(glShader, src);
  gl.compileShader(glShader);

  if (!gl.getShaderParameter(glShader, gl.COMPILE_STATUS)) {
    const shaderInfoLog = gl.getShaderInfoLog(glShader);

    console.error(shaderInfoLog);
    console.group('shader-info');
    console.debug('shaderSource', shader);
    console.log(source);
    console.groupEnd();

    const err = new Error('WebGlShader compile panic!');
    err.webGlShader = shader;
    err.shaderInfoLog = shaderInfoLog;
    throw err;
  }
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = sourceToStr;
function sourceToStr(ctx, source) {
  if (typeof source === 'string') {
    return source;
  } else if (typeof source === 'function') {
    return sourceToStr(ctx, source(ctx));
  } else if (Array.isArray(source)) {
    return source.map(sourceToStr.bind(null, ctx)).join('\n');
  } else {
    return source + '';
  }
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _web_gl_uniform = __webpack_require__(82);

var _web_gl_uniform2 = _interopRequireDefault(_web_gl_uniform);

var _web_gl_attribute = __webpack_require__(83);

var _web_gl_attribute2 = _interopRequireDefault(_web_gl_attribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WebGlProgram {
  constructor(glx, shaderProgram) {
    this.glx = glx;

    this.vertexShader = glx.resourceLibrary.loadVertexShader(shaderProgram.vertexShader);
    this.fragmentShader = glx.resourceLibrary.loadFragementShader(shaderProgram.fragmentShader);

    const { gl } = glx;
    this.glProgram = gl.createProgram();

    linkProgram(this, this.vertexShader.glShader, this.fragmentShader.glShader);
    // TODO gl.deleteShader?

    createUniforms(this);
    createAttributes(this);

    Object.freeze(this);
  }

  /**
   * @return {boolean}
   */
  use() {
    const { glx } = this;
    if (glx.useProgram(this.glProgram)) {
      glx.enableVertexAttribArrays(this.attributeLocations);
      return true;
    }
    return false;
  }

  /**
   * @param {ShaderContext} shaderContext
   * @param {WebGlRenderer} renderer
   */
  loadUniforms(shaderContext, renderer) {
    this.uniformNames.forEach(name => {
      let shaderVar = shaderContext.curUniform(name);
      if (shaderVar == null) {
        shaderVar = shaderContext.curTex2d(name);
        if (shaderVar == null) {
          console.error('[WebGlProgram] could not load uniform:', name);
        }
        shaderVar.syncTextureAndValue(renderer);
      }
      this.uniforms[name].setValue(shaderVar.value);
    });
  }

  /**
   * sync buffer before load
   *
   * @param {ShaderContext} shaderContext
   * @param {WebGlRenderer} renderer
   */
  loadAttributes(shaderContext, renderer) {
    this.attributeNames.forEach(name => {
      const attribValue = shaderContext.curAttrib(name).value;
      renderer.syncBuffer(attribValue).bindBuffer();
      this.attributes[name].vertexAttribPointer(attribValue.descriptor);
    });
  }
}

exports.default = WebGlProgram; /** @private */

function createAttributes(program) {
  const { gl } = program.glx;
  const len = gl.getProgramParameter(program.glProgram, gl.ACTIVE_ATTRIBUTES);

  program.attributes = {};
  program.attributeNames = [];
  program.attributeLocations = [];

  for (let i = 0; i < len; ++i) {
    const attrib = new _web_gl_attribute2.default(program, i);
    program.attributes[attrib.name] = attrib;
    program.attributeNames.push(attrib.name);
    program.attributeLocations.push(attrib.location);
  }

  Object.freeze(program.attributes);
}

/** @private */
function createUniforms(program) {
  const { gl } = program.glx;
  const len = gl.getProgramParameter(program.glProgram, gl.ACTIVE_UNIFORMS);

  program.uniforms = {};
  program.uniformNames = [];

  for (let i = 0; i < len; ++i) {
    const uniform = new _web_gl_uniform2.default(program, i);
    program.uniforms[uniform.name] = uniform;
    program.uniformNames.push(uniform.name);
  }

  Object.freeze(program.uniforms);
}

/** @private */
function linkProgram(program, vertexShader, fragmentShader) {
  const { gl } = program.glx;
  const { glProgram } = program;

  gl.attachShader(glProgram, vertexShader);
  gl.attachShader(glProgram, fragmentShader);

  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    const err = new Error('WebGlProgram link panic!');
    err.webGlProgram = program;
    throw err;
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
class WebGlUniform {
  constructor(program, index) {
    this.program = program;
    this.glx = program.glx;

    const { gl } = program.glx;
    const { glProgram } = program;

    const { name, size, type } = gl.getActiveUniform(glProgram, index);
    this.name = name;
    this.size = size;
    this.type = type;

    this.location = gl.getUniformLocation(glProgram, name);

    this.setValue = uniformSetter(this);

    Object.freeze(this);
  }
}

exports.default = WebGlUniform;
function uniformSetter(uniform) {
  const { type, location } = uniform;
  const { gl } = uniform.glx;

  switch (type) {
    case gl.FLOAT:
      return value => gl.uniform1f(location, value);

    case gl.FLOAT_VEC2:
      return value => gl.uniform2f(location, value[0], value[1]);

    case gl.FLOAT_VEC3:
      return value => gl.uniform3f(location, value[0], value[1], value[2]);

    case gl.FLOAT_VEC4:
      return value => gl.uniform4f(location, value[0], value[1], value[2], value[3]);

    case gl.FLOAT_MAT4:
      return value => gl.uniformMatrix4fv(location, gl.FALSE, value.mat4);

    case gl.SAMPLER_2D:
      return value => gl.uniform1i(location, value);
  }

  const err = new Error(`WebGlUniform unknown uniform type:${type}`);
  err.webGlUniform = uniform;
  throw err;
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typed_array_helpers = __webpack_require__(6);

const glType = (gl, type) => gl[_typed_array_helpers.GL_ITEM_TYPES[type]];

class WebGlAttribute {
  constructor(program, index) {
    this.program = program;
    this.glx = program.glx;

    const { gl } = program.glx;
    const { glProgram } = program;

    const { name, size, type } = gl.getActiveAttrib(glProgram, index);
    this.name = name;
    this.size = size;
    this.type = type;

    this.location = gl.getAttribLocation(glProgram, name);

    Object.freeze(this);
  }

  /**
   * @param {VODescriptor} descriptor
   */
  vertexAttribPointer(descriptor) {
    const { gl } = this.glx;
    const attr = descriptor.attr[this.name];
    const type = glType(gl, attr.type);
    gl.vertexAttribPointer(this.location, attr.size, type, false, descriptor.bytesPerVertex, attr.byteOffset);
  }
}
exports.default = WebGlAttribute;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
class WebGlTexture {
  /**
   * @param {WebGlContext} glx
   * @param {HTMLImageElement} imgEl
   * @param {boolean} [flipY=false]
   * @param {boolean} [repeatable=false]
   * @param {boolean} [premultiplyAlpha=false]
   * @param {boolean} [nearest=false]
   */
  constructor(glx, imgEl, flipY = false, repeatable = false, premultiplyAlpha = false, nearest = false) {
    this.glx = glx;
    this.imgEl = imgEl;

    this.flipY = flipY;
    this.repeatable = repeatable;
    this.premultiplyAlpha = premultiplyAlpha;
    this.nearest = nearest;

    this.isInitialized = false;
    this.glTexObj = glx.gl.createTexture();
    this.texUnit = -1;
  }

  bind() {
    return this.glx.textureManager.bindWebGlTexture(this);
  }

  uploadImageData() {
    if (this.imgEl == null) return;
    if (!this.isInitialized) {
      initialize(this);
      this.isInitialized = true;
    }

    this.bind();

    const { gl } = this.glx;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imgEl);
  }
}

exports.default = WebGlTexture;
function initialize(tex) {
  tex.bind();

  const { gl } = tex.glx;

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, tex.flipY);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, tex.premultiplyAlpha);

  const wrap = tex.repeatable ? gl.REPEAT : gl.CLAMP_TO_EDGE;
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);

  const filter = tex.nearest ? gl.NEAREST : gl.LINEAR;
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, tex.imgEl.width, tex.imgEl.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
class WebGlTextureManager {
  /**
   * @param {WebGlContext} glx
   */
  constructor(glx) {
    Object.defineProperty(this, 'glx', { value: glx });

    /**
     * texUnit -> WebGlTexture
     * @type {Array<number>}
     */
    this.boundTextures = new Array(glx.MAX_TEXTURE_IMAGE_UNITS);

    for (let i = 0; i < this.boundTextures.length; ++i) {
      this.boundTextures[i] = null;
    }

    this.lastBoundTexUnit = 0;
  }

  /**
   * Bind a *texture* to a *texture unit*.
   * @param {WebGlTexture} glTexture
   * @return {number} texture unit
   */
  bindWebGlTexture(glTexture) {
    let texUnit = this.boundTextures.indexOf(glTexture);

    if (texUnit < 0) {
      // texture is unbound
      // find a free texture unit ..
      for (let i = 0; i < this.boundTextures.length; ++i) {
        if (!this.boundTextures[i]) {
          texUnit = i;
          this.boundTextures[i] = glTexture;
          break;
        }
      }

      if (texUnit < 0) {
        // no free texture found
        // so we choose the lru texture unit

        texUnit = this.lastBoundTexUnit;

        let prevGlTex = this.boundTextures[texUnit];
        if (prevGlTex) prevGlTex.texUnit = -1;

        this.lastBoundTexUnit = (this.lastBoundTexUnit + 1) % this.glx.MAX_TEXTURE_IMAGE_UNITS;
      }

      this.glx.activeTexture(texUnit);
      this.glx.bindTexture2d(glTexture.glTexObj);

      glTexture.texUnit = texUnit;
    }

    return texUnit;
  }
}
exports.default = WebGlTextureManager;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shader_context = __webpack_require__(87);

var _shader_context2 = _interopRequireDefault(_shader_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventize = __webpack_require__(2);
const tinycolor = __webpack_require__(34);

const autotouchBuffer = (renderer, resourceRef) => {
  const { resource } = resourceRef;
  if (resource.enableAutotouch) {
    if (!renderer.autotouchResources.has(resourceRef.id)) {
      renderer.autotouchResources.set(resourceRef.id, true);
      resource.touch();
    }
  }
};

const applyBlendMode = renderer => {
  const blendMode = renderer.blendStack[renderer.blendStack.length - 1] || renderer.initialBlendMode;
  if (blendMode && !blendMode.isEqual(renderer.currentBlendMode)) {
    renderer.glx.blend(blendMode);
    renderer.currentBlendMode = blendMode;
  }
};

class WebGlRenderer {
  constructor(glx) {
    Object.defineProperty(this, 'glx', { value: glx });

    this.shaderContext = new _shader_context2.default();
    this.autotouchResources = new Map();
    this.clearColor = null;
    this.blendStack = [];
    this.initialBlendMode = null;
    this.currentBlendMode = null;

    eventize(this);
  }

  /**
   * Set the framebuffer clear color.
   * Use the *tinycolor* library for css color conversion.
   *
   * @param {String} col - css color definition
   */
  setClearColor(col) {
    this.clearColor = tinycolor(col);
  }

  /**
   * Set the initial blend mode.
   *
   * @param {BlendMode} blendMode
   */
  setInitialBlendMode(blendMode) {
    this.initialBlendMode = blendMode;
  }

  renderFrame(scene, app) {
    this.shaderContext.clear();
    scene.emit('animateFrame', app);
    this.beginRenderFrame();
    scene.emit('renderFrame', this, app);
    this.endRenderFrame();
  }

  beginRenderFrame() {
    this.clearFrameBuffer();
  }

  endRenderFrame() {
    this.autotouchResources.clear();
  }

  clearFrameBuffer() {
    const { gl } = this.glx;

    let clear = gl.COLOR_BUFFER_BIT;
    if (this.glx.DEPTH_BITS > 0) clear = clear | gl.DEPTH_BUFFER_BIT;

    if (this.clearColor !== null) {
      const col = this.clearColor.toRgb();
      gl.clearColor(col.r / 255, col.g / 255, col.b / 255, col.a);
    }
    gl.clear(clear);
  }

  /**
   * Push a new blend mode to the stack.
   *
   * @param {BlendMode} blendMode
   */
  pushBlendMode(blendMode) {
    this.blendStack.push(blendMode);
  }

  /**
   * Remove the current blend mode from internal stack.
   * The initial blend mode can't be removed.
   */
  popBlendMode() {
    this.blendStack.pop();
  }

  /**
   * @param {ShaderProgram} shaderProgram
   */
  useShaderProgram(shaderProgram) {
    const program = this.glx.resourceLibrary.loadProgram(shaderProgram);
    const { shaderContext } = this;
    program.use(shaderContext);
    program.loadUniforms(shaderContext, this);
    program.loadAttributes(shaderContext, this);
  }

  /**
   * @param {string} primitive
   * @param {number} count
   * @param {number} [startIndex=0]
   */
  drawArrays(primitive, count, startIndex = 0) {
    applyBlendMode(this);

    const { gl } = this.glx;
    gl.drawArrays(gl[primitive], startIndex, count);
  }

  /**
   * @param {string} primitive
   * @param {ElementIndexArray} elementIndexArray
   * @param {number} [count]
   * @param {number} [offset=0]
   */
  drawIndexed(primitive, elementIndexArray, count, offset = 0) {
    applyBlendMode(this);
    this.syncBuffer(elementIndexArray).bindBuffer();

    const { gl } = this.glx;
    gl.drawElements(gl[primitive], count || elementIndexArray.length, gl.UNSIGNED_SHORT, offset * elementIndexArray.array.BYTES_PER_ELEMENT);
  }

  /**
   * @param {VOArray|ElementIndexArray} resource
   * @return {WebGlBuffer}
   */
  syncBuffer(resource) {
    const { resourceRef } = resource;
    autotouchBuffer(this, resourceRef);

    const bufferRef = this.glx.resourceLibrary.loadBuffer(resourceRef);
    bufferRef.sync(resourceRef, buffer => buffer.bufferData(resourceRef.hints.typedArray));
    return bufferRef.resource;
  }

  /**
   * @param {Texture} texture
   * @return {WebGlTexture}
   */
  syncTexture(texture) {
    const texRef = texture.resourceRef;
    const glTexRef = this.glx.resourceLibrary.loadTexture(texRef);
    glTexRef.sync(texRef, tex => tex.uploadImageData());
    return glTexRef.resource;
  }
}
exports.default = WebGlRenderer;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shader_variable = __webpack_require__(7);

var _shader_variable2 = _interopRequireDefault(_shader_variable);

var _shader_variable_group = __webpack_require__(16);

var _shader_variable_group2 = _interopRequireDefault(_shader_variable_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A ShaderContext keeps named references to all shader _variables_
 * to make them available for shader _programs_.
 * Each named reference is organized as a _stack_ where you can push
 * or pop shader variable _values_.
 */
class ShaderContext {
  constructor() {
    this.uniform = new Map();
    this.attrib = new Map();
    this.tex2d = new Map();
  }

  clear() {
    this.uniform.clear();
    this.attrib.clear();
    this.tex2d.clear();
  }

  /**
   * @param {ShaderVariable|ShaderVariableGroup} shaderVariable
   */
  pushVar(shaderVariable) {
    if (shaderVariable instanceof _shader_variable_group2.default) {
      shaderVariable.pushVar(this);
    } else {
      const lane = shaderVarLane(this, shaderVariable.type, shaderVariable.name);
      lane.push(shaderVariable);
    }
  }

  /**
   * Remove current shader variable plus all later set variables from named shader variable stack.
   * @param {ShaderVariable|ShaderVariableGroup} shaderVariable
   */
  popVar(shaderVariable) {
    if (shaderVariable instanceof _shader_variable_group2.default) {
      shaderVariable.popVar(this);
    } else {
      const lane = shaderVarLane(this, shaderVariable.type, shaderVariable.name);
      const len = lane.length;
      for (let i = 0; i < len; ++i) {
        if (lane[i] === shaderVariable) {
          lane.length = i;
          return;
        }
      }
    }
  }

  /**
   * Return current shader variable by name and type.
   * @param {ShaderVariable} shaderVariable
   * @return {ShaderVariable} or `null`
   */
  curVar(shaderVariable) {
    const lane = shaderVarMap(this, shaderVariable.type).get(shaderVariable.name);
    return lane && lane.length ? lane[lane.length - 1] : null;
  }

  /**
   * Return current _uniform_ shader variable by name.
   * @param {string} name
   * @return {ShaderUniformVariable} or `null`
   */
  curUniform(name) {
    const lane = this.uniform.get(name);
    return lane && lane.length ? lane[lane.length - 1] : null;
  }

  /**
   * Return current _attribute_ shader variable by name.
   * @param {string} name
   * @return {ShaderAttribVariable} or `null`
   */
  curAttrib(name) {
    const lane = this.attrib.get(name);
    return lane && lane.length ? lane[lane.length - 1] : null;
  }

  /**
   * Return current _texture2d_ shader variable by name.
   * @param {string} name
   * @return {ShaderTexture2dVariable} or `null`
   */
  curTex2d(name) {
    const lane = this.tex2d.get(name);
    return lane && lane.length ? lane[lane.length - 1] : null;
  }
}

exports.default = ShaderContext;
function shaderVarMap(shaderContext, type) {
  switch (type) {
    case _shader_variable2.default.TYPE.UNIFORM:
      return shaderContext.uniform;
    case _shader_variable2.default.TYPE.ATTRIB:
      return shaderContext.attrib;
    case _shader_variable2.default.TYPE.TEXTURE_2D:
      return shaderContext.tex2d;
  }
}

function shaderVarLane(shaderContext, type, name) {
  const map = shaderVarMap(shaderContext, type);
  let lane = map.get(name);

  if (!lane) {
    lane = [];
    map.set(name, lane);
  }

  return lane;
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (registry) {
  registry.registerComponent('projection', createFactory(_ProjectionComponent2.default));
  registry.registerComponent('children', createFactory(_ChildrenComponent2.default));
  registry.registerComponent('blend-mode', createFactory(_BlendModeComponent2.default));
};

var _parseCssStyledProperties = __webpack_require__(17);

var _parseCssStyledProperties2 = _interopRequireDefault(_parseCssStyledProperties);

var _ProjectionComponent = __webpack_require__(89);

var _ProjectionComponent2 = _interopRequireDefault(_ProjectionComponent);

var _ChildrenComponent = __webpack_require__(99);

var _ChildrenComponent2 = _interopRequireDefault(_ChildrenComponent);

var _BlendModeComponent = __webpack_require__(100);

var _BlendModeComponent2 = _interopRequireDefault(_BlendModeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFactory = ComponentConstructor => ({
  create(entity, data) {
    return new ComponentConstructor(entity, (0, _parseCssStyledProperties2.default)(data));
  },
  update(component, data) {
    component.update((0, _parseCssStyledProperties2.default)(data));
  }
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _projection = __webpack_require__(90);

var _projection2 = _interopRequireDefault(_projection);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProjectionComponent {
  constructor(entity, data) {
    this.projection = new _projection2.default(data);
    entity.on('*', _constants.COMP_PRIO_PROJECTION, this);
  }

  animateFrame(app) {
    this.projection.update(app.width, app.height);
  }

  renderFrame(renderer) {
    renderer.shaderContext.pushVar(this.projection.uniform);
  }

  debug() {
    console.dir(this.projection);
  }

  update(data) {
    console.log('TODO ProjectionComponent.update(', data, ')');
  }

  disconnectedEntity(entity) {
    console.log('ProjectionComponent.disconnectedEntity(', entity, ')');
    entity.off(this);
  }
}
exports.default = ProjectionComponent;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _mat = __webpack_require__(91);

var _mat2 = _interopRequireDefault(_mat);

var _shader_uniform_variable = __webpack_require__(98);

var _shader_uniform_variable2 = _interopRequireDefault(_shader_uniform_variable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UNIFORM_NAME = 'viewMatrix';

/**
 * @param {object} options
 * @param {number} [options.desiredWidth] - desired width
 * @param {number} [options.desiredHeight] - desired height
 * @param {number} [options.pixelRatio] - pixel ratio
 * @param {string} [options.sizeFit] - `cover`, `contain` or `fill`
 * @param {string} [options.uniformName='viewMatrix'] - name of the uniform value
 */
class Projection {
  constructor({ desiredWidth, desiredHeight, pixelRatio, sizeFit, uniformName }) {
    this.desiredWidth = desiredWidth;
    this.desiredHeight = desiredHeight;
    this.pixelRatio = pixelRatio;
    this.sizeFit = sizeFit;
    this.uniform = new _shader_uniform_variable2.default(uniformName || UNIFORM_NAME, new _mat2.default());
    this.width = 0;
    this.height = 0;
  }

  updateOrtho(width, height) {
    if (width !== this.width || height !== this.height) {
      this.width = width;
      this.height = height;
      // this.uniform.value.ortho(width, height)
      // TODO enable perspective with distance
      this.uniform.value.perspective(width, height, 100);
      this.uniform.touch();
    }
  }

  update(currentWidth, currentHeight) {
    // TODO pixelRatio and currentPixelRatio
    if (this.sizeFit === 'fill' && this.desiredWidth > 0 && this.desiredHeight > 0) {
      this.updateOrtho(this.desiredWidth, this.desiredHeight);
    } else if ((this.sizeFit === 'cover' || this.sizeFit === 'contain') && this.desiredWidth >= 0 && this.desiredHeight >= 0) {
      const currentRatio = currentHeight / currentWidth; // <1 : landscape, >1 : portrait
      const desiredRatio = this.desiredHeight / this.desiredWidth;
      const isCover = this.sizeFit === 'cover';

      let width = this.desiredWidth;
      let height = this.desiredHeight;

      if (this.desiredWidth === 0 && this.desiredHeight || currentRatio < desiredRatio) {
        width = this.desiredHeight / currentHeight * currentWidth;
        if (isCover) {
          const factor = this.desiredWidth / width;
          width *= factor;
          height *= factor;
        }
      } else if (this.desiredWidth && this.desiredHeight === 0 || currentRatio > desiredRatio) {
        height = this.desiredWidth / currentWidth * currentHeight;
        if (isCover) {
          const factor = this.desiredHeight / height;
          width *= factor;
          height *= factor;
        }
      }

      this.updateOrtho(width, height);
    }
  }
}
exports.default = Projection;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
const { mat4 } = __webpack_require__(92);

const DEG2RAD = Math.PI / 180.0;

class Mat4 {
  constructor() {
    this.mat4 = mat4.create();
    Object.freeze(this);
  }

  identity() {
    mat4.identity(this.mat4);
  }

  ortho(width, height, zRange = Math.pow(2, 16)) {
    const hw = width >> 1;
    const hh = height >> 1;
    const hz = zRange >> 1;
    mat4.ortho(this.mat4, -hw, hw, -hh, hh, -hz, hz);
  }

  perspective(width, height, distance = 100) {
    // https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
    // https://stackoverflow.com/questions/6653080/in-opengl-how-can-i-determine-the-bounds-of-the-view-at-a-given-depth
    // http://glmatrix.net/docs/module-mat4.html
    const aspect = width / height;
    const near = 0;
    const far = 2000;
    const halfHeight = height / 2.0;
    const fovy = 2 * Math.atan(halfHeight / distance);
    mat4.perspective(this.mat4, fovy, aspect, near, far);
    // TODO camera feature
    mat4.translate(this.mat4, this.mat4, [0, 0, -distance]);
  }

  translate(x, y, z = 0) {
    mat4.translate(this.mat4, this.mat4, [x, y, z]);
  }

  scale(x, y, z = 1) {
    mat4.scale(this.mat4, this.mat4, [x, y, z]);
  }

  rotateX(deg) {
    mat4.rotateX(this.mat4, this.mat4, deg * DEG2RAD);
  }

  rotateY(deg) {
    mat4.rotateY(this.mat4, this.mat4, deg * DEG2RAD);
  }

  rotateZ(deg) {
    mat4.rotateZ(this.mat4, this.mat4, deg * DEG2RAD);
  }

  multiply(a, b) {
    mat4.multiply(this.mat4, a.mat4, b.mat4);
  }

  copy(src) {
    mat4.copy(this.mat4, src.mat4);
  }

  clone() {
    const dolly = new Mat4();
    dolly.copy(this);
    return dolly;
  }

  get x() {
    return this.mat4[12];
  }

  set x(val) {
    this.mat4[12] = val;
  }

  get y() {
    return this.mat4[13];
  }

  set y(val) {
    this.mat4[13] = val;
  }

  get z() {
    return this.mat4[14];
  }

  set z(val) {
    this.mat4[14] = val;
  }

  get sx() {
    return this.mat4[0];
  }

  set sx(val) {
    this.mat4[0] = val;
  }

  get sy() {
    return this.mat4[5];
  }

  set sy(val) {
    this.mat4[5] = val;
  }

  get sz() {
    return this.mat4[10];
  }

  set sz(val) {
    this.mat4[10] = val;
  }
}
exports.default = Mat4;

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_matrix_common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_matrix_mat2__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gl_matrix_mat2d__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gl_matrix_mat3__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gl_matrix_mat4__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gl_matrix_quat__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gl_matrix_vec2__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__gl_matrix_vec3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gl_matrix_vec4__ = __webpack_require__(37);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "glMatrix", function() { return __WEBPACK_IMPORTED_MODULE_0__gl_matrix_common__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2", function() { return __WEBPACK_IMPORTED_MODULE_1__gl_matrix_mat2__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2d", function() { return __WEBPACK_IMPORTED_MODULE_2__gl_matrix_mat2d__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat3", function() { return __WEBPACK_IMPORTED_MODULE_3__gl_matrix_mat3__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat4", function() { return __WEBPACK_IMPORTED_MODULE_4__gl_matrix_mat4__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat", function() { return __WEBPACK_IMPORTED_MODULE_5__gl_matrix_quat__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec2", function() { return __WEBPACK_IMPORTED_MODULE_6__gl_matrix_vec2__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec3", function() { return __WEBPACK_IMPORTED_MODULE_7__gl_matrix_vec3__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return __WEBPACK_IMPORTED_MODULE_8__gl_matrix_vec4__; });
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.4.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */
// END HEADER













/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["transpose"] = transpose;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["adjoint"] = adjoint;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["LDU"] = LDU;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */



/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
function fromValues(m00, m01, m10, m11) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    let a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function invert(out, a) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];

  // Calculate the determinant
  let det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] =  a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] =  a0 * det;

  return out;
}

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  let a0 = a[0];
  out[0] =  a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] =  a0;

  return out;
}

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function multiply(out, a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function rotate(out, a, rad) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = a0 *  c + a2 * s;
  out[1] = a1 *  c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
function scale(out, a, v) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let v0 = v[0], v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
function fromRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
}

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2]/a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  return out;
}

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link mat2.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["fromTranslation"] = fromTranslation;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */



/**
 * 2x3 Matrix
 * @module mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](6);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
function fromValues(a, b, c, d, tx, ty) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
function invert(out, a) {
  let aa = a[0], ab = a[1], ac = a[2], ad = a[3];
  let atx = a[4], aty = a[5];

  let det = aa * ad - ab * ac;
  if(!det){
    return null;
  }
  det = 1.0 / det;

  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function multiply(out, a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function rotate(out, a, rad) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  out[0] = a0 *  c + a2 * s;
  out[1] = a1 *  c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
function scale(out, a, v) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let v0 = v[0], v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
function translate(out, a, v) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let v0 = v[0], v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
function fromRotation(out, rad) {
  let s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
          a[3] + ', ' + a[4] + ', ' + a[5] + ')';
}

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  out[4] = a[4] + (b[4] * scale);
  out[5] = a[5] + (b[5] * scale);
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
          Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
          Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
}

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["transpose"] = transpose;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["adjoint"] = adjoint;
/* harmony export (immutable) */ __webpack_exports__["determinant"] = determinant;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["translate"] = translate;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["rotate"] = rotate;
/* harmony export (immutable) */ __webpack_exports__["rotateX"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["rotateY"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["rotateZ"] = rotateZ;
/* harmony export (immutable) */ __webpack_exports__["fromTranslation"] = fromTranslation;
/* harmony export (immutable) */ __webpack_exports__["fromScaling"] = fromScaling;
/* harmony export (immutable) */ __webpack_exports__["fromRotation"] = fromRotation;
/* harmony export (immutable) */ __webpack_exports__["fromXRotation"] = fromXRotation;
/* harmony export (immutable) */ __webpack_exports__["fromYRotation"] = fromYRotation;
/* harmony export (immutable) */ __webpack_exports__["fromZRotation"] = fromZRotation;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslation"] = fromRotationTranslation;
/* harmony export (immutable) */ __webpack_exports__["getTranslation"] = getTranslation;
/* harmony export (immutable) */ __webpack_exports__["getScaling"] = getScaling;
/* harmony export (immutable) */ __webpack_exports__["getRotation"] = getRotation;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslationScale"] = fromRotationTranslationScale;
/* harmony export (immutable) */ __webpack_exports__["fromRotationTranslationScaleOrigin"] = fromRotationTranslationScaleOrigin;
/* harmony export (immutable) */ __webpack_exports__["fromQuat"] = fromQuat;
/* harmony export (immutable) */ __webpack_exports__["frustum"] = frustum;
/* harmony export (immutable) */ __webpack_exports__["perspective"] = perspective;
/* harmony export (immutable) */ __webpack_exports__["perspectiveFromFieldOfView"] = perspectiveFromFieldOfView;
/* harmony export (immutable) */ __webpack_exports__["ortho"] = ortho;
/* harmony export (immutable) */ __webpack_exports__["lookAt"] = lookAt;
/* harmony export (immutable) */ __webpack_exports__["targetTo"] = targetTo;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["frob"] = frob;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalar"] = multiplyScalar;
/* harmony export (immutable) */ __webpack_exports__["multiplyScalarAndAdd"] = multiplyScalarAndAdd;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */



/**
 * 4x4 Matrix
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](16);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}


/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    let a01 = a[1], a02 = a[2], a03 = a[3];
    let a12 = a[6], a13 = a[7];
    let a23 = a[11];

    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

  return out;
}

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
  out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
  out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
  out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
  out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
  out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
  return out;
}

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  let b00 = a00 * a11 - a01 * a10;
  let b01 = a00 * a12 - a02 * a10;
  let b02 = a00 * a13 - a03 * a10;
  let b03 = a01 * a12 - a02 * a11;
  let b04 = a01 * a13 - a03 * a11;
  let b05 = a02 * a13 - a03 * a12;
  let b06 = a20 * a31 - a21 * a30;
  let b07 = a20 * a32 - a22 * a30;
  let b08 = a20 * a33 - a23 * a30;
  let b09 = a21 * a32 - a22 * a31;
  let b10 = a21 * a33 - a23 * a31;
  let b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
  let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  // Cache only the current line of the second matrix
  let b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
  out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
  out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
  out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  return out;
}

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
  let x = v[0], y = v[1], z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
    out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
    out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
  let x = v[0], y = v[1], z = v[2];

  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
  let x = axis[0], y = axis[1], z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;

  if (Math.abs(len) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]) { return null; }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
  a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
  a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
  b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
  b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) { // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  if (a !== out) { // If the source and destination differ, copy the unchanged rows
    out[0]  = a[0];
    out[1]  = a[1];
    out[2]  = a[2];
    out[3]  = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  if (a !== out) { // If the source and destination differ, copy the unchanged rows
    out[4]  = a[4];
    out[5]  = a[5];
    out[6]  = a[6];
    out[7]  = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];

  if (a !== out) { // If the source and destination differ, copy the unchanged last row
    out[8]  = a[8];
    out[9]  = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function fromRotation(out, rad, axis) {
  let x = axis[0], y = axis[1], z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;

  if (Math.abs(len) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]) { return null; }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromXRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0]  = 1;
  out[1]  = 0;
  out[2]  = 0;
  out[3]  = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromYRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0]  = c;
  out[1]  = 0;
  out[2]  = -s;
  out[3]  = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function fromZRotation(out, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);

  // Perform axis-specific matrix multiplication
  out[0]  = c;
  out[1]  = s;
  out[2]  = 0;
  out[3]  = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
  // Quaternion math
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getScaling(out, mat) {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];

  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);

  return out;
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
function getRotation(out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  let trace = mat[0] + mat[5] + mat[10];
  let S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S;
    out[2] = (mat[1] - mat[4]) / S;
  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) {
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S;
    out[2] = (mat[8] + mat[2]) / S;
  } else if (mat[5] > mat[10]) {
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S;
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S;
  } else {
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;
  let sx = s[0];
  let sy = s[1];
  let sz = s[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;

  return out;
}

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let xy = x * y2;
  let xz = x * z2;
  let yy = y * y2;
  let yz = y * z2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  let sx = s[0];
  let sy = s[1];
  let sz = s[2];

  let ox = o[0];
  let oy = o[1];
  let oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
function fromQuat(out, q) {
  let x = q[0], y = q[1], z = q[2], w = q[3];
  let x2 = x + x;
  let y2 = y + y;
  let z2 = z + z;

  let xx = x * x2;
  let yx = y * x2;
  let yy = y * y2;
  let zx = z * x2;
  let zy = z * y2;
  let zz = z * z2;
  let wx = w * x2;
  let wy = w * y2;
  let wz = w * z2;

  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;

  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;

  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;

  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;

  return out;
}

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
  let rl = 1 / (right - left);
  let tb = 1 / (top - bottom);
  let nf = 1 / (near - far);
  out[0] = (near * 2) * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = (near * 2) * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = (far * near * 2) * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
  let f = 1.0 / Math.tan(fovy / 2);
  let nf = 1 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = (2 * far * near) * nf;
  out[15] = 0;
  return out;
}

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
  let upTan = Math.tan(fov.upDegrees * Math.PI/180.0);
  let downTan = Math.tan(fov.downDegrees * Math.PI/180.0);
  let leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0);
  let rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0);
  let xScale = 2.0 / (leftTan + rightTan);
  let yScale = 2.0 / (upTan + downTan);

  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = ((upTan - downTan) * yScale * 0.5);
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = (far * near) / (near - far);
  out[15] = 0.0;
  return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
  let lr = 1 / (left - right);
  let bt = 1 / (bottom - top);
  let nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
  let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  let eyex = eye[0];
  let eyey = eye[1];
  let eyez = eye[2];
  let upx = up[0];
  let upy = up[1];
  let upz = up[2];
  let centerx = center[0];
  let centery = center[1];
  let centerz = center[2];

  if (Math.abs(eyex - centerx) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"] &&
      Math.abs(eyey - centery) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"] &&
      Math.abs(eyez - centerz) < __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]) {
    return mat4.identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;

  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;

  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;

  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;

  return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function targetTo(out, eye, target, up) {
  let eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];

  let z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];

  let len = z0*z0 + z1*z1 + z2*z2;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  let x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
          a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
          a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
          a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
function frob(a) {
  return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
}

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  out[2] = a[2] + (b[2] * scale);
  out[3] = a[3] + (b[3] * scale);
  out[4] = a[4] + (b[4] * scale);
  out[5] = a[5] + (b[5] * scale);
  out[6] = a[6] + (b[6] * scale);
  out[7] = a[7] + (b[7] * scale);
  out[8] = a[8] + (b[8] * scale);
  out[9] = a[9] + (b[9] * scale);
  out[10] = a[10] + (b[10] * scale);
  out[11] = a[11] + (b[11] * scale);
  out[12] = a[12] + (b[12] * scale);
  out[13] = a[13] + (b[13] * scale);
  out[14] = a[14] + (b[14] * scale);
  out[15] = a[15] + (b[15] * scale);
  return out;
}

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] &&
         a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] &&
         a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
         a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
function equals(a, b) {
  let a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3];
  let a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7];
  let a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11];
  let a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

  let b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3];
  let b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7];
  let b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11];
  let b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
          Math.abs(a3 - b3) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
          Math.abs(a4 - b4) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
          Math.abs(a5 - b5) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
          Math.abs(a6 - b6) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
          Math.abs(a7 - b7) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
          Math.abs(a8 - b8) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
          Math.abs(a9 - b9) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
          Math.abs(a10 - b10) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
          Math.abs(a11 - b11) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
          Math.abs(a12 - b12) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
          Math.abs(a13 - b13) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
          Math.abs(a14 - b14) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
          Math.abs(a15 - b15) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
}

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link mat4.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["identity"] = identity;
/* harmony export (immutable) */ __webpack_exports__["setAxisAngle"] = setAxisAngle;
/* harmony export (immutable) */ __webpack_exports__["getAxisAngle"] = getAxisAngle;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["rotateX"] = rotateX;
/* harmony export (immutable) */ __webpack_exports__["rotateY"] = rotateY;
/* harmony export (immutable) */ __webpack_exports__["rotateZ"] = rotateZ;
/* harmony export (immutable) */ __webpack_exports__["calculateW"] = calculateW;
/* harmony export (immutable) */ __webpack_exports__["slerp"] = slerp;
/* harmony export (immutable) */ __webpack_exports__["invert"] = invert;
/* harmony export (immutable) */ __webpack_exports__["conjugate"] = conjugate;
/* harmony export (immutable) */ __webpack_exports__["fromMat3"] = fromMat3;
/* harmony export (immutable) */ __webpack_exports__["fromEuler"] = fromEuler;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mat3__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vec3__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vec4__ = __webpack_require__(37);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */






/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  let s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
function getAxisAngle(out_axis, q) {
  let rad = Math.acos(q[3]) * 2.0;
  let s = Math.sin(rad / 2.0);
  if (s != 0.0) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function multiply(out, a, b) {
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = b[0], by = b[1], bz = b[2], bw = b[3];

  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateX(out, a, rad) {
  rad *= 0.5;

  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = Math.sin(rad), bw = Math.cos(rad);

  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateY(out, a, rad) {
  rad *= 0.5;

  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let by = Math.sin(rad), bw = Math.cos(rad);

  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateZ(out, a, rad) {
  rad *= 0.5;

  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bz = Math.sin(rad), bw = Math.cos(rad);

  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
function calculateW(out, a) {
  let x = a[0], y = a[1], z = a[2];

  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = b[0], by = b[1], bz = b[2], bw = b[3];

  let omega, cosom, sinom, scale0, scale1;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if ( cosom < 0.0 ) {
    cosom = -cosom;
    bx = - bx;
    by = - by;
    bz = - bz;
    bw = - bw;
  }
  // calculate coefficients
  if ( (1.0 - cosom) > 0.000001 ) {
    // standard case (slerp)
    omega  = Math.acos(cosom);
    sinom  = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;

  return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert(out, a) {
  let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  let dot = a0*a0 + a1*a1 + a2*a2 + a3*a3;
  let invDot = dot ? 1.0/dot : 0;

  // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0*invDot;
  out[1] = -a1*invDot;
  out[2] = -a2*invDot;
  out[3] = a3*invDot;
  return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  let fTrace = m[0] + m[4] + m[8];
  let fRoot;

  if ( fTrace > 0.0 ) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0);  // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5/fRoot;  // 1/(4w)
    out[0] = (m[5]-m[7])*fRoot;
    out[1] = (m[6]-m[2])*fRoot;
    out[2] = (m[1]-m[3])*fRoot;
  } else {
    // |w| <= 1/2
    let i = 0;
    if ( m[4] > m[0] )
      i = 1;
    if ( m[8] > m[i*3+i] )
      i = 2;
    let j = (i+1)%3;
    let k = (i+2)%3;

    fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
    out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
    out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
  }

  return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */
function fromEuler(out, x, y, z) {
    let halfToRad = 0.5 * Math.PI / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;

    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);

    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;

    return out;
}

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
const clone = __WEBPACK_IMPORTED_MODULE_3__vec4__["clone"];
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;


/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
const fromValues = __WEBPACK_IMPORTED_MODULE_3__vec4__["fromValues"];
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;


/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
const copy = __WEBPACK_IMPORTED_MODULE_3__vec4__["copy"];
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;


/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
const set = __WEBPACK_IMPORTED_MODULE_3__vec4__["set"];
/* harmony export (immutable) */ __webpack_exports__["set"] = set;


/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
const add = __WEBPACK_IMPORTED_MODULE_3__vec4__["add"];
/* harmony export (immutable) */ __webpack_exports__["add"] = add;


/**
 * Alias for {@link quat.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
const scale = __WEBPACK_IMPORTED_MODULE_3__vec4__["scale"];
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;


/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
const dot = __WEBPACK_IMPORTED_MODULE_3__vec4__["dot"];
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;


/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
const lerp = __WEBPACK_IMPORTED_MODULE_3__vec4__["lerp"];
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;


/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */
const length = __WEBPACK_IMPORTED_MODULE_3__vec4__["length"];
/* harmony export (immutable) */ __webpack_exports__["length"] = length;


/**
 * Alias for {@link quat.length}
 * @function
 */
const len = length;
/* harmony export (immutable) */ __webpack_exports__["len"] = len;


/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
const squaredLength = __WEBPACK_IMPORTED_MODULE_3__vec4__["squaredLength"];
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;


/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
const sqrLen = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["sqrLen"] = sqrLen;


/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
const normalize = __WEBPACK_IMPORTED_MODULE_3__vec4__["normalize"];
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;


/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
const exactEquals = __WEBPACK_IMPORTED_MODULE_3__vec4__["exactEquals"];
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;


/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
const equals = __WEBPACK_IMPORTED_MODULE_3__vec4__["equals"];
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;


/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
const rotationTo = (function() {
  let tmpvec3 = __WEBPACK_IMPORTED_MODULE_2__vec3__["create"]();
  let xUnitVec3 = __WEBPACK_IMPORTED_MODULE_2__vec3__["fromValues"](1,0,0);
  let yUnitVec3 = __WEBPACK_IMPORTED_MODULE_2__vec3__["fromValues"](0,1,0);

  return function(out, a, b) {
    let dot = __WEBPACK_IMPORTED_MODULE_2__vec3__["dot"](a, b);
    if (dot < -0.999999) {
      __WEBPACK_IMPORTED_MODULE_2__vec3__["cross"](tmpvec3, xUnitVec3, a);
      if (__WEBPACK_IMPORTED_MODULE_2__vec3__["len"](tmpvec3) < 0.000001)
        __WEBPACK_IMPORTED_MODULE_2__vec3__["cross"](tmpvec3, yUnitVec3, a);
      __WEBPACK_IMPORTED_MODULE_2__vec3__["normalize"](tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      __WEBPACK_IMPORTED_MODULE_2__vec3__["cross"](tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
})();
/* harmony export (immutable) */ __webpack_exports__["rotationTo"] = rotationTo;


/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
const sqlerp = (function () {
  let temp1 = create();
  let temp2 = create();

  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));

    return out;
  };
}());
/* harmony export (immutable) */ __webpack_exports__["sqlerp"] = sqlerp;


/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
const setAxes = (function() {
  let matr = __WEBPACK_IMPORTED_MODULE_1__mat3__["create"]();

  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];

    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];

    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];

    return normalize(out, fromMat3(out, matr));
  };
})();
/* harmony export (immutable) */ __webpack_exports__["setAxes"] = setAxes;



/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["clone"] = clone;
/* harmony export (immutable) */ __webpack_exports__["fromValues"] = fromValues;
/* harmony export (immutable) */ __webpack_exports__["copy"] = copy;
/* harmony export (immutable) */ __webpack_exports__["set"] = set;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;
/* harmony export (immutable) */ __webpack_exports__["subtract"] = subtract;
/* harmony export (immutable) */ __webpack_exports__["multiply"] = multiply;
/* harmony export (immutable) */ __webpack_exports__["divide"] = divide;
/* harmony export (immutable) */ __webpack_exports__["ceil"] = ceil;
/* harmony export (immutable) */ __webpack_exports__["floor"] = floor;
/* harmony export (immutable) */ __webpack_exports__["min"] = min;
/* harmony export (immutable) */ __webpack_exports__["max"] = max;
/* harmony export (immutable) */ __webpack_exports__["round"] = round;
/* harmony export (immutable) */ __webpack_exports__["scale"] = scale;
/* harmony export (immutable) */ __webpack_exports__["scaleAndAdd"] = scaleAndAdd;
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
/* harmony export (immutable) */ __webpack_exports__["squaredDistance"] = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["length"] = length;
/* harmony export (immutable) */ __webpack_exports__["squaredLength"] = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["negate"] = negate;
/* harmony export (immutable) */ __webpack_exports__["inverse"] = inverse;
/* harmony export (immutable) */ __webpack_exports__["normalize"] = normalize;
/* harmony export (immutable) */ __webpack_exports__["dot"] = dot;
/* harmony export (immutable) */ __webpack_exports__["cross"] = cross;
/* harmony export (immutable) */ __webpack_exports__["lerp"] = lerp;
/* harmony export (immutable) */ __webpack_exports__["random"] = random;
/* harmony export (immutable) */ __webpack_exports__["transformMat2"] = transformMat2;
/* harmony export (immutable) */ __webpack_exports__["transformMat2d"] = transformMat2d;
/* harmony export (immutable) */ __webpack_exports__["transformMat3"] = transformMat3;
/* harmony export (immutable) */ __webpack_exports__["transformMat4"] = transformMat4;
/* harmony export (immutable) */ __webpack_exports__["str"] = str;
/* harmony export (immutable) */ __webpack_exports__["exactEquals"] = exactEquals;
/* harmony export (immutable) */ __webpack_exports__["equals"] = equals;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(1);
/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

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
THE SOFTWARE. */



/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](2);
  out[0] = 0;
  out[1] = 0;
  return out;
}

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
function clone(a) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
function fromValues(x, y) {
  let out = new __WEBPACK_IMPORTED_MODULE_0__common__["ARRAY_TYPE"](2);
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
};

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
};

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
function round (out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + (b[0] * scale);
  out[1] = a[1] + (b[1] * scale);
  return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1];
  return Math.sqrt(x*x + y*y);
};

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
  var x = b[0] - a[0],
    y = b[1] - a[1];
  return x*x + y*y;
};

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
  var x = a[0],
    y = a[1];
  return Math.sqrt(x*x + y*y);
};

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength (a) {
  var x = a[0],
    y = a[1];
  return x*x + y*y;
};

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
  var x = a[0],
    y = a[1];
  var len = x*x + y*y;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
  }
  return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
  var ax = a[0],
    ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
function random(out, scale) {
  scale = scale || 1.0;
  var r = __WEBPACK_IMPORTED_MODULE_0__common__["RANDOM"]() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
  var x = a[0],
    y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
  let x = a[0];
  let y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */
function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function equals(a, b) {
  let a0 = a[0], a1 = a[1];
  let b0 = b[0], b1 = b[1];
  return (Math.abs(a0 - b0) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= __WEBPACK_IMPORTED_MODULE_0__common__["EPSILON"]*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
}

/**
 * Alias for {@link vec2.length}
 * @function
 */
const len = length;
/* harmony export (immutable) */ __webpack_exports__["len"] = len;


/**
 * Alias for {@link vec2.subtract}
 * @function
 */
const sub = subtract;
/* harmony export (immutable) */ __webpack_exports__["sub"] = sub;


/**
 * Alias for {@link vec2.multiply}
 * @function
 */
const mul = multiply;
/* harmony export (immutable) */ __webpack_exports__["mul"] = mul;


/**
 * Alias for {@link vec2.divide}
 * @function
 */
const div = divide;
/* harmony export (immutable) */ __webpack_exports__["div"] = div;


/**
 * Alias for {@link vec2.distance}
 * @function
 */
const dist = distance;
/* harmony export (immutable) */ __webpack_exports__["dist"] = dist;


/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
const sqrDist = squaredDistance;
/* harmony export (immutable) */ __webpack_exports__["sqrDist"] = sqrDist;


/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
const sqrLen = squaredLength;
/* harmony export (immutable) */ __webpack_exports__["sqrLen"] = sqrLen;


/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach = (function() {
  let vec = create();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 2;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1];
    }

    return a;
  };
})();
/* harmony export (immutable) */ __webpack_exports__["forEach"] = forEach;



/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shader_variable = __webpack_require__(7);

var _shader_variable2 = _interopRequireDefault(_shader_variable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Shader uniform variable.
 */
class ShaderUniformVariable extends _shader_variable2.default {
  /**
   * @param {string} name
   * @param {number|Object} value
   */
  constructor(name, value) {
    super(name, _shader_variable2.default.TYPE.UNIFORM, value);
  }
}
exports.default = ShaderUniformVariable;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _constants = __webpack_require__(0);

const eventize = __webpack_require__(2);

const PRIO_BEFORE_CHILDREN = _constants.COMP_PRIO_CHILDREN + 1;
const PRIO_AFTER_CHILDREN = _constants.COMP_PRIO_CHILDREN - 1;

class BeforeChildren {
  constructor(entity) {
    this.entity = entity;
  }

  renderFrame(renderer) {
    this.entity.emit('renderFrameBeforeChildren', renderer);
  }
}

class AfterChildren {
  constructor(entity) {
    this.entity = entity;
  }

  renderFrame(renderer) {
    this.entity.emit('renderFrameAfterChildren', renderer);
  }
}

class ChildrenComponent {
  constructor(entity) {
    eventize(this);

    this.beforeChildren = new BeforeChildren(entity);
    this.afterChildren = new AfterChildren(entity);

    entity.on('*', _constants.COMP_PRIO_CHILDREN, this);
    entity.on('*', PRIO_BEFORE_CHILDREN, this.beforeChildren);
    entity.on('*', PRIO_AFTER_CHILDREN, this.afterChildren);
  }

  renderFrameBeforeChildren() {
    // do not inform children about this event!
  }

  renderFrameAfterChildren() {
    // do not inform children about this event!
  }

  appendChild(entity) {
    if (entity.hasComponent('parentEntity')) {
      entity.destroyComponent('parentEntity');
    }
    entity.setComponent('parentEntity', this);
    this.on(entity);
  }

  removeChild(entity) {
    this.off(entity);
    entity.destroyComponent('parentEntity');
  }

  disconnectedEntity(entity) {
    console.log('ChildrenComponent.disconnectedEntity(', entity, ')');
    entity.off(this.afterChildren);
    entity.off(this.beforeChildren);
    entity.off(this);
  }
}
exports.default = ChildrenComponent;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _blend_mode = __webpack_require__(101);

var _blend_mode2 = _interopRequireDefault(_blend_mode);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseBlendModeData = data => ({
  enable: typeof data === 'object' ? data.enable === undefined ? true : !!data.enable : false,
  sfactor: typeof data === 'object' ? typeof data.sfactor === 'string' ? data.sfactor : '' : '',
  dfactor: typeof data === 'object' ? typeof data.dfactor === 'string' ? data.dfactor : '' : ''
});

class BeforeChildren {
  constructor(blendMode) {
    this.blendMode = blendMode;
  }

  renderFrame(renderer) {
    renderer.pushBlendMode(this.blendMode);
  }
}

class AfterChildren {
  renderFrame(renderer) {
    renderer.popBlendMode();
  }
}

class BlendModeComponent {
  constructor(entity, data) {
    const { enable, sfactor, dfactor } = parseBlendModeData(data);
    this.blendMode = new _blend_mode2.default(enable, sfactor, dfactor);
    this.beforeChildren = new BeforeChildren(this.blendMode);
    this.afterChildren = new AfterChildren();
    entity.on('*', _constants.COMP_PRIO_BLEND_BEFORE, this.beforeChildren);
    entity.on('*', _constants.COMP_PRIO_BLEND_AFTER, this.afterChildren);
    entity.on('debug', this);
  }

  debug() {
    console.dir(this.blendMode);
  }

  update(data) {
    const { enable, sfactor, dfactor } = parseBlendModeData(data);
    this.blendMode.enable = enable;
    this.blendMode.sfactor = sfactor;
    this.blendMode.dfactor = dfactor;
  }

  disconnectedEntity(entity) {
    console.log('BlendModeComponent.disconnectedEntity(', entity, ')');
    entity.off(this.afterChildren);
    entity.off(this.beforeChildren);
    entity.off(this);
  }
}
exports.default = BlendModeComponent;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
const snakeCase = __webpack_require__(102);

class BlendMode {
  constructor(enable, sfactor = null, dfactor = null) {
    this.enable = enable;
    this.sfactor = sfactor;
    this.dfactor = dfactor;
  }

  set sfactor(value) {
    this._sfactor = typeof value === 'string' ? snakeCase(value).toUpperCase() : undefined;
  }

  get sfactor() {
    return this._sfactor;
  }

  set dfactor(value) {
    this._dfactor = typeof value === 'string' ? snakeCase(value).toUpperCase() : undefined;
  }

  get dfactor() {
    return this._dfactor;
  }

  isEqual(other) {
    return other && this.enable === other.enable && this._sfactor === other._sfactor && this._dfactor === other._dfactor;
  }
}
exports.default = BlendMode;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var createCompounder = __webpack_require__(103);

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 * @example
 *
 * _.snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * _.snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * _.snakeCase('--FOO-BAR--');
 * // => 'foo_bar'
 */
var snakeCase = createCompounder(function(result, word, index) {
  return result + (index ? '_' : '') + word.toLowerCase();
});

module.exports = snakeCase;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(104),
    deburr = __webpack_require__(105),
    words = __webpack_require__(113);

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var deburrLetter = __webpack_require__(106),
    toString = __webpack_require__(18);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var basePropertyOf = __webpack_require__(107);

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;


/***/ }),
/* 107 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8),
    arrayMap = __webpack_require__(110),
    isArray = __webpack_require__(4),
    isSymbol = __webpack_require__(20);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27)))

/***/ }),
/* 110 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__(114),
    hasUnicodeWord = __webpack_require__(115),
    toString = __webpack_require__(18),
    unicodeWords = __webpack_require__(116);

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;


/***/ }),
/* 114 */
/***/ (function(module, exports) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;


/***/ }),
/* 115 */
/***/ (function(module, exports) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;


/***/ }),
/* 116 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
    rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _find_parent_element_by_name = __webpack_require__(39);

var _find_parent_element_by_name2 = _interopRequireDefault(_find_parent_element_by_name);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global HTMLElement */
const eventize = __webpack_require__(2);

class SceneElement extends HTMLElement {
  /** @ignore */
  constructor(_) {
    const self = super(_);
    return eventize(self);
  }

  get blitpunkNodeName() {
    return _constants.NODE_NAME_SCENE;
  }

  get blitpunk() {
    return this.blitpunkCanvas.blitpunk;
  }

  /** @private */
  connectedCallback() {
    this.blitpunkCanvas = (0, _find_parent_element_by_name2.default)(this, _constants.NODE_NAME_CANVAS);
  }

  /** @private */
  disconnectedCallback() {
    this.blitpunkCanvas = null;
  }
}
exports.default = SceneElement;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _connectElementEntities = __webpack_require__(40);

var _connectElementEntities2 = _interopRequireDefault(_connectElementEntities);

var _disconnectElementEntities = __webpack_require__(41);

var _disconnectElementEntities2 = _interopRequireDefault(_disconnectElementEntities);

var _readTextureHints = __webpack_require__(121);

var _readTextureHints2 = _interopRequireDefault(_readTextureHints);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global HTMLElement */
const eventize = __webpack_require__(2);

class TextureAtlasElement extends HTMLElement {
  /** @private */
  static get observedAttributes() {
    return [_constants.ATTR_SRC];
  }

  /** @ignore */
  constructor(_) {
    const self = super(_);
    return eventize(self);
  }

  /** @type {string} */
  get blitpunkNodeName() {
    return _constants.NODE_NAME_TEXTURE_ATLAS;
  }

  /** @type {string} */
  get textureId() {
    return this.entity && this.entity.id;
  }

  loadTextureAtlas(src) {
    if (src && this.entity) {
      if (this.prevUrl !== src) {
        this.prevUrl = src;
        this.textureHints = (0, _readTextureHints2.default)(this);
        this.textureAtlasPromise = this.textureLibrary.loadTextureAtlas(this.textureId, src, this.textureHints).then(atlas => {
          this.textureAtlas = atlas;
          return atlas;
        });
        return this.textureAtlasPromise;
      }
    }
  }

  /** @private */
  debug() {
    console.log(this.textureAtlas);
  }

  /** @private */
  connectedCallback() {
    (0, _connectElementEntities2.default)(this);
    this.textureLibrary = this.parentSceneElement.textureLibrary; // TODO for every element?
    this.loadTextureAtlas(this.getAttribute(_constants.ATTR_SRC));
  }

  /** @private */
  disconnectedCallback() {
    // TODO disconnectedCallback <blitpunk-texture-atlas/>
    this.textureAtlas = null;
    this.textureLibrary = null;
    (0, _disconnectElementEntities2.default)(this);
  }

  /** @private */
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr === _constants.ATTR_SRC) {
      this.loadTextureAtlas(newValue);
    }
  }
}
exports.default = TextureAtlasElement;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (el) {
  return (0, _find_parent_element_by_name2.default)(el, _constants.NODE_NAME_CANVAS);
};

var _find_parent_element_by_name = __webpack_require__(39);

var _find_parent_element_by_name2 = _interopRequireDefault(_find_parent_element_by_name);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = findParentElementByProperty;
const EXIT_NODES = ['BODY', 'HTML'];

function findParentElementByProperty(node, prop, value) {
  const parent = node.parentElement;
  if (!parent || parent.nodeType !== 1) return;
  const { nodeName } = parent;
  if (EXIT_NODES.includes(nodeName)) return;
  if (value == null && parent[prop] || value != null && parent[prop] === value) return parent;
  return parent;
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = readTextureHints;

var _readBooleanAttribute = __webpack_require__(38);

var _readBooleanAttribute2 = _interopRequireDefault(_readBooleanAttribute);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readTextureHints(el) {
  return {
    flipY: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_FLIP_Y, false),
    repeatable: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_REPEATABLE, false),
    premultiplyAlpha: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_PREMULTIPLY_ALPHA, true),
    nearest: (0, _readBooleanAttribute2.default)(el, _constants.ATTR_NEAREST, false)
  };
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _sprite_group = __webpack_require__(123);

var _sprite_group2 = _interopRequireDefault(_sprite_group);

var _parseCssStyledProperties = __webpack_require__(17);

var _parseCssStyledProperties2 = _interopRequireDefault(_parseCssStyledProperties);

var _createVoPropsSetter = __webpack_require__(187);

var _createVoPropsSetter2 = _interopRequireDefault(_createVoPropsSetter);

var _isNonEmptyString = __webpack_require__(188);

var _isNonEmptyString2 = _interopRequireDefault(_isNonEmptyString);

var _isNumberGreaterThanZero = __webpack_require__(189);

var _isNumberGreaterThanZero2 = _interopRequireDefault(_isNumberGreaterThanZero);

var _connectElementEntities = __webpack_require__(40);

var _connectElementEntities2 = _interopRequireDefault(_connectElementEntities);

var _disconnectElementEntities = __webpack_require__(41);

var _disconnectElementEntities2 = _interopRequireDefault(_disconnectElementEntities);

var _syncComponent = __webpack_require__(190);

var _syncComponent2 = _interopRequireDefault(_syncComponent);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventize = __webpack_require__(2); /* global HTMLElement */


const createConfig = ({ descriptor, capacity, vertexShader, fragmentShader, primitive, voNew, voZero }) => ({
  descriptor,
  vertexShader,
  fragmentShader,
  primitive,
  capacity: parseInt(capacity, 10),
  voNew: (0, _createVoPropsSetter2.default)(voNew),
  voZero: (0, _createVoPropsSetter2.default)(voZero)
});

// TODO add support for all options from src/core/SpriteGroup
const readConfigFromAttributes = el => createConfig({
  descriptor: el.getAttribute(_constants.ATTR_DESCRIPTOR),
  vertexShader: el.getAttribute(_constants.ATTR_VERTEX_SHADER),
  fragmentShader: el.getAttribute(_constants.ATTR_FRAGMENT_SHADER),
  primitive: el.getAttribute(_constants.ATTR_PRIMITIVE),
  capacity: el.getAttribute(_constants.ATTR_CAPACITY),
  voNew: el.getAttribute(_constants.ATTR_VO_NEW),
  voZero: el.getAttribute(_constants.ATTR_VO_ZERO)
});

const isValidConfig = config => (0, _isNonEmptyString2.default)(config.descriptor) && (0, _isNonEmptyString2.default)(config.vertexShader) && (0, _isNonEmptyString2.default)(config.fragmentShader) && (0, _isNonEmptyString2.default)(config.primitive) && (0, _isNumberGreaterThanZero2.default)(config.capacity);

const createSpriteGroup = el => {
  if (!el.parentScene) return; // TODO find a better way
  const config = readConfigFromAttributes(el);
  if (isValidConfig(config)) {
    el.spriteGroup = new _sprite_group2.default(el.resourceLibrary, el.textureLibrary, config);
    el._resolvePromise(el.spriteGroup);
    delete el._resolvePromise;
  }
};

const syncTextureMap = (el, data) => {
  const { spriteGroup } = el;
  if (!spriteGroup) return;
  const texMap = (0, _parseCssStyledProperties2.default)(data);
  if (!texMap || typeof texMap !== 'object') return;
  el.textureMap = {};
  Object.keys(texMap).forEach(key => {
    const selector = texMap[key];
    const texEl = el.blitpunkCanvas.querySelector(selector);
    el.textureMap[key] = texEl.textureId;
    spriteGroup.setTexture(key, texEl.textureId);
  });
};

class SpriteGroupElement extends HTMLElement {
  /** @private */
  static get observedAttributes() {
    return [_constants.ATTR_BLEND_MODE, _constants.ATTR_CAPACITY, _constants.ATTR_DESCRIPTOR, _constants.ATTR_FRAGMENT_SHADER, _constants.ATTR_PRIMITIVE, _constants.ATTR_TEXTURE_MAP, _constants.ATTR_VERTEX_SHADER];
  }

  /** @ignore */
  constructor(_) {
    const self = super(_);
    self.spriteGroupPromise = new Promise(resolve => {
      self._resolvePromise = resolve;
    });
    return eventize(self);
  }

  /** @type {string} */
  get blitpunkNodeName() {
    return _constants.NODE_NAME_SPRITE_GROUP;
  }

  /** @private */
  renderFrame(renderer) {
    if (this.spriteGroup) {
      this.spriteGroup.renderFrame(renderer);
    }
  }

  /** @private */
  debug() {
    console.log(this.spriteGroup);
    if (this.textureMap) console.log(_constants.ATTR_TEXTURE_MAP, this.textureMap);
  }

  /** @private */
  connectedCallback() {
    (0, _connectElementEntities2.default)(this);

    this.textureLibrary = this.parentSceneElement.textureLibrary;
    this.resourceLibrary = this.parentSceneElement.resourceLibrary;

    createSpriteGroup(this);
    syncTextureMap(this, this.getAttribute(_constants.ATTR_TEXTURE_MAP));
    (0, _syncComponent2.default)(this, _constants.ATTR_BLEND_MODE);
  }

  /** @private */
  disconnectedCallback() {
    // TODO disconnectedCallback <blitpunk-sprite-group/>
    this.textureMap = null;
    this.spriteGroup = null;
    this.textureLibrary = null;
    this.resourceLibrary = null;
    (0, _disconnectElementEntities2.default)(this);
  }

  /** @private */
  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case _constants.ATTR_TEXTURE_MAP:
        syncTextureMap(this, newValue);
        break;
      case _constants.ATTR_BLEND_MODE:
        (0, _syncComponent2.default)(this, attr);
        break;
      default:
        if (!this.spriteGroup) {
          createSpriteGroup(this);
        }
    }
  }
}
exports.default = SpriteGroupElement;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _element_index_array = __webpack_require__(124);

var _element_index_array2 = _interopRequireDefault(_element_index_array);

var _shader_program = __webpack_require__(125);

var _shader_program2 = _interopRequireDefault(_shader_program);

var _shader_texture_group = __webpack_require__(126);

var _shader_texture_group2 = _interopRequireDefault(_shader_texture_group);

var _shader_variable_buffer_group = __webpack_require__(127);

var _shader_variable_buffer_group2 = _interopRequireDefault(_shader_variable_buffer_group);

var _v_o_pool = __webpack_require__(131);

var _v_o_pool2 = _interopRequireDefault(_v_o_pool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pick = __webpack_require__(133);

const getVO = (descriptor, opt) => {
  if (typeof opt === 'function') {
    const vo = descriptor.createVO();
    opt(vo);
    return vo;
  }
  return opt;
};

class SpriteGroup {
  constructor(resourceLibrary, textureLibrary, options) {
    this.resourceLibrary = resourceLibrary;
    this.textureLibrary = textureLibrary;
    this.descriptor = resourceLibrary.findDescriptor(options.descriptor);
    this.voPool = new _v_o_pool2.default(this.descriptor, Object.assign(pick(options, ['capacity', 'usage', 'maxAllocVOSize', 'voArray']), {
      voNew: getVO(this.descriptor, options.voNew),
      voZero: getVO(this.descriptor, options.voZero)
    }));
    this.voPoolShaderAttribs = new _shader_variable_buffer_group2.default(this.voPool);
    this.indices = options.indices || _element_index_array2.default.Generate(this.voPool.capacity, [0, 1, 2, 0, 2, 3], 4 // quads
    // TODO create ElementIndexArray factories! capacity=N, type=quads, ...
    );
    this.shaderProgram = new _shader_program2.default(resourceLibrary.findVertexShader(options.vertexShader), resourceLibrary.findFragmentShader(options.fragmentShader));
    this.primitive = options.primitive;
    this.textures = Object.assign({}, options.textures);
    this.shaderTextureGroup = null;
  }

  get capacity() {
    return this.voPool.capacity;
  }

  get usedCount() {
    return this.voPool.usedCount;
  }
  get availableCount() {
    return this.voPool.availableCount;
  }

  setTexture(sampler, textureId) {
    if (this.textures[sampler] !== textureId) {
      this.textures[sampler] = textureId;
      this.shaderTextureGroup = null;
    }
  }

  loadTextureAtlas(sampler, url) {
    this.textures[sampler] = url;
    this.shaderTextureGroup = null;
    return this.textureLibrary.loadTextureAtlas(url);
  }

  getTextureAtlas(sampler) {
    return this.textureLibrary.getTextureAtlas(this.textures[sampler]);
  }

  createSprite(texture, width, height) {
    const vo = this.voPool.alloc(1);
    if (texture != null) {
      const w = width || texture.width;
      const h = height || texture.height;
      vo.setSize(w, h);
      vo.setTexCoordsByTexture(texture);
    }
    return vo;
  }

  renderFrame(renderer) {
    if (this.shaderTextureGroup == null) {
      this.shaderTextureGroup = new _shader_texture_group2.default(this.textureLibrary, this.textures);
    }
    this.shaderTextureGroup.whenLoaded(texUniforms => {
      const { shaderContext } = renderer;

      shaderContext.pushVar(texUniforms);
      shaderContext.pushVar(this.voPoolShaderAttribs);

      renderer.useShaderProgram(this.shaderProgram);

      renderer.drawIndexed(this.primitive, this.indices);
    });
  }
}
exports.default = SpriteGroup;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _resource_ref = __webpack_require__(5);

var _resource_ref2 = _interopRequireDefault(_resource_ref);

var _web_gl_buffer = __webpack_require__(33);

var _web_gl_buffer2 = _interopRequireDefault(_web_gl_buffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ElementIndexArray {
  constructor(objectCount, itemCount = 1) {
    this.resourceRef = new _resource_ref2.default(this, {
      target: _web_gl_buffer2.default.ELEMENT_ARRAY_BUFFER,
      usage: 'static'
    });

    this.objectCount = objectCount;
    this.itemCount = itemCount;
    this.length = objectCount * itemCount;

    this.array = new Uint16Array(this.length);

    // needed by WebGlRenderer#syncBuffer
    this.resourceRef.hints.typedArray = this.array;
  }

  /**
   * @param {number} objectCount
   * @param {number[]} indices
   * @param {number} [stride=4]
   * @param {number} [objectOffset=0]
   * @return {ElementIndexArray}
   * @example
   * // Create a ElementIndexArray for 10 quads where each quad made up of 2x triangles (4x vertices and 6x indices)
   * const quadIndices = ElementIndexArray.Generate(10, [0, 1, 2, 0, 2, 3], 4)
   * quadIndices.length        // => 60
   * quadIndices.itemCount     // => 6
   */
  static Generate(objectCount, indices, stride = 4, objectOffset = 0) {
    const arr = new ElementIndexArray(objectCount, indices.length);

    for (let i = 0; i < objectCount; ++i) {
      for (let j = 0; j < indices.length; ++j) {
        arr.array[i * arr.itemCount + j] = indices[j] + (i + objectOffset) * stride;
      }
    }

    return arr;
  }
}
exports.default = ElementIndexArray;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _generate_uuid = __webpack_require__(3);

var _generate_uuid2 = _interopRequireDefault(_generate_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GpuProgram {
  /**
   * @param {ShaderSource} vertexShader
   * @param {ShaderSource} fragmentShader
   */
  constructor(vertexShader, fragmentShader) {
    /**
     * @type {string}
     */
    this.id = (0, _generate_uuid2.default)();

    /**
     * @type {ShaderSource}
     */
    this.vertexShader = vertexShader;

    /**
     * @type {ShaderSource}
     */
    this.fragmentShader = fragmentShader;
  }
}
exports.default = GpuProgram;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shader_variable_group = __webpack_require__(16);

var _shader_variable_group2 = _interopRequireDefault(_shader_variable_group);

var _shader_texture_2d_variable = __webpack_require__(32);

var _shader_texture_2d_variable2 = _interopRequireDefault(_shader_texture_2d_variable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShaderTextureGroup {
  constructor(shaderLibrary, shaderTextureMap) {
    this.shaderLibrary = shaderLibrary;
    this.waitFor = Object.keys(shaderTextureMap).map(shaderVarKey => ({
      shaderVarKey,
      textureId: shaderTextureMap[shaderVarKey],
      isLoaded: false
    }));
    this.shaderVarGroup = new _shader_variable_group2.default([]);
    this.shaderVarStore = new Map();
  }

  get isLoaded() {
    return this.waitFor.length === 0 && this.shaderVarGroup.shaderVars.length > 0;
  }

  whenLoaded(onLoaded) {
    if (!this.isLoaded) {
      this.waitFor.forEach(waitFor => {
        if (!waitFor.isLoaded) {
          const state = this.shaderLibrary.states.get(waitFor.textureId);
          if (state === undefined || !state.isReady) return;

          const shaderVar = new _shader_texture_2d_variable2.default(waitFor.shaderVarKey);
          shaderVar.texture = state.texture;
          this.shaderVarGroup.shaderVars.push(shaderVar);

          waitFor.isLoaded = true;
        }
      });
      this.waitFor = this.waitFor.filter(waitFor => waitFor.isLoaded === false);
      if (this.isLoaded) {
        onLoaded(this.shaderVarGroup);
      }
    } else {
      onLoaded(this.shaderVarGroup);
    }
  }
}
exports.default = ShaderTextureGroup;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shader_variable_group = __webpack_require__(16);

var _shader_variable_group2 = _interopRequireDefault(_shader_variable_group);

var _shader_attrib_variable = __webpack_require__(128);

var _shader_attrib_variable2 = _interopRequireDefault(_shader_attrib_variable);

var _shader_attrib_value = __webpack_require__(129);

var _shader_attrib_value2 = _interopRequireDefault(_shader_attrib_value);

var _shader_variable_alias = __webpack_require__(130);

var _shader_variable_alias2 = _interopRequireDefault(_shader_variable_alias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Group of shader variables which are referencing one single buffer.
 */
class ShaderVariableBufferGroup extends _shader_variable_group2.default {
  /**
   * @param {VOPool} bufferSource
   */
  constructor(bufferSource) {
    super([]);
    const descriptor = bufferSource.descriptor;
    let firstVar;
    Object.keys(descriptor.attr).forEach(attrName => {
      if (!firstVar) {
        firstVar = new _shader_attrib_variable2.default(attrName, new _shader_attrib_value2.default(attrName, descriptor, bufferSource));
        this.shaderVars.push(firstVar);
      } else {
        this.shaderVars.push(new _shader_variable_alias2.default(attrName, firstVar));
      }
    });
  }

  get bufferSource() {
    return this.shaderVars[0].value.bufferSource;
  }

  get serial() {
    return this.shaderVars[0].serial;
  }

  touch() {
    return this.shaderVars[0].touch();
  }
}
exports.default = ShaderVariableBufferGroup;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _shader_variable = __webpack_require__(7);

var _shader_variable2 = _interopRequireDefault(_shader_variable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Shader attribute variable.
 */
class ShaderAttribVariable extends _shader_variable2.default {
  /**
   * @param {string} name
   * @param {number|Object} value
   */
  constructor(name, value) {
    super(name, _shader_variable2.default.TYPE.ATTRIB, value);
  }
}
exports.default = ShaderAttribVariable;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _v_o_array = __webpack_require__(13);

var _v_o_array2 = _interopRequireDefault(_v_o_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShaderAttribValue {
  constructor(name, descriptor, bufferSource) {
    this.name = name;
    this.descriptor = descriptor;
    this.bufferSource = bufferSource;
  }

  get attrDescriptor() {
    return this.descriptor.attr[this.name];
  }

  get resourceRef() {
    const { bufferSource } = this;
    return bufferSource instanceof _v_o_array2.default ? bufferSource.resourceRef : bufferSource.voArray.resourceRef;
  }
}
exports.default = ShaderAttribValue;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Shader attribute variable *alias*.
 */
class ShaderVariableAlias {
  /**
   * @param {string} name
   * @param {number|Object} value
   */
  constructor(name, shaderVar) {
    this.name = name;
    this.shaderVar = shaderVar;
  }

  get type() {
    return this.shaderVar.type;
  }

  get value() {
    return this.shaderVar.value;
  }

  get serial() {
    return this.shaderVar.serial;
  }
}
exports.default = ShaderVariableAlias;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _create_vertex_objects = __webpack_require__(132);

var _create_vertex_objects2 = _interopRequireDefault(_create_vertex_objects);

var _generate_uuid = __webpack_require__(3);

var _generate_uuid2 = _interopRequireDefault(_generate_uuid);

var _v_o_array = __webpack_require__(13);

var _v_o_array2 = _interopRequireDefault(_v_o_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VOPool {
  /**
   * @param {VODescriptor} descriptor - vertex object descriptor
   * @param {Object} [options] - Advanced options
   * @param {number} [options.capacity] - Maximum number of *vertex objects*
   * @param {VOArray} [options.voArray] - Vertex object array
   * @param {VertexObject} [options.voZero] - *vertex object* **prototype**
   * @param {VertexObject} [options.voNew] - *vertex object* **prototype**
   * @param {VertexObject} [options.maxAllocVOSize] - never allocate more than *maxAllocVOSize* vertex objects at once
   * @param {string} [options.usage=VOPool.USAGE.DYNAMIC] - vertex data usage hint
   */

  constructor(descriptor, options) {
    this.id = (0, _generate_uuid2.default)();

    this.descriptor = descriptor;
    this.capacity = options && options.capacity || this.descriptor.maxIndexedVOPoolSize;
    this.maxAllocVOSize = options && options.maxAllocVOSize || 0;

    this.usage = options && options.usage || VOPool.USAGE.DYNAMIC;

    let voArray = options && options.voArray;
    if (voArray) {
      if (voArray.usage !== this.usage) {
        throw new Error(`VOPool usage(=${this.usage}) mismatch with given voArray(usage=${voArray.usage})`);
      }
    } else {
      voArray = descriptor.createVOArray(this.capacity, this.usage);
    }
    this.voArray = voArray;

    this.voZero = options && options.voZero || descriptor.createVO();
    this.voNew = options && options.voNew || descriptor.createVO();

    this.availableVOs = [];
    this.usedVOs = [];

    (0, _create_vertex_objects2.default)(this, this.maxAllocVOSize);
  }

  /**
   * Number of in use *vertex objects*.
   * @type {number}
   */

  get usedCount() {
    return this.usedVOs.length;
  }

  /**
   * Number of free and unused *vertex objects*.
   * @type {number}
   */

  get availableCount() {
    return this.capacity - this.usedVOs.length;
  }

  /**
   * Number of **allocated** *vertex objects*.
   * @type {number}
   */

  get allocatedCount() {
    return this.availableVOs.length + this.usedVOs.length;
  }

  /**
   * Return **size** *vertex objects*
   * @return {VertexObject|VertexObject[]}
   */

  alloc(size = 1) {
    if (size > 1) {
      const arr = [];
      for (let i = 0; i < size; ++i) {
        const vo = this.alloc(1);
        if (vo !== undefined) {
          arr.push(vo);
        } else {
          break;
        }
      }
      return arr;
    }

    const vo = this.availableVOs.shift();

    if (vo === undefined) {
      if (this.capacity - this.allocatedCount > 0) {
        (0, _create_vertex_objects2.default)(this, this.maxAllocVOSize);
        return this.alloc();
      } else {
        return;
      }
    }

    this.usedVOs.push(vo);

    vo.voArray.copy(this.voNew.voArray);

    return vo;
  }

  /**
   * @param {VertexObject|VertexObject[]} vo - vertex object(s)
   */

  free(vo) {
    if (Array.isArray(vo)) {
      vo.forEach(_vo => _vo.free());
      return;
    }

    const idx = this.usedVOs.indexOf(vo);

    if (idx === -1) return;

    const lastIdx = this.usedVOs.length - 1;

    if (idx !== lastIdx) {
      const last = this.usedVOs[lastIdx];
      vo.voArray.copy(last.voArray);

      const tmp = last.voArray;
      last.voArray = vo.voArray;
      vo.voArray = tmp;

      this.usedVOs.splice(idx, 1, last);
    }

    this.usedVOs.pop();
    this.availableVOs.unshift(vo);

    vo.voArray.copy(this.voZero.voArray);
  }
}

exports.default = VOPool;
VOPool.USAGE = _v_o_array2.default.USAGE;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (voPool, maxAllocSize = 0) {
  const max = voPool.capacity - voPool.usedCount - voPool.allocatedCount;
  const len = voPool.allocatedCount + (maxAllocSize > 0 && maxAllocSize < max ? maxAllocSize : max);

  for (let i = voPool.allocatedCount; i < len; i++) {
    let voArray = voPool.voArray.subarray(i);

    let vertexObject = voPool.descriptor.createVO(voArray);
    vertexObject.free = voPool.free.bind(voPool, vertexObject);

    voPool.availableVOs.push(vertexObject);
  }
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var basePick = __webpack_require__(134),
    flatRest = __webpack_require__(175);

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var basePickBy = __webpack_require__(135),
    hasIn = __webpack_require__(170);

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(136),
    baseSet = __webpack_require__(167),
    castPath = __webpack_require__(9);

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

module.exports = basePickBy;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(9),
    toKey = __webpack_require__(25);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(4),
    isSymbol = __webpack_require__(20);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(139);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(140);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(141);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(142),
    mapCacheDelete = __webpack_require__(162),
    mapCacheGet = __webpack_require__(164),
    mapCacheHas = __webpack_require__(165),
    mapCacheSet = __webpack_require__(166);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(143),
    ListCache = __webpack_require__(155),
    Map = __webpack_require__(161);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(144),
    hashDelete = __webpack_require__(151),
    hashGet = __webpack_require__(152),
    hashHas = __webpack_require__(153),
    hashSet = __webpack_require__(154);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(10);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(146),
    isMasked = __webpack_require__(147),
    isObject = __webpack_require__(24),
    toSource = __webpack_require__(149);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(21),
    isObject = __webpack_require__(24);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(148);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(19);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 149 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 150 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 151 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(10);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(10);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(10);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(156),
    listCacheDelete = __webpack_require__(157),
    listCacheGet = __webpack_require__(158),
    listCacheHas = __webpack_require__(159),
    listCacheSet = __webpack_require__(160);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 156 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(11);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(11);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(11);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(11);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(23),
    root = __webpack_require__(19);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 163 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(168),
    castPath = __webpack_require__(9),
    isIndex = __webpack_require__(44),
    isObject = __webpack_require__(24),
    toKey = __webpack_require__(25);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(169),
    eq = __webpack_require__(42);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(43);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(171),
    hasPath = __webpack_require__(172);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),
/* 171 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(9),
    isArguments = __webpack_require__(45),
    isArray = __webpack_require__(4),
    isIndex = __webpack_require__(44),
    isLength = __webpack_require__(174),
    toKey = __webpack_require__(25);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(21),
    isObjectLike = __webpack_require__(22);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 174 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__(176),
    overRest = __webpack_require__(180),
    setToString = __webpack_require__(182);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(177);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(178),
    isFlattenable = __webpack_require__(179);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),
/* 178 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8),
    isArguments = __webpack_require__(45),
    isArray = __webpack_require__(4);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(181);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 181 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(183),
    shortOut = __webpack_require__(186);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(184),
    defineProperty = __webpack_require__(43),
    identity = __webpack_require__(185);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 184 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 185 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 186 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = createVoPropsSetter;

var _parseCssStyledProperties = __webpack_require__(17);

var _parseCssStyledProperties2 = _interopRequireDefault(_parseCssStyledProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createVoPropsSetter(voData) {
  if (!voData) return;
  const voProps = (0, _parseCssStyledProperties2.default)(voData);
  if (!voProps || typeof voProps !== 'object') return;
  const attrKeys = Object.keys(voProps);
  return vo => {
    attrKeys.forEach(key => {
      const attrDesc = vo.descriptor.attr[key];
      if (attrDesc) {
        attrDesc.setValue(vo, voProps[key]);
      } else if (typeof vo[key] === 'function') {
        vo[key](voProps[key]);
      } else {
        vo[key] = voProps[key];
      }
    });
  };
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = isNonEmptyString;
function isNonEmptyString(str) {
  return typeof str === 'string' && str.length > 0;
}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = isNumberGreaterThanZero;
function isNumberGreaterThanZero(num) {
  return typeof num === 'number' && num > 0;
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = syncComponent;
function syncComponent(el, name) {
  if (el.blitpunk == null) return;
  if (Array.isArray(name)) {
    name.forEach(syncComponent.bind(null, el));
    return;
  }
  const data = el.getAttribute(name);
  if (data == null) return;
  el.blitpunk.componentRegistry.createOrUpdateComponent(el.entity, name, data);
}

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(192);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(194)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/postcss-loader/lib/index.js!./blitpunk.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!../../node_modules/postcss-loader/lib/index.js!./blitpunk.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(193)(undefined);
// imports


// module
exports.push([module.i, "blitpunk-canvas {\n  display: inline-block;\n  font-size: 0;\n  margin: 0;\n  padding: 0; }\n  blitpunk-canvas > canvas {\n    border: 0;\n    margin: 0;\n    overflow: hidden;\n    padding: 0;\n    -ms-touch-action: none;\n    touch-action: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n\nblitpunk-scene,\nblitpunk-texture-atlas,\nblitpunk-sprite-group {\n  display: none; }\n", ""]);

// exports


/***/ }),
/* 193 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(195);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 195 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});