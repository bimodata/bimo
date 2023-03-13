class BimoFileObject {
  /**
   *
   * @param {BimoFileObject} props
   */
  constructor({ fileInfo, fileData }) {
    /** @type {FileInfo} */
    this.fileInfo = fileInfo;

    /** @type {Buffer|string} */
    this.fileData = fileData;
  }
}
module.exports = BimoFileObject;

/**
 * @typedef FileInfo
 * @property {string=} name
 * @property {string=} path
 */
