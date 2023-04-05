const { expect } = require('chai');

const { getStupidLogger } = require('..');

function itReturnsAnObjectWithAllExpectedMethods(options) {
  const expectedFunctionProps = [
    'OFF', 'debug', 'error', 'info', 'logNotice', 'logOrThrow',
    'progress', 'silly', 'throw', 'trace', 'warn', 'warning',
  ];
  it(`returns a properly formed logger object`, () => {
    const logger = getStupidLogger(options);
    expectedFunctionProps.forEach((functionPropName) => {
      expect(logger[functionPropName]).to.be.a('function');
    });
  });
}

function itUnwrapsTheNoticeAndCallsLogOrThrowWithIt(options) {
  it(`unwraps the notice and calls log or throw with it`, () => {
    const logger = getStupidLogger(options);
    logger.logNotice({ level: 'info', message: 'coucou' });
    // todo: actually test something ...
  });
}

describe('getStupidLogger', () => {
  context(`with silentMode = false`, () => {
    itReturnsAnObjectWithAllExpectedMethods(false);
  });
  context(`with silentMode = true`, () => {
    itReturnsAnObjectWithAllExpectedMethods(true);
  });
  describe('getStupidLogger().logNotice', () => {
    context(`with silentMode = false`, () => {
      itUnwrapsTheNoticeAndCallsLogOrThrowWithIt(false);
    });
    context(`with silentMode = true`, () => {
      itUnwrapsTheNoticeAndCallsLogOrThrowWithIt(true);
    });
  });
});
