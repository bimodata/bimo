const { expect } = require('chai');

const partition = require('..');

describe('partition', () => {
  it(`works with a func iteratee that uses index`, () => {
    const sourceArray = [1, 2, 3, 4];
    const [matches, noMatches] = partition(sourceArray, (value, index) => index === 2);
    expect(matches).to.eql([3]);
    expect(noMatches).to.eql([1, 2, 4]);
  });
  it(`works with an object iteratee`, () => {
    const sourceArray = [
      { name: 'Gaël', surName: 'Haméon' },
      { name: 'Alix', surName: 'Haméon' },
      { name: 'Gaël', surName: 'Monfils' },
    ];
    const [matches, noMatches] = partition(sourceArray, { name: 'Gaël' });
    expect(matches).to.eql([
      { name: 'Gaël', surName: 'Haméon' },
      { name: 'Gaël', surName: 'Monfils' },
    ]);
    expect(noMatches).to.eql([{ name: 'Alix', surName: 'Haméon' }]);
  });
});
