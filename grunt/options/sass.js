/**
 * Compile scss files
 */

module.exports = {
    options: {
        loadPath: '.tmp/bower_components',
        cacheLocation: '.tmp/sass'
    },
    local: {
        options: {
            sourcemap: true,
            trace: true,
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
