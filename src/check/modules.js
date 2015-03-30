"use strict";

var createEvent = function (eventName, moduleName, callback, remove) {
        if (callback) {
            document.addEventListener(eventName, function (e) {
                var target = e.target,
                    moduleDataTag = 'data-' + moduleName;

                if (target && target.hasAttribute(moduleDataTag)) {
                    callback(target);
                    
                    if (remove) {
                        target.removeAttribute(moduleDataTag);
                    }
                }
            });
        }
    };

module.exports = function (module) {
    createEvent('onscreen', module.name, module.onScreen, module.removeOnScreen);
    createEvent('offscreen', module.name, module.offScreen, module.removeOffScreen);
};