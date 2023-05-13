
// html processing
const html = () => {
    return $.gulp.src($.path.html.src)
    .pipe($.gp.fileInclude())
    .pipe($.gp.webpHtml()) // to select image type in html (source srcset=)
    .pipe($.gp.size({title: 'before compression'}))
    .pipe($.gp.if($.app.isProd, $.gp.htmlmin($.app.htmlmin))) //  launch of the plugin depending on the condition
    .pipe($.gp.size({title: 'after compression'}))
    .pipe($.gulp.dest($.path.html.dest))
}

module.exports = html;