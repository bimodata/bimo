/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const path = require('path');

const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const { getTestEntity, clearFolder, getJsonAtPath } = require('@bimo/test-utils-get-test-data');
const { fsBimo: fs } = require('@bimo/core-utils-filesystem');
const testUtils = require('@bimo/test-utils-hash-and-compare-contents');

const { Variant, resetAllEntitiesNextIds } = require('..');

const PATH_TO_TEMP_FOLDER = path.join(__dirname, 'temp');

describe('Bimo :: Entities :: Variant', () => {
  before(async () => {
    await clearFolder(PATH_TO_TEMP_FOLDER);
  });

  let variant;
  beforeEach(async () => {
    variant = await getTestEntity(dataPack.entities.Variant, Variant);
  });

  describe('#parseModel and serializeModel', () => {
    context('when given a valid json', () => {
      const tempFilePath = path.join(PATH_TO_TEMP_FOLDER, 'Variant.json');
      let parsedModel;

      before(async () => {
        resetAllEntitiesNextIds();
        const json = await getJsonAtPath(dataPack.entities.Variant);
        parsedModel = await Variant.parseModel(json);
        await fs.outputJson(tempFilePath, parsedModel.serializeModel(), { spaces: 2 });
      });
      it('parseModel works', () => {
        expect(parsedModel).to.be.instanceOf(Variant);
      });
      it(testUtils.createExpectationMessage(tempFilePath, dataPack.entities.Variant, 'serializeModel works'), async () => {
        await testUtils.testFileOutput(tempFilePath, dataPack.entities.Variant);
      });
    });
  });
  describe('#usesOneOfThesePlaces', () => {
    context(`when given a list of places, one of which is used at least once in the variant`, () => {
      const listOfPlaces = ['eDxeN', 'XYKmU'];
      it(`returns true`, () => {
        expect(variant.usesOneOfThesePlaces(listOfPlaces)).to.be.true;
      });
    });
    context(`when given a list of places, none of which is used at least once in the variant`, () => {
      const listOfPlaces = new Set(['XYKmU', 'TotoVille']);
      it(`returns false`, () => {
        expect(variant.usesOneOfThesePlaces(listOfPlaces)).to.be.false;
      });
    });
    context(`when given something falsey`, () => {
      it(`returns undefined`, () => {
        expect(variant.usesOneOfThesePlaces()).to.be.undefined;
        expect(variant.usesOneOfThesePlaces(null)).to.be.undefined;
        expect(variant.usesOneOfThesePlaces(false)).to.be.undefined;
        expect(variant.usesOneOfThesePlaces('')).to.be.undefined;
      });
    });
    context(`when given only one place not in an array`, () => {
      it(`works`, () => {
        expect(variant.usesOneOfThesePlaces('TotoVille')).to.be.false;
        expect(variant.usesOneOfThesePlaces('eDxeN')).to.be.true;
      });
    });
  });
  describe('#updatePlacesAndReturnListOfChanges', () => {
    context(`when given a newPlaceByOldPlace object, of which some old places are used in the variant`, () => {
      const newPlaceIdByOldPlaceId = { eDxeN: 'BAM2a' };
      const newPlaceIdByOldPlaceId2 = { BAM2a: 'eDxeN', zo0C: 'AB2a' };
      const newPlaceIdByOldPlaceId3 = { BAM2a: 'eDxeN', AB2a: 'zo0C' };
      it(`does the change, and returns a list of the changes it made`, () => {
        expect(variant.usesOneOfThesePlaces('eDxeN')).to.be.true;
        expect(variant.usesOneOfThesePlaces('BAM2a')).to.be.false;

        expect(variant.updatePlacesAndReturnListOfChanges(newPlaceIdByOldPlaceId)).to.be.an('array').of.length(1);

        expect(variant.usesOneOfThesePlaces('eDxeN')).to.be.false;
        expect(variant.usesOneOfThesePlaces('BAM2a')).to.be.true;

        expect(variant.updatePlacesAndReturnListOfChanges(newPlaceIdByOldPlaceId2)).to.be.an('array').of.length(2);

        expect(variant.usesOneOfThesePlaces('BAM2a')).to.be.false;
        expect(variant.usesOneOfThesePlaces('eDxeN')).to.be.true;
        expect(variant.usesOneOfThesePlaces('AB2b')).to.be.false;
        expect(variant.usesOneOfThesePlaces('AB2a')).to.be.true;

        expect(variant.updatePlacesAndReturnListOfChanges(newPlaceIdByOldPlaceId3)).to.be.an('array').of.length(1);

        expect(variant.usesOneOfThesePlaces('eDxeN')).to.be.true;
        expect(variant.usesOneOfThesePlaces('BAM2a')).to.be.false;
      });
    });
    context(`when given a newPlaceByOldPlace object, of which no old places are used in the variant`, () => {
      const newPlaceIdByOldPlaceId = { titi: 'toto' };
      it(`returns an emtpy array`, () => {
        expect(variant.updatePlacesAndReturnListOfChanges(newPlaceIdByOldPlaceId)).to.be.an('array').of.length(0);
      });
    });
    context(`when given something falsey`, () => {
      it(`returns undefined`, () => {
        expect(variant.updatePlacesAndReturnListOfChanges()).to.be.undefined;
        expect(variant.updatePlacesAndReturnListOfChanges(null)).to.be.undefined;
        expect(variant.updatePlacesAndReturnListOfChanges(false)).to.be.undefined;
        expect(variant.updatePlacesAndReturnListOfChanges('')).to.be.undefined;
      });
    });
  });
});
