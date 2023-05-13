// plugins
const sassPrepros = require('gulp-sass')(require('sass'));
// sass processing
const sass = () => {
    return $.gulp.src($.path.sass.src, {sourcemaps: $.app.isDev})
        .pipe($.gp.sassGlob()) // import $.path masks
        .pipe(sassPrepros())
        .pipe($.gp.webpCss())
        .pipe($.gp.autoprefixer())
        .pipe($.gp.shorthand()) // shortening css properties
        .pipe($.gp.groupCssMediaQueries())
        .pipe($.gp.size({title: 'main.scss before compression'}))
        .pipe($.gulp.dest($.path.sass.dest, {sourcemaps: $.app.isDev}))
        .pipe($.gp.rename({suffix: ".min"}))
        .pipe($.gp.csso())
        .pipe($.gp.size({title: 'main.scss after compression'}))
        .pipe($.gulp.dest($.path.sass.dest, {sourcemaps: $.app.isDev}))
}

module.exports = sass;