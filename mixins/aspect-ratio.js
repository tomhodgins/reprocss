/* Aspect Ratio Mixin for reproCSS */
function aspectRatio(selectorList, ratio) {

  var tag = document.querySelectorAll(selectorList)
  var style = ''
  var count = 0

  for (var j = 0; j < tag.length; j++) {

    var attr = btoa(selectorList).replace(/=/g,'')

    tag[j].setAttribute('data-aspect-ratio-' + attr, count)

    style += '\n/* aspectRatio(' + selectorList + ', ' + ratio + ') */\n'
             + '[data-aspect-ratio-' + attr + '="' + count + '"] {\n'
             + '  height: ' + (tag[j].offsetWidth / ratio) + 'px;\n'
             + '}\n'

    count++

  }

  return style

}