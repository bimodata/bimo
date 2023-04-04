const fs = require('fs-extra');
const path = require('path');

async function updatePackageJson(rootDir) {
  const packageFilePath = path.join(rootDir, 'package.json');

  const packageFile = await fs.readJson(packageFilePath);
  /** Manipulate the file below * */
  packageFile.main = 'dist/cjs/index.js';
  packageFile.types = 'types/cjs/index.d.ts';
  packageFile.files = [
    'dist/**/*',
  ];
  packageFile.exports = {
    '.': {
      import: {
        types: './types/esm/index.d.ts',
        default: './dist/esm/index.js',
      },
      require: {
        types: './types/cjs/index.d.ts',
        default: './dist/cjs/index.js',
      },
    },
  };
  packageFile.scripts = {
    clean: 'rimraf ./dist && rimraf ./types',
    build: 'yarn clean && yarn build:esm && yarn build:cjs',
    'build:esm': 'tsc -p ./configs/tsconfig.esm.json',
    'build:cjs': 'tsc -p ./configs/tsconfig.cjs.json',
    prepack: 'build',
    test: 'mocha',
    coverage: 'nyc --reporter=html --reporter=text npm test',
    prepublish: 'tsc',
    tsc: 'tsc',
  };
  packageFile.devDependencies['@types/chai'] = '^4.3.4';
  packageFile.devDependencies['@types/mocha'] = '^10.0.1';
  packageFile.devDependencies['@types/node'] = '^18.15.11';
  packageFile.devDependencies.chai = '^4.3.7';
  packageFile.devDependencies.mocha = '^10.2.0';
  packageFile.devDependencies.nyc = '^15.1.0';
  packageFile.devDependencies.rimraf = '^4.4.1';
  packageFile.devDependencies['ts-node'] = '^10.9.1';
  packageFile.devDependencies.typescript = '^5.0.2';

  /** Manipulate the file above * */
  await fs.outputJson(packageFilePath, packageFile, { EOL: '\r\n', encoding: 'utf8', spaces: 2 });
}

module.exports = updatePackageJson;
