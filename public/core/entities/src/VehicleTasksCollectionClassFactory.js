const { Collection } = require('@bimo/core-utils-collection');

const VehicleTasksCollectionClassFactory = ({ VehicleTask }) => {
  /** @extends {Collection<VehicleTask>} */
  class VehicleTasksCollection extends Collection {
    constructor(props = {}) {
      super({
        itemName: 'VehicleTask',
        ItemConstructor: VehicleTask,
        idPropName: `id`,
        labelPropName: `label`,
        ...props,
      });
    }

    get mediumLoggingOutput() {
      return this.map((vta) => `${vta.longLoggingOutput}\n`);
    }
  }

  return VehicleTasksCollection;
};

module.exports = VehicleTasksCollectionClassFactory;
