const { assert, expect } = require('chai');

const generateObjectsFromDimensions = require('..');

describe('generateObjectsFromDimensions', () => {
  context(`with valid args `, () => {
    const config = {
      dimensions: [
        {
          key: 'prefix',
          values: ['LAJ', 'T4'],
        },
        {
          key: 'year',
          values: ['2020', '2021'],
        },
        {
          key: 'bookingType',
          values: ['E', 'P', 'R'],
        },
      ],
    };

    it('works', () => {
      expect(generateObjectsFromDimensions(config)).to.eql([
        { prefix: 'LAJ', year: '2020', bookingType: 'E' },
        { prefix: 'LAJ', year: '2020', bookingType: 'P' },
        { prefix: 'LAJ', year: '2020', bookingType: 'R' },
        { prefix: 'LAJ', year: '2021', bookingType: 'E' },
        { prefix: 'LAJ', year: '2021', bookingType: 'P' },
        { prefix: 'LAJ', year: '2021', bookingType: 'R' },
        { prefix: 'T4', year: '2020', bookingType: 'E' },
        { prefix: 'T4', year: '2020', bookingType: 'P' },
        { prefix: 'T4', year: '2020', bookingType: 'R' },
        { prefix: 'T4', year: '2021', bookingType: 'E' },
        { prefix: 'T4', year: '2021', bookingType: 'P' },
        { prefix: 'T4', year: '2021', bookingType: 'R' },
      ]);
    });
  });
  context(`with invalid args `, () => {

  });
});
