/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs-extra');
const { getFilesInFolder } = require('@bimo/core-utils-filesystem');

async function addClassFactoryToFileName({ file, outputFolderPath }) {
  const { fullPath, name } = file;
  await fs.copy(fullPath, path.join(outputFolderPath, name.replace('.js', 'ClassFactory.js')));
}
const internalImportMatcher = /import .* from "\.\/(\w+)";/;
const collectionPropsMatcher = /extends ExtendedCollectionProps<(\w+), (\w+)Props>/;
const collectionMatcher = /extends Collection<(\w+), (\w+)Props>/;
async function wrapClassInFuctionAndReplaceInternalRequires({ file, outputFolderPath }) {
  const { fullPath, name } = file;
  const entityName = name.replace('.ts', '');
  const factoryName = `${entityName}ClassFactory`;
  const lines = (await fs.readFile(fullPath, 'utf-8')).split('\n');
  const requiredEntityNames = [];
  const baseTypeLine = `{ ${entityName} as Bimo${entityName} } from "../base-types/rawIndex";`;
  const keptLines = [
    `import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";`,
    `import ${baseTypeLine}`,
    `export ${baseTypeLine}`,
    `import { Entity } from "@bimo/core-utils-entity";`,
  ];
  let foundFirstInternalImport = false;
  let foundLastInternalImport = false;
  let foundExports = false;
  lines.forEach((line) => {
    // console.log(line);
    // console.log({ foundFirstInternalRequire, foundLastInternalRequire });

    if (line.match('import { Entity } from "@bimo/core-utils-entity"')) return;

    const internalImportMatch = line.match(internalImportMatcher);
    if (internalImportMatch) {
      if (!foundFirstInternalImport) foundFirstInternalImport = true;
      if (foundLastInternalImport) throw new Error(`Multiple internal require blocks in ${factoryName}`);
      const requiredEntityName = internalImportMatch[1];
      requiredEntityNames.push(requiredEntityName);
      keptLines.push(
        `import { Bimo${requiredEntityName}, ${requiredEntityName}Props } from "./${requiredEntityName}";`,
      );
      return;
    }

    const collectionPropsMatch = line.match(collectionPropsMatcher);
    if (collectionPropsMatch) {
      keptLines.push(line.replace(collectionPropsMatcher,
        `extends ExtendedCollectionProps<Bimo$1, $2Props>`,
      ));
      return;
    }

    const collectionMatch = line.match(collectionMatcher);
    if (collectionMatch) {
      line = line.replace(collectionMatcher,
        `extends Collection<Bimo$1, $2Props>`,
      );
    }

    if (foundFirstInternalImport && !foundLastInternalImport) {
      foundLastInternalImport = true;
      keptLines.push(`export function ${factoryName}({\n  ${requiredEntityNames
        .join(',\n  ')},\n}: EntityConstructorByEntityClassKey): typeof Bimo${entityName}{`);
    }

    if (line.trim().match(/^export class /)) {
      if (!foundFirstInternalImport) {
        keptLines.push(
          `export function ${factoryName}(entityConstructorByEntityClassKey: EntityConstructorByEntityClassKey): typeof Bimo${entityName}{`,
        );
      }
      if (foundFirstInternalImport && !foundLastInternalImport) throw new Error(`Invalid file format`);
      foundFirstInternalImport = true;
      foundLastInternalImport = true;
      keptLines.push(line.replace('export class', ' class'));
      return;
    }

    if (line.match('export default')) {
      foundExports = true;
      keptLines.push(`  return ${entityName}`);
      keptLines.push('}');
      return;
    }

    const keptLine = (foundExports || !foundFirstInternalImport) ? line : `  ${line}`;
    keptLines.push(keptLine);
  });
  keptLines.push(`export default ${factoryName}`);
  await fs.outputFile(path.join(outputFolderPath, file.name), keptLines.join('\n'));
}

async function updateClassFactories(inputFolderPath, outputFolderPath) {
  console.log(`input: ${inputFolderPath}`);
  console.log(`output: ${outputFolderPath}`);
  const inputFiles = await getFilesInFolder(inputFolderPath);

  inputFiles.forEach(async (file) => {
    try {
      wrapClassInFuctionAndReplaceInternalRequires({ file, outputFolderPath });
    }
    catch (error) {
      console.log(error);
    }
  });
}

module.exports = updateClassFactories;
