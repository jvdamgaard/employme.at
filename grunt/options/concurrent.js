/**
 * Runn grunt tasks i parallel for better peformance
 */

module.exports = {
	localMake: [
		'sass:local',
		'browserify:all',
		'newer:copy',
		'newer:imagemin'
	],
	localEnhance: [
		'modernizr',
		'autoprefixer',
		'styleguide',
		'shell:doxx'
	],
	localConcat: [
		'uglify:local'
	],

	buildMake: [
		'browserify:sources',
		'sass:build',
		'newer:copy',
		'newer:imagemin'
	],
	buildEnhance: [
		'removelogging',
		'modernizr',
		'autoprefixer'
	],
	buildEnhanceTwo: [
		'cmq'
	],
	buildMinify: [
		'uglify:build',
		'cssmin'
	],
	buildTest: [
		'mochaTest:build',
		'jshint:all'
	]
};