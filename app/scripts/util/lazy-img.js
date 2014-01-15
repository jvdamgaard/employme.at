/**
 * jQuery lazy load of `<img>` and `background-image`
 */

// TODO: Rename
// TODO: Test
// TODO: Retina
// TODO: lazy as option
// TODO: Docs
// TODO: Media query
// TODO: Cache pos of elements
// TODO: Split resize and scroll

// Dependencies
var $ = require('jquery');

// Constants
var RETINA = window.devicePixelRatio > 1;

// jQuery cached elements
var $window = $(window);
var $images;
var $loaded;

// Other vars
var windowWidth;
var selector;
var threshold;
var sizes;
var retinaPrefix;

var getSource = function(el) {
    // TODO: Make retina and media query funcionality
    return $(el).data('src');
};

var attachSource = function() {
    var source = getSource(this);

    // Set source on img tags
    if ($(this).is('img')) {
        $(this).attr('src', source);

        // Set background-image on all other tags
    } else {
        $(this).css({
            'background-image': 'url(' + source + ')'
        });
    }
};

var showImages = function() {
    var $inview = $images.filter(function() {
        var $e = $(this);
        if ($e.is(':hidden')) {
            return;
        }

        var wt = $window.scrollTop();
        var wb = wt + $window.height();
        var et = $e.offset().top;
        var eb = et + $e.height();

        return eb >= wt - threshold && et <= wb + threshold;
    });

    $loaded = $inview.trigger('show-image');
    $images = $images.not($loaded);

    if ($images.length === 0) {
        $window.off('scroll resize', showImages);
    }
};

module.exports = function(options) {

    // Options
    selector = options.selector || '.lazy';
    threshold = options.threshold || 0;
    sizes = options.sizes || {
        small: 640,
        medium: 900,
        large: 1200
    };
    retinaPrefix = options.retinaPrefix || 'retina';

    // Cache jQuery elements
    $images = $(selector);

    $images.each(function() {
        $(this).one('show-image', attachSource);
    });

    // Start listening for scroll and resize events
    $window.on('scroll resize', showImages);

};
