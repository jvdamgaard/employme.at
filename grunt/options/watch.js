/**
 * Watch for changes in files and run grunt tasks whenever a change happens
 */

module.exports = {

    // Spec test changes recompiles the test suite
    test: {
        files: [
            '<%= app.test %>/spec/**/*.js',
            '<%= app.source %>/scripts/**/*.js'
        ],
        tasks: [
            'build-test'
        ]
    },

    // Changes in the javascript source files recompiles the main app.js file
    js: {
        files: [
            '<%= app.source %>/scripts/**/*.js'
        ],
        tasks: [
            'js-source-build'
        ]
    },

    // Changes to scss files recompiles the main.css file
    sass: {
        files: [
            '<%= app.source %>/styles/**/*.scss'
        ],
        tasks: [
            'css-build'
        ]
    },
    server: {
        files: [
            '<%= app.dist %>/**/*.*',
            'views/**/*.hbs'
        ],
        options: {
            livereload: true,
            spawn: false
        }
    }
};