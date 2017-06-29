
/*

  # reproCSS
  ## version 0.0.2

  reproCSS is a flexible CSS reprocessor that uses `<style>` tags and a `process=""` attribute.

  You can add the CSS you want reprocss.js to apply to your HTML in `<style>` tags with the following values on the `process` attribute:

  - `none` means no reprocessing
  - `once` means process immediately and never again
  - `auto` runs every `resize`, `input`, and `click` event on window
  - any space-separated list of JS events you wish to listen for

      <style process="none"></style>
      <style process="once"></style>
      <style process="auto"></style>
      <style process="touchstart scroll"></style>

  To evaluate JavaScript inside the CSS as it's being reprocessed by `reprocss.js` you can use the `${}` interpolation syntax. The following `<style>` tag would always ensure the `<div>` in this example was half of the window's height:

      <style process="auto">
        div {
          height: calc(${innerHeight}px / 2);
        }
      </style>

  When the browser is 1000px tall the `${innerHeight}` in our CSS will be output as `500`, leading to the following output:

      <style process="auto">
        div {
          height: calc(500px / 2);
        }
      </style>

  Currently this plugin only supports `<style>` tags, but it may be possible to support CSS loaded via `<link>` with a similar technique.

  - https://github.com/tomhodgins/reprocss

  Author: Tommy Hodgins

  License: MIT

*/

// Uses Node, AMD or browser globals to create a module
(function (root, factory) {

  if (typeof define === 'function' && define.amd) {

    // AMD: Register as an anonymous module
    define([], factory)

  } else if (typeof module === 'object' && module.exports) {

    // Node: Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node
    module.exports = factory()

  } else {

    // Browser globals (root is window)
    root.reprocss = factory()

  }

}(this, function(e) {

  const reprocss = {}

  reprocss.count = 0

  reprocss.style = []

  reprocss.load = () => {

    // Find all <style process=""> tags in document
    Array.from(document.querySelectorAll('style[process]'), tag => {

      // Mark tag with data-reprocss="" attribute and current tag count
      tag.setAttribute('data-reprocss', reprocss.count)

      // Increment tag count
      reprocss.count++

      reprocss.process(tag)

    })

  }

  reprocss.process = tag => {

    // Save original CSS code in the reprocss.style array
    reprocss.style.push(tag.innerHTML)

    // Remove current tag contents
    tag.innerHTML = null

    let trigger = tag.getAttribute('process')

    switch (trigger) {

      // process="none"
      case "none":

        // Populate tag with original CSS code
        tag.innerHTML = reprocss.style[tag.getAttribute('data-reprocss')]

        break;

      // process="once"
      case "once":

        // Populate tag immediately with evaluated CSS code
        reprocss.apply(tag.getAttribute('data-reprocss'))

        break;

      // process="auto"
      case "auto":

        // Populate tag immediately with evaluated CSS code
        reprocss.apply(tag.getAttribute('data-reprocss'))

        // Listen on window resize
        window.addEventListener('resize', ()=> {
          reprocss.apply(tag.getAttribute('data-reprocss'))
        })

        // Listen on window input
        window.addEventListener('input', ()=> {
          reprocss.apply(tag.getAttribute('data-reprocss'))
        })

        // Listen on window click
        window.addEventListener('click', ()=> {
          reprocss.apply(tag.getAttribute('data-reprocss'))
        })

        break;

      // For any other process="" values
      default:

        // Populate tag immediately with evaluated CSS code
        reprocss.apply(tag.getAttribute('data-reprocss'))

        // Turn space-separated lists into an array
        let triggers = trigger.split(' ')

        // For each custom event we find
        Array.from(triggers, event => {

          // Add a new event listener to window for that event
          window.addEventListener(event, ()=> {
            reprocss.apply(tag.getAttribute('data-reprocss'))
          })

        })

        break;

    }

  }

  reprocss.apply = number => {

    // Locate the corresponding `<style>` tag in DOM
    let tag = document.querySelectorAll('style[data-reprocss]')[number]

    // Evaluate CSS code for this tag
    let css = reprocss.style[number].replace(/\$\{([^\}]*)\}/g, (string, match) => {

      let func = new Function('return '+match)

      return func()

    })

    // Populate `<style>` tag with evaluated CSS
    tag.innerHTML = css

  }

  // Start reprocss when document is loaded
  document.addEventListener('DOMContentLoaded', reprocss.load())

  return reprocss

}))