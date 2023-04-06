const { expect } = require('chai');
const sinon = require('sinon');

const { asyncForEach } = require('..');

describe('asyncForEach', () => {
  context('when arrayOrCollectionOrMap is an array', () => {
    const arrayOrCollectionOrMap = [1, 2, 3];
    const callback = sinon.spy();
    it('calls callback with (value, index, array) on each element in the array', async () => {
      await asyncForEach(arrayOrCollectionOrMap, callback);
      expect(callback.callCount).to.equal(3);
      expect(callback.getCalls()[0].args).to.eql([1, 0, arrayOrCollectionOrMap]);
      expect(callback.getCalls()[1].args).to.eql([2, 1, arrayOrCollectionOrMap]);
      expect(callback.getCalls()[2].args).to.eql([3, 2, arrayOrCollectionOrMap]);
    });
  });
  context('when arrayOrCollectionOrMap is an object', () => {
    const arrayOrCollectionOrMap = {
      prop1: 1,
      prop2: 2,
      prop3: 3,
    };
    const callback = sinon.spy();
    it('calls callback with (value, key, object) on each element in the array', async () => {
      await asyncForEach(arrayOrCollectionOrMap, callback);
      expect(callback.callCount).to.equal(3);
      expect(callback.getCalls()[0].args).to.eql([1, 'prop1', arrayOrCollectionOrMap]);
      expect(callback.getCalls()[1].args).to.eql([2, 'prop2', arrayOrCollectionOrMap]);
      expect(callback.getCalls()[2].args).to.eql([3, 'prop3', arrayOrCollectionOrMap]);
    });
  });
  context('when arrayOrCollectionOrMap is a map', () => {
    const arrayOrCollectionOrMap = new Map([
      ['key1', 1],
      ['key2', 2],
      ['key3', 3],
    ]);
    const callback = sinon.spy();
    it('calls callback with (value, key, object) on each element in the array', async () => {
      await asyncForEach(arrayOrCollectionOrMap, callback);
      expect(callback.callCount).to.equal(3);
      expect(callback.getCalls()[0].args).to.eql([1, 'key1', arrayOrCollectionOrMap]);
      expect(callback.getCalls()[1].args).to.eql([2, 'key2', arrayOrCollectionOrMap]);
      expect(callback.getCalls()[2].args).to.eql([3, 'key3', arrayOrCollectionOrMap]);
    });
  });
  context('when arrayOrCollectionOrMap is falsy', () => {
    const arrayOrCollectionOrMap = null;
    const callback = sinon.spy();
    it('never calls callback and it returns null', async () => {
      const result = await asyncForEach(arrayOrCollectionOrMap, callback);
      expect(callback.callCount).to.equal(0);
      expect(result).to.equal(null);
    });
  });
});
