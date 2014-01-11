/**
 * Replace long path to js files i coverage report
 */

var path = __dirname.replace('grunt/options', 'app/scripts/');

module.exports = {

    // Test on local environment + generate coverage repport
    coverage: {
        files: {
            '.tmp/coverage/index.html': '.tmp/coverage/index.html'
        },
        options: {
            replacements: [{
                pattern: new RegExp(path, 'g'),
                replacement: ''
            }]
        }
    }
};
