/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./src/utils/global.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	window.liveOnStage = __webpack_require__(/*! ../live-on-stage.js */ 1);

/***/ },
/* 1 */
/*!******************************!*\
  !*** ./src/live-on-stage.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var check = __webpack_require__(/*! ./check/all.js */ 2),
	    scan = __webpack_require__(/*! ./utils/scan.js */ 3);
	
	// Check all cached elements every time the viewport changes position
	window.addEventListener('scroll', check);
	
	// Recache DOM positions when the screen resizes
	document.addEventListener('resize', scan);
	
	// Scan onload
	scan();
	
	// Export methods
	module.exports = {
	    refresh: scan
	};

/***/ },
/* 2 */
/*!**************************!*\
  !*** ./src/check/all.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var cache = __webpack_require__(/*! ../shadow/cache.js */ 4),
	    checkSingleElement = __webpack_require__(/*! ./single.js */ 5),
	    viewport = __webpack_require__(/*! ../utils/viewport.js */ 6);
	
	module.exports = function () {
	    var i = 0,
	        cacheLength = cache.length;
	        
	    viewport.update();
	        
	    for (; i < cacheLength; i++) {
	        checkSingleElement(cache[i]);
	    }
	};

/***/ },
/* 3 */
/*!***************************!*\
  !*** ./src/utils/scan.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var createShadowElements = __webpack_require__(/*! ../shadow/create.js */ 7),
	    checkAll = __webpack_require__(/*! ../check/all.js */ 2);
	
	module.exports = function () {
	    var allElements = document.querySelectorAll('[data-on-stage]'),
	        numElements = allElements.length;
	    
	    if (numElements) {
	        createShadowElements([].slice.call(allElements));
	        checkAll();
	        return true;
	    }
	};

/***/ },
/* 4 */
/*!*****************************!*\
  !*** ./src/shadow/cache.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = [];

/***/ },
/* 5 */
/*!*****************************!*\
  !*** ./src/check/single.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var notify = __webpack_require__(/*! ./notify.js */ 8),
	    viewport = __webpack_require__(/*! ../utils/viewport.js */ 6),
	
	    isOnScreen = function (element) {
	        var buffer = element.buffer;
	
	        return !(
	            viewport.bottom < (element.top - buffer) || // Element off bottom
	            viewport.top > (element.bottom + buffer) || // Element off top
	            viewport.left > (element.right + buffer) || // Element off left
	            viewport.right < (element.left - buffer)    // Element off right
	        );
	    };
	
	module.exports = function (element) {
	    var elementIsOnStage = isOnScreen(element);
	
	    // If element is on stage and previously wasn't, fire onstage event
	    if (elementIsOnStage && !element.onScreen) {
	        notify(element, true);
	    
	    // If element isn't on stage and previously was, fire offstage event
	    } else if (!elementIsOnStage && element.onScreen) {
	        notify(element, false);
	    }
	};

/***/ },
/* 6 */
/*!*******************************!*\
  !*** ./src/utils/viewport.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var docElement = document.documentElement;
	
	module.exports = {
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	    
	    update: function () {
	        this.top = document.body.scrollTop;
	        this.left = document.body.scrollLeft;
	        this.bottom = this.top + docElement.clientHeight;
	        this.right = this.left + docElement.clientWidth;
	    }
	};

/***/ },
/* 7 */
/*!******************************!*\
  !*** ./src/shadow/create.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var cache = __webpack_require__(/*! ./cache.js */ 4),
	    viewport = __webpack_require__(/*! ../utils/viewport.js */ 6),
	    scrollTop, scrollLeft,
	
	    /*
	        @param [DOMElement]
	    */
	    cacheElement = function (element) {
	        var rect = element.getBoundingClientRect(),
	            buffer = element.getAttribute('data-screen-buffer');
	
	        cache.push({
	            dom: element,
	            onScreen: false,
	            buffer: parseInt(buffer) || 0,
	            top: rect.top + scrollTop,
	            left: rect.left + scrollLeft,
	            bottom: rect.bottom + scrollTop,
	            right: rect.right + scrollLeft
	        });
	    };
	
	/*
	    @param [array]
	*/
	module.exports = function (elements) {
	    var numElements = elements.length,
	        i = 0;
	    
	    viewport.update();
	        
	    scrollTop = viewport.top;
	    scrollLeft = viewport.left;
	    
	    for (; i < numElements; i++) {
	        cacheElement(elements[i]);
	    }
	};

/***/ },
/* 8 */
/*!*****************************!*\
  !*** ./src/check/notify.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var generateEvent = function (name) {
	        var event;
	    
	        if (window.CustomEvent) {
	            event = new CustomEvent(name);
	        } else {
	            event = document.createEvent('CustomEvent');
	            event.initCustomEvent(name, true, true);
	        }
	        
	        return event;
	    },
	    
	    onScreenEvent = generateEvent('onscreen'),
	    offScreenEvent = generateEvent('offscreen');
	
	/*
	    Notify DOM element of new onScreen status
	*/
	module.exports = function (element, onScreen) {
	    var event = onScreen ? onScreenEvent : offScreenEvent,
	        dom = element.dom;
	    
	    element.onScreen = onScreen;
	
	    dom.dispatchEvent(event);
	    
	    if (dom.hasAttribute('data-lazy-load')) {
	        
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=live-on-stage.global.js.map