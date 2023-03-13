// eslint-disable-next-line max-classes-per-file
const { expect } = require('chai');

const { uniqueIdRule, Collection } = require('..');

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

describe('uniqueIdRule', () => {
  describe(`@key`, () => {
    it(`equals 'uniqueId'`, () => {
      expect(uniqueIdRule.key).to.equal('uniqueId');
    });
  });
  describe(`@description`, () => {
    it(`equals 'Ensures that each item in a collection has a unique id. Falsey ids are ignored.'`, () => {
      expect(uniqueIdRule.description).to.equal('Ensures that each item in a collection has a unique id. Falsey ids are ignored.');
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
        context(`when the new item's id is not already used in the collection`, () => {
          const item = { id: '3', label: '3' };
          it(`returns false`, () => {
            expect(uniqueIdRule.evaluate('add', { item, collection })).to.equal(false);
          });
        });
        context(`when the new item's id is already used in the collection`, () => {
          const item = { id: '2', label: '3' };
          it(`returns a meaningfull message`, () => {
            expect(uniqueIdRule.evaluate('add', { item, collection })).to.contain(
              'Un item a déjà la valeur 2 pour la propriété id',
            );
          });
        });
      });
      context(`with event 'default'`, () => {
        context(`when the collection contains no duplicate ids`, () => {
          it(`returns false`, () => {
            expect(uniqueIdRule.evaluate('default', { collection })).to.equal(false);
          });
        });
        context(`when the collection contains duplicate ids`, () => {
          it(`returns a meaningfull message`, () => {
            collection.add({ id: '1', label: '3' });
            expect(uniqueIdRule.evaluate('default', { collection })).to.contain(
              'Au moins deux items ont la valeur 1 pour la propriété id',
            );
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
        expect(uniqueIdRule.evaluate('add', { item: {}, collection })).to.equal(false);
        expect(uniqueIdRule.evaluate('default', { collection })).to.equal(false);
      });
    });
  });
});
