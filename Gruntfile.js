/*jslint node: true */
/*jslint esversion: 6 */
module.exports = function (grunt) {
	"use strict";
	grunt.initConfig({
		jshint: {
			all: ["qrjs2.js"]
		}
	});
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.registerTask("default", "jshint");
};
