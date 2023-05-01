import { Collection, ExtendedCollectionProps } from "@bimo/core-utils-collection";
import { VehicleTask, VehicleTaskProps } from "./VehicleTask";

export interface VehicleTasksCollectionProps
  extends ExtendedCollectionProps<VehicleTask, VehicleTaskProps> {}

export class VehicleTasksCollection extends Collection<VehicleTask, VehicleTaskProps> {
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

export default VehicleTasksCollection;
