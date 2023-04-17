const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const { Item } = require('@bimo/core-utils-collection');

const SchedulingUnitRoutesCollection = require('./SchedulingUnitRoutesCollection');

const childClasses = [SchedulingUnitRoutesCollection];

class SchedulingUnit extends Item {
  constructor(props) {
    super(props);
    this.scuIdentifier = getAndValidatePropFromProps('scuIdentifier', props, `string`);
    this.scuType = getAndValidatePropFromProps('scuType', props, `string`, '1100');
    this.scuDescription = getAndValidatePropFromProps('scuDescription', props, `string`, 'Générée par Lauritz');
    this.scuOwner = getAndValidatePropFromProps('scuOwner', props, `string`, 'ADMIN');
    this.scuDataGroup = getAndValidatePropFromProps('scuDataGroup', props, `string`, '');
    this.scuPublicAccess = getAndValidatePropFromProps('scuPublicAccess', props, `string`, '1');

    /* Children */
    /** @type {SchedulingUnitRoutesCollection} */
    this.schedulingUnitRoutes = getAndValidatePropFromProps(
      'schedUnitRoute', props,
      SchedulingUnitRoutesCollection,
      new SchedulingUnitRoutesCollection(),
      { altPropName: 'sched_unit_route', parent: this },
    );
  }

  get shortLoggingOutput() {
    return `${this.scuIdentifier} - ${this.scuDescription} - ${this.scuType}`;
  }
}

SchedulingUnit.hastusKeywords = ['scheduling_unit'];
SchedulingUnit.hastusObject = 'scheduling_unit';

SchedulingUnit.allChildClasses = getAllChildClasses(childClasses);
SchedulingUnit.prototype.serializeModel = serializeThis;
SchedulingUnit.parseModel = parseThis;

module.exports = SchedulingUnit;
