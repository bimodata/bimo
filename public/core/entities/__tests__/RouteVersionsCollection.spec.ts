const { expect } = require('chai');
const path = require('path');

const { fsBimo: fs } = require('@bimo/core-utils-filesystem');
const testUtils = require('@bimo/test-utils-hash-and-compare-contents');

const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const { getJsonAtPath, clearFolder } = require('@bimo/test-utils-get-test-data');
const { RouteVersionsCollection, resetAllEntitiesNextIds } = require('..');

const PATH_TO_TEMP_FOLDER = path.join(__dirname, 'temp');
const PATH_TO_EXPECTED_OUTPUT_FOLDER = path.join(__dirname, 'expectedOutput');

describe('Domain :: RouteVersionsCollection', function testSuite() {
  this.timeout(5000);

  before(async () => {
    await clearFolder(PATH_TO_TEMP_FOLDER);
  });

  describe('#parseModel and serializeModel', () => {
    context('when given a valid json', () => {
      const tempFilePath = path.join(PATH_TO_TEMP_FOLDER, 'RouteVersionsCollection.json');
      let parsedModel;

      before(async () => {
        resetAllEntitiesNextIds();
        const json = await getJsonAtPath(dataPack.entities.RouteVersionsCollection);
        parsedModel = await RouteVersionsCollection.parseModel(json);
        await fs.outputJson(tempFilePath, parsedModel.serializeModel(), { spaces: 2 });
      });
      it('parseModel works', () => {
        expect(parsedModel).to.be.instanceOf(RouteVersionsCollection);
      });
      it(testUtils.createExpectationMessage(tempFilePath, dataPack.entities.RouteVersionsCollection, 'serializeModel works'), async () => {
        await testUtils.testFileOutput(tempFilePath, dataPack.entities.RouteVersionsCollection);
      });
    });
  });
  describe('#createFromOirStyleData', () => {
    context('given oirStyleData about a route version and routes that belong to this route version', () => {
      const pathToExpectedSerializedData = path.join(PATH_TO_EXPECTED_OUTPUT_FOLDER, 'serializedRouteVersionsCollection.json');
      const tempFilePath = path.join(PATH_TO_TEMP_FOLDER, 'RouteVersionsCollectionFromOIR.json');
      let newRouteVersionsCollection;
      before(async () => {
        resetAllEntitiesNextIds();
        newRouteVersionsCollection = RouteVersionsCollection.createFromOirStyleData(
          await getJsonAtPath(dataPack.oirStyleData.RouteVersionsCollection),
        );

        const serializedRouteVersions = newRouteVersionsCollection.map((routeVersion) => {
          // eslint-disable-next-line no-param-reassign
          routeVersion.parent = null;
          return routeVersion.serializeModel();
        });
        const serializedRouteVersionCollection = newRouteVersionsCollection.serializeModel({ allowUnknownAggregatedInstances: true });

        const serializedData = { serializedRouteVersionCollection, serializedRouteVersions };
        await fs.outputJson(tempFilePath, serializedData, { spaces: 2 });
      });
      it('return a RouteVersionsCollection', () => {
        expect(newRouteVersionsCollection).to.be.instanceOf(RouteVersionsCollection);
      });
      it(testUtils.createExpectationMessage(tempFilePath, pathToExpectedSerializedData, 'gives the expected result'), async () => {
        await testUtils.testFileOutput(tempFilePath, pathToExpectedSerializedData);
      });
    });
  });
});
