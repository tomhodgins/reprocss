/*

# Ancestor Selector Mixin for reproCSS
## version 0.0.9

This mixin lets CSS authors apply styles to all ancestor elements matching a CSS selector to another element matching a given CSS selector. You can use this to style all matching ancestors.

### Syntax

    ancestor(selector, ancestor, rule)

- `selector` is a CSS selector
- `ancestor` is a CSS selector
- `rule` is one or more CSS declarations separated by semicolons

### Example

    ancestor('#start', '.target', `border-color: lime`)

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

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