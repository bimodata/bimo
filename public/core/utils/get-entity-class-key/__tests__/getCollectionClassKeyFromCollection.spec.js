/* eslint-disable max-classes-per-file */
const { expect } = require('chai');

const getCollectionClassKeyFromCollection = require('..').getCollectionClassKeyFromCollection;

describe('getCollectionClassKeyFromCollection', () => {
  context(`given an object that has a constructor`, () => {
    class Collection1 {}
    it(`returns the constructor's name `, () => {
      expect(getCollectionClassKeyFromCollection({ itemName: 'Toto' })).to.equal('Object');
      expect(getCollectionClassKeyFromCollection(new Collection1())).to.equal('Collection1');
    });
  });

  context(`given an object that has no constructor`, () => {
    const item1 = Object.create(null);
    it(`throws `, () => {
      expect(() => getCollectionClassKeyFromCollection(item1)).to.throw();
    });
  });
  context(`given something else than object `, () => {
    it(`Throws`, () => {
      expect(() => getCollectionClassKeyFromCollection(true)).to.throw();
      expect(() => getCollectionClassKeyFromCollection(() => 'coucou')).to.throw();
      expect(() => getCollectionClassKeyFromCollection('coucou')).to.throw();
      expect(() => getCollectionClassKeyFromCollection(5)).to.throw();
    });
  });
});
