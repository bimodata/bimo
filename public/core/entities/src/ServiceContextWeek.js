const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { getAllChildClasses, serializeThis, parseThis } = require('@bimo/core-utils-serialization');
const { Item } = require('@bimo/core-utils-collection');

const ServiceContextDaysCollection = require('./ServiceContextDaysCollection');

const childClasses = [ServiceContextDaysCollection];

class ServiceContextWeek extends Item {
  constructor(props) {
    super(props);
    this.scwkSchedUnitId = getAndValidatePropFromProps('scwkSchedUnitId', props, `string`);
    this.scwkSchedUnitType = getAndValidatePropFromProps('scwkSchedUnitType', props, `string`, '1100');
    this.scwkDescription = getAndValidatePropFromProps('scwkDescription', props, `string`);
    this.scwkAddedForNetEvent = getAndValidatePropFromProps('scwkAddedForNetEvent', props, 'string', '0');

    /* Children */
    /** @type {ServiceContextDaysCollection} */
    this.serviceContextDays = getAndValidatePropFromProps(
      'serviceContextDays', props,
      ServiceContextDaysCollection,
      new ServiceContextDaysCollection(),
      { altPropName: 'service_context_day', parent: this },
    );
  }
}

ServiceContextWeek.allChildClasses = getAllChildClasses(childClasses);
ServiceContextWeek.prototype.serializeModel = serializeThis;
ServiceContextWeek.parseModel = parseThis;

module.exports = ServiceContextWeek;
