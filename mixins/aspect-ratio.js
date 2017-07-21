/*

# Aspect Ratio Mixin for reproCSS
## version 0.0.7

Define a height for HTML elements based on the element's width and a supplied aspect ratio.

### Syntax

    aspectRatio(selectorList, ratio)

- `selectorList` is a comma-separated string containing one or more CSS selectors
- `ratio` is a number expressed as `width/height` or a number

### Example

    aspectRatio('iframe', 16/9)

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function aspectRatio(selectorList, ratio) {

  var tag = document.querySelectorAll(selectorList)
  var style = ''
  var count = 0

  for (var i=0; i < tag.length; i++) {

    var attr = btoa(selectorList).replace(/=/g,'')

    tag[i].setAttribute('data-aspect-ratio-' + attr, count)

    style += '\n/* ' + selectorList + ' { aspect-ratio: ' + ratio + '; } */\n'
             + '[data-aspect-ratio-' + attr + '="' + count + '"] {\n'
             + '  height: ' + (tag[i].offsetWidth / ratio) + 'px;\n'
             + '}\n'

    count++

  }

  return style

}