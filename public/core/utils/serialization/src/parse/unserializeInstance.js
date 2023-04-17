/* eslint-disable no-use-before-define */
// @ts-nocheck

const { asyncForEach } = require('@bimo/core-utils-async-for-each');
const { shallowAssign } = require('@bimo/core-utils-shallow-assign');

async function unserializeInstance(serializedObjectTypeAndId, params) {
  if (!serializedObjectTypeAndId) {
    // eslint-disable-next-line no-console
    console.log(params);
    throw new Error('Problem!');
  }
  const { unserializedInstanceByIdByConstructor, serializedInstanceByIdByType, knownClassByClassName, repositoryByClassName } = params;
  const { _id, _type, _repoId } = serializedObjectTypeAndId;
  if (_repoId) {
    const repositoryOfThisClass = repositoryByClassName[_type];
    if (!repositoryOfThisClass) {
      if (params.allowUnknownRepositories) {
        return { error: 'repo not found', ...serializedObjectTypeAndId };
      }

      const newError = new Error(
        `No repository found for ${_type}.`
        + `Provide a repository in params.repositoryByClassName, or use params.allowUnknownRepositories:true.`,
      );
      newError.name = `MissingRepoError`;
      newError.missingRepoType = _type;
      throw newError;
    }
    else {
      let instance;
      try {
        instance = await repositoryOfThisClass.getItemById(_repoId);
        return instance;
      }
      catch (error) {
        if (error.name !== `UnknownIdError`) {
          throw error;
        }
        else if (params.allowUnknownRepoIds) {
          return { error: 'instance not found', ...serializedObjectTypeAndId };
        }
        else {
          const newError = new Error(
            `No instance found for repoId ${_repoId} in ${_type} repository.`
            + `Provide a repository that contains all needed data, or use params.allowUnknownRepoIds:true.`,
          );
          newError.name = `UnknownIdError`;
          newError.missingId = _repoId;
          newError.repoType = _type;
          newError.originalError = error;
          throw newError;
        }
      }
    }
  }
  else {
    let unserializedInstanceByIdOfThisConstructor = unserializedInstanceByIdByConstructor.get(_type);
    if (!unserializedInstanceByIdOfThisConstructor) {
      unserializedInstanceByIdOfThisConstructor = new Map();
      unserializedInstanceByIdByConstructor.set(_type, unserializedInstanceByIdOfThisConstructor);
    }
    const unserializedInstance = unserializedInstanceByIdOfThisConstructor.get(_id);
    if (unserializedInstance) {
      return unserializedInstance;
    }

    const serializedInstance = serializedInstanceByIdByType[_type] && serializedInstanceByIdByType[_type][_id];
    if (!serializedInstance) {
      throw new Error(`Could not find instance with type ${_type} and Id ${_id} from ${JSON.stringify(serializedObjectTypeAndId)}`);
    }

    if (_type === 'Map') {
      const newInstance = new Map();
      unserializedInstanceByIdOfThisConstructor.set(_id, newInstance);
      await asyncForEach(serializedInstance, async (keyValueArray) => {
        newInstance.set(await unserializeValue(keyValueArray[0], params), await unserializeValue(keyValueArray[1], params));
      });
      return newInstance;
    }
    if (_type === 'Set') {
      const newInstance = new Set();
      unserializedInstanceByIdOfThisConstructor.set(_id, newInstance);
      await asyncForEach(serializedInstance, async (value) => {
        newInstance.add(await unserializeValue(value, params));
      });
      return newInstance;
    }
    if (_type === 'Buffer') {
      const newInstance = Buffer.from(serializedInstance);
      unserializedInstanceByIdOfThisConstructor.set(_id, newInstance);
      return newInstance;
    }
    if (_type === 'Date') {
      const newInstance = new Date(serializedInstance);
      unserializedInstanceByIdOfThisConstructor.set(_id, newInstance);
      return newInstance;
    }

    const Constructor = knownClassByClassName[_type];
    if (!Constructor) {
      throw new Error(`Unknown constructor: ${_type}`);
    }
    const newInstance = new Constructor(shallowAssign({}, serializedInstance));

    unserializedInstanceByIdOfThisConstructor.set(_id, newInstance);

    await asyncForEach(Object.keys(serializedInstance), async (key) => {
      const value = serializedInstance[key];
      if (!value) {
        newInstance[key] = value;
      }
      else if (value.constructor.name === 'Object') {
        newInstance[key] = await unserializeInstance(value, params);
      }
      else if (value.constructor.name === 'Array') {
        const unserializedArray = [];
        await asyncForEach(value, async (innerValue) => {
          unserializedArray.push(await unserializeValue(innerValue, params));
        });
        newInstance[key] = unserializedArray;
      }
      else {
        newInstance[key] = value;
      }
    });
    return newInstance;
  }
}

async function unserializeValue(value, params) {
  if (value.constructor.name === 'Object') {
    return unserializeInstance(value, params);
  }
  if (value.constructor.name === 'Map') {
    throw new Error('Not supported');
  }
  if (value.constructor.name === 'Array') {
    const unserializedArray = [];
    await asyncForEach(value, async (innerValue) => {
      unserializedArray.push(await unserializeValue(innerValue, params));
    });
    return unserializedArray;
  }

  return value;
}

module.exports = unserializeInstance;
