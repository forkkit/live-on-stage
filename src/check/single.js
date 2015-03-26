"use strict";

var notify = require('./notify.js'),
    viewport = require('../viewport.js'),

    isOnScreen = function (element) {
        var buffer = element.buffer;

        return !(
            viewport.bottom < (element.top - buffer) || // Element off bottom
            viewport.top > (element.bottom + buffer) || // Element off top
            viewport.left > (element.right + buffer) || // Element off left
            viewport.right < (element.left - buffer)    // Element off right
        );
    };

module.exports = function (element) {
    var elementIsOnStage = isOnScreen(element);

    // If element is on stage and previously wasn't, fire onstage event
    if (elementIsOnStage && !element.onScreen) {
        notify(element, true);
    
    // If element isn't on stage and previously was, fire offstage event
    } else if (!elementIsOnStage && element.onScreen) {
        notify(element, false);
    }
};