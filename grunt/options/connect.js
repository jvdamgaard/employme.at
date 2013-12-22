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
            keepalive: true,
            base: [
                '<%= app.test %>',
                '<%= app.source %>'
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
                '<%= app.docs %>/styleguide',
                '<%= app.docs %>/lib',
                '<%= app.source %>/bower_components/bootstrap/dist',
                '<%= app.source %>/bower_components/jquery'
            ]
        }
    },

    // Local server for displaying styleguide
    jsdoc: {
        options: {
            port: 9004,
            open: true,
            base: [
                '<%= app.docs %>/js',
                '<%= app.docs %>/lib',
                '<%= app.source %>/bower_components/bootstrap/dist',
                '<%= app.source %>/bower_components/jquery'
            ]
        }
    }
};
