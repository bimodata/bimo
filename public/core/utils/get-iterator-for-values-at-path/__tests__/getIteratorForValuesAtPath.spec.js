const { expect } = require('chai');

const getIteratorForCollectionAtPath = require('..');

const sourceItem = {
  a: 'toto',
  b: {
    name: 'titi',
    items: [
      {
        name: 'allo',
        routes: {
          name: 'toto',
          items: [1, 2, 3],
        },
      },
      {
        name: 'bonjour',
        routes: {
          name: 'bonj',
          items: ['a', 'b', 'c'],
        },
      },
    ],
  },
};

describe('getIteratorForCollectionAtPath', () => {
  context(`with valid args `, () => {
    context(`when path is an array`, () => {
      it(`works`, () => {
        const iterator = getIteratorForCollectionAtPath(sourceItem, ['b', 'items', 'routes', 'items']);
        expect(Array.from(iterator)).to.eql([1, 2, 3, 'a', 'b', 'c']);
      });
    });
    context(`when path is a string`, () => {
      it(`works`, () => {
        const iterator = getIteratorForCollectionAtPath(sourceItem, 'b.items.routes.items');
        expect(Array.from(iterator)).to.eql([1, 2, 3, 'a', 'b', 'c']);
      });
    });
  });
});
