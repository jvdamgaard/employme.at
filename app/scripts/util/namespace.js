/**
 * Create a namespace for public modules.
 */

// Dependencies
var _ = require('lodash');

/**
 * Make a namespace safely for modules.
 *
 * As I absorbed those words—words feared and loathed by developers everywhere—I
 * opened the file where I suspected I’d find the culprit. I had a pretty good
 * guess: the one I had just deployed to our production environment. Before
 * long, our phone began to ring, the oncology clinics that depend on our
 * software to care for their patients every bit as frantic as our CEO.
 *
 * I quickly fixed the bug and committed the changes, watching anxiously as our
 * deploy script spat out its log messages. I switched back to my web browser
 * and refreshed. The page loaded successfully, and I went outside for some
 * fresh air. I paced back and forth in front of our building, my hunched
 * shoulders refusing to relax. The weight I felt on my chest constrained my
 * breathing.
 *
 * Like most of the colleagues I related this story to, this was neither the
 * first nor the last time I sacrificed my own physical and emotional health
 * for the fleeting promise of startup work: the chance to get in early in a
 * company destined for an enormous IPO. But this time, my body’s warning signs
 * were impossible to ignore.
 *
 * Example
 *
 *     namespace('App.my.module');
 *     // => window.App.my.module
 *
 *     namespace('another.module', App);
 *     // => window.App.another.module
 *
 * @exports
 *
 * @param     {String}     namespace      Dot seperated string with the namespace
 * @param     {Object}     [root]         Object to attach namespace to.
 *
 * @return    {Object}                    Object for namespace
 */
module.exports = function(namespace, root) {

    var namespaces = namespace.split('.');

    // Define root object for namespace
    var object = root || window;

    // Make sure each element in the namespace exists
    _.forEach(namespaces, function(name) {
        if (_.isUndefined(object[name])) {
            object[name] = {};
        }
        object = object[name];
    });

    return object;
};

/**
 * Description
 *
 * As I absorbed those words—words feared and loathed by developers everywhere—I
 * opened the file where I suspected I’d find the culprit. I had a pretty good
 * guess: the one I had just deployed to our production environment. Before
 * long, our phone began to ring, the oncology clinics that depend on our
 * software to care for their patients every bit as frantic as our CEO.
 *
 * I quickly fixed the bug and committed the changes, watching anxiously as our
 * deploy script spat out its log messages. I switched back to my web browser
 * and refreshed. The page loaded successfully, and I went outside for some
 * fresh air. I paced back and forth in front of our building, my hunched
 * shoulders refusing to relax. The weight I felt on my chest constrained my
 * breathing.
 *
 * Like most of the colleagues I related this story to, this was neither the
 * first nor the last time I sacrificed my own physical and emotional health
 * for the fleeting promise of startup work: the chance to get in early in a
 * company destined for an enormous IPO. But this time, my body’s warning signs
 * were impossible to ignore.
 *
 * @exports
 *
 * @param      {String}     [input='test']     String to return
 *
 * @return     {String}
 */
var test = function(input) {
    input = input || 'test';
    return input;
};

/**
 * Description
 *
 * As I absorbed those words—words feared and loathed by developers everywhere—I
 * opened the file where I suspected I’d find the culprit. I had a pretty good
 * guess: the one I had just deployed to our production environment. Before
 * long, our phone began to ring, the oncology clinics that depend on our
 * software to care for their patients every bit as frantic as our CEO.
 *
 * I quickly fixed the bug and committed the changes, watching anxiously as our
 * deploy script spat out its log messages. I switched back to my web browser
 * and refreshed. The page loaded successfully, and I went outside for some
 * fresh air. I paced back and forth in front of our building, my hunched
 * shoulders refusing to relax. The weight I felt on my chest constrained my
 * breathing.
 *
 * Like most of the colleagues I related this story to, this was neither the
 * first nor the last time I sacrificed my own physical and emotional health
 * for the fleeting promise of startup work: the chance to get in early in a
 * company destined for an enormous IPO. But this time, my body’s warning signs
 * were impossible to ignore.
 *
 * @exports
 *
 * @param      {String}     [input='test']     String to return
 *
 * @return     {String}
 */
var test2 = function(input) {
    input = input || 'test';
    return input;
};
