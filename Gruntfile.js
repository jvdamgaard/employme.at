// TODO: Clean up using https://github.com/gruntjs/grunt/issues/975#issuecomment-29058707

var _ = require('lodash');

/* Load grunt config files from path */
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
    // require('load-grunt-tasks')(grunt);

    var config = {
        app: {
            source: 'app',
            dist: 'dist',
            test: 'test',
            docs: 'docs'
        },
        pkg: require('./package.json')
    };

    // Load all config file in options folder
    config = _.assign(config, loadConfig('./grunt/options/'));
    grunt.initConfig(config);

    // Load custom grunt tasks
    //grunt.loadTasks('grunt');

    /**
     * Start node server and livereload on changes
     */
    grunt.registerTask('server', function () {
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-newer');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-express-server');
        grunt.loadNpmTasks('grunt-open');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run([
            'shell:bowerInstall',
            'newer:copy',
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
        grunt.loadNpmTasks('grunt-styleguide');
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run([
            'styleguide',
            'shell:doxx',
            'connect:jsdoc',
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
     * Build and watch javascript
     */
    grunt.registerTask('js', function () {
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-modernizr');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run([
            'browserify:sources',
            'modernizr',
            'uglify:local',
            'watch:js'
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
     * Build task use for building assets fro production
     */
    grunt.registerTask('build', function () {

        // Load required grunt tasks
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.loadNpmTasks('grunt-remove-logging');
        grunt.loadNpmTasks('grunt-modernizr');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks('grunt-combine-media-queries');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-cssmin');

        // Run grunt tasks
        grunt.task.run([
            // Install dependecies
            'shell:bowerInstall',

            // Build files
            'browserify:sources',
            'sass:build',
            'copy',
            'imagemin',
            'modernizr',

            // Enhance
            'autoprefixer',

            // Minify
            'removelogging',
            'cmq',
            'uglify:build',
            'cssmin'
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