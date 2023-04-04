const { fsBimo, getAllFilesRecursively } = require('@bimo/core-utils-filesystem');

async function renameJsToTs(rootDir) {
  const allFiles = [];
  await getAllFilesRecursively(rootDir, allFiles);

  const jsFiles = allFiles.filter((file) => file.name.match(/\.js$/));
  await Promise.all(jsFiles.map(async (file) => {
    fsBimo.rename(file.fullPath, file.fullPath.replace(/\.js$/, '.ts'));
  }));
}

module.exports = renameJsToTs;
