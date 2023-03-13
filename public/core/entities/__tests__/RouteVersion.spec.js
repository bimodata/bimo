const { expect } = require('chai');
const path = require('path');

const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const { getTestEntity, clearFolder, getJsonAtPath } = require('@bimo/test-utils-get-test-data');
const { fsBimo: fs } = require('@bimo/core-utils-filesystem');
const testUtils = require('@bimo/test-utils-hash-and-compare-contents');

const { RouteVersion, resetAllEntitiesNextIds } = require('..');

const PATH_TO_TEMP_FOLDER = path.join(__dirname, 'temp');

describe('Domain :: RouteVersion', () => {
  before(async () => {
    await clearFolder(PATH_TO_TEMP_FOLDER);
  });

  describe('#parseModel and serializeModel', () => {
    context('when given a valid json', () => {
      const tempFilePath = path.join(PATH_TO_TEMP_FOLDER, 'RouteVersion.json');
      let parsedModel;

      before(async () => {
        resetAllEntitiesNextIds();
        const json = await getJsonAtPath(dataPack.entities.RouteVersion);
        parsedModel = await RouteVersion.parseModel(json);
        await fs.outputJson(tempFilePath, parsedModel.serializeModel(), { spaces: 2 });
      });
      it('parseModel works', () => {
        expect(parsedModel).to.be.instanceOf(RouteVersion);
      });
      it(testUtils.createExpectationMessage(tempFilePath, dataPack.entities.RouteVersion, 'serializeModel works'), async () => {
        await testUtils.testFileOutput(tempFilePath, dataPack.entities.RouteVersion);
      });
    });
  });

  describe('#getVariantsThatUseOneOfThesePlaces', () => {
    let routeVersion;
    beforeEach(async () => {
      routeVersion = await getTestEntity(dataPack.entities.RouteVersion, RouteVersion);
    });
    context(`when given a list of places, at least one of which is used at least once in at least one variant of at least one route of the route version`, () => {
      it(`returns an array of the concerned variants`, () => {
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces('eDxeN')).to.be.an('array').of.length(4);
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces('tkGZ')).to.be.an('array').of.length(3);
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces('HgbQ')).to.be.an('array').of.length(2);
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces(['HgbQ', 'tkGZ'])).to.be.an('array').of.length(5);
      });
    });
    context(`when given a list of places, none of which is used at least once in the route`, () => {
      const listOfPlaces = new Set(['XYKmU', 'TotoVille']);
      it(`returns an empty array`, () => {
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces(listOfPlaces)).to.be.an('array').of.length(0);
      });
    });
    context(`when given something falsey`, () => {
      it(`returns undefined`, () => {
        /* eslint-disable no-unused-expressions */
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces()).to.be.undefined;
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces(null)).to.be.undefined;
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces(false)).to.be.undefined;
        expect(routeVersion.getVariantsThatUseOneOfThesePlaces('')).to.be.undefined;
        /* eslint-enable no-unused-expressions */
      });
    });
  });
});
