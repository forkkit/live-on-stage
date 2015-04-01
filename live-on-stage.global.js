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

	var liveOnStage = __webpack_require__(/*! ../live-on-stage.js */ 1);
	
	window.liveOnStage = liveOnStage;

/***/ },
/* 1 */
/*!******************************!*\
  !*** ./src/live-on-stage.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var cache = __webpack_require__(/*! ./utils/cache.js */ 2),
	    cacheElements = __webpack_require__(/*! ./utils/cache-elements.js */ 3),
	    notify = __webpack_require__(/*! ./utils/notify.js */ 4),
	    viewport = __webpack_require__(/*! ./utils/viewport.js */ 5),
	    
	    liveOnStage = {
	    
	        /*
	            Check element's onScreen position
	        */
	        check: function () {
	            viewport.update();
	
	            for (var key in cache) {
	                if (cache.hasOwnProperty(key)) {
	                    this.checkCache(key);
	                }
	            }
	        },
	        
	        /*
	            Check individual cache
	            
	            @param [object]: Cache to check
	        */
	        checkCache: function (key) {
	            var thisCache = cache[key];
	
	            thisCache.elements.forEach(function (element, i) {
	                var elementIsOnStage = viewport.checkOnStage(element),
	                    stopTracking = false;
	
	                // If element is on stage and previously wasn't, fire onstage event
	                if (elementIsOnStage && !element.onScreen) {
	                    stopTracking = notify(element, true, thisCache.onStage);
	                
	                // If element isn't on stage and previously was, fire offstage event
	                } else if (!elementIsOnStage && element.onScreen) {
	                    stopTracking = notify(element, false, thisCache.offStage);
	                }
	                
	                if (stopTracking) {
	                    element.dom.setAttribute('data-stop-tracking', true);
	                    delete thisCache.elements[i];
	                }
	            });
	        },
	    
	        /*
	            Refresh cached elements
	            
	            @param [string] (optional): Name of cache to refresh
	        */
	        refresh: function (selector) {
	            // If an attribute has been provided, refresh that cache
	            if (cache[selector]) {
	                this.track(selector, cache[selector].onStage, cache[selector].offStage);
	                
	            // Or refresh all caches
	            } else {
	                for (var key in cache) {
	                    if (cache.hasOwnProperty(key)) {
	                        this.track(key, cache[key].onStage, cache[key].offStage);
	                    }
	                }
	            }
	        },
	        
	        /*
	            Track elements
	            
	            @param [string || NodeList]: CSS selector or DOM selection
	            @param [function]: Function to call when element appears on stage
	            @param [function]: Function to call when element leaves stage
	        */
	        track: function (selector, onStage, offStage) {
	            var trackElements = (typeof selector == 'string') ? document.querySelectorAll(selector) : selector;
	            
	            if (trackElements.length) {
	                viewport.update();
	
	                cache[selector] = {
	                    elements: cacheElements(trackElements),
	                    onStage: onStage,
	                    offStage: offStage
	                };
	                
	                this.check();
	            }
	        }
	    };
	
	// Check all cached elements every time the viewport changes position
	window.addEventListener('scroll', function () { liveOnStage.check() });
	
	// Refresh position of all elements when the screen resizes
	window.addEventListener('resize', function () { liveOnStage.refresh() });
	
	module.exports = liveOnStage;


/***/ },
/* 2 */
/*!****************************!*\
  !*** ./src/utils/cache.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = {};

/***/ },
/* 3 */
/*!*************************************!*\
  !*** ./src/utils/cache-elements.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var viewport = __webpack_require__(/*! ./viewport.js */ 5);
	
	module.exports = function (elements) {
	    var elementArray = [];
	
	    [].slice.call(elements).forEach(function (element) {
	        var rect = element.getBoundingClientRect(),
	            buffer = element.getAttribute('data-buffer');
	            
	        if (element.getAttribute('data-stop-tracking') !== true) {
	            elementArray.push({
	                dom: element,
	                isOnStage: false,
	                buffer: parseInt(buffer) || 0,
	                top: rect.top + viewport.top,
	                left: rect.left + viewport.left,
	                bottom: rect.bottom + viewport.top,
	                right: rect.right + viewport.left
	            });
	        }
	    });
	    
	    return elementArray;
	};

/***/ },
/* 4 */
/*!*****************************!*\
  !*** ./src/utils/notify.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/*
	    Notify DOM element of new onScreen status
	*/
	module.exports = function (element, isOnStage, callback) {
	    element.isOnStage = isOnStage;
	
	    if (callback) {
	        return (callback(element.dom));
	    }
	};

/***/ },
/* 5 */
/*!*******************************!*\
  !*** ./src/utils/viewport.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var docElement = document.documentElement;
	
	module.exports = {
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	    
	    /*
	        Update viewport measurements
	    */
	    update: function () {
	        this.top = document.body.scrollTop;
	        this.left = document.body.scrollLeft;
	        this.bottom = this.top + docElement.clientHeight;
	        this.right = this.left + docElement.clientWidth;
	    },
	    
	    /*
	        Check if element is within viewport
	        
	        @param [object]: Cached element
	    */
	    checkOnStage: function (element) {
	        var buffer = element.buffer;
	    
	        return !(
	            this.bottom < (element.top - buffer) || // Element off bottom
	            this.top > (element.bottom + buffer) || // Element off top
	            this.left > (element.right + buffer) || // Element off left
	            this.right < (element.left - buffer)    // Element off right
	        );
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=live-on-stage.global.js.map