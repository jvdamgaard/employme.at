/*global define */
define([], function () {
    'use strict';

    var sectionHeight = $(window).height();

    var initialize = function () {

        // Adjust based on window height
        $('#home article').height(sectionHeight);
        $('header').css({
            top: sectionHeight + 'px'
        });

        // Activate first slide
        $('#home-hi').addClass('active');

        $(document).on('scroll', function () {
            var pos = $(document).scrollTop();

            // Header
            $('header').toggleClass('active', pos > 0);
            $('header').toggleClass('fixed', pos > 1 * sectionHeight);

            // Home
            $('#home-hi').toggleClass('active', pos <= 0.5 * sectionHeight);
            $('#home-exploring').toggleClass('active', pos > 0.5 * sectionHeight && pos <= 1.5 * sectionHeight);

        });

        // Loading and initilazition finished
        $('body').addClass('loaded');
    };

    initialize();
});