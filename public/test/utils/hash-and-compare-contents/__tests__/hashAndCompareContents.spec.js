const { expect } = require('chai');
const Path = require('path');

const { getStupidLogger } = require('@bimo/core-utils-logging');
const { fsBimo: fs } = require('@bimo/core-utils-filesystem');

const { createHashOfFolderContents } = require('..');

const logger = getStupidLogger();

const PATH_TO_TEST_DATA_ROOT = Path.join(__dirname, 'testData');

describe('test-utils', () => {
  describe('#createHashOfFolderContents', () => {
    const PATH_TO_ORIGINAL_DATA = Path.join(PATH_TO_TEST_DATA_ROOT, `createHashOfFolderContents`, `originalData`);
    const PATH_TO_TEMP_DATA = Path.join(PATH_TO_TEST_DATA_ROOT, `createHashOfFolderContents`, `temp`);
    before(async function beforeCreateHash() {
      this.timeout(4000);
      logger.trace(`cleaning data`);
      await fs.remove(PATH_TO_TEMP_DATA);
      await fs.copy(PATH_TO_ORIGINAL_DATA, PATH_TO_TEMP_DATA);
      logger.trace(`done cleaning data, will load repos`);
    });
    context('when executed twice on the same folder, with no changes to the folder in between', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        hashBefore = await createHashOfFolderContents(testFolderPath);
        hashAfter = await createHashOfFolderContents(testFolderPath);
      });
      it('returns the same hash twice', () => {
        expect(hashBefore).to.be.a(`string`).that.equals(hashAfter);
      });
    });
    context('when executed twice on the same folder, with data changed in a file in the folder in between', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const changedFilePath = Path.join(testFolderPath, `rootDummyData.txt`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        hashBefore = await createHashOfFolderContents(testFolderPath);
        await fs.appendFile(changedFilePath, `\n${new Date()}`);
        hashAfter = await createHashOfFolderContents(testFolderPath);
      });
      it('returns a different hash each time', () => {
        expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
      });
    });
    context('when executed twice on the same folder, with data changed in a file in a sub-folder in between', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const changedFilePath = Path.join(testFolderPath, `subFolder1`, `dummyData.txt`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        hashBefore = await createHashOfFolderContents(testFolderPath);
        await fs.appendFile(changedFilePath, `\n${new Date()}`);
        hashAfter = await createHashOfFolderContents(testFolderPath);
      });
      it('returns a different hash each time', () => {
        expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
      });
    });
    context('when executed twice on the same folder, with a new file added in the folder in between', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const newFilePath = Path.join(testFolderPath, `tempNewFile.txt`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        hashBefore = await createHashOfFolderContents(testFolderPath);
        await fs.outputFile(newFilePath, `\n${new Date()}`);
        hashAfter = await createHashOfFolderContents(testFolderPath);
        await fs.unlink(newFilePath);
      });
      it('returns a different hash each time', () => {
        expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
      });
    });
    context('when executed twice on the same folder, with a file deleted in the folder in between', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const newFilePath = Path.join(testFolderPath, `tempDeletedFile.txt`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        await fs.outputFile(newFilePath, `\n${new Date()}`);
        hashBefore = await createHashOfFolderContents(testFolderPath);
        await fs.unlink(newFilePath);
        hashAfter = await createHashOfFolderContents(testFolderPath);
      });
      it('returns a different hash each time', () => {
        expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
      });
    });
    context('when executed twice on the same folder, with a new subFolder added in between', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const newFolderPath = Path.join(testFolderPath, `tempNewFolder`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        hashBefore = await createHashOfFolderContents(testFolderPath);
        await fs.mkdir(newFolderPath);
        hashAfter = await createHashOfFolderContents(testFolderPath);
        await fs.rmdir(newFolderPath);
      });
      it('returns a different hash each time', () => {
        expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
      });
    });
    context('when executed twice on the same folder, with a subFolder deleted in between', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const newFolderPath = Path.join(testFolderPath, `tempDeletedFolder`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        await fs.mkdir(newFolderPath);
        hashBefore = await createHashOfFolderContents(testFolderPath);
        await fs.rmdir(newFolderPath);
        hashAfter = await createHashOfFolderContents(testFolderPath);
      });
      it('returns a different hash each time', () => {
        expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
      });
    });
    context('when executed twice on the same folder, with a change in the name of a file', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const originalFileNamePath = Path.join(testFolderPath, `tempOriginalFileName.txt`);
      const newFileNamePath = Path.join(testFolderPath, `tempNewFileName.txt`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        await fs.outputFile(originalFileNamePath, `Toto`);
        hashBefore = await createHashOfFolderContents(testFolderPath);
        await fs.move(originalFileNamePath, newFileNamePath);
        hashAfter = await createHashOfFolderContents(testFolderPath);
        await fs.unlink(newFileNamePath);
      });
      it('returns a different hash each time', () => {
        expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
      });
    });
    context('when executed twice on the same folder, with a change in the name of the folder', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const testFolderNewPath = Path.join(PATH_TO_TEMP_DATA, `testFolder2`);
      let hashBefore;
      let hashAfter;
      context('when options is not defined', () => {
        before(async function beforeHashOfFolder() {
          this.timeout(4000);
          hashBefore = await createHashOfFolderContents(testFolderPath);
          await fs.rename(testFolderPath, testFolderNewPath);
          hashAfter = await createHashOfFolderContents(testFolderNewPath);
          await fs.rename(testFolderNewPath, testFolderPath);
        });
        it('returns a different hash each time', () => {
          expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
        });
      });
      context('when options.includeRootFolderName = true or options is not defined', () => {
        before(async () => {
          hashBefore = await createHashOfFolderContents(testFolderPath, { includeRootFolderName: true });
          await fs.rename(testFolderPath, testFolderNewPath);
          hashAfter = await createHashOfFolderContents(testFolderNewPath, { includeRootFolderName: true });
          await fs.rename(testFolderNewPath, testFolderPath);
        });
        it('returns a different hash each time', () => {
          expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
        });
      });
      context('when options.includeRootFolderName = false', () => {
        before(async () => {
          hashBefore = await createHashOfFolderContents(testFolderPath, { includeRootFolderName: false });
          await fs.rename(testFolderPath, testFolderNewPath);
          hashAfter = await createHashOfFolderContents(testFolderNewPath, { includeRootFolderName: false });
          await fs.rename(testFolderNewPath, testFolderPath);
        });
        it('returns the same hash', () => {
          expect(hashBefore).to.be.a(`string`).that.equals(hashAfter);
        });
      });
    });
    context('when executed twice on the same folder, with a change in the name of a sub folder', () => {
      const testFolderPath = Path.join(PATH_TO_TEMP_DATA, `testFolder1`);
      const originalSubFolderNamePath = Path.join(testFolderPath, `subFolder1`);
      const newSubFolderNamePath = Path.join(testFolderPath, `subFolder2`);
      let hashBefore;
      let hashAfter;
      before(async () => {
        hashBefore = await createHashOfFolderContents(testFolderPath);
        await fs.rename(originalSubFolderNamePath, newSubFolderNamePath);
        hashAfter = await createHashOfFolderContents(testFolderPath);
        await fs.rename(newSubFolderNamePath, originalSubFolderNamePath);
      });
      it('returns a different hash each time', () => {
        expect(hashBefore).to.be.a(`string`).that.does.not.equal(hashAfter);
      });
    });
  });
});
