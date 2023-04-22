/* eslint-disable no-console */

const { fsBimo, getAllFilesRecursively } = require('@bimo/core-utils-filesystem');
const { partition } = require('lodash');
const path = require('path');

async function execute(rootDir) {
  console.log(`Will execute get-props-for-entity-class in ${rootDir}`);
  const allFiles = [];
  await getAllFilesRecursively(rootDir, allFiles);

  const [entityFiles, collectionFiles] = partition(allFiles, (file) => !file.name.match(/Collection\.ts$/));
  const [firstFile] = entityFiles;
  const myFiles = [firstFile];
  await Promise.all(entityFiles.map(async (file) => handleFile(file.fullPath, { collection: false })));
  await Promise.all(collectionFiles.map(async (file) => handleFile(file.fullPath, { collection: true })));

  console.log('done');
}
module.exports = execute;

const propNameMatcher = /this\.(\w+) = /;
const fileNameMatcher = /(\w+)\.ts/;
const requireMatcher = /const (\{ .* \}) = require\((.*)\);/;
const requireMatcher2 = /const (\w+) = require\((.*)\);/;
const linesToDelete = [
  '/* Linked Classes */',
  '/* Serialization utilities dependencies */',
  '/* Serialization utilities */',
  '/* Class definition */',
  `this.parent = props.parent;`,

];
const itemClassMatcher = /export class (\w+) extends Item \{/;
const collectionClassMatcher = /export class (\w+) extends Collection \{/;
const constructorPropsMatcher = /constructor\(props( = {})?\)/;
const otherEntityMatcher = /import (\w+) from '\.\/\w+';/;

async function handleFile(fullPath, { collection }) {
  const contents = await fsBimo.readFile(fullPath, { encoding: 'utf8' });
  // @ts-ignore
  const fileName = path.basename(fullPath).match(fileNameMatcher)[1];
  const classKey = collection ? fileName.replace('sCollection', '') : fileName;
  const entityName = fileName;
  console.log(classKey);
  /** @type {string[]} */
  const lines = contents.split('\n')
    .map((line) => {
      if (linesToDelete.includes(line.trim())) {
        return '';
      }
      return line;
    })
    .map((line) => line.replace(
      `const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');`,
      `const { getAllChildClasses } = require('@bimo/core-utils-serialization');`))
    .map((line) => line.replace('getAndValidatePropFromProps', 'gavpfp'))
    .map((line) => line.replace(requireMatcher, 'import $1 from $2;'))
    .map((line) => line.replace(requireMatcher2, 'import $1 from $2;'))
    .map((line) => line.replace(/^class /, 'export class '))
    .map((line) => line.replace('module.exports = ', 'export default '))
    .map((line) => line.replace(itemClassMatcher, 'export class $1 extends Item<$1> {'))
    .map((line) => line.replace(collectionClassMatcher, `export class $1 extends Collection<${classKey}, ${classKey}Props> {`))
    .map((line) => line.replace(`${entityName}.prototype.serializeModel = serializeThis;`, ''))
    .map((line) => line.replace(`${entityName}.parseModel = parseThis;`, ''))
    .map((line) => line.replace(/\/\*\* @extends .*/, ''))
    .map((line) => line.replace(
      `import { Collection } from '@bimo/core-utils-collection';`,
      `import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";`,
    ))
    .map((line) => line.replace(
      `import { Item } from '@bimo/core-utils-collection';`,
      `import { Item, ExtendedItemProps } from "@bimo/core-utils-collection";`,
    ))
    .map((line) => line.replace(
      otherEntityMatcher,
      `import { $1, $1Props } from "./$1";`,
    ))
    .map((line) => line.replace(constructorPropsMatcher, `constructor(props: ${entityName}Props$1)`));

  const startOfConstructor = lines.findIndex((line) => line.match(/constructor/));
  if (startOfConstructor === -1) return;
  const linesAfterConstructor = lines.slice(startOfConstructor + 1);
  const endOfConstructor = linesAfterConstructor.findIndex((line) => line.match(/ {2}\}/));
  const linesOfConstructor = linesAfterConstructor.slice(1, endOfConstructor);
  const propNames = linesOfConstructor.map((line) => {
    const match = line.match(propNameMatcher);
    if (!match) return false;
    return match[1];
  }).filter(Boolean);
  const propsDeclarationLines = propNames.map((propName) => `  ${propName}?: string;`);
  lines.splice(startOfConstructor, 0, ...propsDeclarationLines);

  const interfaceDeclarationLines = [
    `export interface ${entityName}Props extends ${collection ? `ExtendedCollectionProps<${classKey}, ${classKey}Props>` : 'ExtendedItemProps'} {`,
    ...propsDeclarationLines,
    `}`,
    '',
  ];
  lines.splice(
    lines.findIndex((line) => line.match(/export class /)),
    0,
    ...interfaceDeclarationLines,
  );

  await fsBimo.writeFile(fullPath, lines.join('\n'), { encoding: 'utf8' });
}
