/* Container Queries Mixin for reproCSS */
function container(containerList, condition, childList, rule) {

  var tag = document.querySelectorAll(containerList)
  var style = ''
  var count = 0

  for (var i=0; i < tag.length; i++) {

    var func = new Function('return ' + condition)

    if (func.call(tag[i])) {

      var attr = btoa(containerList).replace(/=/g, '')

      tag[i].setAttribute('data-container-' + attr, count)

      var container = '[data-container-' + attr + '="' + count + '"]'

      style += '\n/* ' + containerList + ': ' + condition + ' */\n'
               + container + ' ' + childList + ' {\n'
               + '  ' + rule + '\n'
               + '}\n'

      count++

    }

  }

  return style

}