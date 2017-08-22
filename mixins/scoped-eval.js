/*

# Scoped JS Interopation Mixin for reproCSS
## version 0.0.7

Evaluate JavaScript from the context of each HTML element that matches the supplied CSS selector list.

### Syntax

    scoped(selectorList, rule)

- `selectorList` is a comma-separated string containing one or more CSS selectors
- `rule` is a semicolon-separated string containing one or more CSS declarations

### Example

    scoped('div', 'height: eval(this.offsetWidth / (16/9))px')

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function scoped(selectorList, rule) {

  var tag = document.querySelectorAll(selectorList)
  var style = ''
  var count = 0

  for (var i=0; i < tag.length; i++) {

    var attr = btoa(selectorList).replace(/=/g, '')

    tag[i].setAttribute('data-scoped-' + attr, count)

    var scopedRule = rule.replace(/eval\((.*)\)/g, function(string, match){

      var func = new Function('return ' + match)

      return (func.call(tag[i]) || '')

    })

    style += '\n/* Scope: ' + selectorList + ' */\n'
             + '[data-scoped-' + attr + '="' + count + '"] {\n'
             + '  ' + scopedRule + '\n'
             + '}\n'

      count++

  }

  return style

}
