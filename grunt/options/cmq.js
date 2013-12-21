/**
 * Concat equal media queries.
 */

module.exports = {
	all: {
		options: {
			log: true
		},
		files: {
			'<%= app.dist %>/styles': ['<%= app.dist %>/styles/main.css']
		}
	}

};