// plugins

// css processing
const css = () => {
    return $.gulp.src($.path.css.src, {sourcemaps: $.app.isDev})
        .pipe($.gp.concat('main.css')) // into one file
        .pipe($.gp.cssimport()) // include @import
        .pipe($.gp.webpCss())
        .pipe($.gp.autoprefixer())
        .pipe($.gp.shorthand()) // shortening css properties
        .pipe($.gp.groupCssMediaQueries())
        .pipe($.gp.size({title: 'main.css before compression'}))
        .pipe($.gulp.dest($.path.css.dest, {sourcemaps: $.app.isDev}))
        .pipe($.gp.rename({suffix: ".min"}))
        .pipe($.gp.csso())  // min css
        .pipe($.gp.size({title: 'main.css after compression'}))
        .pipe($.gulp.dest($.path.css.dest, {sourcemaps: $.app.isDev}));
}

module.exports = css;