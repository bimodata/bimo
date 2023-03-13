/* eslint-disable max-classes-per-file */
const { expect } = require('chai');

const getItemClassKeyFromItem = require('..').getItemClassKeyFromItem;

describe('getItemClassKeyFromItem', () => {
  context(`given an object that has a constructor`, () => {
    class Item1 {}
    it(`returns the constructor's name `, () => {
      expect(getItemClassKeyFromItem({ itemName: 'Toto' })).to.equal('Object');
      expect(getItemClassKeyFromItem(new Item1())).to.equal('Item1');
    });
  });

  context(`given an object that has no constructor`, () => {
    const item1 = Object.create(null);
    it(`throws `, () => {
      expect(() => getItemClassKeyFromItem(item1)).to.throw();
    });
  });
  context(`given something else than object `, () => {
    it(`Throws`, () => {
      expect(() => getItemClassKeyFromItem(true)).to.throw();
      expect(() => getItemClassKeyFromItem(() => 'coucou')).to.throw();
      expect(() => getItemClassKeyFromItem('coucou')).to.throw();
      expect(() => getItemClassKeyFromItem(5)).to.throw();
    });
  });
});
