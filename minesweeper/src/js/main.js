const { Model } = require('./modules/model');
const { View } = require('./modules/view');
const { Controller } = require('./modules/controller');

// console.log('Model', new Model(10, 10));
// const data =
const app = new Controller(Model, View);

module.exports.app = app;
