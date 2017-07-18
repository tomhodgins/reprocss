/*

# Parent Selector Mixin for reproCSS
## version 0.0.6

Apply CSS styles to the direct parent of HTML elements matching a CSS selector.

### Syntax

    parent(selectorList, rule)

- `selectorList` is a comma-separated string containing one or more CSS selectors
- `rule` is a semicolon-separated string containing one or more CSS declarations

### Example

    parent('li', 'border: 1px solid red')

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function parent(selectorList, rule) {

  var tag = document.querySelectorAll(selectorList)
  var style = ''
  var count = 0

  for (var i = 0; i < tag.length; i++) {

    var attr = btoa(selectorList).replace(/=/g, '')

    tag[i].parentNode.setAttribute('data-parent-' + attr, count)

    style += '\n/* '+ selectorList + ':parent */\n'
             + '[data-parent-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}