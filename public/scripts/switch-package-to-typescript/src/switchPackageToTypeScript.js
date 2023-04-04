/* eslint-disable no-console */

const { fsBimo } = require('@bimo/core-utils-filesystem');
const path = require('path');
const renameJsToTs = require('./renameJsToTs');
const updatePackageJson = require('./updatePackageJson');

async function execute(rootDir) {
  console.log(`Will execute switch-package-to-typescript in ${rootDir}`);
  await updatePackageJson(rootDir);
  await fsBimo.copy(path.join(__dirname, '/files-to-copy'), rootDir);
  await renameJsToTs(rootDir);
  console.log('done');
}
module.exports = execute;
