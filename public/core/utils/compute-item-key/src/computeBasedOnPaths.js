const { get } = require('lodash');

function computeBasedOnPaths(item, config) {
  const { paths, separator = '|' } = config;
  return paths.map((path) => {
    const value = get(item, path);
    return (typeof value === 'object') ? JSON.stringify(value) : value;
  }).join(separator);
}

module.exports = computeBasedOnPaths;
