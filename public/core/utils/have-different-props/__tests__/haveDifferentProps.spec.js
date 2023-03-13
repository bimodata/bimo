const { expect } = require('chai');

const haveDifferentProps = require('..');

const serviceContext = {};

function itReturnsFalse(items, config) {
  it(`returns false for ${items.map((item) => item.name)} with ${config.pathsToProps}`, () => {
    expect(haveDifferentProps(items, config, serviceContext)).to.equal(false);
  });
}
function itReturnsStringWithInfo(items, config, expectedResult) {
  it(`returns an object that contains info on the prop that is different and the different values`, () => {
    expect(haveDifferentProps(items, config, serviceContext)).to.eql(expectedResult);
  });
}

const obj0 = { name: 'obj0', prop1: 'valueA', prop2: 'valueB', prop3: 'valueC' };
const obj1 = { name: 'obj1', prop1: 'valueA', prop2: 'valueB', prop3: 'valueC' };
const obj2 = { name: 'obj2', prop1: 'valueA', prop2: 'valueB', prop3: 'valueD' };
const obj3 = { name: 'obj3', prop1: 'valueA', prop2: 'valueB' };
const obj4 = { name: 'obj4', prop1: 'valueD', prop2: 'valueB', prop3: 'valueD' };

const itemsAndConfigsThatShouldReturnFalse = [
  { items: [obj0, obj1], config: { pathsToProps: ['prop1', 'prop2', 'prop3'] } },
  { items: [obj0, obj1, obj2, obj3], config: { pathsToProps: ['prop1', 'prop2'] } },
  { items: [obj0, obj1, obj2, obj3, obj4], config: { pathsToProps: ['prop2'] } },
  { items: [obj2, obj4], config: { pathsToProps: ['prop2', 'prop3'] } },
];

const itemsAndConfigsAndExpectedReturnStrings = [
  {
    items: [obj0, obj2],
    config: { pathsToProps: ['prop1', 'prop2', 'prop3'] },
    expectedResult: { differentProp: 'prop3', firstValue: 'valueC', otherValue: 'valueD' },
  },
  {
    items: [obj0, obj4],
    config: { pathsToProps: ['prop1', 'prop2', 'prop3'] },
    expectedResult: { differentProp: 'prop1', firstValue: 'valueA', otherValue: 'valueD' },
  },
  {
    items: [obj0, obj1, obj2, obj3, obj4],
    config: { pathsToProps: ['prop1', 'prop2'] },
    expectedResult: { differentProp: 'prop1', firstValue: 'valueA', otherValue: 'valueD' },
  },
];

describe('haveDifferentProps', () => {
  context(`with valid args `, () => {
    context(`when the values of the given props are the same on all objects`, () => {
      itemsAndConfigsThatShouldReturnFalse.forEach(({ items, config }) => itReturnsFalse(items, config));
    });
    context(`when the values of the given props are not the same on all objects`, () => {
      itemsAndConfigsAndExpectedReturnStrings.forEach(({ items, config, expectedResult }) => {
        itReturnsStringWithInfo(items, config, expectedResult);
      });
    });
  });
});
