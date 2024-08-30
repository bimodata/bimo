const { expect } = require('chai');

const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

const createTrainScheduleFromItem = require('..');
const { item1 } = require('./testItemFactories');
const { expected1 } = require('./expectedResults');

const serviceContext = { logger };

describe('createTrainScheduleFromItem', () => {
  context(`with a basic config `, () => {
    const config = {
      createBaseTrainSchedulePropsConfig: {
        train_name: 'num',
        start_time: 'heure',
      },
      createPathAndScheduleConfig: {
        pathToArrayOfPoints: 'points',
        createPathPointFromPointConfig: {
          id: '__index__',
          uic: 'lieu',
        },
        createSchedulePointFromPointConfig: {
          at: '__index__',
          arrival: 'heure',
        },
      },
    };
    it(`returns the right result`, () => {
      const result = createTrainScheduleFromItem(item1(), config, serviceContext);
      expect(result).to.eql(expected1);
    });
  });
  context(`with a bad config`, () => {
    const config = { coucou: 'bonjour' };
    it(`throws a meaningful error`, () => {
      expect(() => createTrainScheduleFromItem(item1(), config, serviceContext))
        .to.throw('Bad config: createPathAndScheduleConfig is mandatory');
    });
  });
  context(`if pathToArrayOfPoints does not lead to an array`, () => {
    it(`throws`, () => {
      expect(() => createTrainScheduleFromItem(item1(), {
        createBaseTrainSchedulePropsConfig: {},
        createPathAndScheduleConfig: { pathToArrayOfPoints: 'num' },
      }, serviceContext))
        .to.throw('pathToArrayOfPoints (num) does not lead to an array. Got 1');

      expect(() => createTrainScheduleFromItem(item1(), {
        createBaseTrainSchedulePropsConfig: {},
        createPathAndScheduleConfig: { pathToArrayOfPoints: 'doubidou' },
      }, serviceContext))
        .to.throw('pathToArrayOfPoints (doubidou) does not lead to an array. Got undefined');
    });
  });
});
