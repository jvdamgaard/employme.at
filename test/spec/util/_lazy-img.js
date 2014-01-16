// Dependencies
// var expect = require('chai').expect;
var $ = require('jquery');

// Source file
var lazyImg = require('app/util/lazy-img');

describe('app/util/lazy-img', function() {

    var imgSrc = '/image.jpg';

    lazyImg();

    it('should set the src attribute of an img tag', function(done) {
        done();
        var $image = $('<img />')
            .addClass('lazy-img')
            .data('src', imgSrc)
            .appendTo('body');
        $image.on('load', done);
        lazyImg.showImages();
    });

});
