/**
 * Watch for changes in files and run grunt tasks whenever a change happens
 */

module.exports = {

	// Spec test changes recompiles the test suite
	specTests: {
		options: {
			livereload: '<%= connect.test.options.livereload %>'
		},
		files: [
			'<%= app.test %>/spec/**/*.js'
		],
		tasks: [
			'browserify:specTests',
			'continueOn',
			'mochaTest:coverage',
			'jshint:specTests',
			'todos:specTests',
			'continueOff'
		]
	},

	// Integration test changes recompiles the integration test suite
	integrationTests: {
		options: {
			livereload: '<%= connect.test.options.livereload %>'
		},
		files: [
			'<%= app.test %>/integration/**/*.js'
		],
		tasks: [
			'browserify:integrationTests',
			'continueOn',
			'jshint:integrationTests',
			'todos:integrationTests',
			'continueOff'
		]
	},

	// Changes in the javascript source files recompiles the main app.js file
	jsSources: {
		options: {
			livereload: '<%= connect.test.options.livereload %>'
		},
		files: [
			'<%= app.source %>/scripts/**/*.js',
			'!<%= app.source %>/scripts/modules/index.js'
		],
		tasks: [
			'browserify:sources',
			'continueOn',
			'mochaTest:coverage',
			'jshint:sources',
			'todos:sources',
			'continueOff'
		]
	},

	// Reload the coverage site when changes to the coverage page happens
	coverage: {
		options: {
			livereload: '<%= connect.coverage.options.livereload %>'
		},
		files: [
			'<%= app.test %>/coverage/index.html'
		]
	},

	// Changes to scss files recompiles the main.css file
	sass: {
		files: [
			'<%= app.source %>/styles/**/*.scss',
			'!<%= app.source %>/styles/modules/index.scss'
		],
		tasks: ['sass:local']
	},

	// Changes to app.json file (with active/deactive modules settings) recompiles the main app.js file
	modules: {
		files: ['app.json'],
		tasks: [
			'modules',
			'browserify:sources',
			'sass:local'
		]
	},

	// Changes to the bower.json install bower dependencies an recompiles the main app.js file
	bower: {
		options: {
			livereload: '<%= connect.test.options.livereload %>'
		},
		files: ['bower.json'],
		tasks: [
			'shell:bowerInstall',
			'browserify:sources',
			'sass:local'
		]
	},
	express: {
		files: [
			'<%= app.dist %>/**/*.{png,jpg,jpeg,gif,webp,svg,eot,woff,js,css}',
			'views/**/*.hbs'
		],
		//tasks: ['express:server'],
		options: {
			livereload: true,
			spawn: false
		}
	}
};