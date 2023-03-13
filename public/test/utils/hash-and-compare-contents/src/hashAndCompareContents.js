// @ts-nocheck
/* eslint-disable no-console */

const path = require('path');

const chai = require('chai');

const AdmZip = require('adm-zip');

const { expect } = chai;
const Path = require('path');

const { fsBimo: fs, getFilesAndFoldersInFolder } = require('@bimo/core-utils-filesystem');
const asyncForEach = require('@bimo/core-utils-async-for-each');
const checksum = require('@bimo/core-utils-checksum');

/**
 * Computes a hash of the file at path, using various options.
 * @param {string} filePath - full path to the file to hash
 * @param {object} options
 * @param {string} [options.encoding='utf8'] - encoding to use for reading the file
 * @param {boolean} [options.trimEmptyLastLines=true] - if true, trims empty lines at the end of the file before computing hash
 * @param {boolean} [options.replaceLfByCrlf=false]
 * @param {boolean} [options.replaceCrlfByLf=true]
 * @param {boolean} [options.zipFileMode=false] - if true, extracts the zip file's content to a folder, then computes
 * the hash of this folder using createHashOfFolderContents
 * @returns {string} hash
 */
async function createHashOfFileAtPath(filePath, options = {}) {
  const { encoding = 'utf8', zipFileMode = false } = options;
  const exceptionModifierOptions = { trimEmptyLastLines: true, replaceCrlfByLf: true, ...options };
  // eslint-disable-next-line no-use-before-define
  if (zipFileMode) return createHashOfZipFileContents(filePath);

  let data = await fs.readFile(filePath, { encoding });
  data = applyExceptionModifiersOnString(data, exceptionModifierOptions);
  return checksum(data);
}

const emptyLastLineMatcher = /\s*$/g;
const CRLF = '\r\n';
const LF = '\n';
const crlfMatcher = new RegExp(CRLF, 'g');
const lfMatcher = new RegExp(LF, 'g');
/**
 *
 * @param {string} string the data to modify
 * @param {object} config
 * @param {boolean} [config.trimEmptyLastLines=false]
 * @param {boolean} [config.replaceLfByCrlf=false]
 */
function applyExceptionModifiersOnString(string, config = {}) {
  const { replaceLfByCrlf, trimEmptyLastLines, replaceCrlfByLf } = config;
  let modifiedString = string;
  if (trimEmptyLastLines) {
    modifiedString = modifiedString.replace(emptyLastLineMatcher, '');
  }
  if (replaceCrlfByLf && replaceLfByCrlf) throw new Error(`Only one of either replaceCrlfByLf or replaceLfByCrlf can be true`);
  if (replaceLfByCrlf) {
    modifiedString = modifiedString.replace(crlfMatcher, LF).replace(lfMatcher, CRLF);
  }
  if (replaceCrlfByLf) {
    modifiedString = modifiedString.replace(crlfMatcher, LF);
  }
  return modifiedString;
}

/**
 *
 * @param {string} rootFolderPath
 * @param {object} options
 * @param {boolean} [options.includeRootFolderName=true]
 * @param {boolean} [options.includeFullPaths=false]
 * @param {boolean} [options.zipFileMode=false]
 * @param {boolean} [options.verboseMode=false]
 */
