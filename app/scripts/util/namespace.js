/**
 * Create a namespace for public modules.
 */

// Dependencies
var _ = require('lodash');

/**
 * Make a namespace safely for modules
 *
 * Example
 *
 *     // Create namespace with direct require
 *     namespace('App.my.module');
 *     // => window.App.my.module
 *
 *     // Create namespace with App as root
 *     var moduleAttachedToApp = namespace('another.module', App);
 *     // => window.App.another.module
 *
 * @exports
 *
 * @param     {String}     namespace      Dot seperated string with the namespace
 * @param     {Object}     [root=window]  Object to attach namespace to.
 *
 * @return    {Object}                    Object for namespace
 */
module.exports = function(namespace, root) {

    // Guard for strings
    if (!_.isString(namespace)) {
        return;
    }

    var namespaces = namespace.split('.');

    // Define root object for namespace
    var object = root || window;

    // Make sure each element in the namespace exists
    _(namespaces).forEach(function(name) {
        if (_.isUndefined(object[name])) {
            object[name] = {};
        }
        object = object[name];
    });

    return object;
};
