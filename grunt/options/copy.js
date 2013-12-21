/**
 * Copy files
 */

module.exports = {

	// Put files not handled in other tasks here
	all: {
		files: [{
			expand: true,
			dot: true,
			cwd: '<%= app.source %>',
			dest: '<%= app.dist %>',
			src: [
				'*.{ico,png,txt}',
				'images/{,*/}*.{webp,gif}',
				'fonts/{,*/}*.*',
				'index.html'
			]
		}]
	},
	styledocco: {
		files: [{
			expand: true,
			dot: true,
			cwd: '<%= app.docs %>/lib/styledocco-bootstrap-theme',
			dest: 'node_modules/grunt-styleguide/node_modules/styledocco/share',
			src: ['*']
		}]
	}
};