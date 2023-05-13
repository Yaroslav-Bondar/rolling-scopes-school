const webpack = require('webpack-stream'); // bundling js modules

// js processing
const js = () => {
    return $.gulp.src($.path.js.src, {sourcemaps: $.app.isDev})
    .pipe($.gp.babel()) // use the latest features of java script
    .pipe(webpack($.app.webpack)) // bundling js modules 
    // .pipe(dest(path.js.dest, {sourcemaps: app.isDev}))
    // .pipe(rename({suffix: ".min"}))
    // .pipe(uglify()) // min js file
    .pipe($.gulp.dest($.path.js.dest, {sourcemaps: $.app.isDev}));
}

module.exports = js;