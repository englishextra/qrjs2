# qrjs2
QR code generating with vanilla js (SVG Element, Data URI PNG String, HTML Table Element)

Based on [github.com/lifthrasiir/qr.js](https://github.com/lifthrasiir/qr.js)

[The Demo](http://codepen.io/englishextra/pen/NpwjKW)
[Another Demo](https://jsfiddle.net/englishextra/Lp37dL94/)

## Fixes / Added Features

 - `generateSVG` now works in Edge 13 and IE 11
 - foreground and background become  customizeable
 - `innerHTML` replaced with `document.createDocumentFragment()`

## Usage and Output

### Install

```
npm install qrjs2
```
```
bower install qrjs2
```

### SVG Element (yeah, give it to me)

```
var svgElement = document.createElement("div"),
u = "https://github.com",
s = QRCode.generateSVG(u, {
		ecclevel: "M",
		fillcolor: "#FFFFFF",
		textcolor: "#373737",
		margin: 4,
		modulesize: 8
	});
svgElement.appendChild(s);
document.body.appendChild(svgElement);
```
Will add an SVG element to parent DIV:
```
<svg viewBox="0 0 264 264" style="shape-rendering:crispEdges">
	<style scoped="scoped">.bg{fill:#FFFFFF}.fg{fill:#373737}</style>
	<rect class="bg" fill="none" x="0" y="0" width="264" height="264"></rect>
 	<rect class="fg" fill="none" x="32" y="32" width="8" height="8"></rect>
    ...
</svg>
```

### Data URI SVG String with Data URI PNG String Fallback

```
if (document.implementation.hasFeature("http://www.w3.org/2000/svg","1.1")) {
	var dataUriSvgImage = document.createElement("img"),
	u = "https://github.com",
	s = QRCode.generateSVG(u, {
			ecclevel: "M",
			fillcolor: "#FFFFFF",
			textcolor: "#373737",
			margin: 4,
			modulesize: 8
		});
	var XMLS = new XMLSerializer();
	s = XMLS.serializeToString(s);
	s = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(s)));
	dataUriSvgImage.src = s;
	document.body.appendChild(dataUriSvgImage);
} else {
	var dataUriPngImage = document.createElement("img"),
	u = "https://github.com",
	s = QRCode.generatePNG(u, {
			ecclevel: "M",
			format: "html",
			fillcolor: "#FFFFFF",
			textcolor: "#373737",
			margin: 4,
			modulesize: 8
		});
	dataUriPngImage.src = s;
	document.body.appendChild(dataUriPngImage);
}
```
Will add a Data URI SVG string to IMG element's SRC attribute:
```
<img src="data:image/svg+xml;base64,...">
```
Or a Data URI PNG string to IMG element's SRC attribute:
```
<img src="data:image/png;base64,...">
```

### HTML Table Element

```
var htmlTable = document.createElement("div"),
u = "https://github.com",
s = QRCode.generateHTML(u, {
		ecclevel: "M",
		fillcolor: "#FFFFFF",
		textcolor: "#373737",
		margin: 4,
		modulesize: 8
	});
htmlTable.appendChild(s);
document.body.appendChild(htmlTable);
```
Will add an HTML table element to parent DIV:
```
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

qrjs2 is released under the [MIT license](https://opensource.org/licenses/MIT).
