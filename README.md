
![](http://i.imgur.com/HWpgrOP.png)

# reproCSS

**A flexible CSS reprocessor using `<style>` tags**

Can you imagine if you could interpolate JS inside CSS with the `${}` syntax, and also control when and how frequently that CSS reprocessed with a `process=""` attribute on the `<style>` tag:

![](http://i.imgur.com/6SkRCIm.png)

```html
<style process="none"></style>
<style process="once"></style>
<style process="auto"></style>
<style process="touchstart mousedown"></style>
```

If you are using reproCSS with custom events, you may also optionally use a `selector` attribute specify a list of one or more CSS selectors you would like to add event listeners for. If no `selector` attribute is found all custom events will be applied to window.

```
<style process="click" selector="#any, .css, [selector]"></style>
```

  You can add the CSS you want reprocss.js to apply to your HTML in `<style>` tags with the following values on the `process` attribute:

  - `none` means no reprocessing
  - `once` means process immediately and never again
  - `auto` runs every `resize`, `input`, and `click` event on window
  - any space-separated list of JS events you wish to listen for

## How to use reproCSS

### Github

Include the `reprocss.js` JavaScript plugin in your HTML:

```html
<script src="reprocss.js"></script>
```

### npm

If you are using reproCSS on NPM you can include it in your JS modules with a line like this:

```javascript
const reprocss = require('reprocss')
```

## How to write reproCSSed CSS

To evaluate JavaScript inside the CSS as it's being reprocessed by `reprocss.js` you can use the `${}` interpolation syntax. The following `<style>` tag would always ensure the `<div>` in this example was half of the window's height:

```html
<style process="auto">
  div {
    height: calc(${innerHeight}px / 2);
  }
</style>
```

When the browser is 1000px tall the `${innerHeight}` in our CSS will be output as `500`, leading to the following output:

```html
<style process="auto">
  div {
    height: calc(500px / 2);
  }
</style>
```

Currently this plugin only supports `<style>` tags, but it may be possible to support CSS loaded via `<link>` with a similar technique.

## Examples

### Interpolating JS-supplied values in CSS content:;

![](http://i.imgur.com/cW0yNMG.png)

```html
<div>Hello</div>

<script>
  var user = 'Username'
</script>

<style process="once">
  div:after {
    content: ' ${user}';
  }
</style>
```

### Element Queries via a JS Selector Resolver

![](http://i.imgur.com/1mGaC41.png)

```html
<div id="demo">
  <p>Hello</p>
</div>

<style process="resize">
  ${demo.offsetWidth > 400 && "#demo"} {
    background: lime;
  }
  ${demo.offsetWidth > 400 && "#demo"} p {
    color: red;
  }
</style>
```

### JS interpolation in CSS

![](http://i.imgur.com/rNZHUXN.png)

```html
<textarea id="demo"></textarea>

<style process="input">
  #demo {
    background: hsl(${demo.value.length}, 50%, 50%)
  }
</style>
```

## Demos

- [Element Queries with reproCSS](test/element-queries.html)
- [Min/Max Font Size](https://codepen.io/tomhodgins/pen/ZyraEQ)
- [Attribute Values as Numbers](https://codepen.io/tomhodgins/pen/QgQqwx)
- [Regex Search on Attribute Value](https://codepen.io/tomhodgins/pen/MoQmdY)
- [Cursor Tracking](https://codepen.io/tomhodgins/pen/MoQmLY)
- [Scalable Iframe](https://codepen.io/tomhodgins/pen/awqWNz)
- [**View more reproCSS demos on CodePen**](https://codepen.io/search/pens/?q=reprocss)

## Mixins

Writing mixins for reproCSS is easy, any JavaScript function that outputs code that can be used in CSS can be called from anywhere in the stylesheet reproCSS is processing using JS interpolation with `${}`.

An example of a common mixin template might look like this:

```javascript
function mixin(selector, rule) {

  // Find tags in document matching selector
  var tag = document.querySelectorAll(selector)

  // Begin with an empty style
  var style = ''

  // Begin counting matching tags at 0
  var count = 0

  // For each tag matching our selector
  for (var i=0; i<tag.length; i++) {

    // Create an identifier based on the selector used
    var attr = selector.replace(/\W+/g, '')

    // Mark tag with a custom attribute containing identifier and count
    tag[i].setAttribute('data-mixin-' + attr, count)

    // Add a copy of the CSS rule to the style using a selector for this tag's unique attribute
    style += '\n[data-mixin-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    // Increment the tag counter by +1
    count++

  }

  // Return all generated styles as CSS text
  return style

}
```

If you were going to create a mixin starting from the template above the first thing you'd want to do is change the function name (currently `mixin()`) to something unique, as well as update the mentions of `mixin` inside the mixin logic where it's used to name the elements the mixin is styling, `data-mixin`. Once you have changed the name of the function, you can pass a CSS selector or a list of CSS selectors into to the plugin, along with CSS properties and values as a string to be processed and added to new rules. This basic template can be extended in many ways to support different things. Here are some examples of reproCSS mixins and helper functions:

### Aspect Ratio Mixin

This mixin lets you to define an aspect ratio for elements.

#### syntax

```javascript
aspectRatio('iframe', 16/9)
```

#### output

```css
/* iframe { aspect-ratio: 1.77; } */
[data-aspect-ratio-unique="0"] {
  height: 503px;
}
```

#### demo

- [Aspect Ratio Mixin Demo](https://tomhodgins.github.io/reprocss/test/aspect-ratio-mixin.html)


### XPath Selector Mixin

This mixin lets you use XPath as a selector for CSS rules.

#### syntax

```javascript
xpath('//*', `
  border: 1px solid red;
`)
```

#### output

```css
/*

//* {
  border: 1px solid red;
}

*/
[data-xpath-unique="0"] {
  border: 1px solid red;
}
```

#### demo

- [XPath Selector Mixin Demo](https://tomhodgins.github.io/reprocss/test/xpath-selector-mixin.html)


### Auto Expand Mixin

This mixin lets you choose between auto-expanding an element's width and height to match its `scrollWidth` or `scrollHeight`. Available keywords are `width`, `height`, and `both`.

#### syntax

```javascript
autoExpand('textarea', 'height')
```

#### output

```css
/* textarea { height: auto-expand; } */
```

#### demo

- [Auto Expand Mixin Demo](https://tomhodgins.github.io/reprocss/test/auto-expand-mixin.html)


### Container Queries Mixin

This mixin lets you define a 'container' using a CSS selector, run a JavaScript test against matching tags that match the container's selector, and to apply a CSS rule to that container or its children.

#### syntax

```javascript
container('div', 'this.offsetWidth > 500', 'span', 'background: lime;')
```

#### output

```css
/* div(this.offsetWidth > 500) span */
[data-container-unique="0"] span {
  background: lime;
}
```

#### demo

- [Container Queries Mixin Demo](https://tomhodgins.github.io/reprocss/test/container-queries-mixin.html)


### Scoped Eval() Mixin

This mixin lets you define a CSS selector list, and to output CSS rules with JS interpolation from the context of each element in the document matching the selector.

#### syntax

```javascript
scoped('div', `
  margin: 1em;
  background: lime;
  height: eval(this.offsetWidth / (16/9))px;
`)
```

#### output

```css
/* Scope: div */
[data-scoped-unique="0"] {
  margin: 1em;
  background: lime;
  height: 144.5625px;
}
```

#### demo

- [Scoped Eval() Mixin Demo](https://tomhodgins.github.io/reprocss/test/scoped-eval-mixin.html)


### Parent Selector Mixin

This mixin lets you define a CSS selector list and apply a CSS rule to the parent node of any matching tags in your document.

#### syntax

```javascript
parent('li', 'border: 1px solid red;')
```

#### output

```css
/* li:parent */
[data-parent-unique="0"] {
  border: 1px solid red;
}
```

#### demo

- [Parent Selector Mixin Demo](https://tomhodgins.github.io/reprocss/test/parent-selector-mixin.html)


### Prev Selector Mixin

This mixin lets you define a CSS selector list and apply a CSS rule to the previous sibling node of any matching tags in your document.

#### syntax

```javascript
prev('li:nth-of-type(2)', 'background: lime;')
```

#### output

```css
/* li:prev */
[data-prev-unique="0"] {
  background: lime;
}
```

#### demo

- [Prev Selector Mixin Demo](https://tomhodgins.github.io/reprocss/test/parent-selector-mixin.html)


### Closest Selector Mixin

This mixin lets CSS authors apply styles to the nearest element matching a CSS selector to another element matching a given CSS selector. You can use this to find the nearest matching ancestor.

#### syntax

```javascript
closest('#start', '.target', `border-color: lime`)
```

#### output

```css
/* #start:closest(.target) */
[data-closest-unique="0"] {
  border-color: lime
}
```

#### demo

- [Closest Selector Mixin Demo](https://tomhodgins.github.io/reprocss/test/closest-selector-mixin.html)


<<<<<<< HEAD
### Ancestor Selector Mixin

This mixin lets CSS authors apply styles to all ancestor elements matching a CSS selector to another element matching a given CSS selector. You can use this to style all matching ancestors.

#### syntax

```javascript
ancestor('#start', '.target', `border-color: lime`)
```

#### output

```css
/* #start:ancestor(.target) */
[data-ancestor-unique="0"] {
  border-color: lime;
}
```


## code

```javascript
function ancestor(selector, ancestor, rule) {

  var tag = document.querySelectorAll(ancestor)
  var style = ''
  var count = 0

  for (var i=0; i<tag.length; i++) {

    var descendant = tag[i].querySelector(selector)

    if (descendant) {

      var attr = (selector+ancestor).replace(/\W+/g, '')

      tag[i].setAttribute('data-ancestor-' + attr, count)

      style += '\n/* ' + selector + ':ancestor(' + ancestor + ') */\n'
             + '[data-ancestor-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

      count ++

    }

  }

  return style

}
```

## demo

- [Ancestor Selector Mixin Demo](https://tomhodgins.github.io/reprocss/test/ancestor-selector-mixin.html)

> Made with ♥ by [@innovati](http://twitter.com/innovati)