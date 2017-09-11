/*

# AutoExpand Mixin for reproCSS
## version 0.0.9

Automatically expand an HTML element's `width` or `height` to match its `scrollWidth`, `scrollHeight`, or both.

### Syntax

    autoExpand(selector, direction)

- `selector` is a CSS selector
- `direction` is a string matching `width`, `height`, or `both`

### Example

    autoExpand('textarea', 'height')

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function autoExpand(selector, direction) {

  var tag = document.querySelectorAll(selector)

  for (var i=0; i < tag.length; i++) {

    if (direction == 'width' || direction == 'both') {

      tag[i].style.width = ''
      tag[i].style.width = tag[i].scrollWidth + 'px'

    }

    if (direction == 'height' || direction == 'both') {

      tag[i].style.height = ''
      tag[i].style.height = tag[i].scrollHeight + 'px'

    }

  }

  return '\n/* ' + selector + ' { ' + direction +': auto-expand; } */\n'

}