const { expect } = require('chai');

const dataPack = require('@bimo/test-data-json-serialized-entities-data-pack-1');
const { getTestEntity } = require('@bimo/test-utils-get-test-data');

const { TripsCollection } = require('..');

describe('Bimo :: Entities :: Trip', () => {
  describe(`# getTimeAsDuration`, () => {
    let tripsCollection;
    before(async () => {
      tripsCollection = await getTestEntity(dataPack.entities.TripsCollection, TripsCollection);
    });

    context(`on a valid trip point`, () => {
      let someTripPoint;
      before(async () => {
        // eslint-disable-next-line prefer-destructuring
        someTripPoint = tripsCollection.items[0].tripPoints.items[0];
      });

      it(`works ...`, () => {
        expect(someTripPoint.getTimeAsDuration().as('second')).to.equal(49080);
      });
    });
  });
});
