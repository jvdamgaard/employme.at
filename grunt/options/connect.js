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
            keepalive: true,
            base: [
                '.tmp/coverage'
            ]
        }
    },

    // Local server for displaying javascript tests
    test: {
        options: {
            port: 9002,
            livereload: 35731,
            open: true,
            keepalive: true,
            base: [
                '<%= app.test %>',
                '<%= app.source %>',
                '.tmp/tests'
            ]
        }
    },

    // Local server for displaying styleguide
    styleguide: {
        options: {
            port: 9003,
            open: true,
            keepalive: true,
            base: [
                '.tmp/styleguide',
                '<%= app.docs %>/lib',
                '<%= app.source %>/bower_components'
            ]
        }
    },

    // Local server for displaying styleguide
    jsdoc: {
        options: {
            port: 9004,
            open: true,
            base: [
                '.tmp/js',
                '<%= app.docs %>/lib',
                '<%= app.source %>/bower_components'
            ]
        }
    },

    // Local server for displaying styleguide
    designProcess: {
        options: {
            port: 9005,
            open: true,
            base: [
                '.tmp/docs/design-process',
                '<%= app.docs %>/design-process',
                '<%= app.source %>/bower_components'
            ]
        }
    }
};
