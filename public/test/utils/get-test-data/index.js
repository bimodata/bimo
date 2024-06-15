const { fsBimo: fs } = require('@bimo/core-utils-filesystem');
const { getEntityFromOirDataAtPath } = require('@bimo/core-utils-get-entity-from-oir-data-at-path');

/**
 * Clears destination path then copies sourcePath into it
 * @param {string} sourcePath - path from which to get data
 * @param {string} destinationPath - path in which to copy data
 */
async function getDataAtPath(sourcePath, destinationPath) {
  await fs.remove(destinationPath);
  await fs.copy(sourcePath, destinationPath);
}

/**
 * Reads json
 * @param {string} sourcePath - path from which to get data
 */
async function getJsonAtPath(sourcePath) {
  return fs.readJson(sourcePath);
}
exports.getJsonAtPath = getJsonAtPath;

/**
 * Reads file
 * @param {string} sourcePath - path from which to get data
 * @param {Object=} options
 */
async function getRawFileAtPath(sourcePath, options) {
  return fs.readFile(sourcePath, options);
}
exports.getRawFileAtPath = getRawFileAtPath;

/**
 *
 * @param {string} sourcePath - path where to find a json file representing the serialized entity
 * @param {*} EntityConstructor - entity constructor
 */
async function getEntityAtPath(sourcePath, EntityConstructor) {
  const serializedEntity = await fs.readJSON(sourcePath);
  return EntityConstructor.parseModel(serializedEntity);
}

exports.getEntityFromOirDataAtPath = getEntityFromOirDataAtPath;
exports.getDataAtPath = getDataAtPath;
exports.getTestEntity = getEntityAtPath;

exports.clearFolder = async (folderPath) => {
  await fs.remove(folderPath);
  await fs.mkdir(folderPath);
};
