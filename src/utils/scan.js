"use strict";

var createShadowElements = require('../shadow/create.js'),
    checkAll = require('../check/all.js');

module.exports = function () {
    var allElements = document.querySelectorAll('[data-on-stage]'),
        numElements = allElements.length;

    if (numElements) {
        createShadowElements([].slice.call(allElements));
        checkAll();
        return true;
    }
};