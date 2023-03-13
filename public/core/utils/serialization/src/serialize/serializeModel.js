const serializeObjectOrBufferOrMapInstance = require('./serializeObjectOrBufferOrMapInstance');

function serializeModel(instance, options = {}) {
  if (typeof instance !== 'object') {
    throw new Error('Instance must be an object');
  }
  const dataByConstructorName = new Map();
  /*
   * const exampleOfDataByConstructorName = {
   *  SegmentPivot: {
   *    nextId: 2,
   *    idByInstance: {
   *      "first instance ...": 1,
   *      "second instance ....": 2,
   *      "third instance ...": 3
   *    },
   *    serializedInstanceById: {
   *      1: {...},
   *      2: {...},
   *      3: {...}
   *    }
   *  }
   * }
   */

  const serializedRootObject = serializeObjectOrBufferOrMapInstance(instance, dataByConstructorName, false, options);

  const serializedInstanceByIdByType = {};
  dataByConstructorName.forEach((data, constructorName) => {
    serializedInstanceByIdByType[constructorName] = data.serializedInstanceById;
  });

  return { serializedRootObject, serializedInstanceByIdByType };
}

module.exports = serializeModel;
