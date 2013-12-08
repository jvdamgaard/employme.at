/**
 * Minify javascript
 */

module.exports = {
	build: {
		files: {
			'<%= app.dist %>/scripts/app.js': ['<%= app.dist %>/scripts/app.js'],
			'<%= app.dist %>/scripts/head.js': [
				'.tmp/scripts/modernizr.js',
				'<%= app.source %>/bower_components/picturefill/picturefill.js'
			]
		}
	},
	local: {
		options: {
			sourceMap: '<%= app.dist %>/scripts/head.js.map'
		},
		files: {
			'<%= app.dist %>/scripts/head.js': [
				'.tmp/scripts/modernizr.js',
				'<%= app.source %>/bower_components/picturefill/picturefill.js'
			]
		}
	}
};