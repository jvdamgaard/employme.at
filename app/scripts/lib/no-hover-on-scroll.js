/**
 * In conjunction with css this disables hover effect when scrolling resulting
 * in higher framerates.
 */

// Dependencies
var $ = require('jquery');

var $html = $('html');
var timer;
var scrolling = false;

/**
 * Add `disable-hover` to `html` when scroll is activated.
 */
$(window).on('scroll', function() {
    clearTimeout(timer);
    if (!scrolling) {
        scrolling = true;
        $html.addClass('disable-hover');
    }

    timer = setTimeout(function() {
        scrolling = false;
        $html.removeClass('disable-hover');
    }, 500);
});
