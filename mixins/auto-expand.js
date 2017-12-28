/*

# AutoExpand Mixin for reproCSS
## version 0.0.10

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

      var borderLeft = measure(tag[i], 'border-left-width')
      var borderRight = measure(tag[i], 'border-right-width')
      var paddingLeft = measure(tag[i], 'padding-left')
      var paddingRight = measure(tag[i], 'padding-right')

      tag[i].style.width = ''
      tag[i].style.width = borderLeft + paddingLeft
                           + tag[i].scrollWidth
                           + paddingRight + borderRight + 'px'

    }

    if (direction == 'height' || direction == 'both') {

      var borderTop = measure(tag[i], 'border-top-width')
      var borderBottom = measure(tag[i], 'border-bottom-width')
      var paddingTop = measure(tag[i], 'padding-top')
      var paddingBottom = measure(tag[i], 'padding-bottom')

      tag[i].style.height = ''
      tag[i].style.height = borderTop + paddingBottom
                           + tag[i].scrollHeight
                           + paddingTop + borderBottom + 'px'

    }

  }

  function measure(tag, property) {

    return parseInt(
             window.getComputedStyle(tag, null)
               .getPropertyValue(property)
                 .replace(/px$/, ''))

  }

  return '\n/* ' + selector + ' { ' + direction +': auto-expand; } */\n'

}
