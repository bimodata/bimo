import { EntityConstructorByEntityClassKey } from "../base-types/entityConstructorByEntityClassKey";
import { VehicleTasksCollection as BimoVehicleTasksCollection } from "../base-types/rawIndex";
export { VehicleTasksCollection as BimoVehicleTasksCollection } from "../base-types/rawIndex";
import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { BimoVehicleTask, VehicleTaskProps } from "./VehicleTask";

export interface VehicleTasksCollectionProps
  extends ExtendedCollectionProps<BimoVehicleTask, VehicleTaskProps> {}

export function VehicleTasksCollectionClassFactory({
  VehicleTask,
}: EntityConstructorByEntityClassKey): typeof BimoVehicleTasksCollection {
  class VehicleTasksCollection extends Collection<BimoVehicleTask, VehicleTaskProps> {
    constructor(props: VehicleTasksCollectionProps = {}) {
      super({
        itemName: "VehicleTask",
        ItemConstructor: VehicleTask,
        idPropName: `id`,
        labelPropName: `label`,
        ...props,
      });
    }

    get mediumLoggingOutput() {
      return this.map((vta) => `${vta.longLoggingOutput}`).join("\n");
    }
  }

  return VehicleTasksCollection;
}

export default VehicleTasksCollectionClassFactory;
