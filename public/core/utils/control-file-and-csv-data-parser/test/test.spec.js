const chai = require('chai');

const { expect } = chai;
const fs = require('fs-extra');
const os = require('os');
const { createExpectationMessage, testFileOutput, testStringOutput } = require('@bimo/test-utils-hash-and-compare-contents');
const { getStupidLogger } = require('@bimo/core-utils-logging');
const Parser = require('../index');

const logger = getStupidLogger(true);

describe('control-file-and-csv-data-parser', () => {
  let dataFile;
  let controlFile1;
  let controlFile2;

  before(async () => {
    dataFile = await fs.readFile(`${__dirname}/testData/input/inputData.txt`, 'utf8');
    controlFile1 = await fs.readFile(`${__dirname}/testData/input/controlFile1.controlFile`, 'utf8');
    controlFile2 = await fs.readFile(`${__dirname}/testData/input/controlFile2.controlFile`, 'utf8');
  });

  describe('init', () => {
    context('When executed on a parser that was constructed with valid paths', () => {
      let parsedControlFile1;
      let parsedControlFile2;
      let expected1;
      let expected2;
      before(async () => {
        const parser1 = new Parser(dataFile, controlFile1, undefined, logger);
        const parser2 = new Parser(dataFile, controlFile2, undefined, logger);

        await parser1.init();
        await parser2.init();
        parsedControlFile1 = parser1.parsedControlFile;
        parsedControlFile2 = parser2.parsedControlFile;
        expected1 = await fs.readJSON(`${__dirname}/testData/expected/parsedControlFile1.json`);
        expected2 = await fs.readJSON(`${__dirname}/testData/expected/parsedControlFile2.json`);
      });

      it('should parse the control file and store its contents as a javascript object format', () => {
        expect(JSON.stringify(parsedControlFile1)).to.equal(JSON.stringify(expected1));
        expect(JSON.stringify(parsedControlFile2)).to.equal(JSON.stringify(expected2));
      });
      it('should include special attributes of items when they are on the same line as the item', () => {
        expect((parsedControlFile1.lineInfoByKeyword.titi.items[5])).to.eql({
          name: 'fakeItem6',
          special: '{ some very special prop }',
        });
      });
      it('should detect the right separator', () => {
        expect(parsedControlFile1.separator).to.equal(';');
        expect(parsedControlFile2.separator).to.equal('|');
      });
    });
  });
  describe('parseDataFile', () => {
    context('When executed on a parser that was constructed with valid paths', async () => {
      const parsedData1Path = `${__dirname}/testData/output/parsedData1.json`;
      const expectedParsedData1Path = `${__dirname}/testData/expected/parsedData1.json`;

      before(async () => {
        const parser1 = new Parser(dataFile, controlFile1, undefined, logger);
        await parser1.init();
        await fs.outputJson(parsedData1Path, await parser1.parseDataFile(), { spaces: 2, EOL: os.EOL });
      });

      it(createExpectationMessage(parsedData1Path, expectedParsedData1Path, 'should work with first parser'), async () => {
        await testFileOutput(parsedData1Path, expectedParsedData1Path);
      });
    });
  });
  describe('outputDataAsCsv', () => {
    context('When executed on a parser that was constructed with valid paths', async () => {
      const exportedData1Path = `${__dirname}/testData/output/exportedData1.txt`;
      const expectedExportedData1Path = `${__dirname}/testData/expected/exportedData1.txt`;

      before(async () => {
        const parser1 = new Parser(dataFile, controlFile1, undefined, logger);
        await parser1.init();
        await parser1.parseDataFile();
        await fs.outputFile(exportedData1Path, await parser1.outputDataAsCsv(), { encoding: 'utf-8' });
      });

      it(createExpectationMessage(exportedData1Path, expectedExportedData1Path, 'should work with first parser'), async () => {
        await testFileOutput(exportedData1Path, expectedExportedData1Path);
      });
    });
    context(`When executed on a parser which was re-initialized with a different control file after beeing initialized with data`, async () => {
      const exportedData2Path = `${__dirname}/testData/output/exportedData2.txt`;
      const expectedExportedData2Path = `${__dirname}/testData/expected/exportedData2.txt`;

      before(async () => {
        const parser1 = new Parser(dataFile, controlFile1, undefined, logger);
        await parser1.init();
        await parser1.parseDataFile();
        parser1.controlFile = controlFile2;
        await parser1.init();
        await fs.outputFile(exportedData2Path, await parser1.outputDataAsCsv(), { encoding: 'utf-8' });
      });

      it(createExpectationMessage(exportedData2Path, expectedExportedData2Path, 'should work with first parser'), async () => {
        await testFileOutput(exportedData2Path, expectedExportedData2Path);
      });
    });
  });
});
