const { expect } = require('chai');

const findInSet = require('..');

// There is an issue when running mocha tests using TS-Node: for of does not work
describe.skip('findInSet', () => {
  context(`with valid args `, () => {
    it(`returns a value that matches predicate if there is one`, () => {
      expect(findInSet(new Set(['A', 'B', 'C', 'D']), (value) => value === 'B'))
        .to.equal('B');
      expect(findInSet(new Set(['A', 'B', 'C', 'D']), (value) => value === 'D'))
        .to.equal('D');
    });

    it(`returns false if there is none`, () => {
      expect(findInSet(new Set(['A', 'B', 'C', 'D']), (value) => value === 'E'))
        .to.equal(false);
    });
  });
});
