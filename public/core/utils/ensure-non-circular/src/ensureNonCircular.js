const decycle = require('./decycle');

/**
 * Ensures a value does not contain circular references and can be printed/logged
 * @param {any=} value - the value to check/modify
 */
function ensureNonCircular(value) {
  let nonCircularValue;
  try {
    JSON.stringify(value);
    nonCircularValue = value;
  }
  catch (error) {
    if (error.message.match(`Converting circular structure to JSON`)) {
      nonCircularValue = decycle(value);
    }
    else {
      throw error;
    }
  }
  return nonCircularValue;
}

module.exports = ensureNonCircular;
