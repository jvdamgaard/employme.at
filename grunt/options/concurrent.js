/**
 * Runn grunt tasks i parallel for better peformance
 */

module.exports = {
    localMake: [
        'sass:local',
        'browserify:all',
        'newer:copy',
        'newer:imagemin',
        'styleguide'
    ],
    localEnhance: [
        'modernizr',
        'autoprefixer'
    ],
    localConcat: [
        'uglify:local'
    ],

    buildMake: [
        'browserify:sources',
        'sass:build',
        'newer:copy',
        'newer:imagemin',
        'styleguide'
    ],
    buildEnhance: [
        'removelogging',
        'modernizr',
        'autoprefixer'
    ],
    buildEnhanceTwo: [
        'cmq'
    ],
    buildMinify: [
        'uglify:build',
        'cssmin'
    ],
    buildTest: [
        'mochaTest:build',
        'jshint:all'
    ]
};
