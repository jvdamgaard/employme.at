/**
 * Minify css
 */

module.exports = {
    options: {
        report: 'min'
    },
    build: {
        files: {
            '<%= app.dist %>/styles/main.css': ['<%= app.dist %>/styles/main.css']
        }
    }
};
