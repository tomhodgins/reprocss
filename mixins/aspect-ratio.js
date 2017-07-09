/* Aspect Ratio Mixin for reproCSS */
function aspectRatio(selectorList, ratio) {

  var tag = document.querySelectorAll(selectorList)
  var style = ''
  var count = 0

  for (var i=0; i < tag.length; i++) {

    var attr = btoa(selectorList).replace(/=/g,'')

    tag[i].setAttribute('data-aspect-ratio-' + attr, count)

    style += '\n/* aspectRatio(' + selectorList + ', ' + ratio + ') */\n'
             + '[data-aspect-ratio-' + attr + '="' + count + '"] {\n'
             + '  height: ' + (tag[i].offsetWidth / ratio) + 'px;\n'
             + '}\n'

    count++

  }

  return style

}