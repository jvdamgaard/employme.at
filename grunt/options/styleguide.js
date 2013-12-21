module.exports = {
	options: {
		name: 'Style Guide',
		preprocessor: 'scss',
		include: '<%= app.dist %>/styles/main.css'
	},

	all: {
		files: {
			'<%= app.docs %>/styleguide': '<%= app.source %>/styles/**/*.scss'
		}
	}
};