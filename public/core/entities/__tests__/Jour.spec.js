const { expect } = require('chai');

const { Jour } = require('..');

describe('Domain :: Jour', () => {
  describe('#constructor', () => {
    it('works when given a string that kind of looks like a day in french or english', () => {
      let myJour = new Jour('Lundi');
      expect(myJour).to.be.instanceOf(Jour);

      myJour = new Jour('lUndi');
      expect(myJour).to.be.instanceOf(Jour);

      myJour = new Jour('sa');
      expect(myJour).to.be.instanceOf(Jour);

      myJour = new Jour('Di');
      expect(myJour).to.be.instanceOf(Jour);

      myJour = new Jour('Sunday');
      expect(myJour).to.be.instanceOf(Jour);
    });

    it('works when given a number between 1 and 7, as number or string, and uses 1 = monday, 7 = sunday', () => {
      let myJour = new Jour(1);
      expect(myJour).to.be.instanceOf(Jour);
      expect(myJour.FR1).to.equal('lundi');

      myJour = new Jour(7);
      expect(myJour).to.be.instanceOf(Jour);
      expect(myJour.FR1).to.equal('dimanche');

      myJour = new Jour('3');
      expect(myJour).to.be.instanceOf(Jour);
      expect(myJour.FR2).to.equal('me');
    });
    it('throws an error when it does not recognize the argument', () => {
      expect(() => new Jour('a;sldf')).to.throw();
      expect(() => new Jour(234)).to.throw();
      expect(() => new Jour({})).to.throw();
      expect(() => new Jour()).to.throw();
    });

    it('returns the same object when called multiple times for the same jour', () => {
      const myJour1 = new Jour(1);
      const myJour2 = new Jour('lundi');
      expect(myJour1).to.equal(myJour2);
    });
  });
  describe('#getNextJour', () => {
    it('returns a Jour for the day of the week that comes after the current day', () => {
      expect(new Jour('lundi').getNextJour()).to.equal(new Jour('mardi'));
      expect(new Jour('dimanche').getNextJour()).to.equal(new Jour('lundi'));
      expect(new Jour('mercredi').getNextJour().FR1).to.equal('jeudi');
    });
  });
  describe('#getPreviousJour', () => {
    it('returns a Jour for the day of the week that comes before the current day', () => {
      expect(new Jour('lundi').getPreviousJour()).to.equal(new Jour('dimanche'));
      expect(new Jour('dimanche').getPreviousJour()).to.equal(new Jour('samedi'));
      expect(new Jour('mercredi').getPreviousJour().FR1).to.equal('mardi');
    });
  });
  describe('#getJourAtDelta', () => {
    it('returns a Jour that equals the current day + delta', () => {
      expect(new Jour('lundi').getJourAtDelta(0)).to.equal(new Jour('lundi'));
      expect(new Jour('lundi').getJourAtDelta(7)).to.equal(new Jour('lundi'));
      expect(new Jour('lundi').getJourAtDelta(-7)).to.equal(new Jour('lundi'));
      expect(new Jour('dimanche').getJourAtDelta(2)).to.equal(new Jour('mardi'));
      expect(new Jour('dimanche').getJourAtDelta(-2)).to.equal(new Jour('vendredi'));
      expect(new Jour('jeudi').getJourAtDelta(8)).to.equal(new Jour('vendredi'));
      expect(new Jour('jeudi').getJourAtDelta(-9)).to.equal(new Jour('mardi'));
      expect(new Jour('mardi').getJourAtDelta(3).FR1).to.equal('vendredi');
    });
  });
  describe('#serializeModel and parseModel', () => {
    const serializedModel = new Jour('lundi').serializeModel();
    const stringifiedSerializedModel = JSON.stringify(serializedModel);
    it('serialize model gives an object that can be stringified', () => {
      expect(stringifiedSerializedModel).to.be.a('string');
    });
    it('parseModel returns a Jour from a serialized version', async () => {
      expect(await Jour.parseModel(serializedModel)).to.be.instanceOf(Jour);
      expect(await Jour.parseModel(JSON.parse(stringifiedSerializedModel))).to.be.instanceOf(Jour);
    });
  });
});
