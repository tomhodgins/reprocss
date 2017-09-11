/*

# Elder Selector Mixin for reproCSS
## version 0.0.9

This mixin lets CSS authors apply styles to all elder siblings of elements matching a CSS selector.

### Syntax

    elder(selector, rule)

- `selector` is a CSS selector
- `rule` is one or more CSS declarations separated by semicolons

### Example

    elder('.target', 'background: lime')

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function elder(selector, rule) {

  var tag = document.querySelectorAll(selector)
  var style = ''
  var count = 0

  for (var i=0; i<tag.length; i++) {

    var attr = selector.replace(/\W+/g, '')
    var sibling = tag[i].parentNode.getElementsByTagName('*')
    var tagIndex= [].indexOf.call(sibling, tag[i])

    for (var j=0; j<sibling.length; j++) {

      var siblingIndex = [].indexOf.call(sibling, sibling[j])

      if (siblingIndex < tagIndex) {

        sibling[j].setAttribute('data-elder-' + attr, count)

        style += '\n[data-elder-' + attr + '="' + count + '"] {\n'
                 + '  ' + rule + '\n'
                 + '}\n'
        count++

      } else {

        sibling[j].setAttribute('data-elder-' + attr, '')

      }

    }

  }

  return style

}