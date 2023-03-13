const { expect } = require('chai');

const dataPack = require('@bimo/test-data-json-serialized-places-collection-1');
const { getJsonAtPath } = require('@bimo/test-utils-get-test-data');

const { PlacesCollection } = require('..');

function test1(loader) {
  it('placesByReferencePlace returns a Map of arrays of places indexed by reference place ids', async () => {
    const placesCollection = await loader();
    const placesByReferencePlace = placesCollection.placesByReferencePlace;
    expect(placesByReferencePlace).to.be.instanceOf(Map);
    Array.from(placesByReferencePlace.entries()).forEach(([key, value]) => {
      expect(key).to.be.a('string');
      expect(value).to.be.an('array');
    });
  });
}

function test2(loader) {
  it('place.isRefPlace works as expected', async () => {
    const placesCollection = await loader();
    expect(placesCollection.getByBusinessId('CJV-00').isRefPlace).to.equal(true);
    expect(placesCollection.getByBusinessId('CJV1').isRefPlace).to.equal(false);
  });
}

function test3(loader) {
  it('place.childrenPlaces is always an array', async () => {
    const placesCollection = await loader();
    placesCollection.forEach((place) => expect(place.childrenPlaces).to.be.an('array'));
  });
}

const testSuites = [
  {
    name: 'unaltered',
    loader: async () => {
      const rawData = await getJsonAtPath(dataPack);
      return PlacesCollection.parseModel(rawData);
    },
  },
  {
    name: 'altered',
    loader: async () => {
      const rawData = await getJsonAtPath(dataPack);
      const raw = await PlacesCollection.parseModel(rawData);
      raw.filter((place) => place.plcIdentifier !== 'ACH-FE');
      return raw;
    },
  },
];

describe(`PlacesCollection and place`, () => {
  testSuites.forEach(({ name, loader }) => {
    describe(`On places collection ${name}`, () => {
      test1(loader);
      test2(loader);
      test3(loader);
    });
  });
});
