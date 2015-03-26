"use strict";

var cache = require('./cache.js'),
    viewport = require('../utils/viewport.js'),
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