/* eslint-disable max-classes-per-file */
const { expect } = require('chai');

const getEntityClassKeyFromEntity = require('..').getEntityClassKeyFromEntity;

describe('getEntityClassKeyFromEntity', () => {
  context(`given an object that has a constructor`, () => {
    class Item1 {}
    it(`returns the constructor's name `, () => {
      expect(getEntityClassKeyFromEntity({ itemName: 'Toto' })).to.equal('Object');
      expect(getEntityClassKeyFromEntity(new Item1())).to.equal('Item1');
    });
  });

  context(`given an object that has no constructor`, () => {
    const item1 = Object.create(null);
    it(`throws `, () => {
      expect(() => getEntityClassKeyFromEntity(item1)).to.throw();
    });
  });
  context(`given something else than object `, () => {
    it(`Throws`, () => {
      expect(() => getEntityClassKeyFromEntity(true)).to.throw();
      expect(() => getEntityClassKeyFromEntity(() => 'coucou')).to.throw();
      expect(() => getEntityClassKeyFromEntity('coucou')).to.throw();
      expect(() => getEntityClassKeyFromEntity(5)).to.throw();
    });
  });
});
