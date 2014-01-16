/**
 * Using the danish lang settings for moment.js.
 *
 * #### Shims to
 *
 *     var moment = require('moment');
 */

// Dependencies
var moment = require('../../../.tmp/bower_components/momentjs/moment');

// Use danish language
moment.lang(require('../../../.tmp/bower_components/momentjs/lang/da'));

module.exports = moment;
