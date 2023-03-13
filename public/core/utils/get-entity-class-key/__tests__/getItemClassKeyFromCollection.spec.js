/* eslint-disable max-classes-per-file */
const { expect } = require('chai');

const getItemClassKeyFromCollection = require('..').getItemClassKeyFromCollection;

describe('getItemClassKeyFromCollection', () => {
  context(`given a string that ends with "sCollection`, () => {
    it(`returns this string minus "sCollection `, () => {
      expect(getItemClassKeyFromCollection('TotosCollection')).to.equal('Toto');
    });
  });
  context(`given a string that does not end with "sCollection`, () => {
    it(`throws an error `, () => {
      expect(() => getItemClassKeyFromCollection('TotoCollection')).to.throw();
      expect(() => getItemClassKeyFromCollection('Totos')).to.throw();
      expect(() => getItemClassKeyFromCollection('totoscollection')).to.throw();
      expect(() => getItemClassKeyFromCollection('totosCollections')).to.throw();
    });
  });
  context(`given an object that has an itemName prop`, () => {
    it(`returns the itemName `, () => {
      expect(getItemClassKeyFromCollection({ itemName: 'Toto' })).to.equal('Toto');
    });
  });

  context(`given an object that has no itemName prop`, () => {
    it(`Throws`, () => {
      expect(() => getItemClassKeyFromCollection({})).to.throw();
    });
  });

  context(`given something else than string or object `, () => {
    it(`Throws`, () => {
      expect(() => getItemClassKeyFromCollection(true)).to.throw();
      expect(() => getItemClassKeyFromCollection(() => 'coucou')).to.throw();
      expect(() => getItemClassKeyFromCollection(5)).to.throw();
    });
  });
});
