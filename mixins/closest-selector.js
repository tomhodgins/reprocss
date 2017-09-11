/*

# Closest Selector Mixin for reproCSS
## version 0.0.9

This mixin lets CSS authors apply styles to the nearest element matching a CSS selector to another element matching a given CSS selector. You can use this to find the nearest matching ancestor.

### Syntax

    closest(selector, ancestor, rule)

- `selector` is a CSS selector
- `ancestor` is a CSS selector
- `rule` is one or more CSS declarations separated by semicolons

### Example

    closest('#start', '.target', `border-color: lime`)

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function closest(selector, ancestor, rule) {

  var tag = document.querySelectorAll(selector)
  var style = ''
  var count = 0

  for (var i = 0; i < tag.length; i++) {

    var attr = (selector+ancestor).replace(/\W+/g, '')

    tag[i].closest(ancestor).setAttribute('data-closest-' + attr, count)

    style += '\n/* ' + selector + ':closest(' + ancestor + ') */\n'
             + '[data-closest-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}