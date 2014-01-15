/**
 * jQuery lazy load of `<img>` and `background-image`
 */

// TODO: Test
// TODO: Retina
// TODO: lazy as option
// TODO: Docs
// TODO: Media query
// TODO: Cache pos of elements
// TODO: Split resize and scroll
// TODO: Add lazy--loaded class when loaded
// TODO: Preload images and set source, when loaded

// Dependencies
var $ = require('jquery');
var _ = require('lodash');

// Constants
var RETINA = window.devicePixelRatio > 1;

// jQuery cached elements
var $window = $(window);
var $images;
var $loaded;

// Other vars
var windowWidth = $window.width();
var selector;
var threshold;
var sizes;
var retinaPrefix;
var mqSizes = [];

var getSource = function($this, callback) {
    // TODO: Make retina and media query funcionality
    // TODO: Preload image
    var source;

    var i = mqSizes.length - 1;
    var sizeLabel;
    var mqSize;
    while (!source && i >= -1) {
        if (i >= 0) {
            mqSize = mqSizes[i];
            if (windowWidth < mqSizes[i]) {
                continue;
            }
            sizeLabel = 'src-' + _.findKey(sizes, mqSize);
        } else {
            sizeLabel = 'src';
        }

        if (RETINA) {
            source = $this.data(sizeLabel + '-' + retinaPrefix);
        }

        if (!source) {
            source = $this.data(sizeLabel);
        }
        i -= 1;
    }

    if (source) {
        callback(source);
    }
};

var attachSource = function() {
    var $this = $(this);
    getSource($this, function(source) {
        if ($this.is('img')) {
            // Set source on img tags
            $this.attr('src', source);
        } else {
            // Set background-image on all other tags
            $this.css({
                'background-image': 'url(' + source + ')'
            });
        }
    });
};

var showImages = function() {
    var $inview = $images.filter(function() {
        var $e = $(this);
        if ($e.is(':hidden')) {
            return;
        }

        // FIXME: Causes way to many repaints
        var wt = $window.scrollTop();
        var wb = wt + $window.height();
        var et = $e.offset().top;
        var eb = et + $e.height();

        return eb >= wt - threshold && et <= wb + threshold;
    });

    $loaded = $inview.trigger('show-image');
    $images = $images.not($loaded);

    if ($images.length === 0) {
        $window.off('scroll', showImages);
    }
};

module.exports = function(options) {

    // Options
    options = options || {};
    selector = options.selector || '.lazy';
    threshold = options.threshold || 0;
    sizes = options.sizes || {
        small: 640,
        medium: 900,
        large: 1200
    };
    retinaPrefix = options.retinaPrefix || 'retina';

    mqSizes = _.values(sizes).sort(function(a, b) {
        return a - b;
    });

    // Cache jQuery elements
    $images = $(selector);

    $images.each(function() {
        $(this).one('show-image', attachSource);
    });

    // Start listening for scroll and resize events
    $window.on('scroll', showImages);
    // TODO: on resize

    // Init
    showImages();

};
