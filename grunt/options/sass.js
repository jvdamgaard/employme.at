/**
 * Compile scss files
 */

// TODO: Fix source maps

module.exports = {
    options: {
        loadPath: '<%= app.source %>/bower_components'
    },
    local: {
        options: {
            sourcemap: true,
            style: 'expanded'
        },
        files: {
            '<%= app.dist %>/styles/main.css': '<%= app.source %>/styles/main.scss'
        }
    },
    build: {
        options: {
            style: 'compressed'
        },
        files: {
            '<%= app.dist %>/styles/main.css': '<%= app.source %>/styles/main.scss'
        }
    }
};
