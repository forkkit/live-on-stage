"use strict";

var cache = require('./utils/cache.js'),
    isOnScreen = require('./utils/is-on-screen.js'),
    notify = require('./utils/notify.js'),
    viewport = require('./utils/viewport.js'),
    
    STOP_TRACKING = 'data-stop-tracking',
    
    liveOnStage = {
    
        /*
            Check element's onScreen position
        */
        check: function () {
            var thisCache;

            viewport.update();

            for (var key in cache) {
                if (cache.hasOwnProperty(key)) {
                    thisCache = cache[key];

                    thisCache.elements.forEach(function (element, i) {
                        var elementIsOnStage = isOnScreen(element),
                            stopTracking = false;

                        // If element is on stage and previously wasn't, fire onstage event
                        if (elementIsOnStage && !element.onScreen) {
                            stopTracking = notify(element, true, thisCache.onStage);
                        
                        // If element isn't on stage and previously was, fire offstage event
                        } else if (!elementIsOnStage && element.onScreen) {
                            stopTracking = notify(element, false, thisCache.offStage);
                        }
                        
                        if (stopTracking) {
                            element.dom.setAttribute(STOP_TRACKING, true);
                            delete thisCache.elements[i];
                        }
                    });
                }
            }
        },
    
        /*
            Refresh cached elements
            
            @param [string] (optional): Name of cache to refresh
        */
        refresh: function (attr) {
            // If an attribute has been provided, refresh that cache
            if (cache[attr]) {
                this.track(attr, cache[attr].onStage, cache[attr].offStage);
                
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
            
            @param [string]: Data attribute to track
            @param [function]: Function to call when element appears on stage
            @param [function]: Function to call when element leaves stage
        */
        track: function (attr, onStage, offStage) {
            var trackElements = document.querySelectorAll('[' + attr + ']'),
                thisCache;
            
            if (trackElements.length) {
                cache[attr] = {
                    elements: [],
                    onStage: onStage,
                    offStage: offStage
                };
                
                thisCache = cache[attr].elements;
        
                viewport.update();
    
                // Iterate over a an array of our DOM selection
                [].slice.call(trackElements).forEach(function (element) {
                    var rect = element.getBoundingClientRect(),
                        buffer = element.getAttribute('data-screen-buffer');
                
                    if (!element.hasAttribute(STOP_TRACKING)) {
                        thisCache.push({
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
                
                this.check();
            }
        }
    };

// Check all cached elements every time the viewport changes position
window.addEventListener('scroll', function () { liveOnStage.check() });

// Refresh position of all elements when the screen resizes
window.addEventListener('resize', function () { liveOnStage.refresh() });

module.exports = liveOnStage;
