// normalize.css processing
const normalize = () => {
    return $.gulp.src($.path.normalize.src, {sourcemaps: $.app.isDev})
        .pipe($.gp.shorthand()) // shortening css properties
        .pipe($.gp.size({title: 'normalize.css before compression'}))
        .pipe($.gulp.dest($.path.normalize.dest, {sourcemaps: $.app.isDev}))
        .pipe($.gp.rename({suffix: ".min"}))
        .pipe($.gp.csso())  // min css
        .pipe($.gp.size({title: 'normalize.css after compression'}))
        .pipe($.gulp.dest($.path.normalize.dest, {sourcemaps: $.app.isDev}));
}

module.exports = normalize;