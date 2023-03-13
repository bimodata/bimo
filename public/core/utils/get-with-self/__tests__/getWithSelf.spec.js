const { expect } = require('chai');
const getWithSelf = require('..');

describe('getWithSelf', () => {
  const object1 = { a: { b: { c1: [1, 2, 3], c2: 'allo', c3__self__: 'allo' } } };
  const object2 = 'coucou';
  const object3 = [object1, object2];
  context(`with string paths`, () => {
    it(`works when self is at the end`, () => {
      expect(getWithSelf(object1, 'a.b.c1.__self__')).to.eql([1, 2, 3]);
      expect(getWithSelf(object3, '1.__self__')).to.eql(object2);
    });
    it(`works when self is alone`, () => {
      expect(getWithSelf(object1, '__self__')).to.eql(object1);
      expect(getWithSelf(object2, '__self__')).to.eql(object2);
      expect(getWithSelf(object3, '__self__')).to.eql(object3);
    });
    it(`ignores self in the middle`, () => {
      expect(getWithSelf(object1, 'a.__self__.b')).to.eql(undefined);
    });
    it(`ignores self in prop name`, () => {
      expect(getWithSelf(object1, 'a.b.c3__self__')).to.eql('allo');
    });
  });
  context(`with array paths`, () => {
    it(`works when self is at the end`, () => {
      expect(getWithSelf(object1, ['a', 'b', 'c1', '__self__'])).to.eql([1, 2, 3]);
      expect(getWithSelf(object3, ['1', '__self__'])).to.eql(object2);
    });
    it(`works when self is alone`, () => {
      expect(getWithSelf(object1, ['__self__'])).to.eql(object1);
      expect(getWithSelf(object2, ['__self__'])).to.eql(object2);
      expect(getWithSelf(object3, ['__self__'])).to.eql(object3);
    });
    it(`ignores self in the middle`, () => {
      expect(getWithSelf(object1, ['a', '__self__', 'b'])).to.eql(undefined);
    });
    it(`ignores self in prop name`, () => {
      expect(getWithSelf(object1, ['a', 'b', 'c3__self__'])).to.eql('allo');
    });
  });
});
