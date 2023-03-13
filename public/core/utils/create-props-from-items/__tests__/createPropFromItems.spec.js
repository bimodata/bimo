const { expect } = require('chai');

const { createPropFromItems } = require('..');

describe('createPropFromItems', () => {
  context('when no items is provided', () => {
    it('returns null', () => {
      expect(createPropFromItems()).to.equal(null);
      expect(createPropFromItems(undefined, {})).to.equal(null);
    });
  });
  context('when items is not an object or an array of objects', () => {
    it('throws an error', () => {
      expect(() => createPropFromItems('toto')).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropFromItems(2)).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropFromItems(true)).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropFromItems(() => 'coucou')).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropFromItems([1, 2, 3])).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropFromItems([{}, {}, 3])).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropFromItems([{}, {}, {}], 'toto')).to.not.throw();
      expect(() => createPropFromItems({}, 'tutu')).to.not.throw();
    });
  });
  context('when items is an object', () => {
    const items = {
      propA: 'toto',
      propB: false,
      propC: 23,
      method: () => 'coucou',
      subItem: {
        key1: 1,
        key2: 2,
      },
    };
    context('when no config is provided', () => {
      it('throws', () => {
        expect(() => createPropFromItems(items)).to.throw('config is mandatory');
        expect(() => createPropFromItems(items, null)).to.throw('config is mandatory');
      });
    });
    context(`when config is a boolean or a number`, () => {
      it(`returns config`, () => {
        expect(createPropFromItems(items, 2)).to.equal(2);
        expect(createPropFromItems(items, false)).to.equal(false);
      });
    });
    context(`when config is a string`, () => {
      it(`treats it as shorthand to createConfig`, () => {
        expect(createPropFromItems(items, 'toto')).to.equal(createPropFromItems(items, { createConfig: 'toto' }));
        expect(createPropFromItems(items, 'propA')).to.equal(createPropFromItems(items, { createConfig: 'propA' }));
        expect(createPropFromItems(items, 'subItem.key1')).to.equal(createPropFromItems(items, { createConfig: 'subItem.key1' }));
      });
    });
    context(`when config is an object`, () => {
      context(`when config is invalid`, () => {
        context('when config has neither staticValue nor createFn nor createConfig', () => {
          it('throws', () => {
            expect(() => createPropFromItems(items, { toto: 'titi' })).to.throw('Invalid config');
          });
        });
        context('when config has both sourcePropPath and sourcePropPaths in createConfig', () => {
          it('throws', () => {
            expect(() => createPropFromItems(items,
              { createConfig: { sourcePropPath: 'toto', sourcePropPaths: 'titi' } })).to.throw(
              'Only one of sourcePropPath or sourcePropPaths should be defined',
            );
          });
        });
      });
      context('when config is valid', () => {
        it('works with the staticValue option in propConfig  ', () => {
          expect(createPropFromItems(items, { staticValue: '32' })).to.equal('32');
        });
        describe('works with the createFn option in propConfig ', () => {
          const item1 = {
            propA: 'toto',
            propB: false,
            propC: 23,
            method: () => 'coucou',
            subItem: {
              key1: 1,
              key2: 2,
            },
          };
          it(`passes the item wrapped in an array to the createFn`, () => {
            expect(createPropFromItems(item1, { createFn: ([itm]) => itm.method() })).to.eql('coucou');
          });
          it(`passes config and context to the createFn`, () => {
            expect(createPropFromItems(item1, {
              titi: 'tutu',
              // eslint-disable-next-line no-empty-pattern
              createFn: ([], config, context) => `${config.titi}${context}`,
            },
            'toto')).to.eql('tututoto');
          });
        });
        describe('works with the createFn option in propConfig when its a string and ENV allows it', () => {
          process.env.ALLOW_EVAL = 'true';

          const item1 = {
            propA: 'toto',
            propB: false,
            propC: 23,
            method: () => 'coucou',
            subItem: {
              key1: 1,
              key2: 2,
            },
          };
          it(`passes the item wrapped in an array to the createFn`, () => {
            expect(createPropFromItems(item1, { createFn: '([itm]) => itm.method()' })).to.eql('coucou');
          });
          it(`passes config and context to the createFn`, () => {
            expect(createPropFromItems(item1, {
              titi: 'tutu',
              // eslint-disable-next-line no-template-curly-in-string
              createFn: '([itm], config, context) => `${config.titi}${context}`',
            },
            'toto')).to.eql('tututoto');
          });
        });
        describe('works with the createConfig option in propConfig  ', () => {
          const item1 = {
            propA: 'toto',
            propB: false,
            propC: '1234567',
            method: () => 'coucou',
            subItem: {
              key1: 1,
              key2: 2,
            },
          };
          it(`works with a single sourcePropPath and regexes`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPath: 'propC',
                regexAndReplacePairs: [['/^(\\d{4}).*/gm', '$1']],
              },
            })).to.eql('1234');
          });
          it(`works with a single sourcePropPath and lookupDictionary`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPath: 'subItem.key1',
                lookupDictionary: { 1: 'Bonjour' },
              },
            })).to.eql('Bonjour');
          });
          it(`works with a single sourcePropPath and lookupDictionary when not matching`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPath: 'subItem.key2',
                lookupDictionary: { 1: 'Bonjour' },
              },
            })).to.eql('2');
          });
          it(`works with a single sourcePropPath and lookupDictionary and a lookupFallback when not matching`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPath: 'subItem.key2',
                lookupDictionary: { 1: 'Bonjour' },
                lookupFallbackValue: 'no_match',
              },
            })).to.eql('no_match');
          });
          it(`works with a single sourcePropPath and lookupDictionary and a lookupFallback = 0 when not matching`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPath: 'subItem.key2',
                lookupDictionary: { 1: 'Bonjour' },
                lookupFallbackValue: '0',
              },
            })).to.eql('0');
          });
          it(`works with a single sourcePropPath and lookupDictionary and a lookupFallback = null when not matching`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPath: 'subItem.key2',
                lookupDictionary: { 1: 'Bonjour' },
                lookupFallbackValue: null,
                sourcePropFallbackValue: null,
              },
            })).to.eql(null);
          });
          it(`works with a multiple sourcePropPaths and lookupDictionary`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPaths: ['subItem.key1', 'subItem.key2'],
                lookupDictionary: { 1: 'Bonjour', 2: 'Allo' },
                separator: '|',
              },
            })).to.eql('Bonjour|Allo');
          });
          it(`works with multiple sourcePropPaths and a separator`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPaths: ['propC', 'propA'],
                separator: '-',
              },
            })).to.eql('1234567-toto');
          });
          it(`works with with destinationPropType === 'any'`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPaths: ['subItem'],
                destinationPropType: 'any',

              },
            })).to.eql({ key1: 1, key2: 2 });
          });
          it(`works with with destinationPropType === 'any' and a fallback`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPaths: ['subItem2'],
                destinationPropType: 'any',
                sourcePropFallbackValue: { coucou: 'allo' },
              },
            })).to.eql({ coucou: 'allo' });
          });
          it(`works with with destinationPropType === 'array'`, () => {
            expect(createPropFromItems(item1, {
              createConfig: {
                sourcePropPaths: ['subItem.key1', 'subItem.key2'],
                destinationPropType: 'array',
              },
            })).to.eql([1, 2]);
          });
        });
      });
    });
    context(`when config is neither a primitive nor an object`, () => {
      it('throws', () => {
        expect(() => createPropFromItems(items, () => 'hello')).to.throw('Invalid config');
      });
    });
  });
  context(`when items is an array of objects, and config has a sourceItemIndex`, () => {
    const items = [{ toto: 'titi' }, { toto: 'tutu' }];
    const config1 = { createConfig: { sourcePropPath: 'toto', sourceItemIndex: 0 } };
    const config2 = { createConfig: { sourcePropPath: 'toto', sourceItemIndex: 1 } };
    it(`uses the sourceItemIndex`, () => {
      expect(createPropFromItems(items, config1)).to.equal('titi');
      expect(createPropFromItems(items, config2)).to.equal('tutu');
    });
  });
});
