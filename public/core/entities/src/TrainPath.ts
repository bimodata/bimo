const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

const TrainPathVariantsCollection = require('./TrainPathVariantsCollection');

const childClasses = [TrainPathVariantsCollection];

class TrainPath extends Item {
  constructor(props) {
    super(props);

    this.trnpIdentifier = getAndValidatePropFromProps('trnpIdentifier', props, `string`);
    if (!this.trnpIdentifier) {
      throw new Error('Pas de nom de sillon');
    }
    this.trnpRoute = getAndValidatePropFromProps('trnpRoute', props, `string`);
    this.trnpIsInService = getAndValidatePropFromProps('trnpIsInService', props, `string`);

    /* Children */
    /** @type {TrainPathVariantsCollection} */
    this.trainPathVariants = getAndValidatePropFromProps(
      'trainPathVariants', props,
      TrainPathVariantsCollection,
      new TrainPathVariantsCollection(),
      { altPropName: 'train_path_variant', parent: this },
    );
  }

  get shortLoggingOutput() {
    return `${this.trnpIdentifier}-(${this.trnpRoute}|${this.trnpIsInService})`;
  }
}

TrainPath.allChildClasses = getAllChildClasses(childClasses);
TrainPath.prototype.serializeModel = serializeThis;
TrainPath.parseModel = parseThis;

module.exports = TrainPath;
