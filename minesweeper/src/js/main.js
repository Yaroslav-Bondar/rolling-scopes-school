const Model = require('./modules/model');
const View = require('./modules/view');
const Controller = require('./modules/controller');

const app = new Controller(new Model(), new View());

module.exports.app = app;
