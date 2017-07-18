/*

# Closest Selector Mixin for reproCSS
## version 0.0.6

Apply CSS styles to the closest ancestor matching a CSS selector of HTML elements that match a CSS selector.

### Syntax

    closest(selectorList, element, rule)

- `selectorList` is a comma-separated string containing one or more CSS selectors
- `element` is a CSS selector
- `rule` is a semicolon-separated string containing one or more CSS declarations

### Example

    closest('#start', '.target', `border-color: lime`)

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function closest(selectorList, element, rule) {

  var tag = document.querySelectorAll(selectorList)
  var style = ''
  var count = 0

  for (var i = 0; i < tag.length; i++) {

    var attr = btoa(selectorList).replace(/=/g, '')

    tag[i].closest(element).setAttribute('data-closest-' + attr, count)

    style += '\n/* ' + selectorList + ':closest(' + element + ') */\n'
             + '[data-closest-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}