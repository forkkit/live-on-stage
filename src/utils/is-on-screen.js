"use strict";

var viewport = require('./viewport.js');

module.exports = function (element) {
    var buffer = element.buffer;

    return !(
        viewport.bottom < (element.top - buffer) || // Element off bottom
        viewport.top > (element.bottom + buffer) || // Element off top
        viewport.left > (element.right + buffer) || // Element off left
        viewport.right < (element.left - buffer)    // Element off right
    );
};