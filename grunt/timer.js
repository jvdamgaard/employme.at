/**
 * Custom grunt task
 * - analyse javascript and styles folder to find modules
 * - create "require" files that injects active modules into the main app.js and main.css files
 */

var startTime = new Date().getTime();

module.exports = function (grunt) {
	grunt.registerTask('timer', 'log the complete time elapsed for these tasks', function () {
		var done = this.async();

		var elapsedTime = new Date().getTime() - startTime;
		var elapsedTimeInSeconds = Math.round(elapsedTime / 1000 * 100) / 100;

		grunt.log.writeln('');
		grunt.log.writeln('---------------------------------------------');
		grunt.log.writeln(' Time elapsed: ' + elapsedTimeInSeconds + 's');
		grunt.log.writeln('---------------------------------------------');
		grunt.log.writeln('');
		done();

	});
};