# Live on Stage

An extendable plugin that tracks when DOM elements appear on and off screen

## Install

### File include

Download the latest live-on-stage.global.min.js from http://github.com/InventingWithMonster/live-on-stage and include it in your HTML document with a script tag, ie:

```html
<script src="/path/to/live-on-stage.global.min.js"></script>
```

This will load Live on Stage to the globally-accessible variable ```liveOnStage```.

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

Live on Stage works in two steps: 1) Tracking elements and 2) acting when they move on and off screen.

### Track

When the module is first loaded, it will scan the page for elements with a ```data-on-stage``` attribute.

```html
<div data-on-stage></div>
```

These elements will receive onStage and offStage events whenever they enter/leave the viewport.

You can manually rescan the page in the event that elements have been added/removed:

```javascript
liveOnStage.refresh();
```

### Act

Tracked elements will receive ```onscreen``` and ```offscreen``` events, so you can provide them with event listeners the same way you would listen to ```mousedown``` or other events.

For bigger jobs, you can add custom modules that will act automatically on elements with both ```data-on-screen``` and ```data-your-module-name``` attributes.

To add a module, you use the ```.add()``` method. Here's an example module:

```javascript
liveOnStage.add({
    name: 'lazy-load', // (required)
    defaultBuffer: 100,
    onScreen: onScreenHandler,
    offScreen: offScreenHandler
});
```

To fire these onscreen and offscreen events you simply need to add an element like this:

```html
<img data-on-stage data-lazy-load="your-image-url.png" />
```

## API

### .add(module)

Add a new Live on Stage module. A module is an object with a required ```name``` property, and optional ```onScreen``` and ```offScreen``` methods to be called any time an element with the ```data-your-module-name``` attribute moves on/off screen.

### .refresh()

Scans the DOM for elements with the ```data-on-stage``` attribute. This is run automatically on page load, but can be manually run in the event that new DOM elements are added to the page.

## Options

### Buffer
To add a buffer to the viewport on a per-element basis, you can add a data-stage-buffer attribute. It works with either absolute pixel values and percentages:
            
Will add 100 pixels of visibility to the beginning and end of viewport
```html
<div data-on-stage data-stage-buffer="100"></div>
```
            
Will remove 100 pixels of visibility either side of viewport
```html
<div data-on-stage data-stage-buffer="-100"></div>
```

If viewport is 500px high, this will add 50px of visibility
```html
<div data-on-stage data-stage-buffer="10%"></div>
```          
