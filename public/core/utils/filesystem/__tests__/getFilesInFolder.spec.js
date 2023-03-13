const path = require('path');
const fsExtra = require('fs-extra');
const { expect, assert } = require('chai');

const { Dirent } = fsExtra;

const { getFilesInFolder } = require('..');

const PATH_TO_ROOT_TEST_FOLDER = path.join(__dirname, 'rootFolder');

describe(`getFilesInFolder`, () => {
  it(`returns a promise that resolves to an array of Dirent`, async () => {
    const files = await getFilesInFolder(PATH_TO_ROOT_TEST_FOLDER);
    expect(files).to.be.an('array');
    files.forEach((file) => {
      assert(file instanceof Dirent);
    });
  });
  it(`returns a promise that resolves to an array of objects that have a fullPath prop with the full path`, async () => {
    const files = await getFilesInFolder(PATH_TO_ROOT_TEST_FOLDER);
    expect(files).to.be.an('array');
    files.forEach((file) => {
      expect(file.fullPath).to.be.a('string');
    });
  });
});
