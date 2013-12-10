/**
 * Create small local servers in certain folders
 */

module.exports = {
	options: {
		hostname: 'localhost'
	},

	// Local server for displaying javascript test coverage
	coverage: {
		options: {
			port: 9001,
			livereload: 35730,
			open: true,
			base: [
				'<%= app.test %>/coverage'
			]
		}
	},

	// Local server for displaying javascript tests
	test: {
		options: {
			port: 9002,
			livereload: 35731,
			open: true,
			base: [
				'<%= app.test %>',
				'<%= app.source %>'
			]
		}
	}
};