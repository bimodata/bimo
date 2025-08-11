/* eslint-disable no-param-reassign */

import { ParseParams, SerializedModel } from './ParseTypes';
import unserializeInstance from './unserializeInstance';

export default async function parseModel(serializedModel:SerializedModel, params:any = {}) {
  // console.log(`In parseModel with:
  // serializedModel: (keys:) ${Object.keys(serializeModel)}
  // params: ${JSON.stringify(params)}`);

  params.knownClassByClassName = params.knownClassByClassName || {};
  params.knownClassByClassName.Object = Object;

  params.repositoryByClassName = params.repositoryByClassName || {};

  const { serializedRootObject, serializedInstanceByIdByType } = serializedModel;

  params.unserializedInstanceByIdByConstructor = new Map();
  params.serializedInstanceByIdByType = serializedInstanceByIdByType;

  return unserializeInstance(serializedRootObject, params as ParseParams);
}

