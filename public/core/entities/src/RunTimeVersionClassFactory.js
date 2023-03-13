const Item = require('@bimo/core-utils-item');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const RunTimeVersionClassFactory = ({
  RunTimesCollection,
  LoadTimesCollection,
}) => {
  const childClasses = [RunTimesCollection, LoadTimesCollection];

  class RunTimeVersion extends Item {
    constructor(props) {
      super(props);
      /** We can't use rtevIdentifier: it has a functional meaning */
      this.bimoId = getAndValidatePropFromProps('bimoId', props);
      this.rtvIdentifier = getAndValidatePropFromProps('rtvIdentifier', props, `string`);
      this.rtvDescription = getAndValidatePropFromProps('rtvDescription', props, `string`);
      this.rtvScheduleType = getAndValidatePropFromProps('rtvScheduleType', props, `string`);
      this.rtvSchedulingUnit = getAndValidatePropFromProps('rtvSchedulingUnit', props, `string`);
      this.rtvEffectiveDate = getAndValidatePropFromProps('rtvEffectiveDate', props, `string`);
      this.rtvOwner = getAndValidatePropFromProps('rtvOwner', props, `string`);
      this.rtvPublicAccess = getAndValidatePropFromProps('rtvPublicAccess', props, `string`);
      this.rtvDataGroup = getAndValidatePropFromProps('rtvDataGroup', props, `string`);
      this.rtvAllowsMapBasedRunTimes = getAndValidatePropFromProps('rtvAllowsMapBasedRunTimes', props, `string`, `0`);
      this.rtvMapBasedRunTimeFactor = getAndValidatePropFromProps('rtvMapBasedRunTimeFactor', props, `string`, `1`);

      /** @type {RunTimesCollection} */
      this.runTimes = getAndValidatePropFromProps(
        'runTimes', props, RunTimesCollection, new RunTimesCollection(), { altPropName: 'run_time' },
      );
      this.runTimes.parent = this;

      /** @type {LoadTimesCollection} */
      this.loadTimes = getAndValidatePropFromProps(
        'loadTimes', props, LoadTimesCollection, new LoadTimesCollection(), { altPropName: 'load_time' },
      );
      this.loadTimes.parent = this;
    }

    /**
     * Creates a new instance of a runTimeVersion. All runtimes are new instances too.
     * @param {string=} newRtvIdentifier
     * @returns {RunTimeVersion}
     */
    copy(newRtvIdentifier) {
      // @ts-ignore
      const copiedRunTimeVersion = new this.constructor(this);
      copiedRunTimeVersion.rtvIdentifier = newRtvIdentifier;
      copiedRunTimeVersion.runTimes = new RunTimesCollection({ items: this.runTimes.map((runTime) => runTime.copy()) });
      copiedRunTimeVersion.addLink('copiedFrom', this);
      return copiedRunTimeVersion;
    }

    get shortLoggingOutput() {
      return `${this.rtvIdentifier} - ${this.rtvDescription}`;
    }
  }

  /* Serialization utilities */
  RunTimeVersion.allChildClasses = getAllChildClasses(childClasses);
  RunTimeVersion.prototype.serializeModel = serializeThis;
  RunTimeVersion.parseModel = parseThis;

  return RunTimeVersion;
};

module.exports = RunTimeVersionClassFactory;
