"use strict";

var cache = require('./cache.js'),
    isOnScreen = require('./is-on-screen.js'),
    notify = require('./notify.js'),
    viewport = require('./viewport.js'),
    
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

                    thisCache.elements.forEach(function (element) {
                        var elementIsOnStage = isOnScreen(element);

                        // If element is on stage and previously wasn't, fire onstage event
                        if (elementIsOnStage && !element.onScreen) {
                            notify(element, true);
                        
                        // If element isn't on stage and previously was, fire offstage event
                        } else if (!elementIsOnStage && element.onScreen) {
                            notify(element, false);
                        }
                    });
                }
            }
        },
    
        /*
            Refresh cached elements
            
            @param [string]: Name of cache to refresh
        */
        refresh: function (attr) {
            var thisCache = cache[attr];
            
            if (thisCache) {
                this.track(attr, thisCache.onStage, thisCache.offStage);
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
                
                    thisCache.push({
                        dom: element,
                        onScreen: false,
                        buffer: parseInt(buffer) || 0,
                        top: rect.top + viewport.top,
                        left: rect.left + viewport.left,
                        bottom: rect.bottom + viewport.top,
                        right: rect.right + viewport.left
                    });
                });
                
                this.check();
            }
        }
    };

// Check all cached elements every time the viewport changes position
window.addEventListener('scroll', liveOnStage.check);

// Recache DOM positions when the screen resizes
document.addEventListener('resize', liveOnStage.refresh);

module.exports = liveOnStage;