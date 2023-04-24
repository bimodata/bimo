const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');

const { Item } = require('@bimo/core-utils-collection');

const childClasses = [];

class SdefSchedulingUnit extends Item {
  constructor(props) {
    super(props);
    this.sdscuIdentifier = getAndValidatePropFromProps('sdscuIdentifier', props, `string`);
    this.sdscuType = getAndValidatePropFromProps('sdscuType', props, `string`, '1100');
    this.sdscuInclSunday = getAndValidatePropFromProps('sdscuInclSunday', props, `string`, '1');
    this.sdscuInclMonday = getAndValidatePropFromProps('sdscuInclMonday', props, `string`, '1');
    this.sdscuInclTuesday = getAndValidatePropFromProps('sdscuInclTuesday', props, `string`, '1');
    this.sdscuInclWednesday = getAndValidatePropFromProps('sdscuInclWednesday', props, `string`, '1');
    this.sdscuInclThursday = getAndValidatePropFromProps('sdscuInclThursday', props, `string`, '1');
    this.sdscuInclFriday = getAndValidatePropFromProps('sdscuInclFriday', props, `string`, '1');
    this.sdscuInclSaturday = getAndValidatePropFromProps('sdscuInclSaturday', props, `string`, '1');

    this.includedSchedulingUnits = [];
  }
}

SdefSchedulingUnit.hastusKeywords = ['sdef_scheduling_unit_incl'];
SdefSchedulingUnit.hastusObject = 'sdef_scheduling_unit';

SdefSchedulingUnit.allChildClasses = getAllChildClasses(childClasses);
SdefSchedulingUnit.prototype.serializeModel = serializeThis;
SdefSchedulingUnit.parseModel = parseThis;

module.exports = SdefSchedulingUnit;
