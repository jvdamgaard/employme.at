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
            'continueOn',
            'jshint',
            'todos',
            'continueOff',
            'mochaTest:build'
        ]
    },

    // Changes in the javascript source files recompiles the main app.js file
    js: {
        files: [
            '<%= app.source %>/scripts/**/*.js'
        ],
        tasks: [
            'browserify:sources'
        ]
    },

    // Changes to scss files recompiles the main.css file
    sass: {
        files: [
            '<%= app.source %>/styles/**/*.scss'
        ],
        tasks: [
            'sass:local',
            'autoprefixer'
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