async function createHashOfFolderContents(rootFolderPath, options = {}) {
  const { includeRootFolderName = true, zipFileMode = false, verboseMode = false, includeFullPaths = false } = options;
  const baseName = path.basename(rootFolderPath);
  const filesAndFolders = (await getFilesAndFoldersInFolder(rootFolderPath, { addFullPath: includeFullPaths }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const namesAndProps = JSON.stringify(filesAndFolders);
  const hashesOfContents = [];
  await asyncForEach(filesAndFolders, async (fileOrFolder) => {
    let hash;
    if (fileOrFolder.isFile()) {
      hash = await createHashOfFileAtPath(Path.join(rootFolderPath, fileOrFolder.name), { zipFileMode });
    }
    else {
      hash = await createHashOfFolderContents(Path.join(rootFolderPath, fileOrFolder.name),
        { includeRootFolderName: true, zipFileMode, verboseMode });
    }
    hashesOfContents.push(hash);
  });
  const allData = `root:${includeRootFolderName ? baseName : '/'}\nnamesAndProps:${namesAndProps}\nhashes:${hashesOfContents.join('|')}`;
  if (verboseMode) console.log(allData);
  return checksum(allData);
}

/**
 * Extracts the zip to a temp path and creates a hash of the contents of the folder.
 * Experience proves that the hash of two zip files might be different even if their contents are the same.
 * This method gives the same hash if the contents are the same, despite the zip files being different.
 * @param {string} filePath - full path to the zip file
 * @returns {string} hash
 */
async function createHashOfZipFileContents(filePath) {
  // const tempPath = path.join(path.dirname(filePath), `temp`);
  const tempPath = path.join(process.cwd(), `temp-${new Date().valueOf()}`);
  const zip = new AdmZip(filePath);
  await zip.extractAllTo(tempPath);
  const hash = await createHashOfFolderContents(tempPath, { includeRootFolderName: false });
  await fs.remove(tempPath);
  return hash;
}

/**
 * Tests by checking that the hashes of both files are the same.
 * @param {string} outputDataPath
 * @param {string} expectedOutputDataPath
 */
async function testFileOutput(outputDataPath, expectedOutputDataPath, logPathsToConsoleEvenIfHashesAreTheSame = false) {
  if (process.env.UPDATE_EXPECTED === 'true') {
    await fs.copy(outputDataPath, expectedOutputDataPath, { overwrite: true });
  }
  const outputHash = await createHashOfFileAtPath(outputDataPath);
  const expectedHash = await createHashOfFileAtPath(expectedOutputDataPath);
  if (logPathsToConsoleEvenIfHashesAreTheSame) {
    console.log(outputDataPath);
    console.log(expectedOutputDataPath);
  }
  expect(outputHash, `Ces deux fichiers devraient avoir le même contenu:
  ${outputDataPath}
  ${expectedOutputDataPath}
  `).to.equal(expectedHash);
}

/**
 * Tests by checking that two strings are the same, except some common configurable exceptions.
 * @param {string} outputString
 * @param {string} expectedOutputString
 * @param {object} config
 * @param {boolean} [config.trimEmptyLastLines=true]
 * @param {boolean} [config.replaceLfByCrlf=true]
 */
function testStringOutput(outputString, expectedOutputString, config = {}) {
  const configToUse = { trimEmptyLastLines: true, replaceLfByCrlf: true, ...config };
  expect(applyExceptionModifiersOnString(outputString), configToUse)
    .to.equal(applyExceptionModifiersOnString(expectedOutputString, configToUse));
}

/**
 * Tests by checking that the names of the files contained in both folders are the same.
 * @param {string} outputDataPath
 * @param {string} expectedOutputDataPath
 * @param {object} [options={}]
 * @param {boolean} [options.verboseMode=false]
 * @param {object|false} [options.testFolderContents=false]
 * @param {boolean} [options.testFolderContents.includeRootFolderName=true]
 * @param {boolean} [options.testFolderContents.includeFullPaths=false]
 * @param {boolean} [options.testFolderContents.zipFileMode=false]
 */
async function testFolderOutput(outputDataPath, expectedOutputDataPath, { verboseMode = false, testFolderContents = false }) {
  if (process.env.UPDATE_EXPECTED === 'true') {
    await fs.copy(outputDataPath, expectedOutputDataPath, { overwrite: true });
  }
  const outputData = await fs.readdir(outputDataPath);
  const expectedOutputData = await fs.readdir(expectedOutputDataPath);
  if (verboseMode) {
    console.log('outputData:');
    console.log(outputData);
    console.log('expected:');
    console.log(expectedOutputData);
  }

  expect(outputData.join('|')).to.equal(expectedOutputData.join('|'));

  if (testFolderContents) {
    const expectedHash = await createHashOfFolderContents(expectedOutputDataPath, testFolderContents);
    const actualHash = await createHashOfFolderContents(outputDataPath, testFolderContents);
    if (verboseMode) {
      console.log('expectedPath:');
      console.log(expectedOutputDataPath);
      console.log('outputDataPath:');
      console.log(outputDataPath);
    }
    expect(actualHash).to.equal(expectedHash);
  }
}

/**
 *
 * @param {String} outputDataPath - path to the output of the test
 * @param {String} expectedOutputDataPath - path to a static file that contains the expected output
 * @param {String=} preMessage - a custom message to add in front of the expectation message
 */
function createExpectationMessage(outputDataPath, expectedOutputDataPath, preMessage) {
  let message = `Les deux fichiers ci-dessous devraient avoir le même contenu:
                ${outputDataPath}
                ${expectedOutputDataPath}`;
  if (preMessage) {
    message = `${preMessage}\n${message}`;
  }
  return message;
}

module.exports = {
  checksum,
  testStringOutput,
  testFileOutput,
  testFolderOutput,
  createExpectationMessage,
  createHashOfFolderContents,
  createHashOfFileAtPath,
};
