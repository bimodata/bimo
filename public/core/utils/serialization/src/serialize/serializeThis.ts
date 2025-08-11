import serializeModel from './serializeModel'

const serializeThis = function (options: {} | undefined) {
  return serializeModel(this, options);
};

export default serializeThis
