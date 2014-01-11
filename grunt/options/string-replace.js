/**
 * Replace long path to js files i coverage report
 */

var pathMac = __dirname.replace('grunt/options', 'app/scripts/');
var pathWin = __dirname.replace('grunt\\options', 'app\\scripts\\');

module.exports = {

    // Test on local environment + generate coverage repport
    coverage: {
        files: {
            '.tmp/coverage/index.html': '.tmp/coverage/index.html'
        },
        options: {
            replacements: [{
                pattern: new RegExp(pathMac, 'g'),
                replacement: ''
            }, {
                pattern: new RegExp(pathWin, 'g'),
                replacement: ''
            }]
        }
    }
};
