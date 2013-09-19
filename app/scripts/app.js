/*global define */
define([], function () {
    'use strict';

    var windowHeight;

    /**
     * Initialize app
     * @return {void}
     */
    var initialize = function () {

        setSectionsHeight();

        // Loading and initilazition finished
        $('body').addClass('loaded');

        // Activate first slide
        $('#home-hi').addClass('active');
    };


    /**
     * Global events
     */

    $(window).on('resize orientationchange', function () {
        windowHeight = $(window).height();
        setSectionsHeight();
        addjustControllers();
    });

    $(document).on('scroll', function () {
        addjustControllers();
    });

    /**
     * Adjust sections based on scroll position
     * @return {void}
     */
    var addjustControllers = function () {
        var posTop = $(document).scrollTop();

        var activate = function (selector) {
            activateElement(selector, posTop);
        };

        // Header
        var $header = $('header');
        $header.toggleClass('active', posTop > 0);
        $header.toggleClass('fixed', posTop > windowHeight);
        $('#portrait-image .image').css({
            height: (windowHeight / 2 - posTop) / windowHeight * 2 * 100 + '%'
        });

        // Home
        activate('#home-hi');
        activate('#home-exploring');

        // Test
        activate('#test');

    };

    var activateElement = function (selector, posTop) {
        var $el = $(selector);

        if ($el.length === 0) {
            return false;
        }

        var posBottom = posTop + windowHeight;
        var offsetTop = $el.offset().top;
        var height = $el.height();
        var topMiddle = offsetTop + (windowHeight / 2);
        var bottomMiddle = offsetTop + height - (windowHeight / 2);

        var activate = (posBottom > topMiddle && posTop < bottomMiddle);

        $el.toggleClass('active', activate);

        return true;
    };

    /**
     * Set all sections heights based on window height
     */
    var setSectionsHeight = function () {
        windowHeight = $(window).height();

        $('header').css({
            top: windowHeight + 'px'
        });

        $('#home article').css({
            height: windowHeight
        });
    };

    initialize();
});