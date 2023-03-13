const sinon = require('sinon');
const { assert, expect } = require('chai');

const resetAllEntitiesNextIds = require('..');

describe('resetAllEntitiesNextIds', () => {
  context(`with valid args and no nextId `, () => {
    const entityConstructorByEntityClassKey = {
      Item: { someProp: 'coucou', nextIdValue: '3' },
      ItemsCollection: { someProp: 'hello', nextIdValue: 7 },
      OtherItemscollection: { someProp: 'hello', nextIdValue: 5 },
      OtherItemsCollection: { someProp: 'hello', nextIdValue: '2' },
    };
    const { Item, ItemsCollection, OtherItemsCollection, OtherItemscollection } = entityConstructorByEntityClassKey;

    before(() => {
      expect(Item.nextIdValue).to.equal('3');
      expect(OtherItemscollection.nextIdValue).to.equal(5);
      resetAllEntitiesNextIds(entityConstructorByEntityClassKey);
    });
    it(`replaces the nextId attribute of constructors whose does not end with Collection by '1'`, () => {
      expect(Item.nextIdValue).to.equal('1');
      expect(OtherItemscollection.nextIdValue).to.equal('1');
    });
    it(`does not change the nextId attribute of constructors whose name ends with Collection`, () => {
      expect(ItemsCollection.nextIdValue).to.equal(7);
      expect(OtherItemsCollection.nextIdValue).to.equal('2');
    });
  });
  context(`with valid args and a nextId arg `, () => {
    const entityConstructorByEntityClassKey = {
      Item: { someProp: 'coucou', nextIdValue: '3' },
      ItemsCollection: { someProp: 'hello', nextIdValue: 7 },
      OtherItemscollection: { someProp: 'hello', nextIdValue: 5 },
      OtherItemsCollection: { someProp: 'hello', nextIdValue: '2' },
    };
    const { Item, ItemsCollection, OtherItemsCollection, OtherItemscollection } = entityConstructorByEntityClassKey;

    const nextId = 4;

    before(() => {
      expect(Item.nextIdValue).to.equal('3');
      expect(OtherItemscollection.nextIdValue).to.equal(5);
      resetAllEntitiesNextIds(entityConstructorByEntityClassKey, nextId);
    });
    it(`replaces the nextId attribute of constructors whose does not end with Collection by nextId`, () => {
      expect(Item.nextIdValue).to.equal(nextId);
      expect(OtherItemscollection.nextIdValue).to.equal(nextId);
    });
    it(`does not change the nextId attribute of constructors whose name ends with Collection`, () => {
      expect(ItemsCollection.nextIdValue).to.equal(7);
      expect(OtherItemsCollection.nextIdValue).to.equal('2');
    });
  });

  context(`with invalid args `, () => {

  });
});
