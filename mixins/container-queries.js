/*

# Container Queries Mixin for reproCSS
## version 0.0.7

Define a 'container' using a CSS selector, run a JavaScript test on matching HTML elements, and apply CSS styles to the container or its child elements if the test resolves `true`.

### Syntax

    container(containerList, condition, childList, rule)

- `containerList` is a comma-separated string containing one or more CSS selectors
- `condition` is a JavaScript test that should evaluate to `true` or `false`
- `childList` is a comma-separated string containing one or more CSS selectors
- `rule` is a semicolon-separated string containing one or more CSS declarations

### Example

    container('div', 'this.offsetWidth > 500', 'span', 'background: lime')

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function container(containerList, condition, childList, rule) {

  var tag = document.querySelectorAll(containerList)
  var style = ''
  var count = 0

  for (var i=0; i < tag.length; i++) {

    var attr = btoa(containerList).replace(/=/g, '')

    var func = new Function('return ' + condition)

    if (func.call(tag[i])) {

      tag[i].setAttribute('data-container-' + attr, count)

      var container = '[data-container-' + attr + '="' + count + '"]'

      style += '\n/* ' + containerList + '(' + condition + ') ' + childList + ' */\n'
               + container + ' ' + childList + ' {\n'
               + '  ' + rule + '\n'
               + '}\n'

      count++

    } else {

      tag[i].setAttribute('data-container-' + attr, '')

    }

  }

  return style

}