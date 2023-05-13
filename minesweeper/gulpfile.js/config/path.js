const pathSrc = './src';
const pathDest = './public';

module.exports = {
    root: pathDest,
    html: {
        src: pathSrc + '/html/*.html',
        watch: pathSrc + '/html/**/*.html',
        dest: pathDest,
    },
    pug: {
        src: pathSrc + '/pug/*.pug',
        watch: pathSrc + '/pug/**/*.pug',
        dest: pathDest,
    },
    css: {
        src: pathSrc + '/css/*.css',
        watch: pathSrc + '/css/**/*.css',
        dest: pathDest + '/css',
    },
    normalize: {
        src: pathSrc + '/css/normalize/{normalize,reset}.css',
        watch: pathSrc + '/css/normalize/{normalize,reset}.css',
        dest: pathDest + '/css/normalize',
    },
    sass: {
        src: pathSrc + '/sass/*.{sass,scss}',
        watch: pathSrc + '/sass/**/*.{sass,scss}',
        dest: pathDest + '/css',
    },
    js: {
        src: pathSrc + '/js/*.js',
        watch: pathSrc + '/js/**/*.js',
        dest: pathDest + '/js',
    },
    img: {
        src: pathSrc + '/assets/img/**/*.{png,jpg,jpeg,gif,svg}',
        watch: pathSrc + '/assets/img/**/*.{png,jpg,jpeg,gif,svg}',
        dest: pathDest + '/assets/img',
    },
    font: {
        src: pathSrc + "/assets/font/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
        watch: pathSrc + "/assets/font/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}",
        dest: pathDest + "/assets/font",
    },
}