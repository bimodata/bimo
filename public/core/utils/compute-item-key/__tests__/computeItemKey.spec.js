const { expect } = require('chai');
const sinon = require('sinon');
const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const computeItemKey = require('..');

const serviceContext = { logger };

describe('computeItemKey', () => {
  describe('when config contains only path', () => {
    const item = {
      a: 1,
      b: 2,
      c: { d: 4, e: 5 },
    };
    it('returns the value at path, stringified', () => {
      expect(computeItemKey(item, { path: 'b' }, serviceContext)).to.equal('2');
      expect(computeItemKey(item, { path: 'c.d' }, serviceContext)).to.equal('4');
      expect(computeItemKey(item, { path: 'c' }, serviceContext)).to.eql('{"d":4,"e":5}');
    });
  });
  describe('when config is a string', () => {
    const item = {
      a: 1,
      b: 2,
      c: { d: 4, e: 5 },
    };
    it('is interpreted as path', () => {
      expect(computeItemKey(item, 'b', serviceContext)).to.equal('2');
      expect(computeItemKey(item, 'c.d', serviceContext)).to.equal('4');
      expect(computeItemKey(item, 'c', serviceContext)).to.eql('{"d":4,"e":5}');
    });
  });
  describe('when config contains paths and an optional separator', () => {
    const item = {
      a: 1,
      b: 2,
      c: { d: 4, e: 5 },
    };
    it('is concatenates the paths, in order, with separator between (default sep = |', () => {
      expect(computeItemKey(item, { paths: ['a', 'b'] }, serviceContext)).to.equal('1|2');
      expect(computeItemKey(item, { paths: ['a', 'b'], separator: '' }, serviceContext)).to.equal('12');
      expect(computeItemKey(item, { paths: ['a', 'b', 'c'], separator: '/' }, serviceContext)).to.equal('1/2/{"d":4,"e":5}');
      expect(computeItemKey(item, { paths: ['a', 'b', 'c', 'c.d'], separator: '/' }, serviceContext)).to.equal('1/2/{"d":4,"e":5}/4');
    });
  });
  describe('when key computation throws an error', () => {
    const item = {
      shortLoggingOutput: 'item1',
      a: 1,
      b: 2,
      c: { d: 4, e: 5 },
    };
    const computeFn = () => {
      throw new Error('erreur pour le test');
    };
    describe(`with default config`, () => {
      const config = { computeFn };
      it(`throws the error, wrapped in info about the item`, () => {
        expect(
          () => {
            computeItemKey(item, config, serviceContext);
          },
        ).to.throw('Erreur au moment de calculer la key de item1: erreur pour le test');
      });
    });
    describe(`with a noticeLevelForKeyComputationError and returnValueForKeyComputationError`, () => {
      const config = {
        computeFn,
        noticeLevelForKeyComputationError: 'info',
        returnValueForKeyComputationError: 'coucou',
      };
      it(`logs the error, wrapped in info about the item, and returns the value specified in the config`, () => {
        sinon.spy(logger);
        expect(computeItemKey(item, config, serviceContext)).to.equal('coucou');
        expect(logger.info.getCall(0).args[0]).to.contain('Erreur au moment de calculer la key de item1: erreur pour le test');
      });
    });
  });
});
