/* AutoExpand Mixin for reproCSS */
function autoExpand(selectorList, direction) {

  var tag = document.querySelectorAll(selectorList)

  for (var i = 0; i < tag.length; i++) {

    if (direction == 'width' || direction == 'both') {

      tag[i].style.width = ''
      tag[i].style.width = tag[i].scrollWidth + 'px'

    }

    if (direction == 'height' || direction == 'both') {

      tag[i].style.height = ''
      tag[i].style.height = tag[i].scrollHeight + 'px'

    }

  }

  return '\n/* autoExpand(\'' + selectorList + '\', \'' + direction +'\') */\n'

}