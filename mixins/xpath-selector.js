/*

# XPath Selector Mixin for reproCSS
## version 0.0.7

Apply CSS styles to HTML elements that match an XPath selector.

### Syntax

    xpath(xpathSelector, rule)

- `xpathSelector` is a comma-separated string containing an XPath selector
- `rule` is a semicolon-separated string containing one or more CSS declarations

### Example

    xpath('//*', 'border: 1px solid lime')

- https://github.com/tomhodgins/reprocss

Author: Tommy Hodgins

License: MIT

*/

function xpath(xpathSelector, rule) {

  var tag = new Array()
  var style = ''
  var count = 0

  var result = document.evaluate(
                 xpathSelector,
                 document,
                 null,
                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                 null
               )

  for (var i=0; i < result.snapshotLength; i++) {

    tag.push(result.snapshotItem(i))

  }

  for (var j=0; j < tag.length; j++) {

    var attr = btoa(xpathSelector).replace(/=/g,'')

    tag[j].setAttribute('data-xpath-'+attr, count)

    style += '\n/*\n\n' + xpathSelector + ' {\n  ' + rule + '\n}\n\n*/\n'
             + '[data-xpath-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}