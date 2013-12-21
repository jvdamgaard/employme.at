var _ = require('lodash');

/* Load grunt config files from path */
var loadConfig = function (path) {
	var glob = require('glob');
	var object = {};
	var key;

	glob.sync('*', {
		cwd: path
	}).forEach(function (option) {
		key = option.replace(/\.js$/, '');
		object[key] = require(path + option);
	});

	return object;
};

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	var config = {
		app: {
			source: 'app',
			dist: 'dist',
			test: 'test',
			docs: 'docs'
		},
		pkg: require('./package.json')
	};

	// Load all config file in options folder
	config = _.assign(config, loadConfig('./grunt/options/'));
	grunt.initConfig(config);

	// Load custom grunt tasks
	grunt.loadTasks('grunt');

	/**
	 * Default task to use when developing local
	 */
	grunt.registerTask('app', function () {
		grunt.task.run([
			'shell:bowerInstall',
			'concurrent:localMake',
			'concurrent:localEnhance',
			'concurrent:localConcat',
			'mochaTest:coverage',
			'connect',
			'express',
			'open',
			'continueOn',
			'todos:all',
			'jshint:all',
			'continueOff',
			'timer',
			'watch'
		]);
	});

	/**
	 * Build taks use for building assets fro production
	 */
	grunt.registerTask('build', function () {
		grunt.task.run([
			'shell:bowerInstall',
			'concurrent:buildMake',
			'concurrent:buildEnhance',
			'concurrent:buildEnhanceTwo',
			'concurrent:buildMinify',
			'timer'
		]);
	});

	/**
	 * Test task used for testing on CI server
	 */
	grunt.registerTask('test', function () {
		grunt.task.run([
			'todos:all',
			'jshint:all',
			'mochaTest:build',
			'timer'
		]);
	});
};