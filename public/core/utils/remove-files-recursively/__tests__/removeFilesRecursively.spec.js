const path = require('path');
const { expect } = require('chai');

const { createHashOfFolderContents } = require('@bimo/test-utils-hash-and-compare-contents');

const { fsBimo: fs } = require('@bimo/core-utils-filesystem');

const pathToTemp = path.join(__dirname, 'temp');
const pathToExampleRootFolder = path.join(__dirname, 'exampleRootFolder');

const removeFilesRecursively = require('..');

describe('removeFilesRecursively', () => {
  beforeEach(async () => {
    await fs.remove(pathToTemp);
    await fs.copy(pathToExampleRootFolder, pathToTemp);
  });
  context(`with valid args `, () => {
    it(`works with default options`, async () => {
      const hashBefore = await createHashOfFolderContents(pathToTemp);
      expect(hashBefore).to.equal('d04035e31f1d2947299cf528a0cc1733');
      await removeFilesRecursively(pathToTemp, ['2.txt', '.emptyFolderPlaceHolder']);
      const hashAfter = await createHashOfFolderContents(pathToTemp);
      expect(hashAfter).to.equal('d761c38f0fa6174bcda41c453fa94142');
    });
    it(`works when not removing in subfolders`, async () => {
      const hashBefore = await createHashOfFolderContents(pathToTemp);
      expect(hashBefore).to.equal('d04035e31f1d2947299cf528a0cc1733');
      await removeFilesRecursively(pathToTemp, ['2.txt', '.emptyFolderPlaceHolder'], { removeInSubFolders: false });
      const hashAfter = await createHashOfFolderContents(pathToTemp);
      expect(hashAfter).to.equal('ac305e01bded288e6ad20038d5dd5fb7');
    });
  });
});
