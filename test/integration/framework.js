var expect = require('chai').expect;

// Require sources to test
//  - path to sources: ../../../assets/scripts


describe('Async testframework', function () {
	it('should be running', function (done) {
		var startTime = new Date().getTime();
		setTimeout(function () {
			var endTime = new Date().getTime();
			expect(endTime).to.be.greaterThan(startTime);
			done();
		}, 50);

	});
});