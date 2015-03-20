"use strict";

var cache = [];

module.exports = {
    get: function () {
        return cache;
    },
    
    refresh: function () {
        cache = [].prototype.slice.call(document.querySelectorAll('[data-on-stage]'));
        return cache.length;
    }
};