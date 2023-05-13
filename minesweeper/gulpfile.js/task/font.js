
// font processing
const font = () => {
    return $.gulp.src($.path.font.src)
    .pipe($.gp.newer($.path.font.dest)) // processing only new or changed files 
    .pipe($.gp.fonterFix($.app.fonter)) // convert fonts
    .pipe($.gulp.dest($.path.font.dest))
    .pipe($.gp.ttf2woff2())
    .pipe($.gulp.dest($.path.font.dest));
}

module.exports = font;