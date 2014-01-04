/**
 * Using the danish lang settings for moment.js
 */

// Dependencies
var moment = require('../../../.tmp/bower_components/momentjs/moment');

// Use danish language
moment.lang(require('../../../.tmp/bower_components/momentjs/lang/da'));

module.exports = moment;
