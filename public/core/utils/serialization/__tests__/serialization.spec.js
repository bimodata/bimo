// @ts-nocheck
/* eslint-disable max-classes-per-file */

const { expect } = require('chai');
const { OperationPivot, SegmentPivot, Jour, OperationsPivotCollection } = require('@bimo/test-utils-test-entities');
const asyncForEach = require('@bimo/core-utils-async-for-each');

const { serializeModel, parseModel, serializeThis, parseThis, getAllChildClasses } = require('..');

describe('#serializeModel and #parseModel complete', () => {
  before(() => {
    Jour.prototype.serialize = serializeThis;
    Jour.parseModel = parseThis;
    SegmentPivot.prototype.serialize = serializeThis;
    SegmentPivot.parseModel = parseThis;
    OperationPivot.prototype.serialize = serializeThis;
    OperationPivot.parseModel = parseThis;
    OperationPivot.allChildClasses = getAllChildClasses([SegmentPivot]);
    OperationsPivotCollection.parseModel = parseThis;
    OperationsPivotCollection.prototype.serialize = serializeThis;
  });
  after(() => {
    delete Jour.prototype.serialize;
    delete Jour.parseModel;
    delete SegmentPivot.prototype.serialize;
    delete SegmentPivot.parseModel;
    delete OperationPivot.prototype.serialize;
    delete OperationPivot.parseModel;
    delete OperationPivot.allChildClasses;
    delete OperationsPivotCollection.parseModel;
    delete OperationsPivotCollection.prototype.serialize;
  });
  describe('#serializeModel and #parseModel', () => {
    context('on a simple plain object, including one with recursion', () => {
      const obj1 = { toto: '1', tutu: 2 };
      obj1.tata = obj1;
      const instances = [
        { toto: 1, titi: '2', tutu: true },
        { a: [1, '2', true, { toto: 4 }] },
        {
          root: 'this is the root',
          level1: {
            name: 'this is level 1',
            level2: { name: 'guess what? level 2' },
          },
        },
        {
          b: [
            [1, 2, 3],
            ['4', [6, '7', false]],
          ],
        },
        obj1,
      ];
      const expectedResults = require('./expectedResults').simpleInstances;
      it('serializeModel returns an object that can be stringified', () => {
        instances.forEach((instance, index) => {
          const expectedResult = expectedResults[index];
          expect(serializeModel(instance)).to.eql(expectedResult);
          expect(JSON.stringify(serializeModel(instance))).to.be.a('string');
        });
      });
      it('parseModel returns an object that is equivalent to the original', async () => {
        await asyncForEach(expectedResults, async (serializedModel, index) => {
          // @ts-ignore
          instance = instances[index];
          // @ts-ignore
          expect((await parseModel(serializedModel))).to.eql(instance);
        });
      });
    });
    context('on an oject that includes a map', () => {
      const myMap = new Map();
      myMap.set({ a: 'b' }, { c: 'd' });
      myMap.set({ e: '1' }, { f: 5 });
      const instance1 = { toto: '1', tutu: 2, titi: myMap };
      const serializedInstance1 = serializeModel(instance1);

      it('serializeModel returns an object that can be stringified', () => {
        expect(JSON.stringify(serializedInstance1)).to.be.a('string');
      });
      it('serializeModel stores maps as tuples', () => {
        expect(serializedInstance1.serializedInstanceByIdByType.Map['1']).to.eql(
          [[{ _type: 'Object', _id: '2' }, { _type: 'Object', _id: '3' }],
          [{ _type: 'Object', _id: '4' }, { _type: 'Object', _id: '5' }]],
        );
      });
      it('parseModel returns an object that is equivalent to the original', async () => {
        expect(await parseModel(serializedInstance1)).to.eql(instance1);
      });
    });
    context('on an object that includes a buffer', () => {
      const myBuffer = Buffer.from(`This is my buffer data`);
      const instance1 = { toto: '1', tutu: 2, titi: myBuffer };
      const serializedInstance1 = serializeModel(instance1);

      it('serializeModel returns an object that can be stringified', () => {
        expect(JSON.stringify(serializedInstance1)).to.be.a('string');
      });
      it(`serializeModel stores buffers like a type of object`, () => {
        expect(serializedInstance1.serializedInstanceByIdByType.Object['1'].titi._type).to.equal('Buffer');
        expect(serializedInstance1.serializedInstanceByIdByType.Buffer['1']).to.be.an('array');
      });
      it('parseModel returns an object that is equivalent to the original', async () => {
        expect(await parseModel(serializedInstance1)).to.eql(instance1);
      });
    });
    context('when an object is an instance of a class', () => {
      const instance1 = new Jour('lundi');
      const serializedInstance1 = serializeModel(instance1);

      it('serializeModel stores the name of the class', () => {
        expect(serializedInstance1.serializedRootObject._type).to.equal('Jour');
      });

      it('parseModel returns an instance of the class, if the class is passed as an option', async () => {
        const knownClassByClassName = { Jour };
        expect(await parseModel(serializedInstance1, { knownClassByClassName })).to.be.instanceOf(Jour);
      });
    });
  });

  describe('#serializeThis and #parseThis on simple cases', () => {
    context('on a simple plain object', () => {
      const instance = {
        root: 'this is the root',
        level1: {
          name: 'this is level 1',
          level2: { name: 'guess what? level 2' },
        },
      };
      instance.serialize = serializeThis;

      const result = instance.serialize();
      const expectedResult = require('./expectedResults').simpleObjectForParseThis;

      it('serializeThis returns an object ready to be stringified', () => {
        expect(result).to.eql(expectedResult);
        expect(JSON.stringify(result)).to.be.a('string');
      });
    });
    context('on an instance of a simple class (with no links to other classes)', () => {
      it('serializeThis stores the name of the class', () => {
        const instance1 = new Jour('lundi');
        const serializedInstance1 = instance1.serialize();
        expect(serializedInstance1.serializedRootObject._type).to.equal('Jour');
      });

      it('parseThis returns an instance of the class', async () => {
        const instance1 = new Jour('lundi');
        const serializedInstance1 = instance1.serialize();
        // @ts-ignore
        expect(await Jour.parseModel(serializedInstance1)).to.be.instanceOf(Jour);
      });
    });

    context('on an instance of a class that has properties that are other classes', () => {
      it('serializeThis gives the expected result', () => {
        const expectedResult = require('./expectedResults').mutlipleClassesObject;

        const segment1 = new SegmentPivot({
          id: 'String',
          rang: 'String',
          nature: 'String',
          idEtapeBase: 'String',
        });

        const instance1 = new OperationPivot({
          heureDebut: 'allo',
          type: 'bonjour',
          position: 'D',
          jour: 'lundi',
          segmentPivot: segment1,
        });
        const serializedInstance1 = instance1.serialize();
        expect(serializedInstance1).to.eql(expectedResult);
      });

      it('parseThis returns instances of the classes (if the classes have an allChildClasses property', async () => {
        const expectedResult = require('./expectedResults').mutlipleClassesObject;

        const segment1 = new SegmentPivot({
          id: 'String',
          rang: 'String',
          nature: 'String',
          idEtapeBase: 'String',
        });

        const instance1 = new OperationPivot({
          heureDebut: 'allo',
          type: 'bonjour',
          position: 'D',
          jour: 'lundi',
          segmentPivot: segment1,
        });
        const serializedInstance1 = instance1.serialize();
        // @ts-ignore
        const newInstance = await OperationPivot.parseModel(serializedInstance1);
        // @ts-ignore
        expect(newInstance).to.be.instanceOf(OperationPivot);
        // @ts-ignore
        expect(newInstance.segmentPivot).to.be.instanceOf(SegmentPivot);
      });
    });
  });

  describe('#serializeThis on complex cases', () => {
    context('on an instance of a class that is a collection of type aggregation', () => {
      const segment1Props = {
        id: 'String',
        rang: 'String',
        nature: 'String',
        idEtapeBase: 'String',
      };
      const operation1Props = {
        heureDebut: 'allo',
        type: 'bonjour',
        position: 'D',
        jour: 'lundi',
      };
      const operation2Props = {
        heureDebut: 'allo',
        type: 'bonjour',
        position: 'D',
        jour: 'lundi',
      };

      context('when aggregated instances already have ids', () => {
        it('serializeThis gives the expected result (with reference to repo ids)', () => {
          const segment1 = new SegmentPivot(segment1Props);
          const instance1Props = JSON.parse(JSON.stringify(operation1Props));
          const instance2Props = JSON.parse(JSON.stringify(operation2Props));
          instance1Props.segmentPivot = segment1;
          instance2Props.segmentPivot = segment1;
          instance1Props.id = '1234';
          instance2Props.id = '5678';

          const instance1 = new OperationPivot(instance1Props);
          const instance2 = new OperationPivot(instance2Props);

          const testCollection = new OperationsPivotCollection({ items: [instance1, instance2] });

          const serializedCollection = testCollection.serialize();
          const expectedResultForSerialize = require('./expectedResults').aggregObject;
          expect(serializedCollection.serializedInstanceByIdByType.OperationsPivotCollection[1].incrementIdFunction).to.be.a(`function`);
          delete serializedCollection.serializedInstanceByIdByType.OperationsPivotCollection[1].incrementIdFunction;
          expect(serializedCollection.serializedInstanceByIdByType.OperationsPivotCollection[1].updateNextIdFunction).to.be.a(`function`);
          delete serializedCollection.serializedInstanceByIdByType.OperationsPivotCollection[1].updateNextIdFunction;
          expect(serializedCollection).to.eql(expectedResultForSerialize);
        });
      });

      context('when aggregated instances do not have ids and no options allow it', () => {
        it('throws an error that has the faulty instance in its "unknownAggregetedInstance" property.', () => {
          const segment1 = new SegmentPivot(segment1Props);
          const instance1Props = JSON.parse(JSON.stringify(operation1Props));
          const instance2Props = JSON.parse(JSON.stringify(operation2Props));
          instance1Props.segmentPivot = segment1;
          instance2Props.segmentPivot = segment1;

          const instance1 = new OperationPivot(instance1Props);
          const instance2 = new OperationPivot(instance2Props);

          const testCollection = new OperationsPivotCollection({ items: [instance1, instance2] });

          const testFunction = () => {
            testCollection.serialize();
          };
          expect(testFunction).to.throw(`An aggregated instance is unknown.`).that.has.property('unknownAggregetedInstance').that.is.instanceOf(OperationPivot);
        });
      });
      context('when aggregated instances do not have ids and options allow it', () => {
        it('serializeThis gives the expected result (_repoId = undefined)', () => {
          const segment1 = new SegmentPivot(segment1Props);
          const instance1Props = JSON.parse(JSON.stringify(operation1Props));
          const instance2Props = JSON.parse(JSON.stringify(operation2Props));
          instance1Props.segmentPivot = segment1;
          instance2Props.segmentPivot = segment1;

          const instance1 = new OperationPivot(instance1Props);
          const instance2 = new OperationPivot(instance2Props);

          const testCollection = new OperationsPivotCollection({ items: [instance1, instance2] });

          const serializedCollection = testCollection.serialize({ allowUnknownAggregatedInstances: true });

          expect(serializedCollection.serializedInstanceByIdByType.OperationsPivotCollection['1'].items[0]).to.eql({ _type: 'OperationPivot', _repoId: undefined });
          expect(serializedCollection.serializedInstanceByIdByType.OperationsPivotCollection['1'].items[1]).to.eql({ _type: 'OperationPivot', _repoId: undefined });
        });
      });
    });
  });

  describe('#parseThis on complex cases', () => {
    context('on an instance of a class that is a collection of type aggregation', () => {
      const segment1 = new SegmentPivot({
        id: 'String',
        rang: 'String',
        nature: 'String',
        idEtapeBase: 'String',
      });
      const instance1 = new OperationPivot({
        id: '1234',
        heureDebut: 'allo',
        type: 'bonjour',
        position: 'D',
        jour: 'lundi',
        segmentPivot: segment1,
      });
      const instance2 = new OperationPivot({
        id: '5678',
        heureDebut: 'allo',
        type: 'bonjour',
        position: 'D',
        jour: 'lundi',
        segmentPivot: segment1,
      });

      context('when repo is not provided but params.allowUnknownRepositories = true', () => {
        it('returns the object but gives a {_type, _repoId, error: "repo not found"} object for the repo objects ', async () => {
          const testCollection = new OperationsPivotCollection({ items: [instance1, instance2] });
          const serializedCollection = testCollection.serialize();

          const newInstance = await OperationsPivotCollection.parseModel(serializedCollection, { allowUnknownRepositories: true });
          expect(newInstance).to.be.instanceOf(OperationsPivotCollection);
          expect(newInstance.items).to.eql([
            { _type: 'OperationPivot', _repoId: '1234', error: 'repo not found' },
            { _type: 'OperationPivot', _repoId: '5678', error: 'repo not found' },
          ]);
          expect(newInstance.ItemConstructor).to.eql(OperationPivot);
          expect(newInstance.itemName).to.equal(`OperationPivot`);
        });
      });
      context('when repo is not provided and params.allowUnknownRepositories = false or undefined', () => {
        let caughtError;
        before(async () => {
          const testCollection = new OperationsPivotCollection({ items: [instance1, instance2] });
          const serializedCollection = testCollection.serialize();

          try {
            // @ts-ignore
            const newInstance = await OperationsPivotCollection.parseModel(serializedCollection);
          }
          catch (error) {
            caughtError = error;
          }
        });

        it('throws an error with a meaningful message and the repoType in the missingRepoType prop', async () => {
          expect(caughtError).to.be.instanceOf(Error);
          expect(caughtError.message).to.include(`repositoryByClassName`);
          expect(caughtError.message).to.include(`allowUnknownRepositories`);
          expect(caughtError.message).to.include(OperationPivot.name);
          expect(caughtError.missingRepoType).to.equal(OperationPivot.name);
        });
      });

      context('when the repo is provided', () => {
        context(`when all requested ids exist in the repo`, () => {
          const mockRepo = {
            getItemById: (id) => {
              if (id === '1234') {
                return instance1;
              }
              if (id === '5678') {
                return instance2;
              }

              throw new Error(`Id ${id} not found in the repo`);
            },
          };
          it('returns the object with extracted objects from the repo ', async () => {
            const testCollection = new OperationsPivotCollection({ items: [instance1, instance2] });
            const serializedCollection = testCollection.serialize();

            const newInstance = await OperationsPivotCollection.parseModel(serializedCollection, { repositoryByClassName: { OperationPivot: mockRepo } });
            expect(newInstance).to.be.instanceOf(OperationsPivotCollection);
            expect(newInstance.items[0]).to.equal(instance1);
            expect(newInstance.items[1]).to.equal(instance2);
          });
        });
        context(`when at least one of the requested ids doesn't exist in the repo`, () => {
          const mockRepo = {
            getItemById: (id) => {
              if (id === '1234') {
                return instance1;
              }

              const newError = new Error(`Id ${id} not found in the repo`);
              newError.name = 'UnknownIdError';
              throw newError;
            },
          };
          context(`when allowUnknownRepoIds = false or undefined`, () => {
            let caughtError;
            before(async () => {
              const testCollection = new OperationsPivotCollection({ items: [instance1, instance2] });
              const serializedCollection = testCollection.serialize();

              try {
                // @ts-ignore
                const newInstance = await OperationsPivotCollection.parseModel(serializedCollection, { repositoryByClassName: { OperationPivot: mockRepo } });
              }
              catch (error) {
                caughtError = error;
              }
            });

            it('throws an error with a meaningful message, the missing id in the "missingId" prop and the repoType in "repoType"', async () => {
              expect(caughtError).to.be.instanceOf(Error);
              expect(caughtError.message).to.include(`5678`);
              expect(caughtError.message).to.include(`allowUnknownRepoIds`);
              expect(caughtError.message).to.include(OperationPivot.name);
              expect(caughtError.missingId).to.equal(`5678`);
              expect(caughtError.repoType).to.equal(OperationPivot.name);
            });
          });

          context(`when allowUnknownRepoIds = true`, () => {
            it('returns the object with extracted objects from the repo. Missing objets are represented as {_type, _repoId, error: "instance not found"} object  ', async () => {
              const testCollection = new OperationsPivotCollection({ items: [instance1, instance2] });
              const serializedCollection = testCollection.serialize();

              const newInstance = await OperationsPivotCollection.parseModel(serializedCollection, { repositoryByClassName: { OperationPivot: mockRepo }, allowUnknownRepoIds: true });
              expect(newInstance).to.be.instanceOf(OperationsPivotCollection);
              expect(newInstance.items[0]).to.equal(instance1);
              expect(newInstance.items[1]).to.eql({ _type: 'OperationPivot', _repoId: '5678', error: 'instance not found' });
              expect(newInstance.ItemConstructor).to.eql(OperationPivot);
              expect(newInstance.itemName).to.equal(`OperationPivot`);
            });
          });
        });
      });
    });
  });
});
