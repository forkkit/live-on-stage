"use strict";

var cache = require('cache.js'),
    check = require('check.js'),
    events = require('events.js'),
    viewport = require('viewport.js');

// Initiate Live on Stage
if (cache()) {
    events.bind();
    /*
    events.bind();
    viewport.measure();
    check();
    */
}

/*
module.exports = {
    add: ,
    cache: cache,
    scan: ,
    track: 
};
*/

module.exports = {
    cache: cache.refresh
};