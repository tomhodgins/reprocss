/*

# Parent Selector Mixin for reproCSS
## version 0.0.10

Apply CSS styles to the direct parent of HTML elements matching a CSS selector.

### Syntax

    parent(selector, rule)

- `selector` is CSS selector
- `rule` is one or more CSS declarations separated by semicolons

### Example

    parent('li', 'border: 1px solid red')

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function parent(selector, rule) {

  var tag = document.querySelectorAll(selector)
  var style = ''
  var count = 0

  for (var i = 0; i < tag.length; i++) {

    var attr = selector.replace(/\W+/g, '')

    tag[i].parentNode.setAttribute('data-parent-' + attr, count)

    style += '\n/* '+ selector + ':parent */\n'
             + '[data-parent-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}
