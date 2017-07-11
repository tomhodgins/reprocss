/* Prev Selector Mixin for reproCSS */
function prev(selectorList, rule) {

  var tag = document.querySelectorAll(selectorList)
  var style = ''
  var count = 0

  for (var i = 0; i < tag.length; i++) {

    var attr = btoa(selectorList).replace(/=/g, '')

    tag[i].previousElementSibling.setAttribute('data-prev-' + attr, count)

    style += '\n/* Prev: ' + selectorList + ' */\n'
             + '[data-prev-' + attr + '="' + count + '"] {\n'
             + '  ' + rule + '\n'
             + '}\n'

    count++

  }

  return style

}