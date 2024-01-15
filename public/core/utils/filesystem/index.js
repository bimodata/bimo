const fsExtra = require('fs-extra');
const os = require('os');
const path = require('path');

// eslint-disable-next-line no-unused-vars
const { Dirent } = require('fs-extra');

/**
 * @typedef BimoDirent
 * @property {function} isFile(): boolean;
 * @property {function} isDirectory(): boolean;
 * @property {function} isBlockDevice(): boolean;
 * @property {function} isCharacterDevice(): boolean;
 * @property {function} isSymbolicLink(): boolean;
 * @property {function} isFIFO(): boolean;
 * @property {function} isSocket(): boolean;
 * @property {string} name: string;
 * @property {string} fullPath: string; // TODO:decide if this is still usefull with node18 native path or parentPath props
 */

/**
 *
 * @param {string} folderPath
 * @param {object} [options={}]
 * @param {boolean} [options.addFullPath=true]
 * TODO: Review the addFullPath option. In node v18, then v21, path and parentPath have been added
 * to the Node Dirent Object
 * @returns {Promise<BimoDirent[]>}
 */
async function getFilesAndFoldersInFolder(folderPath, options = {}) {
  const { addFullPath = true } = options;
  const filesAndFolders = await fsExtra.readdir(folderPath, { withFileTypes: true });
  return filesAndFolders.map((fileOrFolder) => {
    // eslint-disable-next-line no-param-reassign
    if (addFullPath) fileOrFolder.fullPath = path.join(folderPath, fileOrFolder.name);
    return fileOrFolder;
  });
}
exports.getFilesAndFoldersInFolder = getFilesAndFoldersInFolder;

/**
 *
 * @param {string} folderPath
 * @returns {Promise<BimoDirent[]>}
 */
async function getFilesInFolder(folderPath) {
  const filesAndFolders = await getFilesAndFoldersInFolder(folderPath);
  const files = filesAndFolders.filter((fileOrFolder) => fileOrFolder.isFile());
  return files;
}
exports.getFilesInFolder = getFilesInFolder;

/**
 *
 * @param {string} rootFolderPath - full path to the root folder
 * @param {BimoDirent[]} allFiles - array of dirent files objects
 */
async function getAllFilesRecursively(rootFolderPath, allFiles) {
  const filesAndFolders = await getFilesAndFoldersInFolder(rootFolderPath, { addFullPath: true });
  await Promise.all((filesAndFolders.map(async (fileOrFolder) => {
    if (fileOrFolder.isDirectory()) {
      await getAllFilesRecursively(fileOrFolder.fullPath, allFiles);
    }
    else {
      allFiles.push(fileOrFolder);
    }
  })));
  return allFiles;
}
exports.getAllFilesRecursively = getAllFilesRecursively;

/**
 *
 * @param {string} folderPath
 * @returns {Promise<BimoDirent[]>}
 */
async function getFoldersInFolder(folderPath) {
  const filesAndFolders = await getFilesAndFoldersInFolder(folderPath);
  const folders = filesAndFolders.filter((fileOrFolder) => fileOrFolder.isDirectory());
  return folders;
}
exports.getFoldersInFolder = getFoldersInFolder;

/**
 * Same as fs-extra.outputJson, but uses os.EOL as a default
 * @param {string} file - path to the output file
 * @param {any} data - data to output
 * @param {Object} options - same options as for fs-extra.outputJson
 * @param {string=} options.EOL - EOL to use
 * @param {"utf8"|"latin1"} [options.encoding='utf8'] - encoding to use
 * @param {string|number=} options.spaces - see JSON.stringify
 * @param {any=} options.replacer - see JSON.stringify
 * @param {number=} options.mode
 * @param {string=} options.flag
 * @param {object=} options.fs
 * @returns {Promise}
 */
function outputJsonBimo(file, data, options = {}) {
  return fsExtra.outputJson(file, data, { EOL: os.EOL, ...options });
}

/** @type {import ('@types/fs-extra')} */
const fsBimo = {
  outputJson: outputJsonBimo,
  outputJSON: outputJsonBimo,
};

Object.keys(fsExtra).forEach((key) => {
  const element = fsExtra[key];
  if (!fsBimo[key]) {
    fsBimo[key] = element;
  }
});

exports.fsBimo = fsBimo;
