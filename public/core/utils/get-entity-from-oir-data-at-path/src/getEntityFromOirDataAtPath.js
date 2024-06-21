const getEntityFromOirDataStringAndControlFile = require(
  '@bimo/core-services-get-entity-from-oir-data-string-and-control-file',
);
const { asyncForEach } = require('@bimo/core-utils-async-for-each');
const { fsBimo: fs, getFilesInFolder } = require('@bimo/core-utils-filesystem');

/**
 *
 * @param {string} sourcePath - path where to find two files, one with .oir, one with .txt
 * @param {*} EntityConstructor - entity constructor
 */
async function getEntityFromOirDataAtPath(sourcePath, EntityConstructor, options = {}) {
  const {
    controlFileMatcher = /\.(oir|controlFile)$/,
    dataFileMatcher = /\.(txt|csv)$/,
    multipleEntitiesMode = false,
  } = options;
  const files = await getFilesInFolder(sourcePath);
  const oirFileDirent = files.find((file) => file.name.match(controlFileMatcher));
  if (!oirFileDirent) throw new Error(`Could not find a control file (${controlFileMatcher}) among ${files.map((f) => f.name)}`);
  const oirFile = await fs.readFile(oirFileDirent.fullPath, { encoding: 'latin1' });

  let foundUniqueDataFile = false;

  const entities = [];
  await asyncForEach(files, async (file) => {
    if (foundUniqueDataFile) return;
    if (!file.name.match(dataFileMatcher)) return;
    const dataFile = await fs.readFile(file.fullPath, { encoding: 'latin1' });
    const newEntity = await getEntityFromOirDataStringAndControlFile({
      oirDataString: dataFile,
      oirControlFileString: oirFile,
      EntityConstructor,
    });
    newEntity.label = file.name;
    if (!multipleEntitiesMode) foundUniqueDataFile = true;
    entities.push(newEntity);
  });
  if (entities.length === 0) throw new Error(`Could not find a data file (${dataFileMatcher}) among ${files.map((f) => f.name)}`);

  return multipleEntitiesMode ? entities : entities[0];
}
exports.getEntityFromOirDataAtPath = getEntityFromOirDataAtPath;
