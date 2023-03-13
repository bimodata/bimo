const { expect } = require('chai');

const groupByToMap = require('..');

describe('groupByToMap', () => {
  it(`works with a func iteratee that uses index (as a number)`, () => {
    const sourceArray = [1, 2, 3, 4];
    const returnedMap = groupByToMap(sourceArray, (value, index) => index === 2);
    expect(returnedMap).to.be.instanceOf(Map);
    expect(Array.from(returnedMap.entries())).to.eql(
      [[false, [1, 2, 4]], [true, [3]]],
    );
  });
  it(`works with a func iteratee that uses key (as a string)`, () => {
    const sourceObject = { 1: 1, 2: 2, 3: 3, 4: 4 };
    const returnedMap = groupByToMap(sourceObject, (value, index) => index === '3');
    expect(returnedMap).to.be.instanceOf(Map);
    expect(Array.from(returnedMap.entries())).to.eql(
      [[false, [1, 2, 4]], [true, [3]]],
    );
  });
  it(`works with a string iteratee shorthand`, () => {
    const sourceArray = [
      { name: 'Gaël', surName: 'Haméon' },
      { name: 'Alix', surName: 'Haméon' },
      { name: 'Gaël', surName: 'Monfils' },
    ];
    const returnedMap = groupByToMap(sourceArray, 'name');
    expect(returnedMap).to.be.instanceOf(Map);
    expect(Array.from(returnedMap.entries())).to.eql(
      [
        ['Gaël', [{ name: 'Gaël', surName: 'Haméon' }, { name: 'Gaël', surName: 'Monfils' }]],
        ['Alix', [{ name: 'Alix', surName: 'Haméon' }]],
      ],
    );
  });
});
