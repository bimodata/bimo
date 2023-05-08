const path = require('path');
const { fsBimo: fs, getFoldersInFolder } = require('@bimo/core-utils-filesystem');
const { asyncForEach } = require('@bimo/core-utils-async-for-each');

/**
 *
 * @param {string} rootFolderPath - full path to the root folder
 * @param {string[]} pathsToFilesToAdd - array of filenames (with extension) that should be added
 * @param {object} options
 * @param {boolean} [options.addInSubFolders=true]
 */
async function addFilesRecursively(rootFolderPath, pathsToFilesToAdd, options = {}) {
  const { addInSubFolders = true } = options;

  await asyncForEach(pathsToFilesToAdd, async (pathToFileToAdd) => {
    await fs.copy(pathToFileToAdd, path.join(rootFolderPath, path.basename(pathToFileToAdd)));
  });

  if (addInSubFolders) {
    const folders = await getFoldersInFolder(rootFolderPath);
    await asyncForEach(folders, async (folder) => {
      await addFilesRecursively(path.join(rootFolderPath, folder.name), pathsToFilesToAdd, options);
    });
  }
}
module.exports = addFilesRecursively;
