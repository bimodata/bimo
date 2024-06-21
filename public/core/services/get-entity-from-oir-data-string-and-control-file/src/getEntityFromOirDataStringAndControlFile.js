const { getAndAddLoggerToServiceOptions } = require('@bimo/core-utils-logging');
const Parser = require('@bimo/core-utils-control-file-and-csv-data-parser');

/**
 * @param {Object} param1
 * @param {Object} config
 * @param {Object} context
 * @param {Object=} context.task
 * @param {Object=} context.logger
 */
async function getEntityFromOirDataStringAndControlFile(
  { oirDataString, oirControlFileString, EntityConstructor },
  config = { convertKeysToCamel: true, convertItemNamesToCamel: true },
  context = {},
) {
  getAndAddLoggerToServiceOptions(context, { serviceName: `getOirDataStringFromEntityAndControlFile` });

  const oirParser = new Parser(
    oirDataString,
    oirControlFileString,
    config,
  );
  await oirParser.init();
  const oirStyleData = await oirParser.parseDataFile();
  const newEntity = EntityConstructor.createFromOirStyleData(oirStyleData);

  return newEntity;
}

module.exports = getEntityFromOirDataStringAndControlFile;
