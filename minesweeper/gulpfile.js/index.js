// node global object (like window in JavaScript)
// now these variables are available from everywhere
global.$ = {
    // packages
    gulp: require('gulp'),
    // get all gulp files from package.json
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),
    // configuration 
    path: require('./config/path.js'),
    app: require('./config/app.js'),
}
// tasks:

// get modules from the catalog
const requireDir = require('require-dir');
// recurse: true - load all subdirectories
const task = requireDir('./task', {recurse: true});

// observation task.html
const watcherHtml = () => {
    $.gulp.watch($.path.html.watch, task.html).on('all', $.browserSync.reload);
    // $.gulp.watch(path.css.$.gulp.watch, task.css).on('all', $.browserSync.reload);
    $.gulp.watch($.path.sass.watch, task.sass).on('all', $.browserSync.reload);
    $.gulp.watch($.path.js.watch, task.js).on('all', $.browserSync.reload);
    $.gulp.watch($.path.img.watch, task.img).on('all', $.browserSync.reload);
    $.gulp.watch($.path.font.watch, task.font).on('all', $.browserSync.reload);
    $.gulp.watch($.path.normalize.watch, task.normalize).on('all', $.browserSync.reload);
}
// observation task.pug
const watcherPug = () => {
    $.gulp.watch($.path.pug.watch, task.pug).on('all', $.browserSync.reload);
    // $.gulp.watch(path.css.$.gulp.watch, task.css).on('all', $.browserSync.reload);
    $.gulp.watch($.path.sass.watch, task.sass).on('all', $.browserSync.reload);
    $.gulp.watch($.path.js.watch, task.js).on('all', $.browserSync.reload);
    $.gulp.watch($.path.img.watch, task.img).on('all', $.browserSync.reload);
    $.gulp.watch($.path.font.watch, task.font).on('all', $.browserSync.reload);
    $.gulp.watch($.path.normalize.watch, task.normalize).on('all', $.browserSync.reload);
}

// production
const build = $.gulp.series(task.clear, $.gulp.parallel(task.html, task.sass, task.normalize, task.js, task.img, task.font));

// develop   
const devHtml = $.gulp.series(build, $.gulp.parallel(task.server, watcherHtml));

// task export
// exports.server = task.server;
exports.clear = task.clear;
exports.pug = task.pug;
exports.css = task.css;
exports.normalize = task.normalize;
exports.sass = task.sass;
exports.js = task.js;
exports.img = task.img;
exports.html = task.html;
exports.font = task.font;
exports.build = build; 
// assembly
exports.devPug = $.gulp.series(task.clear, $.gulp.parallel(task.pug, task.css, task.normalize, task.js, task.img, task.font), $.gulp.parallel(task.server, watcherPug));
exports.devHtml = devHtml;

// run in production mode or development :

// development mode:
    // gulp
        // or
    // npm run start (see scripts in packge.json)

// production mode:
    // gulp --production
        // or
    // npm run build (see scripts in packge.json)

exports.default = $.app.isProd ? build : devHtml;
