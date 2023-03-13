/* eslint-disable max-classes-per-file */
const { expect } = require('chai');

const getAllConstructorsOfClass = require('..');

class A { }
class B extends A { }
class C extends B { }

describe('getAllConstructorsOfClass', () => {
  context(`with valid args`, () => {
    context(`given a class constructor`, () => {
      it(`returns its parent constructors`, () => {
        const constructors = getAllConstructorsOfClass(C);
        expect(constructors).to.eql([C, B, A, Object]);
      });
    });
    context(`given a simple anonymous arrow function`, () => {
      it(`returns an empty array`, () => {
        const constructors = getAllConstructorsOfClass(() => 'toto');
        expect(constructors).to.eql([]);
      });
    });
    context(`given a named function`, () => {
      const myFunc = function myFunc() {
        return 'toto';
      };
      it(`returns its parent constructors`, () => {
        const constructors = getAllConstructorsOfClass(myFunc);
        expect(constructors).to.eql([myFunc, Object]);
      });
    });
  });
  context(`with invalid args`, () => {
    it(`throws`, () => {
      expect(() => getAllConstructorsOfClass(new C())).to.throw(`classToGet must be a (class) function`);
      expect(() => getAllConstructorsOfClass({})).to.throw(`classToGet must be a (class) function`);
    });
  });
});
