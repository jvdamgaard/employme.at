/**
 * Make ajax get calls using promises A+
 *
 * - get
 * - getJSON
 */

// Dependencies
var Promise = require('es6-promise').Promise;

/**
 * Get content of a file using ajax call
 *
 * Example:
 *
 *     get('somefile.js').then(function(content) {
 *         console.log(content);
 *     }, function(error) {
 *         throw error;
 *     });
 *
 * @param  {String} url URL to file to get
 * @return {Promise}
 */
var get = function (url) {
    return new Promise(function (resolve, reject) {

        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function () {
            // This is called even on 404 etc, so check the status
            if (req.status === 200) {
                resolve(req.response);
            } else {
                // Reject with the status text which will hopefully be a meaningful
                // error
                reject(new Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function () {
            reject(new Error('Network Error'));
        };

        // Make the request
        req.send();
    });
};

/**
 * Get json file an transform to javascript object
 *
 * Example:
 *
 *     getJSON('somefile.json').then(function(data) {
 *         console.log(data);
 *     }, function(error) {
 *         throw error;
 *     });
 *
 * @param  {String} url URL to json file to get
 * @return {Promise}
 */
var getJSON = function (url) {
    return get(url).then(JSON.parse);
};

// API objects and functions
module.exports = {
    get: get,
    getJSON: getJSON
};