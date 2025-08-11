/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs-extra');
const { getFilesInFolder } = require('@bimo/core-utils-filesystem');

const badImportMatcher = /import { Bimo(\w+) } from ".\/(\w+)";/;
const rawIndexImportMatcher = /import { (\w+) as Bimo(\w+) } from "..\/base-types\/rawIndex";/;
const rawIndexExportMatcher = /export { (\w+) as Bimo(\w+) } from "..\/base-types\/rawIndex";/;
async function makeAllTypeImportsFromRawIndex({ file, outputFolderPath }) {
  const { fullPath, name } = file;
  const entityName = name.replace('.ts', '');
  const lines = (await fs.readFile(fullPath, 'utf-8')).split('\n');
  const requiredBaseTypes = [];

  let rawIndexImportLineIndex;
  let rawIndexExportLineIndex;
  const badImportLinesIndexes = [];
  lines.forEach((line, index) => {
    const rawIndexImportMatch = line.match(rawIndexImportMatcher);
    if (rawIndexImportMatch) {
      if (rawIndexImportLineIndex) throw new Error(`Multiple raw index imports in file ${fullPath}`);
      rawIndexImportLineIndex = index;
      return;
    }
    const rawIndexExportMatch = line.match(rawIndexExportMatcher);
    if (rawIndexExportMatch) {
      if (rawIndexExportLineIndex) throw new Error(`Multiple raw index exports`);
      rawIndexExportLineIndex = index;
      return;
    }
    const badImportMatch = line.match(badImportMatcher);
    if (badImportMatch) {
      const requiredBaseTypeName = badImportMatch[1];
      requiredBaseTypes.push(requiredBaseTypeName);
      badImportLinesIndexes.push(index);
    }
  });

  let keptLines;
  if (requiredBaseTypes.length > 0) {
    const newImportsString = requiredBaseTypes.map((baseType) => `${baseType} as Bimo${baseType} `).join(', ');
    if (!rawIndexImportLineIndex) {
      console.log(`No raw index import in file ${fullPath}`);
      const firstBadImportLineIndex = badImportLinesIndexes.shift();
      lines[firstBadImportLineIndex] = `import { ${newImportsString} } from "../base-types/rawIndex";`;
    }
    else {
      lines[rawIndexImportLineIndex] = `import { ${entityName} as Bimo${entityName}, ${newImportsString} } from "../base-types/rawIndex";`;
    }
    keptLines = lines.filter((line, index) => !badImportLinesIndexes.includes(index) && index !== rawIndexExportLineIndex);
  }
  else {
    keptLines = lines;
  }

  await fs.outputFile(path.join(outputFolderPath, file.name), keptLines.join('\n'));
}

const badImportMatcher2 = /import { Bimo(\w+), .* } from ".\/(\w+)";/;
const rawIndexImportMatcher2 = /import { (\w+) as Bimo(\w+) } from "..\/base-types\/rawIndex";/;
const rawIndexExportMatcher2 = /export { (\w+) as Bimo(\w+) } from "..\/base-types\/rawIndex";/;
async function makeAllTypeImportsFromRawIndex2({ file, outputFolderPath }) {
  const { fullPath, name } = file;
  const entityName = name.replace('.ts', '');
  const lines = (await fs.readFile(fullPath, 'utf-8')).split('\n');
  const requiredBaseTypes = [];

  let rawIndexImportLineIndex;
  let rawIndexExportLineIndex;
  lines.forEach((line, index) => {
    const rawIndexImportMatch = line.match(rawIndexImportMatcher2);
    if (rawIndexImportMatch) {
      if (rawIndexImportLineIndex) throw new Error(`Multiple raw index imports in file ${fullPath}`);
      rawIndexImportLineIndex = index;
      return;
    }
    const rawIndexExportMatch = line.match(rawIndexExportMatcher2);
    if (rawIndexExportMatch) {
      if (rawIndexExportLineIndex) throw new Error(`Multiple raw index exports`);
      rawIndexExportLineIndex = index;
      return;
    }
    const badImportMatch = line.match(badImportMatcher2);
    if (badImportMatch) {
      const requiredBaseTypeName = badImportMatch[1];
      requiredBaseTypes.push(requiredBaseTypeName);
      lines[index] = line.replace(`Bimo${requiredBaseTypeName}, `, '');
    }
  });

  if (requiredBaseTypes.length > 0) {
    const newImportsString = requiredBaseTypes.map((baseType) => `${baseType} as Bimo${baseType} `).join(', ');
    if (!rawIndexImportLineIndex) {
      throw new Error(`No raw index import in file ${fullPath}`);
    }
    else {
      lines[rawIndexImportLineIndex] = `import { ${entityName} as Bimo${entityName}, ${newImportsString} } from "../base-types/rawIndex";`;
    }
  }
  const keptLines = lines.filter((line, index) => index !== rawIndexExportLineIndex);

  await fs.outputFile(path.join(outputFolderPath, file.name), keptLines.join('\n'));
}

async function updateClassFactories(inputFolderPath, outputFolderPath) {
  console.log(`input: ${inputFolderPath}`);
  console.log(`output: ${outputFolderPath}`);
  const inputFiles = await getFilesInFolder(inputFolderPath);

  inputFiles.forEach(async (file) => {
    try {
      makeAllTypeImportsFromRawIndex2({ file, outputFolderPath });
    }
    catch (error) {
      console.log(error);
    }
  });
}

module.exports = updateClassFactories;
