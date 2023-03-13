/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const path = require('path');

const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const { clearFolder, getJsonAtPath } = require('@bimo/test-utils-get-test-data');

const { fsBimo: fs } = require('@bimo/core-utils-filesystem');
const testUtils = require('@bimo/test-utils-hash-and-compare-contents');

const { VariantPoint, resetAllEntitiesNextIds } = require('..');

const PATH_TO_TEMP_FOLDER = path.join(__dirname, 'temp');

describe('Domain :: VariantPointPoint', () => {
  before(async () => {
    await clearFolder(PATH_TO_TEMP_FOLDER);
  });
  describe('#parseModel and serializeModel', () => {
    context('when given a valid json', () => {
      const tempFilePath = path.join(PATH_TO_TEMP_FOLDER, 'VariantPoint.json');
      let parsedModel;

      before(async () => {
        resetAllEntitiesNextIds();
        const json = await getJsonAtPath(dataPack.entities.VariantPoint);
        parsedModel = await VariantPoint.parseModel(json);
        await fs.outputJson(tempFilePath, parsedModel.serializeModel(), { spaces: 2 });
      });
      it('parseModel works', () => {
        expect(parsedModel).to.be.instanceOf(VariantPoint);
      });
      it(testUtils.createExpectationMessage(tempFilePath, dataPack.entities.VariantPoint, 'serializeModel works'), async () => {
        await testUtils.testFileOutput(tempFilePath, dataPack.entities.VariantPoint);
      });
    });
  });
});
