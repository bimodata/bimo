/* eslint-disable no-param-reassign */

const parseModel = require('./parseModel');

async function parseThis(json, options = {}) {
  // console.log(`In parseThis with:
  // serializedModel: (keys:) ${Object.keys(serializeModel)}
  // params: ${JSON.stringify(params)}`);

  options.knownClassByClassName = options.knownClassByClassName || {};
  options.knownClassByClassName[this.name] = this;
  if (this.allChildClasses) {
    this.allChildClasses.forEach((linkedClass) => {
      options.knownClassByClassName[linkedClass.name] = linkedClass;
    });
  }
  return parseModel(json, options);
}

module.exports = parseThis;
