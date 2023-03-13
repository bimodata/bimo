const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

let createPropsFromItems;
let createPropFromItemsStub;

describe('createPropsFromItems', () => {
  beforeEach(() => {
    createPropFromItemsStub = sinon.stub();
    createPropsFromItems = proxyquire('../src/createPropsFromItems', { './createPropFromItems': createPropFromItemsStub });
  });
  afterEach(() => {
    sinon.restore();
  });
  context('when no items is provided', () => {
    it('returns null', () => {
      expect(createPropsFromItems()).to.equal(null);
      expect(createPropsFromItems(undefined, [[]])).to.equal(null);
    });
  });
  context('when items is not an object or an array of objects', () => {
    it('throws an error', () => {
      expect(() => createPropsFromItems('toto')).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropsFromItems(2)).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropsFromItems(true)).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropsFromItems(() => 'coucou')).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropsFromItems([1, 2, 3])).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropsFromItems([{}, {}, 3])).to.throw(`Items must be an object or an array of objects`);
      expect(() => createPropsFromItems([{}, {}, {}], {})).to.not.throw();
      expect(() => createPropsFromItems({}, {})).to.not.throw();
    });
  });
  context('when items is an object or an array of objects', () => {
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
      it('returns a shallow copy of the item when items is an object or an array of lenght 1 object', () => {
        expect(createPropsFromItems(items)).to.eql({
          propA: 'toto',
          propB: false,
          propC: 23,
        });
        expect(createPropsFromItems([items])).to.eql({
          propA: 'toto',
          propB: false,
          propC: 23,
        });
      });
      it('throws an error when it is an array', () => {
        expect(() => createPropsFromItems([items, items])).to.throw(
          `Items must be an object or an array of length 1 when no config is provided.`,
        );
      });
    });
    context('when propConfigTuples is not an array or an object', () => {
      it('throws an error', () => {
        expect(() => createPropsFromItems(items, 'toto')).to.throw(`config must be an array or an object`);
      });
    });
    context('when config is an object or an array and everything works fine', () => {
      beforeEach(() => {
        createPropFromItemsStub.returnsArg(1);
      });
      context(`when config in an object`, () => {
        const config = {
          key1: 'toto',
          key2: 'titi',
          key3: 'tata',
        };
        it('calls createPropFromItems once for each key/value pair in the config object', () => {
          createPropsFromItems(items, config, { logger });
          expect(createPropFromItemsStub.callCount).to.equal(3);
        });
        it('returns an object made of the keys of the config object, and the result of calling createPropFromItems in the values of the config object', () => {
          expect(createPropsFromItems(items, config, { logger })).to.eql(config);
        });
      });
      context('when config is an array', () => {
        const config = [
          ['key1', 'toto'],
          ['key2', 'titi'],
        ];
        it('calls createPropFromItems once for each value in the config array', () => {
          createPropsFromItems(items, config, { logger });
          expect(createPropFromItemsStub.callCount).to.equal(2);
        });
        it('returns an object made according to the propConfigTuples of the array', () => {
          expect(createPropsFromItems(items, config, { logger })).to.eql({ key1: 'toto', key2: 'titi' });
        });
      });
    });
    context(`when config is an object or an array but createPropFromItems fails on some prop`, () => {
      beforeEach(() => {
        createPropFromItemsStub.returnsArg(1);
        createPropFromItemsStub.onSecondCall().throws(new Error(`Bad config`));
      });
      context(`when no noticeLevelForError is provided`, () => {
        const config = {
          key1: 'toto',
          key2: 'titi',
          key3: 'tata',
        };

        it(`ignores the faulty prop`, () => {
          expect(createPropsFromItems(items, config, { logger })).to.eql({ key1: 'toto', key3: 'tata' });
        });
        it(`logs an error`, () => {
          sinon.spy(logger);
          createPropsFromItems(items, config, { logger });
          expect(logger.error.calledOnce).to.eql(true);
        });
      });
      context(`when noticeLevelForError is provided on the faulty prop`, () => {
        const config = {
          key1: 'toto',
          key2: { staticValue: 'titi', noticeLevelForError: 'warn' },
          key3: 'tata',
        };

        it(`ignores the faulty prop`, () => {
          expect(createPropsFromItems(items, config, { logger })).to.eql({ key1: 'toto', key3: 'tata' });
        });
        it(`logs with the appropriate level`, () => {
          sinon.spy(logger);
          createPropsFromItems(items, config, { logger });
          expect(logger.warn.calledOnce).to.eql(true);
        });
      });
      context(`when noticeLevelForError equals 'throw' on the faulty prop`, () => {
        const config = {
          key1: 'toto',
          key2: { staticValue: 'titi', noticeLevelForError: 'throw' },
          key3: 'tata',
        };

        it(`throws`, () => {
          expect(() => createPropsFromItems(items, config, { logger })).to.throw('Bad config');
        });
      });
      context(`when noticeLevelForError is invalid`, () => {
        const config = {
          key1: 'toto',
          key2: { staticValue: 'titi', noticeLevelForError: 'inexistantLogLevel' },
          key3: 'tata',
        };

        it(`throws`, () => {
          expect(() => createPropsFromItems(items, config, { logger })).to.throw(
            '"inexistantLogLevel" is not a known level on logger',
          );
        });
      });
      context(`when noticeLevelForError is falsey`, () => {
        const config = {
          key1: 'toto',
          key2: { staticValue: 'titi', noticeLevelForError: false },
          key3: 'tata',
        };

        it(`ignores the faulty prop`, () => {
          expect(createPropsFromItems(items, config, { logger })).to.eql({ key1: 'toto', key3: 'tata' });
        });
        it(`logs nothing else than traces or silly`, () => {
          sinon.spy(logger);
          createPropsFromItems(items, config, { logger });
          Object.keys(logger).forEach((loggerMethodKey) => {
            if (typeof logger[loggerMethodKey] === 'function' && !['trace', 'silly'].includes(loggerMethodKey)) {
              expect(logger[loggerMethodKey].notCalled).to.equal(true);
            }
          });
        });
      });
    });
  });
});
