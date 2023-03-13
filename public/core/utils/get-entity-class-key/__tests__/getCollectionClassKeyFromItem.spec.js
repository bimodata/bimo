/* eslint-disable max-classes-per-file */
const { expect } = require('chai');

const getCollectionClassKeyFromItem = require('..').getCollectionClassKeyFromItem;

describe('getCollectionClassKeyFromItem', () => {
  context(`given a string`, () => {
    it(`returns a string made of the original string + "sCollection" `, () => {
      expect(getCollectionClassKeyFromItem('toto')).to.equal('totosCollection');
    });
  });
  context(`given an object `, () => {
    class Item1 {}
    class Item2 {}

    it(`returns a string made of the object constructors name + "sCollection" `, () => {
      expect(getCollectionClassKeyFromItem(new Item1())).to.equal('Item1sCollection');
      expect(getCollectionClassKeyFromItem(new Item2())).to.equal('Item2sCollection');
      expect(getCollectionClassKeyFromItem({})).to.equal('ObjectsCollection');
    });
  });

  context(`given something else than string or object `, () => {
    it(`Throws`, () => {
      expect(() => getCollectionClassKeyFromItem(true)).to.throw();
      expect(() => getCollectionClassKeyFromItem(() => 'coucou')).to.throw();
      expect(() => getCollectionClassKeyFromItem(5)).to.throw();
    });
  });
});
