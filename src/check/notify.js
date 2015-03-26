"use strict";

var generateEvent = function (name) {
        var event;
    
        if (window.CustomEvent) {
            event = new CustomEvent(name);
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(name, true, true);
        }
        
        return event;
    },
    
    onScreenEvent = generateEvent('onscreen'),
    offScreenEvent = generateEvent('offscreen');

/*
    Notify DOM element of new onScreen status
*/
module.exports = function (element, onScreen) {
    var event = onScreen ? onScreenEvent : offScreenEvent;
    
    element.onScreen = onScreen;

    element.dom.dispatchEvent(event);
};