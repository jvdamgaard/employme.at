// Dependencies
var _ = require('lodash');

/**
 * Load configs from a folder
 * @param  {string} path  path for grunt configs
 * @return {object}      concat of all config files
 */
var loadConfig = function (path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {
        cwd: path
    }).forEach(function (option) {
        key = option.replace(/\.js$/, '');
        object[key] = require(path + option);
    });

    return object;
};

module.exports = function (grunt) {

    var config = {
        app: {
            source: 'app',
            dist: '.tmp/dist',
            test: 'test',
            docs: 'docs'
        },
        pkg: require('./package.json')
    };

    // Load all config file in options folder
    config = _.assign(config, loadConfig('./grunt/options/'));
    grunt.initConfig(config);

    /**
     * Start node server and livereload on changes
     */
    grunt.registerTask('server', function () {
        grunt.loadNpmTasks('grunt-newer');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-express-server');
        grunt.loadNpmTasks('grunt-open');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run([
            'newer:copy:all',
            'express',
            'open',
            'watch:server'
        ]);
    });

    /**
     * Open webpages for bahaviour driven development and watch for changes
     */
    grunt.registerTask('test-server', function () {
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'browserify:specTests',
            'browserify:integrationTests',
            'connect:test'
        ]);
    });

    /**
     * Build and open documentation for styles and javascript
     */
    grunt.registerTask('docs', function () {
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-styleguide');
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-markdown');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'copy:styledocco',
            'styleguide',
            'shell:doxx',
            'markdown:docs',
            'connect:jsdoc',
            'connect:designProcess',
            'connect:styleguide'
        ]);
    });

    /**
     * Build and open test coverage webpage
     */
    grunt.registerTask('coverage', function () {
        grunt.loadNpmTasks('grunt-mocha-test');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'mochaTest:coverage',
            'connect:coverage'
        ]);
    });

    /**
     * Build source javascript files
     */
    grunt.registerTask('js-source-build', function () {
        grunt.loadNpmTasks('grunt-browserify');
        grunt.task.run([
            'browserify:sources'
        ]);
    });

    /**
     * Build and watch javascript
     */
    grunt.registerTask('js', function () {
        grunt.loadNpmTasks('grunt-modernizr');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run([
            'js-source-build',
            'modernizr',
            'uglify:local',
            'watch:js'
        ]);
    });

    /**
     * Build styles
     */
    grunt.registerTask('css-build', function () {
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.task.run([
            'sass:local',
            'autoprefixer'
        ]);
    });

    /**
     * Build and watch styles
     */
    grunt.registerTask('css', function () {
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run([
            'sass:local',
            'autoprefixer',
            'watch:sass'
        ]);
    });

    /**
     * Build and watch images
     */
    grunt.registerTask('img', function () {
        grunt.loadNpmTasks('grunt-newer');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.task.run([
            'newer:imagemin'
        ]);
    });

    /**
     * Test task used for testing on CI server
     */
    grunt.registerTask('test', function () {

        // Load required grunt tasks
        grunt.loadNpmTasks('grunt-continue');
        grunt.loadNpmTasks('grunt-todos');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-mocha-test');
        grunt.loadNpmTasks('grunt-contrib-watch');

        // Run grunt tasks
        grunt.task.run([
            'continueOn',
            'build-test',
            'watch:test'
        ]);
    });

    /**
     * Open webpages for bahaviour driven development and watch for changes
     */
    grunt.registerTask('test-full', function () {
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-mocha');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'browserify:specTests',
            'browserify:integrationTests',
            'connect:test',
            'mocha'
        ]);
    });

    /**
     * Build task use for building assets fro production
     */
    grunt.registerTask('build', function () {

        // Load required grunt tasks
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.loadNpmTasks('grunt-remove-logging');
        grunt.loadNpmTasks('grunt-modernizr');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks('grunt-combine-media-queries');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-csso');

        // Run grunt tasks
        grunt.task.run([

            // Build files
            'browserify:sources',
            'sass:build',
            'copy:all',
            'imagemin',
            'modernizr',

            // Enhance
            'autoprefixer',

            // Minify
            'removelogging',
            'cmq',
            'uglify:build',
            'csso'
        ]);
    });

    /**
     * Test task used for testing on CI server
     */
    grunt.registerTask('build-test', function () {

        // Load required grunt tasks
        grunt.loadNpmTasks('grunt-todos');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-mocha-test');

        // Run grunt tasks
        grunt.task.run([
            'todos:all',
            'jshint:all',
            'mochaTest:build'
        ]);
    });
};
