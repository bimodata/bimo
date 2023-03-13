const { expect } = require('chai');
const sinon = require('sinon');

const ensureNonCircular = require('..');

describe('ensureNonCircular', () => {
  context('when value does not contain circular references', () => {
    it('returns value', () => {
      expect(ensureNonCircular('toto')).to.equal('toto');
      expect(ensureNonCircular(22)).to.equal(22);
      expect(ensureNonCircular(null)).to.equal(null);
      expect(ensureNonCircular()).to.equal(undefined);
      let value = {};
      expect(ensureNonCircular(value)).to.equal(value);
      value = { toto: 'titi' };
      expect(ensureNonCircular(value)).to.equal(value);
    });
  });
  context('when value contains circular references', () => {
    context('when circular references are less than 2 levels deep', () => {
      it('returns a new version of value where circurlar references are replaced by a path object', () => {
        const value1 = { toto: 'titi', tutu: 'tata' };
        value1.subValue = value1;
        expect(ensureNonCircular(value1)).to.eql({ toto: 'titi', tutu: 'tata', subValue: { $ref: '$' } });

        const value2 = { toto: { titi: { tata: { tutu: { tututu: 'coucou' } } } } };
        value2.toto.titi.tata.tutu.subValue = value2;
        expect(ensureNonCircular(value2)).to.eql({ toto: { titi: { tata: { tutu: { tututu: 'coucou', subValue: { $ref: '$' } } } } } });

        const value3 = { toto: { titi: { tata: 'coucou' } } };
        value3.truc = [value3, 25];
        expect(ensureNonCircular(value3)).to.eql({ toto: { titi: { tata: 'coucou' } }, truc: [{ $ref: '$' }, 25] });
      });
    });
    context('when an unhandled error happens', () => {
      beforeEach(() => {
        sinon.stub(JSON, 'stringify').throws(`Weird error`, `Weird error`);
      });

      it('throws the error', () => {
        expect(() => ensureNonCircular('toto')).to.throw('Weird error');
      });

      afterEach(() => {
        sinon.restore();
      });
    });
  });
});
