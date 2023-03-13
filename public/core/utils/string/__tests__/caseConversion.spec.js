const { expect } = require('chai');

const { camelOrPascalToSnake, camelToPascal, snakeToCamel, snakeToPascal } = require('..');

describe('string utils', () => {
  describe(`# camelOrPascalToSnake`, () => {
    context(`when given a camelCased string`, () => {
      it(`returns a snake cased string`, () => {
        expect(camelOrPascalToSnake(`vscOwner`)).to.equal(`vsc_owner`);
        expect(camelOrPascalToSnake(`someLongCamelCasedString`)).to.equal(`some_long_camel_cased_string`);
      });
    });
    context(`when given a PascalCased string`, () => {
      it(`returns a snake cased string`, () => {
        expect(camelOrPascalToSnake(`VscOwner`)).to.equal(`vsc_owner`);
        expect(camelOrPascalToSnake(`SomeLongCamelCasedString`)).to.equal(`some_long_camel_cased_string`);
      });
    });
  });
  describe(`# camelToPascal`, () => {
    context(`when given a camelCased string`, () => {
      it(`returns a pascal cased string`, () => {
        expect(camelToPascal(`vscOwner`)).to.equal(`VscOwner`);
        expect(camelToPascal(`someLongCamelCasedString`)).to.equal(`SomeLongCamelCasedString`);
      });
    });
  });
  describe(`# snakeToCamel`, () => {
    context(`when given a snake_cased string`, () => {
      it(`returns a snake cased string`, () => {
        expect(snakeToCamel(`vsc_owner`)).to.equal(`vscOwner`);
        expect(snakeToCamel(`some_long_camel_cased_string`)).to.equal(`someLongCamelCasedString`);
      });
    });
  });
  describe(`# snakeToPascal`, () => {
    context(`when given a snake_cased string`, () => {
      it(`returns a snake cased string`, () => {
        expect(snakeToPascal(`vsc_owner`)).to.equal(`VscOwner`);
        expect(snakeToPascal(`some_long_camel_cased_string`)).to.equal(`SomeLongCamelCasedString`);
      });
    });
  });
});
