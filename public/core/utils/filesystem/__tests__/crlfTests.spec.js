const os = require('os');
const path = require('path');
const fsExtra = require('fs-extra');
const { expect } = require('chai');

const { fsBimo: fs } = require('..');

const TEMP_PATH = path.join(__dirname, `TEMP`);

const testObject = {
  a: 'allo',
  b: 'bonjour',
};

const testString = `allo 
bonjour

voici ma string
`;

describe(`crlf`, () => {
  before(async () => {
    await fsExtra.remove(TEMP_PATH);
  });
  context(`When using fs-extra without specifying options for eol`, () => {
    it(`outputJson outputs with lf and no cr`, async () => {
      const outputPath = path.join(TEMP_PATH, `fromFsExtra.json`);
      await fsExtra.outputJson(outputPath, testObject, { spaces: 2 });
      const readString = await fsExtra.readFile(outputPath, `utf8`);
      expect(readString).to.equal('{\n  "a": "allo",\n  "b": "bonjour"\n}\n');
    });
  });
  context(`When using fs-bimo without specifying options for eol`, () => {
    it(`outputJson outputs with the eol of the os`, async () => {
      const outputPath = path.join(TEMP_PATH, `fromFsBimo.json`);
      await fs.outputJson(outputPath, testObject, { spaces: 2 });
      const readString = await fs.readFile(outputPath, `utf8`);
      expect(readString).to.equal(`{${os.EOL}  "a": "allo",${os.EOL}  "b": "bonjour"${os.EOL}}${os.EOL}`);
    });
  });
  context(`When using fs-bimo or fs-extra with string literals`, () => {
    it(`fs.outputFile outputs the string with lf only`, async () => {
      const outputPath = path.join(TEMP_PATH, `stringLiteral.txt`);
      await fs.outputFile(outputPath, testString);
      const readString = await fs.readFile(outputPath, `utf8`);
      expect(readString).to.equal(`allo \nbonjour\n\nvoici ma string\n`);
    });
  });
});
