"use strict";

var cache = [];

module.exports = {
    get: function () {
        return cache;
    },
    
    set: function (elements) {
        cache = elements;
    }
};