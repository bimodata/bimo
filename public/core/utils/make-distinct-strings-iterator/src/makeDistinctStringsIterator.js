const generatorByFlavorKey = require('./generatorByFlavorKey');

function makeDistinctStringsIterator(config, context) {
  const { flavorKey = 'integer', flavorConfig = {} } = config;

  const generator = generatorByFlavorKey[flavorKey];
  if (!generator) throw new Error(`Unknown flavor key: ${flavorKey}`);

  return generator(flavorConfig, context);
}

module.exports = makeDistinctStringsIterator;
