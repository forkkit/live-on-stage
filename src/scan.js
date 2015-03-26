"use strict";

var createShadowElements = require('./shadow/create.js'),
    check = require('./check.js');

module.exports = function () {
    var allElements = document.querySelectorAll('[data-on-stage]'),
        numElements = allElements.length;
    
    if (numElements) {
        createShadowElements([].slice.call(allElements));
        check();
        return true;
    }
};