const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

let evaluateItemQuery;
let jsonQueryMatcherStub;
let evaluateMatchStub;

describe('evaluateItemQuery', () => {
  beforeEach(() => {
    evaluateMatchStub = sinon.stub();
    jsonQueryMatcherStub = { evaluateMatch: evaluateMatchStub };
    evaluateItemQuery = proxyquire('../src/evaluateItemQuery', { 'json-query-matcher': jsonQueryMatcherStub });
  });
  afterEach(() => {
    sinon.restore();
  });
  context('when no item is provided', () => {
    it('returns false', () => {
      expect(evaluateItemQuery()).to.equal(false);
      expect(evaluateItemQuery(undefined)).to.equal(false);
    });
  });
  context('when item is not an object', () => {
    it('throws an error', () => {
      expect(() => evaluateItemQuery('toto')).to.throw(`Item must be an object`);
      expect(() => evaluateItemQuery(2)).to.throw(`Item must be an object`);
      expect(() => evaluateItemQuery(true)).to.throw(`Item must be an object`);
      expect(() => evaluateItemQuery(() => 'coucou')).to.throw(`Item must be an object`);
      expect(() => evaluateItemQuery([1, 2, 3])).to.throw(`Item must be an object`);
      expect(() => evaluateItemQuery([{}, {}, 3])).to.throw(`Item must be an object`);
      expect(() => evaluateItemQuery([{}, {}, {}], {})).to.throw(`Item must be an object`);
      expect(() => evaluateItemQuery({}, {})).to.not.throw();
    });
  });
  context('when item is an object', () => {
    const item = {
      propA: 'toto',
      propB: false,
      propC: 23,
      method: () => 'coucou',
      subItem: {
        key1: 1,
        key2: 2,
      },
    };
    context('when no itemQuery is provided', () => {
      it('throws an error', () => {
        expect(() => evaluateItemQuery(item)).to.throw(`ItemQuery must be a function or an object`);
      });
    });
    context('when itemQuery is not a function or an object', () => {
      it('throws an error', () => {
        expect(() => evaluateItemQuery(item)).to.throw(`ItemQuery must be a function or an object`);
      });
    });
    context('when itemQuery is an object', () => {
      const itemQuery = {
        key1: 'toto',
        key2: 'titi',
        key3: 'tata',
      };
      const stubbedResult = 'toto';
      beforeEach(() => {
        evaluateMatchStub.returns(stubbedResult);
      });

      it('calls json-query-matcher.evaluateMatch with the item and the query and returns its result', () => {
        const result = evaluateItemQuery(item, itemQuery);
        expect(evaluateMatchStub.callCount).to.equal(1);
        expect(evaluateMatchStub.calledWith(item, itemQuery)).to.equal(true);
        expect(result).to.equal(stubbedResult);
      });
    });
    context('when itemQuery is a function', () => {
      const stubbedResult = 'coucou';
      const itemQuery = () => stubbedResult;
      let spiedItemQuery;
      beforeEach(() => {
        spiedItemQuery = sinon.spy(itemQuery);
      });

      it('calls the function with the item and returns its result', () => {
        const result = evaluateItemQuery(item, spiedItemQuery);
        expect(spiedItemQuery.callCount).to.equal(1);
        expect(spiedItemQuery.calledWith(item)).to.equal(true);
        expect(result).to.equal(stubbedResult);
      });
    });
  });
});
