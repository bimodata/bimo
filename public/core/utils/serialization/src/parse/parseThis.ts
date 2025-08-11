/* eslint-disable no-param-reassign */

import parseModel from './parseModel';
import { SerializedModel } from './ParseTypes';

export default async function parseThis(json: SerializedModel, options: any = {}) {
  // console.log(`In parseThis with:
  // serializedModel: (keys:) ${Object.keys(serializeModel)}
  // params: ${JSON.stringify(params)}`);

  options.knownClassByClassName = options.knownClassByClassName || {};
  options.knownClassByClassName[this.name] = this;
  if (this.allChildClasses) {
    this.allChildClasses.forEach((linkedClass: Function) => {
      options.knownClassByClassName[linkedClass.name] = linkedClass;
    });
  }
  return parseModel(json, options);
}