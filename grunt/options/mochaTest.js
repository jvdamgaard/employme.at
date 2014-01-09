/**
 * Runn test with Mocha in Node.js environment (not for integration and browser tests - only spec)
 */

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
    }
};
