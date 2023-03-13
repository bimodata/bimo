const serializeModel = require('./serializeModel');

const serializeThis = function (options) {
  return serializeModel(this, options);
};

module.exports = serializeThis;
