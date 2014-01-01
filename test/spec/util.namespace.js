// Dependencies
var expect = require('chai').expect;

// Source file
var namespace = require('../../app/scripts/util/namespace');

describe('util/namespace', function() {

    var modules = {};

    it('should convert a dot notated string to an empty object', function () {
        namespace('a.test.module', modules);
        expect(modules.a.test.module).to.be.an('object');
    });

    it('should return the created object', function() {
        var module = namespace('another.test.module', modules);
        expect(module).to.eql(modules.another.test.module);
    });
});