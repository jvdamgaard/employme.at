require.config({
    paths: {
        jquery: 'lib/jquery'
    },
    shim: {}
});

require(['app', 'jquery'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});