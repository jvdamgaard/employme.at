/**
 * Runn test with Mocha in Node.js environment (not for integration and browser tests - only spec)
 */

module.exports = {

	// Tests on Jenkins CI server
	build: {
		options: {
			// reporter: 'tap',
			require: ['chai']
		},
		src: '<%= app.test %>/spec/**/*.js'
	},

	// Test on local environment + generate coverage repport
	coverage: {
		options: {
			reporter: 'html-cov',
			quiet: true,
			captureFile: '<%= app.test %>/coverage/index.html',
			require: ['chai', '<%= app.test %>/coverage/blanket']
		},
		src: '<%= app.test %>/spec/**/*.js'
	}
};