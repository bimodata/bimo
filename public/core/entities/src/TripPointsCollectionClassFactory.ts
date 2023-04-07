const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Collection } = require('@bimo/core-utils-collection');

const TripPointsCollectionClassFactory = ({ TripPoint }) => {
  const childClasses = [TripPoint];

  /** @extends {Collection<TripPoint>} */
  class TripPointsCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'TripPoint',
        ItemConstructor: TripPoint,
        ...props,
      });
    }

    sortByTime() {
      try {
        this.items.sort(
          (trpptA, trpptB) => trpptA.getTimeAsDuration().as('second') - trpptB.getTimeAsDuration().as('second'),
        );
      }
      catch (error) {
        const newError = new Error(`Error while sorting these trip points:\n${this.longLoggingOutput}\n${error.message}`);
        throw newError;
      }
    }

    get mediumLoggingOutput() {
      return this.map((pt) => `${pt.placeId}${pt.noStopping === '1' ? '~' : '|'}`).join('');
    }

    get longLoggingOutput() {
      return this.map((pt) => pt.shortLoggingOutput).join('\n');
    }
  }

  /* Serialization utilities */
  TripPointsCollection.allChildClasses = getAllChildClasses(childClasses);
  TripPointsCollection.prototype.serializeModel = serializeThis;
  TripPointsCollection.parseModel = parseThis;

  return TripPointsCollection;
};

module.exports = TripPointsCollectionClassFactory;
