"use strict";

var cache = require('../shadow/cache.js'),
    checkSingleElement = require('./single.js'),
    viewport = require('../utils/viewport.js');

module.exports = function () {
    var i = 0,
        cacheLength = cache.length;
        
    viewport.update();

    for (; i < cacheLength; i++) {
        checkSingleElement(cache[i]);
    }
};