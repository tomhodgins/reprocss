/* Scoped JS Interopation Mixin for reproCSS */
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