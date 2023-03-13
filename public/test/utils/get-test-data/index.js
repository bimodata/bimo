const asyncForEach = require('@bimo/core-utils-async-for-each');
const { fsBimo: fs, getFilesInFolder } = require('@bimo/core-utils-filesystem');
const getEntityFromOirDataStringAndControlFile = require(
  '@bimo/core-services-get-entity-from-oir-data-string-and-control-file',
);

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

/**
 *
 * @param {string} sourcePath - path where to find two files, one with .oir, one with .txt
 * @param {*} EntityConstructor - entity constructor
 */
async function getEntityFromOirDataAtPath(sourcePath, EntityConstructor, options = {}) {
  const {
    oirMatcher = /\.(oir|controlFile)$/,
    dataFileMatcher = /\.(txt|csv)$/,
    multipleEntitiesMode = false,
  } = options;
  const files = await getFilesInFolder(sourcePath);
  const oirFileDirent = files.find((file) => file.name.match(oirMatcher));
  if (!oirFileDirent) throw new Error(`Could not find a .oir or .controlFile file among ${files.map((f) => f.name)}`);
  const oirFile = await fs.readFile(oirFileDirent.fullPath, { encoding: 'latin1' });

  let foundUniqueDataFile = false;

  const entities = [];
  await asyncForEach(files, async (file) => {
    if (foundUniqueDataFile) return;
    if (!file.name.match(dataFileMatcher)) return;
    const dataFile = await fs.readFile(file.fullPath, { encoding: 'latin1' });
    const newEntity = await getEntityFromOirDataStringAndControlFile({
      oirDataString: dataFile,
      oirControlFile: { fileData: oirFile },
      EntityConstructor,
    });
    newEntity.libelle = file.name;
    if (!multipleEntitiesMode) foundUniqueDataFile = true;
    entities.push(newEntity);
  });
  if (entities.length === 0) throw new Error(`Could not find a data (${dataFileMatcher}) file among ${files.map((f) => f.name)}`);

  return multipleEntitiesMode ? entities : entities[0];
}
exports.getEntityFromOirDataAtPath = getEntityFromOirDataAtPath;

exports.getDataAtPath = getDataAtPath;
exports.getTestEntity = getEntityAtPath;

exports.clearFolder = async (folderPath) => {
  await fs.remove(folderPath);
  await fs.mkdir(folderPath);
};
