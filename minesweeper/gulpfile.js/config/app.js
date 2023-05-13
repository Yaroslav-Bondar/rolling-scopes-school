// read arguments from command line
// to set plugin configurations depending on the mode build run
// build run
const isProd = process.argv.includes('--production');
const isDev = !isProd;

module.exports = {
    
    isProd: isProd,
    
    isDev: isDev,
    
    htmlmin: {
        // delete whitespaces from html
        collapseWhitespace: isProd,
    },

    pug: {
        // compression pug files
        pretty: isDev,
        data: {
            news: require('../../src/assets/data/java-script-news.json'),
        },
    },

    webpack: {
        mode: isProd ? 'production': 'development',
    },

    imgemin: {
        verbose: true,
    },

    fonter: {
        formats: ['ttf', 'woff', 'eot', 'svg']
    }
}