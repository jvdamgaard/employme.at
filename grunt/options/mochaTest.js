/**
 * Runn test with Mocha in Node.js environment (not for integration and browser tests - only spec)
 */

// FIXME: Exclude tests, that require browser specific objects like `window`
// FIXME: Correct threshold and fail on build if below
// TODO: Better name for files output in server mode

module.exports = {

    // Run all spec tests
    build: {
        src: '<%= app.test %>/spec/**/*.js'
    },

    // Test on local environment + generate coverage repport
    coverage: {
        options: {
            reporter: 'html-cov',
            quiet: true,
            captureFile: '.tmp/coverage/index.html',
            require: ['<%= app.test %>/coverage/blanket']
        },
        src: '<%= app.test %>/spec/**/*.js'
    },

    // Test on local environment + generate coverage repport
    buildCoverage: {
        options: {
            reporter: 'travis-cov',
            require: ['<%= app.test %>/coverage/blanket']
        },
        src: '<%= app.test %>/spec/**/*.js'
    }
};
