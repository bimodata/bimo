const path = require('path');
const { fsBimo: fs, getFilesAndFoldersInFolder } = require('@bimo/core-utils-filesystem');
const { asyncForEach } = require('@bimo/core-utils-async-for-each');

/**
 *
 * @param {string} rootFolderPath - full path to the root folder
 * @param {string[]} fileNamesToRemove - array of filenames (with extension) that should be removed
 * @param {object} options
 * @param {boolean} [options.removeInSubFolders=true]
 */
async function removeFilesRecursively(rootFolderPath, fileNamesToRemove, options = {}) {
  const { removeInSubFolders = true } = options;
  const filesAndFolders = await getFilesAndFoldersInFolder(rootFolderPath);

  await asyncForEach(filesAndFolders, async (fileOrFolder) => {
    if (fileOrFolder.isFile()) {
      if (fileNamesToRemove.includes(fileOrFolder.name)) {
        await fs.remove(path.join(rootFolderPath, fileOrFolder.name));
      }
    }
    else if (removeInSubFolders) {
      await removeFilesRecursively(path.join(rootFolderPath, fileOrFolder.name), fileNamesToRemove, options);
    }
  });
}

module.exports = removeFilesRecursively;
