const { expect } = require('chai');

const { uniqueIdPolicyFactory, Collection } = require('..');

const uniqueIdPolicy = uniqueIdPolicyFactory();

class TestCollection extends Collection {
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

describe('uniqueIdPolicy', () => {
  describe(`@key`, () => {
    it(`equals 'uniqueId'`, () => {
      expect(uniqueIdPolicy.key).to.equal('uniqueId');
    });
  });
  describe(`@description`, () => {
    it(`equals 'Ensures that each item in a collection has a unique truthy id, and a unique business id.'`, () => {
      expect(uniqueIdPolicy.description).to.equal(
        `Ensures that each item in a collection has a unique truthy id, and a unique business id.`,
      );
    });
  });
  describe(`#evaluate()`, () => {
    context(`with valid args `, () => {
      /** @type {TestCollection} */
      let collection;
      beforeEach(() => {
        collection = new TestCollection({ items: [{ id: '1', label: '1' }, { id: '2', label: '2' }], associationType: `aggregation` });
      });
      context(`with event 'add'`, () => {
        context(`when the new item's id is not already used in the collection`, () => {
          const item = { id: '3', label: '3' };
          it(`returns []`, () => {
            expect(uniqueIdPolicy.evaluate('add', { item, collection })).to.be.an('array').of.length(0);
          });
        });
        context(`when the new item's id is already used in the collection`, () => {
          const item = { id: '2', label: '3' };
          it(`throws a meaningful error`, () => {
            expect(() => {
              uniqueIdPolicy.evaluate('add', { item, collection });
            }).to.throw('Un item a déjà la valeur 2 pour la propriété id');
          });
        });
        context(`when the new item has no id`, () => {
          const item = { label: '3' };
          it(`throws a meaningful error`, () => {
            expect(() => {
              uniqueIdPolicy.evaluate('add', { item, collection });
            }).to.throw('La valeur undefined de la propriété id est invalide.');
          });
        });
      });
      context(`with event 'default'`, () => {
        context(`when the collection contains no duplicate ids`, () => {
          it(`returns []`, () => {
            expect(uniqueIdPolicy.evaluate('default', { collection })).to.be.an('array').of.length(0);
          });
        });
        context(`when the collection contains duplicate ids`, () => {
          it(`throws a meaningful error`, () => {
            collection.add({ id: '1', label: '3' });
            expect(() => {
              uniqueIdPolicy.evaluate('default', { collection });
            }).to.throw('Au moins deux items ont la valeur 1 pour la propriété id');
          });
        });
        context(`when the collection contains items with no id`, () => {
          it(`throws a meaningful error`, () => {
            collection.add({ label: '3' });
            expect(() => {
              uniqueIdPolicy.evaluate('default', { collection });
            }).to.throw('Un item a une valeur invalide (undefined) dans la propriété id utilisée comme id dans cette collection.');
          });
        });
      });
    });
  });
});
