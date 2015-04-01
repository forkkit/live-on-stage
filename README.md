# Live on Stage

Tracks the position of DOM elements and emits `onscreen` and `offscreen` events.

## Install

### File include

Download the latest live-on-stage.global.min.js from http://github.com/InventingWithMonster/live-on-stage and include it in your HTML document with a script tag, ie:

```html
<script src="/path/to/live-on-stage.global.min.js"></script>
```

This will load Live on Stage to the globally-accessible variable `liveOnStage`.

### NPM (recommended)

First install Live on Stage in your project root.

```  
$ npm install live-on-stage
```

Then include in your module using require().

```javascript
var liveOnStage = require('live-on-stage');
```

## Use

### Track elements

**.track(attribute, onStage, offStage)**

Track the position of elements by providing an attribute to the `track` method and optional onStage and offStage callbacks.

The following code tracks any element with a `data-track-position` attribute:

```javascript
liveOnStage.track('data-track-position', function (element) {
    // Fires when element moves into viewport
});
```

You can track as many different groups of elements as you like.

### Stop tracking an element

When an onStage or offStage callback returns `true`, Live on Stage will stop tracking that element.

### Refresh a selection

As elements are added or removed from the DOM, you'll want to update the elements you're tracking:

```javascript
liveOnStage.refresh(); // Refreshes all selections
liveOnStage.refresh('data-track-position'); // Refreshes elements with provided attribute
```

## Options

### Buffer
To add a buffer to the viewport on a per-element basis, you can add a data-stage-buffer attribute. It works with either absolute pixel values and percentages:
            
Will add 100 pixels of visibility to the beginning and end of viewport
```html
<div data-stage-buffer="100"></div>
```
            
Will remove 100 pixels of visibility either side of viewport
```html
<div data-stage-buffer="-100"></div>
```

If viewport is 500px high, this will add 50px of visibility
```html
<div data-stage-buffer="10%"></div>
```          
