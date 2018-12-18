/*global require */
/*!
 * @see {@link https://github.com/mildrenben/surface/blob/master/gulpfile.js}
 * @see {@link https://www.webstoemp.com/blog/gulp-setup/}
 * @see {@link https://gulpjs.com/plugins/blackList.json}
 * @see {@link https://hackernoon.com/how-to-automate-all-the-things-with-gulp-b21a3fc96885}
 */

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");

var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

/*!
 * @see {@link https://github.com/babel/babel/issues/7910}
 */

var babel = require("gulp-babel");
var babelOptions;
babelOptions = {
	"sourceType": "script",
	"presets": ["@babel/env"],
	"plugins": ["@babel/plugin-transform-object-assign",
		"@babel/plugin-transform-arrow-functions",
		"@babel/plugin-transform-async-to-generator"]
};

/*!
 * @see {@link https://github.com/beautify-web/js-beautify}
 * a JSON-formatted file indicated by the --config parameter
 * a .jsbeautifyrc file containing JSON data at any level of the filesystem above $PWD
 * using external config may cause
 * failure to find it
 * if the input/output files reside higher
 * than the config file itself
 */
/* var beautify = require("gulp-jsbeautifier"); */
var beautifyOptions;
beautifyOptions = {
	/* "config": ".jsbeautifyrc", */
	"editorconfig": false,
	"indent_size": 4,
	"indent_char": "\t",
	"indent_with_tabs": true,
	"eol": "\n",
	"end_with_newline": true,
	"indent_level": 0,
	"preserve_newlines": true,
	"max_preserve_newlines": 10,
	"html": {
		"indent_inner_html": true,
		"indent_scripts": false,
		"js": {},
		"css": {}
	},
	"css": {
		"newline_between_rules": true
	},
	"js": {
		"space_in_paren": false,
		"space_in_empty_paren": false,
		"jslint_happy": false,
		"space_after_anon_function": true,
		"space_after_named_function": false,
		"brace_style": "collapse",
		"unindent_chained_methods": false,
		"break_chained_methods": true,
		"keep_array_indentation": true,
		"unescape_strings": false,
		"wrap_line_length": 0,
		"e4x": false,
		"comma_first": false,
		"operator_position": "before-newline"
	}
};

/*!
 * @see {@link https://prettier.io/docs/en/options.html}
 * using external config may cause
 * failure to find it
 * if the input/output files reside higher
 * than the config file itself
 */
var prettier = require("gulp-prettier");
var prettierOptions;
prettierOptions = {
	/* "config": ".prettierrc", */
	"tabWidth": 4,
	"useTabs": true,
	"endOfLine": "lf",
	"printWidth:": 0
};

var stripDebug = require("gulp-strip-debug");

var options = {
	libPaths: {
		src: "./src/*.js",
		js: "./js"
	},
};

/*!
 * @see {@link https://browsersync.io/docs/gulp}
 */
gulp.task("browser-sync", [
		/* "bundle-assets" */
	], function () {

	browserSync.init({
		server: "./"
	});

	gulp.watch("./*.html").on("change", reload);
	gulp.watch("./js/*.js").on("change", reload);
	gulp.watch("./src/*.js", ["compile-js"]);
});

gulp.task("compile-js", function () {
	gulp.src(options.libPaths.src)
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(babel(babelOptions))
	.pipe(prettier(prettierOptions))
	/* .pipe(beautify(beautifyOptions)) */
	.pipe(plumber.stop())
	.pipe(gulp.dest(options.libPaths.js))
	.pipe(rename(function (path) {
			path.basename += ".min";
		}))
	.pipe(stripDebug())
	.pipe(uglify())
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest(options.libPaths.js))
	.pipe(reload({
			stream: true
		}));
});

gulp.task("default", ["browser-sync"]);
