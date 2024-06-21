/* eslint-disable no-use-before-define */

const KEYS_TO_IGNORE = new Set([
  'temp', '_cachedValueByValueKey', 'ItemConstructor', 'EntityConstructor', '_links', 'policy', '_context', '_abstract', // Todo #29 review policy
  '_placesByReferencePlace', '_rawOirProps',
  'vehicleTask',
]);

function serializeObjectOrBufferOrMapInstance(objectOrBufferOrMapInstance, dataByConstructorName, linkIsAggregation = false, options) {
  const { treatAggregationAsComposition = false } = options;
  // if aggreg, simply return the ID if it exists. Throw if missing and disallowed by options.
  if (linkIsAggregation && !treatAggregationAsComposition) {
    if (!objectOrBufferOrMapInstance.id && !options.allowUnknownAggregatedInstances) {
      const newError = new Error(
        `An aggregated instance is unknown. Save it to its repo first, or use "allowUnknownAggregatedInstances" option.`
        + `See the "unknownAggregetedInstance" prop of this error object for details`,
      );
      newError.name = `UnknownAggregetedInstanceError`;
      // @ts-ignore
      newError.unknownAggregetedInstance = objectOrBufferOrMapInstance;
      throw newError;
    }
    return { _type: objectOrBufferOrMapInstance.constructor.name, _repoId: objectOrBufferOrMapInstance.id };
  }

  // 1 get the metaobjects that relate to this type of object
  let dataForThisConstructor = dataByConstructorName.get(objectOrBufferOrMapInstance.constructor.name);
  if (!dataForThisConstructor) {
    dataForThisConstructor = { nextId: 1, idByInstance: new WeakMap(), serializedInstanceById: {} };
    dataByConstructorName.set(objectOrBufferOrMapInstance.constructor.name, dataForThisConstructor);
  }
  const { idByInstance, serializedInstanceById } = dataForThisConstructor;

  let idOfThisObjectOrMapInstance = idByInstance.get(objectOrBufferOrMapInstance);
  if (!idOfThisObjectOrMapInstance) {
    // 3 if not, get a new id for it, serialize it and store it

    idOfThisObjectOrMapInstance = dataForThisConstructor.nextId.toString();
    dataForThisConstructor.nextId += 1;
    idByInstance.set(objectOrBufferOrMapInstance, idOfThisObjectOrMapInstance);
    let serializedVersionOfThisObjectOrBufferOrMapInstance;

    if (objectOrBufferOrMapInstance.constructor.name === 'Map') {
      const entries = Array.from(objectOrBufferOrMapInstance.entries());
      serializedVersionOfThisObjectOrBufferOrMapInstance = entries.map(
        (value) => serializeArrayOrObjectOrMapOrValue(value, dataByConstructorName, false, options),
      );
    }
    else if (objectOrBufferOrMapInstance.constructor.name === 'Set') {
      const values = Array.from(objectOrBufferOrMapInstance);
      serializedVersionOfThisObjectOrBufferOrMapInstance = values.map(
        (value) => serializeArrayOrObjectOrMapOrValue(value, dataByConstructorName, false, options),
      );
    }
    else if (objectOrBufferOrMapInstance.constructor.name === 'Buffer') {
      serializedVersionOfThisObjectOrBufferOrMapInstance = Array.from(objectOrBufferOrMapInstance);
    }
    else if (objectOrBufferOrMapInstance.associationType
      && (objectOrBufferOrMapInstance.associationType === 'aggregation')
      && !treatAggregationAsComposition
    ) {
      // meilleur moyen de détecter si c'est une collection pour le moment
      serializedVersionOfThisObjectOrBufferOrMapInstance = {};
      Object.keys(objectOrBufferOrMapInstance).forEach((key) => {
        const value = objectOrBufferOrMapInstance[key];
        if (key === 'items') {
          serializedVersionOfThisObjectOrBufferOrMapInstance[key] = serializeArrayOrObjectOrMapOrValue(
            value, dataByConstructorName, true, options,
          );
        }
        else if (KEYS_TO_IGNORE.has(key)) {
          // do nothing
        }
        else {
          serializedVersionOfThisObjectOrBufferOrMapInstance[key] = serializeArrayOrObjectOrMapOrValue(
            value, dataByConstructorName, false, options,
          );
        }
      });
    }
    else {
      serializedVersionOfThisObjectOrBufferOrMapInstance = {};
      Object.keys(objectOrBufferOrMapInstance).forEach((key) => {
        if (!KEYS_TO_IGNORE.has(key)) {
          const value = objectOrBufferOrMapInstance[key];
          serializedVersionOfThisObjectOrBufferOrMapInstance[key] = serializeArrayOrObjectOrMapOrValue(
            value, dataByConstructorName, false, options,
          );
        }
      });
    }
    serializedInstanceById[idOfThisObjectOrMapInstance] = serializedVersionOfThisObjectOrBufferOrMapInstance;
  }

  // 4 return the type and id
  return { _type: objectOrBufferOrMapInstance.constructor.name, _id: idOfThisObjectOrMapInstance };
}

const primitives = new Set(['Number', 'String', 'Boolean', 'Function']);

function serializeArrayOrObjectOrMapOrValue(arrayOrObjectOrMapOrValue, dataByConstructorName, linkIsAggregation = false, options) {
  if (!arrayOrObjectOrMapOrValue || primitives.has(arrayOrObjectOrMapOrValue.constructor.name)) {
    return arrayOrObjectOrMapOrValue;
  }
  if (arrayOrObjectOrMapOrValue.constructor.name === 'Array') {
    return arrayOrObjectOrMapOrValue.map(
      (value) => serializeArrayOrObjectOrMapOrValue(value, dataByConstructorName, linkIsAggregation, options),
    );
  }

  return serializeObjectOrBufferOrMapInstance(arrayOrObjectOrMapOrValue, dataByConstructorName, linkIsAggregation, options);
}

module.exports = serializeObjectOrBufferOrMapInstance;
