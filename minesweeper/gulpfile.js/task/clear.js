const del = require('del');

// delete dir
function clear() {
    return del($.path.root);
}

module.exports = clear;