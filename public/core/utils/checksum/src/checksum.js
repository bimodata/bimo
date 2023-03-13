const crypto = require('crypto');

/**
 *
 * @param {string} str - the string to hash
 * @param {string} [algorithm='md5']
 * @param {*} [encoding='hex']
 */
function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
}

module.exports = checksum;
