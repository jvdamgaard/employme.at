/**
 * Run shell tasks
 */

module.exports = {
    bowerInstall: {
        command: 'bower install'
    },
    doxx: {
        command: 'doxx --source <%= app.source %>/scripts --target .tmp/js --template <%= app.docs %>/lib/doxx-template.jade'
    }
};
