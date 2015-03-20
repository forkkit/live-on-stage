"use strict";

var cache = require('cache.js');

module.exports = function () {
    // Find all elements with data-on-stage attribute
    allElements = [].prototype.slice.call(document.querySelectorAll('[data-on-stage]'));
    
    // Cache all elements
    cache.set(allElements);
    
    // Return number of tracked elements
    return allElements.length;
};