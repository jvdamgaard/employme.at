/**
 * Main entry for the javascripts
 *
 * - logs version of dependencies
 */

// Dependencies
var _ = require('lodash');
var $ = require('jquery');
var moment = require('moment');
var app = require('app');

/**
 * Log version of dependencies with beautified formatting
 *
 * Example:
 *
 *     logVersion('Lo-Dash', _.VERSION);
 *
 * @param  {string} name    Name og librariry/dependency
 * @param  {string} version Version number in format {major}.{minor}.{patch}
 * @return {void}
 */
var logVersion = function (name, version) {
    var charsBeforeSeperator = 25;
    var content = ' - ' + name;
    content += new Array(charsBeforeSeperator - content.length).join(' ');
    content += ': ' + version;
    console.log(content);
};

/**
 * Log a seperator with lines
 * @return {void}
 */
var logSeperator = function () {
    console.log('------------------------------------------');
};

// Log versions of dependencies
logSeperator();
logVersion(app.name, app.version);
logSeperator();
logVersion('jQuery', $.fn.jquery);
logVersion('Modernizr', Modernizr._version);
logVersion('Lo-Dash', _.VERSION);
logVersion('Moment.js', moment.version);
logSeperator();