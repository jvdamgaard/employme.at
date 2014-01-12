/**
 * ## Grunt tasks to use for local development
 *
 * - `grunt serve-site`         : Start server and livereload on changes
 * - `grunt serve-docs`         : Build and open all documentation
 * - `grunt serve-docs-style`   : Build and open style documentation
 * - `grunt serve-docs-js`      : Build and open javascript documentation
 * - `grunt serve-docs-process` : Build and open design process documentation
 * - `grunt serve-coverage`     : Run and open test coverage
 * - `grunt serve-test`         : Run and open tests
 * - `grunt js`                 : Build and watch javascript
 * - `grunt style`              : Build and watch styles
 * - `grunt img`                : Copy and minify all images
 * - `grunt test`               : Lint and test js. Reruns tests on changes to js
 *
 * ## Grunt taks used på the CI server
 *
 * - `grunt build`              : Build, concat and minify all assets
 * - `grunt build-test`         : Tests for js problems
 *
 * ## Settings for grunt plugins
 *
 * All settings for grunt plugins a located in `./grunt/options`.
 *
 * All custom plugins are located in `./grunt`
 */

// Dependencies
var _ = require('lodash');

/**
 * Load configs from a folder
 * @param  {string} path  path for grunt configs
 * @return {object}      concat of all config files
 */
var loadConfig = function (path, grunt) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {
        cwd: path
    }).forEach(function (option) {
        key = option.replace(/\.js$/, '');
        object[key] = require(path + option);

        if (_.isFunction(object[key])) {
            object[key] = object[key](grunt);
        }
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
    config = _.assign(config, loadConfig('./grunt/options/', grunt));
    grunt.initConfig(config);

    /**
     * Start node server and livereload on changes
     */
    grunt.registerTask('serve-site', function () {
        grunt.loadNpmTasks('grunt-modernizr');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.loadNpmTasks('grunt-express-server');
        grunt.loadNpmTasks('grunt-open');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run([
            'js-build',
            'modernizr',
            'uglify:local',
            'style-build',
            'copy:all',
            'imagemin',
            'express',
            'open',
            'watch:server'
        ]);
    });

    /**
     * Build and open documentation for design process, styles and javascript
     */
    grunt.registerTask('serve-docs', function () {
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
            'connect:styleguide:keepalive'
        ]);
    });

    /**
     * Build and open documentation for styles
     */
    grunt.registerTask('serve-docs-style', function () {
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-styleguide');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'copy:styledocco',
            'styleguide',
            'connect:styleguide:keepalive'
        ]);
    });

    /**
     * Build and open documentation for javascript
     */
    grunt.registerTask('serve-docs-js', function () {
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'shell:doxx',
            'connect:jsdoc:keepalive'
        ]);
    });

    /**
     * Build and open documentation for design process
     */
    grunt.registerTask('serve-docs-process', function () {
        grunt.loadNpmTasks('grunt-markdown');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'markdown:docs',
            'connect:designProcess:keepalive'
        ]);
    });

    /**
     * Run and open test coverage webpage
     */
    grunt.registerTask('serve-coverage', function () {
        grunt.loadNpmTasks('grunt-touch');
        grunt.loadNpmTasks('grunt-copy');
        grunt.loadNpmTasks('grunt-mocha-test');
        grunt.loadNpmTasks('grunt-string-replace');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'touch:coverage',
            'copy:jsToNode',
            'mochaTest:coverage',
            'string-replace:coverage',
            'connect:coverage'
        ]);
    });

    /**
     * Run and open tests
     */
    grunt.registerTask('serve-test', function () {
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-contrib-connect');

        grunt.task.run([
            'copy:jsToNode',
            'browserify:specTests',
            'connect:testServer:keepalive'
        ]);
    });

    /**
     * Run coverage report
     */
    grunt.registerTask('coverage', function () {
        grunt.loadNpmTasks('grunt-mocha-test');
        grunt.task.run([
            'copy:jsToNode',
            'mochaTest:buildCoverage',
        ]);
    });

    /**
     * Build source javascript files
     */
    grunt.registerTask('js-build', function () {
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-browserify');
        grunt.task.run([
            'copy:jsToNode',
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
            'js-build',
            'modernizr',
            'uglify:local',
            'watch:js'
        ]);
    });

    /**
     * Build styles
     */
    grunt.registerTask('style-build', function () {
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
    grunt.registerTask('style', function () {
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run([
            'style-build',
            'watch:sass'
        ]);
    });

    /**
     * Copy and minify images
     */
    grunt.registerTask('img', function () {
        grunt.loadNpmTasks('grunt-newer');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.task.run([
            'newer:imagemin'
        ]);
    });

    /**
     * Run tests and watch for changes to js files
     */
    grunt.registerTask('test', function () {
        grunt.loadNpmTasks('grunt-continue');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run([
            'continueOn',
            'connect:test',
            'test-build',
            'watch:test'
        ]);
    });

    /**
     * Test javascript files against unit tests, lint, todos and coverage
     */
    grunt.registerTask('test-build', function () {
        grunt.loadNpmTasks('grunt-todos');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-mocha');
        grunt.task.run([
            'todos:all',
            'jshint:all',
            'copy:jsToNode',
            'browserify:specTests',
            'coverage',
            'mocha'
        ]);
    });

    /**
     * Build task use for building assets for production
     */
    grunt.registerTask('build', function () {
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

        grunt.task.run([

            // Build files
            'copy:jsToNode',
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
            'csso',
        ]);
    });

    /**
     * Test task used for testing on CI server
     */
    grunt.registerTask('build-test', function () {
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'connect:test',
            'test-build'
        ]);
    });

    /**
     * Test task used for testing on CI server
     */
    grunt.registerTask('build-clean', function () {
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.task.run([
            'clean:build',
        ]);
    });

    // TODO: Create a cleanup job that deletes all source and tmp files before
    // production
};
