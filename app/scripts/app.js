/**
 * # Main entry for the javascripts
 *
 * - logs version of dependencies
 */

/**
 * # Dependencies
 */

var _ = require('lodash');
var $ = require('jquery');
var moment = require('moment');
var app = require('app');


/**
 * Holds the name and version number og the website
 * @type {String}
 */
var appVersion = ' ' + app.name;
for (var i = 24 - app.name.length - 1; i >= 0; i--) {
	appVersion += ' ';
}
appVersion += ': ' + app.version;


/**
 * Log versions of dependencies
 */
console.log('------------------------------------------------------------------------');
console.log(appVersion);
console.log('------------------------------------------------------------------------');
console.log(' - jQuery                : ' + $.fn.jquery);
console.log(' - Modernizr             : ' + Modernizr._version);
console.log(' - Lo-Dash               : ' + _.VERSION);
console.log(' - Moment.js             : ' + moment.version);
console.log('------------------------------------------------------------------------');