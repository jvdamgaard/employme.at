/**
 * Use blanket package for making test coverage
 */

require('blanket')({
	// Only files that match the pattern will be instrumented
	pattern: 'app/scripts/'
});