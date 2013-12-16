/**
 * Main entry for the javascripts
 * - logs version of dependencies
 */

// Dependencies
var _ = require('lodash'),
    $ = require('jquery'),
    moment = require('moment'),
    app = require('app');


var appVersion = ' ' + app.name;
for (var i = 24 - app.name.length - 1; i >= 0; i--) {
    appVersion += ' ';
}
appVersion += ': ' + app.version;

console.log('------------------------------------------------------------------------');
console.log(appVersion); /*RemoveLogging:skip*/
console.log('------------------------------------------------------------------------');
console.log(' - jQuery                : ' + $.fn.jquery);
console.log(' - Modernizr             : ' + Modernizr._version);
console.log(' - Lo-Dash               : ' + _.VERSION);
console.log(' - Moment.js             : ' + moment.version);
console.log('------------------------------------------------------------------------');
