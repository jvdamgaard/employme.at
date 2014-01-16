// Dependencies
var expect = require('chai').expect;
var $ = require('jquery');

// Source file
var lazyImg = require('app/util/lazy-img');

describe('app/util/lazy-img', function() {

    var imgSrc = '/data/blank.gif';

    lazyImg();

    it('should set the src attribute of an img tag', function(done) {
        var $image = $('<img class="lazy-img" data-src="' + imgSrc + '" />')
            .prependTo('body');
        $image.on('load', function() {
            expect($image.attr('src')).to.not.eql(imgSrc);
            $image.remove();
            done();
        });
        lazyImg.load();
    });

});
