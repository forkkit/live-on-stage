"use strict";

var docElement = document.documentElement;

module.exports = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
    update: function () {
        this.top = document.body.scrollTop;
        this.left = document.body.scrollLeft;
        this.bottom = this.top + docElement.clientHeight;
        this.right = this.left + docElement.clientWidth;
    }
};