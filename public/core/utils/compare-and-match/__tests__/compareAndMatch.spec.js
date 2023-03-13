const { expect } = require('chai');
const path = require('path');

const { fsBimo: fs } = require('@bimo/core-utils-filesystem');

const { getStupidLogger } = require('@bimo/core-utils-logging');
const { createExpectationMessage, testFileOutput } = require('@bimo/test-utils-hash-and-compare-contents');
const { levenshtein, getBestMatchToTargetFromCandidatesList } = require('..');

const PATH_TO_TEST_DATA = path.join(__dirname, 'testData');

describe('compareAndMatch utils', () => {
  describe(`# getBestMatchToTargetFromCandidatesList`, () => {
    context(`when given a target string and a list of candidate strings`, () => {
      const targetString = 'allo';
      const candidates = ['Allo', 'Allo!', 'aloha', 'Bojour la police'];
      context(`when max distance is not provided`, () => {
        it(`returns the candidate with the lowest levenshtein distance to the target`, () => {
          const result = getBestMatchToTargetFromCandidatesList(targetString, candidates);
          expect(result).to.equal(`Allo`);
        });
      });
      context(`when max distance is zero and no candidates are an exact match`, () => {
        it(`returns null`, () => {
          const result = getBestMatchToTargetFromCandidatesList(targetString, candidates, { maxDistance: 0 });
          expect(result).to.equal(null);
        });
      });
      context(`when max distance is 1 a candidate has this distance`, () => {
        it(`returns the candidate with the lowest levenshtein distance to the target`, () => {
          const result = getBestMatchToTargetFromCandidatesList(targetString, candidates, { maxDistance: 1 });
          expect(result).to.equal('Allo');
        });
      });
    });
    context(`when two candidates have the same distance to the target`, () => {
      const targetString = 'allo';
      const candidates = ['Allo', 'allo!', 'aloha', 'Bojour la police'];
      it(`returns the candidate that it encounters last in the list`, () => {
        const result = getBestMatchToTargetFromCandidatesList(targetString, candidates);
        expect(result).to.equal(`allo!`);
      });
    });
    context(`when a logger is provided in the options`, () => {
      const targetString = 'allo';
      const candidates = ['Allo', 'allo!', 'aloha', 'Bojour la police'];
      const traces = [];
      const logger = {
        trace: (message) => {
          traces.push(message);
          // console.log(message);
        },
      };
      it(`logs a trace that includes "[distance: x]" for each tested candidate`, () => {
        getBestMatchToTargetFromCandidatesList(targetString, candidates, undefined, { logger });
        const tracesAreValid = traces.every((trace) => /\[distance: \d+\]/.test(trace));
        expect(tracesAreValid).to.equal(true);
      });
    });
    context(`when one of the candidates equals the target`, () => {
      const targetString = 'allo';
      const candidates = ['Allo', 'allo!', 'allo', 'Bojour la police'];
      const traces = [];
      const logger = {
        trace: (message) => {
          traces.push(message);
          // console.log(message);
        },
      };
      it(`returns right away without testing the rest of the candidates`, () => {
        const result = getBestMatchToTargetFromCandidatesList(targetString, candidates, undefined, { logger });
        expect(result).to.equal(`allo`);
        expect(traces.length).to.equal(3);
      });
    });
  });
});

describe('feature test: match PTP stations to Hastus places', () => {
  context(`with a realistic set of data`, () => {
    let garesPtp;
    let libelleLieuHastusByIdLieuHastus;

    const pathToGaresPtp = path.join(PATH_TO_TEST_DATA, `input`, 'garesPtp.json');
    const pathToLibelleLieuHastusByIdLieuHastus = path.join(PATH_TO_TEST_DATA, `input`, 'libelleLieuHastusByIdLieuHastus.json');
    const pathToImprovedGaresPtp = path.join(PATH_TO_TEST_DATA, `output`, `improvedGaresPtp.json`);
    const pathToIdHastusByGarePtp = path.join(PATH_TO_TEST_DATA, `output`, `idHastusByGarePtp.json`);
    const pathToImprovedGaresPtpExpected = path.join(PATH_TO_TEST_DATA, `expectedOutput`, `improvedGaresPtp.json`);
    const pathToIdHastusByGarePtpExpected = path.join(PATH_TO_TEST_DATA, `expectedOutput`, `idHastusByGarePtp.json`);
    let improvedGaresPtp;
    let idHastusByGarePtp;

    before(async () => {
      garesPtp = await fs.readJson(pathToGaresPtp);

      libelleLieuHastusByIdLieuHastus = await fs.readJson(pathToLibelleLieuHastusByIdLieuHastus);
      improvedGaresPtp = garesPtp.map((garePtp) => ({
        fullName: garePtp,
        cleanName: garePtp.slice(5).toLowerCase(),
      }));
      const improvedLieuxHastus = [];
      Object.keys(libelleLieuHastusByIdLieuHastus).forEach((idLieu) => {
        const libelleLieu = libelleLieuHastusByIdLieuHastus[idLieu];
        const improvedLieu = {
          id: idLieu,
          fullName: libelleLieu,
          cleanName: libelleLieu
            .replace(' Bâtiment Voyageurs', '')
            .replace(' *00*', '')
            .replace('RATP', '')
            .toLowerCase(),
        };
        improvedLieuxHastus.push(improvedLieu);
      });

      idHastusByGarePtp = {};
      improvedGaresPtp.forEach((improvedGarePtp) => {
        const bestMatch = getBestMatchToTargetFromCandidatesList(improvedGarePtp, improvedLieuxHastus,
          {
            logger: getStupidLogger(true),
            distanceFunction: (target, candidate) => levenshtein(target.cleanName, candidate.cleanName),
          });
        // eslint-disable-next-line no-param-reassign
        improvedGarePtp.bestMatch = bestMatch;
        idHastusByGarePtp[improvedGarePtp.fullName] = bestMatch.id;
      });
    });
    it(createExpectationMessage(pathToImprovedGaresPtp, pathToImprovedGaresPtpExpected, 'works ...'), async () => {
      try {
        await fs.unlink(pathToImprovedGaresPtp);
      }
      catch (error) {
        // do nothing
      }
      await fs.outputJson(pathToImprovedGaresPtp, improvedGaresPtp, { spaces: 2 });
      await testFileOutput(pathToImprovedGaresPtp, pathToImprovedGaresPtpExpected);
    });
    it(createExpectationMessage(pathToIdHastusByGarePtp, pathToIdHastusByGarePtpExpected, 'works ...'), async () => {
      try {
        await fs.unlink(pathToIdHastusByGarePtp);
      }
      catch (error) {
        // do nothing
      }
      await fs.outputJson(pathToIdHastusByGarePtp, idHastusByGarePtp, { spaces: 2 });
      await testFileOutput(pathToIdHastusByGarePtp, pathToIdHastusByGarePtpExpected);
    });
  });
});
