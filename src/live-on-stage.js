"use strict";

var scan = require('scan.js'),
    check = require('check.js'),
    viewport = require('viewport.js');

viewport.measure();

// Initiate Live on Stage
if (scan()) {
    check();

    
    
    /*
    events.bind();
    viewport.measure();
    check();
    */
}

// Check element positions onScroll
window.addEventListener('scroll', check);

// Recache DOM positions on resize
document.addEventListener('calmresize', function () {
    viewport.measure();
    scan();
    check();
});

/*
module.exports = {
    add: ,
    cache: cache,
    scan: ,
    track: 
};
*/

module.exports = {
    scan: scan
};