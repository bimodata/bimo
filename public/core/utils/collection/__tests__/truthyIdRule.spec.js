// eslint-disable-next-line max-classes-per-file
const { expect } = require('chai');

const { truthyIdRule, Collection } = require('..');

class TestCollection1 extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'TestEntity',
      ItemConstructor: Object,
      items: props.items,
      parent: props.parent,
      idPropName: `id`,
      labelPropName: `label`,
      associationType: props.associationType,
    });
  }
}

class TestCollection2 extends Collection {
  constructor(props = {}) {
    super({
      itemName: 'TestEntity',
      ItemConstructor: Object,
      items: props.items,
      parent: props.parent,
      idPropName: null,
      labelPropName: `label`,
      associationType: props.associationType,
    });
  }
}

describe('truthyIdRule', () => {
  describe(`@key`, () => {
    it(`equals 'truthyId'`, () => {
      expect(truthyIdRule.key).to.equal('truthyId');
    });
  });
  describe(`@description`, () => {
    it(`equals 'Ensures that each item in a collection has a truthy id.'`, () => {
      expect(truthyIdRule.description).to.equal('Ensures that each item in a collection has a truthy id.');
    });
  });
  describe(`#evaluate()`, () => {
    context(`with a collection that has idPropName `, () => {
      /** @type {TestCollection1} */
      let collection;
      beforeEach(() => {
        collection = new TestCollection1({ items: [{ id: '1', label: '1' }, { id: '2', label: '2' }], associationType: 'aggregation' });
      });
      context(`with event 'add'`, () => {
        context(`when the new item's id is truthy`, () => {
          const item = { id: '3', label: '3' };
          it(`returns false`, () => {
            expect(truthyIdRule.evaluate('add', { item, collection })).to.equal(false);
          });
        });
        context(`when the new item's id is falsey`, () => {
          const item = { label: '3' };
          it(`returns a meaningfull message`, () => {
            expect(truthyIdRule.evaluate('add', { item, collection })).to.contain('id est invalide');
          });
        });
      });
      context(`with event 'default'`, () => {
        context(`when the collection contains no items with missing ids`, () => {
          it(`returns false`, () => {
            expect(truthyIdRule.evaluate('default', { collection })).to.equal(false);
          });
        });
        context(`when the collection contains items with misssing ids`, () => {
          it(`returns a meaningfull message`, () => {
            collection.add({ label: '3' });
            expect(truthyIdRule.evaluate('default', { collection })).to.contain('Un item a une valeur invalide');
          });
        });
      });
    });
    context(`with a collection that doesn't have idPropName`, () => {
      /** @type {TestCollection2} */
      let collection;
      beforeEach(() => {
        collection = new TestCollection2({ items: [{ id: '1', label: '1' }, { id: '2', label: '2' }] });
      });
      it(`returns false`, () => {
        expect(truthyIdRule.evaluate('add', { item: {}, collection })).to.equal(false);
        expect(truthyIdRule.evaluate('default', { collection })).to.equal(false);
      });
    });
  });
});
