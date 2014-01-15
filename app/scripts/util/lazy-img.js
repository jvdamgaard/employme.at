/**
 * Lazy load of `<img>` and `background-image` based on window width and device pixel ratio.
 *
 * Example
 *
 *     // Init lazy img
 *     lazyImg({
 *         threshold: 200,
 *         selector: 'lazy-img'
 *     });
 *
 *     // Rerun image loader after element has been appended
 *     $('<img class="lazy-img" width="200" height="100"' +
 *         'data-src="img-mobile.jpg"' +
 *         'data-src-retina="img-mobile@2x.jpg"' +
 *         'data-src-small="img-tablet.jpg"' +
 *         'data-src-small-retina="img-tablet@2x.jpg"' +
 *         'data-src-medium="img-desktop.jpg"' +
 *         'data-src-medium-retina="img-desktop@2x.jpg"' +
 *         'data-src-large="img-large-desktop.jpg"' +
 *         'data-src-large-retina="img-large-desktop@2x.jpg"' +
 *         '/>').appendTo('html');
 *
 *     lazyImg.showImages();
 */

// Dependencies
var $ = require('jquery');
var _ = require('lodash');

// jQuery cached elements
var $window = $(window);
var $images;

// Other vars
var isRetina = window.devicePixelRatio > 1;
var mqSizes = [];
var windowWidth;
var windowHeight;
var selector;
var threshold;
var sizes;
var retinaPrefix;
var isLazy;

/**
 * Determine the source for this element based on the windows width.
 * Source is the highest matching src data.
 *
 * @param           {jqObject}          $this             jQuery object for image
 * @param           {Function}          callback
 *
 * @return          {void}
 */
var getSource = function($this, callback) {
    var source;
    var i = mqSizes.length - 1;
    var sizeLabel;
    var mqSize;

    // Find highest (largest window width) matching source
    while (!source && i >= -1) {

        if (i >= 0) { // 'Special' sources found
            mqSize = mqSizes[i];
            if (windowWidth < mqSizes[i]) {
                i--;
                continue;
            }
            sizeLabel = 'src-' + _.findKey(sizes, mqSize);

        } else { // Non 'special' sources found. Use default source
            sizeLabel = 'src';
        }

        if (isRetina) {
            source = $this.data(sizeLabel + '-' + retinaPrefix);
        }

        if (!source) {
            source = $this.data(sizeLabel);
        }
        i--;
    }

    if (source !== $this.data('source')) {
        $this.data('source', source);

        $this.removeClass(selector.replace('.', '') + '--loaded');

        // Cache image
        $('<img/>').attr('src', source).load(function() {
            $(this).remove(); // prevent memory leaks as @benweet suggested
            callback(source);
        });
    }
};
/**
 * Callback used for getSource
 * @callback                        callback
 * @param           {String}        source                  URL for source to image
 */

/**
 * Set `src` for `<img>` and `background-image` for all other elements.
 *
 * @return          {void}
 */
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

        // Loaded class for use with stylesheet
        $this.addClass(selector.replace('.', '') + '--loaded');
    });
};

/**
 * Cache dimensions of window and image elements
 *
 * @return          {void}
 */
var getDimensions = function() {

    // Reset images list to be able to load images with differet media query
    $images = $(selector);

    windowWidth = $window.width();
    windowHeight = $window.height();
    $images.each(function() {
        var $this = $(this);

        // Stores values in data to avoid constant repaint
        $this.data('offset-top', $this.offset().top);
        $this.data('height', $this.height());
    });
};

/**
 * Detects which images is inside scroll threshold and starts the image loader
 * job. Removes loaded images from the list of images to load.
 *
 * @exports
 *
 * @return          {void}
 */
var showImages = function() {

    var windowScrollTop = $window.scrollTop();

    // Find images to be loaded
    var $loaded = $images.filter(function() {

        if (!isLazy) {
            return true;
        }

        var $this = $(this);

        var windowBottom = windowScrollTop + windowHeight;
        var offsetTop = $this.data('offset-top');
        var offsetBottom = offsetTop + $this.data('height');

        return offsetBottom >= windowScrollTop - threshold && offsetTop <= windowBottom + threshold;
    });

    $loaded.trigger('show-image');

    // Remove loaded images from list to avoid multiple setting og source
    $images = $images.not($loaded);
};

/**
 * Initialize the lazy image loader.
 *
 * @exports
 *
 * @param    {Object}    [options]                          Contains options for the image loader
 * @param    {String}    [options.selector='.lazy-img']     Selector to match against images to load.
 * @param    {Int}       [options.threshold=0]              Load images behover they're in the scrolling area. E.g. a value og `200` will load the images when they're 200 pixel above the window area.
 * @param    {Object}    [options.sizes]                    `key`: name, `value`: min-width.
 * @param    {Int}       [options.sizes.small=640]
 * @param    {Int}       [options.sizes.medium=900]
 * @param    {Int}       [options.sizes.large=1200]
 * @param    {String}    [options.retinaPrefix='retina']    Used for identifying retina sources. E.g. `data-src-retina="img@2x.jpg"`.
 * @param    {boolean}   [options.isLazy=true]              If `true` images will first load when in scroll area.
 *
 * @return   {void}
 */
module.exports = function(options) {

    // Options
    options = options || {};
    selector = options.selector || '.lazy-img';
    threshold = options.threshold || 0;
    sizes = options.sizes || {
        small: 640,
        medium: 900,
        large: 1200
    };
    retinaPrefix = options.retinaPrefix || 'retina';
    isLazy = options.isLazy;
    if (!_.isBoolean(isLazy)) {
        isLazy = true;
    }

    // Filter out and sort media queries width numbers
    mqSizes = _.values(sizes).sort(function(a, b) {
        return a - b;
    });

    getDimensions();

    $images.each(function() {
        $(this).on('show-image', attachSource);
    });

    // Start listening for scroll and resize events
    $window.on('scroll', showImages);

    $window.on('resize', function() {
        getDimensions();
        showImages();
    });

    // Init
    showImages();

};

module.exports.showImages = showImages;
