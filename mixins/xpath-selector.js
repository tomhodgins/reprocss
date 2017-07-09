/* XPath Selector Mixin for reproCSS */
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

    var attr = btoa(selector).replace(/=/g,'')

    tag[j].setAttribute('data-xpath-'+attr, count)

    style += '\n/*\n\n' + selector + ' {\n  ' + rule + '\n}\n\n*/\n'
             + '[data-xpath-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}