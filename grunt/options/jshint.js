/**
 * Static analysis of javascript code quality.
 */

module.exports = {
	options: {
		jshintrc: '.jshintrc'
	},

	// Lint spec tests
	specTests: {
		files: {
			src: [
				'<%= app.test %>/spec/**/*.js'
			]
		}
	},

	// Lint integratin tests
	integrationTests: {
		files: {
			src: [
				'<%= app.test %>/integration/**/*.js'
			]
		}
	},

	// Lint source files
	sources: {
		files: {
			src: [
				'<%= app.source %>/scripts/**/*.js'
			]
		}
	},

	// Lint all js files
	all: {
		files: {
			src: [
				'<%= app.source %>/scripts/**/*.js',
				'<%= app.test %>/integration/**/*.js',
				'<%= app.test %>/spec/**/*.js'
			]
		}
	}
};