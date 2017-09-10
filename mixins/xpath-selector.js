/*

# XPath Selector Mixin for reproCSS
## version 0.0.8

Apply CSS styles to HTML elements that match an XPath selector.

### Syntax

    xpath(selector, rule)

- `selector` is a comma-separated string containing an XPath selector
- `rule` is a semicolon-separated string containing one or more CSS declarations

### Example

    xpath('//*', 'border: 1px solid lime')

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function xpath(selector, rule) {

  var tag = new Array()
  var style = ''
  var count = 0

  var result = document.evaluate(
                 selector,
                 document,
                 null,
                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                 null
               )

  for (var i=0; i < result.snapshotLength; i++) {

    tag.push(result.snapshotItem(i))

  }

  for (var j=0; j < tag.length; j++) {

    var attr = selector.replace(/\W+/g, '')

    tag[j].setAttribute('data-xpath-'+attr, count)

    style += '\n/*\n\n' + selector + ' {\n  ' + rule + '\n}\n\n*/\n'
             + '[data-xpath-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}