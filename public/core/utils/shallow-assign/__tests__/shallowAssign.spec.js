import { expect } from 'chai';

import { shallowAssign } from '..';

describe('shallowAssign', () => {
  context('when source or target are not objects', () => {
    it('throws an error', () => {
      expect(() => shallowAssign('toto', {})).to.throw(
        `Target must be an object`,
      );
      expect(() => shallowAssign('toto', 'toto')).to.throw(
        `Target must be an object`,
      );
      expect(() => shallowAssign({}, 'toto')).to.throw(
        `Source must be an object`,
      );
    });
  });
  context('when source and target are objects', () => {
    describe('it returns the same target object', () => {
      it('works', () => {
        const target = {};
        const result = shallowAssign(target, { toto: 'titi' });
        expect(result).to.equal(target);
        expect(target.toto).to.equal('titi');
      });
    });
    describe('it copies booleans, strings, numbers and null only', () => {
      it('copies numbers from source to target', () => {
        expect(shallowAssign({}, { key: 2 })).to.eql({ key: 2 });
      });
      it('copies strings from source to target', () => {
        expect(shallowAssign({}, { key: 'toto' })).to.eql({ key: 'toto' });
      });
      it('copies booleans from source to target', () => {
        expect(shallowAssign({}, { key: false })).to.eql({ key: false });
        expect(shallowAssign({}, { key: true })).to.eql({ key: true });
      });
      it('copies null from source to target', () => {
        expect(shallowAssign({}, { key: null })).to.eql({ key: null });
      });
      it('does not copy functions from source to target', () => {
        expect(shallowAssign({}, { key: () => 'toto' })).to.eql({});
      });
      it('does not copy objects from source to target', () => {
        expect(shallowAssign({}, { key: {} })).to.eql({});
      });
      it('does not copy undefined from source to target', () => {
        expect(shallowAssign({}, { key: undefined })).to.eql({});
      });
    });
    describe('it overwrites target values with source values', () => {
      it('overwrites target values with sources values if source value is one of the copied types', () => {
        expect(shallowAssign({ key: 'toto' }, { key: 2 })).to.eql({ key: 2 });
        expect(shallowAssign({ key: () => 'coucou' }, { key: 2 })).to.eql({ key: 2 });
      });
      it('does not overwrite target values with sources values if source value is not one of the copied types', () => {
        expect(shallowAssign({ key: 'toto' }, { key: undefined })).to.eql({ key: 'toto' });
        expect(shallowAssign({ key: 'toto' }, { key: {} })).to.eql({ key: 'toto' });
      });
      it('leaves target values that do not exist in source untouched', () => {
        expect(
          shallowAssign(
            { key1: 'toto', key2: 'titi' },
            { key: 'taco', key1: 'tutu' },
          ),
        ).to.eql({ key: 'taco', key1: 'tutu', key2: 'titi' });
      });
    });
  });
});
