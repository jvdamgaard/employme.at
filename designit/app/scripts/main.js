require.config({
    paths: {
        jquery: 'lib/jquery'
    },
    shim: {}
});

require(['app'], function (app) {
    'use strict';

    app.initialize();
});