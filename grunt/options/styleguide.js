module.exports = {
    options: {
        name: 'Style Guide',
        preprocessor: 'scss',
        include: 'dist/styles/main.css'
    },

    all: {
        files: {
            'docs/styleguide': 'app/styles/**/*.scss'
        }
    }
};
