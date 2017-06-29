![](http://i.imgur.com/HWpgrOP.png)

# reprocss

**A flexible CSS reprocessor using <style> tags**

Can you imagine if you could interpolate JS inside CSS with the `${}` syntax, and also control when and how frequently that CSS reprocessed with a process="" attribute on the `<style>` tag:

![](http://i.imgur.com/6SkRCIm.png)

```html
<style process="none"></style>
<style process="once"></style>
<style process="auto"></style>
<style process="touchstart mousedown"></style>
```

  You can add the CSS you want reprocss.js to apply to your HTML in `<style>` tags with the following values on the `process` attribute:

  - `none` means no reprocessing
  - `once` means process immediately and never again
  - `auto` runs every `resize`, `input`, and `click` event on window
  - any space-separated list of JS events you wish to listen for

## How to use reproCSS

Include the `reprocss.js` JavaScript plugin in your HTML:

```html
<script src="reprocss.js"></script>
```

The plugin is also a UMD module if you want to use the plugin inside JS modules.

## How to write reproCSSed CSS

To evaluate JavaScript inside the CSS as it's being reprocessed by `reprocss.js` you can use the `${}` interpolation syntax. The following `<style>` tag would always ensure the `<div>` in this example was half of the window's height:

```html
<style process="auto">
  div {
    height: calc(${innerHeight}px / 2);
  }
</style>
```

When the browser is 1000px tall the `${innerHeight}` in our CSS will be output as `500`, leading to the following output:

```html
<style process="auto">
  div {
    height: calc(500px / 2);
  }
</style>
```

Currently this plugin only supports `<style>` tags, but it may be possible to support CSS loaded via `<link>` with a similar technique.

## Examples

### Interpolating JS-supplied values in CSS content:;

![](http://i.imgur.com/cW0yNMG.png)

```html
<div>Hello</div>

<script>
  var user = 'Username'
</script>

<style process="once">
  div:after {
    content: ' ${user}';
  }
</style>
```

### Element Queries via a JS Selector Resolver

![](http://i.imgur.com/1mGaC41.png)

```html
<div id="demo">
  <p>Hello</p>
</div>

<style process="resize">
  ${demo.offsetWidth > 400 && "#demo"} {
    background: lime;
  }
  ${demo.offsetWidth > 400 && "#demo"} p {
    color: red;
  }
</style>
```

### JS interpolation in CSS

![](http://i.imgur.com/rNZHUXN.png)

```html
<textarea id="demo"></textarea>

<style process="input">
  #demo {
    background: hsl(${demo.value.length}, 50%, 50%)
  }
</style>
```

> Made with ♥ by [@innovati](http://twitter.com/innovati)