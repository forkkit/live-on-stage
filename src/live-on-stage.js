"use strict";

var check = require('./check.js'),
    scan = require('./scan.js');

// Check all cached elements every time the viewport changes position
window.addEventListener('scroll', check);

// Recache DOM positions when the screen resizes
document.addEventListener('resize', scan);

// Scan onload
scan();

// Export methods
module.exports = {
    refresh: scan
};