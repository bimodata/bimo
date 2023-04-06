const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

const SchedulingUnitRouteClassFactory = () => {
  class SchedulingUnitRoute extends Item {
    constructor(props) {
      super(props);
      this.rteIdentifier = getAndValidatePropFromProps('rteIdentifier', props, `string`);
    }
  }

  return SchedulingUnitRoute;
};

module.exports = SchedulingUnitRouteClassFactory;
