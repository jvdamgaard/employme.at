/**
 * Using browserify to make modular javascript using the CommonJS syntax also used i Node.js
 */

module.exports = {
    options: {

        // Register global modules
        alias: [
            './<%= app.source %>/bower_components/jquery/jquery.js:jquery',
            './<%= app.source %>/bower_components/lodash/dist/lodash.js:lodash',
            './<%= app.source %>/scripts/lib/moment-shim.js:moment',
            './package.json:app'
        ]
    },

    // Compile spec tests
    specTests: {
        options: {
            debug: true
        },
        files: {
            '.tmp/tests/specs.js': [
                '<%= app.test %>/spec/**/*.js'
            ]
        }
    },

    // Compile integration tests
    integrationTests: {
        options: {
            debug: true
        },
        files: {
            '.tmp/tests/integrations.js': [
                '<%= app.test %>/integration/**/*.js'
            ]
        }
    },

    // Compile source file
    sources: {
        options: {
            debug: true
        },
        files: {
            '<%= app.dist %>/scripts/app.js': [
                '<%= app.source %>/scripts/app.js'
            ]
        }
    },

    // Compile all above in one task
    all: {
        options: {
            debug: true
        },
        files: {
            '<%= app.dist %>/scripts/app.js': [
                '<%= app.source %>/scripts/app.js'
            ],
            '.tmp/tests/integrations.js': [
                '<%= app.test %>/integration/**/*.js'
            ],
            '.tmp/tests/specs.js': [
                '<%= app.test %>/spec/**/*.js'
            ]
        }
    }
};
