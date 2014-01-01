/**
 * # Namespace
 *
 * Create a namespace for public modules.
 */

// Dependencies

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
    var namespaces = namespace.split('.');
    var object = root || window;

    var i = 0;
    var max = namespaces.length;
    for (; i < max; i += 1) {
        var name = namespaces[i];
        object[name] = object[name] || {};
        object = object[name];
    }

    return object;
};

module.exports = createNamespace;