const path = require('path');
const { expect } = require('chai');

const { createHashOfFolderContents } = require('@bimo/test-utils-hash-and-compare-contents');

const { fsBimo: fs } = require('@bimo/core-utils-filesystem');

const pathToTemp = path.join(__dirname, 'temp');
const pathToExampleRootFolder = path.join(__dirname, 'exampleRootFolder');
const pathToFilesToAdd = path.join(__dirname, 'exampleFilesToAdd');
const pathToFileToAdd1 = path.join(pathToFilesToAdd, '1.txt');
const pathToFileToAdd2 = path.join(pathToFilesToAdd, '.emptyFolderPlaceHolder');

const addFilesRecursively = require('..');

describe('addFilesRecursively', () => {
  beforeEach(async () => {
    await fs.remove(pathToTemp);
    await fs.copy(pathToExampleRootFolder, pathToTemp);
  });
  context(`with default options`, () => {
    it(`adds the files to add in the folder and its subfolders`, async () => {
      const hashBefore = await createHashOfFolderContents(pathToTemp);
      expect(hashBefore).to.equal('b63e3d29666d4da0ea197a875c57b6a3');
      await addFilesRecursively(pathToTemp, [pathToFileToAdd1, pathToFileToAdd2]);
      const hashAfter = await createHashOfFolderContents(pathToTemp);
      expect(hashAfter).to.equal('7357b6aa910898c9a0b055181d5904e5');
    });
  });
  context(`with addInSubFolders = false`, () => {
    it(`adds the files only in the root folder`, async () => {
      const hashBefore = await createHashOfFolderContents(pathToTemp);
      expect(hashBefore).to.equal('b63e3d29666d4da0ea197a875c57b6a3');
      await addFilesRecursively(pathToTemp, [pathToFileToAdd1, pathToFileToAdd2], { addInSubFolders: false });
      const hashAfter = await createHashOfFolderContents(pathToTemp);
      expect(hashAfter).to.equal('eb4ccb1392a51630ec2b6c1f25914d67');
    });
  });
});
