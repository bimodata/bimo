const getAndValidatePropFromProps = require('@bimo/core-utils-get-and-validate-prop-from-props');
const { Item } = require('@bimo/core-utils-collection');

class SchedulingUnitRoute extends Item {
  constructor(props) {
    super(props);
    this.rteIdentifier = getAndValidatePropFromProps('rteIdentifier', props, `string`);
  }
}

module.exports = SchedulingUnitRoute;
