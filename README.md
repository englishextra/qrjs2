# qrjs2

QR code generating with vanilla js (SVG Element, Data URI SVG String, Data URI PNG String, HTML Table Element).
Based on [lifthrasiir/qr.js](https://github.com/lifthrasiir/qr.js)

[![npm](https://img.shields.io/npm/v/qrjs2.svg)](https://www.npmjs.com/package/qrjs2)
[![Build Status](https://travis-ci.com/englishextra/qrjs2.svg?branch=master)](https://travis-ci.com/englishextra/qrjs2)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/031cf1474c704567afbb07b79ea63d82)](https://www.codacy.com/manual/englishextra/qrjs2/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=englishextra/qrjs2&amp;utm_campaign=Badge_Grade)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/qrjs2/badge)](https://www.jsdelivr.com/package/npm/qrjs2)

## Demo

[codepen](https://codepen.io/englishextra/full/NpwjKW)
[jsfiddle](https://fiddle.jshell.net/englishextra/Lp37dL94/show/)
[jsbin](https://output.jsbin.com/hobetuh/)

## Fixes / Added Features

* `generateSVG` now works in Edge 13 and IE 11
* `generateSVG` supports different colors for same page SVGs
* `textcolor` and `fillcolor` options introduced
* `innerHTML` replaced with `document.createDocumentFragment()`

## CDN

### jsDelivr

`https://cdn.jsdelivr.net/gh/englishextra/qrjs2@latest/js/qrjs2.min.js`

### unpkg

`https://unpkg.com/qrjs2@latest/js/qrjs2.js`

## Usage and Output

## Install

`npm install qrjs2`

### SVG Element (yeah, give it to me)

```js
var div = document.createElement("div"),
text = "https://github.com",
qr = QRCode.generateSVG(text, {
    ecclevel: "M",
    fillcolor: "#F2F2F2",
    textcolor: "#D13438",
    margin: 4,
    modulesize: 8
  });
div.appendChild(qr);
document.body.appendChild(div);
```

Will add an SVG element to parent DIV:

```svg
<svg viewBox="0 0 264 264" style="shape-rendering:crispEdges">
  <style scoped="scoped">.bg{fill:#FFFFFF}.fg{fill:#373737}</style>

  <rect class="bg" fill="none" x="0" y="0" width="264" height="264"></rect>
      <rect class="fg" fill="none" x="32" y="32" width="8" height="8"></rect>
    ...
</svg>
```

### Data URI SVG String with Data URI PNG String Fallback

```js
var img = document.createElement("img"),
text = "https://github.com";
if (document.implementation.hasFeature("http://www.w3.org/2000/svg","1.1")) {
  var qr = QRCode.generateSVG(text, {
      ecclevel: "M",
      fillcolor: "#E6E6E6",
      textcolor: "#486860",
      margin: 4,
      modulesize: 8
    });
  var XMLS = new XMLSerializer();
  qr = XMLS.serializeToString(qr);
  qr = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(qr)));
} else {
  var qr = QRCode.generatePNG(text, {
      ecclevel: "M",
      format: "html",
      fillcolor: "#CCCCCC",
      textcolor: "#006F94",
      margin: 4,
      modulesize: 8
    });
}
img.src = qr;
document.body.appendChild(img);
```

Will add a Data URI SVG string to IMG element's SRC attribute:

```html
<img src="data:image/svg+xml;base64,...">
```

Or a Data URI PNG string to IMG element's SRC attribute:

```html
<img src="data:image/png;base64,...">
```

### HTML Table Element

```js
var div = document.createElement("div"),
text = "https://github.com",
qr = QRCode.generateHTML(text, {
    ecclevel: "M",
    fillcolor: "#DCDCDC",
    textcolor: "#5C2E91",
    margin: 4,
    modulesize: 8
  });
div.appendChild(qr);
document.body.appendChild(div);
```

Will add an HTML table element to parent DIV:

```html
<table style="border:32px solid #FFFFFF;background:#FFFFFF" cellspacing="0" cellpadding="0" border="0">
  <tbody>
      <tr>
          <td style="width:8px;height:8px;background:#373737"></td>
      ...
    </tr>
  </tbody>
</table>
```

## License

Available under [MIT license](https://opensource.org/licenses/MIT).
