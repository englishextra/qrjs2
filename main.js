/*!
 * @see {@link http://docs.nwjs.io/en/latest/For%20Users/Getting%20Started/}
 * @see {@link http://docs.nwjs.io/en/latest/References/Window/#windowopenurl-options-callback}
 * icon must be PNG, not ICO
 */
nw.Window.open("index.html", {
	width: 1024,
	height: 688,
	icon: "favicon-32x32.png",
	title: "qrjs2 Demo Page"
}, function (win) {});
