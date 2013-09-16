/*global define */
define([], function () {
    'use strict';

    var sectionHeight = $(window).height();

    $('#home article').height(sectionHeight);

    $('#home-hi').addClass('active');

    $(document).on('scroll', function () {
        var pos = $(document).scrollTop();

        $('header').toggleClass('active', pos > 0.5 * sectionHeight);
        $('#home-hi').toggleClass('active', pos <= 0.5 * sectionHeight);
        $('#home-exploring').toggleClass('active', pos > 0.5 * sectionHeight && pos <= 1.5 * sectionHeight);

    });
});