"use strict";

var createEvent = function (eventName, moduleName, callback) {
        document.addEventListener(eventName, function (e) {
            if (e.target && e.target.hasAttribute('data-' + module.name)) {
                callback(e.target);
            }
        });
    };

module.exports = function (module) {
    createEvent('onscreen', module.name, module.onScreen);
    createEvent('offscreen', module.name, module.offScreen);
};