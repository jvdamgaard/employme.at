/**
 * Minify jpg and png images
 */

module.exports = {
	all: {
		files: [{
			expand: true,
			cwd: '<%= app.source %>/images',
			src: '**/*.{png,jpg,jpeg}',
			dest: '<%= app.dist %>/images'
		}]
	}
};