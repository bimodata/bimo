const { expect } = require('chai');

const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const evaluateOptions = require('..');

describe('evaluateOptions', () => {
  context(`given an options object that includes (or not) jqm queries, and an item`, () => {
    const options = {
      optionKey1: true,
      optionKey2: false,
      optionKey3: 50,
      optionKey4: 'toto',
      optionKey5: {
        subOptionKey1: true,
        subOptionKey2: false,
        subOptionKey3: {
          $query: {
            $or: [
              {
                'variant.varProductive': '1',
                'trip.trpType': '0',
              },
              {
                'variant.varProductive': '0',
                'trip.trpType': { $ne: '0' },
              },
            ],
          },
        },
      },
    };
    const item1 = {
      trip: { trpType: '0' },
      variant: { varProductive: '1' },
    };
    const item2 = {
      trip: { trpType: '0' },
      variant: { varProductive: '0' },
    };
    it(`returns an object where the queries have been replaced by their results`, () => {
      const expectedResult1 = {
        optionKey1: true,
        optionKey2: false,
        optionKey3: 50,
        optionKey4: 'toto',
        optionKey5: {
          subOptionKey1: true,
          subOptionKey2: false,
          subOptionKey3: true,
        },
      };
      const expectedResult2 = {
        optionKey1: true,
        optionKey2: false,
        optionKey3: 50,
        optionKey4: 'toto',
        optionKey5: {
          subOptionKey1: true,
          subOptionKey2: false,
          subOptionKey3: false,
        },
      };
      expect(evaluateOptions(item1, options, logger)).to.eql(expectedResult1);
      expect(evaluateOptions(item2, options, logger)).to.eql(expectedResult2);
    });
  });
  context(`given an invalid options object and an item`, () => {
    const options = {
      optionKey1: true,
      optionKey2: {
        subOptionKey1: true,
        $query: {
          $or: [
            {
              'variant.varProductive': '1',
              'trip.trpType': '0',
            },
            {
              'variant.varProductive': '0',
              'trip.trpType': { $ne: '0' },
            },
          ],
        },
      },
    };
    const item1 = {
      trip: { trpType: '0' },
      variant: { varProductive: '1' },
    };
    it(`throws an error`, () => {
      expect(() => evaluateOptions(item1, options, logger)).to.throw();
    });
  });
  context(`given a valid options object that does not include a query and no item`, () => {
    const options = {
      optionKey1: true,
      optionKey2: { subOptionKey1: true },
    };
    it(`works`, () => {
      expect(evaluateOptions(undefined, options, logger)).to.eql(options);
    });
  });
  context(`given a valid options object that includes a query and no item`, () => {
    const options = {
      optionKey1: true,
      optionKey2: {
        subOptionKey1: true,
        subOptionKey2: {
          $query: {
            $or: [
              {
                'variant.varProductive': '1',
                'trip.trpType': '0',
              },
              {
                'variant.varProductive': '0',
                'trip.trpType': { $ne: '0' },
              },
            ],
          },
        },
      },
    };
    it(`returns false for the query`, () => {
      const expectedResult1 = {
        optionKey1: true,
        optionKey2: {
          subOptionKey1: true,
          subOptionKey2: false,
        },
      };
      expect(evaluateOptions(undefined, options, logger)).to.eql(expectedResult1);
    });
  });
});
