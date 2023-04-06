const sinon = require('sinon');
const { assert, expect } = require('chai');
const proxyquire = require('proxyquire');

const { Collection, Item } = require('@bimo/core-utils-collection');

const logger = require('@bimo/core-utils-logging').getStupidLogger(true);

function prepareData1() {
  const expectedResult = 'yay';
  const target = { toto: 'titi' };
  const candidates = new Collection({ items: [{ allo: 'bonjour' }, { salut: 'coucou' }], ItemConstructor: Item });
  const items = candidates.items;
  return { expectedResult, targetAndCandidates: { target, candidates }, target, candidates, items };
}

let findBestMatchForTargetAmongCandidates;
let compareAndMatchStub;
let retrieveModuleStub;

describe('findBestMatchForTargetAmongCandidates', () => {
  beforeEach(() => {
    compareAndMatchStub = { getBestMatchToTargetFromCandidatesList: sinon.stub() };
    retrieveModuleStub = { retrieveCandidatesArrayToUse: sinon.stub() };
    findBestMatchForTargetAmongCandidates = proxyquire('../src/findBestMatchForTargetAmongCandidates', {
      '@bimo/core-utils-compare-and-match': compareAndMatchStub,
      './retrieveCandidatesArrayToUse': retrieveModuleStub,
    });
  });
  afterEach(() => {
    sinon.restore();
  });
  context(`with valid args `, () => {
    context('with an empty config', () => {
      it('calls getBestMatchToTargetFromCandidatesList and retrieveCandidatesArrayToUse once, using the right args', () => {
        const { expectedResult, targetAndCandidates, target } = prepareData1();

        const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
        const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
        const arrayToUse = ['my array'];
        retrieveArrayService.withArgs(targetAndCandidates).returns(arrayToUse);
        getBestMatchService.withArgs(target, arrayToUse).returns(expectedResult);

        const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, {}, { logger });
        assert(retrieveArrayService.calledOnceWith(targetAndCandidates));
        assert(getBestMatchService.calledOnceWith(target, arrayToUse));
        expect(result).to.equal(expectedResult);
      });
    });
    context('with multiple iterations, but no candidatesFilteringConfig', () => {
      const config = {
        iterationConfigs: [
          { iterationName: 'A', getBestMatchConfig: 'it1' }, { getBestMatchConfig: 'it2' }, { getBestMatchConfig: 'it3' },
        ],
      };
      const { expectedResult, targetAndCandidates, target } = prepareData1();

      context('when the target matches a candidate in the first iteration', () => {
        it('calls getBestMatchToTargetFromCandidatesList and retrieveCandidatesArrayToUse once, using the right args', () => {
          const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
          const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
          const arrayToUse = ['my array'];
          retrieveArrayService.withArgs(targetAndCandidates).returns(arrayToUse);
          getBestMatchService.withArgs(target, arrayToUse, 'it1').returns(expectedResult);

          const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, config, { logger });
          assert(retrieveArrayService.calledOnceWith(targetAndCandidates));
          assert(getBestMatchService.calledOnceWith(target, arrayToUse, 'it1'));
          expect(result).to.equal(expectedResult);
        });
      });
      context('when the target does not match in the first but matches in the second', () => {
        it('calls getBestMatchToTargetFromCandidatesList and retrieveCandidatesArrayToUse twice, using the right args', () => {
          const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
          const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
          const arrayToUse = ['my array'];
          retrieveArrayService.withArgs(targetAndCandidates).returns(arrayToUse);
          getBestMatchService.returns(null);
          getBestMatchService.withArgs(target, arrayToUse, 'it2').returns(expectedResult);

          const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, config, { logger });
          assert(retrieveArrayService.calledWith(targetAndCandidates));
          assert(retrieveArrayService.calledTwice);
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it2'));
          assert(getBestMatchService.calledTwice);
          expect(result).to.equal(expectedResult);
        });
      });
      context('when the target does not match in the first two but matches in the third', () => {
        it('calls getBestMatchToTargetFromCandidatesList and retrieveCandidatesArrayToUse thrice , using the right args', () => {
          const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
          const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
          const arrayToUse = ['my array'];
          retrieveArrayService.withArgs(targetAndCandidates).returns(arrayToUse);
          getBestMatchService.returns(null);
          getBestMatchService.withArgs(target, arrayToUse, 'it3').returns(expectedResult);

          const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, config, { logger });
          assert(retrieveArrayService.calledThrice);
          assert(retrieveArrayService.calledWith(targetAndCandidates));
          assert(getBestMatchService.calledThrice);
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it1'));
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it2'));
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it3'));
          expect(result).to.equal(expectedResult);
        });
      });
      context('when the target does not match in any iteration', () => {
        it('calls getBestMatchToTargetFromCandidatesList and retrieveCandidatesArrayToUse thrice , using the right args', () => {
          const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
          const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
          const arrayToUse = ['my array'];
          retrieveArrayService.withArgs(targetAndCandidates).returns(arrayToUse);
          getBestMatchService.returns(null);

          const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, config, { logger });
          assert(retrieveArrayService.calledThrice);
          assert(retrieveArrayService.calledWith(targetAndCandidates));
          assert(getBestMatchService.calledThrice);
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it1'));
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it2'));
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it3'));
          expect(result).to.equal(null);
        });
      });
    });
    context('with a complex config that includes candidatesFilteringConfig except on the third', () => {
      const config = {
        iterationConfigs: [
          { iterationName: 'A', getBestMatchConfig: 'it1', candidatesFilteringConfig: 'it1' },
          {
            iterationName: 'B',
            getBestMatchConfig: 'it2',
            candidatesFilteringConfig: 'it2',
            createNoticeForMatch: () => ({ level: 'warn', message: `Got match!!` }),
            createNoticeForNoMatch: () => ({ level: 'error', message: `No match!!` }),
          },
          { iterationName: 'C', getBestMatchConfig: 'it2' },
        ],
        createNoticeForGlobalNoMatch: ({ target }) => ({ level: 'info', message: `Global no match for ${JSON.stringify(target)}` }),
        // TODO: add spy on logger and check that this is emitted
      };
      const { expectedResult, targetAndCandidates, target } = prepareData1();

      context('if the first iteration yields a result', () => {
        it('calls getBestMatchToTargetFromCandidatesList and retrieveCandidatesArrayToUse once, using the right args', () => {
          const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
          const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
          const arrayToUse = ['my array'];
          retrieveArrayService.withArgs(targetAndCandidates, 'it1').returns(arrayToUse);
          getBestMatchService.withArgs(target, arrayToUse, 'it1').returns(expectedResult);

          const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, config, { logger });
          assert(retrieveArrayService.calledOnceWith(targetAndCandidates, 'it1'));
          assert(getBestMatchService.calledOnceWith(target, arrayToUse, 'it1'));
          expect(result).to.equal(expectedResult);
        });
      });
      context('if the second config object yields a result', () => {
        it('calls getBestMatchToTargetFromCandidatesList and retrieveCandidatesArrayToUse twice, using the right args', () => {
          const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
          const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
          const arrayToUse = ['my array'];
          retrieveArrayService.withArgs(targetAndCandidates, 'it2').returns(arrayToUse);
          getBestMatchService.returns(null);
          getBestMatchService.withArgs(target, arrayToUse, 'it2').returns(expectedResult);

          const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, config, { logger });
          assert(retrieveArrayService.calledWith(targetAndCandidates, 'it2'));
          assert(retrieveArrayService.calledTwice);
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it2'));
          assert(getBestMatchService.calledTwice);
          expect(result).to.equal(expectedResult);
        });
      });
      context('if the third config object yields a result', () => {
        it('calls getBestMatchToTargetFromCandidatesList and retrieveCandidatesArrayToUse thrice , using the right args', () => {
          const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
          const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
          const arrayToUse = ['my array'];
          retrieveArrayService.withArgs(targetAndCandidates, 'it1').returns(false);
          retrieveArrayService.withArgs(targetAndCandidates, 'it2').returns(false);
          retrieveArrayService.withArgs(targetAndCandidates, undefined).returns(arrayToUse);
          getBestMatchService.returns(null);
          getBestMatchService.withArgs(target, arrayToUse, 'it2').returns(expectedResult);

          const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, config, { logger });
          assert(retrieveArrayService.calledThrice);
          assert(retrieveArrayService.calledWith(targetAndCandidates, 'it1'));
          assert(retrieveArrayService.calledWith(targetAndCandidates, 'it2'));
          assert(retrieveArrayService.calledWith(targetAndCandidates, undefined));
          assert(getBestMatchService.calledThrice);
          assert(getBestMatchService.calledWith(target, false, 'it1'));
          assert(getBestMatchService.calledWith(target, false, 'it2'));
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it2'));
          expect(result).to.equal(expectedResult);
        });
      });
      context('if no config objects yield a result', () => {
        it('calls retrieveCandidatesArrayToUse twice and getBestMatchToTargetFromCandidatesList thrice and returns null', () => {
          const getBestMatchService = compareAndMatchStub.getBestMatchToTargetFromCandidatesList;
          const retrieveArrayService = retrieveModuleStub.retrieveCandidatesArrayToUse;
          const arrayToUse = ['my array'];
          retrieveArrayService.withArgs(targetAndCandidates, 'it1').returns(false);
          retrieveArrayService.withArgs(targetAndCandidates, 'it2').returns(false);
          retrieveArrayService.withArgs(targetAndCandidates, undefined).returns(arrayToUse);
          getBestMatchService.returns(null);

          const result = findBestMatchForTargetAmongCandidates(targetAndCandidates, config, { logger });
          assert(retrieveArrayService.calledThrice);
          assert(retrieveArrayService.calledWith(targetAndCandidates, 'it1'));
          assert(retrieveArrayService.calledWith(targetAndCandidates, 'it2'));
          assert(retrieveArrayService.calledWith(targetAndCandidates, undefined));
          assert(getBestMatchService.calledThrice);
          assert(getBestMatchService.calledWith(target, false, 'it1'));
          assert(getBestMatchService.calledWith(target, false, 'it2'));
          assert(getBestMatchService.calledWith(target, arrayToUse, 'it2'));
          expect(result).to.equal(null);
        });
      });
    });
  });
  context('when no target is provided', () => {
    it('returns null', () => {
      expect(findBestMatchForTargetAmongCandidates()).to.equal(null);
    });
  });
});
