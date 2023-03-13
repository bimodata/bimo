/* eslint-disable no-param-reassign */

const unserializeInstance = require('./unserializeInstance');

async function parseModel(serializedModel, params = {}) {
  // console.log(`In parseModel with:
  // serializedModel: (keys:) ${Object.keys(serializeModel)}
  // params: ${JSON.stringify(params)}`);

  params.knownClassByClassName = params.knownClassByClassName || {};
  params.knownClassByClassName.Object = Object;

  params.repositoryByClassName = params.repositoryByClassName || {};

  const { serializedRootObject, serializedInstanceByIdByType } = serializedModel;

  params.unserializedInstanceByIdByConstructor = new Map();
  params.serializedInstanceByIdByType = serializedInstanceByIdByType;

  return unserializeInstance(serializedRootObject, params);
}

module.exports = parseModel;
