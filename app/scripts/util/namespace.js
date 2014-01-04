/**
 * # Namespace
 *
 * Create a namespace for public modules.
 */

// Dependencies
var _ = require('lodash');

/**
 * Make a namespace safely for modules
 *
 * Examples:
 *
 * ```
 * require('./util/namespace')('App.my.module');
 *
 * App.my.module = {
 *     name: 'Jakob',
 *     birthYear: 1983
 * };
 * ```
 *
 * ```
 * var namespace = require('./util/namespace');
 * var moduleAttachedToApp = namespace('another.module', App);
 * ```
 *
 * @param  {string} name dot seperated string with the namespace
 * @param  {object} root object to attach namespace to. Defaults to ´window´
 * @return {object}      Object for namespace
 */
var createNamespace = function (namespace, root) {

    // Split namespace by dot
    if (!_.isString(namespace)) {
        return;
    }
    var namespaces = namespace.split('.');

    // Define root object for namespace
    var object = root || window || this;

    // Make sure each element in the namespace exists
    _(namespaces).forEach(function(name) {
        if (_.isUndefined(object[name])) {
            object[name] = {};
        }
        object = object[name];
    });

    return object;
};

module.exports = createNamespace;