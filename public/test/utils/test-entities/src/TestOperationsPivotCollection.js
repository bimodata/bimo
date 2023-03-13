const { Collection } = require('@bimo/core-utils-collection');
const OperationPivot = require('./TestOperationPivot');

class OperationsPivotCollection extends Collection {
  constructor(props = {}) {
    // @ts-ignore
    super({ itemName: 'OperationPivot', ItemConstructor: OperationPivot, items: props.items, parent: props.parent, associationType: 'aggregation' });
  }
}

module.exports = OperationsPivotCollection;
