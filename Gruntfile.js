module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			all: ["qrjs2.js"]
		}
	});
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.registerTask("default", "jshint");
};
