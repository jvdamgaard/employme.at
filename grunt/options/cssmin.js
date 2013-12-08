/**
 * Minify css
 */

module.exports = {
	options: {
		keepSpecialComments: 0, // Do not keep licens comments ect.
		report: 'gzip'
	},
	build: {
		files: {
			'<%= app.dist %>/styles/main.css': ['<%= app.dist %>/styles/main.css']
		}
	}
};