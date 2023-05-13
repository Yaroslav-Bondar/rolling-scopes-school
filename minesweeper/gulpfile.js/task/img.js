// img processing
const img = () => {
    return $.gulp.src($.path.img.src)
    .pipe($.gp.newer($.path.img.dest)) // processing only new or changed files 
    .pipe($.gp.webp()) // convert img files to webp format
    .pipe($.gulp.dest($.path.img.dest))
    .pipe($.gulp.src($.path.img.src))
    .pipe($.gp.newer($.path.img.dest))
    .pipe($.gp.if($.app.isProd, $.gp.imagemin($.app.imagemin))) //  launch of the plugin depending on the condition
    .pipe($.gulp.dest($.path.img.dest));
}

module.exports = img;