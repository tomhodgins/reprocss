/* Parent Selector Mixin for reproCSS */
function parent(selectorList, rule) {

  var tag = document.querySelectorAll(selectorList)
  var style = ''
  var count = 0

  for (var i = 0; i < tag.length; i++) {

    var attr = btoa(selectorList).replace(/=/g, '')

    tag[i].parentNode.setAttribute('data-parent-' + attr, count)

    style += '\n/* '+ selectorList + ':parent */\n'
             + '[data-parent-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}