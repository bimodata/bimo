const { expect } = require('chai');

const prepareData = require('./data/prepareData');

describe('Bimo :: Entities :: BlockActivity', () => {
  describe(`activityEntityItem`, () => {
    it('works', () => {
      const vsc1 = prepareData().blockingVsc;
      vsc1.blocks.forEach((block) => {
        block.blockActivities.forEach((blkAct) => {
          expect(blkAct.activityEntityItem.constructor.name).to.be.oneOf(['Trip', 'ConsistChange']);
        });
      });
    });
  });
});
