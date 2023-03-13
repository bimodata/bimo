const { expect } = require('chai');
const { Place, PlacesCollection, TripPoint, VariantPoint } = require('@bimo/core-entities');

const { getStupidLogger } = require('@bimo/core-utils-logging');
const retrievePlace = require('..');

const logger = getStupidLogger(true);

describe('Hastus :: Domain :: Services :: retrievePlace', () => {
  const place1 = new Place({ plcIdentifier: 'toto' });
  const tripPoint1 = new TripPoint({ trpptPlace: 'PSL-00' });
  const tripPoint2 = new TripPoint({ trpptPlace: 'toto' });
  const tripPoint3 = new TripPoint({ trpptOriginalPlace: 'PSL-00' });
  const variantPoint1 = new VariantPoint({ varptPlace: 'PSL-00' });
  const variantPoint2 = new VariantPoint({ varptPlace: 'toto' });
  const placesCollection = new PlacesCollection({
    items: [
      {
        plcIdentifier: `PSL-00`,
        plcReferencePlace: null,
      },
      {
        plcIdentifier: `CJV-00`,
        plcReferencePlace: null,
      },
    ],
  });

  context('given a place', () => {
    it(`returns the place no matter what happens with the other args`, () => {
      expect(retrievePlace(place1, undefined, { logger })).to.equal(place1);
      expect(retrievePlace(place1, 'toto', { logger })).to.equal(place1);
      expect(retrievePlace(place1, placesCollection, { logger })).to.equal(place1);
    });
  });

  context('given a valid placesCollection', () => {
    context('given a string', () => {
      it(`returns the place from the placesCollection that has the string as plcIdentifier`, () => {
        const result = retrievePlace('PSL-00', placesCollection, { logger });
        expect(result).to.be.an.instanceOf(Place).with.property(`plcIdentifier`, 'PSL-00');
      });
      it(`throws a meaningful error if there is none`, () => {
        expect(() => retrievePlace('toto', placesCollection, { logger })).to.throw(
          `Pas de lieu avec l'id "toto" dans le jeu de lieux`,
        );
      });
    });
    context('given a tripPoint', () => {
      it(`returns the place from the placesCollection that has the tripPoint's trpptPlace as plcIdentifier`, () => {
        const result = retrievePlace(tripPoint1, placesCollection, { logger });
        expect(result).to.be.an.instanceOf(Place).with.property(`plcIdentifier`, 'PSL-00');
      });
      it(`throws a meaningful error if there is none`, () => {
        expect(() => retrievePlace(tripPoint2, placesCollection, { logger })).to.throw(
          `Pas de lieu avec l'id "toto" dans le jeu de lieux`,
        );
      });
    });
    context('given a variantPoint', () => {
      it(`returns the place from the placesCollection that has the variantPoint's varptPlace as plcIdentifier`, () => {
        const result = retrievePlace(variantPoint1, placesCollection, { logger });
        expect(result).to.be.an.instanceOf(Place).with.property(`plcIdentifier`, 'PSL-00');
      });
      it(`throws a meaningful error if there is none`, () => {
        expect(() => retrievePlace(variantPoint2, placesCollection, { logger })).to.throw(
          `Pas de lieu avec l'id "toto" dans le jeu de lieux`,
        );
      });
    });
    context('given an object where the placeIdProp is missing', () => {
      it(`throws an error`, () => {
        expect(() => retrievePlace(tripPoint3, placesCollection, { logger })).to.throw(`Couldn't get placeIdToUse`);
      });
    });
  });
  context('given no placesCollection', () => {
    context('given any placeLike other than a Place', () => {
      it(`throws an error`, () => {
        expect(() => retrievePlace('PSL-00', undefined, { logger })).to.throw(`When placeLike is not a place`);
        expect(() => retrievePlace(tripPoint1, undefined, { logger })).to.throw(`When placeLike is not a place`);
        expect(() => retrievePlace(variantPoint1, undefined, { logger })).to.throw(`When placeLike is not a place`);
      });
    });
  });
});
