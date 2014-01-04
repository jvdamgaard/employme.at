/**
 * Using the danish lang settings for moment.js
 */

// Dependencies
var moment = require('../../bower_components/momentjs/moment');

// Use danish language
moment.lang(require('../../bower_components/momentjs/lang/da'));

module.exports = moment;